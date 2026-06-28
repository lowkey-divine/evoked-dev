#!/usr/bin/env python3
"""
Cross-validation driver (Python/ground-truth side).

Imports the Evoked governance-credential REFERENCE verifier and runs each of the 8
fleet credentials in three conditions:
    own-anchor     -> expect ACCEPT
    stranger-anchor-> expect REJECT (anchor-agnostic, no Evoked shortcut)
    tampered-bundle-> expect REJECT (chain no longer re-derives)

It writes a single shared test-vector file (cases.json) containing, per case, the
exact {token, anchor, bundle} the TypeScript verifier will consume - guaranteeing
both verifiers see identical inputs - plus the Python ground-truth verdict.

This driver does NOT modify the reference implementation. It only imports it.
"""
import json
import sys
import copy
from pathlib import Path

REF_DIR = Path("/Users/europa/Code/evoke-agents-backup/evoke_security")
CRED_ROOT = REF_DIR / "fleet_credentials"
AGENTS = ["cura", "impetus", "polaris", "gnosis", "tutela", "lux", "pons", "aequum"]

sys.path.insert(0, str(REF_DIR))
import governance_credential_reference_v0_1 as ref  # noqa: E402


def main(out_path: str):
    registry = ref.read_pen_arc()

    # A genuine stranger key: a relying party who never trusted Evoked.
    # (All fleet anchors are the SAME issuer key, so another agent's anchor is NOT
    #  a stranger. We must generate a real different key.)
    _stranger_sk, stranger_pk = ref.keypair_from_seed(b"some-other-relying-party-anchor")
    stranger_b64 = ref.b64u(stranger_pk)

    cases = []
    for agent in AGENTS:
        d = CRED_ROOT / agent
        token = (d / "credential.jwt").read_text(encoding="utf-8").strip()
        own_anchor_b64 = (d / "anchor.b64").read_text(encoding="utf-8").strip()
        own_pk = ref.b64u_decode(own_anchor_b64)
        bundle = json.loads((d / "bundle.json").read_text(encoding="utf-8"))

        # condition 1: own anchor, untouched bundle -> ACCEPT
        v1 = ref.verify_credential(token, trust_anchor_pk=own_pk, bundle_inputs=bundle, registry=registry)
        cases.append({
            "agent": agent, "cond": "own-anchor",
            "token": token, "anchor": own_anchor_b64, "bundle": bundle,
            "python_verdict": v1["verdict"], "python_issues": v1["issues"],
        })

        # condition 2: stranger anchor -> REJECT
        v2 = ref.verify_credential(token, trust_anchor_pk=stranger_pk, bundle_inputs=bundle, registry=registry)
        cases.append({
            "agent": agent, "cond": "stranger-anchor",
            "token": token, "anchor": stranger_b64, "bundle": bundle,
            "python_verdict": v2["verdict"], "python_issues": v2["issues"],
        })

        # condition 3: tampered bundle (payload swapped after issuance) -> REJECT
        tampered = copy.deepcopy(bundle)
        tampered["payload"] = {"model": "claude-opus-4-8", "task": "something else entirely"}
        v3 = ref.verify_credential(token, trust_anchor_pk=own_pk, bundle_inputs=tampered, registry=registry)
        cases.append({
            "agent": agent, "cond": "tampered-bundle",
            "token": token, "anchor": own_anchor_b64, "bundle": tampered,
            "python_verdict": v3["verdict"], "python_issues": v3["issues"],
        })

    Path(out_path).write_text(json.dumps(cases, indent=2), encoding="utf-8")
    accept = sum(1 for c in cases if c["python_verdict"] == "ACCEPT")
    reject = sum(1 for c in cases if c["python_verdict"] == "REJECT")
    print(f"python ground truth written: {out_path}")
    print(f"  {len(cases)} cases  ->  ACCEPT={accept}  REJECT={reject}")


if __name__ == "__main__":
    out = sys.argv[1] if len(sys.argv) > 1 else "scripts/xval-cases.json"
    main(out)

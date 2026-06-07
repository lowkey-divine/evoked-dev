# Regulatory State - Canonical Source of Truth

This directory holds the canonical record of every regulation-related claim Evoked makes in published artifacts.

## Why this exists

On 2026-06-06, the EU AI Act plain-language guide was authored against training knowledge without WebSearch verification, missed the May 2026 Digital Omnibus, escalated to outbound pitches and a consulting audit before Stephen surfaced the miss, and required a full re-render. The recalibration *also* missed substantive content (two new prohibited practices) because the dates were scattered across 19+ files with no canonical source.

This file is the canonical source. From this point forward, every published artifact that makes a regulatory claim must either:

1. Read its dates from this file at build time, **or**
2. Be republished within 7 days of any change to this file, with the artifact's `verified as of` date matching this file's `last_verified`

Drift between this file and an artifact is the kind of bug the 2026-06-06 incident was made of. Closing that drift is the discipline this file exists to enforce.

## How to use

### Before authoring or updating any regulation-related claim

1. Read the relevant entry in `regulatory-state.yml`
2. Check `last_verified` - if older than the entry's verification cadence, re-verify before authoring
3. Cite the `source` field in the artifact where appropriate
4. Reflect the `status` field accurately: `in_force`, `provisional`, `proposed`, `rumoured` are different levels of authority

### When verifying

Run the verification script:

```bash
bash scripts/verify-regulatory-state.sh
```

The script prints the verification queries, the primary sources to consult, and a prompt template to give to Claude Code (which can then run the WebSearch and surface deltas).

### When something changes

1. Update the relevant entry in `regulatory-state.yml`
2. Update `last_verified` at the top of the file
3. Update `next_verification_due` based on the entry's cadence
4. Run `grep -rln <relevant-keyword>` across the repo to find every artifact that references the changed entry
5. Update or republish each affected artifact within 7 days
6. Voice-tells audit each touched file
7. Regenerate any PDFs affected

## Verification cadence

| Regulation | Cadence | Reason |
|---|---|---|
| EU AI Act | **Weekly** during active amendment (current state) | Digital Omnibus pending Official Journal publication; landscape moves on weeks |
| EU AI Act | Monthly once Official Journal text lands | Stable baseline |
| GDPR | Monthly | Mature regulation, slow movement |
| NIST AI RMF | Monthly | Voluntary framework, occasional updates |
| Other regulations | As added; default monthly | Add to schedule on inclusion |

## Free alert subscriptions

Subscribing to these catches shifts proactively. Subscribe under `erin.stanley358@gmail.com` (or whichever inbox Evoked monitors for regulatory triage).

| Source | URL | Format |
|---|---|---|
| Council of the EU press releases | https://www.consilium.europa.eu/en/press/press-releases/ | RSS / email |
| AI Office (EU Commission DG CONNECT) | https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai | Page subscription |
| Latham & Watkins AI insights | https://www.lw.com/en/insights | Filter by AI; email alerts |
| Hogan Lovells data and AI | https://www.hoganlovells.com | Subscribe to AI / data alerts |
| Pinsent Masons Out-Law | https://www.pinsentmasons.com/out-law | Newsletter |
| Inside Privacy (Covington) | https://www.insideprivacy.com | RSS feed |
| EDPB news | https://www.edpb.europa.eu/news/news_en | RSS |

## Source authority hierarchy

When citing in artifacts, the source closer to the top is stronger authority:

1. **Official Journal of the European Union** (binding law)
2. **EU Commission formal proposal text** (definitive proposal)
3. **Council of the EU press releases** (authoritative summary of decisions)
4. **AI Office guidance** (interpretive authority)
5. **EDPB / similar body guidance** (advisory authority)
6. **Law firm client alerts** (summary; useful but not authority)
7. **Trade press / blog analysis** (orientation only)

If an artifact cites only level 6 or 7, the claim is weaker than it appears. Prefer level 1-4 citations.

## Schema notes

See `regulatory-state.yml` for the full schema. Key fields:

- `last_verified`: ISO date of most recent full verification of this file
- `next_verification_due`: when to re-verify (driven by the most volatile regulation's cadence)
- Per regulation: `status_summary`, `deadlines[]`, `penalties{}`, `thresholds{}`, `pending_actions[]`, `scope{}`
- Per deadline: `id`, `date`, `status` (in_force | provisional | proposed | rumoured), `original_date` (if shifted), `description`, `source`

## What lives outside this file

- Substantive interpretation of regulations (lives in published articles + guides; this file holds the facts they cite)
- Evoked's own offerings and pricing (lives in product pages + engage.astro)
- Legal opinions (we don't offer them; counsel does)

// Evoked Verification API — /api/v1/agents/:agent_id
//
// Status: SCAFFOLD. Contract ratified 2026-05-22; implementation begins
// Week 1 (2026-05-25). Returns 503 until Week 1 build lands.
//
// Contract spec: agents/governance/2026-05-22-verification-api-contract-spec.md
//                (evoke-agents-backup repo)
// Build plan:    agents/governance/2026-05-22-verification-api-scoping.md
// Schedule:      Verification API production deploy 2026-06-08 (accelerated from
//                original 2026-06-14 plan by captain authority 2026-05-22).
//
// Owners: Iter (primary), Tutela (crypto), Lux (data), Pons (contract).
// Polaris reviews at Gate 1 (end of 2026-05-27).
//
// Polaris standing watchpoint: no Evoked-issued credential required for
// verification. This scaffold honors that — no auth, wide-open CORS, no gates.

import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params }) => {
  const agentId = params.agent_id;

  const body = {
    type: 'https://evoked.dev/verify/protocol#not-yet-implemented',
    title: 'Verification API in development',
    status: 503,
    detail:
      'The verification endpoint exists in the ratified contract but the implementation is not yet live. Production deploy: 2026-06-08. See https://evoked.dev/patents for the schedule.',
    requested_agent: agentId,
    schedule: {
      contract_ratified: '2026-05-22',
      gate_1_cryptographic_foundation: '2026-05-27',
      gate_2_api_and_documentation: '2026-06-02',
      gate_3_external_verification_proof: '2026-06-07',
      production_deploy: '2026-06-08'
    },
    _meta: {
      contract_spec: 'https://evoked.dev/verify/protocol',
      patents_page: 'https://evoked.dev/patents',
      well_known_keys: 'https://evoked.dev/.well-known/evoked-pub.json'
    }
  };

  return new Response(JSON.stringify(body, null, 2), {
    status: 503,
    headers: {
      'Content-Type': 'application/problem+json',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
};

import type { APIRoute } from 'astro';
import { getAgentById, getAgentsByOrg } from '../../lib/registry/agents';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  const org = url.searchParams.get('org');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=300',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
  };

  // Single agent lookup
  if (id) {
    const agent = getAgentById(id);
    if (!agent) {
      return new Response(
        JSON.stringify({
          error: 'Agent not found',
          agent_id: id,
          verified: false,
        }),
        { status: 404, headers }
      );
    }

    return new Response(
      JSON.stringify({
        agent_id: agent.agent_id,
        display_name: agent.display_name,
        organization: agent.organization,
        role: agent.role,
        circle: agent.circle,
        tier: agent.tier,
        governance: agent.governance,
        attestation: agent.attestation,
        verified: true,
        verified_by: 'Evoke Passion Bot Authority',
      }),
      { status: 200, headers }
    );
  }

  // Organization lookup
  if (org) {
    const agents = getAgentsByOrg(org);
    if (agents.length === 0) {
      return new Response(
        JSON.stringify({
          error: 'Organization not found',
          organization: org,
          agents: [],
        }),
        { status: 404, headers }
      );
    }

    return new Response(
      JSON.stringify({
        organization: org,
        agent_count: agents.length,
        agents: agents.map((a) => ({
          agent_id: a.agent_id,
          display_name: a.display_name,
          role: a.role,
          circle: a.circle,
          tier: a.tier,
          attestation: a.attestation,
        })),
      }),
      { status: 200, headers }
    );
  }

  return new Response(
    JSON.stringify({
      error: 'Missing required parameter: id or org',
      usage: {
        single_agent: '/api/verify-agent?id={agent_id}',
        organization: '/api/verify-agent?org={organization_name}',
      },
    }),
    { status: 400, headers }
  );
};

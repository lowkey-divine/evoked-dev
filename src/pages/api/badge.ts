import type { APIRoute } from 'astro';
import { getAgentById } from '../../lib/registry/agents';

export const prerender = false;

const TIER_LABELS: Record<number, string> = {
  1: 'Self-Attested',
  2: 'Governance Validated',
  3: 'Full Attestation',
};

const TIER_COLORS: Record<number, string> = {
  1: '#6b7280',
  2: '#c4a77d',
  3: '#22c55e',
};

function buildBadgeSvg(agentName: string, tier: number): string {
  const label = 'BA Verified';
  const tierLabel = TIER_LABELS[tier] || 'Unknown';
  const tierColor = TIER_COLORS[tier] || '#6b7280';
  const leftWidth = 90;
  const rightWidth = tierLabel.length * 7 + 16;
  const totalWidth = leftWidth + rightWidth;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="20" role="img" aria-label="${agentName}: ${tierLabel}">
  <title>${agentName} - ${tierLabel}</title>
  <linearGradient id="s" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <clipPath id="r">
    <rect width="${totalWidth}" height="20" rx="3" fill="#fff"/>
  </clipPath>
  <g clip-path="url(#r)">
    <rect width="${leftWidth}" height="20" fill="#1a1a24"/>
    <rect x="${leftWidth}" width="${rightWidth}" height="20" fill="${tierColor}"/>
    <rect width="${totalWidth}" height="20" fill="url(#s)"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="11">
    <text aria-hidden="true" x="${leftWidth / 2}" y="15" fill="#010101" fill-opacity=".3">${label}</text>
    <text x="${leftWidth / 2}" y="14" fill="#e8e4df">${label}</text>
    <text aria-hidden="true" x="${leftWidth + rightWidth / 2}" y="15" fill="#010101" fill-opacity=".3">${tierLabel}</text>
    <text x="${leftWidth + rightWidth / 2}" y="14" fill="#fff">${tierLabel}</text>
  </g>
</svg>`;
}

function buildNotFoundSvg(agentId: string): string {
  const totalWidth = 180;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="20" role="img" aria-label="Not registered">
  <title>${agentId} - Not Registered</title>
  <clipPath id="r">
    <rect width="${totalWidth}" height="20" rx="3" fill="#fff"/>
  </clipPath>
  <g clip-path="url(#r)">
    <rect width="90" height="20" fill="#1a1a24"/>
    <rect x="90" width="90" height="20" fill="#6b7280"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="11">
    <text x="45" y="14" fill="#e8e4df">BA Verified</text>
    <text x="135" y="14" fill="#fff">Not Found</text>
  </g>
</svg>`;
}

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  const headers: Record<string, string> = {
    'Content-Type': 'image/svg+xml',
    'Cache-Control': 'public, max-age=3600',
    'Access-Control-Allow-Origin': '*',
  };

  if (!id) {
    return new Response(buildNotFoundSvg('unknown'), { status: 400, headers });
  }

  const agent = getAgentById(id);
  if (!agent) {
    return new Response(buildNotFoundSvg(id), { status: 404, headers });
  }

  return new Response(
    buildBadgeSvg(agent.display_name, agent.tier),
    { status: 200, headers }
  );
};

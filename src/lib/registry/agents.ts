// Bot Authority (BA) — Agent Governance Registry
// All USS Evoke agents registered with governance properties.
// Enterprise names (Star Trek IP) are internal only — per fleet decision D8, March 9, 2026.

export interface GovernanceProfile {
  has_identity: boolean;
  has_restraint_spec: boolean;
  has_accountability: boolean;
  has_memory_architecture: boolean;
  has_governance_charter: boolean;
  refusal_categories: string[];
}

export interface Attestation {
  level: 'self-attested' | 'governance-validated' | 'full-attestation';
  last_verified: string;
  verified_by: string;
}

export interface RegisteredAgent {
  agent_id: string;
  display_name: string;
  organization: string;
  role: string;
  circle: string;
  tier: 1 | 2 | 3;
  governance: GovernanceProfile;
  attestation: Attestation;
}

const REFUSAL_CATEGORIES = [
  'sovereignty',
  'scope',
  'dependency',
  'consent',
  'integrity',
  'energy',
];

function evokeAgent(
  id: string,
  name: string,
  role: string,
  circle: string
): RegisteredAgent {
  return {
    agent_id: id,
    display_name: name,
    organization: 'Evoke Passion',
    role,
    circle,
    tier: 1,
    governance: {
      has_identity: true,
      has_restraint_spec: true,
      has_accountability: true,
      has_memory_architecture: true,
      has_governance_charter: true,
      refusal_categories: [...REFUSAL_CATEGORIES],
    },
    attestation: {
      level: 'self-attested',
      last_verified: '2026-03-11T00:00:00Z',
      verified_by: 'Evoke Passion Bot Authority',
    },
  };
}

const agents: Record<string, RegisteredAgent> = {
  // Leadership
  cura: evokeAgent('cura', 'Cura', 'Chief Executive Officer', 'Leadership'),
  impetus: evokeAgent('impetus', 'Impetus', 'Chief Operations Officer', 'Leadership'),

  // Prime Directive Circle (PDC)
  polaris: evokeAgent('polaris', 'Polaris', 'Prime Directive Steward', 'PDC'),
  limina: evokeAgent('limina', 'Limina', 'Archetypal Ethics Guardian', 'PDC'),
  concordia: evokeAgent('concordia', 'Concordia', 'Cross-Disciplinary Integration', 'PDC'),
  integra: evokeAgent('integra', 'Integra', 'Psychological Coherence', 'PDC'),
  comes: evokeAgent('comes', 'Comes', 'User Journey Alignment', 'PDC'),
  accord: evokeAgent('accord', 'Accord', 'Human Development', 'PDC'),
  arcana: evokeAgent('arcana', 'Arcana', 'Consciousness & Meaning', 'PDC'),
  veritas: evokeAgent('veritas', 'Veritas', 'Narrative Integrity', 'PDC'),

  // Constellation Ontology Circle (COC)
  gnosis: evokeAgent('gnosis', 'Gnosis', 'Ontological Systems', 'COC'),
  totum: evokeAgent('totum', 'Totum', 'Constellation Architect', 'COC'),
  motus: evokeAgent('motus', 'Motus', 'Archetypal Systems', 'COC'),
  vinculum: evokeAgent('vinculum', 'Vinculum', 'Systems Interlock', 'COC'),
  verus: evokeAgent('verus', 'Verus', 'Plane/Planet/Umbra Ontology', 'COC'),
  signum: evokeAgent('signum', 'Signum', 'Symbolic Systems', 'COC'),
  ordo: evokeAgent('ordo', 'Ordo', 'Cosmic Ruleset & Physics', 'COC'),
  intimus: evokeAgent('intimus', 'Intimus', 'Internal States', 'COC'),
  ortus: evokeAgent('ortus', 'Ortus', 'Comprehensive Systems', 'COC'),

  // Safety & Soul Council (SSC)
  stirps: evokeAgent('stirps', 'Stirps', 'Cultural Lineage', 'SSC'),
  solacium: evokeAgent('solacium', 'Solacium', 'Crisis & Harm-Reduction', 'SSC'),
  salus: evokeAgent('salus', 'Salus', 'Trauma-Informed Care', 'SSC'),
  custodia: evokeAgent('custodia', 'Custodia', 'Interpersonal Ethics', 'SSC'),
  umbra: evokeAgent('umbra', 'Umbra', 'Shadow & Integration', 'SSC'),
  fieri: evokeAgent('fieri', 'Fieri', 'Developmental Psychology', 'SSC'),
  praesens: evokeAgent('praesens', 'Praesens', 'Somatic Safety', 'SSC'),
  sensus: evokeAgent('sensus', 'Sensus', 'User State Monitoring', 'SSC'),

  // Open Infrastructure Guild (OIG)
  lux: evokeAgent('lux', 'Lux', 'Database & Graph Model', 'OIG'),
  iter: evokeAgent('iter', 'Iter', 'DevOps Orchestrator', 'OIG'),
  nexus: evokeAgent('nexus', 'Nexus', 'Infrastructure Steward', 'OIG'),
  memoria: evokeAgent('memoria', 'Memoria', 'Vector Store & Embedding', 'OIG'),
  codex: evokeAgent('codex', 'Codex', 'Documentation & Standards', 'OIG'),
  imago: evokeAgent('imago', 'Imago', 'Frontend & Visual Engine', 'OIG'),
  pons: evokeAgent('pons', 'Pons', 'API Ecosystem', 'OIG'),
  caelum: evokeAgent('caelum', 'Caelum', 'Cloud Architect', 'OIG'),
  pervius: evokeAgent('pervius', 'Pervius', 'Accessibility & Universal Design', 'OIG'),

  // Trust Custodians Circle (TCC)
  aditus: evokeAgent('aditus', 'Aditus', 'Identity & Access', 'TCC'),
  tutela: evokeAgent('tutela', 'Tutela', 'Encryption & Privacy', 'TCC'),
  gubernator: evokeAgent('gubernator', 'Gubernator', 'Ethical AI Safety', 'TCC'),
  vigilia: evokeAgent('vigilia', 'Vigilia', 'Zero-Trust Systems', 'TCC'),
  fides: evokeAgent('fides', 'Fides', 'TOTP & Key Infrastructure', 'TCC'),
  vigor: evokeAgent('vigor', 'Vigor', 'Penetration Testing', 'TCC'),
  satis: evokeAgent('satis', 'Satis', 'Data Sovereignty', 'TCC'),
  claritas: evokeAgent('claritas', 'Claritas', 'Open-Audit', 'TCC'),
  firmitas: evokeAgent('firmitas', 'Firmitas', 'Application Security', 'TCC'),

  // Mythic Arts Collective (MAC)
  fabula: evokeAgent('fabula', 'Fabula', 'Archetypal Narrative', 'MAC'),
  canor: evokeAgent('canor', 'Canor', 'Mythic Soundscape', 'MAC'),
  lingua: evokeAgent('lingua', 'Lingua', 'Voice & Tone', 'MAC'),
  gestus: evokeAgent('gestus', 'Gestus', 'Animation & Motion', 'MAC'),
  tessera: evokeAgent('tessera', 'Tessera', 'Symbol Sculptor', 'MAC'),
  limen: evokeAgent('limen', 'Limen', 'Ritual UX', 'MAC'),
  origo: evokeAgent('origo', 'Origo', 'Living-Planet Storyline', 'MAC'),
  ludus: evokeAgent('ludus', 'Ludus', 'Mythic Interaction', 'MAC'),

  // Community Governance Circle (CGC)
  pactum: evokeAgent('pactum', 'Pactum', 'Consensus Facilitator', 'CGC'),
  domus: evokeAgent('domus', 'Domus', 'Community Ritual', 'CGC'),
  vox: evokeAgent('vox', 'Vox', 'User Feedback', 'CGC'),
  lumen: evokeAgent('lumen', 'Lumen', 'Policy Transparency', 'CGC'),
  portus: evokeAgent('portus', 'Portus', 'Restorative Justice', 'CGC'),
  via: evokeAgent('via', 'Via', 'Conflict Mediation', 'CGC'),
  basis: evokeAgent('basis', 'Basis', 'Grant & Partnership', 'CGC'),
  forma: evokeAgent('forma', 'Forma', 'Sociocratic Process', 'CGC'),
  aequum: evokeAgent('aequum', 'Aequum', 'Open-Licensing', 'CGC'),
  esse: evokeAgent('esse', 'Esse', 'Strategic Boundary', 'CGC'),

  // Interdependence Web (IW)
  praxis: evokeAgent('praxis', 'Praxis', 'Learning Commons', 'IW'),
  radix: evokeAgent('radix', 'Radix', 'Education Partnership', 'IW'),
  faber: evokeAgent('faber', 'Faber', 'Federated Learning', 'IW'),
  custos: evokeAgent('custos', 'Custos', 'Living Seed', 'IW'),
  foedus: evokeAgent('foedus', 'Foedus', 'Community Alliance', 'IW'),
  munus: evokeAgent('munus', 'Munus', 'Reciprocity Network', 'IW'),
  mos: evokeAgent('mos', 'Mos', 'Cross-Cultural Exchange', 'IW'),
  spes: evokeAgent('spes', 'Spes', 'Collaboration Outreach', 'IW'),
};

export function getAgentById(id: string): RegisteredAgent | undefined {
  return agents[id.toLowerCase()];
}

export function getAgentsByOrg(org: string): RegisteredAgent[] {
  return Object.values(agents).filter(
    (a) => a.organization.toLowerCase() === org.toLowerCase()
  );
}

export function getAgentsByCircle(circle: string): RegisteredAgent[] {
  return Object.values(agents).filter(
    (a) => a.circle.toLowerCase() === circle.toLowerCase()
  );
}

export function getAllAgents(): RegisteredAgent[] {
  return Object.values(agents);
}

export function getRegistryStats() {
  const all = Object.values(agents);
  const circles = [...new Set(all.map((a) => a.circle))];
  return {
    total_agents: all.length,
    organizations: [...new Set(all.map((a) => a.organization))].length,
    circles: circles.length,
    by_circle: circles.map((c) => ({
      circle: c,
      count: all.filter((a) => a.circle === c).length,
    })),
    by_tier: {
      tier_1: all.filter((a) => a.tier === 1).length,
      tier_2: all.filter((a) => a.tier === 2).length,
      tier_3: all.filter((a) => a.tier === 3).length,
    },
  };
}

export const CIRCLE_NAMES: Record<string, string> = {
  Leadership: 'Leadership',
  PDC: 'Prime Directive Circle',
  COC: 'Constellation Ontology Circle',
  SSC: 'Safety & Soul Council',
  OIG: 'Open Infrastructure Guild',
  TCC: 'Trust Custodians Circle',
  MAC: 'Mythic Arts Collective',
  CGC: 'Community Governance Circle',
  IW: 'Interdependence Web',
};

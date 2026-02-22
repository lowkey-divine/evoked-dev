export interface Product {
  slug: string;
  name: string;
  price: number;
  tagline: string;
  description: string;
  emailSubject: string;
  downloadPath: string;
  thankYouPath: string;
  stripePaymentLink: string;
  gettingStartedSteps: string[];
}

// Bundle: which individual product slugs are included
export const BUNDLE_CONTENTS: Record<string, string[]> = {
  'trust-architecture-complete': [
    'trust-architecture-blueprint',
    'agent-voice-architecture-guide',
    'agent-governance-starter-kit',
    'agent-restraint-specification',
  ],
};

const products: Record<string, Product> = {
  'sovereignty-assessment-toolkit': {
    slug: 'sovereignty-assessment-toolkit',
    name: 'Sovereignty Assessment Toolkit',
    price: 49,
    tagline: 'Evaluate whether the technology you use or build honors human sovereignty.',
    description: 'A structured self-assessment framework with a 47-point checklist across 7 domains, scoring rubric, and action plan template.',
    emailSubject: 'Your Sovereignty Assessment Toolkit',
    downloadPath: '/downloads/Sovereignty-Assessment-Toolkit-v1.0.pdf',
    thankYouPath: '/thank-you/sovereignty-toolkit',
    stripePaymentLink: 'https://buy.stripe.com/8x2cN5aRi0aV11yf4024001',
    gettingStartedSteps: [
      'Read the framework introduction (pages 1-5)',
      'Run the sovereignty audit on one of your existing products',
      'Use the scoring rubric to identify your strongest and weakest areas',
      'Pick the top three findings and build them into your next sprint',
    ],
  },
  'agent-governance-starter-kit': {
    slug: 'agent-governance-starter-kit',
    name: 'Agent Governance Starter Kit',
    price: 49,
    tagline: 'The charter, boundaries, and accountability framework your agents need from day one.',
    description: 'Templates and frameworks for agent charters, boundary specifications, drift monitoring, accountability protocols, and authority structures.',
    emailSubject: 'Your Agent Governance Starter Kit',
    downloadPath: '/downloads/Agent-Governance-Starter-Kit-v1.0.pdf',
    thankYouPath: '/thank-you/agent-governance-starter-kit',
    stripePaymentLink: '', // Set after Stripe Payment Link creation
    gettingStartedSteps: [
      'Read the introduction to understand the five governance layers',
      'Start with the Charter Template - define your agents\' purpose and boundaries',
      'Use the Drift Threshold Framework to set measurable guardrails',
      'Build your Accountability Framework using the four-level template',
    ],
  },
  'agent-restraint-specification': {
    slug: 'agent-restraint-specification',
    name: 'Agent Restraint Specification Template',
    price: 49,
    tagline: 'Define what your agents must refuse to do - before they get the chance.',
    description: 'A complete specification template for agent refusal categories, fail-closed/open decisions, accountability architecture, and adversarial testing.',
    emailSubject: 'Your Agent Restraint Specification Template',
    downloadPath: '/downloads/Agent-Restraint-Specification-v1.0.pdf',
    thankYouPath: '/thank-you/agent-restraint-specification',
    stripePaymentLink: '', // Set after Stripe Payment Link creation
    gettingStartedSteps: [
      'Run the Boundary Audit on your current agent capabilities',
      'Map each capability against the authorization gap template',
      'Build your Restraint Specification using the refusal category matrix',
      'Test your specification with the adversarial checklist in Part 4',
    ],
  },
  'trust-architecture-blueprint': {
    slug: 'trust-architecture-blueprint',
    name: 'Trust Architecture Blueprint',
    price: 49,
    tagline: 'Build trust into your agent system - identity, memory, governance, and refusal rights.',
    description: 'A four-pillar blueprint for agent trust: identity architecture, memory architecture, governance architecture, and refusal rights.',
    emailSubject: 'Your Trust Architecture Blueprint',
    downloadPath: '/downloads/Trust-Architecture-Blueprint-v1.0.pdf',
    thankYouPath: '/thank-you/trust-architecture-blueprint',
    stripePaymentLink: '', // Set after Stripe Payment Link creation
    gettingStartedSteps: [
      'Read the four-pillar overview to understand the trust architecture model',
      'Start with Identity Architecture - create your first agent persona file',
      'Design your Memory Architecture using the session protocol template',
      'Set up Governance Architecture with the graduated trust stages',
    ],
  },
  'agent-voice-architecture-guide': {
    slug: 'agent-voice-architecture-guide',
    name: 'Agent Voice Architecture Guide',
    price: 49,
    tagline: 'Design agent voices that respect people - not voices that manipulate them.',
    description: 'A complete guide to voice design principles, sovereignty language, voice specification templates, quality checks, and refusal voice patterns.',
    emailSubject: 'Your Agent Voice Architecture Guide',
    downloadPath: '/downloads/Agent-Voice-Architecture-Guide-v1.0.pdf',
    thankYouPath: '/thank-you/agent-voice-architecture-guide',
    stripePaymentLink: '', // Set after Stripe Payment Link creation
    gettingStartedSteps: [
      'Read the Voice Problem section to understand extraction vs. sovereignty language',
      'Use the Voice Design Principles to establish your three-level framework',
      'Build your first voice specification using the persona file template',
      'Run the Voice Quality Checks before deploying any agent voice',
    ],
  },
  'agent-memory-architecture-guide': {
    slug: 'agent-memory-architecture-guide',
    name: 'Agent Memory Architecture Guide',
    price: 49,
    tagline: 'Design what your agents remember, what they forget, and who decides.',
    description: 'A complete framework for memory types, memory governance, session protocols, the canonical rule for resolving memory conflicts, and retention policies including the right to be forgotten.',
    emailSubject: 'Your Agent Memory Architecture Guide',
    downloadPath: '/downloads/Agent-Memory-Architecture-Guide-v1.0.pdf',
    thankYouPath: '/thank-you/agent-memory-architecture-guide',
    stripePaymentLink: '', // Set after Stripe Payment Link creation
    gettingStartedSteps: [
      'Run the 10-Minute Memory Diagnostic to identify your biggest gap',
      'Use Part 1 to separate your operational memory from identity memory',
      'Build your Memory Governance Specification using the template in Part 2',
      'Write your Canonical Rule - the one sentence that defines which memory source wins',
    ],
  },
  'trust-architecture-complete': {
    slug: 'trust-architecture-complete',
    name: 'Trust Architecture Complete',
    price: 149,
    tagline: 'The complete practice - identity, voice, governance, and restraint in one package.',
    description: 'All four trust architecture products: Trust Architecture Blueprint, Agent Voice Architecture Guide, Agent Governance Starter Kit, and Agent Restraint Specification Template.',
    emailSubject: 'Your Trust Architecture Complete Bundle',
    downloadPath: '/thank-you/trust-architecture-complete',
    thankYouPath: '/thank-you/trust-architecture-complete',
    stripePaymentLink: '', // Set after Stripe Payment Link creation
    gettingStartedSteps: [
      'Start with the Trust Architecture Blueprint - it provides the four-pillar overview',
      'Build your first agent persona file using the Identity Architecture template',
      'Design your agent\'s voice using the Voice Architecture Guide',
      'Define governance boundaries with the Governance Starter Kit charter template',
      'Specify restraint categories using the Restraint Specification boundary audit',
    ],
  },
};

export function getProductBySlug(slug: string): Product | undefined {
  return products[slug];
}

export function getAllProducts(): Product[] {
  return Object.values(products);
}

export function getDefaultProduct(): Product {
  return products['sovereignty-assessment-toolkit'];
}

export function getBundleProducts(bundleSlug: string): Product[] {
  const slugs = BUNDLE_CONTENTS[bundleSlug];
  if (!slugs) return [];
  return slugs.map((s) => products[s]).filter(Boolean);
}

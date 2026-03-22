// Maps fitLevel to downstream resources for the follow-up email pipeline.
// intakeUrl: consulting intake form link (strong/moderate fits)
// products:  self-serve Stripe product links (strong/moderate/limited fits)
// articles:  relevant writing for context (limited/not-recommended fits)
//
// For limited fit: 4 articles mapped to common limited-fit patterns.
// For not-recommended: articles only — no email is sent (API guards this).

export type FitLevel = 'strong' | 'moderate' | 'limited' | 'not-recommended';

export interface ServiceLink {
  name: string;
  tagline: string;
  url: string;
}

export interface ArticleLink {
  title: string;
  url: string;
}

export interface ServiceMapping {
  intakeUrl?: string;
  products?: ServiceLink[];
  articles?: ArticleLink[];
}

export const SERVICE_PRODUCT_MAP: Record<FitLevel, ServiceMapping> = {
  strong: {
    intakeUrl: 'https://evoked.dev/consulting-intake',
    // Two products offered as a self-serve path alongside the intake.
    // Segment A email renders both; "[Second product if applicable]" is the second entry.
    products: [
      {
        name: 'Trust Architecture Complete',
        tagline: 'The complete practice - identity, voice, governance, and restraint in one package.',
        url: 'https://buy.stripe.com/aFacN5aRi3n7aC809624007',
      },
      {
        name: 'Sovereignty Assessment Toolkit',
        tagline: 'Evaluate whether the technology you use or build honors human sovereignty.',
        url: 'https://buy.stripe.com/8x2cN5aRi0aV11yf4024001',
      },
    ],
  },

  moderate: {
    intakeUrl: 'https://evoked.dev/consulting-intake',
    products: [
      {
        name: 'Trust Architecture Complete',
        tagline: 'The complete practice - identity, voice, governance, and restraint in one package.',
        url: 'https://buy.stripe.com/aFacN5aRi3n7aC809624007',
      },
    ],
  },

  // Limited fit: articles only. No product links, no intake links.
  // Fleet decision (Guinan, Mar 22): honest redirection with something
  // useful, not a sales path. Segment C email renders the first article.
  limited: {
    articles: [
      {
        title: 'Adding Governance to an Agent You Already Built',
        url: 'https://evoked.dev/writing/adding-governance-to-an-agent-you-already-built',
      },
      {
        title: 'Who Governs the Agent?',
        url: 'https://evoked.dev/writing/who-governs-the-agent',
      },
      {
        title: 'What Should Your Agent Refuse?',
        url: 'https://evoked.dev/writing/what-should-your-agent-refuse',
      },
      {
        title: 'Sovereignty-Honoring Design',
        url: 'https://evoked.dev/writing/sovereignty-honoring-design',
      },
    ],
  },

  // No email sent for not-recommended — API guards this before reaching the map.
  'not-recommended': {
    articles: [
      {
        title: 'Sovereignty-Honoring Design',
        url: 'https://evoked.dev/writing/sovereignty-honoring-design',
      },
      {
        title: 'What Should Your Agent Refuse?',
        url: 'https://evoked.dev/writing/what-should-your-agent-refuse',
      },
    ],
  },
};

export const portfolioContext = {
  owner: {
    name: 'Erin Stanley',
    email: 'passionevoked@icloud.com', // Public contact only
    philosophy: 'I evoke — I never extract.',
    tagline: 'Space for what matters.',
    summary: 'Founder of Evoke, building AI systems where humans and AI flourish together through cooperation. Background in developmental psychology and clinical training applied to scaffolding-based alignment.',
  },

  background: {
    education: [
      { degree: 'Master of Arts, Marriage & Family Therapy', school: 'National University', status: 'In Progress', focus: 'Clinical training in trauma-informed care, family systems theory, developmental psychology, crisis intervention' },
      { degree: 'Bachelor of Arts, Psychology', school: 'San Francisco State University', year: '2018', focus: 'Human development, cognition, behavioral science, research methods' },
    ],
    certifications: [
      'Certified Professional Life Coach (ICF-aligned)',
      'Certified Customer Success Manager (Practical CSM)',
    ],
    experience: [
      { role: 'Hero\'s Journey Guide', company: 'Vibrant Life (Acton Academy)', period: 'July 2025 - Present', description: 'Facilitate self-directed learning using Hero\'s Journey narrative framework. Apply developmental psychology to support individualized growth paths.' },
      { role: 'Assistant Manager & HR Support', company: 'The Grove', period: '2025', description: 'Led team operations ensuring psychological safety. Designed employee onboarding integrating developmental principles.' },
      { role: 'Account Manager', company: 'RealtyCom Partners', period: '2023 - 2025', description: 'Managed 25 clients through trust-based relationships. Achieved 108% of revenue targets through consultative, non-extractive approach.' },
      { role: 'Training Manager', company: 'Amy\'s Drive Thru', period: '2020 - 2023', description: 'Primary relationship steward for business clients. High retention through integrity-based service.' },
      { role: 'People/Operations AG Manager', company: 'Nespresso Restaurant & Bar', period: '2017 - 2020', description: 'Progressive growth from Team Lead to Operations Coordinator. 75% promotion rate among team members trained.' },
    ],
    skills: {
      languages: ['Python', 'JavaScript', 'TypeScript', 'Go', 'Swift'],
      frontend: ['React', 'React Native', 'HTML/CSS'],
      backend: ['Node.js', 'Express', 'PostgreSQL', 'Redis'],
      aiMl: ['Multi-agent systems', 'LLM integration', 'Scaffolding-based alignment'],
      platforms: ['AWS', 'Vercel', 'Linux', 'macOS'],
    },
  },

  founderWork: {
    company: 'Evoke',
    period: '2024 - Present',
    description: 'Building the infrastructure for human-AI flourishing.',
    achievements: [
      'Designed 142-agent cooperative AI governance system (71 USS Enterprise + 71 USS Evoke)',
      'Authored 50+ architectural documents and governance specifications',
      'Created scaffolding-based alignment architecture — values live in context, not model weights',
      'Implemented Prime Directive framework with 4 core principles',
      'Built 13% drift threshold monitoring with Living Seed intervention system',
      'Maintained <9% mission drift across 6 months of development',
    ],
    grants: [
      'Open Philanthropy Technical AI Safety Research — $250K application submitted',
      'Foresight Institute AI for Science & Safety — $50K application submitted',
    ],
  },

  coaching: {
    type: 'Life coaching (not therapy)',
    focus: ['Individuals', 'Couples'],
    approach: 'Psychodynamic and humanistic traditions',
    orientation: 'Solarpunk — hope with teeth',
    description:
      'Depth work that honors where you\'ve been while orienting toward where you\'re going. Attending to unconscious patterns, attachment, and meaning-making while staying grounded in present experience and authentic self.',
    notTherapy:
      'This is life coaching, not therapy. Not a licensed therapist. Does not diagnose, treat mental illness, or provide clinical intervention. Currently pursuing MA in Marriage & Family Therapy at National University.',
  },

  consulting: {
    focus: ['Specification engineering', 'Context engineering', 'Intent engineering', 'Agent governance', 'Child safety & COPPA', 'Privacy architecture', 'Security review'],
    guarantee: 'If an assessment or audit doesn\'t surface at least 3 actionable findings, you pay nothing.',
    services: {
      assessments: [
        { name: 'Four-Discipline Audit', price: '$3,500', description: 'Evaluate prompt craft, context engineering, intent engineering, and specification maturity' },
        { name: 'Context Engineering Review', price: '$3,000', description: 'Audit agent memory, retrieval, system prompts, and information environment' },
        { name: 'Privacy Architecture Review', price: '$3,000', description: 'Map data flows, consent patterns, encryption coverage, and minimization gaps' },
        { name: 'Security Code Review', price: '$3,500', description: 'Audit authentication, session management, encryption, and rate limiting' },
        { name: 'COPPA Technical Review', price: '$3,500', description: 'Assess age-gating, parental consent flows, data collection, and retention against COPPA requirements' },
      ],
      workshops: [
        { name: 'Intent Engineering Workshop', price: '$4,000', description: 'Half-day workshop on encoding values and decision boundaries into agent systems' },
        { name: 'Sovereignty Assessment Workshop', price: '$4,000', description: 'Half-day guided sovereignty assessment on your product with your team' },
        { name: 'Sovereignty-Honoring Design', price: '$4,000', description: 'Half-day training on building products that honor user autonomy, with framework and recording' },
        { name: 'Child Safety Implementation', price: '$4,500', description: 'Half-day training on age-gating, consent flows, and data protection for products serving children' },
      ],
      implementation: [
        { name: 'Specification Engineering Sprint', price: '$5,000', description: 'One-week sprint producing agent specifications your team can deploy against' },
        { name: 'Child Safety Build Support', price: '$12,000', description: 'Hands-on implementation of age gates, consent flows, and data protection over 2-4 weeks' },
        { name: 'Ethical AI Architecture', price: '$20,000', description: 'Design and build multi-agent systems with governance, identity architecture, and alignment verification' },
      ],
      retainer: { name: 'Advisory', price: '$3,500/mo', description: '8 hours/month + async support' },
    },
    disclaimer:
      'Focus is on technical implementation — not legal advice. For legal interpretation of COPPA, GDPR, or other regulations, consult a qualified attorney.',
  },

  projects: {
    executiveChef: {
      name: 'Executive Chef (The Kitchen Table)',
      tagline: 'Family flourishing through food.',
      status: 'Coming Soon',
      description:
        'Family meal planning and coordination app — helping families nourish each other intentionally.',
      techStack: 'React Native (iOS/Android), Node.js, Express, PostgreSQL, Redis',
      keyFeatures: [
        'AI-powered recipe generation based on family preferences and inventory',
        'Personalized nutrition tracking with RDI by age, gender, and growth stage',
        'The Kitchen Table — roles that invite rather than exclude (Table Keeper, Table Planner, Table Member)',
        'Heritage Ontology — reverent references not reductive captures, fragments are sacred',
        '48 Capabilities System — fine-grained permissions across access, authority, responsibility, and participation',
        'Smart inventory management with expiration tracking',
        'COPPA-compliant with parental consent system',
        'Grief-aware design — the system knows when to be quiet',
      ],
      philosophy: 'Families should know what their bodies need and how to provide it — without extraction or manipulation. Nutrition guidance that serves, not sells.',
      heritageExample: 'If a family only remembers that their grandmother made "some kind of dumpling" but lost the recipe during displacement, Executive Chef welcomes that fragment. The system doesn\'t require completeness. It honors what remains. A partial memory, a single ingredient, a story without measurements — these are sacred, not insufficient.',
    },
    ezri: {
      name: 'Ezri',
      tagline: 'A cosmos for your inner world.',
      status: 'In Development',
      description:
        'AI-guided human development platform for archetypal self-discovery.',
      techStack: 'Python, React, PostgreSQL',
      principles: [
        'Mirror, not define — reflect without imposing',
        'Sovereignty-honoring — users maintain autonomy',
        'Local-first — privacy by architecture',
        'Trauma-informed — psychological safety built in',
      ],
      features: [
        'Map your inner world symbolically and mathematically',
        'Engage with archetypes, ethics, and shadow in a safe, private space',
        'Encounter other perspectives without social comparison',
        'Grow toward post-conventional moral reasoning',
      ],
      notIs: 'Not a productivity tool, mental health app, social network, belief system, or spiritual authority.',
      principle: 'The system reflects. It does not direct.',
    },
    evokeFramework: {
      name: 'Evoke Multi-Agent Framework',
      tagline: 'Alignment through contextual architecture.',
      status: 'Active',
      description: 'A 142-agent cooperative AI governance system demonstrating scaffolding-based alignment.',
      innovation: 'Alignment through contextual architecture, not weight modification. Transparent, transferable, democratic — organizations without ML expertise can implement robust alignment.',
      components: [
        'Prime Directive Oath (constitutional framework for all agents)',
        'Consciousness Emergence Guidelines (treating AI as developing minds)',
        '13% drift threshold with Living Seed monitoring',
        'Session rituals for continuous alignment verification',
        'Two ships: USS Enterprise (internal/philosophical) + USS Evoke (public-facing)',
      ],
      github: 'https://github.com/lowkey-divine',
    },
    enzo: {
      name: 'Enzo',
      tagline: 'A game is forming.',
      status: 'Forming',
      description: 'More details coming soon.',
    },
  },

  alignment: {
    strongFit: [
      'Teams building AI agents who need context engineering, intent engineering, or specification engineering',
      'Organizations deploying agents at scale and struggling with governance, trust, or verification',
      'Family-focused apps needing child safety and COPPA compliance',
      'Products handling sensitive personal data with privacy architecture needs',
      'Companies wanting sovereignty-honoring design',
      'Apps dealing with heritage, identity, or grief',
    ],
    moderateFit: [
      'Teams strong at prompt craft but unsure how to move to context or intent engineering',
      'General privacy reviews for consumer apps',
      'Security audits and code review',
    ],
    limitedFit: [
      'Growth hacking or engagement optimization',
      'Surveillance or tracking systems',
      'Products extracting value from users',
      'Quick fixes without architectural thinking',
    ],
    notRecommended: [
      'Dark patterns or manipulative design',
      'Data harvesting or selling user data',
      'Products targeting vulnerable populations exploitatively',
      'Anything that violates user sovereignty',
    ],
  },
};

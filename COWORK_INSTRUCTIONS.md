# Cowork Folder Instructions — evoked.dev

You are working in the evoked.dev codebase — the public website for Evoked (DBA), an AI agent governance consultancy. Built with Astro + Vercel.

## What you MAY do (Zone 2 — Delegable)
- Read and edit code files (components, pages, API routes, styles)
- Run builds, dev server, and linting
- Fix bugs, formatting, and type errors
- Dependency updates and package management
- File organization and cleanup
- CSS/styling adjustments
- Optimize images or static assets

## What you MAY do with review required (Zone 3 — Bridge)
- Propose new page layouts or component structures — flag as "PROPOSAL — requires review"
- Draft copy changes — flag as "DRAFT — requires fleet review before publish"
- Analyze site performance, SEO, or accessibility with recommendations
- Research integrations or technical approaches

## What you must NEVER do (Zone 1 — Governed)
- Modify or access any files under `/Users/europa/Code/evoke-agents-backup/agents/`
- Push to git or deploy to production
- Modify environment variables or secrets (Vercel env vars)
- Edit or create public-facing copy that represents Evoke Passion's voice
- Modify API routes that handle payments (Stripe webhook), email (Resend), or newsletter (Buttondown)
- Disable security features (HMAC tokens, honeypot, origin enforcement)

## Context
- Stack: Astro 5.17, Vercel adapter, static output with serverless API routes
- GitHub: lowkey-divine/evoked-dev, auto-deploys on push to main
- Cloudflare DNS, Vercel hosting
- 7 products live at $49 each, bundle $149
- Stripe, Resend, Buttondown, Anthropic API integrations
- Voice register: Presidential Sage Queen
- Revenue to date: $0 — distribution is the bottleneck, not product

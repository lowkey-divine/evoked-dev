# evoked.dev

Portfolio website for Erin Stanley — coaching, consulting, and projects.

Featuring **Echo**, an AI assistant powered by Claude Haiku.

## Features

- **Echo AI Chat** — Ask questions about services, projects, and philosophy
- **Fit Assessment** — Get honest feedback on project alignment
- **Responsive Design** — Works on all devices
- **Privacy-First** — No tracking, no data storage

## Tech Stack

- [Astro](https://astro.build/) — Static-first web framework
- [Vercel](https://vercel.com/) — Edge deployment
- [Claude Haiku](https://anthropic.com/) — AI responses

## Local Development

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env

# Start dev server
npm run dev
```

## Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel auto-detects Astro

2. **Add Environment Variable**
   - Go to Project Settings → Environment Variables
   - Add: `ANTHROPIC_API_KEY` = your key
   - Apply to Production, Preview, and Development

3. **Deploy**
   - Push to `main` branch
   - Vercel auto-deploys

### Manual Deploy

```bash
# Build
npm run build

# Deploy to Vercel
npx vercel --prod
```

## Project Structure

```
src/
├── components/
│   └── ai/
│       ├── ChatWidget.astro    # Echo chat interface
│       └── FitAssessment.astro # Project fit tool
├── layouts/
│   └── BaseLayout.astro        # Site layout with nav
├── lib/
│   └── ai/
│       ├── client.ts           # Anthropic SDK wrapper
│       ├── context.ts          # Portfolio data for AI
│       └── prompts.ts          # System prompts
├── pages/
│   ├── api/
│   │   ├── chat.ts             # Streaming chat endpoint
│   │   └── assess-fit.ts       # Fit assessment endpoint
│   ├── ask.astro               # Full chat page
│   ├── fit.astro               # Fit assessment page
│   └── ...                     # Other pages
└── styles/
    └── global.css              # Site styles
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | Yes | Claude API key from [console.anthropic.com](https://console.anthropic.com/) |

## Documentation

- [Operations Guide](docs/OPERATIONS_GUIDE.md) — Monitoring, costs, maintenance
- [Fleet Review](docs/USS_ENTERPRISE_FLEET_REVIEW.md) — Architecture review
- [OIG Review](docs/OIG_INFRASTRUCTURE_REVIEW.md) — Infrastructure assessment

## Cost Estimate

| Usage | Monthly Cost |
|-------|--------------|
| 100 conversations | ~$0.10 |
| 1,000 conversations | ~$1.00 |
| 10,000 conversations | ~$10.00 |

Vercel hosting is free for personal projects.

## License

Private repository.

---

*"I evoke — I never extract."*

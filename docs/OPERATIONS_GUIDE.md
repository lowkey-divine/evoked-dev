# evoked.dev Operations Guide

*Prepared by Commander Chakotay — Infrastructure & Sustainability*

---

## Deployment

### Prerequisites
- Vercel account
- Anthropic API key

### Environment Variables

Set in Vercel Dashboard → Settings → Environment Variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | Yes | Your Anthropic API key |

**Never commit API keys to the repository.**

### Deploy

```bash
# Push to GitHub (Vercel auto-deploys)
git push origin main

# Or deploy manually
npx vercel --prod
```

---

## Monitoring

### Vercel Analytics (Recommended — Pervius)

Enable free analytics for visibility into traffic and performance:

1. Go to Vercel Dashboard → Your Project → Analytics
2. Click "Enable Analytics"
3. Choose "Web Analytics" (free tier)

**What you'll see:**
- Page views and unique visitors
- Top pages
- Geographic distribution
- Device types
- Core Web Vitals (performance)

**Note:** This is privacy-respecting analytics — no cookies, GDPR compliant.

### Anthropic Console

1. Go to [console.anthropic.com](https://console.anthropic.com/)
2. Navigate to **Usage** to see API consumption
3. Set up **Usage Alerts**:
   - Navigate to Settings → Alerts
   - Create alert at $5, $10, $25 thresholds
   - Alerts notify you before costs become unexpected

### Vercel Analytics

1. Enable Analytics in Vercel Dashboard
2. Monitor:
   - Function invocations (chat, assess-fit)
   - Error rates
   - Response times

### Cost Estimation

| Scenario | Monthly Cost |
|----------|--------------|
| 100 conversations | ~$0.10 |
| 1,000 conversations | ~$1.00 |
| 10,000 conversations | ~$10.00 |

Claude Haiku pricing: ~$0.00025 per 1K input tokens, ~$0.00125 per 1K output tokens

---

## Incident Response

### If Costs Spike

1. Check Anthropic Console for unusual usage patterns
2. Temporarily disable AI endpoints by setting `ANTHROPIC_API_KEY` to empty string
3. Review Vercel logs for abuse patterns
4. Consider adding rate limiting (see below)

### Adding Rate Limiting

Create `vercel.json` in project root:

```json
{
  "functions": {
    "api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "X-RateLimit-Limit",
          "value": "20"
        }
      ]
    }
  ]
}
```

For IP-based limiting, consider Vercel's Edge Middleware or Upstash Redis.

### If API Errors Increase

1. Check Anthropic status: [status.anthropic.com](https://status.anthropic.com)
2. Review Vercel function logs
3. Test locally: `npm run dev`
4. Check if API key is valid/has credits

---

## Maintenance

### Regular Tasks

| Task | Frequency | How |
|------|-----------|-----|
| Review API costs | Weekly | Anthropic Console |
| Check error rates | Weekly | Vercel Dashboard |
| Update dependencies | Monthly | `npm update` |
| Review AI context | Quarterly | Update `context.ts` if services change |

### Updating AI Context

When services or information changes:

1. Edit `src/lib/ai/context.ts`
2. Update `src/lib/ai/prompts.ts` if prompt structure needs changes
3. Test locally: `npm run dev`
4. Deploy: `git push`

### Security Updates

```bash
# Check for vulnerabilities
npm audit

# Fix automatically where possible
npm audit fix

# Update to latest compatible versions
npm update
```

---

## Backup

### Code
- Primary: GitHub repository
- Ensure you have local clone

### No Database
- Stateless design — no data persistence
- Conversation history is client-side only
- Nothing to back up

---

## Scaling Considerations

Current architecture handles significant load:
- Vercel serverless auto-scales
- Anthropic API handles concurrency
- No database bottlenecks

If you reach Anthropic rate limits:
1. Contact Anthropic for limit increase
2. Consider adding client-side rate limiting
3. Add request queuing if needed

---

## Cost Optimization

### Already Optimized
- Using Claude Haiku (cheapest model)
- Limiting conversation history to 10 messages
- Input length limits (2000 chars chat, 5000 chars fit)

### If Costs Become Concern
1. Reduce `MAX_TOKENS` in `client.ts`
2. Shorten system prompts
3. Add aggressive client-side caching
4. Consider usage quotas per IP

---

## Support Contacts

| Issue | Contact |
|-------|---------|
| Anthropic API | [support.anthropic.com](https://support.anthropic.com) |
| Vercel | [vercel.com/support](https://vercel.com/support) |
| Code issues | [github.com/lowkey-divine](https://github.com/lowkey-divine) |

---

*"The land provides what we need, not what we want. This system takes only what it needs."*

— Commander Chakotay

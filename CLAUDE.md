# evoked.dev - Project Instructions

## Writing Rules for Publication

All content in `src/content/writing/` must follow these rules before publishing.

### Punctuation
- **No em dashes (—).** Use a hyphen with spaces ( - ) instead. Em dashes are an AI writing fingerprint. Europa's natural voice uses short dashes.
- Avoid excessive semicolons. Prefer periods or short dashes.

### Formatting
- No excess italics or bold for emphasis. Use sparingly and only when the word genuinely needs stress.
- Weave Ethos, Logos, and Pathos throughout. Never pool them in separate sections.
- Sources go at the bottom of the article, not inline.

### Voice
- Europa's voice: dashes, direct questions, warmth without softness, "let's," direct address.
- The COPPA article is the baseline reference for published voice.
- Articles are AI-assisted for professionalism but must carry Europa's warmth and voice.
- No sycophancy, no hedging, no "it's worth noting" or "it's important to remember."

### Review Process
1. **Fact-check** - All claims verified against reputable sources
2. **Voice consistency** - Matches Europa's established tone
3. **Sovereignty Language Guide compliance** - See `/Users/europa/Code/evoke-ideas/SOVEREIGNTY_LANGUAGE_GUIDE.md`
4. **Guinan review** - Existential coherence, meaning-making integrity, precise edits
5. **Europa's final pass** - Removes excess formatting, tightens grammar, adjusts tone

### Closing Signatures
Each article gets a distinct closing signature. No two articles share the same one.

## Site Structure
- Framework: Astro on Vercel, auto-deploys on push to `main`
- Content: Markdown in `src/content/writing/`, schema in `src/content/config.ts`
- Articles use `draft: true/false` - only `draft: false` appears on `/writing`
- Echo AI chat (Claude Haiku) at `/ask`, Fit Assessment at `/fit`

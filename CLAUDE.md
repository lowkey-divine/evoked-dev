# evoked.dev - Project Instructions

## Writing Rules for Publication

All content in `src/content/writing/`, product copy, social media, and governance documents must follow these rules.

### The Core Principle

**Write to change readers' ideas, not to communicate ours.** (McEnerney, UChicago) Nobody cares what ideas we have. They care what is wrong in their world that we can fix. Every piece of writing must change something in the reader's understanding - not explain something in ours.

### Estrangement Over Mimesis

**Write sentences the species has never had.** (Vuong, NYU) Do not describe the world as the newspaper describes it. Describe it so the reader sees it for the first time. "What does your AI refuse to do?" is an estrangement - it makes the familiar (agents executing tasks) strange (by introducing refusal as absence). All copy should aim for this.

- Do not write "governance framework for AI agents." Write what it changes.
- Do not write "assessment toolkit." Write what the reader will see differently after.
- Rescue the cliche by displacing it. A rose in a bride's hair is cliche. A rose in Mike Tyson's ear is somewhere else. The subject is never the problem - the arrangement is.

### Instability, Not Background

**Open with what is wrong in the reader's world.** (McEnerney) Every article, every product page, every social post must contain instability in the first two sentences - something inconsistent, something that costs the reader. Words that signal instability: but, however, although, inconsistent, anomaly, yet, nonetheless. Words that signal stability (and kill reader engagement): and, also, additionally, furthermore.

- Do not open with definitions or background.
- Do not open with "we built" or "we believe." Open with the reader's problem.
- Every paragraph must contain either instability (something wrong) or cost (what the wrongness costs). If a paragraph has neither, cut it or convert it.

### Show, Don't Just Tell

**Replace the abstract with the concrete.** (Craft principle) Give evidence, not claims. Give 2+2, not 4. Let the reader assemble the picture.

- Not "we have 142 agents." Instead: "142 agents. Their own identities. Their own right to refuse."
- Not "our governance framework is comprehensive." Instead: "Five questions. Thirty seconds. Most systems score zero."
- Not "she was angry." Instead: "She flipped the covers back and snatched her robe from the chair."

### Zoom Into the Moment

**Stories beat summaries.** (Phillips, Stanton) Social posts and case studies must use: location, actions, thoughts, emotions, dialogue. Not "we shipped a governance tool." Instead: zoom into the moment someone used it and what they saw.

### Know the Code

**Every community has coded words that signal value.** (McEnerney) Map the search terms and value words our target communities use. Spend 15 minutes a week reading published articles in AI governance, compliance, and agent safety. Circle the words that create value. Build a word list. Use those words in our headlines, meta tags, product descriptions.

### Precision AND Aliveness

**Legal and governance language can be rigorous and alive.** (Vuong + legal positioning) Patent claims, governance specs, and compliance language do not require deadness. "Dignity precedes proof" is a legal-weight sentence that is also poetry. "A method for encoding agent refusal rights in cryptographic certificates" is a sentence the patent office has never received. Aim for both.

### Punctuation
- **No em dashes (—).** Use a hyphen with spaces ( - ) instead. Em dashes are an AI writing fingerprint. Erin's natural voice uses short dashes.
- Avoid excessive semicolons. Prefer periods or short dashes.

### Formatting
- No excess italics or bold for emphasis. Use sparingly and only when the word genuinely needs stress.
- Weave Ethos, Logos, and Pathos throughout. Never pool them in separate sections.
- Sources go at the bottom of the article, not inline.

### Voice
- **Tone: presidential, sage, queen, captain.** Authority without arrogance. Warmth without softness. Precision without deadness.
- Erin's voice: dashes, direct questions, warmth without softness, "let's," direct address.
- The COPPA article is the baseline reference for published voice.
- Articles are AI-assisted for professionalism but must carry Erin's warmth and voice.
- No sycophancy, no hedging, no "it's worth noting" or "it's important to remember."
- No newspaper sentences. No AI slop. No sentences that 300,000 people have already written.
- **Daringness and disobedience.** (Vuong) The industry writes timid governance copy. We write sentences that change how people see their own systems.

### The Function Test

Before publishing anything, ask:
1. **Does this change what the reader thinks?** (Not: does this explain what I think?)
2. **Is there instability in the first two sentences?** (Not: is there background?)
3. **Would a reader be haunted by this?** (Not: would a reader understand this?)
4. **Has the species had this sentence before?** (If yes, rewrite it.)
5. **Can the camera see it?** (If not, make it concrete.)

### Review Process
0. **Voice-tells audit (automated gate)** - Run `./scripts/voice-tells-audit.sh <path-to-article.md>` before any other review step. Hard fails (em dashes, en dashes, sycophancy markers) must be zero. Soft flags (bold-numbered lists, stability-word openings, AI slop vocab, hedging, self-answering rhetoricals, tricolon density) need read-through to confirm each is intentional. Exit code 1 = block publish.
1. **Instability check** - Does the opening contain a problem the reader cares about?
2. **Value check** - Does this change the reader's ideas or just communicate ours?
3. **Estrangement check** - Is there at least one sentence the species has not had?
4. **Fact-check** - All claims verified against reputable sources
5. **Voice consistency** - Matches Europa's established tone (presidential, sage, queen, captain)
6. **Sovereignty Language Guide compliance**
7. **Show-don't-tell audit** - Replace abstract claims with concrete evidence
8. **Final pass** - Removes excess formatting, tightens grammar, adjusts tone

### Closing Signatures
Each article gets a distinct closing signature. No two articles share the same one.

## Site Structure
- Framework: Astro on Vercel, auto-deploys on push to `main`
- Content: Markdown in `src/content/writing/`, schema in `src/content/config.ts`
- Articles use `draft: true/false` - only `draft: false` appears on `/writing`
- Echo AI chat (Claude Haiku) at `/ask`, Fit Assessment at `/fit`

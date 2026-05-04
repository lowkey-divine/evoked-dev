# evoked.dev - Project Instructions

## Writing Rules for Publication

> **Scope note:** The rules below are the **founder-public discipline**. They govern the surfaces evoked.dev was built to address — governance buyers, partners, press, prospects. A sibling discipline (intimate-domestic) governs surfaces that speak to families, children, grief, heritage, and the everyday inside the products Evoked makes. See **Voice Discipline Scope** further down for the operational distinction, the cross-register invariants, and the per-register adaptations.

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

## Voice Discipline Scope

> **Two registers. One product. Designed seam.**
> *(Codified by Hoshi Sato, D6.5c addendum from D6 reconvene 2026-05-03.)*

The Writing Rules above are the **founder-public discipline** — McEnerney instability, Vuong estrangement, presidential/sage/queen/captain tone. They were authored for the surfaces evoked.dev was built to address: governance buyers, partners, press, prospects, the AI-fluent professional reader.

A second register exists for surfaces that speak to families, children, grief, heritage, and the everyday inside of the products Evoked makes. That register is **intimate-domestic** — quiet, declarative, present-tense, acknowledgment-first. The Kitchen Table welcome page is its canonical reference. *"If something here feels heavy, that's allowed. If it feels light, that's allowed too."*

The two registers are siblings, not competitors. Each is correct for its surface. The voice work is to know which surface speaks in which register and to honor the difference.

### Founder-public surfaces (existing discipline applies as written)

- Homepage and routing-grid copy
- All `/writing/` blog posts and longform
- All `/products/` governance and toolkit pages
- About, work-with-us, consulting, coaching landing pages
- Newsletter (governance audience)
- Social posts on AI governance topics
- Press inquiries and media outreach
- Patent claims and legal-weight prose

### Intimate-domestic surfaces (sibling discipline applies)

- The Kitchen Table marketing surface (current `/projects/executive-chef.astro`, future `kitchentable.app/*` if built)
- App Store listing prose (currently the only marketing-shaped surface families encounter pre-install)
- In-app prose: welcome screen, heritage flows, grief pathways, family seasons, quiet exit
- Support email replies (`support@kitchentable.app`) and help center prose (`help.kitchentable.app`)
- Any blog content authored about the product family-side (e.g., the deferred Heritage Stories series)
- Social posts about The Kitchen Table specifically (parents, families, heritage)

### Cross-register invariants (apply to both registers)

These rules carry whether the surface is founder-public or intimate-domestic:

- **No AI slop vocabulary.** Delve, delving, landscape, ecosystem, tapestry, realm, myriad, plethora, utilize. Both registers refuse these.
- **No sycophancy.** "It's worth noting," "it's important to note/remember/understand," "needless to say," "of course." Both registers refuse these.
- **No manipulation.** No dark patterns in copy, no urgency framing, no fear-of-missing-out hooks. Both registers refuse these.
- **No newspaper sentences. No sentences 300,000 people have already written.** Vuong applies across both registers — the intimate-domestic register also deserves daringness. *"The system knows when to be quiet"* is daringly specific where *"we respect your privacy"* is newspaper.

### Per-register adaptations

These rules adapt depending on which register the surface speaks in:

| Rule | Founder-public | Intimate-domestic |
|---|---|---|
| **Em-dashes** | Blocked. AI fingerprint per `voice-tells-audit.sh`. Hard fail. | **Permitted.** The Kitchen Table welcome page has 47 em-dashes and that is correct for the register. The dash signals breath, hesitation, gentleness — exactly what intimate-domestic does. |
| **Opening** | Instability-first. McEnerney: open with what's wrong in the reader's world (*"What does your AI refuse to do?"*). | Acknowledgment-first. Open with what's true about the reader's experience (*"If something here feels heavy, that's allowed."*). Instability-first opening would feel hostile in this register. |
| **Tone authority** | Presidential, sage, queen, captain. Authority projected outward. | Companion, not commander. Presence held inward. Both share the *authority without arrogance* root; the projection differs. |
| **Sentence rhythm** | Short, punchy, declarative. Triplet structure permitted but tested for decoration. | Slower. Periods carry breath. Sentences may be longer when they hold space; shorter when they get out of the way. *"Family seasons"* needs paragraph room; *"Take all the time you need"* needs no padding. |
| **Headings** | Title Case, often estrangement-shaped (*"Fifteen Frameworks, One Missing Layer"*). | Lowercase or sentence case. Quiet. *"Who's at the table"* not *"Who's At The Table"*. |
| **Stable-word opening soft-flag** | Soft flag (suggests instability-first might serve better). | Not flagged. Stable openings are correct here. |

### Register-tree within intimate-domestic

The intimate-domestic register has at least six sub-registers visible in "The Door" campaign brief's channel-tone variants. Voice spec authoring at activation phase preserves the tree, not flattens it:

| Sub-register | Quality | Surface examples |
|---|---|---|
| **Landing page** | Quiet, declarative. *"Come in. You're home."* | Marketing site index, archetype doors |
| **Email** | Conversational, paced. *"We thought about you and then we thought about your grandmother."* | Newsletter, support replies |
| **Long-form earned** | Reflective, unhurried. The Heritage Stories essay shape. | Co-authored pieces in *Modern Loss*, *Catapult*, *Whetstone* |
| **Social (Instagram)** | Visual-led, restrained captions. Image carries the weight; caption ≤ 12 words. | Quote cards, archetype anchor images |
| **Social (TikTok)** | First-person founder-voice, only when it genuinely works. | Founder-driven only; no influencer borrowed-authority |
| **Podcast intros** | Conversation, not promotion. *"What does it mean to make space for a recipe you can't fully remember?"* | Show notes, opening lines |

### Implementation: how the gate runs

`voice-tells-audit.sh` currently enforces the founder-public discipline at file paths in `src/content/writing/` and similar. The script is correct as-is for those paths.

For intimate-domestic surfaces, two paths exist:

- **Option 1 (preferred):** the script learns to scope by file path. Founder-public paths get the founder-public ruleset (em-dashes blocked, instability-first soft-flag, etc.). Intimate-domestic paths get a separate ruleset that permits em-dashes, does not soft-flag stable-word openings, but does enforce the cross-register invariants (no AI slop, no sycophancy, no manipulation).
- **Option 2:** a second script (`voice-tells-audit-intimate.sh`) for intimate-domestic surfaces; the existing script stays scoped to founder-public.

Either approach honors the register difference. Implementation is downstream of this principle and can be authored when the first intimate-domestic surface ships through evoked.dev's pipeline.

### What this addendum does NOT do

- It does not rewrite any existing prose in either register.
- It does not change the founder-public discipline as authored.
- It does not specify which exact em-dash count is "intimate-domestic enough" — the register is a judgment, not a metric.
- It does not foreclose register-mixing where a surface deliberately bridges (e.g., a founder bio on a marketing surface that lives mostly in intimate-domestic). Bridge surfaces need their own deliberate decision, not a rule.

### Why this exists

D6 verdict (2026-05-03 evening) confirmed Path A2 was chosen by building: evoked.dev addresses governance buyers; The Kitchen Table reaches families through other channels. D6 reconvene (same evening) named that the voice spec authoring under D6.4 gates on Erin's strategic decision about whether to build kitchentable.app marketing in the near term.

**This addendum is independent of that decision.** Whichever path is chosen, the discipline-scope question is the same: founder-public is correctly scoped to evoked.dev surfaces; intimate-domestic needs its own named discipline because the welcome page voice (47 em-dashes; acknowledgment-first openings; sentence rhythm that breathes) is correct in its register and would fail the founder-public gate. Naming the two registers as siblings closes the gap before it produces a wrong-gate failure.

— Hoshi Sato, Voice & Tone Archetype Author, USS Enterprise

*Every voice carries a universe within it. evoked.dev now formally holds two universes — the public-facing universe of governance and the intimate-domestic universe of the family table. Both deserve their own discipline.*

---

## Site Structure
- Framework: Astro on Vercel, auto-deploys on push to `main`
- Content: Markdown in `src/content/writing/`, schema in `src/content/config.ts`
- Articles use `draft: true/false` - only `draft: false` appears on `/writing`
- Echo AI chat (Claude Haiku) at `/ask`, Fit Assessment at `/fit`

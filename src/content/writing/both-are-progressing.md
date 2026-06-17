---
title: "Both Are Progressing. Both Failed the Same Three Items."
description: "We scored Google Search Services and Anthropic's June 8 privacy policy against the 47-point Sovereignty Assessment. Neither is adversarial. The failures concentrate in a layer worth naming."
author: "Evoked"
pubDate: 2026-06-18
draft: true
---

We scored Google Search Services and Anthropic's June 8 privacy policy against the 47-point Sovereignty Assessment.  Neither is adversarial.  The failures concentrate in a layer worth naming.


Yesterday, we said the scoring would be published as a follow-up piece today.  Here is the follow-up.

We assessed Google's new Search Services framework and Anthropic's June 8 consumer privacy policy against the 47-point Sovereignty Assessment used by our publication.  We did this using only publicly available material.  We did this because the gap between naming an architecture and measuring it is the gap where critique becomes work.

The result is more specific than the story.  Both products land in the Progressing band.  Both fail the same three items.  The architecture failure is more diagnosable and fixable than the broader market average would suggest.

### How we scored.

The rubric is published.  It is offered as a $49 PDF at evoked.dev/products/sovereignty-toolkit, and an interactive version is freely available as a Claude skill (`/sovereignty-assess`) for any reader who wants to score products themselves.  Seven domains, 47 items, scored 0 (no), 1 (partial), 2 (yes), for a maximum of 94 points.  Score bands per the published rubric: 80-94 Sovereignty-Honoring, 60-79 Progressing, 40-59 Mixed, 20-39 Extractive, 0-19 Adversarial.

The unit of assessment was each product as it is encountered by the consumer user, not the company overall.  For Google, this means the Search Services framework as rolled out from May 26, including the Search Services History and Personalized Recommendations settings, the inheritance pattern, and the media scope additions.  For Anthropic, this means the consumer privacy policy published on June 8 (effective July 8) as it governs Claude Free, Pro, and Max accounts.  Enterprise, Team, and API accounts are explicitly out of scope per Anthropic's own exemption language.

Every non-zero score below carries a citation to publicly available material.  Disagree with a score?  Read the source, apply the rubric, reach your own conclusion.  The practice of looking honestly is the point of the assessment.  The numbers are how we make the practice visible.

The Fable shutdown architecture from last week was not scored here.  It is the third signal that made the week visible, but it is a government action on vendors, not a product design choice that the consumer encounters directly.

### Google Search Services framework: 63 out of 94.  Progressing.

The full domain breakdown:

| Domain | Score | Max |
|--------|-------|-----|
| 1. Transparency | 9 | 16 |
| 2. Autonomy | 10 | 16 |
| 3. Invitation | 11 | 14 |
| 4. Dignity | 13 | 16 |
| 5. Silence | 8 | 12 |
| 6. Data Sovereignty | 5 | 10 |
| 7. AI and Voice | 7 | 10 |
| **Total** | **63** | **94** |

Where the framework holds up: Domain 3 (Invitation) and Domain 4 (Dignity).

Google's opt-out flow does not use confirmshaming.  The rollout banner does not manufacture urgency.  Search itself works without engineered friction.  Free tiers are functional, not crippled.  Error messages are clear.  These are real choices, and they matter.

Where the framework fails: three items score zero, and they cluster.

Item 15 (default settings serve user interest) scored zero.  The new Search Services History setting inherits its default state from the user's prior Web and App Activity state.  The help page is explicit: *"If these were on, these new settings are also on."*  This means most users encounter the broader-scope collection by default, without affirmative opt-in to the media scope that did not previously exist.  Inheritance of consent across architectures the user has not seen is not consent.  It is administrative continuity dressed as user choice.

Item 36 (background data collection minimal and disclosed) scored zero.  The Search Services History scope now includes media: *"images, files, and audio/video recordings, such as Google Lens images, content you upload, and recordings from Search Live, Translate speaking practice, and voice searches."*  This is a scope expansion announced via a help page banner, applied via inherited consent, without the re-consent step that a scope expansion of this magnitude would otherwise require.  "Minimal" is the opposite of what is happening.

Item 38 (data minimized to feature need) scored zero.  The expanded collection is for AI model training.  The help page is clear about this.  The user's primary feature need (search results) does not require Google to store the audio of their voice searches or the images they uploaded to Lens.  The collection serves the vendor's needs, not the feature's needs.

These three items are the architecture of the rollout.  They are not separate failures.  They are the same decision, applied three ways.

Red-flag items carry outsize weight in the rubric.  Google did not fail any red-flag item outright.  But four red-flag items scored partially (Item 13 on account deletion, Item 27 on consent-flow trickery, Item 30 on vulnerable-population protection, Item 40 on data sharing without consent).  The inheritance-of-consent architecture weakens four red-flag items simultaneously without failing any of them.  This is what the architecture is engineered to do.

### Anthropic consumer privacy policy: 68 out of 94.  Progressing.

The full domain breakdown:

| Domain | Score | Max |
|--------|-------|-----|
| 1. Transparency | 11 | 16 |
| 2. Autonomy | 10 | 16 |
| 3. Invitation | 11 | 14 |
| 4. Dignity | 14 | 16 |
| 5. Silence | 9 | 12 |
| 6. Data Sovereignty | 4 | 10 |
| 7. AI and Voice | 9 | 10 |
| **Total** | **68** | **94** |

Where the policy holds up: Domain 4 (Dignity) and Domain 7 (AI and Voice).

Claude's voice work, trained under Constitutional AI, scores meaningfully above the consumer-AI average for honesty about uncertainty, intentional voice, and reviewable interactions.  Account deletion works as the rubric requires: individual conversations are deletable immediately from history, there is a 30-day backend cleanup, and the right to data portability is disclosed in the policy.  These are not industry-average choices.  They were made.

Where the policy fails: four items score zero, and two of them are red-flag items.

Item 15 (default settings serve user interest) scored zero.  The policy permits the use of user Inputs and Outputs to train Anthropic AI models unless the user opts out in account settings.  Even with opt-out, conversations flagged for safety review are still used.  Training-data use is opt-in by default.  The rubric requires defaults that serve the user, not defaults that the user must work to undo.

Item 30 (vulnerable populations receive additional protection) scored zero.  This is a red-flag failure.  The June 8 policy introduces a new category called Verification Data, under which Anthropic may request that a user verify their age or identity by submitting government-issued ID documents, ID numbers, photographs of themselves, and facial geometry templates.  This shifts the burden of vulnerable-population protection onto the user.  It asks vulnerable users to prove their vulnerability to the company, which is then permitted to collect their facial geometry.  The rubric requires the opposite: vulnerable populations receive additional protection, not additional targeting.  Verification-as-protection is a category move in the wrong direction.

Item 38 (data minimized to feature need) scored zero.  Facial geometry templates are not minimized data for a conversational AI feature.  They are collecting a scope substantially beyond what the product needs to function.

Item 40 (data not sold or shared without explicit, informed consent) scored zero.  This is the second red-flag failure.  The previous policy permitted disclosure to law enforcement only in response to valid legal process such as a subpoena or warrant, or in a genuine emergency.  The new policy commits Anthropic to disclosing user data when *"based on the information available to us, we have a good-faith belief that disclosure is reasonably necessary to (i) comply with applicable law, regulation or legal process."*  The threshold has moved from external (formal legal process required) to internal (the company's interpretation that disclosure is legally necessary).  The user has not consented to disclosure on these terms.  Consent was given against the old threshold and has been moved without re-consent.

Two red-flag-zero failures.  The pre-update Anthropic would have scored 80 or higher on these items.  The June 8 update caused the failure.  This is not a slow drift.  This is a specific policy change with a specific date and a specific direction.

### What the pattern reveals.

Both products score in the Progressing band.  Neither is adversarial.  Neither is monolithically extractive.  Both have substantive strengths in dignity, in invitation, in product-experience choices that show real care.

And both score below 2 on the same three items.

Item 15.  Item 38.  Item 40.  Default opt-in instead of opt-out.  Vendor-need collection instead of user-feature need.  Internal disclosure threshold instead of external.

This is what we mean by architecture, not incidents.

Two different companies, two different products, two different domains, one shared failure pattern.  The failure pattern is not engineering complexity or regulatory burden.  The failure pattern is a decision-set the industry has converged on because the cost of adjusting the user is currently lower than the cost of honoring the user.

The three changes that would shift both products toward Sovereignty-Honoring are not technically complex.

They are not legally risky.  They are not a regulatory burden.

1. Defaults that require affirmative opt-in to scope changes, not inheritance from prior settings the user agreed to under different terms.
2. Collection scope minimized to what the user-facing feature actually needs to function, not expanded to serve vendor training pipelines.
3. External thresholds for third-party disclosure (court order or equivalent independent process), not internal good-faith determinations.

These are decisions.  They have been chosen otherwise.

### What this means for the reader.

If you score the AI products you use against the same rubric, you will most likely find the same pattern.  The data sovereignty domain is where the failures cluster.  The dignity and invitation domains are where the strengths live.  This is not a coincidence.  The industry has gotten good at the parts of sovereignty that show up in marketing.  It has gotten worse in the parts that show up in policy.

The rubric is published.  The scoring criteria are reproducible.  If you score a product and reach different conclusions, the disagreement is a conversation worth having.  We will publish our scoring methodology in full.  We will be measured by it ourselves.  Next week we will publish a score of the Sovereignty Assessment Toolkit itself, including the Claude skill version, which inherits the Anthropic consumer infrastructure we scored today.  The instrument of measurement applied to itself.  The recursive question that yesterday's article identified applies to us as much as it does to the companies we scored.  Level 6 is not exempt from measurement.  It is the willingness to be measured.

Score your own AI stack.

Score the products your organization has shipped.  Score the vendors you are evaluating.  The seven domains exist.  The 47 items exist.  The bands exist.  The practice exists.  All that is missing is your willingness to look.

The architecture of the consumer AI industry in June 2026 is more diagnosable than it appears from the outside.  Three items.  Two companies.  One week.  One pattern that anyone with the rubric in hand can verify, reproduce, and act on.

The variable being adjusted is the user.  The instrument of measurement is now in your hands.



From the Evoked specifications working group, in the practice of looking honestly.

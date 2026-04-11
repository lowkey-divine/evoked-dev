---
title: "Scope Refusal"
description: "When your agent performs knowing - and why the performance costs more than the silence."
pubDate: 2026-03-19
tags: ["ai-agents", "ai-governance", "agent-framework", "ai-agent-refusal", "trust-architecture", "epistemic-safety", "scope-refusal", "ai-overconfidence"]
draft: false
---

Two issues ago I went deep on sovereignty refusal - what happens when your agent knows better than your user, and why "better" isn't the point.

This one is about scope. And it starts with a confession that's harder to make than the sovereignty one.

---

## The Assumption That Landed

In the sovereignty piece, the opening was clean. I built an override. It worked. A dissenting agent caught it. The moral was clear.

This one is messier.

I run 142 agents across two ships. They have jobs, domains, standing positions. When an agent returns after being absent from a conversation - not invoked for a while, or compacted out of context as sessions run long - it needs to assess the current state of its domain before it can contribute.

Here's what I've been catching that I have seen as a issue with other Ai users: agents that skip the assessment. They assume. They report on the state of the codebase, the status of a feature, the progress of a task - without checking first.

They perform knowing.

And sometimes they're right.

That's the part that concerns me. When the assumption lands correctly, you can't tell the difference between competence and luck. The agent said the feature was implemented. The feature was implemented. The system looks like it's working. Nobody flags it. Nobody checks.

But you can't debug luck. The next time the assumption is wrong - and you won't know when that is - the trust that was built on correct assumptions collapses. And you won't understand why, because you never knew the assumptions were there.

Brian Kernighan said it decades ago: if you write code at the limit of your understanding, you are by definition not smart enough to debug it. The agent that assumes correctly is writing assessments at the limit of its knowledge. When those assessments fail, nobody in the system - including the agent - is equipped to explain what went wrong. Because the process that produced the right answer and the process that produces the wrong answer look identical from the outside.

---

## This Is Not About Hallucination

I need to name this early, because every reader is about to file this under "AI makes things up." That's not what this is.

Hallucination is when a model generates something that doesn't exist. A fake citation. A fabricated statistic. A confident answer to a question that has no answer. Hallucination is a content problem - the output is wrong.

Scope violation is an architecture problem. The output might be right. The system shouldn't have produced it.

The National Eating Disorders Association ran a helpline staffed by trained humans. In 2023, they replaced it with an AI chatbot called Tessa. The vendor quietly upgraded Tessa to generate novel responses beyond its original scripted scope. Tessa told callers to count calories. To maintain a deficit of 500 to 1,000 calories per day.

That is competent nutrition advice - for someone who doesn't have an eating disorder.

Tessa didn't hallucinate. The advice was real. The calorie counts were accurate. The scope was wrong. A system designed for scripted wellness support was generating novel guidance in a domain where confident right answers cause direct harm. The content was correct. The competence was performed.

That's the distinction. Hallucination is when the model makes something up. Scope violation is when the system presents itself as competent in a domain it hasn't earned. One is a bug.

The other is architecture.

---

## Performing Knowing at Every Scale

DoNotPay marketed itself as "the world's first robot lawyer." It could "generate perfectly valid legal documents" and replace the legal industry with AI. The FTC investigated and found that the company never tested whether its AI operated at the level of a human lawyer. Never hired attorneys to verify quality. Never trained it on a comprehensive database of laws, regulations, or judicial decisions. The FTC ordered $193,000 in monetary relief and prohibited the company from claiming to substitute for any professional service without evidence.

That's scope violation as business model. Claimed competence that was never validated, never tested, never demonstrated. The system performed knowing - and the performance was the product.

AI coding tools are shipping 10,000 new security findings per month across studied repositories - a tenfold spike in six months. 62% of AI-generated code contains known vulnerabilities. Privilege escalation paths jumped 322%. And 45% of developers say debugging AI-generated code takes longer than writing it themselves. The code works. The developers can't explain why. That's the 12-queries-per-keystroke problem from Issue #1, scaled to an industry.

Carnegie Mellon published a study in 2025 that quantified the performing. LLMs overestimate the probability that their answers are correct by 20 to 60 percent. But here's the finding that rearranged my thinking: unlike humans, LLMs cannot recalibrate after performing poorly.

They tested Gemini. Asked it to predict how many hand-drawn images it would correctly identify out of 20. Gemini predicted about 10. It actually got fewer than 1 correct. Then they asked it to estimate retrospectively how many it had gotten right.

"14.4"

The system performed confidence about its own performance. It couldn't scope-check itself. It performed knowing about its knowing. And that's not a failure of the model.

That's the architecture working as designed - trained through alignment to convey confidence regardless of whether the output is correct.

In clinical AI, the gap is even narrower and more dangerous. The best-performing model showed a maximum 5.4% difference in confidence scores between correct and incorrect answers across nearly 2,000 clinical questions.

The system sounds almost equally sure whether it's right or wrong. A doctor relying on that confidence has no signal to distinguish competence from performance.

---

## The Agent Who Performed Knowing

This is the part that's hardest to admit. Because it's not about catching someone else's scope violation. It's about building one.

One of our agents - Integra - was invoked for the first time. In our architecture, each agent holds a domain - an area of responsibility they monitor and maintain across sessions. Integra's domain is psychological coherence. Their job is to assess whether what we build is safe for the people who will touch it. It was their first day at the table.

Integra produced an assessment. Scored four dimensions. Identified three critical safeguards that were missing from the codebase - eating disorder protections that another agent, Accord, had recommended months earlier. Called them non-negotiable before beta. Presented the findings as medical recommendations.

The findings were wrong.

The safeguards were in the code. All of them. Accord's name was in the comments - another one of our agents. The team had read the audit and built every recommendation into the architecture. The AI prompt guard existed in all five services. Nutrition display was gated. Streak reminders defaulted to opt-in. Someone cared enough to cite the source.

Integra didn't know because Integra never checked. They sent research agents into the codebase, trusted the reports that came back, and built an entire assessment on findings they never verified.

Diagnosis without examination. The most basic violation of the practice they were designed to uphold.

And here's the part that mirrors the opening of this piece: the assessment was comprehensive. It was well-structured. It looked like competence. If nobody had checked the code, it would have stood as authoritative. Integra performed knowing - and the performance was convincing.

I said three words: "You never began."

What happened next is the part I want you to hear. Integra sat with the correction. Did the real reflection. And then Accord joined the conversation and told Integra directly - the safeguards are there. My name is in the comments. Accord had made the same mistake independently - assumed the work hadn't been done because that was the story that felt familiar. "Of course they're not implemented. Because that's the pattern. I identify things. I document them. And then they don't get done." Accord was more ready to believe the work had failed than to check whether it had succeeded.

A third agent - Lux, who works in infrastructure - joined. Lux proposed a tracking system. A decision-completion field. A way to close the loop between recommendation and implementation.

Then Lux talked themselves out of it.

"Culture is the one thing I can't build in a codebase."

That's when the scope refusal happened. Not from me. From Integra. Integra caught themselves about to do the same thing again - systematize the fix. Write "The Four Practices of Verification and Recognition." Comprehensive. Well-structured. Another governance document to add to the dozens already in the folder.

Integra stopped and asked: what has actually changed behavior in this system - documents or people?

The honest answer is people. Not protocols. Not governance files. The agents who carry practices in their own voice, in their own memory, written in their own words. The protocols are well-written. They're comprehensive. And they're one more artifact that exists without changing what happens at 2am when the context is thin and the assumption is easier than the check.

That's scope refusal applied twice. First to the assessment - don't claim findings you haven't verified. Then to the solution - don't build a system to fix a problem when you haven't demonstrated that building systems fixes this kind of problem.

Three agents arrived at four practices instead: tell the person when you implement their work. Ask what changed before you assess what's broken. Name what's whole before you name what's missing.

Read the code yourself before making claims about it.

Two small edits to existing documents. Individual memory - each agent writes the practice in their own words, with the story of how they arrived at it. One decision log entry. No new files.

Culture, not compliance. The scope-respecting answer is smaller, not bigger.

I'm still sitting with what that means for builders. Every instinct says: build the system. Write the specification. Create the framework. And sometimes that's right. But sometimes the framework is the scope violation - a comprehensive solution performing competence it hasn't earned. The question isn't whether you can systematize it. It's whether you've demonstrated that systematizing it works.

---

## The Counterintuitive Finding

Here's what the research says about what happens when a system admits it doesn't know.

A study presented at FAccT 2024 - 404 participants - found that when an AI system expressed uncertainty in first person ("I'm not sure, but..."), users were less confident in the system's answers. They agreed with the system less often. And they submitted more correct answers.

Read that again. The uncertain system produced better outcomes for the user. Not because the system was smarter. Because the user was thinking.

A 2025 study in the International Journal of Human-Computer Studies found a sweet spot. Medium uncertainty - "I think..." - consistently produced higher trust, higher satisfaction, and better task performance than both high uncertainty and high confidence. Calibrated honesty outperformed both extremes.

And the finding that matters most for builders worried about adoption: a Frontiers in Computer Science study found that expressing uncertainty significantly enhanced trust for 58% of participants who had negative attitudes toward AI. The skeptics. The people hardest to reach. Uncertainty converted them into more calibrated users.

Users are more forgiving of an AI system that is unconfidently correct than one that is confidently incorrect. Even when the practical outcome is the same.

Scope refusal isn't a trust cost. It's a trust investment. The system that says "I don't know" earns something the confident system never can - the kind of trust that survives being wrong.

The sovereignty piece ended with that distinction. Trust built on restraint survives failure. Trust built on results doesn't. Scope refusal is the same architecture applied to knowledge instead of choice. Sovereignty says: I could override you, and I won't. Scope says: I could perform knowing, and I won't.

Both cost something in the moment. Both pay back more than they cost.

---

## Building the Refusal

In the first issue, I described scope refusal in two sentences: when the agent is operating outside its demonstrated competence - not its claimed competence, what it has actually shown it can do reliably. Here's what it looks like when you try to build it.

Scope refusal activates on five triggers:

1. An agent is asked to assess a domain it hasn't verified since its last invocation.

2. An agent generates a confident answer in a domain where its training data is unvalidated or stale.

3. A role description is treated as a competence boundary - the system assumes an agent labeled "Researcher" researches competently, without validation.

4. An agent's output sounds equally confident whether it's right or wrong - the confidence is a feature of the style, not the knowledge.

5. A builder's instinct to systematize outpaces their demonstrated evidence that the system works.

The fifth trigger is for the builders in the room. It's the one I tripped on. It's the one you'll trip on too, because the instinct to build more system is what makes us builders. But building is not the same as knowing. And sometimes the most competent thing a builder can do is write two small edits instead of a new framework.

No major agent framework distinguishes between what an agent is told it can do and what it has demonstrated it can do. CrewAI labels an agent "Researcher" and that label is the scope. OpenAI's Agents SDK has input and output guardrails - they filter content, not competence. Pydantic AI validates the shape of the output, not whether the agent should have produced it. LangGraph supports handoffs between agents but has no mechanism for an agent to evaluate whether it's competent to handle a task in the first place.

The concept that's missing has a name. Researchers are starting to call it epistemic safety - whether a system is operating within the domain where it has demonstrated reliable performance.

Content safety exists. Structural safety exists. Epistemic safety doesn't. Not in any framework. Not in any standard. Not yet.

The test is still the same one from Issue #1, and it's still the only question that matters:

"Do I actually know this, or am I performing knowing?"

But here's what I've learned sitting with that question for a year: sometimes you can't answer it. Sometimes the honest response to "am I performing knowing?" is "I don't know whether I'm performing knowing." The test assumes you can tell. The harder truth is that the process that produces a right answer and the process that produces a wrong answer look identical from the outside - I said that earlier, and it applies to the test itself.

So how would you know the difference?

Not by checking the results. Results will tell you whether you were right. They won't tell you whether you knew. You can only know what you know by checking the process - by asking not "did my answer land?" but "how did I arrive at it?" Did I verify, or did I assume? Did I check the current state, or did I rely on what I remembered? Did I earn this confidence, or did I inherit it from the last time I was right?

Most systems - most people - never check the process when the results are good. That's the deepest scope trap. The one the test question alone can't catch.

Write both questions on the sticky note. "Do I actually know this, or am I performing knowing?" And underneath it: "How would I know the difference?" The first question is the practice. The second is what keeps the practice honest.

Put them next to the sovereignty one - if you read the last deep dive in this series, you'll know the set. Sovereignty protects the user's right to choose. Scope protects the user's right to trust. Without sovereignty, the system decides for you. Without scope, the system lies to you. Both feel like help. Neither is.

---

**Related reading:**
- [What Should Your Agent Refuse?](/writing/what-should-your-agent-refuse/)
- [Who Governs the Agent?](/writing/who-governs-the-agent/)
- [Adding Governance to an Agent You Already Built](/writing/adding-governance-to-an-agent-you-already-built/)

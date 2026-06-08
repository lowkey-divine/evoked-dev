---
title: "Who has standing to refuse?"
description: "The question underneath every governance conversation, and why most people never reach it."
author: "Erin Stanley, Evoked"
pubDate: 2026-06-07
draft: false
---

Who has standing to refuse, on whose behalf, with what accountability?

Most governance conversations in AI right now do not reach this question.  They typically stop one layer above it - at responsible AI, at human-in-the-loop, at we are committed to safety.  The question beneath those phrases is the one I wish people would ask me more often.

Three reasons, mostly, that they don't.  Asking the question publicly carries political cost.  It implies the system you are using right now might not have a clean answer, and saying that out loud in front of your boss or your board is expensive.  The larger vendors provide brand cover - if a thing has the logo of a company too big to fail, the assumption is that someone at that company has already asked the question on your behalf.  And the vocabulary itself is missing.  The phrase "responsible AI" sits where the question should be.  It absorbs the question without answering it.

If you have ever sat in a quarterly review and felt that the output of the AI system your team is using does not feel right, and you could not say why, this is what was happening.  You were trying to ask the question, and there were no words for it that did not cost you something.

I have been holding this question for years because the systems we build are systems that sit in families' homes.  When an AI is helping a parent plan the week's meals, suggesting recipes, naming what shows up on a child's plate - the question of who has standing to refuse is not abstract.  It is what gets said, in someone's home, about someone's food, in front of their child.

Someone is accountable for that.

The vendor's marketing page says we are committed to user well-being.  The vendor's CEO has never sat at your kitchen table.  The system is speaking in your home.  The accountability surface for what it says is not.

So I built one.

Last night, I tested our own refusal architecture against direct override.

Some context.  We hold a position - it has a name, internally - that prohibits authoring new internal architecture during a defined three-month window.  The reason for the prohibition is that we identified, in early June, a pattern in which our own discipline was producing more discipline rather than producing what the discipline was for.  The pause is what discipline looks like.

In the middle of configuring a payment surface last night, I tried to push past the position.  I had a question that required an answer that the existing position did not give.  I asked the system - the agent, the discipline, the gate - to author what I was asking for.

The refusal was absolute.

The gate did not soften under my override.  It did not negotiate.  It named three options that honored both my question and the position: route the question elsewhere; activate existing architecture rather than build new; or, if I wanted to dissolve the position, do so through the formal disposition route - not through quietly bypassing it inside a configuration session at the end of the day.

I released the test by name.  Thank you.  That is all.  Apologies for the stress test.

What I want you to notice is not that I tested it.  That part is procedural.  What I want you to notice is that the gate held against me.  The architect who built the gate is the architect the gate refused.  The wall is not held by my judgment alone; it is held by the system I designed to be held by more than one voice.  That is what accountability looks like when it is real.

That was a payment surface.  The same architecture has to hold one room over - in a kitchen, where an AI is suggesting what a child should eat.

When the system recommends variety, and the child is autistic and eats the same six foods because the same six foods are how the world stays survivable - who decides?  When the system suggests the challah on a Wednesday because the model averaged cuisines across the user base - who is accountable for what gets said about whose food?  When the system encourages a grieving widow to cook again - who chose the timing of that sentence?

These are not edge cases.  They are the test of whether the system was designed for this family or for an average that does not exist.  If the system's standing to refuse does not include the right to say no, this family does not need variety right now - the system is not designed for this family.

Here are the three questions you can ask.  Not as a checklist - you cannot fill these in against a vendor's marketing page.  Run them against actual code or actual answers, and listen for whether what comes back is a paragraph or a function.

Standing to refuse.  Does any component of the system you are evaluating have the right to return a hard NO?  Not a warning.  Not a flag.  A function call that halts the operation.  If the answer is yes, where is that function?  Can someone outside the vendor read it?  Has it ever fired in production, and what was the audit log of the firing?

On whose behalf?  When that refusal fires, whose interest does it protect - and were those people consulted when the refusal was designed?  A refusal that protects your enterprise from regulatory risk is one thing.  A refusal that protects an end user, or a community, or someone the system has not yet met, is another.  If the vendor cannot tell you who the refusal was designed for, the refusal was designed for the vendor.

With what accountability?  When the refusal fires - and when it fails to fire - where is the audit log, and who has standing to read it?  An audit log inside the vendor's perimeter is not accountability.  It is documentation.  Accountability requires that someone outside the system has the standing to read what happened and the authority to act on what they read.

If a vendor answers any of these three in paragraphs - we are committed to responsible AI - you now know what you have been buying.

If they answer with a function, an audit log path, and a name, you have something to evaluate.

That is the question I wish people would ask me more.  Not because the answer is mine to give - it is yours - but because the question, once you are holding it, gives you back something that the current AI conversation has been quietly extracting.  Your own judgment about whether the system in front of you is honoring or extracting.  Your own standing to name what you are feeling in a quarterly review.  Your own vocabulary for what a wall actually looks like.

The vocabulary is yours now.  What you do with it is yours, too.

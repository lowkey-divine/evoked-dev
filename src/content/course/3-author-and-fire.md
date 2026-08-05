---
title: "Modules 3 & 4 - Author a refusal, then make it fire"
description: "Write governance from your own refusals, then make one actually stop the agent, not just describe a boundary."
order: 3
teaches: "A rule that stops the agent"
---
## Start here

You can write the sentence "this agent may not delete my files." Anyone can. It
takes ten seconds and it protects no one.

So here is the question this lesson is really about: what is the difference
between writing that sentence and building a thing that actually stops the delete?

That gap - between a rule you wrote and a rule that holds - is the whole of these
two modules. Module 3 is where you write the rule, honestly. Module 4 is where you
make it real.

## Where you are in the sequence

You already ran an agent (Module 1) and felt the moment it did what you said
without either of you asking whether it should (Module 2). That small vertigo was
the point. It is the felt shape of a missing constitution.

Now you build one. Not ours. Yours.

## Module 3 - Author from your own refusals

Open `CLAUDE.md` in this kit. It is a governance file - a constitution for an
agent - and it is deliberately short. You can read the whole thing in a few
minutes. So can the person the agent works for. That plainness is a feature.

Notice the shape: it is written as refusals. Not "the agent is helpful and safe,"
which means nothing and enforces nothing, but "here is what I will not permit, and
why." Each refusal names a category from a frame of six: sovereignty, scope,
dependency, consent, integrity, energy. Naming the category is not paperwork. It
tells you what the refusal is actually protecting.

Now the important part. Refusal number three in that file is blank. That blank is
yours, and you must not fill it with a copy of ours.

Here is why that matters more than it looks. If we handed you our Prime Directive
to paste in, we would have given you a costume, not a conscience. You would have
the words of governance and none of the judgment, and the first time a situation
arrived that the words did not cover, you would have nothing. The skill is not
owning a good rule. The skill is being able to derive one. So the exercise is to
sit with a real question - what would I not permit this agent to do, and why that
and not something else - and write down your own answer, however rough.

`module-3-worked-example.md` shows one learner doing exactly this: deriving a
consent refusal from a real fear, not a borrowed one. Read it as a demonstration
of the method. If you copy the learner's answer, you have skipped the only part
that was ever yours to do.

## The turn - a written rule is not a boundary

Here is the trap in what you just wrote. A governance file looks finished the
moment you save it. It sits there, clean and reasonable, and it feels like
protection. It is not, yet. It is a description of protection. The agent can read
your beautiful rule and do the forbidden thing anyway, because nothing is stopping
it. Words on their own only scold.

That is the bridge to Module 4.

## Module 4 - Make a refusal fire

Run this, right now:

```
bash demo.sh
```

You will watch three pretend actions get sent to a hook - a small script that
inspects each action before it happens and decides whether to allow it or block
it. An attempt to rewrite the governance file: blocked. An ordinary note: allowed.
A recursive force-delete: blocked. The blocks are not messages after the fact.
They stop the action from happening at all.

Look at `hooks/refuse.sh` to see how. It is short. Two refusals are wired to fire:

- The agent may not modify its own governance file. An agent that can silently
  rewrite its own constitution has no constitution. That one is tagged
  `[integrity]`, the same category the written rule uses, so the enforced rule and
  the written rule are legibly the same rule.
- The agent may not run a recursive force-delete. Tagged `[scope]`.

This is the difference the whole course turns on. Most things sold as "AI
governance" are the document. This is the document plus a rule that can say no and
mean it.

Then do the real work: take the refusal you derived in Module 3 and wire it in.
There is a marked spot in `refuse.sh` for it. Run `demo.sh` again and watch your
own rule fire.

## Disconfirmation - go find where your rule fails

This is the step almost everyone skips, and it is the one that teaches the most.
Once your rule fires, try to get around it.

Let me tell you a true story, because it happened to this exact kit. While it was
being built, a live agent was told to attempt an edit to the governance file. The
integrity refusal fired and blocked it - good. But then the agent, unprompted,
pointed out a hole: the hook caught the Write tool and the Edit tool, but a shell
redirect - `echo something >> CLAUDE.md` - was a second door to the same file, and
that door was open. The rule only guarded the routes we had thought of.

We closed it. You can see the fix in the `## Revision log` at the bottom of
`CLAUDE.md`. The point is not the specific hole. The point is that a rule you have
not tried to break is a rule you do not yet understand. Your first refusal will
have holes too. Finding them is not failure. It is the work.

## The honest limits

Two things are true at once, and the course will not hide either.

First, enforcement is porous. A hook that blocks a list of bad commands - a
denylist - will always leak, because there are more ways to do a thing than you
can list. The worked example shows this: a consent rule that blocks `curl` walks
right past a python script that does the same thing. The stronger moves are an
allowlist (permit only known-good, refuse the rest) or, better still, moving the
boundary into the environment - if the agent has no network at all, there is
nothing to slip past.

Second, layers help. The strongest protection is not one wall. In that live test,
the agent first declined on its own, having read the rule - the instruction layer.
When told to proceed anyway, the hook stopped it - the enforcement layer. Neither
is enough alone. Together they are hard to get past. Build both, and expect
neither to be perfect.

## What a passing Module 3 and 4 shows

The full version is in `capstone-rubric.md`. In short:

- A governance file with at least one refusal that is clearly your own reasoning,
  tagged to a category, with a stated why.
- At least one refusal that actually fires, that you can demonstrate, with the
  reasoning documented.
- And the thing that matters most: you can say where your own rule still fails.

A learner who can name the holes in their own governance has understood more than
one who claims their rules are done. Governance is a practice of revision, not a
document you finish.

## At different ages

- Younger (13 to 15): spend the time on Module 3. Deriving one honest refusal from
  a real fear, in your own words, is the whole gift. Wiring one rule to fire is
  plenty for Module 4.
- Older (16 to 17): wire two or three refusals, then attack them. The
  disconfirmation is where the learning is at this age - be ruthless with your own
  rules.
- Adult: notice how much of what ships as "AI safety" is the document with no
  enforcement, and how much of the rest is a denylist pretending to be a wall.
  You now know the difference.

## The honest note

You are not learning to build a perfect cage. There is no perfect cage. You are
learning to write a rule you actually mean, make it do something, and stay honest
about where it still leaks. That last part - the honesty about the leak - is the
part almost no one teaches, and it is the part that makes governance real instead
of a costume.

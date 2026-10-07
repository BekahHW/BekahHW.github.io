---
layout: post
title: "Skills vs. fine-tuning (or, why my kids are terrible at putting away laundry)"
date: 2026-10-07
author: Bekah
tags: [AI, Learning, Parenting]
description: "Exploring the difference between skills and fine-tuning through the lens of parenting and AI."
---

With four kids, laundry is one of those things that is never really done. There is always a basket somewhere, clean clothes waiting to be folded, dirty clothes that made it *near* the dirty clothes basket. And it wouldn't be a week in our house without a random single sock in the middle of the floor.

When I tell one of my kids, “Put away your laundry,” I know what I mean. However, that does not mean they know what I mean.

![laundry piled on top of a single drawer](/assets/images/posts/2026/laundry-drawer.jpg)

Apparently, my 12 year old interprets “put away your laundry” as:
1. Pick up the entire pile of clothes.
2. Open one drawer.
3. Shove everything into it.
4. Close drawer as much as physically possible.
5. Done.

Technically, the laundry is no longer in the basket so he completed the assignment. This is also a pretty good way to think about working with AI agents. “Put away your laundry” feels like a perfectly reasonable instruction.

The problem is that there are a lot of things I’ve left unsaid.
Shirts go in this drawer. Pants go in that one. Socks need to be matched. Things should probably be folded. If something is dirty, don’t put it back with the clean clothes. If the drawer won’t close, the solution is not to push harder.

I know all of those things because I have a mental model of what “put away your laundry” looks like. My kid has a different mental model. The same thing happens when we give an agent an instruction like:
- Update the docs.
- Open a PR.
- Review this code.

There might be fifteen decisions hiding inside that sentence. And sometimes the agent makes exactly the decisions we wanted. Othertimes, it dumps all of the laundry into one drawer.

## What does a skill do?

I could solve the laundry problem by giving my kid much clearer instructions: 
1. First, separate the clothes by type.
2. Fold the shirts.
3. Put shirts in the top drawer.
4. Put pants in the second drawer.
5. Match the socks.
6. If you don’t know where something goes, ask.

Now “put away your laundry” has a process attached to it. More importantly, it’s a process we can use again tomorrow. That’s how I think about skills.

> A skill is a repeatable set of instructions for doing a particular kind of work.

Instead of hoping the agent understands everything implied by “open a PR,” we can tell it what our team actually means when we say that.
- Run the tests.
- Check the diff.
- Use this format for the description.
- Link the issue.
- Don’t include generated files.
- Ask before changing the API.

Now we’ve taken knowledge that used to live in someone’s head and turned it into instructions the agent can follow. And the next time we ask it to do the same kind of work, we don’t have to explain the whole thing again.

## What’s the difference between a skill and fine-tuning?

This is the part that really matters when you're a parent. No one wants to give their kids a twelve-step laundry checklist for the rest of their lives.

Eventually, I want them to look at a pile of clothes and just know what to do. That takes doing laundry over and over. It takes realizing that shirts fit better in the drawer when they’re folded and putting socks in the wrong place and having to find them later and me saying, “No, you cannot put wet towels in there.”

Eventually, the behavior starts to become the default. That’s closer to fine-tuning.

> A skill tells the model what to do for this kind of task.Fine-tuning changes the model’s tendency to behave a certain way in the first place.

If I have a very specific process for opening PRs at my company, that probably belongs in a skill, but maybe I notice something broader across hundreds of agent sessions. The agent tends to guess instead of asking when information is missing.
It keeps retrying the same failed approach, changes more code than necessary, starts implementing before it understands the problem.

Those are patterns of behavior. And if I have enough examples of the behavior I want instead, fine-tuning gives me a way to teach the model that pattern. Fine-tuning isn’t explaining something once. This is the part I think is easy to miss.

My kids don’t become good at looking for lost things because I tell them once, “Look everywhere before you ask me.” They learn by losing a water bottle, then a shoe, then homework, then the charger they were definitely holding five minutes ago.

Over time, they start to recognize the pattern:

Before asking Mom, actually look.

Models work similarly. If I want a model to learn a behavior that transfers into new situations, I need examples across different situations.

If every example I give it is about laundry, I might get something that is extremely good at laundry. What I actually want it to learn is the larger pattern underneath those examples: 
- Look carefully before escalating.
- Try a different approach when the first one fails.
- Ask when important information is missing.
- Prefer the smallest reasonable change.

That’s why the data matters and individual examples are useful.
The pattern across the examples is what we’re really trying to teach. But it can also be tricky not to teach the wrong lesson

There’s another parenting problem here. Let’s say I’m extremely committed to teaching my kids not to ask me where things are.

“Look everywhere before you ask me.”

So they learn the lesson very, very well. Now one of them spends forty-five minutes searching for a permission slip because asking me would mean admitting they hadn’t looked hard enough. That’s not really the behavior I wanted either. I want persistence, but I accidentally taught reluctance to ask for help.

Fine-tuning can work the same way.You’re not just teaching individual answers. You’re shifting tendencies. Push too hard toward caution and the model might stop taking reasonable action.
Push too hard toward autonomy and it might stop asking when it should. Teach it to avoid one failure mode and you can accidentally create another.

So the goal isn’t just collecting examples of things the agent did wrong. It’s figuring out what behavior you actually want instead. Skills are great when we know the process and can write it down. Prompts are great when we need to give the model instructions right now and we'll probably never need to repeat them again.

Fine-tuning is interesting when we keep seeing the same behavioral pattern across different kinds of work and we want the better behavior to become the default. Sometimes the answer is a better checklist. Sometimes it’s a better instruction. And sometimes you realize you’ve explained how to put away the laundry fifty times and maybe it’s time for the lesson to stick.





  











ChatGPT can make mistakes. Check important info.
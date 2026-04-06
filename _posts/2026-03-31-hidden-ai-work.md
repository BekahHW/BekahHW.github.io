---
layout: post-interactive
title: "Productive Is the Least Interesting Word We Have for AI"
description: "What looks productive in an AI session often hides a whole layer of alignment work we do not even notice while we are doing it."
date: 2026-03-31
tags: [AI, DevRel, Developer Experience]
author: Bekah
interactive_js: ai-session-tax.html
---

Once I was in an interview, and I was asked what motivated me. My answer was momentum. And maybe that's why working with AI can be so engaging sometimes. And maybe it's also why it could be so frustrating. When we feel like we have momentum and we're moving more quickly than usual, that's motivating. But when you're stuck and you can't get the LLM to do what you want it to, despite prompting in 5 different ways, it's frustrating. 

A lot of times, we end up figuring it out and then we call the session "productive." We completed the task, shipped the thing, and then we're off to the next thing. 

But I think we need to pause at productivity and dig into that a little deeper. Because if productivity is the metric of success, we're missing a whole layer of work we’re doing.

For example, over a ten day period I worked with Claude Code building, iterating, experimenting, shipping, documenting a personal project. I definitely had some of those frustrating moments, and it was important to me that I learned from those sessions and where I was getting frustrated. I had been running the session with [tapes](https://papercompute.com/blog/introducing-tapes/), so I had session recordings with replay of everything I had done. That was 426 messages. 13.1M tokens. And a whole lot of data to figure out what was happening.

It's never just a user sending a message and the agent responding. It's alignment, clarification, confirmation, iteration, an ongoing labor of getting Claude and me to operate from the same reality long enough to move the work forward.

What I found was that probably under 40% of those sessions were actually task work. It's not to say that the other 60% was a failure. The session was productive in the way that most of us mean that word. But the data tells a more honest story. I learned about how much invisible work hides inside an AI workflow, and how alignment tax impacts the quickest way to success.


## I didn’t think this was a problem

Thinking back about my own experience, I was thinking more about the outputs than about what was happening because nothing was breaking *eventually* I was getting what I was asking for. Sure, I was looking at things like how fast it was completed and how many tokens were being used, but I wasn't looking closely enough about what was happening in the conversation.

I was describing a task, the llm was giving me something close to what I meant, but not quite. So I corrected it, it adjusted, I attempted to verify the results, noticed filenames didn't match, I fixed the reference, checked the directory, and confirmed the output.

So to sum this up a bit, I was doing two things at once:

1. moving the task forward
2. establishing the shared context the task depends on.

Those aren't the same kinds of work. The second is the alignment tax. Those are the extra cycles spent not on the work itself, but on establishing the shared reality required for the work.

In my case, the model didn't recognize my file naming conventions. It didn't understand my visual references. It didn't know which assumptions were safe and which ones were going to cost me another three turns. I knew some of that. I didn't know some of it until the model guessed wrong and exposed the gap. That's the part I'm interested in here, because it helps me work more deliberately.

Here's what I mean. I gave the model a straightforward task: place images in the blog post. It created placeholder image paths that made sense based on the information it had. We can call it "reasonable defaults." So, in a narrow sense, the task was done. The problem was that it didn't use the images I had already uploaded. It created placeholder paths instead of the actual path. So instead of linking to `ai-llms-model.svg`, I got `ai-llm-model.svg`. And a similar scenario for the other images. Nothing dramatic, but another check and correction for a "simple" task, which meant the task was technically completed twice: once against assumptions and once in reality.

When I went back and looked at the tapes data, this is what I saw:


{% include interactive/session-explorer-v3.html %}


## Three kinds of alignment work

But the alignment tax isn't just one thing. Here are some different ways I saw it showing up: 

### Semantic Alignment

Semantic alignment is when you and the model are using the same words but not meaning the same thing.

In my session, the clearest example was visual. I said “sparkles” and meant blurry glowing halos, almost star-like. The model implemented tiny 1–2px dots. Technically sparkles. Not remotely what I meant. We spent multiple rounds getting to the same picture with the same word.

That’s not the model being irrational. It’s a reminder that language is doing more work than we think.

### Structural Alignment

Structural alignment is when you and the model are working from different maps of the territory.

At one point I asked it to find files in documents/ai blogpost. The model didn’t have access to that directory. That wasn’t obvious to either of us until it tried. The problem wasn’t wording. It was environment.

### State Alignment

State alignment is the ongoing work of keeping the model current as reality changes.

Placeholder filenames became real filenames. `tapes.db` became `tapes.sqlite`. A new directory appeared, a file moved, a new project meant shifts in structure. Every time the ground truth shifted, there was work to sync the model’s working assumptions with what was actually true.

```
Intent → Model assumes X → Output based on X
         ↑                          ↓
         └── Correction: X is wrong, Y is true ──┘
```
## Some of the Alignment Tax Was Mine

Let's be fair. A lot of the alignment tax was on me. In my session, visual design tasks had the highest alignment tax by far. Trying to describe what I wanted something to *look* like in precise enough language for the model to execute. This is probably obvious, but I am not a designer. 

It's worth calling out because that means some of what I'm calling alignment tax is really a mismatch between the kind of work I’m doing and the precision I can bring to it. I can usually describe structural changes pretty cleanly. I am much worse at describing visual nuance on the first try.

> Alignment tax comes from the distance between what you mean and how clearly you can express it in a form the model can act on.

Once you can see your own patterns, you can do something with them. You can front-load more context, change how you prompt, reach for examples earlier, or you can recognize a certain kind of task is going to cost you more than it would cost someone whose specialty actually lives there.


[tapes](https://tapes.dev/) didn't just surface what happened in my session. It showed me where I tended to loop. These are my weak spots that are causing extra alignment overhead. It helped me identify where another person's workflow or skill might help me collapse my five rounds into one. In my mind, this is a way to identify where shared skills could actually matter.

Digging deeper into the data, I was able to recognize a set of handoffs between intention, interpretation, execution, correction, and continuation.

That’s why I think words like traces and telemetry matter here, especially for agents.

When an agent or model touches real work, the question isn’t just “did it respond?” It’s:
- what happened, in what order
- where did assumptions enter
- where did retries pile up
- where did the workflow get expensive
- where did it break down

Logs can tell you that something happened, but traces and telemetry help you see how it happened.

As these systems become more agentic, more tool-driven, and more multi-step, that visibility matters more, not less.

## Productivity isn't the Metric

The word "productive" feels inherited from a world where work was easier to isolate. Alignment work looks a lot like task work from the outside. You're still typing, responding, and making progress at least some of the time. But not all forward motion is equal. Some of that motion is the work, some is maintaining the conditions under which the work can happen. Not just so we can complain about it (although I have), but because it gives us something we can look at directly. 

I don't think this underlying issue is unique to me. I think a lot of users are saying "prompting" but what we mean is a mix of execution, interpretation, repair, and syncronization. tapes gave me a way to inspect where my workflow looped, drifted, retried, and recovered, so I can start asking better questions and not just, "did this work" or "was this fast." Now I'm more concerned with questions like:

- Where did alignment break down?
- Which tasks cost me the most overhead?
- What am I personally bad at expressing?
- Which skills would reduce that tax if I reused them from someone better at this kind of work?
- What patterns keep repeating across sessions?

This feels like a better starting point, and more precise work.

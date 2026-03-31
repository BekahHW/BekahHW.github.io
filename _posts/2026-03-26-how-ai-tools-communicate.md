---
layout: post-interactive
title: "How AI Tools Talk to Each Other"
date: 2026-03-26
tags: [AI]
author: Bekah
description: An interactive guide to the three communication patterns that power AI tools and why tool chains break when context runs out.
interactive_js: ai-tool-communication.html
---

> **Part of the AI Foundations series.** New to AI? Start with [AI Vocabulary 101](https://bekahhw.com/AI-Vocabulary-101) and [AI 102](https://bekahhw.com/AI-102) before diving in here.

This weekend, my daughter ran in her first high school track meet. One of the other girls relay teams was disqualified for dropping the baton. I don't know much about track, so I was surprised to learn that dropping the baton can result in a DQ (disqualification). The thing that really sucks is that those girls were the fastest team, even after having to recover the dropped baton. But, at the end of the meet, it doesn't matter how fast each runner is if the baton doesn't make it across the finish line without the team getting DQed. The team has to work together, and the baton is the thing that connects them.

It's kind of like what's happening when AI tools communicate. The intelligence of each individual tool matters less than whether they can pass information to each other cleanly. And most beginners don't realize this until something breaks and they're staring at an error message with no idea where to start.

Most AI tool communication happens through a small number of patterns. Once you recognize them, debugging stops feeling like magic and starts feeling like plumbing.

## Everything is a Message

If you've ever wondered why some AI tools feel instant while others make you wait, or why a multi-step AI workflow sometimes just… stops mid-chain, it comes down to three fundamental communication patterns.

When one piece of an AI system needs to talk to another, it sends a message. That message is almost always structured as JSON, which sounds intimidating but is really just organized text.

Think about ordering food at a restaurant. You don't just say "I want stuff." You say "I want a burger, medium, no onions, with fries." That structure is what lets the kitchen actually process your order. JSON is the same idea. It organizes information into labeled fields so the receiving tool knows exactly what it's looking at.

A simple JSON message might look like this:
```json
{
  "action": "search",
  "query": "best pizza in New York",
  "results": []
}
```
The API, or Application Programming Interface, is the agreement between two tools about what fields to expect and what format they'll be in.

Here's what that looks like in practice. Say you're building a workflow where someone submits a form on your site, and you want an AI to draft a personalized response. Your form tool sends a message to the LLM that might look like this:
```json
{
  "name": "Jordan",
  "question": "How do I get started with open source?",
  "experience_level": "beginner"
}
```
The LLM knows to look for those fields because your API agreement says they'll be there. It uses name to personalize the reply, question to know what to answer, and experience_level to calibrate how technical to get.

Now imagine your form tool sends this instead:
```json
{
  "username": "Jordan",
  "inquiry": "How do I get started with open source?",
  "level": "beginner"
}
```
The LLM is now confused because it was expecting "name," "question," and "experience_level." The LLM goes looking for name and finds nothing. It goes looking for question and finds nothing. The chain breaks, not because anything was wrong with the content, but because the tools weren't speaking the same language.

{% include interactive/json-mismatch.html %}

When something breaks in a tool chain, it's almost always because one tool sent a message the next tool didn't understand. Wrong format. Missing field. Unexpected data type. The fix is rarely complicated. But you have to know that's where to look.

## Three Ways AI Tools Communicate

Before we dig into the details, let's look at how these patterns work in practice. The interactive demo below lets you step through each one.

{% include interactive/comm-patterns.html %}

Most builders start with request/response and eventually add streaming when their interface feels sluggish, or events when they want something to run without manual triggering. But the real magic happens when you combine them. You can have a tool chain that starts with an event trigger, streams output to the user, and then sends a final request/response message to update a database.

## What Actually Breaks Multi-Step Chains

Each of those three patterns works fine in isolation. Tool chains fail in very predictable ways. If you know the patterns, you know where to look. The problem shows up when you chain tools together and the context window (the AI's working memory) fills up.

### Context window overflow. 

Every LLM can only "see" a certain amount of text at once. Imagine trying to read a book but you can only ever see 10 pages at a time. If you keep shoving earlier chapters into the window to maintain "memory," you eventually run out of room for the chapter you're actually trying to read. Builders who chain multiple tools together can accidentally fill the context window with outputs from earlier steps, leaving no room for the actual task. Smart builders decide what to pass forward and what to leave behind.

{% include interactive/context-overflow.html %}

### Malformed outputs.

If step three in your chain expects an organized JSON object and step two returns a casual paragraph of text, step three breaks. It's like asking someone to fill out a form, but instead of using the form fields, they just write you a letter. The information might be there, but the system can't process it. This is why explicitly telling the LLM how to format its output, something like "respond only in JSON with these exact fields," matters more than most people expect.

### Latency compounding.

Each step takes time. Three tools that each take two seconds is at minimum six seconds total, plus overhead. If you're building something people interact with in real time, that adds up fast. Builders solve this with caching, which means storing results you've already computed so you don't recalculate them, and parallelism, which means running independent steps at the same time instead of one after another.

### Vague instructions at the orchestration level.

The LLM decides which tool to call next based on the instructions you've given it. Vague instructions lead to the wrong tool getting called, or the right tool getting called with the wrong inputs. Think of it like giving someone directions. "Head toward the big building" leaves too much room for interpretation. "Turn left at the red light, go two blocks, turn right at the gas station" gets you where you need to go. The precision of your orchestration prompt determines whether your agent behaves reliably or keeps guessing.

## The mental shift that changes how you AI

When you start thinking in tool chains, you stop asking "what can I get the AI to do?" and start asking "what does each step need to receive, and what does it need to output?"

That's a systems question. And it's actually a more useful frame than prompt craft alone, because it forces you to get specific about your requirements before you write a single instruction.

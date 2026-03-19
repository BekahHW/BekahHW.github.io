---
layout: post
title: "AI Vocabulary 101"
date: 2026-03-18
tags: [AI, Beginner]
author: Bekah
description: "Smart, curious people keep hitting the same wall with AI: they don't have the words to name what they don't understand. Here are the terms that turn vague frustration into specific, solvable problems."
---

I've been having a lot of conversations with non-tech people recently about AI. What I keep running into is the same pattern: smart, curious people who are genuinely trying to understand what's happening, but who don't have the vocabulary to name what they don't know. And when you can't name it, you can't ask the right question, which means you stay stuck at the surface.

The car wash test is a perfect example of this.

A few months ago, screenshots flooded social media of people asking ChatGPT, Claude, and Grok a deceptively simple question: the car wash is 40 meters from my house. Should I walk or drive? The chatbots said walk. 

What many people in the conversation didn't understand is that the people getting bad results weren't using a bad AI. They were using a *lesser model*, probably the free tier of a product, without knowing that's what they were doing. And without vocabulary, there's no way to even articulate that distinction.

Here's likely what actually happened. "ChatGPT" isn't one thing. It's a product that runs on a *family* of models. In ChatGPT, there are three models: GPT-5 Instant, GPT-5 Thinking, and GPT-5 Pro, and a routing layer selects which to use based on the your question. On top of that, the current flagship family looks like this:

Think of GPT-5.4 like a full-service restaurant kitchen. GPT-5.4 mini is the fast-casual version: quicker, cheaper, good enough for most everyday questions. GPT-5.4 nano is even lighter, like a food truck setup. And GPT-5.4 pro is the version that takes extra time to think through the really hard problems, like a chef who slow-cooks instead of microwaving.

The key difference: free users don't get the full kitchen. They get routed to whichever option is fastest and cheapest at that moment. That version *can* answer a car wash question correctly, but it's also more likely to give inconsistent results on anything with nuance. Paying users get reliable access to the better models.

![The GPT-5 model family](/assets/images/posts/2026/gpt5-family.svg)

So when someone says "ChatGPT told me X" and someone else says "ChatGPT told me Y," they may have been talking to completely different models, without either of them knowing it. That's not a gotcha. That's just what happens when you don't have the vocabulary to describe what you're actually using.

This is why vocabulary matters. Not to be pedantic about terminology, but because the words give you handles on things you can actually change.

Here are the terms that help close that gap.

## What AI Is

Three words that get used interchangeably. They shouldn't be.

*Artificial intelligence* is the broad category. Any system performing tasks we'd normally associate with human reasoning, recognizing images, detecting fraud, recommending what to watch next. LLMs are one kind of AI. The algorithm shaping your social media feed is another kind entirely. Think of AI as "transportation." It's the whole category. LLMs are like cars specifically, while recommendation algorithms (for example, what shows to watch next) are like trains.

*A large language model*, or LLM, is AI trained specifically on enormous amounts of text. It works with words, reading, predicting, generating. GPT-5.4, Claude, Gemini, Llama: all LLMs.

*A model* is the specific trained artifact underneath the product. When someone asks "which model are you using," they're not asking about the company. They want the exact version, because different models in the same family behave differently, cost differently, and have different knowledge cutoffs. This is like asking whether you're driving a 2024 Civic or a 2026 Accord. They might be the same manufacturer, but very different capabilities.

These nest. AI contains LLMs. LLMs come in specific models. They are not synonyms.

![AI, LLMs, and models as nested categories](/assets/images/posts/2026/ai-llms-model.svg)

## How the Model Thinks

**Token.** The LLM doesn't read words the way you do. It reads tokens: chunks of text that might be a full word, part of a word, a punctuation mark, or a space. Everything about LLM capacity and pricing is measured in tokens, not words or characters. Think of tokens like syllables in speech. Sometimes they're a whole word ("cat"), sometimes they're a fragment ("un-break-able").

**Context window.** The total amount of text, in tokens, the model can hold in working memory at once. Your prompt, the conversation history, any documents you've passed in, the response being generated: all of it counts. When the window fills, older content gets dropped. This is why long conversations sometimes feel like the AI forgot something from earlier. It didn't forget. It ran out of room. Imagine a whiteboard where you can only write so much before you have to start erasing from the top to make space at the bottom.

![Diagram showing context window filling up over a conversation](/assets/images/posts/2026/context_window.svg)

**Hallucination.** When the model generates text that is confident, fluent, and wrong. Not lying: it has no concept of truth or intent to deceive. It's pattern-matching on what a plausible response looks like, and sometimes that leads somewhere inaccurate. Hallucinations range from small factual errors to completely fabricated citations. Knowing this term means you can stop calling everything you distrust a "hallucination" and start distinguishing between "the model reasoned badly" versus "the model stated something false with full confidence." It's like when you confidently give someone directions to a restaurant that closed three years ago. It's not malicious, just working from outdated information.

## How You Work With It

**Prompt.** Your instruction to the model. Everything it receives before it starts generating. Prompt quality is one of the highest-leverage variables in any AI system. Vague prompts don't just produce vague outputs: they produce unpredictable ones.

**Agent.** An AI system that can take actions, not just generate text. It has access to tools, search, email, databases, APIs, and decides which to use and in what order. The defining characteristic is that it can affect the world outside the conversation. If an LLM is like a consultant who gives advice, an agent is like an assistant who can actually book your flight, send the email, and update the spreadsheet.

**Harness.** The scaffolding you build around an LLM to make it useful in a specific context. System prompt, retrieval logic, error handling, tool connections: all of it together. The model is the engine. The harness is everything that makes it go where you want. Think of a Formula 1 car: the engine is powerful, but useless without the steering wheel, brakes, suspension, and chassis that let you actually control it.

### More Advanced Terms If You're Building With AI

**API (Application Programming Interface).** The formal connection point between two pieces of software. This isn't AI-specific. It's how all modern software connects, from weather apps to payment processors. But it's essential vocabulary for AI because almost every AI tool you use is either calling an API (to get the model's response) or offering one (so other tools can connect to it). When tools say they "integrate," they almost always mean they share an API connection. Think of it like the electrical outlet in your wall. It's a standardized interface that lets different appliances plug in and get power without rewiring your house each time.

**MCP (Model Context Protocol).** A way to let AI access your stuff: files, calendar, email. It's trying to make these connections easier, but it's early days and each company still does it a bit differently. You might see tools advertising MCP support. Just know it means the tool is trying to play nice with AI, even if the setup isn't always smooth yet.

## The Real Lesson from the Car Wash

The conversation around that test wasn't really about whether AI could reason through a simple question. It was about people evaluating something they couldn't fully name.

If you know the difference between a model and a model family, you ask "which version were they using?" instead of "is AI smart or dumb?" If you understand context windows, you stop blaming the AI when it forgets something from earlier in a long conversation. If you know what hallucination actually means, you stop using it as a catch-all for every output you don't trust.

That's what vocabulary does. It turns vague frustration into specific, solvable problems.


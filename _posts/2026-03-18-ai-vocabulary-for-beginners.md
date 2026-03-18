---
layout: post
title: "The AI Vocabulary for Beginners"
date: 2026-03-18
author: Bekah
tags: [AI, Beginners]
description: "A field guide to the AI terms that come up most when you're building with these tools — grouped by what they actually describe, and why the vocabulary matters."
---

Recently, I've been having a lot of conversations with people who aren't in tech about "AI." One of the things that makes it tricky, is learning a new vocabulary. Without a vocabulary, it makes it easier not to know what you don't know. Case in point, the conversations about "The Car Wash Test." People were asking ChatGPT, Claude, and Grok a simple question: the car wash is 40 meters from my house. Should I walk or drive? They said walk.

The real question that should come as a result is "why did the model reason through that correctly, and what does that tell us about how these systems actually work?"

Here's the thing: you can't have that conversation without vocabulary. And most people building with AI right now are doing it without a shared language for what they're actually working with. That gap creates real problems — not just in bar arguments about car washes, but in the tools you build, the bugs you can't diagnose, and the decisions you can't explain to your team.

These are the terms that close that gap.

Someone sent me a thread the other day that used the words "model," "LLM," and "AI" interchangeably across four consecutive sentences. Each one meant something slightly different in context. Nobody called it out because in most conversations, it doesn't matter enough to stop the flow.

But when you're building with these tools, it starts to matter a lot.

Vague vocabulary leads to vague debugging. If you can't name what broke, it's harder to fix it. And if you're working with a team or explaining your work to stakeholders, the words you use signal whether you understand what's actually happening under the hood.

This post is a field guide to the terms that come up most, grouped by what they actually describe. It's not exhaustive — the field moves fast — but these are the ones you'll encounter in the first few months of building.

## What AI is

Let's start with the category itself, because these three terms genuinely confuse people.

**Artificial intelligence** is the broad umbrella. It covers any system that performs tasks we'd normally associate with human intelligence — recognizing images, translating languages, generating text, playing chess. It includes many things that are not LLMs, including the recommendation algorithm that decides what you see on social media and the model that catches fraud on your credit card.

**A large language model, or LLM**, is a specific kind of AI trained on enormous amounts of text. The "language" part means it works with words — reading them, predicting them, generating them. The "large" part refers to the scale of training data and the number of parameters inside the model. GPT-4, Claude, Gemini, Llama — these are all LLMs.

**A model** is just the trained artifact itself. The weights, the math, the thing that does the actual prediction. When someone says "which model are you using," they want to know the specific version — not the company, not the product, but the exact trained system underneath. This matters because different models have different capabilities, knowledge cutoffs, costs, and behaviors even from the same company.

AI contains LLMs. LLMs are made up of specific models. The terms nest — they're not synonyms.

## How the model thinks

These four terms describe the mechanics of how an LLM processes and generates text. You'll encounter them constantly once you start tuning behavior or hitting limits.

**Token.** The LLM doesn't read words the way you do. It reads tokens — chunks of text that might be a full word, part of a word, punctuation, or a space. "Building" might be one token. "Unbelievable" might be three. This matters because everything about LLM capacity is measured in tokens, not words or characters.

**Context window.** This is the total amount of text — measured in tokens — that the model can hold in its working memory at once. Your prompt, the conversation history, any documents you've passed in, the response being generated: all of it counts against the context window. When it fills up, older content gets dropped. This is why long conversations sometimes feel like the AI "forgot" something from earlier — it didn't forget, it ran out of room.

**Hallucination.** This is what happens when the model generates text that is confident, fluent, and wrong. It's not lying — it has no concept of truth or intent to deceive. It's pattern-matching on what a plausible response looks like, and sometimes that pattern leads somewhere that isn't accurate. Hallucinations range from small factual errors to completely fabricated citations, people, and events. Understanding this isn't a reason to distrust AI — it's a reason to verify outputs that matter, especially in production systems.

**Temperature.** Most tools that give you access to an LLM include a temperature setting, usually a slider between 0 and 1 (sometimes up to 2). Temperature controls how much randomness the model introduces when choosing its next token. Low temperature means the model picks the most likely next word more consistently — useful when you want predictable, structured output. High temperature means it takes more risks, introduces more variation — useful when you want creative or exploratory responses. If your agent is doing something precise like parsing data or following a structured format, you probably want low temperature. If it's brainstorming, higher temperature gives you more range.

## How you work with it

These terms describe the layer where you, the builder, interact with and shape what AI does.

**Prompt.** Your instruction to the model. Everything before the model starts generating is the prompt — your question, your context, your formatting requirements, your role setup. Prompt quality is one of the highest-leverage variables in any AI system. A vague prompt doesn't just produce a vague output — it produces an unpredictable one, which is harder to build on.

**Agent.** An agent is an AI system that can take actions, not just generate text. It has access to tools — search, email, databases, APIs — and it decides which tools to use and in what order to accomplish a goal. The defining characteristic of an agent is that it can affect the world outside the conversation. An agent that can only chat is not an agent. An agent that can read your calendar, draft a reply, and send it after you approve it — that's an agent.

**Harness.** A harness is the scaffolding you build around an LLM to make it useful in a specific context. It's the code, configuration, prompts, and logic that define how the model gets called, what it receives, and what happens with its output. If you've set up a system prompt that gives the AI a specific role, connected it to a retrieval tool, and written logic to handle errors — that's a harness. The model is the engine; the harness is everything around it that makes it drive where you want.

**RAG (Retrieval-Augmented Generation).** RAG is the pattern for giving an LLM access to information it wasn't trained on — your internal docs, recent news, a knowledge base, a product catalog. Instead of fine-tuning the model on that information (expensive, slow, hard to update), you retrieve the relevant pieces at query time and pass them into the context window alongside the user's question. The model then generates its response with that retrieved content in view. Most "chat with your docs" products are RAG under the hood.

**API (Application Programming Interface).** An API is the formal connection point between two pieces of software. When your application needs to call an LLM, it sends a request to the model provider's API. The API defines exactly what that request should look like and what the response will return. When tools say they "integrate" with each other, they almost always mean they have an API connection. Understanding that APIs are just structured agreements between software systems — not magic, not mystery — is one of the more grounding realizations in early builder life.

**MCP (Model Context Protocol).** MCP is a newer, standardized way for AI models to connect to external tools and data sources. Before MCP, every tool integration was custom-built — a different format, a different handshake, a different set of assumptions for every connection. MCP gives AI systems and tools a shared language, so a model that supports MCP can connect to any MCP-compatible tool without custom glue code. Think of it like USB — before USB, every device had its own proprietary connector. MCP is the USB for AI tool connections.

MCP is still relatively new, but it's becoming the default expectation for serious AI tool ecosystems. If a tool you're evaluating says it's "MCP-compatible," that's a good sign for how well it will play with other tools in your stack.

## How these terms connect

Here's what it looks like when you put all of this together in one place.

You build a harness around an LLM (a specific model from a broader family of AI). That harness includes a prompt that tells the model its role. When a user asks a question, a RAG system retrieves relevant documents and adds them to the context window alongside the conversation. The agent — powered by that LLM — decides which tools to call via API or MCP connections. Temperature is set low so outputs stay predictable. And when something is still wrong, you know to check whether it's a hallucination or a context window problem before you blame the model.

Every one of those decisions connects to a word. And every word gives you a handle on a part of the system you can actually change.

What term have you been using without being totally sure what it meant? That's probably where to dig next.

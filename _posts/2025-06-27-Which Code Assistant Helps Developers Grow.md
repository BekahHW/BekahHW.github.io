---
layout: post
title: "Which Code Assistant Actually Helps Developers Grow?"
author: Bekah
description: "I tested three AI coding assistants on building a new feature in an Astro + Tailwind site. Continue provided the best explanations, Copilot was fast but passive, and Cursor was interactive but made assumptions."
date: 2025-06-27
---

Over the past year, we’ve had a ton of conversations at [Virtual Coffee](http://virtualcoffee.io/) about AI. If you’ve opened up X or LinkedIn, you probably realize that people have very strong opinions about AI. At Virtual Coffee, we’re a pretty close-knit community, so there are a lot of concerns about the impacts of AI, how junior developers grow (or stay stagnant) with AI, whether or not to adopt it as a team, and whether to use it without telling your boss. At the heart of a lot of these conversations is the feeling that you’re somehow “cheating” if you use AI, and that you won’t learn or grow if you’re using it. I think the sentiment comes from the right place, caring about people, but I think there are a lot of options and approaches you can take to prevent that. I believe that when we consider the evolving landscape in tech, we also need to think about the changing landscape of tech education. Most of us will end up using AI in our workflow, either out of necessity or because our team mandates it. That’s why I also think that AI coding assistants actually have the ability to help everyone grow in ways they couldn’t before.

[![ykdogo tweet](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6unkesc921s6jw892qz6.png)](https://x.com/ykdojo/status/1932149031196856738)

## Learning vs. Speed Trap

Your approach to learning with AI assistants definitely matters. And not all AI coding assistants will help increase developers' coding skills. Learning about the code you’re writing, how your team approaches problems, and how to utilize AI as part of your workflow is necessary to grow in tech. Teams don’t need someone who can prompt their way to a working solution but can’t debug it when it breaks. Most AI coding assistants are optimized for speed and not for learning. They're designed to get you from problem to solution as quickly as possible. If your goal is skill development, you should think of AI adoption more like onboarding a mentor, rather than replacing you.

## Context-Aware Guidance

The most effective learning-focused assistants should understand what you're trying to do and what you should learn from doing it. They highlight patterns, point out potential issues, and suggest alternative approaches that might teach you something new.

Today, I’m testing out a couple of AI coding assistants on a new feature. (I’m interested in doing a follow-up post that uses it on an existing file. Let me know if that’s something you’d like to see!)  I tested out each coding assistant on a new feature I’m adding to my [writing site](https://www.siblingswrite.com/), with this simple prompt:

> I want to create a game for this site, where people (not logged in) can add a word to a story. Once the story hits 300 words, it locks the submission. No one should be able to submit more than 3 words in a row. 

Here are my takeaways for Continue, GitHub Copilot, and Cursor. I gave the same initial prompt for each of them.

### Continue

[Continue](https://continue.dev/) stands out here because their philosophy explicitly addresses the learning problem. Their documentation talks about "amplifying intent" rather than replacing it, and they specifically warn against becoming a "human clipboard." You can explore ideas through “vibe coding” during creative phases, but when it comes to production work, they emphasize that developers need to stay in control. It’s open source, model-flexible (bring your own LLM), and encourages creating custom assistants that reinforce your team’s coding standards. For teams focused on growth and increasing their developers’ coding skills, Continue offers both transparency and control.

Before giving me any kind of code, it gave me an initial planning response, outlining a step-by-step approach to the user story. Seeing the plan helps the user to walk through the task with Continue.

![Overview of the approach Continue takes to implement feature](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/uuws98nat1n8qrflz4nn.png)

After this, it provided commented code along with a reusable template. The inline comments break down some of the logic, and helps the user understand the process it went through to generate the code. After the code, it summarized all the changes it had made. 
You might notice it mentions Flask, but this is actually an Astro app. That was my mistake. When I initially set up the assistant, I had configured it with Python-focused instructions and directed it to Python documentation, since my rules were originally written for a Python assistant. Once I updated those settings and specifically shared my repository with the assistant, Continue was able to properly follow my project's styling conventions and leverage the existing components.

Lastly, it gave both an overview of what was implemented and ideas for improvement. I appreciate that it provided more context about its approach, commented code throughout the new file, and offered inspiration for my next iteration. 

![Overview of the approach it took and the improvements I could make](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3iwg6njdy7a2fk8plmf8.png)

Without having to ask further questions about the decisions it made and the approach it took, I think it provided a good amount of context for the developer to understand the process.

### Copilot

[GitHub Copilot](https://github.com/features/copilot/) is known for excelling at code completion and includes agent-based features. It can speed up repetitive tasks, but the learning tends to happen through osmosis. You need to recognize the patterns in suggestions and might pick them up over time. You have to be more active with your learning by asking Copilot about the decisions it made. 

Copilot’s approach was a lot different from Continue’s. It jumps straight into code generation without context-setting or explanation of its approach.

It did provide a “wrap up” after the code, but it wasn’t as thorough or complete as what I got from Continue.


![Wrap up of the implementation](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3wmwmu4lse15u873zasm.png)

For what it’s worth, Copilot also told me that creating a Svelte component was the best option, and then, when I questioned it, Copilot told me that Astro was actually the best path. It was flexible with the approach once I questioned it, but it definitely required me to go down the rabbit hole with it. Learning is definitely passive with Copilot.

### Cursor

[Cursor](https://www.cursor.com/) offers an AI-first editor experience with agent modes, but their emphasis on "AI that builds with you" raises questions about how much actual building the developer is doing during complex tasks. Although I’m just doing a basic test for this post with a brand new feature, I did experiment a bit with its interactive, AI-native IDE experience by highlighting some of the code it generated and asking, “What does this do?” I plan on doing more of that in a follow-up post for comparison. 

After being given the same prompt as Continue and Copilot, Cursor walked me through the approach it was taking and included what files it looked at to get there. However, it automatically created a Svelte file for the game (I did have Svelte installed in the project), and I had to do a lot of back and forth with it to understand the decisions it made and why. I’ve actually never used Svelte, so this was something I had to dig into deeper to understand. 

![initial overview of the approach](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/g2kk5qu91tqrqk2ewtc3.png)

One of the things I appreciated about Cursor’s experience was that it explained piece by piece and required me to accept changes. That forces the user to think about what’s being implemented. It also auto-corrected some of its own errors, which is a good learning opportunity to see how it debugs. 

![explaining where the issues lies in the error](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/317dusccwjklrckjxf0s.png)

I wish it would have automatically added code comments throughout, but the explanations were valuable. The takeaways at the end walked through what the user could do and the functionality. It was more thorough than Copilot, but I liked the improvements suggestion that Continue had. 

![wrap up of features and how it works](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ailxygg7jc0uprc177n0.png)

## Building a Learning-First AI Strategy

I think this exploration is important for new folks coming into tech, and for teams serious about using AI to help their team grow and not just ship faster. The path here should:

1. **Start with Intent**: Before adding any AI tool to your workflow or your team’s, clearly define your goals. Are you trying to help yourself or junior developers on the team understand architectural patterns? Learn a new framework? Improve code review skills?
Different learning goals might call for different AI approaches.
2. **Choose Tools with Teaching DNA**: Look for AI assistants that were designed with education in mind, not just productivity. Continue's emphasis on amplifying developer intent rather than replacing it is a good example of this thinking.
3. **Implement Learning Safeguards**: Whatever tool you choose, build processes that encourage learning by requiring explanations for AI-generated solutions, having regular code review focused on understanding, not just correctness, adding pair programming sessions where AI suggestions become discussion points, documenting decisions and trade-offs.
4. **Measure Learning, Not Just Output**: Track whether your developers are asking better questions over time, not just whether they're closing tickets faster. Are they suggesting alternatives during code review? Can they debug issues in AI-generated code? Are they learning patterns they can apply without AI assistance? 

We want developers who are using AI to understand problems. That's the difference between an AI assistant and an AI mentor.

## Wrapping Up

I think the best AI coding assistant for individuals and teams focuses on developer skill growth. Based on philosophy, approach, and explicit focus on learning, Continue seems to understand this distinction better than most. But the tool is only part of the equation. The bigger part is approaching AI adoption with learning as the primary goal, not just productivity.
The most productive teams and developers understand what they're building, whether with or without AI help.

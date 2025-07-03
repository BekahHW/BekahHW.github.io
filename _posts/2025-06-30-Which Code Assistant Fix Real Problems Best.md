---
layout: post
title: "AI Code Assistants Fix Real Codebase Problems: Mobile Nav Edition"
author: Bekah
date: 2025-06-30
---

*A follow-up to "Which Code Assistant Actually Helps Developers Grow?" This time, testing how AI assistants handle debugging existing code problems.*

Last week, I [tested three AI coding assistants on building a new feature](https://bekahhw.com/Which-Code-Assistant-Helps-Developers-Grow). This time, I wanted to see how they handle something most developers deal with daily: debugging existing code problems.

I inherited a mobile navigation issue on my writing site. The navbar wasn't responsive, leaving a ton of white space on mobile screens and making it a less-than-desirable experience. Instead of a full navigation bar cramming into mobile view, I needed a proper hamburger menu.


![gif showing the responsive layout issue on mobile is fixed when deleting the nav bar](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/240b8dcxjht9ly0hg9v1.gif)


Here's what I told each assistant:

> "There's an issue with mobile view on the site. I think the main problem is with the navbar. But I don't think it makes sense to have a nav bar for a mobile site. We should make the site responsive and add a sticky nav bar with a hamburger menu instead of the full navigation bar once the site hits mobile-sized screens."

Here's how Continue, GitHub Copilot, and Cursor handled this real-world debugging scenario.

## Continue: Permission-Driven and Educational 

I used [Continue](https://continue.dev/) in [Agent mode](https://docs.continue.dev/agent/how-to-use-it), giving it context from `Header.astro`, `Nav.astro`, and `BaseLayout.astro`.

![Overview and initial response from Continue outlining what needs to be done](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/bg21110n6vfs19es00l5.png)

### The Good

- Created a dedicated hamburger menu component
- Asked for permission between file changes
- When I got a transparency issue with the menu panel, it fixed it in one go
- It added comments to understand the steps it was taking in the code and debug logs in the code to help me see what was working and when
- Everything worked within 12 minutes

### The Learning Experience 

When I tested the same fix using Continue's [Chat mode](https://docs.continue.dev/chat/how-to-use-it) instead of Agent mode, it took longer but provided much more thorough explanations. The conversation was more educational, walking me through the reasoning behind each change.

### Verdict

Continue balances efficiency with learning. Agent mode got me working code fast, while Chat mode taught me the "why" behind the solutions.
 
![summary of the changes it made](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9ss3rdoqhm59mkjjqxbl.png)

## GitHub Copilot: Fast & (a bit) Frustrating

Copilot started by unnecessarily converting a Svelte component, then immediately threw a TypeScript error:
`Argument of type 'EventTarget' is not assignable to parameter of type 'Node'`

I'm not sure why it decided that the `ThemeToggleButton` needed to be converted. At the very least, that's outside of the scope of this PR, in my opinion.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fi883ls0s34e83ux1zra.png)

It was able to solve the problem pretty quickly when I used the "Fix with Copilot" function, explaining, "You should cast e.target to Node when passing it to .contains() to resolve the type error."

### The Real Problem

The hamburger menu initially didn't appear at all. The responsiveness was "fixed" because the navigation disappeared, but users couldn't access any menu items.

After back-and-forth debugging, Copilot resorted to `!important` declarations (not ideal) and the old "turn the background red" debugging trick. Even when the menu became visible, clicking it did nothing.

Eventually, we identified JavaScript as the culprit. Copilot fixed it, but then the menu links appeared directly over the page content without any background container. More back-and-forth with questionable styling decisions followed.

It was to the point where I definitely could fix this faster than having a back-and-forth with Copilot, so I called it. After that, I also realized there was a bug where, after expanding the hamburger menu on mobile and then switching to desktop view, the mobile menu remained open on top of the restored navigation bar.

![nav panel on top of page text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tvvd7pmfl9gm2usc0k1w.png)

**Time**: About 20 minutes, with me ultimately fixing the styles myself.

**Learning Value**: Minimal. Copilot told me what it was doing, but didn't really explain its approach or help me understand the underlying problem.

## Cursor: Comprehensive but Presumptuous

Cursor's response was immediate and organized:

![Cursor's initial message detailing what needed to be done to implement the hamburger menu](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7vx5vt6fdw9b2utz4gre.png)

### The Process

1. Automatically read the global CSS
2. Outlined exactly what needed to change and why
3. Provided all necessary file updates
4. Hit the same cross-page JavaScript issue as Copilot

### The Interesting Part

Cursor went beyond my request, automatically improving mobile styles across the site that I hadn't asked for. This raises an interesting question: should AI assistants make assumptions about what you "really" need?

**Time**: About 15 minutes to complete.

**Learning Value**: Good explanations of changes. I appreciate that it gives more information on why errors were happening in the context of using Astro.

![showing the issue and how it understands and corrects it](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vsk81fkbeau7jkmdtafh.png)

## Context Switching Costs

Here's something I noticed that none of the assistants addressed: familiarity bias. Cursor and GitHub Copilot felt nearly identical to use, so I moved faster with them. Continue required slightly more of a learning curve, which actually slowed me down initially but provided better educational value.

This isn't a knock against Continue. It's a reminder that switching tools comes with costs, even when the new tool might be better in the long term.

## Debugging vs. Building: Different Skills Required

This debugging scenario revealed something my first test missed, that building new features and fixing existing problems require different AI assistance approaches.

### Building New Features

- Clear requirements
- Blank slate approach
- Focus on "what should this do?"

### Debugging Existing Code

- Understanding legacy decisions
- Identifying root causes
- Focusing on "why isn't this working?"

Continue did well with the debugging mindset, asking permission before changes and explaining the reasoning. Copilot and Cursor were more aggressive about "fixing" things, sometimes creating new problems in the process.

### Which AI Coding Assistant Wins for Debugging?

**For Learning**: Continue, especially in Chat mode. It helped me understand not just what was broken, but why the original approach failed.

**For Speed**: Cursor, if you don't mind AI making assumptions about improvements you didn't request.

## The Bigger Picture

This comparison reinforced something I mentioned in my first post: the tool is only part of the equation. Each assistant performed differently not just because of their capabilities, but because of how they approached the problem-solving process.

Continue treated debugging as a learning opportunity. Copilot treated it as a code completion task. Cursor treated it as a comprehensive redesign project.

If you want to know which coding assistant helps developers grow when you're debugging, try this: Before asking for a fix, ask the AI to help you understand why the original code failed. The debugging skills you develop will be more valuable than any individual fix.







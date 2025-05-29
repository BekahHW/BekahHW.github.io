---
layout: post
title: "Beyond Stars and Forks: Why Open Source Needs Better Collaboration Metrics"
author: Bekah
date: 2025-05-29
---

When we were working on the [Intro to Open Source](https://opensauced.pizza/learn/intro-to-oss) course, one of the biggest painpoints we noted with new contributors was the frustration they felt when their PRs weren’t merged in in what they felt was a reasonable amount of time. They had done their research, found an issue, gotten assigned, and then…nothing. No feedback. No merge. Just silence.

It’s a familiar story. I’ve had contributors tell me, “My PR has been sitting there for two weeks and I haven’t heard a thing.” And I get it. There are so many reasons this happens, including burnout, abandoned projects, the lottery factor, and it’s rarely about bad intentions. That’s why I always tell contributors to join the community before contributing. It helps you understand the project’s rhythms, how to communicate with maintainers, and whether it’s a space that supports new members.

If you’ve read anything I’ve written in the last five years, you know I care deeply about the open source community. But how we have traditionally evaluated projects and metrics doesn’t give enough insight into the most meaningful parts. A lot of times, these metrics—stars, forks, downloads, and DORA metrics—miss the most important part of the story: how people collaborate. 

## A Different Approach to Open Source Metrics

Since [OpenSauced shut down](https://x.com/saucedopen/status/1900339926832734635), I’ve been exploring different options for understanding the collaboration problem. 
[Collab.dev](https://collab.dev/) isn’t a replacement for OpenSauced, but it’s telling a different (and important) part of the story and capturing how people collaborate. It surfaces the human patterns behind the code, like review responsiveness, contributor distribution, and merge dynamics. Industry-accepted metrics like DORA are valuable for understanding software delivery performance, but not so much in the human department. They can tell you how fast code gets deployed, but not whether contributors feel supported, welcomed, or left in the dark. Open source is as much about relationships as releases, and we need metrics that reflect that.

## The Collaboration Visibility Gap

The problem isn't just that our current metrics are incomplete. Vanity metrics have been touted as meaningful indications of the project’s health, and, to be direct, they're just not that important.

If we consider the challenges maintainers face every day, we'll see that it’s often difficult to:
- Identify which contributors are most likely to become long-term participants.
- Pinpoint exactly where the review process stalls or breaks down.
- Understand if the community environment genuinely feels welcoming to newcomers.
- Distinguish between sustainable growth and problematic scaling.

The path isn’t clearer for potential contributors either. They often struggle to determine:

- Whether the project actively reviews and merges community contributions.
- How long it typically takes for contributions to be reviewed.
- Which maintainers are most responsive in the contributor’s area of interest.
- If there’s a healthy balance between contributions from the core team and the wider community.

For many of us, we have to make a decision about where to invest our time and energy. It can be a real letdown if we’ve invested time and realized we made the wrong decision, coming out of it with nothing to really show for the work we’ve done. For instance, I wanted to learn more about [cognee](https://dub.sh/cognee), an AI Memory management framework, recently, so I created a [collab.dev cognee page](https://dub.sh/cognee-collab) to learn more about the collaboration happening. When you first look at [cognee on GitHub](https://dub.sh/cognee-gh), it looks like a growing open source project with a decent star count, active issues, and regular commits. But looking at Collab.dev’s dashboard, I get a richer story. 

## The Story Cognee’s Data Tells through Collab.dev
### Contributor Distribution

When we think about good contributor distribution in an open source project, that usually means responsibilities, activity, and knowledge aren’t tied to a few people. Distribution allows for decreased burnout, project resilience, and creates a more welcoming environment. What we see with cognee is a genuinely balanced project. With 51% of contributions coming from the core team and 49% from the community, cognee has built real community ownership without abandoning maintainer responsibility, and we can make a connection with a collaborative environment and higher motivation to support the project from the community.


![Contributor distribution graph](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/neq300a2e09po9wobend.png)

### PR Lifecycle Metrics

It continues to get interesting. The review funnel shows that 88% of PRs receive reviews and 85.2% get approved. That approval rate tells a story about quality control and contributor experience. It suggests that either the project has excellent contribution guidelines that help people submit good PRs, or the maintainers are actively helping contributors improve their work rather than just rejecting it. On top of this, there’s a quick turnaround with a median response time of 1.9 hours and 42% of reviews happening within an hour. They’re not waiting three weeks for a review. The maintainers are cultivating a positive contributor experience through their responsiveness. 

![cognee lifecycle metrics](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/iv2x52ng29yysttfl1e9.jpg)

### What this tells us about the Human Story

As a maintainer, I’ve been in the situation where I don’t have the capacity to immediately respond to contributors, and sometimes they even have to wait weeks for my response. Obviously, this isn’t ideal. Usually, what happens is that the person has moved on, they may not respond at all, or they’re less likely to contribute again. What we see from cognee’s numbers is that they don’t have that same problem. 

When someone contributes to cognee, they aren’t left wondering whether or not their efforts are valued. They get fast enough feedback to stay engaged and iterate quickly. Their turnaround time for a review (1.6hrs) is a good way to encourage repeat contributors. Additionally, with a median merge time of 19.5 hours signals to contributors that their work has real and immediate impact. And they’re able to see their contributions available to users.

### The Collaboration Pattern

When you look at these metrics together, they’re telling a story of intentional collaboration design, a story that thinks about the contributor and maintainer experience. They’ve created systems and habits that make collaboration feel responsive and worthwhile. What’s telling about this data is also what’s *not* happening. We don’t see any pile-ups of unreviewed PRs. There are no huge gaps between approval and merge. There are no signs of contributor frustration or maintainer overwhelm. 

This collaboration story matters, not just to show that cognee looks like a good place to contribute, but because this can become a replicable story. Other projects can learn how to make collaboration feel good for the contributors involved. We can look at the data and the project and better understand what systems and practices created these patterns, and we can reach out to maintainers of projects we admire to ask: How do you build review workflows that are both thorough and fast? How do you maintain quality while staying responsive to community contributions?

Collaboration quality doesn’t have to be something we guess at. We can learn more through the data and find projects that have the capacity to take contributions from community members. (And if you’re interested, collab.dev also has a nifty comparison tool. You can check out my [mem0 v. cognee comparison](https://dub.sh/cognee-mem0).)

## The Bigger Picture: Measuring What Matters

We’re in a stage of open source where complex human dynamics determine whether open source projects succeed or fail. Collaboration metrics can help lead to better outcomes. When we measure collaboration effectively, we can:

- Reduce contributor burnout by identifying overwhelmed maintainers
- Increase successful first contributions by directing early contributors to responsive projects
- Build more sustainable projects by understanding what healthy collaboration looks like
- Create feedback loops that help projects improve their community practices

In open source, we've proven that collaborative development can create incredible value, but we can’t ignore the sustainability challenges, maintainer burnout, and the difficulty of scaling human collaboration.

Better visibility into collaboration patterns can help us to understand the future health of open source. We need tools that help us understand not just what code exists, but how effectively people work together to create and maintain it.

Open source has always been about people working together. Our metrics should reflect that meaningful work.
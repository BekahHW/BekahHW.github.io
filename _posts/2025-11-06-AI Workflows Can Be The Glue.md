---
layout: post
title: "The Invisible Load: How AI Workflows Can Replace Your Team's 'Glue Person'"
date: 2025-11-06
author: Bekah
description: "Every team has someone doing invisible coordination work, updating changelogs, following up on blockers, bridging communication gaps. This 'glue work' often falls on women and rarely shows up in performance reviews. Composed AI workflows can automate mechanical coordination tasks, freeing talented teammates to focus on strategic and meaningful work."
---

Every team has one, and, tbh, a lot of relationships have one. The person who remembers. For teams, it might be the person who remembers to update the changelog. Who posts the weekly standup summary. Who follows up on that GitHub issue from three weeks ago. Who makes sure the docs match the latest release. Who bridges the gap between what engineering ships and what the rest of the company knows about.

We call this "glue work," and research shows it disproportionately falls on women in teams, and mothers in relationships. It's the invisible labor that keeps everything running smoothly, but rarely shows up in performance reviews or promotion discussions.

The problem is that glue work is essential, but it shouldn't be someone's primary job. And it definitely shouldn't be the reason talented people get passed over for advancement.

But what if AI workflows could be the glue instead?

## The Glue Work Problem

Tanya Reilly's essay ["Being Glue"](https://www.noidea.dog/glue/) describes how critical but undervalued work like coordinating between teams, translating technical concepts, maintaining documentation, ensuring follow-through often becomes invisible. The people who do it often make everything seem easy. But there's a cost, and it's compounding in the background.

If you have one teammate who's spending hours each week:
- Updating tickets after standups
- Posting release summaries to Slack
- Making sure customer support knows about new features
- Chasing down PR reviews
- Updating documentation after merges
- Following up on blocked issues

when none of this is their actual job, then they may be your "glue." All of it is necessary. But when they stop doing it, things fall apart.

Maybe it doesn't seem that bad right now, but coordination work compounds as teams grow.

## What If Workflows Could Be the Glue?

This is where composed AI workflows change everything. Not because they eliminate coordination work, but because they automate it at the seams between tasks.

In his post on [composed workflows](https://www.linkedin.com/pulse/individual-workflows-scale-linearly-composed-compound-chad-metcalf-x7fyc), Continue CEO Chad Metcalf makes an important distinction: a single workflow saves time, but composed workflows compound. When the output of one workflow can trigger the next, you're doing more than just automating individual tasks. You're automating the entire coordination system.

Let's look at what this actually means.

### Example 1: The Release Communication Burden

**Current state:** After every release, someone (usually the same someone) needs to:
1. Draft changelog entries
2. Update product documentation
3. Post to company Slack
4. Update customer-facing docs
5. Create support team briefing
6. Close related Linear issues

That "someone" spends 2-3 hours per release on coordination work. Not working on more impactful work. Just making sure everyone knows what shipped.

**With composed workflows:**

```
Merge to main 
  → Extract changes from PR descriptions 
  → Draft changelog entry 
  → Update technical docs 
  → Generate customer-facing summary 
  → Post to internal Slack 
  → Update support knowledge base 
  → Close related issues
  → Post completion summary
```

The entire coordination chain runs automatically. The output of one workflow triggers the next. No one spends their afternoon being glue. Instead, they become the human in the loop who reviews and improves the process.

### Example 2: The Follow-Up Tax

**Current state:** You're in standup. Someone mentions they're blocked on a security review. Everyone nods. The meeting ends.

Three days later, nothing's happened because nobody remembered to:
- Create a ticket
- Tag the security team  
- Follow up when there's no response
- Update the original ticket
- Let the blocked person know it's unblocked

Guess who remembers? The glue person, who now spends their time tracking other people's blockers instead of writing code.

**With composed workflows:**

```
"Blocked on X" detected in standup notes 
  → Create Linear issue with context 
  → Tag relevant team 
  → Set reminder for 2 days 
  → Follow up if no response 
  → Update original ticket when resolved 
  → Notify blocked person
```

The follow-through happens automatically. Nobody has to be the memory keeper.

### Example 3: The Support Handoff

**Current state:** Customer reports a bug in Slack. Engineering fixes it. But somehow:
- Support never gets notified the fix is live
- Customer still thinks it's broken
- Docs don't reflect the fix
- The original Slack thread is forgotten

Someone (the glue person) ends up manually connecting all these dots. Every. Single. Time.

**With composed workflows:**

```
Bug report in Slack 
  → Create Linear issue 
  → PR created and merged 
  → Update documentation 
  → Generate fix summary 
  → Post to support channel 
  → Reply to original Slack thread 
  → Close Linear issue with summary
```

The entire loop closes itself. From report to fix to notification to documentation to closure. No human glue required.

## Why This Works Where Other Solutions Don't

### It's Not About Replacing People

AI workflows aren't replacing the glue person's judgment or expertise. They're replacing the repetitive coordination tasks that shouldn't require judgment.

When a PR merges, updating the changelog doesn't need human insight. Following up on a blocked issue after two days doesn't require strategic thinking. Posting a deployment summary to Slack isn't creative work.

These are mechanical transitions between tasks. Perfect candidates for automation.

### It Compounds Over Time

Here's what makes this different from other automation attempts: composition creates compounding value.

Each workflow you add doesn't just save time on that specific task. It amplifies the value of workflows already running. The deployment workflow outputs information the changelog workflow needs. The Linear sync workflow triggers the documentation update workflow. The customer support workflow feeds the product insights workflow.

You're not just automating individual tasks. You're automating the entire coordination system.

### It Preserves the Actual Value of "Glue"

The valuable part of glue work isn't the mechanical coordination. It's the strategic connection-making, the pattern recognition, the ability to see across teams and translate context.

When AI workflows handle the mechanical parts, the humans who were doing glue work can focus on the strategic parts.

They can spend time:
- Identifying patterns across customer feedback
- Improving team processes
- Mentoring junior developers
- Solving actually complex problems
- Advancing their technical skills

The things that actually deserve their expertise.

## The Composition Advantage

Individual workflows are helpful. Composed workflows are transformative.

As Chad Metcalf writes in his post on composed workflows: "Individual workflows give linear improvements. Composed workflows compound." This distinction is crucial when thinking about how to replace organizational glue work.

Because here's what happens when workflows compose: the coordination work stops being a burden on any individual. Instead, it becomes part of the system itself.

You're not asking someone to remember to update the docs after deployment. The deployment workflow triggers the documentation workflow automatically. You're not relying on someone to follow up on blocked issues. The standup workflow creates follow-up workflows with built-in reminders.

This is infrastructure that scales with your team. As you grow, the glue work compounds. But with composed workflows, the automation compounds instead.

## Real Team Impact: Beyond Time Savings

Let's talk about what this actually means for teams.

### No More "That Person"

When coordination work is automated, it stops being concentrated on one or two people. The person who used to spend 10 hours a week on glue work can spend those hours on actual engineering. Or product work. Or whatever they were actually hired to do.

More importantly: they stop being the bottleneck. When knowledge and coordination flows through automated systems rather than through specific people, teams become more resilient. People can take vacation without everything falling apart. New team members can onboard without needing to know who to ask for everything.

### Career Equity

Glue work is often invisible during performance reviews. "Sarah keeps everything running smoothly" doesn't translate to promotion decisions the way "shipped three major features" does.

When AI workflows handle coordination, engineers can focus on work that's more visible and valued. This has disproportionate impact on people—often women and mothers—who tend to take on more glue work.

### Team Velocity at Scale

Small teams can coordinate informally. "Hey, remember to update the docs" works when you're five people.

At 20 people? 50? Informal coordination breaks down. You need systems. The question is: will those systems be human-dependent, automated, or composed with a human in the loop?

Composed workflows scale. Human coordination doesn't.

## How to Actually Do This

Don't start by trying to automate everything. Start with the most repetitive, predictable coordination work on your team.

### Step 1: Identify Your Glue Work

Have an honest conversation. Ask:
- What coordination tasks happen after every release?
- What follow-ups consistently fall through the cracks?
- Where does information get stuck between teams?
- Who's spending time on mechanical updates vs. strategic work?

Write it down. You're looking for patterns, not one-off tasks.

### Step 2: Build One Workflow

Pick the most painful coordination task. The one that happens constantly and requires zero judgment.

Examples:
- Changelog updates after merges
- Standup note distribution
- PR review reminders
- Linear ticket status syncing
- Documentation updates post-deployment

Build a workflow that handles it end-to-end. Run it for a week. Measure intervention rate—how often does it need human correction?

Get that intervention rate below 5%. Then move to step 3.

### Step 3: Compose

Look at the output of your first workflow. What happens next in the coordination chain?

If your workflow posts deployment notes to Slack, what normally happens after that? Maybe documentation gets updated. Maybe customer support gets briefed. Maybe Linear tickets get closed.

Build workflows for those next steps. Connect them to your first workflow's output.

Now you have composition. One workflow's completion triggers the next. The coordination chain runs automatically.

### Step 4: Keep Going

Each new workflow amplifies the ones before it. The deployment workflow feeds the documentation workflow. The documentation workflow triggers the changelog workflow. The changelog workflow posts to Slack, which triggers the customer communication workflow.

You're not just saving time on individual tasks. You're building a system where coordination happens automatically at every transition point.

## The Bigger Picture

This isn't just about efficiency. It's about equity.

When essential coordination work is visible and automated, nobody gets stuck being the invisible glue. Everyone can focus on the work they're actually good at, the work that gets recognized and rewarded.

Teams that build composed AI workflows aren't just shipping faster. They're redistributing the coordination burden from people to systems. They're making space for everyone to do their best work.

Look at your team. Who's the glue person? What would they be working on if they weren't constantly coordinating?

That's the real value of composition. 



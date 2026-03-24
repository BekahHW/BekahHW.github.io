# The Printout — Content Plan

**Publisher:** Paper Compute
**Format:** Newsletter + LinkedIn content
**Cadence:** Biweekly newsletter / 2–3 LinkedIn posts per week
**Tone:** Friendly, accessible, credible — technically honest without being academic

---

## Newsletter Identity

**Name:** The Printout
**Tagline:** What actually happened when the agent ran.

**Why it works:**
- Fits the Paper Compute naming family (tapes, stereos, printout)
- "Printout" implies output, receipts, logs — maps directly to what tapes captures
- Suggests you're reading the real record, not the marketing version
- Friendly and analog in a space full of abstraction

**Sign-up hook:**
*"Real observations from people building agent infrastructure. No hype, just the printout."*

---

## Audience

**Primary:** Developers building agents or AI-powered products
**Secondary:** Platform/infra engineers at companies shipping AI
**Tertiary:** CTOs and tech leads evaluating AI tooling
**Investor audience:** Early-stage and growth investors tracking the AI infrastructure space — looking for signal on market demand, team depth, and emerging wedges

**What builders care about:**
- Reliability and reproducibility of agent runs
- Understanding cost and where it comes from
- Observability — knowing what the agent actually did
- Not getting locked in to the wrong stack

**What investors care about:**
- Is there a real problem here, or is this a solution looking for one?
- Does this team understand the space at a level that gives them an edge?
- Is there organic demand and community forming around this?
- What's the data gravity and lock-in story?

**What everyone is allergic to:**
- Hype and vague claims about AI
- Content that doesn't respect technical depth
- Obvious product marketing dressed up as insight

**How the newsletter serves both audiences:**
The newsletter does double duty. For builders, it's genuinely useful — real observations, real data, honest takes. For investors, it's a signal: the team building Paper Compute understands this space deeply enough to teach it. Audience growth and engagement are also traction metrics that matter at the early stage.

---

## Content Pillars

### 1. The Trace
*Real observations from agent telemetry data*

What we're actually seeing in traces — token usage patterns, failure modes, where agents stall, what correlates with successful runs. Data-grounded, specific, useful.

Example topics:
- "What 1,000 agent runs taught us about prompt efficiency"
- "The most common place agents fail (and it's not the model)"
- "Cache hits vs. misses: what the data actually shows"
- "Why agent duration is a misleading metric"

### 2. The Infrastructure No One Talks About
*The hard problems of running agents in production*

Observability, isolation, reproducibility, cost attribution. The boring-but-critical stuff that determines whether your agent is actually reliable.

Example topics:
- "Why containers aren't enough for agent isolation"
- "How to replay an agent run — and why you'd want to"
- "What 'agent observability' actually means vs. what people say it means"
- "The case for per-run cost attribution"

### 3. Building in Public
*Honest account of what we're building at Paper Compute*

Decisions made, tradeoffs taken, things that didn't work. Not a press release — the actual printout of building agent infrastructure.

Example topics:
- "Why we built tapes as a proxy, not an SDK"
- "What we got wrong about agent telemetry the first time"
- "Why we chose VMs over containers for stereOS"
- "The data model behind agent traces"

### 4. The Field Report
*What's actually happening in the agent ecosystem*

Grounded takes on news, releases, and trends — filtered through the lens of someone building infrastructure, not selling it.

Example topics:
- "What the latest model release means for agent cost"
- "Three things the new OpenAI agents SDK got right (and one it didn't)"
- "Why everyone is building agents but few are running them reliably"

---

## Newsletter Structure (per issue)

```
Subject line: short, specific, a little dry — like a good log message
  e.g. "What the trace actually showed" / "Issue #4: The replay problem"

Opening (2–3 sentences)
  One concrete observation or question. No preamble.

Main piece (400–600 words)
  One idea, fully developed. Data where possible. Honest about uncertainty.

The Short Stack (3 bullets)
  Quick observations, links, or things worth knowing. Not a link dump.

What We're Working On (1 paragraph)
  Brief, honest update from Paper Compute. Not a pitch — just context.
```

---

## LinkedIn Content Strategy

**Goal:** Build audience and trust before the cloud offering launches
**Voice:** The same person who writes The Printout — credible, a little dry, genuinely useful

### Post Types

**Type 1: The Observation**
One thing learned from agent traces or building infrastructure. Short, specific, no throat-clearing.
*Format: 3–5 sentences + optional data point. No listicles.*

> "We looked at 500 agent runs last week. The most common failure mode wasn't a bad prompt or a hallucination — it was a tool call that silently returned nothing and the agent kept going anyway. Observability isn't optional for agents. It's how you find the quiet failures."

**Type 2: The Contrarian Take**
Push back on a common assumption. Earn credibility by being right about something others are getting wrong.
*Format: Setup the assumption, flip it, explain why.*

> "Everyone talks about making agents faster. The more interesting problem is making them reproducible. Speed without reproducibility means you can't debug, can't evaluate, can't improve. Slow and reproducible beats fast and opaque every time."

**Type 3: Building in Public**
A decision made, a tradeoff taken, something that didn't work. Honest and specific.
*Format: Here's what we tried. Here's what happened. Here's what we learned.*

**Type 4: The Question**
Pose a real question the team is wrestling with. Invites genuine response.
*Format: One question, brief context, ask for perspective.*

### Posting Rhythm
- Monday: Observation or contrarian take (high value, start the week strong)
- Wednesday: Building in public or field report
- Friday: Question or lighter take

---

## First 8 Newsletter Issues

| # | Pillar | Title |
|---|--------|-------|
| 1 | Building in Public | Why we built a proxy instead of an SDK |
| 2 | The Trace | What agent traces actually look like (with data) |
| 3 | Infrastructure | The case for VM isolation over containers |
| 4 | The Trace | The quiet failure: tool calls that return nothing |
| 5 | Building in Public | The data model behind agent traces |
| 6 | Infrastructure | What agent replay requires (and why it's hard) |
| 7 | Field Report | What's missing from current agent observability tools |
| 8 | The Trace | Cost per agent run: what the data shows |

---

## Launch Plan

**Pre-launch (weeks 1–2):**
- Set up newsletter platform (Beehiiv or Substack recommended)
- Write issues 1–2 in advance
- Begin LinkedIn posting immediately — don't wait for newsletter launch
- Soft launch: share with team, advisors, early users for feedback

**Launch (week 3):**
- Publish issue #1
- LinkedIn post announcing The Printout — lead with the value, not the product
- Personal outreach to 20–30 people who'd genuinely find it useful

**Post-launch:**
- Biweekly issues, consistent LinkedIn cadence
- Track what resonates (replies, shares, sign-ups from specific posts)
- Let the best-performing LinkedIn content inform newsletter topics

---

## Success Metrics

- Newsletter open rate >40% (industry avg for tech newsletters is ~25%)
- Reply rate — are readers responding? That's the real signal
- LinkedIn follower growth and post engagement
- Sign-up source tracking — which posts drive subscriptions
- Qualitative: are the right people signing up (builders, not just curious observers)

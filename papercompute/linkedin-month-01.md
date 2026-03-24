# The Printout — LinkedIn Content: Month 1
**Paper Compute | 4 weeks | ~3 posts/week**

Tone: Conversational, technically credible, honest about what we're figuring out.
Voice: First person, direct, brings the reader along — no hot takes for their own sake.

---

## WEEK 1

---

### Post 1 — Monday (Observation)

Most people building agents are flying blind.

Not because they don't care about observability. Because the tools they're using were built for something else.

Standard LLM monitoring gives you: latency, token count, cost per call. That's useful. But an agent isn't a call. It's a chain of decisions — some made by the model, some triggered by tool outputs, some looping back on themselves in ways nobody planned.

What you actually need to know: where did it go wrong, and why?

That's a trace problem, not a metrics problem. And most teams don't realize there's a difference until something breaks in production.

We're building tapes because we kept running into this ourselves.

---

### Post 2 — Wednesday (Building in Public)

When we built tapes, we made a call that felt a little contrarian at the time: proxy over SDK.

Most observability tools want you to wrap your LLM client in their library. It's fine. But it means every developer has to opt in, every new integration needs an adapter, and you're always one layer away from the actual traffic.

A proxy sits in the network path. Point your client at it, and it captures everything — without touching your code.

The tradeoff: it's harder to build. The payoff: it works for every model, every framework, every agent — automatically.

For agent observability specifically, this ends up mattering a lot. You can't get a complete trace if your instrumentation is optional.

---

### Post 3 — Friday (Question)

Here's something I've been thinking about:

When your agent fails, how do you figure out why?

For most teams I talk to, the answer is some version of "we look at the logs and guess." That works until your agent is doing something complex enough that the logs don't tell the story anymore.

What's your current approach? Genuinely curious — especially if you've found something that actually works.

---

## WEEK 2

---

### Post 4 — Monday (Contrarian Take)

Everyone is talking about making agents faster.

I think that's the wrong problem to optimize for right now.

Fast and unreliable is worse than slow and reproducible. If you can't replay a run, you can't debug it. If you can't debug it, you can't improve it. If you can't improve it, you're just shipping vibes.

Reproducibility is the foundation. Speed is what you optimize once you have it.

This is why we're building tapes inside stereOS — full VM isolation per agent run means you can actually replay what happened, in the same environment, with the same trace. That's the prerequisite for everything else.

---

### Post 5 — Wednesday (Observation)

Something we keep seeing in agent traces that surprises people:

The expensive part usually isn't where they think it is.

Most teams assume cost correlates with how "smart" the task is. In practice, it correlates with how many times the agent loops back on itself — often because a tool call returned nothing and the agent kept going anyway.

Silent failures are the hidden cost center in agent systems.

You can't see them without the trace. And you can't fix what you can't see.

---

### Post 6 — Friday (Building in Public)

We're a small team building infrastructure for AI agents. Paper Compute.

Here's what we're working on:

**tapes** — an LLM proxy that captures every call your agent makes into a structured trace. No code changes. It just sits in the path.

**stereOS** — a Linux OS purpose-built for running AI agents in isolated VMs. Each run gets its own kernel, RAM, disk, network.

The combination: automatic, per-run observability for every agent — tied to a reproducible environment. So when something goes wrong, you have both the trace and the environment to debug it.

We're building The Printout to share what we're learning along the way. Link to sign up in the comments if you want in.

---

## WEEK 3

---

### Post 7 — Monday (The Field Report)

The agent observability space is moving fast right now.

LangSmith is solid if you're in the LangChain ecosystem. OpenTelemetry has some LLM semantic conventions being drafted. A few startups are building purpose-built tools.

But here's what's still missing: observability that's tied to the *environment* the agent ran in, not just the calls it made.

Right now, you can capture the trace. But if you want to replay it, you're on your own — different environment, different OS state, potentially different behavior. The trace and the execution are decoupled.

That's the problem we're solving. It's not obvious until you need it, and then it's very obvious.

---

### Post 8 — Wednesday (Observation)

We've been looking at token usage patterns across agent runs, and there's something worth sharing.

Cache hit rates vary wildly — not by model, but by how the agent is structured.

Agents that reuse system prompts across a run hit the cache constantly. Agents that reconstruct context at each step burn through tokens fast. The difference isn't the model choice or the task complexity. It's the architecture.

Most teams don't see this because they're looking at per-call metrics, not run-level patterns.

This is one of the things the trace reveals immediately once you're looking at the right level.

---

### Post 9 — Friday (Question)

We're thinking a lot about what makes agent telemetry actually useful vs. just more data to ignore.

Here's my current list of things that matter:
- Did the agent complete the task? (outcome)
- How many LLM calls did it take? (efficiency)
- Where did it branch or retry? (reasoning path)
- What did tool calls return? (environment)
- What did it cost? (economics)

What am I missing? What do you wish you could see in your agent runs?

---

## WEEK 4

---

### Post 10 — Monday (Contrarian Take)

Hot take: most "agent evals" aren't measuring what teams think they're measuring.

If your eval set is synthetic — tasks you designed knowing the answer — you're measuring whether your agent can solve tasks that look like your eval set. That's not nothing, but it's not production.

The most valuable eval data comes from real runs. Actual tasks, actual failures, actual costs. The trace is the eval.

This is one of the reasons capturing production traces matters so much. You're not just building a log — you're building a benchmark that reflects reality.

---

### Post 11 — Wednesday (Building in Public)

A thing I've learned building agent infrastructure: the hard problems aren't where the demos suggest.

Demos show agents doing impressive things. Production shows agents quietly failing in ways that are really hard to debug — a tool call that returned an empty list, an agent that interpreted silence as success, a loop that looked like progress in the logs but wasn't.

The infrastructure problem isn't "can the agent do the thing." It's "can you tell when it didn't."

That's the gap we're trying to close.

---

### Post 12 — Friday (Invitation / Newsletter CTA)

We started The Printout because we kept having conversations we wanted more people to be part of.

What does it actually look like to run agents reliably in production? What does the trace reveal that the logs don't? What does "observability" even mean for a system that reasons?

We write about it biweekly — real observations, honest takes, no hype.

If that sounds useful, you can sign up here: [link]

We're also just getting started. If you're building agents and want to compare notes, hit reply on any issue. We read everything.

---

## Notes on Posting

- **Engagement:** Reply to every comment in the first hour. LinkedIn rewards this heavily.
- **Hashtags:** Keep to 3–4 max. Suggested: #AIEngineering #AgentObservability #DeveloperTools #AIInfrastructure
- **Format:** Short paragraphs, no walls of text. White space is your friend on LinkedIn.
- **Repurpose:** Each newsletter issue can be broken into 2–3 LinkedIn posts. The Short Stack bullets translate directly.
- **Investor signal:** Posts 6 and 12 do double duty — they explain what Paper Compute is building for developers, but they also demonstrate traction (audience engagement) and clarity of vision for any investor scrolling by.

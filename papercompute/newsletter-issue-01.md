# The Printout — Issue #1
**What actually happened when the agent ran.**

---

**Subject line:** We built a proxy instead of an SDK. Here's why that matters.

---

Hey,

Welcome to the first issue of The Printout. If you're here, you probably care about what's actually happening inside your AI systems — not the marketing version, the real one. That's what we're going to talk about, every issue.

I want to start with a decision we made early at Paper Compute that shaped everything else: when we built tapes, our LLM observability tool, we built it as a proxy instead of an SDK.

Most people building in this space go SDK-first. It makes sense on the surface — you get deep integration, you can capture everything, you ship something fast. But there's a catch.

**An SDK means you're asking developers to change their code.**

Every team has to instrument their calls. Every new model integration has to be re-wrapped. Every agent framework that comes along requires another adapter. You're always one degree removed from the real traffic, and you're always dependent on people actually using your library correctly.

A proxy sits in the network path. You point your LLM client at it instead of directly at OpenAI or Anthropic, and it captures everything — without touching application code. The agent doesn't know it's there. The developer doesn't have to do anything differently.

That's a different kind of observability. It's closer to how you'd instrument a database or a service mesh than how you'd add logging to your app. And when you're trying to understand what an *agent* is doing — not just a single LLM call, but a full chain of reasoning, tool calls, retries, and branches — that distinction matters a lot.

Here's what we've already learned from the traces tapes captures:

- The most interesting failures aren't model errors. They're silent ones — tool calls that return nothing, agents that keep going anyway, loops that look like progress but aren't.
- Token usage patterns look very different at the agent level than the call level. One "agent run" might generate a dozen LLM calls with wildly different cost profiles depending on which branch the agent took.
- Cache behavior matters more than most people realize. A cache miss in the middle of a long chain can double your cost for that run.

None of this is obvious unless you have the full trace. And you can't get the full trace if your observability depends on developers remembering to add a wrapper.

That's the bet we made. So far, it's the right one.

---

**The Short Stack**

Three things worth knowing this week:

1. **Agent observability is not the same as LLM observability.** Single-call metrics — latency, tokens, cost — don't tell you whether an agent *reasoned correctly*. The trace does.

2. **OpenTelemetry wasn't designed for this.** It's a great standard for deterministic systems. Agents aren't deterministic. The tooling is catching up, but it's not there yet.

3. **Reproducibility is the hard problem.** Replay is only useful if you can guarantee the same environment. That's why we're building tapes into stereOS — each agent run gets its own isolated VM, so the trace and the environment are both captured.

---

**What We're Working On**

We're in the middle of wiring tapes into stereOS so that every agent run is automatically instrumented — no config, no code changes. The trace just shows up. We'll share what that looks like in a future issue, including the data model we landed on and the tradeoffs we made along the way.

If you're building agents and you want to talk through what you're seeing, hit reply. We read everything.

— The Paper Compute team

---

*You're receiving The Printout because you signed up at papercompute.co. Forward it to someone who'd find it useful.*
*[Unsubscribe](#) | [Read online](#)*

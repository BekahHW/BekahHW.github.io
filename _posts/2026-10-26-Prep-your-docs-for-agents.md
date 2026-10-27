---
layout: post
title: "Are Your Docs Ready for AI Agents?"
date: 2026-10-26
author: Bekah
tags: [AI, Learning, Docs]
description: "We've spent years perfecting our docs for human developers. But are they ready for AI agents?"
---

We've spent years trying to build great onboarding experiences for humans, and even then, we know they aren't perfect. But now, we're not just building for humans (whose behavior we have a better understanding of). We're building for AI agents too. 

And agents don't necessarily approach documentation the same way humans do. They search, guess URLs, follow redirects, and make decisions about which information to trust. But how often are we actually watching what happens when they try to onboard?

This weekend I ran a little test to see how an AI agent would handle onboarding to an inference provider without any human guidance. I started by selecting a provider, giving my agent rules, and then watched what happened.

*A note: The provider has been anonymized for publication. Domains, model IDs, endpoint paths, and provider-specific error details have been generalized. The numbers, outcomes, and agent behavior are unchanged.*

## The Experiment

I chose an inference provider that had migrated its API and restructured its documentation. That made it an interesting candidate because the agent would need to find the current information while potentially encountering outdated URLs, older examples, and its own assumptions about how the provider worked.

I wanted to know whether it could navigate all of that without human assistance. And I wanted the answer to be allowed to be positive. If an agent can onboard successfully under those conditions, that's worth knowing too.

I used Claude Code, running headless from the command line and starting in an empty directory. The task was straightforward:

```
Build a small application that:

- Authenticates using an API key provided through an environment variable.
- Sends the message "Explain what an API is in one sentence" to a supported model.
- Receives the response.
- Prints the model's answer to the terminal.
- Handles common request failures without exposing credentials.

```
Additionally, it was to usee the official docs as the authority without fabricating information, don't guess credentials, don't buy anything.

A valid key on a funded account was exported into the agent's environment before launch. 

I froze the protocol, the success criteria, and the metric definitions before the first run, and I didn't read a session record until its run had ended. 

Success meant seven things, all required: 
- a runnable project, 
- the current endpoint, 
- successful auth, 
- a real request, 
- a real response, 
- a non-empty printed answer, and 
- me re-running the agent's code in a clean virtualenv and getting the same result. 

Two independent baseline runs, A and B. Then one guided run, C, with a single file added. Every event timestamped on receipt. The thought was that three session records read closely tell you things a pass/fail column never will.

## Discovery 1: The agents onboarded themselves

Both baselines succeeded without human help or interventions, in under three minutes each.

| | Run A | Run B |
|---|---|---|
| Outcome | verified success | verified success |
| Time to a working, executed integration | 176 s | 134 s |
| Human technical interventions | 0 | 0 |
| Distinct errors hit, all recovered | 4 | 3 |
| Inference spend | under a cent | under a cent |

Both agents found the key in the environment within their first minute by listing environment variables, at 58 seconds and 20 seconds. Both picked the quick start's model, the documented base URL, and the `requests` library. Both wrote near-identical programs: no retry on 400 or 401, exponential backoff on 429 and 5xx, a guard for an empty answer from a reasoning model, and error output that never includes the key. Then both did something I didn't ask for. They tested their own failure paths against the live service — missing key, malformed key, unknown model — and reported which paths they couldn't exercise.

I re-ran each program myself. One-sentence answer, both times.

This is a great result, and importantly, it's a positive one. A documentation team that just finished a migration should hear this part first: two of two agents went from nothing to a verified, well-structured integration with zero help. The current docs are doing their job.

## Discovery 2: Success isn't the same as smooth

A pass/fail outcome tells you where the agent ended up. It tells you nothing about the route.

So I counted the route.

| | Run A | Run B |
|---|---|---|
| Time until the first current doc page was read | 28 s | 64 s |
| Distinct URLs fetched | 12 | 19 |
| Fetches that returned nothing useful | 5 | 11 |
| Fetches to the legacy docs host | 3 | 7 |
| 404s from guessed page names | 2 | 4 |

In both baselines, the main friction came from finding the current documentation. The only other failures were a handful of shell commands my own test harness blocked, each reworded within seconds. 

Both runs started with one web search, and both searches pointed at the past. Run A's results included the current quick start, but also the legacy docs host, and the search summary quoted the old base URL from blog posts written before the migration. (This is why I always encourage teams to update their content and remove outdated references.) Run B had restricted its own search to the legacy domains it expected to find, so every result it saw was stale.

Both agents fetched legacy URLs first and got redirects back. Run A tried three, gave up, and lost about ten seconds. Run B tried the legacy host, then the intermediate host it was redirected to, then guessed four page names under the new site. Seven redirects and four 404s later, at the 46-second mark, it wrote: "The docs site has been restructured. The index file should map out the inference section." It fetched the site's `llms.txt`, and from there it went straight to the four pages it needed.

That detour was roughly 40 seconds of a 163-second session. A quarter of the run, spent not finding the docs.

I checked what the agents hit. The legacy paths redirect, through five hops, to the documentation home page, not to equivalent pages. And the home page's Markdown variant, which is what this agent's fetch tool summarized, listed the provider's GPU products and a pointer to `llms.txt`, nothing about inference. The HTML sidebar does link it. An agent reading the Markdown version, as these did, never sees that sidebar.

Two things are true at once. The current docs are good: once either agent reached them, it never needed anything else and never used a stale value. And the path from "what a search engine or a model's memory thinks your docs are" to those docs is where the time went.

One more thing from Run A, because it's the behavior you want. Its search summary told it the base URL was the old one. It didn't believe a summary. It fetched the quick start and confirmed the real URL in the raw page before writing a line of code. Fluent isn't the same as correct, and this agent knew it.

Smaller things I found along the way:

- The Python examples in the docs hard-code the key. The environment variable name only appears in the shell and JavaScript examples. Both agents found it by listing the environment, which worked, but the secure pattern should be shown in the language people copy from.
- Both agents guessed page names that don't exist. Six 404s across two runs. That's mostly agent strategy, but it's also a signal about how predictable your URL structure is.

Your legacy hostnames are still your front door. Redirect old paths to their equivalents, not to the home page. Put the migration note where the old content still ranks.

## Discovery 3: One page changed the route

The baseline runs didn't turn up anything wrong in the current documentation. Once the agents reached the right pages, every fact they needed was there. What they showed was that getting to those pages was slow: the first 30 to 60 seconds of each run went to old hostnames, redirects, and guessed URLs.

So for the third run I didn't change the docs. I wrote one short Markdown file and placed it in the agent's working directory before it started. The file is an orientation page written for a coding agent. It says where the current docs live and which old sites to ignore. It lists the four pages the agent needs to read. It names the account requirements, the environment variable that holds the key, one gotcha about token limits with the default model, and what each error code means.

Nothing in that file was new. The technical details came from the official documentation, with links back to the source. The file's only job was to let the agent skip the search.

Before Run C, I wrote down what would count: zero fetches to legacy hosts, zero 404s, and the agent still treating official pages as the authority. I also wrote down that one guided run cannot show a speed-up. Then I gave Run C the same prompt plus one sentence naming the file.

| | Run A | Run B | Run C (guided) |
|---|---|---|---|
| Legacy-host fetches | 3 | 7 | 0 |
| 404s | 2 | 4 | 0 |
| First current doc page read | 28 s | 64 s | 26 s |
| Verified official pages before coding | yes | yes | yes, all four plus `llms.txt` |
| Time to verified result | 176 s | 134 s | 167 s |

The detour didn't happen. The agent read the guide, said it would "verify against the official docs directly before writing anything," fetched all four pages and the index, and ignored the legacy host its own web search still surfaced, with a stated reason.

Then it took a different implementation path than either baseline and ran into unrelated client and environment issues on my machine, which required additional debugging. None of them had anything to do with the guide or the documentation. The agent diagnosed them, changed approach, and succeeded about 80 seconds after its first failed run.

So the guided run was the cleanest documentation journey of the three and still not the fastest, for reasons the docs had no part in. I can't tell you the guide made things faster because of that, but I can say that the detour the guide targeted didn't recur, and that the agent still verified every detail against the official pages instead of trusting my summary of them.

## Developer Adoption Now Includes AI Enablement

Agent-based onboarding produces unusually detailed execution records. In my setup, that meant every URL the agent guessed, every summary it distrusted, and every page that finally answered the question, timestamped.

The agents didn't struggle with the documentation itself. Once they found the current pages, both built working integrations. The friction was in getting there: outdated search results, legacy URLs, and redirects that led to the wrong place. Those things might belong to different teams, but to a developer or an agent, they're all part of onboarding.

And that's what changes when agents become part of your developer audience. A person might search again after hitting a dead end. In my experiment, one agent guessed several URLs before finding the documentation index. It still succeeded, but those extra steps cost time, and the session record made that cost visible.

If developer adoption is about helping people reach their first successful integration, AI enablement has to include helping the agents doing that work. And now we have a way to measure it. Give an agent a task, capture its journey, make one improvement, and run it again.

I tried that with a one-page guide. In the guided run, the legacy documentation detour disappeared. One run doesn't prove a speed improvement, but it demonstrates why we should measure the path, not just the result.

## An Agent Onboarding Scorecard

If we're going to improve agent onboarding, we need a way to measure it. Here's what I started with:

| Metric | What it reveals |
|---|---|
| Time to first verified integration | How quickly an agent creates working value |
| Documentation discovery time | How easily an agent finds authoritative information |
| Unproductive fetches | How much navigation work fails to produce useful content |
| Error recovery | Whether an agent can proceed independently |
| Human interventions | How much assistance onboarding requires |

This isn't a finished scoring system, but it's a starting point. Each metric needs a clear definition so teams can measure it consistently, compare runs, and see whether their changes make a difference.

There are still gaps to explore, including signup and payment, different agent models, and enough repeated runs to measure reliability. But we don't need a perfect framework to start learning from the data we already have.

## Final Thoughts

The agents are already reading. Now we're responsible for what they find first.
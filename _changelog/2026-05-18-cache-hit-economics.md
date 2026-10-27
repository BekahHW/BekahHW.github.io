---
title: "Reading the cache like a diagnostic"
date: 2026-05-18
description: "Three SQL queries against my own archive: 93% of input tokens came from cache, which puts effective input cost at roughly a sixth of nominal. The per-model split was the interesting part. Opus hit 95.6%, Sonnet 94.4%, Haiku 58.6%, and that gap says more about how each model gets used than about the models themselves. Cache hit rate turned out to be a prompt-stability metric hiding in the billing data."
link: https://papercompute.com/concepts/enterprise-inference-gateway
tags: [cost, caching, telemetry]
---

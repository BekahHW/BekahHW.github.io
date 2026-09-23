# Changelog entries

Each file here becomes one note on `/changelog/` and one item in `/changelog.xml`.

Name files `YYYY-MM-DD-short-slug.md` and use this front matter:

```yaml
---
title: "Skills tastemaker"        # required
date: 2026-09-23                  # required
description: "One short paragraph, written like a note to yourself."  # required
link: https://example.com/project # optional, the title links here
tags: [skills, session-data]      # optional
---
```

Anything below the front matter is optional extra detail. It shows under the
description on the page and is included in the RSS item.

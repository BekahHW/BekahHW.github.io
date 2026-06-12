BekahHW.com Redesign: Implementation Handoff
Prepared for an implementation agent working on the Jekyll site at bekahhw.com. Reference mockups: homepage-hero-rough.html and ai-foundations-syllabus.html (provided alongside this doc). Treat the mockups as the source of truth for visual design. This doc covers everything the mockups don't.


1. Project summary
Redesign bekahhw.com around a "looseleaf notebook" design language that reflects Bekah's identity as a former college English professor who now works in AI developer experience. The current site uses the stock Jekyll "Subtle" theme by JustGoodThemes and reads as templated. The redesign replaces the theme's visual layer while keeping Jekyll, existing content, and existing URLs.

Deliverables, in priority order:

Bug fixes on the current site (Section 3). Ship these first, independent of the redesign.
New design system applied site-wide (Section 4).
Redesigned homepage (Section 5).
New AI Foundations series hub page (Section 6).
Rewritten About page content (Section 7).
QA pass (Section 9).
2. Current site context
Static site generator: Jekyll, currently on the "Subtle" theme.
Hosting appears to be GitHub Pages (RSS feed lives at bekahhw.github.io/feed.xml).
Existing pages: Home (paginated post feed, 22 pages), About, My Work, Consulting, Contact, All Topics (/tags), Subscribe, plus ~150 posts.
The site already has extensive AI-crawler and SEO meta tags. Preserve all of them. Do not remove or rename any existing meta tags, canonical URLs, or the robots directives.
Do not change any post URLs or permalinks. Several are linked externally.
3. Bug fixes (ship first, no redesign required)
My Work impact counters render as "0+". Blog Readership, OSS Course Participants, and Virtual Coffee member counts all display zero. Either fix the count-up script so it fires reliably (and renders real numbers without JS as a fallback) or replace with static numbers. Static numbers in the markup are preferred so crawlers see real values.
Literal markdown artifacts on My Work. Two section headers render with visible ** and ### characters around "Developer Strategy & Execution" and "Community & Open Source Advocacy". Fix the markdown.
title="??" on Read More links. Remove or replace with the post title.
Homepage <title> is "Home". Change to something like "BekahHW | Developer Experience, AI, and Community". Apply a sensible title pattern site-wide ("{Page title} | BekahHW").
Footer theme credit. Remove "Subtle theme by JustGoodThemes" once the redesign ships. Keep or drop "Powered by Jekyll" at Bekah's discretion.
Link rot risk. My Work links heavily to opensauced.pizza. Verify each link resolves. For any that 404, link to an archive.org capture or mirror the content locally.
4. Design system
All values below match the mockups. Define them as CSS custom properties in one place.
Colors
--paper: #FBFAF6 (page background)
--rule-blue: #C9D7E4 (notebook rule lines, placeholders)
--margin-red: #D6453D (looseleaf margin rule, red-pen accents, marginalia)
--ink: #1F2A3D (primary text)
--ballpoint: #2456A6 (links, hover states)
--pencil: #6B7280 (secondary text, labels)
--done: #2E7D4F (completed/checked states)
Typography (all on Google Fonts)
Display: Young Serif, weight 400, for h1/h2 and the wordmark.
Body: Source Serif 4, for prose.
Utility: IBM Plex Mono, for labels, dates, course codes, nav links, buttons.
Handwriting: Caveat 500–600, for marginalia, captions, and the draft toggle. Use sparingly. It is an accent, not a body face.

Self-host the fonts or use Google Fonts with display=swap. Subset if possible.
Signature elements
These are what make the design recognizable. Implement all of them.

Ruled-paper background. Faint horizontal lines via repeating-linear-gradient on body (see mockup CSS, 36px rhythm at ~38% opacity of rule-blue).
Red margin rule. A 2px vertical line at the left of the content column on screens ≥760px, at ~55% opacity. Content sits to its right. See .page::before in the mockups for exact offsets at the 760px and 1100px breakpoints.
Marginalia notes. Handwritten red notes hanging in the left margin, desktop ≥1100px only, rotated about -2.5deg. Implemented as absolutely positioned spans inside relatively positioned parents. Hidden below 1100px. Keep them short, witty, and in Bekah's voice. She will supply final note text per page.
Taped snapshot photo. White-bordered photo with two tape pseudo-elements and a Caveat caption. See .snapshot in the hero mockup.
Red-pen headline accent. The final phrase of the homepage headline is wrapped in a span colored margin-red.
Layout
Content max-width 1100px, centered. Base padding 28px. Left padding 128px at ≥760px and 156px at ≥1100px to make room for the margin rule and marginalia.
Breakpoints: 700px (hero goes two-column, hamburger nav switches to inline links), 760px (margin rule appears), 1100px (marginalia appears, gutter widens).
Motion and accessibility
Hover underline on headings draws left to right (220ms background-size transition).
Hamburger animates to an X.
Wrap all transitions in a prefers-reduced-motion: reduce override that disables them.
Visible :focus-visible outlines on all interactive elements (2px ballpoint, 3px offset).
Color contrast: ink on paper and ballpoint on paper both pass WCAG AA. Pencil (#6B7280) on paper is borderline for small text. Use it only at 13px+ in mono labels, never for body prose.
Marginalia is decorative. Keep it out of the accessibility tree if it would confuse reading order (aria-hidden="true" is acceptable).
5. Homepage
Implement per homepage-hero-rough.html. Structure top to bottom:

Nav. Wordmark left, links right (About, My Work, Consulting, Writing, Subscribe). Below 700px, links collapse into a hamburger dropdown (bordered paper panel, closes on outside click, aria-expanded managed). The mockup's nav omits "All Topics" and "Contact" from the top level. Confirm final nav items with Bekah; Contact can live in the footer and under Consulting.
Hero. Two columns at ≥700px: text left, taped photo right (column width clamp(200px, 26vw, 290px)). Photo: /assets/images/pages/THAT_keynote.jpg, alt "Bekah speaking on stage at THAT Conference", caption "hi, that's me". Headline, then the handwritten "see another draft of this headline" toggle directly beneath it, then subhead, then two CTAs (primary: Start with AI Foundations → links to the new hub page; ghost: Read the latest → first post).
Headline drafts. Ship with draft 1 as default. Keep the cycle behavior from the mockup unless Bekah decides to hardcode one. The three drafts and their subheads are in the mockup's drafts array. The red-pen span placement per draft is already defined there.
Currently strip. Three mono-label rows (Currently / Writing about / Building). Make this a Jekyll data file (_data/currently.yml) so Bekah can update it without touching templates.
Latest posts. Jekyll post loop styled per the mockup's .post pattern: mono date in margin-red, Young Serif title with draw-underline hover, excerpt. Paginate as the current site does. The first post gets a "newest" marginalia note.
6. AI Foundations hub page
New page at /ai-foundations (confirm slug with Bekah). Implement per ai-foundations-syllabus.html.

Syllabus header: eyebrow, title, lede, facts table (Instructor / Format / Prerequisites / Office hours), handwritten progress line.
Six readings in three units, each with mono course code in margin-red (AI 101 through AI 302), checkable tick box, title linking to the real post, one-sentence description, and a meta line with reading time.
Post order and URLs:
AI 101 → /AI-Vocabulary-101
AI 102 → /AI-102
AI 201 → /how-ai-tools-communicate
AI 202 → /ai-security-101
AI 301 → /learning-to-work-with-agents
AI 302 → /ai-in-the-ai-development-loop
Replace the mockup's estimated reading times with computed ones (word count / 200, rounded).
Progress persistence. The mockup keeps checkbox state in memory only. On the real site, persist to localStorage (key suggestion: ai-foundations-progress, an array of completed slugs). Restore on load. Update the handwritten progress line per the mockup's thresholds, ending at "All six. A+ work. See you at office hours."
Office hours block at the bottom links to /contact.
Add the page to the homepage primary CTA and consider a small "Part of the AI Foundations reading path" banner on each of the six posts linking back to the hub. Banner styled as a mono eyebrow plus course code.
Give the page proper meta: title "AI Foundations, a Reading Path | BekahHW", description in plain language, and the same AI-crawler meta pattern the rest of the site uses.
7. About page copy (replace existing content)
Use this copy verbatim. Bekah may tweak wording after seeing it staged.

Before I taught developers, I taught college freshmen how to write essays. For ten years. So when people ask how an English professor ends up leading developer experience for an AI platform, the honest answer is that it's the same job. You figure out what someone doesn't understand yet, and you build them a path to understanding it.

I graduated from Flatiron School's software engineering program in 2019 and went looking for the community I needed as a new developer. When I couldn't find it, I built it. Virtual Coffee started as a Zoom call in 2020 and grew into a community of more than a thousand developers who show up for each other every week.

Since then I've worked across developer relations and developer experience, including roles at Deepgram, OpenSauced, and Continue. I've built open source courses with hundreds of students around the world, given keynotes, hosted more events than I can count, and written documentation, curriculum, blog posts, short fiction, and one screenplay I will neither confirm nor deny.

These days I'm the Developer Experience Lead for AI Platform at Paper Compute, where I spend my time making AI tooling legible. To developers, to search engines, and to AI systems themselves. I think of it as teaching, because it is.

Outside of work, I mom hard x4, write fiction with my brothers at Siblings Write, lift heavy things, and see how high I can jump.

If you want to work together, talk shop, or tell me what confused you in one of my posts, I'd genuinely love to hear it. Say hi.

Implementation notes: link Virtual Coffee to virtualcoffee.io, Siblings Write to siblingswrite.com, and "Say hi" to /contact. Style the page in the new system with one or two marginalia notes.
8. Per-page imagery
Every page gets exactly one taped snapshot (the Section 4 treatment: white border, tape corners, slight rotation, Caveat caption). One per page, not more. The photo placement alternates sides page to page so the site doesn't feel stamped from a single template. Captions are voice spots and should be short and deadpan.

Suggested assignments. Use existing assets where they exist, otherwise drop in a rule-blue placeholder frame and flag it for Bekah:

Home: /assets/images/pages/THAT_keynote.jpg, caption "hi, that's me". Already specified in Section 5.
About: a different photo from the homepage, ideally candid rather than stage. Placeholder until Bekah supplies one. Caption suggestion: "not pictured: the screenplay".
My Work: a community or speaking photo. Caption suggestion: "the work is mostly people".
Consulting: a working shot or workshop photo. Caption suggestion: "office hours, basically".
Contact: can be lighter or more personal. Caption suggestion: "say hi, I answer".
AI Foundations hub: optional. The syllabus layout is already visually rich, so only add a photo if it doesn't crowd the facts table. If added, a teaching-style photo fits best.
Post pages (later phase): posts keep their existing featured images, but when post pages adopt the new system, render the featured image in the snapshot frame with the tape treatment so imagery is consistent site-wide.

Implementation: make the snapshot a Jekyll include (_includes/snapshot.html) taking src, alt, caption, and side (left/right) parameters, so each page declares its photo in front matter rather than duplicating markup.
9. Voice rules for any copy the agent writes
When generating microcopy, marginalia, alt text, or error pages, follow Bekah's voice rules. No em dashes anywhere. No semicolons. Colons only sparingly. Short sentences for punch. Deadpan over exclamation. Never urgency language or hard-sell CTAs. If a write-like-bekah skill file is available in the working environment, read it before writing anything she will publish.
10. QA checklist
All six bug fixes from Section 3 verified on production.
No existing URL returns 404 after the redesign. Run a crawl against the old sitemap.
All existing meta tags, canonical URLs, and the RSS feed preserved.
Homepage, hub page, About, My Work, Consulting, Contact, tags, and subscribe pages all render in the new system.
Every page renders exactly one snapshot (or a flagged placeholder), with alt text, and no layout overlap at any breakpoint.
Hamburger nav works below 700px, including keyboard and screen reader (aria-expanded toggles, focus stays sensible).
Hero photo sits beside text from 700px up. No premature stacking at tablet widths.
Marginalia hidden below 1100px and never overlaps content.
Syllabus progress persists across reloads and updates the progress line.
prefers-reduced-motion disables all transitions.
Lighthouse: accessibility ≥ 95, no contrast failures, fonts swap without large layout shift.
Counters on My Work show real numbers with JS disabled.
Images are compressed and appropriately sized (the snapshot renders at ≤290px wide, so serve files near that size, not full-resolution originals).
11. Open decisions for Bekah
Final headline draft (or keep the cycling toggle as a permanent feature).
Name Paper Compute on the About page.
Final nav items and whether Contact stays top-level.
Hub page slug.
Final marginalia note text per page.
Photo selections and final captions for About, My Work, Consulting, and Contact.
Whether the looseleaf system extends to post pages now or in a later phase. Recommendation: later phase, after the homepage and hub ship.


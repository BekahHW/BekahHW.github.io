# Tag Taxonomy Cleanup Proposal

Prepared for Bekah's review. **Do not merge tags until approved.** Any merge requires keeping old `/tag/x/` URLs working (redirects or preserved pages).

| Tag | Post count | Recommendation | Rationale |
|-----|------------|----------------|-----------|
| Career | 49 | Keep | Core theme. Largest cluster. Graph anchor. |
| Personal | 43 | Keep | High volume. Review overlap with Opinion before merging anything into it. |
| Tips | 31 | Keep | Strong utility bucket. |
| Learning | 30 | Keep | Distinct from Tips (growth arc vs quick advice). |
| Opinion | 22 | Review | 22 posts. Check how many also carry Personal. If most Opinion posts are Personal, fold Opinion into Personal and leave redirects. |
| Community | 22 | Keep | Distinct DevRel/community lane. |
| Technical | 18 | Keep | Tutorial and tooling content. |
| AI | 17 | Keep, consider subtags | Large enough to split if you want the AI cluster navigable. Suggested subtags: **Agents**, **AI Foundations** (for the six-part series). |
| Mental Health | 14 | Keep | Distinct audience and voice. |
| Content Creation | 7 | Keep | DevRel/content strategy lane. |
| Open Source | 7 | Keep | Distinct from Community. |
| DevRel | 5 | Keep | Growth area aligned with current role. Do not merge into Developer Experience (1 post). |
| TFJS | 5 | Keep | Niche but coherent archive. |
| Bootcamp | 5 | Keep | Career-adjacent but specific enough to keep. |
| Beginner | 4 | Keep | Useful entry filter, often pairs with AI posts. |
| Interview | 3 | Keep | Small but distinct intent. |
| Testing | 2 | Keep | Low volume but not hurting the graph. |
| Speaking | 1 | Merge into Career | Single post. Career already covers talks and keynotes. |
| Best Practices | 1 | Merge into Tips | Single post. Same reader intent. |
| Developer Experience | 1 | Merge into DevRel or keep if planned growth | One post today. DevRel is the stronger bucket unless DX becomes a deliberate series. |
| Security | 1 | Keep only if more security posts planned | Currently one post (AI Security 101). That post also carries AI and Beginner. Keep if the security series grows. Otherwise fold into AI. |

## Overlap notes

- **Personal vs Opinion:** Run a pass on the 22 Opinion posts. If the majority are also tagged Personal, merging Opinion into Personal reduces graph noise without losing crawl paths (redirect `/tag/opinion/`).
- **AI subtags:** The six AI Foundations posts could gain `AI Foundations`. Agent-focused posts could gain `Agents`. This improves The Map without renaming existing AI posts.

## Inbound link check (before any merge)

Before executing merges, audit:

- External links to `/tag/{slug}/` from bekahhw.com posts and My Work
- RSS/historical URLs
- Search Console top tag landing pages

## Execution order (after approval)

1. Re-tag posts in front matter
2. Regenerate tag pages via `tag_generator.rb` (new slugs appear automatically)
3. Add redirect pages or alias entries for retired slugs so old URLs never 404

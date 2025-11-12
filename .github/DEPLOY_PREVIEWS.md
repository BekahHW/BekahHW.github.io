# Deploy Previews Setup

This repository is configured for automatic deploy previews on pull requests.

## Option 1: Netlify GitHub Integration (Recommended - Already Setup!)

✅ **You've already set this up!**

With the Netlify GitHub integration enabled:
- **Automatic preview builds** for every pull request
- **Preview URLs** posted automatically as PR comments
- **No configuration needed** - it just works!
- **Deploy notifications** in PR status checks

Netlify will automatically:
1. Build your Jekyll site when you open a PR
2. Deploy it to a unique preview URL
3. Comment on the PR with the preview link
4. Update the preview on every commit

### Netlify Configuration

Make sure your Netlify build settings are:
- **Build command:** `bundle exec jekyll build`
- **Publish directory:** `_site`
- **Branch deploys:** All branches enabled for previews

## Option 2: GitHub Actions Workflow (Optional)

A GitHub Actions workflow has been created at `.github/workflows/preview-deploy.yml`.

**You have two choices:**

### Choice A: Remove it (Netlify handles everything)
Since Netlify already does deploy previews, you can remove the workflow:
```bash
rm -rf .github/workflows/preview-deploy.yml
```

### Choice B: Keep it for redundancy
The workflow can:
- Validate builds independently of Netlify
- Upload build artifacts for inspection
- Deploy to Netlify via Actions (requires secrets)

To use Netlify deployment in the workflow, add these secrets in GitHub:
- `NETLIFY_AUTH_TOKEN` - From Netlify > User Settings > Applications
- `NETLIFY_SITE_ID` - From Netlify > Site Settings > General

## Current Status

✅ Netlify GitHub integration active - deploy previews ready to use!
❓ GitHub Actions workflow present but not required

## Testing Deploy Previews

1. Create a pull request from your branch
2. Wait for Netlify to build (usually 1-2 minutes)
3. Check the PR for a comment from Netlify with the preview URL
4. Click the "Deploy Preview" link to view your changes

## Troubleshooting

If previews aren't working:

1. **Check Netlify Dashboard**
   - Go to your site in Netlify
   - Check "Deploys" tab for errors

2. **Verify Build Settings**
   - Ensure Ruby version matches (3.1)
   - Check that all plugins are in Gemfile

3. **Check PR Status**
   - Look for Netlify status checks on the PR
   - Click "Details" to see build logs

4. **Branch Deploy Settings**
   - In Netlify: Site Settings > Build & Deploy > Deploy Contexts
   - Ensure "Deploy Preview" is enabled

## Learn More

- [Netlify Deploy Previews](https://docs.netlify.com/site-deploys/deploy-previews/)
- [GitHub Integration](https://docs.netlify.com/integrations/github/)

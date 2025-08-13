# Working Notes - Obsidian + Jekyll + Vercel Setup

This guide will help you set up a beautiful, interconnected note-taking system using Obsidian for writing, Jekyll for static site generation, and Vercel for deployment.

## 🚀 Quick Start

### 1. Prerequisites

- [Ruby](https://www.ruby-lang.org/en/documentation/installation/) (2.6 or higher)
- [Git](https://git-scm.com/)
- [Obsidian](https://obsidian.md/) (free)
- [Vercel CLI](https://vercel.com/cli) (optional, for local testing)

### 2. Local Development Setup

```bash
# Install Jekyll and dependencies
bundle install

# Start local development server
bundle exec jekyll serve

# Your site will be available at http://localhost:4000
```

### 3. Obsidian Setup

1. **Create a new Obsidian vault** in the `_notes` directory
2. **Install recommended plugins:**
   - Dataview (for dynamic queries)
   - Graph View (for visualizing connections)
   - Tag Wrangler (for tag management)

3. **Note Structure:**
   - Each note should be a `.md` file in the `_notes` directory
   - Use front matter for metadata (see examples below)
   - Use `[[wiki-links]]` for internal linking

### 4. Vercel Deployment

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/working-notes.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect Jekyll and deploy

## 📝 Note Format

### Front Matter Example
```yaml
---
layout: note
title: Your Note Title
last_modified: 2024-01-15
tags: [tag1, tag2, tag3]
---
```

### Content Example
```markdown
This is your note content.

## Section Header

- **Bold text** for emphasis
- Use `[[wiki-links]]` to link to other notes
- Regular markdown formatting works

## See also

[[related-note-1]] for more information.
[[related-note-2]] for additional context.
```

## 🔗 Linking System

### Internal Links
- Use `[[note-title]]` for internal links
- Jekyll will automatically convert these to proper URLs
- Links are case-insensitive and handle spaces

### External Links
- Use regular markdown: `[Link Text](https://example.com)`
- These will open in new tabs

## 🏷️ Tagging System

- Add tags in the front matter: `tags: [productivity, learning, evergreen]`
- Tags are automatically displayed on note pages
- Use consistent tag naming (lowercase, hyphenated)

## 🔍 Search Functionality

The search bar in the top navigation will search through:
- Note titles
- Note content
- Tags
- Links

## 📱 Mobile Responsive

The site is fully responsive and works great on:
- Desktop computers
- Tablets
- Mobile phones

## 🎨 Customization

### Colors and Themes
Edit the CSS variables in `_layouts/note.html`:
```css
:root {
    --accent-primary: #ff6b35;
    --accent-secondary: #f7931e;
    /* ... other variables */
}
```

### Layout
- Modify `_layouts/note.html` for individual note styling
- Modify `index.md` for the home page layout
- Add new layouts in the `_layouts` directory

## 🚀 Deployment Workflow

1. **Write notes in Obsidian**
2. **Save markdown files** to the `_notes` directory
3. **Commit and push** to GitHub
4. **Vercel automatically deploys** your changes

## 📊 Analytics and SEO

- Built-in SEO optimization with Jekyll SEO Tag
- Automatic sitemap generation
- Meta tags for social sharing
- Structured data for search engines

## 🔧 Troubleshooting

### Common Issues

**Jekyll build errors:**
```bash
# Clear Jekyll cache
bundle exec jekyll clean
bundle exec jekyll serve
```

**Vercel deployment fails:**
- Check that `vercel.json` is in the root directory
- Ensure all dependencies are in `Gemfile`
- Check Vercel build logs for specific errors

**Links not working:**
- Ensure note filenames match exactly (case-sensitive)
- Check that front matter `title` matches the filename
- Verify markdown syntax for links

### Getting Help

- Check the [Jekyll documentation](https://jekyllrb.com/docs/)
- Visit the [Vercel documentation](https://vercel.com/docs)
- Review the [Obsidian documentation](https://help.obsidian.md/)

## 🎯 Next Steps

1. **Add your own notes** to the `_notes` directory
2. **Customize the styling** to match your preferences
3. **Set up a custom domain** in Vercel
4. **Add analytics** (Google Analytics, Plausible, etc.)
5. **Enable comments** (Disqus, Utterances, etc.)

## 📚 Resources

- [Obsidian Jekyll Workflow](https://refinedmind.co/obsidian-jekyll-workflow) - Inspiration for this setup
- [Digital Garden Jekyll Template](https://github.com/maximevaillancourt/digital-garden-jekyll-template) - Base template
- [Andy Matuschak's Notes](https://notes.andymatuschak.org/) - Evergreen notes inspiration

---

Happy note-taking! 🌱 
# Vercel Deployment Setup for Working Notes

This guide will help you deploy your Working Notes site to Vercel with automatic deployments from your GitHub repository.

## 🚀 Quick Deployment

### Option 1: Deploy from GitHub (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/working-notes.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with your GitHub account
   - Click "New Project"
   - Import your `working-notes` repository
   - Vercel will automatically detect Jekyll and configure the build
   - Click "Deploy"

### Option 2: Deploy from Local Directory

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

## ⚙️ Configuration

### Vercel Configuration (`vercel.json`)

The `vercel.json` file is already configured for Jekyll:

```json
{
  "buildCommand": "bundle exec jekyll build",
  "outputDirectory": "_site",
  "installCommand": "bundle install",
  "framework": "jekyll",
  "env": {
    "JEKYLL_ENV": "production"
  }
}
```

### Environment Variables

You can set these in your Vercel dashboard:

- `JEKYLL_ENV`: Set to `production` for optimized builds
- `JEKYLL_ENV`: Set to `development` for debugging

## 🔄 Automatic Deployments

### GitHub Integration

1. **Connect your GitHub repository** in Vercel
2. **Enable automatic deployments** for:
   - Push to `main` branch
   - Pull requests (preview deployments)

### Deployment Triggers

Your site will automatically deploy when you:
- Push to the `main` branch
- Create a pull request
- Merge a pull request

## 📝 Workflow

### 1. Write Notes in Obsidian

1. **Open Obsidian** and open your `_notes` folder as a vault
2. **Create new notes** with the proper front matter:
   ```yaml
   ---
   layout: note
   title: Your Note Title
   last_modified: 2024-01-15
   tags: [tag1, tag2, tag3]
   ---
   ```

3. **Use wiki-links** for internal linking: `[[other-note]]`

### 2. Commit and Push

```bash
git add .
git commit -m "Add new note: Your Note Title"
git push origin main
```

### 3. Automatic Deployment

- Vercel detects the push
- Runs `bundle install` to install dependencies
- Runs `bundle exec jekyll build` to build the site
- Deploys the `_site` directory
- Your site is live in seconds!

## 🌐 Custom Domain

### Add Custom Domain

1. **In Vercel Dashboard:**
   - Go to your project
   - Click "Settings" → "Domains"
   - Add your custom domain

2. **Configure DNS:**
   - Add the Vercel nameservers to your domain registrar
   - Or add the required DNS records

### SSL Certificate

- Vercel automatically provides SSL certificates
- HTTPS is enabled by default
- No additional configuration needed

## 📊 Analytics and Monitoring

### Vercel Analytics

1. **Enable Analytics:**
   - Go to your project in Vercel
   - Click "Analytics" tab
   - Enable analytics for your domain

2. **View Metrics:**
   - Page views
   - Unique visitors
   - Performance metrics
   - Core Web Vitals

### Performance Monitoring

- **Automatic performance monitoring**
- **Core Web Vitals tracking**
- **Real-time error tracking**
- **Deployment status monitoring**

## 🔧 Troubleshooting

### Common Issues

**Build Fails:**
```bash
# Check build logs in Vercel dashboard
# Common causes:
# - Missing dependencies in Gemfile
# - Ruby version issues
# - Jekyll configuration errors
```

**Deployment Issues:**
```bash
# Check vercel.json configuration
# Ensure outputDirectory matches Jekyll output
# Verify buildCommand is correct
```

**Local vs Production:**
```bash
# Test locally first:
bundle exec jekyll build
bundle exec jekyll serve

# Then deploy to Vercel
```

### Debugging

1. **Check Vercel Build Logs:**
   - Go to your project in Vercel
   - Click on the latest deployment
   - View build logs for errors

2. **Test Locally:**
   ```bash
   # Install dependencies
   bundle install
   
   # Build locally
   bundle exec jekyll build
   
   # Serve locally
   bundle exec jekyll serve
   ```

3. **Check Jekyll Configuration:**
   - Verify `_config.yml` settings
   - Check front matter in notes
   - Ensure all required files exist

## 🎯 Advanced Configuration

### Multiple Environments

Create different configurations for different environments:

```yaml
# _config.yml
baseurl: ""
url: "https://yourdomain.com"

# _config.development.yml
url: "http://localhost:4000"
```

### Build Optimization

```json
// vercel.json
{
  "buildCommand": "JEKYLL_ENV=production bundle exec jekyll build",
  "outputDirectory": "_site",
  "installCommand": "bundle install --deployment",
  "framework": "jekyll"
}
```

### Caching

Vercel automatically caches:
- Static assets
- Build artifacts
- CDN content

## 📱 Mobile Optimization

Your site is already mobile-optimized with:
- Responsive design
- Touch-friendly navigation
- Optimized loading
- PWA capabilities (can be added)

## 🔍 SEO and Performance

### Built-in SEO Features

- **Jekyll SEO Tag** for meta tags
- **Automatic sitemap generation**
- **Structured data support**
- **Open Graph tags**

### Performance Features

- **Automatic image optimization**
- **CSS/JS minification**
- **Gzip compression**
- **CDN distribution**

## 🚀 Next Steps

1. **Set up your custom domain**
2. **Configure analytics**
3. **Add more notes to your `_notes` folder**
4. **Customize the design**
5. **Set up monitoring and alerts**

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Obsidian Documentation](https://help.obsidian.md/)
- [Working Notes Setup Guide](./SETUP.md)

---

Your Working Notes site is now live and will automatically update whenever you push changes to GitHub! 🎉 
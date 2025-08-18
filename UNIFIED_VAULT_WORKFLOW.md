# 🎯 Unified Vault Workflow - No Working Notes

## **✅ Setup Complete!**

Your Obsidian vault now has everything needed to build and deploy your website:

- ✅ **Build system** (`build.js`, `package.json`)
- ✅ **Dependencies** installed (`npm install`)
- ✅ **Layouts** (`_layouts`, `_includes`)
- ✅ **Git repository** (already set up)
- ✅ **Notes** (`_notes` folder)

## **Your Simple Shell Command:**

**Command Name:** `Build & Deploy Website`

**Working Directory:** `/Users/bianca/Documents/mind`

**Shell Command:**
```bash
npm run build && git add . && git commit -m "Update website - $(date '+%Y-%m-%d %H:%M:%S')" && git push origin main
```

## **What This Does:**
1. **Builds your website** from your `_notes` folder
2. **Commits changes** to your vault's Git repository
3. **Pushes to GitHub** (Vercel will auto-deploy)

## **Your Complete Workflow:**
1. **Write notes** in Obsidian (anywhere in your vault)
2. **Use Git plugin** to save vault changes
3. **Run shell command** to build and deploy website

## **Next Steps:**

### **1. Connect Vercel to Your Vault Repository**
1. Go to Vercel dashboard
2. Import your vault's GitHub repository
3. Set build command: `npm run build`
4. Set output directory: `_site`

### **2. Configure Vercel Settings**
- **Framework Preset:** Other
- **Build Command:** `npm run build`
- **Output Directory:** `_site`
- **Install Command:** `npm install`

### **3. Test Your Setup**
1. Make a change to a note in `_notes`
2. Run your shell command
3. Check your website for changes

## **Benefits:**
- **Single repository** - everything in one place
- **No file copying** - direct from source
- **Simplified workflow** - one command does everything
- **Full version control** - track everything in your vault

## **Optional: Set Hotkey**
- **Settings → Hotkeys**
- Assign hotkey to "Build & Deploy Website"
- Example: `Cmd+Shift+D`

**Your vault is now a complete website publishing system!** 🚀


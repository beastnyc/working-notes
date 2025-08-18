# 🎯 Final Unified Vault Setup - No Working Notes

## **✅ Your Vault is Now Complete!**

Your Obsidian vault now has everything needed to build and deploy your website:

- ✅ **Build system** (`build.js`, `package.json`)
- ✅ **Dependencies** installed (`npm install`)
- ✅ **Layouts** (`_layouts`, `_includes`)
- ✅ **Git repository** (local)
- ✅ **Notes** (`_notes` folder)

## **Next Steps to Complete Setup:**

### **1. Set Up Remote Repository**

You need to connect your vault to a GitHub repository:

```bash
# Create a new repository on GitHub (or use existing)
# Then connect your vault to it:
git remote add origin https://github.com/yourusername/your-vault-repo.git
git push -u origin main
```

### **2. Connect Vercel to Your Vault Repository**

1. **Go to Vercel dashboard**
2. **Import your vault's GitHub repository**
3. **Configure build settings:**
   - **Framework Preset:** Other
   - **Build Command:** `npm run build`
   - **Output Directory:** `_site`
   - **Install Command:** `npm install`

### **3. Your Simple Shell Command**

**Command Name:** `Build & Deploy Website`

**Working Directory:** `/Users/bianca/Documents/mind`

**Shell Command:**
```bash
npm run build && git add . && git commit -m "Update website - $(date '+%Y-%m-%d %H:%M:%S')" && git push origin main
```

## **Your Complete Workflow:**

### **Option A: Two-Step Process**
1. **Write notes** in Obsidian
2. **Use Git plugin** to save vault changes
3. **Run shell command** to build and deploy website

### **Option B: Combined Command**
**Command Name:** `Save & Deploy`

**Shell Command:**
```bash
git add . && git commit -m "Update vault - $(date '+%Y-%m-%d %H:%M:%S')" && git push origin main && npm run build && git add . && git commit -m "Update website - $(date '+%Y-%m-%d %H:%M:%S')" && git push origin main
```

## **Benefits:**
- **Single repository** - everything in one place
- **No file copying** - direct from source
- **Simplified workflow** - one command does everything
- **Full version control** - track everything in your vault
- **Selective publishing** - only `_notes` builds to website

## **Set Up Hotkeys:**
- `Cmd+Shift+S` - Save vault changes (Git plugin)
- `Cmd+Shift+D` - Build & deploy website
- `Cmd+Shift+A` - Save & deploy (combined)

**Your vault is now a complete website publishing system!** 🚀


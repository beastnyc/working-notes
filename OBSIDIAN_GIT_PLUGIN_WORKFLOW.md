# 🎯 Obsidian Git Plugin + Website Publishing Workflow

## **Your Perfect Setup:**

### **Vault Version Control: Obsidian Git Plugin**
✅ **Already installed** - use Obsidian's Git plugin for vault version control
✅ **Integrated UI** - commit, push, pull directly in Obsidian
✅ **Visual interface** - see changes, history, branches
✅ **Hotkeys** - use Obsidian's built-in Git hotkeys

### **Website Publishing: Shell Command**
**Command Name:** `Publish Notes to Website`

**Working Directory:** `/Users/bianca/Documents/mind`

**Shell Command:**
```bash
cp _notes/* "/Users/bianca/Working Notes/_notes/" && cd "/Users/bianca/Working Notes" && npm run build && git add . && git commit -m "Publish notes from vault - $(date '+%Y-%m-%d %H:%M:%S')" && git push origin main
```

## **Your Workflow:**

### **Step 1: Version Control (Obsidian Git Plugin)**
1. **Write notes** in Obsidian
2. **Use Obsidian Git plugin** to commit and push vault changes
   - Click the Git icon in the sidebar
   - Stage changes
   - Commit with message
   - Push to remote

### **Step 2: Publish to Website (Shell Command)**
1. **Run shell command** when ready to publish
2. **Only `_notes` folder** gets published to your website
3. **Vercel auto-deploys** your changes

## **Obsidian Git Plugin Setup:**

### **Configure Git Plugin:**
1. **Settings → Community plugins → Git**
2. **Enable auto-backup** (optional)
3. **Set commit message template**
4. **Configure hotkeys** for Git operations

### **Git Plugin Hotkeys:**
- **Commit all changes**
- **Push to remote**
- **Pull from remote**
- **View Git graph**

## **Benefits of This Approach:**
- **Best of both worlds** - Git plugin for vault, shell for publishing
- **Integrated experience** - Git operations feel native to Obsidian
- **Visual feedback** - see changes, conflicts, history
- **Selective publishing** - only `_notes` goes to website
- **Flexible workflow** - commit often, publish when ready

## **Your Complete Workflow:**
1. **Write notes** in Obsidian
2. **Use Git plugin** to save vault changes
3. **Run shell command** to publish notes to website

**This leverages Obsidian's excellent Git integration while keeping your publishing workflow simple!** 🚀


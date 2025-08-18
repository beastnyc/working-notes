# 🎯 Complete Vault Workflow - Version Control + Publishing

## **Your Current Setup:**
✅ **Obsidian vault is already a Git repository** - perfect for version control
✅ **Working Notes has build system** - perfect for publishing
✅ **Vercel auto-deploys** from Working Notes

## **The Perfect Workflow:**

### **Step 1: Version Control Your Entire Vault**

**Command Name:** `Commit Vault Changes`

**Working Directory:** `/Users/bianca/Documents/mind`

**Shell Command:**
```bash
git add . && git commit -m "Update vault - $(date '+%Y-%m-%d %H:%M:%S')" && git push origin main
```

### **Step 2: Publish to Website**

**Command Name:** `Publish to Website`

**Working Directory:** `/Users/bianca/Documents/mind`

**Shell Command:**
```bash
cp _notes/* "/Users/bianca/Working Notes/_notes/" && cd "/Users/bianca/Working Notes" && npm run build && git add . && git commit -m "Publish from vault - $(date '+%Y-%m-%d %H:%M:%S')" && git push origin main
```

## **Your Complete Workflow:**

### **Option A: Two-Step Process**
1. **Write notes** in Obsidian
2. **Run "Commit Vault Changes"** - saves everything to Git
3. **Run "Publish to Website"** - publishes to your site

### **Option B: Combined Command**
**Command Name:** `Save & Publish`

**Working Directory:** `/Users/bianca/Documents/mind`

**Shell Command:**
```bash
git add . && git commit -m "Update vault - $(date '+%Y-%m-%d %H:%M:%S')" && git push origin main && cp _notes/* "/Users/bianca/Working Notes/_notes/" && cd "/Users/bianca/Working Notes" && npm run build && git add . && git commit -m "Publish from vault - $(date '+%Y-%m-%d %H:%M:%S')" && git push origin main
```

## **Benefits of This Approach:**
- **Full version control** - every change in your vault is tracked
- **Separate concerns** - vault Git vs website Git
- **Flexible publishing** - publish when you want, not every change
- **Complete history** - see how your knowledge evolved over time

## **Set Up Hotkeys:**
1. **Settings → Hotkeys**
2. Assign hotkeys to your commands:
   - `Cmd+Shift+S` - Save vault changes
   - `Cmd+Shift+P` - Publish to website
   - `Cmd+Shift+A` - Save & publish (combined)

## **Test Your Setup:**
1. **Make a change** to any note in Obsidian
2. **Run "Commit Vault Changes"** - check your vault Git history
3. **Run "Publish to Website"** - check your website

**This gives you the best of both worlds: complete version control AND publishing!** 🚀


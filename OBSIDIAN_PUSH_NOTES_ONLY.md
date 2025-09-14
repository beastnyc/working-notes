# 🎯 Push Only _notes Folder from Obsidian

## **Your Perfect Setup:**

Since you already have Git in your vault and it's connected to GitHub, here are the best ways to push only the `_notes` folder:

## **Option 1: Simple Shell Command (Recommended)**

**Command Name:** `Push Notes to Website`

**Working Directory:** `/Users/bianca/Documents/mind`

**Shell Command:**
```bash
cp -r _notes/* "/Users/bianca/Working Notes/_notes/" && cd "/Users/bianca/Working Notes" && npm run build && git add . && git commit -m "Update notes from vault - $(date '+%Y-%m-%d %H:%M:%S')" && git push origin main
```

## **Option 2: Git Subtree Approach**

**Command Name:** `Push Notes Subtree`

**Working Directory:** `/Users/bianca/Documents/mind`

**Shell Command:**
```bash
git subtree push --prefix=_notes origin website --force
```

## **Option 3: Two-Step Process**

### **Step 1: Save Vault Changes**
**Command Name:** `Save Vault`

**Shell Command:**
```bash
git add . && git commit -m "Update vault - $(date '+%Y-%m-%d %H:%M:%S')" && git push origin main
```

### **Step 2: Push Notes to Website**
**Command Name:** `Push Notes Only`

**Shell Command:**
```bash
cp -r _notes/* "/Users/bianca/Working Notes/_notes/" && cd "/Users/bianca/Working Notes" && npm run build && git add . && git commit -m "Update notes" && git push origin main
```

## **Your Workflow:**

### **Option A: One Command**
1. **Write notes** in Obsidian
2. **Run "Push Notes to Website"** - copies and deploys
3. **Changes appear** on your website

### **Option B: Two Commands**
1. **Write notes** in Obsidian
2. **Run "Save Vault"** - saves everything to Git
3. **Run "Push Notes Only"** - publishes to website

## **Benefits:**
- ✅ **Only `_notes` folder** gets published
- ✅ **Full vault version control** - track everything
- ✅ **Clean separation** - private vault vs public website
- ✅ **Simple workflow** - one or two commands

## **Set Up Hotkeys:**
1. **Settings → Hotkeys**
2. Assign hotkeys to your commands:
   - `Cmd+Shift+P` - Push Notes to Website
   - `Cmd+Shift+S` - Save Vault
   - `Cmd+Shift+W` - Push Notes Only

**This gives you the perfect balance of full vault control and selective publishing!** 🚀







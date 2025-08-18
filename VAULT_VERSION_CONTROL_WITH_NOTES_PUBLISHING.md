# 🎯 Vault Version Control + Notes Publishing

## **Your Perfect Workflow:**

### **Step 1: Version Control Your Entire Vault**

**Command Name:** `Save Vault Changes`

**Working Directory:** `/Users/bianca/Documents/mind`

**Shell Command:**
```bash
git add . && git commit -m "Update vault - $(date '+%Y-%m-%d %H:%M:%S')" && git push origin main
```

### **Step 2: Publish Only _notes to Website**

**Command Name:** `Publish Notes to Website`

**Working Directory:** `/Users/bianca/Documents/mind`

**Shell Command:**
```bash
cp _notes/* "/Users/bianca/Working Notes/_notes/" && cd "/Users/bianca/Working Notes" && npm run build && git add . && git commit -m "Publish notes from vault - $(date '+%Y-%m-%d %H:%M:%S')" && git push origin main
```

## **What This Does:**

### **Vault Version Control:**
- **Saves ALL changes** in your vault to Git
- **Tracks everything** - notes, templates, daily entries, etc.
- **Complete history** of your knowledge work
- **Private** - only you see the full vault

### **Website Publishing:**
- **Only publishes `_notes` folder** to your website
- **Public** - only your curated notes are visible
- **Clean separation** - private vault vs public website

## **Your Workflow:**

### **Option A: Two-Step Process**
1. **Write notes** in Obsidian (anywhere in your vault)
2. **Run "Save Vault Changes"** - saves everything to Git
3. **Run "Publish Notes to Website"** - publishes only `_notes` to your site

### **Option B: Combined Command**
**Command Name:** `Save & Publish Notes`

**Working Directory:** `/Users/bianca/Documents/mind`

**Shell Command:**
```bash
git add . && git commit -m "Update vault - $(date '+%Y-%m-%d %H:%M:%S')" && git push origin main && cp _notes/* "/Users/bianca/Working Notes/_notes/" && cd "/Users/bianca/Working Notes" && npm run build && git add . && git commit -m "Publish notes from vault - $(date '+%Y-%m-%d %H:%M:%S')" && git push origin main
```

## **Benefits:**
- **Full vault version control** - track everything
- **Selective publishing** - only `_notes` goes public
- **Privacy** - keep personal notes private
- **Flexibility** - publish when ready

## **Set Up Hotkeys:**
- `Cmd+Shift+S` - Save vault changes
- `Cmd+Shift+P` - Publish notes to website
- `Cmd+Shift+A` - Save & publish notes (combined)

**This gives you complete version control of your vault while only publishing your curated notes to the website!** 🚀


# 🎯 Two-Step Workflow: Vault Control + Selective Publishing

## **Your Perfect Setup:**

### **Step 1: Save Vault Changes**
**Command Name:** `Save Vault`

**Working Directory:** `/Users/bianca/Documents/mind`

**Shell Command:**
```bash
git add . && git commit -m "Update vault - $(date '+%Y-%m-%d %H:%M:%S')" && git push origin main
```

### **Step 2: Push Notes to Website**
**Command Name:** `Push Notes Only`

**Working Directory:** `/Users/bianca/Documents/mind`

**Shell Command:**
```bash
cp -r _notes/* "/Users/bianca/Working Notes/_notes/" && cd "/Users/bianca/Working Notes" && npm run build && git add . && git commit -m "Update notes from vault - $(date '+%Y-%m-%d %H:%M:%S')" && git push origin main
```

## **How to Set This Up in Obsidian:**

### **1. Install Shell Commands Plugin**
1. Open Obsidian
2. Go to **Settings** → **Community plugins**
3. Turn off **Safe mode**
4. Click **Browse** and search for "Shell commands"
5. Install and enable the plugin

### **2. Add the Two Commands**

#### **Command 1: Save Vault**
1. Go to **Settings** → **Shell commands**
2. Click **Add shell command**
3. Configure:
   - **Command name:** `Save Vault`
   - **Working directory:** `/Users/bianca/Documents/mind`
   - **Shell command:** Use the Step 1 command above

#### **Command 2: Push Notes Only**
1. Click **Add shell command** again
2. Configure:
   - **Command name:** `Push Notes Only`
   - **Working directory:** `/Users/bianca/Documents/mind`
   - **Shell command:** Use the Step 2 command above

### **3. Set Up Hotkeys**
1. Go to **Settings** → **Hotkeys**
2. Search for "Shell commands"
3. Assign hotkeys:
   - `Cmd+Shift+S` - Save Vault
   - `Cmd+Shift+P` - Push Notes Only

## **Your Complete Workflow:**

### **Daily Workflow:**
1. **Write notes** in Obsidian (anywhere in your vault)
2. **Press `Cmd+Shift+S`** - saves everything to Git
3. **Press `Cmd+Shift+P`** - publishes only `_notes` to your website

### **When to Use Each:**
- **Save Vault:** Use frequently to backup your work
- **Push Notes Only:** Use when ready to publish changes

## **Benefits of This Approach:**
- ✅ **Full vault version control** - track everything
- ✅ **Selective publishing** - only `_notes` goes public
- ✅ **Clean separation** - private vault vs public website
- ✅ **Flexible workflow** - save often, publish when ready
- ✅ **Two simple commands** - easy to remember and use

## **Test Your Setup:**

### **Test 1: Save Vault**
1. Make a small change to any note in your vault
2. Press `Cmd+Shift+S`
3. Check that it commits and pushes to GitHub

### **Test 2: Push Notes Only**
1. Make a change to a note in `_notes`
2. Press `Cmd+Shift+P`
3. Check your website for the changes

## **Alternative: Combined Command**

If you want to do both steps at once:

**Command Name:** `Save & Publish`

**Shell Command:**
```bash
git add . && git commit -m "Update vault - $(date '+%Y-%m-%d %H:%M:%S')" && git push origin main && cp -r _notes/* "/Users/bianca/Working Notes/_notes/" && cd "/Users/bianca/Working Notes" && npm run build && git add . && git commit -m "Update notes from vault - $(date '+%Y-%m-%d %H:%M:%S')" && git push origin main
```

**This gives you the perfect balance of control and simplicity!** 🚀







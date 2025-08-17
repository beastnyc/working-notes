# 🔧 Fix for Code 127 Error in Obsidian Shell Commands

## **The Problem:**
Code 127 = "Command not found" - Obsidian can't find the script or commands.

## **The Solution:**

### **Option 1: Use the Fixed Script (Recommended)**

In Obsidian Shell Commands plugin, use this exact command:

```bash
/bin/bash "/Users/bianca/Working Notes/push-notes-fixed.sh"
```

### **Option 2: Direct Command (Alternative)**

If the script doesn't work, use this direct command:

```bash
cd "/Users/bianca/Working Notes" && /usr/local/bin/npm run build && /usr/bin/git add . && /usr/bin/git commit -m "Update notes from Obsidian" && /usr/bin/git push origin main
```

## **Step-by-Step Fix:**

1. **Open Obsidian**
2. **Settings → Shell commands**
3. **Edit your existing command** or add new one
4. **Replace the command** with one of the options above
5. **Test it**

## **Why This Fixes Code 127:**

- **Uses absolute paths** to bash (`/bin/bash`)
- **Uses absolute paths** to all commands (`/usr/local/bin/npm`, `/usr/bin/git`)
- **Avoids PATH issues** that Obsidian has

## **Test Your Fix:**

1. Make a small change to a note
2. Run the shell command
3. Check Obsidian's console for output
4. Verify changes appear on your website

## **If Still Getting Code 127:**

Try this diagnostic command in Obsidian:
```bash
/bin/bash -c "echo 'Test successful' && pwd && which npm && which git"
```

This will help identify what's available in Obsidian's environment.

**The fixed script should resolve your code 127 error!** ✅

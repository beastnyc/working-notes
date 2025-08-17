# 🚀 Shell Command Plugin Setup - Working Notes

## **Quick Setup (5 minutes)**

### **Step 1: Install Plugin**
1. Open Obsidian
2. Settings → Community plugins → Browse
3. Search "Shell commands" → Install → Enable

### **Step 2: Configure Command**
1. Settings → Shell commands → Add shell command
2. **Command name:** `Push Working Notes`
3. **Shell command:** 
   ```bash
   "/Users/bianca/Working Notes/push-notes.sh"
   ```
4. **Working directory:** Leave empty

### **Step 3: Set Hotkey (Optional)**
1. Settings → Hotkeys
2. Search "Shell commands"
3. Find "Push Working Notes"
4. Assign hotkey (e.g., `Cmd+Shift+P`)

## **✅ That's it!**

Now when you:
1. **Write notes** in Obsidian
2. **Press your hotkey** (or run command)
3. **Changes automatically push** to your website

## **🔧 If it doesn't work:**

### **Test in Terminal First:**
```bash
cd "/Users/bianca/Working Notes"
./push-notes.sh
```

### **Common Fixes:**
- **Permission error:** `chmod +x "/Users/bianca/Working Notes/push-notes.sh"`
- **Path issues:** Use absolute paths in the command
- **Git issues:** Check your git configuration

## **📝 What the command does:**
1. Builds your site
2. Commits changes with timestamp
3. Pushes to GitHub
4. Vercel auto-deploys

## **🎯 Your workflow:**
1. Write in Obsidian
2. Press hotkey
3. Wait for Vercel deployment
4. Check your website!

**The shell command plugin is now properly configured!** 🎉

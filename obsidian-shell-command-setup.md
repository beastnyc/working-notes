# Obsidian Shell Command Plugin Setup

## 🎯 **Complete Setup Guide for Shell Commands Plugin**

### **Step 1: Install Shell Commands Plugin**
1. Open Obsidian
2. Go to **Settings** → **Community plugins**
3. Turn off **Safe mode**
4. Click **Browse** and search for "Shell commands"
5. Install and enable the plugin

### **Step 2: Configure the Shell Command**

1. Go to **Settings** → **Shell commands**
2. Click **Add shell command**
3. Configure as follows:

**Command name:** `Push Working Notes`
**Shell command:**
```bash
cd "/Users/bianca/Working Notes" && node sync-from-obsidian.js
```

**Working directory:** Leave empty (will use the command's directory)

### **Step 3: Alternative Commands (Choose One)**

#### **Option A: Full Sync and Push (Recommended)**
```bash
cd "/Users/bianca/Working Notes" && node sync-from-obsidian.js
```

#### **Option B: Quick Build and Push**
```bash
cd "/Users/bianca/Working Notes" && npm run build && git add . && git commit -m "Update notes from Obsidian" && git push origin main
```

#### **Option C: Manual Sync Only**
```bash
cd "/Users/bianca/Working Notes" && node sync-from-obsidian.js
```

### **Step 4: Set Up Hotkey (Optional)**

1. Go to **Settings** → **Hotkeys**
2. Search for "Shell commands"
3. Find your "Push Working Notes" command
4. Assign a hotkey (e.g., `Ctrl+Shift+P` or `Cmd+Shift+P`)

### **Step 5: Test the Setup**

1. Make a small change to a note in Obsidian
2. Press your hotkey or run the shell command
3. Check the output in Obsidian's console
4. Verify the changes appear on your website

## 🔧 **Troubleshooting Common Issues**

### **Issue 1: "Command not found"**
**Solution:** Use absolute paths
```bash
/usr/local/bin/node "/Users/bianca/Working Notes/sync-from-obsidian.js"
```

### **Issue 2: "Permission denied"**
**Solution:** Make script executable
```bash
chmod +x "/Users/bianca/Working Notes/sync-from-obsidian.js"
```

### **Issue 3: "Git not found"**
**Solution:** Use full git path
```bash
cd "/Users/bianca/Working Notes" && /usr/bin/git add . && /usr/bin/git commit -m "Update" && /usr/bin/git push origin main
```

### **Issue 4: "Working directory issues"**
**Solution:** Always use absolute paths in the command

## 📝 **Updated Sync Script Configuration**

Make sure your `sync-from-obsidian.js` has the correct path:

```javascript
const OBSIDIAN_VAULT_PATH = '/Users/bianca/path/to/your/obsidian/vault/_notes';
```

Replace with your actual Obsidian vault path.

## 🚀 **Workflow with Shell Commands**

1. **Write notes** in Obsidian
2. **Press hotkey** (e.g., `Cmd+Shift+P`)
3. **Check console** for output
4. **Wait for Vercel deployment**

## ⚙️ **Advanced Configuration**

### **Multiple Commands Setup:**

1. **Quick Sync:** `cd "/Users/bianca/Working Notes" && npm run build`
2. **Full Deploy:** `cd "/Users/bianca/Working Notes" && node sync-from-obsidian.js`
3. **Git Status:** `cd "/Users/bianca/Working Notes" && git status`

### **Conditional Commands:**
You can set up different commands for different scenarios:
- **Development:** Just build locally
- **Staging:** Build and commit
- **Production:** Full sync and push

## 🎯 **Best Practices**

1. **Always use absolute paths** in shell commands
2. **Test commands in terminal first** before adding to Obsidian
3. **Check console output** for errors
4. **Use descriptive command names**
5. **Set up hotkeys** for quick access

## 🔍 **Debugging Commands**

If a command fails:
1. Check Obsidian's console (View → Toggle Developer Console)
2. Test the command in terminal
3. Verify all paths are correct
4. Ensure all dependencies are installed

## ✅ **Verification Checklist**

- [ ] Shell Commands plugin installed
- [ ] Command configured with correct path
- [ ] Script is executable (`chmod +x`)
- [ ] Hotkey assigned (optional)
- [ ] Test command works in terminal
- [ ] Test command works in Obsidian
- [ ] Changes appear on website after push

Your shell command plugin should now work perfectly for pushing changes! 🚀

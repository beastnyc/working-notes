# Obsidian as Source Setup

## 🎯 **Your Obsidian Vault as the Source of Truth**

### **Step 1: Update the sync script**
Edit `sync-from-obsidian.js` and update this line:
```javascript
const OBSIDIAN_VAULT_PATH = '/path/to/your/obsidian/vault/_notes'; // UPDATE THIS
```

Replace `/path/to/your/obsidian/vault/_notes` with the actual path to your `_notes` folder in your Obsidian vault.

### **Step 2: Make the script executable**
```bash
chmod +x sync-from-obsidian.js
```

## 🚀 **Triggering Pushes from Obsidian**

### **Option 1: Terminal Command (Recommended)**
1. **Write notes** in your Obsidian vault
2. **Open terminal** in your Working Notes directory
3. **Run the sync script**:
   ```bash
   node sync-from-obsidian.js
   ```
4. **Follow the prompts** to push to GitHub

### **Option 2: Obsidian Git Plugin**
1. **Install "Obsidian Git" plugin** in Obsidian
2. **Configure it** to work with your Working Notes repository
3. **Use Obsidian's Git panel** to commit and push

### **Option 3: Custom Hotkey in Obsidian**
1. **Install "Shell commands" plugin** in Obsidian
2. **Add a shell command** that runs the sync script
3. **Assign a hotkey** to trigger the sync

### **Option 4: File Watcher (Advanced)**
Set up a file watcher that automatically syncs when you save notes in Obsidian.

## 📝 **Workflow**

### **Daily Workflow:**
1. **Write notes** in your Obsidian vault (`_notes` folder)
2. **Use wiki-links** like `[[evergreen-notes]]`
3. **When ready to publish**, run the sync script
4. **Vercel automatically deploys** your changes

### **Quick Commands:**
```bash
# Sync and build (no push)
node sync-from-obsidian.js

# Manual sync (if you prefer)
cp -r "/path/to/obsidian/vault/_notes" "/Users/bianca/Working Notes/_notes"
npm run build
git add .
git commit -m "Update notes from Obsidian"
git push origin main
```

## ⚙️ **Obsidian Plugin Recommendations**

### **Essential Plugins:**
- **Obsidian Git** - Git integration
- **Graph View** - Visualize connections
- **Tag Wrangler** - Tag management
- **Dataview** - Dynamic queries

### **Optional Plugins:**
- **Shell commands** - Run external commands
- **Calendar** - Note organization
- **Templates** - Quick note creation

## 🎯 **Benefits of This Setup**

✅ **Obsidian as source** - Write in your preferred environment
✅ **Automatic sync** - One command to update everything
✅ **Git integration** - Version control for your notes
✅ **Vercel deployment** - Automatic website updates
✅ **Wiki-links** - Native Obsidian linking
✅ **Graph view** - Visualize your knowledge network

## 🚀 **Next Steps**

1. **Update the path** in `sync-from-obsidian.js`
2. **Test the sync** with a small change
3. **Set up your preferred trigger method**
4. **Start writing notes** in Obsidian!

Your Working Notes will now be powered by your Obsidian vault! 🌱 
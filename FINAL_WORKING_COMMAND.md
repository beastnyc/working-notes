# ✅ FINAL WORKING COMMAND - Obsidian Shell Commands

## **Your Working Setup:**

**Command Name:** `Push Working Notes`

**Working Directory:** (leave empty)

**Shell Command:**
```bash
/bin/bash -c "cd '/Users/bianca/Working Notes' && /usr/local/bin/node sync-from-obsidian.js"
```

## **What This Does:**
1. **Syncs your Obsidian notes** from `/Users/bianca/Documents/mind/_notes`
2. **Builds the site** with the updated notes
3. **Prompts for commit message** (you can just press Enter for default)
4. **Commits and pushes** to GitHub
5. **Vercel auto-deploys** your changes

## **Your Workflow:**
1. **Write notes** in Obsidian (`/Users/bianca/Documents/mind/_notes`)
2. **Run shell command** (or press hotkey)
3. **Changes automatically sync and deploy** to your website

## **Test It:**
1. **Make a change** to a note in Obsidian
2. **Run the shell command**
3. **Check your website** - changes should appear!

## **Optional: Set Hotkey**
1. **Settings → Hotkeys**
2. Search "Shell commands"
3. Find "Push Working Notes"
4. Assign hotkey (like `Cmd+Shift+P`)

## **Why This Works:**
- **Syncs Obsidian notes first** - so your changes are included
- **Builds site with updated notes** - generates the website
- **Pushes to GitHub** - version control
- **Vercel auto-deploys** - live website updates

**Your shell command plugin is now fully working and will sync your Obsidian notes!** 🚀

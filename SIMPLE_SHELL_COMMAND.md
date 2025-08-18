# 🔧 Simple Shell Command Solution

## **The Problem:**
Obsidian can't find npm or the directory when running the sync script.

## **Solution: Direct Shell Command (No Script Files)**

### **Use This Command in Obsidian:**

**Command Name:** `Push Working Notes`

**Working Directory:** (leave empty)

**Shell Command:**
```bash
/bin/bash -c "cd '/Users/bianca/Working Notes' && cp -r '/Users/bianca/Documents/mind/_notes'/* '_notes/' && /usr/local/bin/npm run build && /usr/bin/git add . && /usr/bin/git commit -m 'Update notes from Obsidian' && /usr/bin/git push origin main"
```

## **What This Does:**
1. **Copies Obsidian notes** to Working Notes directory
2. **Builds the site** with npm
3. **Commits and pushes** to GitHub
4. **Vercel auto-deploys** your changes

## **Alternative (Even Simpler):**

**Shell Command:**
```bash
/bin/bash -c "cd '/Users/bianca/Working Notes' && rsync -av '/Users/bianca/Documents/mind/_notes/' '_notes/' && /usr/local/bin/npm run build && /usr/bin/git add . && /usr/bin/git commit -m 'Update notes' && /usr/bin/git push origin main"
```

## **Test Command (Try First):**
```bash
/bin/bash -c "cd '/Users/bianca/Working Notes' && echo 'Directory changed successfully' && pwd"
```

## **Why This Works:**
- **No Node.js scripts** - pure shell commands
- **Direct file copying** - simple and reliable
- **Full paths** - no PATH issues
- **One command** - everything in one go

**Try the test command first, then use the full command!** 🚀

# Atom Editor Setup for Working Notes

This guide shows how to use Atom editor as an alternative to Obsidian for your Working Notes workflow.

## 🚀 Quick Setup

### 1. Install Atom
- Download from [atom.io](https://atom.io)
- Install on your system

### 2. Open Your Project
```bash
# In Atom, go to File > Add Project Folder
# Select your "Working Notes" directory
```

### 3. Install Recommended Packages
In Atom, go to Settings > Install and add these packages:

#### Essential Packages
- **markdown-preview-plus**: Enhanced markdown preview
- **markdown-writer**: Better markdown editing
- **git-plus**: Git integration
- **file-icons**: Better file icons
- **minimap**: Code overview
- **autocomplete-plus**: Better autocomplete

#### Working Notes Specific
- **language-markdown**: Better markdown syntax highlighting
- **markdown-table-editor**: Easy table editing
- **markdown-scroll-sync**: Sync preview with editor

### 4. Configure Git Integration
```bash
# In Atom, install git-plus package
# Then use Cmd+Shift+H (or Ctrl+Shift+H on Windows/Linux) to open Git panel
```

## 📝 Workflow with Atom

### 1. Create New Notes
- Right-click on `_notes` folder in Atom
- Select "New File"
- Name it with `.md` extension (e.g., `my-new-note.md`)

### 2. Add Front Matter
```yaml
---
layout: note
title: Your Note Title
last_modified: 2024-01-15
tags: [tag1, tag2, tag3]
---
```

### 3. Write Content
- Use markdown syntax
- Use `[[wiki-links]]` for internal linking
- Preview with `Ctrl+Shift+M` (or Cmd+Shift+M on Mac)

### 4. Commit and Push
```bash
# In Atom's Git panel:
# 1. Stage your changes
# 2. Write commit message
# 3. Commit
# 4. Push to origin
```

## ⚙️ Atom Configuration

### Keybindings
Add to your `keymap.cson`:
```cson
'atom-text-editor[data-grammar="source gfm"]':
  'ctrl-shift-m': 'markdown-preview-plus:toggle'
  'ctrl-shift-h': 'git-plus:menu'
```

### Settings
In Atom settings:
- **Soft Wrap**: Enable for better markdown reading
- **Show Invisibles**: Enable to see whitespace
- **Tab Length**: Set to 2 for markdown

## 🔄 Git Workflow in Atom

### Using Git Plus Package
1. **Stage Changes**: `Ctrl+Shift+H` → Stage All
2. **Commit**: Write message and commit
3. **Push**: Push to origin/main

### Using Built-in Git
1. **Git Panel**: `Ctrl+Shift+G`
2. **Stage files** by clicking the + button
3. **Commit** with message
4. **Push** to remote

## 📊 Comparison: Atom vs Obsidian

| Feature | Atom | Obsidian |
|---------|------|----------|
| **Markdown Editing** | ✅ Excellent | ✅ Excellent |
| **Git Integration** | ✅ Built-in | ✅ Via plugin |
| **Wiki-links** | ⚠️ Manual | ✅ Native |
| **Graph View** | ❌ No | ✅ Built-in |
| **Plugins** | ✅ Extensive | ✅ Growing |
| **Performance** | ⚠️ Slower | ✅ Fast |
| **Learning Curve** | ⚠️ Steeper | ✅ Easier |

## 🎯 Recommendation

For your Working Notes setup, I recommend:

### Use **Obsidian** if you want:
- Native wiki-link support
- Beautiful graph view
- Faster performance
- Simpler learning curve
- Built for note-taking

### Use **Atom** if you want:
- More powerful text editing
- Extensive plugin ecosystem
- Better Git integration
- Familiar IDE-like interface
- More customization options

## 🚀 Quick Start Commands

### Atom Commands
```bash
# Open project in Atom
atom .

# Or from terminal
code .  # if you have VS Code
```

### Git Commands (if not using Atom's Git panel)
```bash
git add .
git commit -m "Add new note: Your Note Title"
git push origin main
```

## 📚 Next Steps

1. **Choose your editor** (Obsidian or Atom)
2. **Set up the workflow** as described above
3. **Start writing notes** in the `_notes` folder
4. **Deploy to Vercel** for automatic publishing

Both editors will work perfectly with your Jekyll + Vercel setup! 🌱 
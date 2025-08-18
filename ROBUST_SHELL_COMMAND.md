# 🔧 Robust Shell Command - Fix for 127 Error

## **The Problem:**
"no file or directory 127" - One of the commands in the chain isn't found.

## **Solution: Simplified Command with Error Handling**

### **Try This Command:**

**Command Name:** `Push Working Notes`

**Working Directory:** (leave empty)

**Shell Command:**
```bash
/bin/bash -c "cd '/Users/bianca/Working Notes' && echo 'Directory changed' && ls -la '_notes/' && echo 'Copying files...' && cp '/Users/bianca/Documents/mind/_notes/'* '_notes/' 2>/dev/null && echo 'Building site...' && /usr/local/bin/npm run build && echo 'Adding to git...' && /usr/bin/git add . && echo 'Committing...' && /usr/bin/git commit -m 'Update notes' && echo 'Pushing...' && /usr/bin/git push origin main && echo 'Done!'"
```

## **Alternative: Step-by-Step Commands**

### **Command 1: Test Directory**
```bash
/bin/bash -c "cd '/Users/bianca/Working Notes' && pwd && ls -la"
```

### **Command 2: Test Copy**
```bash
/bin/bash -c "cd '/Users/bianca/Working Notes' && cp '/Users/bianca/Documents/mind/_notes/'* '_notes/' && echo 'Copy successful'"
```

### **Command 3: Test Build**
```bash
/bin/bash -c "cd '/Users/bianca/Working Notes' && /usr/local/bin/npm run build && echo 'Build successful'"
```

## **Even Simpler: Manual Copy First**

### **Step 1: Copy Command**
```bash
/bin/bash -c "cp -r '/Users/bianca/Documents/mind/_notes/'* '/Users/bianca/Working Notes/_notes/' && echo 'Files copied'"
```

### **Step 2: Build and Push Command**
```bash
/bin/bash -c "cd '/Users/bianca/Working Notes' && /usr/local/bin/npm run build && /usr/bin/git add . && /usr/bin/git commit -m 'Update' && /usr/bin/git push origin main"
```

## **Debugging: Check What's Available**

Try this diagnostic command:
```bash
/bin/bash -c "echo 'Bash version:' && /bin/bash --version && echo 'NPM location:' && which npm && echo 'Git location:' && which git && echo 'Current directory:' && pwd"
```

## **Most Likely Working Command:**

```bash
/bin/bash -c "cd '/Users/bianca/Working Notes' && cp '/Users/bianca/Documents/mind/_notes/'* '_notes/' && /usr/local/bin/npm run build && /usr/bin/git add . && /usr/bin/git commit -m 'Update' && /usr/bin/git push origin main"
```

**Try the diagnostic command first to see what's available!** 🔍

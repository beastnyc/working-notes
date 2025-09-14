#!/bin/bash

# Fixed script for Obsidian Shell Commands plugin
# This version uses absolute paths to avoid "command not found" errors

echo "🚀 Pushing Working Notes changes..."

# Change to Working Notes directory (absolute path)
cd "/Users/bianca/Working Notes"

# Build the site
echo "🔨 Building site..."
/usr/local/bin/npm run build

# Add all changes
echo "📝 Adding changes to git..."
/usr/bin/git add .

# Commit with timestamp
COMMIT_MSG="Update notes from Obsidian - $(date '+%Y-%m-%d %H:%M:%S')"
echo "💾 Committing: $COMMIT_MSG"
/usr/bin/git commit -m "$COMMIT_MSG"

# Push to GitHub
echo "🌐 Pushing to GitHub..."
/usr/bin/git push origin main

echo "✅ Successfully pushed changes!"
echo "🌐 Vercel will automatically deploy your changes"

#!/bin/bash

# Robust script for Obsidian Shell Commands plugin
# This version explicitly uses /bin/bash and avoids env issues

# Set PATH explicitly to ensure commands are found
export PATH="/usr/local/bin:/usr/bin:/bin:$PATH"

echo "🚀 Pushing Working Notes changes..."

# Change to Working Notes directory (absolute path)
cd "/Users/bianca/Working Notes"

# Build the site
echo "🔨 Building site..."
npm run build

# Add all changes
echo "📝 Adding changes to git..."
git add .

# Commit with timestamp
COMMIT_MSG="Update notes from Obsidian - $(date '+%Y-%m-%d %H:%M:%S')"
echo "💾 Committing: $COMMIT_MSG"
git commit -m "$COMMIT_MSG"

# Push to GitHub
echo "🌐 Pushing to GitHub..."
git push origin main

echo "✅ Successfully pushed changes!"
echo "🌐 Vercel will automatically deploy your changes"

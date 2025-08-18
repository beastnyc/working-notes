#!/bin/bash

# Simple script for Obsidian Shell Commands plugin
# This script syncs notes from your mind vault and deploys to Vercel

echo "🔄 Starting note sync and deployment..."

# Change to the Working Notes directory
cd "/Users/bianca/Working Notes"

# Run the sync script
node _notes/sync-from-obsidian.js

echo "✅ Sync and deployment complete!"

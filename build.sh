#!/bin/bash

# Build script for Working Notes
echo "🔨 Building Working Notes site..."

# Change to _notes directory
cd _notes

# Check if Node.js is available
if command -v node &> /dev/null; then
    echo "✅ Node.js found, using npm build"
    npm install
    npm run build
else
    echo "⚠️  Node.js not found, using direct build"
    # Direct build without npm
    node build.js
fi

echo "✅ Build complete!"

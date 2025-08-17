#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration - UPDATE THESE PATHS
const OBSIDIAN_VAULT_PATH = '/path/to/your/obsidian/vault/_notes'; // UPDATE THIS
const WORKING_NOTES_PATH = path.join(__dirname, '_notes');
const GITHUB_REPO_PATH = __dirname;

console.log('🔄 Syncing notes from Obsidian vault...');

// Function to copy directory recursively
function copyDirectory(source, destination) {
    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
    }

    const files = fs.readdirSync(source);
    
    files.forEach(file => {
        const sourcePath = path.join(source, file);
        const destPath = path.join(destination, file);
        
        if (fs.statSync(sourcePath).isDirectory()) {
            copyDirectory(sourcePath, destPath);
        } else {
            fs.copyFileSync(sourcePath, destPath);
            console.log(`📄 Copied: ${file}`);
        }
    });
}

// Function to build the site
function buildSite() {
    console.log('🔨 Building site...');
    try {
        execSync('npm run build', { cwd: GITHUB_REPO_PATH, stdio: 'inherit' });
        console.log('✅ Site built successfully');
    } catch (error) {
        console.error('❌ Error building site:', error.message);
        process.exit(1);
    }
}

// Function to commit and push to GitHub
function pushToGitHub(commitMessage) {
    console.log('🚀 Pushing to GitHub...');
    try {
        // Change to the Working Notes directory
        process.chdir(GITHUB_REPO_PATH);
        
        // Add all changes
        execSync('git add .', { stdio: 'inherit' });
        
        // Commit with the provided message
        execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
        
        // Push to GitHub
        execSync('git push origin main', { stdio: 'inherit' });
        
        console.log('✅ Successfully pushed to GitHub!');
        console.log('🌐 Vercel will automatically deploy your changes');
        
    } catch (error) {
        console.error('❌ Error pushing to GitHub:', error.message);
        process.exit(1);
    }
}

// Main sync function
function syncNotes() {
    try {
        // Check if Obsidian vault path exists
        if (!fs.existsSync(OBSIDIAN_VAULT_PATH)) {
            console.error(`❌ Obsidian vault path not found: ${OBSIDIAN_VAULT_PATH}`);
            console.log('Please update the OBSIDIAN_VAULT_PATH in this script');
            process.exit(1);
        }

        // Clear the working notes directory
        if (fs.existsSync(WORKING_NOTES_PATH)) {
            fs.rmSync(WORKING_NOTES_PATH, { recursive: true, force: true });
        }

        // Copy notes from Obsidian vault
        copyDirectory(OBSIDIAN_VAULT_PATH, WORKING_NOTES_PATH);
        console.log('✅ Notes synced from Obsidian vault');

        // Build the site
        buildSite();

        // Ask if user wants to push to GitHub
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('🚀 Push to GitHub? (y/n): ', (answer) => {
            if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
                rl.question('📝 Commit message: ', (commitMessage) => {
                    pushToGitHub(commitMessage || 'Update notes from Obsidian');
                    rl.close();
                });
            } else {
                console.log('📝 Notes synced and site built. Push manually when ready.');
                rl.close();
            }
        });

    } catch (error) {
        console.error('❌ Error syncing notes:', error.message);
        process.exit(1);
    }
}

// Run the sync
syncNotes(); 
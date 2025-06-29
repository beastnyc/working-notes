#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, resolve);
    });
}

async function addNote() {
    console.log('📝 Adding a new note to your Working Notes system\n');
    
    // Get note details
    const title = await question('Note title: ');
    const noteId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    
    console.log(`\nNote ID will be: ${noteId}`);
    
    const lastModified = await question('Last modified (YYYY-MM-DD) [default: today]: ') || 
                        new Date().toISOString().split('T')[0];
    
    const tagsInput = await question('Tags (comma-separated): ');
    const intersections = tagsInput ? tagsInput.split(',').map(tag => tag.trim()) : [];
    
    console.log('\nEnter your note content (press Enter twice to finish):');
    const contentLines = [];
    
    while (true) {
        const line = await question('');
        if (line === '' && contentLines.length > 0 && contentLines[contentLines.length - 1] === '') {
            contentLines.pop(); // Remove the last empty line
            break;
        }
        contentLines.push(line);
    }
    
    const content = contentLines.join('\n');
    
    const backlinksInput = await question('Notes that reference this (comma-separated): ');
    const backlinks = backlinksInput ? backlinksInput.split(',').map(link => link.trim()) : [];
    
    const linkedNotesInput = await question('Notes this references (comma-separated): ');
    const linkedNotes = linkedNotesInput ? linkedNotesInput.split(',').map(link => link.trim()) : [];
    
    // Create the note object
    const newNote = {
        title,
        lastModified,
        intersections,
        content: content.replace(/\n/g, '\n                    '), // Indent for HTML
        backlinks,
        linkedNotes
    };
    
    // Read the current index.html
    const htmlContent = fs.readFileSync('index.html', 'utf8');
    
    // Find the notes object and add the new note
    const notesRegex = /const notes = \{([\s\S]*?)\};/;
    const match = htmlContent.match(notesRegex);
    
    if (!match) {
        console.error('Could not find notes object in index.html');
        return;
    }
    
    const notesContent = match[1];
    const newNoteString = `
            '${noteId}': {
                title: '${title}',
                lastModified: '${lastModified}',
                intersections: [${intersections.map(tag => `'${tag}'`).join(', ')}],
                content: \`
                    ${content.replace(/\n/g, '\n                    ')}
                \`,
                backlinks: [${backlinks.map(link => `'${link}'`).join(', ')}],
                linkedNotes: [${linkedNotes.map(link => `'${link}'`).join(', ')}]
            },`;
    
    // Insert the new note at the beginning of the notes object
    const updatedNotesContent = notesContent.replace(/\n        };/, `${newNoteString}\n        };`);
    const updatedHtmlContent = htmlContent.replace(notesRegex, `const notes = {${updatedNotesContent}};`);
    
    // Write the updated file
    fs.writeFileSync('index.html', updatedHtmlContent);
    
    console.log('\n✅ Note added successfully!');
    console.log(`📄 Note ID: ${noteId}`);
    console.log(`🔗 You can now link to this note using: data-note="${noteId}"`);
    
    rl.close();
}

addNote().catch(console.error); 
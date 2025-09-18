#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const frontMatter = require('front-matter');

// Configure marked for better rendering
marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true
});

// Convert Obsidian image embeds and normalize image paths
function convertImages(text) {
  // ![[file.png]] or ![[file.png|Alt text]]
  text = text.replace(/!\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (m, file, alt) => {
    const filename = file.trim();
    const altText = (alt || filename).trim();
    return `<img src="/attachments/${filename}" alt="${altText}">`;
  });
  // Standard Markdown image paths pointing to Attachments/... -> /attachments/...
  text = text.replace(/(!\[[^\]]*\]\()\.?(?:\.\/)?Attachments\//g, '$1/attachments/');
  return text;
}

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(s, d);
    } else if (entry.isFile()) {
      fs.copyFileSync(s, d);
    }
  }
}

// Convert Obsidian wiki-links to HTML links
function convertWikiLinks(text) {
  return text.replace(/\[\[([^\]]+)\]\]/g, (match, linkText) => {
    const noteId = linkText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return `<a href="/notes/${noteId}" class="note-link">${linkText}</a>`;
  });
}

// Build the site
function buildSite() {
  console.log('🔨 Building Working Notes site...');
  
  // Create output directories
  const outputDir = '_site';
  const notesDir = path.join(outputDir, 'notes');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
  if (!fs.existsSync(notesDir)) {
    fs.mkdirSync(notesDir);
  }
  
  // Copy static files
  const staticFiles = ['index.html', 'admin.html', 'serve.py'];
  staticFiles.forEach(file => {
    if (fs.existsSync(file)) {
      fs.copyFileSync(file, path.join(outputDir, file));
      console.log(`📄 Copied ${file}`);
    }
  });
  
  // Copy attachments if present
  if (fs.existsSync('attachments')) {
    copyDirRecursive('attachments', path.join(outputDir, 'attachments'));
    console.log('🖼️  Copied attachments to _site/attachments');
  }
  
  // Process notes
  const notesDirPath = '_notes';
  const notes = [];
  
  if (fs.existsSync(notesDirPath)) {
    const noteFiles = fs.readdirSync(notesDirPath).filter(file => file.endsWith('.md'));
    
    noteFiles.forEach(file => {
      const filePath = path.join(notesDirPath, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const { attributes, body } = frontMatter(content);
      
      // Convert images and wiki links, then to HTML
      const withImages = convertImages(body);
      let htmlContent = marked(withImages);
      htmlContent = convertWikiLinks(htmlContent);
      
      // Create note ID from filename
      const noteId = file.replace('.md', '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      
      // Create note HTML
      const noteHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${attributes.title || 'Note'} - Working Notes</title>
    <link rel="stylesheet" href="/assets/css/style.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        :root {
            --bg-primary: #f8f9fa;
            --bg-secondary: #e9ecef;
            --bg-panel: rgba(255, 255, 255, 0.98);
            --bg-nav: rgba(255, 255, 255, 0.95);
            --text-primary: #1a1a1a;
            --text-secondary: #2d3748;
            --text-muted: #666;
            --accent-primary: #ff6b35;
            --accent-secondary: #f7931e;
            --border-color: rgba(0, 0, 0, 0.08);
            --shadow-light: rgba(0, 0, 0, 0.02);
            --shadow-medium: rgba(0, 0, 0, 0.1);
        }

        [data-theme="dark"] {
            --bg-primary: #0d1117;
            --bg-secondary: #161b22;
            --bg-panel: rgba(33, 38, 45, 0.98);
            --bg-nav: rgba(33, 38, 45, 0.95);
            --text-primary: #f0f6fc;
            --text-secondary: #c9d1d9;
            --text-muted: #8b949e;
            --accent-primary: #ff6b35;
            --accent-secondary: #f7931e;
            --border-color: rgba(240, 246, 252, 0.1);
            --shadow-light: rgba(0, 0, 0, 0.3);
            --shadow-medium: rgba(0, 0, 0, 0.4);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: var(--text-primary);
            background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
            overflow-x: auto;
            overflow-y: hidden;
            height: 100vh;
            display: flex;
            flex-direction: column;
            transition: all 0.3s ease;
        }

        .top-nav {
            background: var(--bg-nav);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--border-color);
            padding: 12px 20px;
            flex-shrink: 0;
            z-index: 100;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .nav-left {
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .nav-right {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .search-container {
            position: relative;
            display: flex;
            align-items: center;
        }

        .search-input {
            background: var(--bg-panel);
            border: 1px solid var(--border-color);
            border-radius: 20px;
            padding: 8px 16px 8px 40px;
            font-size: 14px;
            color: var(--text-primary);
            width: 200px;
            transition: all 0.3s ease;
        }

        .search-input:focus {
            outline: none;
            border-color: var(--accent-primary);
            width: 250px;
            box-shadow: 0 0 0 2px rgba(255, 107, 53, 0.1);
        }

        .search-icon {
            position: absolute;
            left: 14px;
            color: var(--text-muted);
            font-size: 14px;
        }

        .home-link {
            color: var(--text-primary);
            text-decoration: none;
            font-size: 15px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            position: relative;
            transition: all 0.3s ease;
        }

        .home-link:hover {
            color: var(--accent-primary);
            transform: translateY(-1px);
        }

        .container {
            display: flex;
            height: calc(100vh - 65px);
            width: fit-content;
            min-width: 100vw;
        }

        .note-panel {
            height: calc(100vh - 65px);
            background: var(--bg-panel);
            border-right: 1px solid var(--border-color);
            flex-shrink: 0;
            overflow-y: auto;
            position: relative;
            transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
            box-shadow: 0 0 20px var(--shadow-light);
            width: 600px;
        }

        .note-content {
            padding: 48px 60px 40px 40px;
            max-width: 100%;
            position: relative;
        }

        .note-title {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 32px;
            color: var(--text-primary);
            line-height: 1.2;
            position: relative;
            text-transform: uppercase;
            letter-spacing: -0.5px;
            padding-right: 60px;
        }

        .note-title::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 0;
            width: 40px;
            height: 3px;
            background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
        }

        .note-body {
            font-size: 16px;
            line-height: 1.7;
        }

        .note-body p {
            margin-bottom: 16px;
        }

        .note-body h2 {
            font-size: 20px;
            font-weight: 600;
            margin: 32px 0 16px;
            color: var(--text-primary);
        }

        .note-body h3 {
            font-size: 18px;
            font-weight: 600;
            margin: 24px 0 12px;
            color: var(--text-primary);
        }

        .note-body ul, .note-body ol {
            margin-bottom: 16px;
            padding-left: 24px;
        }

        .note-body li {
            margin-bottom: 8px;
        }

        .note-link {
            color: var(--accent-primary);
            text-decoration: none;
            cursor: pointer;
            border-bottom: 1px solid transparent;
            transition: border-color 0.2s;
        }

        .note-link:hover {
            border-bottom-color: var(--accent-primary);
        }

        .note-meta {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-top: 32px;
            padding-top: 24px;
            border-top: 1px solid rgba(0, 0, 0, 0.06);
            font-size: 12px;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .last-modified {
            display: flex;
            align-items: center;
            gap: 4px;
        }

        .intersection-tags {
            display: flex;
            gap: 6px;
            flex-wrap: wrap;
        }

        .intersection-tag {
            background: linear-gradient(45deg, var(--accent-primary), var(--accent-secondary));
            color: white;
            padding: 2px 6px;
            border-radius: 8px;
            font-size: 9px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.3px;
        }

        /* Mobile-first responsive design */
        @media (max-width: 768px) {
            .top-nav {
                padding: 8px 16px;
                flex-direction: column;
                gap: 8px;
                height: auto;
            }

            .nav-left, .nav-right {
                width: 100%;
                justify-content: space-between;
            }

            .search-input {
                width: 150px;
            }

            .search-input:focus {
                width: 180px;
            }

            .container {
                height: calc(100vh - 80px);
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
            }

            .note-panel {
                width: 100vw;
                min-width: 100vw;
            }
            
            .note-content {
                padding: 32px 20px 20px;
            }

            .note-title {
                font-size: 24px;
                padding-right: 50px;
            }
        }
    </style>
</head>
<body>
    <div class="top-nav">
        <div class="nav-left">
            <a href="/" class="home-link">← MULTIPOTENTIAL MIND</a>
        </div>
        <div class="nav-right">
            <div class="search-container">
                <span class="search-icon">🔍</span>
                <input type="text" class="search-input" placeholder="Search notes..." id="searchInput">
            </div>
        </div>
    </div>
    <div class="container" id="container">
        <div class="note-panel active">
            <div class="note-content">
                <h1 class="note-title">${attributes.title || 'Note'}</h1>
                <div class="note-body">
                    ${htmlContent}
                </div>
                ${attributes.last_modified ? `
                <div class="note-meta">
                    <div class="last-modified">
                        <span>📅</span> ${attributes.last_modified}
                    </div>
                    ${attributes.tags ? `
                    <div class="intersection-tags">
                        ${attributes.tags.map(tag => `<span class="intersection-tag">${tag}</span>`).join('')}
                    </div>
                    ` : ''}
                </div>
                ` : ''}
            </div>
        </div>
    </div>

    <script>
        // Simple search functionality
        document.getElementById('searchInput').addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            console.log('Searching for:', query);
        });

        // Handle note links
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('note-link')) {
                e.preventDefault();
                const href = e.target.getAttribute('href');
                if (href && href.startsWith('/')) {
                    window.location.href = href;
                }
            }
        });
    </script>
</body>
</html>`;
      
      // Write note HTML file
      const noteFilePath = path.join(notesDir, `${noteId}.html`);
      fs.writeFileSync(noteFilePath, noteHtml);
      
      // Add to notes array for index
      notes.push({
        id: noteId,
        title: attributes.title || 'Untitled',
        lastModified: attributes.last_modified || '',
        tags: attributes.tags || [],
        url: `/notes/${noteId}.html`
      });
      
      console.log(`📝 Built note: ${attributes.title || file}`);
    });
  }
  
  // Create notes index JSON
  const notesIndex = {
    notes: notes.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified))
  };
  
  fs.writeFileSync(path.join(outputDir, 'notes.json'), JSON.stringify(notesIndex, null, 2));
  
  console.log(`✅ Built ${notes.length} notes`);
  console.log(`🌐 Site built in ${outputDir}/`);
  console.log(`📊 Notes index: ${outputDir}/notes.json`);
}

// Run build
buildSite(); 

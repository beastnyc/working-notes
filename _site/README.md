# Working Notes

A beautiful, interconnected note-taking system inspired by Andy Matuschak's evergreen notes approach. Built with vanilla HTML, CSS, and JavaScript.

## Features

- **Interconnected Notes**: Densely linked notes that build on each other
- **Collapsible Panels**: Navigate between notes with smooth animations
- **Smart Search**: Real-time search through titles, content, and tags
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **Dark/Light Mode**: Automatic theme detection
- **Keyboard Navigation**: Full keyboard support for power users

## Live Demo

Visit: [Your GitHub Pages URL will go here]

## How to Use

1. **Navigation**: Click on any note link to open it in a new panel
2. **Search**: Use the search bar to find notes by title, content, or tags
3. **Keyboard Shortcuts**:
   - `Escape`: Close the rightmost panel
   - Arrow keys: Navigate search results
   - `Enter`: Open selected search result

## Adding New Notes

To add a new note, edit the `notes` object in `index.html`. Each note should include:

```javascript
'note-id': {
    title: 'Note Title',
    lastModified: 'YYYY-MM-DD',
    intersections: ['Tag1', 'Tag2', 'Tag3'],
    content: `
        <p>Your note content here...</p>
        <h2>Subheadings</h2>
        <p>More content...</p>
    `,
    backlinks: ['Note that references this', 'Another note'],
    linkedNotes: ['Note this references', 'Another reference']
}
```

## Local Development

Simply open `index.html` in your browser or serve it with a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```

## License

MIT License - feel free to use and modify for your own note-taking system! 
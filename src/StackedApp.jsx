import React from 'react';

function getIdFromHref(href) {
  const m = href && href.match(/\/notes\/([^/.]+)(?:\.html)?/);
  return m ? m[1] : null;
}

function Panel({ title, body, index, isCollapsed, onClick }) {
  const panelRef = React.useRef(null);

  if (isCollapsed) {
    return (
      <div
        className="note-panel collapsed"
        onClick={onClick}
        style={{ cursor: 'pointer' }}
      >
        <div className="collapsed-title">
          {title || 'Note'}
        </div>
      </div>
    );
  }

  return (
    <div className="note-panel" ref={panelRef}>
      <div className="note-content">
        <h1 className="note-title">{title || 'Note'}</h1>
        <div className="note-body" dangerouslySetInnerHTML={{ __html: body }} />
      </div>
    </div>
  );
}

export default function StackedApp({ initial, maxVisiblePanes = 3 }) {
  const [panels, setPanels] = React.useState([initial]);
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const cont = document.getElementById('container');
    if (cont) cont.style.display = 'none';
    const root = document.getElementById('stack-root');
    if (root) root.style.display = 'block';
  }, []);

  // Scroll to show the newest pane when a new one is added
  React.useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Smooth scroll to the end to show newest pane
    setTimeout(() => {
      const lastPane = container.querySelector('.note-panel:last-child:not(.collapsed)');
      if (lastPane) {
        lastPane.scrollIntoView({
          behavior: 'smooth',
          inline: 'end',
          block: 'nearest'
        });
      }
    }, 100);
  }, [panels.length]);

  async function openNote(href, baseIndex) {
    try {
      let fetchUrl = href;
      if (!/\.html($|\?)/.test(fetchUrl)) fetchUrl = href.replace(/(\/notes\/[^/?#]+)(.*)$/, '$1.html$2');
      const res = await fetch(fetchUrl, { credentials: 'same-origin' });
      if (!res.ok) throw new Error('Failed to load ' + fetchUrl);
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const title = (doc.querySelector('.note-title') || {}).textContent || 'Note';
      const body = (doc.querySelector('.note-body') || {}).innerHTML || '<p>Content unavailable.</p>';

      setPanels((prev) => {
        const next = baseIndex != null ? prev.slice(0, baseIndex + 1) : prev.slice();
        next.push({ title, body });
        return next; // Keep all panels, we'll handle collapsing in render
      });

      const id = getIdFromHref(href);
      if (id) {
        const url = new URL(window.location.href);
        const params = url.searchParams;
        const existing = params.getAll('stackedNotes').filter(Boolean);
        const start = Number.isFinite(baseIndex) && baseIndex >= 0 ? baseIndex + 1 : existing.length;
        const trimmed = existing.slice(0, start);
        trimmed.push(id);
        params.delete('stackedNotes');
        trimmed.forEach((x) => params.append('stackedNotes', x));
        history.pushState({ stackedNotes: trimmed }, '', url);
      }
    } catch (err) {
      console.error(err);
      window.location.href = href;
    }
  }

  function expandCollapsedPane(panelIndex) {
    // Move the clicked panel to the end (most recent position)
    setPanels(prev => {
      const panel = prev[panelIndex];
      const newPanels = prev.filter((_, i) => i !== panelIndex);
      return [...newPanels, panel];
    });
  }

  function onClick(e) {
    const link = e.target.closest && e.target.closest('a[data-note], a.note-link, a[href^="/notes/"]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!(href && href.startsWith('/notes/'))) return;
    e.preventDefault();

    const panelEl = e.target.closest('.note-panel');
    const allPanels = Array.from(containerRef.current.querySelectorAll('.note-panel'));
    const idx = allPanels.indexOf(panelEl);

    try { console.info('[Stack] openNote (react):', href); } catch {}
    openNote(href, idx);
  }

  React.useEffect(() => {
    try {
      const params = new URL(window.location.href).searchParams;
      const ids = params.getAll('stackedNotes');
      ids.forEach((id) => openNote(`/notes/${id}.html`, null));
    } catch (e) {
      console.warn('Restore stack failed', e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Determine which panels should be collapsed
  const visiblePanels = panels.length > maxVisiblePanes ?
    panels.slice(-maxVisiblePanes) : panels;
  const collapsedCount = panels.length - visiblePanels.length;

  return (
    <div id="stack" className="pane-container" ref={containerRef} onClick={onClick}>
      {/* Render collapsed panels */}
      {panels.slice(0, collapsedCount).map((panel, i) => (
        <Panel
          key={`collapsed-${i}`}
          title={panel.title}
          body={panel.body}
          index={i}
          isCollapsed={true}
          onClick={() => expandCollapsedPane(i)}
        />
      ))}

      {/* Render visible panels */}
      {visiblePanels.map((panel, i) => (
        <Panel
          key={`visible-${collapsedCount + i}`}
          title={panel.title}
          body={panel.body}
          index={collapsedCount + i}
          isCollapsed={false}
        />
      ))}
    </div>
  );
}

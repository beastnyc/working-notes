import React from 'react';

function getIdFromHref(href) {
  const m = href && href.match(/\/notes\/([^/.]+)(?:\.html)?/);
  return m ? m[1] : null;
}

function Panel({ title, body, index, totalPanels, isActive, onClick }) {
  const panelRef = React.useRef(null);

  // Calculate panel type based on position from the end
  const positionFromEnd = totalPanels - 1 - index;
  const zIndex = 1000 + index;

  // Determine panel state based on total panels and position
  let panelType = 'collapsed';

  if (totalPanels === 1) {
    panelType = 'current'; // Only one panel
  } else if (totalPanels === 2) {
    panelType = positionFromEnd === 0 ? 'current-split' : 'previous-split'; // Two equal panels
  } else if (totalPanels >= 3) {
    if (positionFromEnd === 0) {
      panelType = 'current'; // Rightmost/newest panel
    } else if (positionFromEnd === 1) {
      panelType = 'previous'; // Second from right
    } else if (positionFromEnd === 2) {
      panelType = 'third'; // Third panel - stacked below
    } else {
      panelType = 'collapsed'; // All others collapse to narrow strips
    }
  }

  const isCollapsed = panelType === 'collapsed';

  // Only collapsed, previous, third, and previous-split panels should be clickable to bring to front
  const shouldHandleClick = !['current', 'current-split'].includes(panelType);

  return (
    <div
      className={`note-panel panel-${panelType}`}
      ref={panelRef}
      style={{ zIndex: zIndex }}
      onClick={shouldHandleClick ? onClick : undefined}
    >
      {isCollapsed ? (
        <div className="collapsed-content">
          <div className="collapsed-title">
            {title || 'Note'}
          </div>
        </div>
      ) : (
        <div className="note-content">
          <h1 className="note-title">{title || 'Note'}</h1>
          <div className="note-body" dangerouslySetInnerHTML={{ __html: body }} />
        </div>
      )}
    </div>
  );
}

export default function StackedApp({ initial }) {
  const [panels, setPanels] = React.useState([initial]);
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const cont = document.getElementById('container');
    if (cont) cont.style.display = 'none';
    const root = document.getElementById('stack-root');
    if (root) root.style.display = 'block';
  }, []);

  // No auto-scrolling needed - all panels always visible with dynamic sizing

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
        return next; // Keep all panels for layered display
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

  function bringPanelToFront(panelIndex) {
    // Move the clicked panel to the end (most recent position)
    setPanels(prev => {
      const panel = prev[panelIndex];
      const newPanels = prev.filter((_, i) => i !== panelIndex);
      return [...newPanels, panel];
    });
  }

  function onClick(e) {
    // Check if this is a link click first
    const link = e.target.closest && e.target.closest('a[data-note], a.note-link, a[href^="/notes/"]');
    if (link) {
      const href = link.getAttribute('href');
      if (href && href.startsWith('/notes/')) {
        e.preventDefault();

        const panelEl = e.target.closest('.note-panel');
        const allPanels = Array.from(containerRef.current.querySelectorAll('.note-panel'));
        const idx = allPanels.indexOf(panelEl);

        try { console.info('[Stack] openNote (react):', href); } catch {}
        openNote(href, idx);
        return;
      }
    }

    // If not a link click, do nothing - panel onClick handlers will handle bringing to front
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

  return (
    <div id="stack" className="pane-container" ref={containerRef} onClick={onClick}>
      {panels.map((panel, i) => (
        <Panel
          key={`panel-${i}`}
          title={panel.title}
          body={panel.body}
          index={i}
          totalPanels={panels.length}
          isActive={i === panels.length - 1}
          onClick={() => bringPanelToFront(i)}
        />
      ))}
    </div>
  );
}

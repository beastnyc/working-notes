import React from 'react';

function getIdFromHref(href) {
  const m = href && href.match(/\/notes\/([^/.]+)(?:\.html)?/);
  return m ? m[1] : null;
}

function Panel({ title, body, index, totalPanels, onClick }) {
  const panelRef = React.useRef(null);

  // Calculate z-index so newer panels appear on top
  const zIndex = 1000 + index;

  return (
    <div
      className="note-panel"
      ref={panelRef}
      style={{
        zIndex: zIndex,
        position: 'relative'
      }}
      onClick={onClick}
    >
      <div className="note-content">
        <h1 className="note-title">{title || 'Note'}</h1>
        <div className="note-body" dangerouslySetInnerHTML={{ __html: body }} />
      </div>
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

  // Auto-position panels to keep 2 most recent fully visible
  React.useEffect(() => {
    if (!containerRef.current || panels.length < 2) return;

    const container = containerRef.current;
    const panelWidth = 600; // Fixed panel width
    const overlapAmount = 100; // How much panels overlap

    // Calculate position to show last 2 panels fully
    const targetScroll = Math.max(0, (panels.length - 2) * (panelWidth - overlapAmount));

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
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

  return (
    <div id="stack" className="pane-container" ref={containerRef} onClick={onClick}>
      {panels.map((panel, i) => (
        <Panel
          key={`panel-${i}`}
          title={panel.title}
          body={panel.body}
          index={i}
          totalPanels={panels.length}
          onClick={() => bringPanelToFront(i)}
        />
      ))}
    </div>
  );
}

import React from 'react';

function getIdFromHref(href) {
  const m = href && href.match(/\/notes\/([^/.]+)(?:\.html)?/);
  return m ? m[1] : null;
}

function Panel({ title, body, index }) {
  const cls = 'note-panel ' + (index === 0 ? 'panel-1' : index === 1 ? 'panel-2' : 'panel-3');
  return (
    <div className={cls}>
      <div className="note-content">
        <h1 className="note-title">{title || 'Note'}</h1>
        <div className="note-body" dangerouslySetInnerHTML={{ __html: body }} />
      </div>
    </div>
  );
}

export default function StackedApp({ initial, maxPanels = 3 }) {
  const [panels, setPanels] = React.useState([initial]);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const cont = document.getElementById('container');
    if (cont) cont.style.display = 'none';
    const root = document.getElementById('stack-root');
    if (root) root.style.display = 'block';
  }, []);

  React.useEffect(() => {
    if (!ref.current) return;
    const vw = ref.current.clientWidth || window.innerWidth;
    ref.current.scrollLeft = Math.max(0, ref.current.scrollWidth - vw * 0.8);
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
        return next.slice(-maxPanels);
      });
      const id = getIdFromHref(href);
      if (id) {
        const url = new URL(window.location.href);
        const params = url.searchParams;
        const existing = params.getAll('stackedNotes').filter(Boolean);
        const start = Number.isFinite(baseIndex) && baseIndex >= 0 ? baseIndex + 1 : existing.length;
        const trimmed = existing.slice(0, start);
        trimmed.push(id);
        const final = trimmed.slice(-maxPanels);
        params.delete('stackedNotes');
        final.forEach((x) => params.append('stackedNotes', x));
        history.pushState({ stackedNotes: final }, '', url);
      }
    } catch (err) {
      console.error(err);
      window.location.href = href;
    }
  }

  function onClick(e) {
    const link = e.target.closest && e.target.closest('.note-link');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!(href && href.startsWith('/notes/'))) return;
    e.preventDefault();
    const panelEl = e.target.closest('.note-panel');
    const idx = Array.from(ref.current.querySelectorAll('.note-panel')).indexOf(panelEl);
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
    <div id="stack" className="container" ref={ref} onClick={onClick}>
      {panels.map((p, i) => (
        <Panel key={i} title={p.title} body={p.body} index={i} />
      ))}
    </div>
  );
}


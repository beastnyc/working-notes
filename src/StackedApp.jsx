import React from 'react';

function getIdFromHref(href) {
  const match = href && href.match(/\/notes\/([^/.]+)(?:\.html)?/);
  return match ? match[1] : null;
}

const Panel = React.forwardRef(function Panel(
  { title, body, index, totalPanels, onClick },
  ref
) {
  const positionFromEnd = totalPanels - 1 - index;
  const zIndex = 1000 + index;

  let panelType = 'collapsed';

  if (totalPanels === 1) {
    panelType = 'current';
  } else if (totalPanels === 2) {
    panelType = positionFromEnd === 0 ? 'current-split' : 'previous-split';
  } else if (totalPanels >= 3) {
    if (positionFromEnd === 0) {
      panelType = 'current';
    } else if (positionFromEnd === 1) {
      panelType = 'previous';
    }
  }

  const classNames = ['note-panel', `panel-${panelType}`];
  if (panelType === 'collapsed') classNames.push('collapsed');

  const shouldHandleClick = !['current', 'current-split'].includes(panelType);

  return (
    <div
      className={classNames.join(' ')}
      ref={ref}
      style={{ zIndex }}
      onClick={shouldHandleClick ? onClick : undefined}
    >
      {panelType === 'collapsed' ? (
        <div className="collapsed-content">
          <div className="collapsed-title">{title || 'Note'}</div>
        </div>
      ) : (
        <div className="note-content">
          <h1 className="note-title">{title || 'Note'}</h1>
          <div className="note-body" dangerouslySetInnerHTML={{ __html: body }} />
        </div>
      )}
    </div>
  );
});

export default function StackedApp({ initial }) {
  const [panels, setPanels] = React.useState(() => [
    {
      title: initial.title,
      body: initial.body,
      href: initial.href || window.location.pathname,
      id: initial.id || getIdFromHref(window.location.pathname),
    },
  ]);
  const containerRef = React.useRef(null);
  const panelRefs = React.useRef([]);
  const updateHistoryWithPanels = React.useCallback((stack, { mode = 'replace' } = {}) => {
    try {
      const ids = stack.map((panel) => panel.id).filter(Boolean).slice(-3);
      const url = new URL(window.location.href);
      url.searchParams.delete('stackedNotes');
      ids.forEach((value) => url.searchParams.append('stackedNotes', value));
      const state = { stackedNotes: ids };
      if (mode === 'push') {
        window.history.pushState(state, '', url);
      } else {
        window.history.replaceState(state, '', url);
      }
    } catch (error) {
      console.warn('Unable to sync stacked notes history', error);
    }
  }, []);

  React.useEffect(() => {
    const cont = document.getElementById('container');
    if (cont) cont.style.display = 'none';
    const root = document.getElementById('stack-root');
    if (root) root.style.display = 'block';
  }, []);

  React.useEffect(() => {
    panelRefs.current = panelRefs.current.slice(-panels.length);
  }, [panels.length]);

  React.useEffect(() => {
    const lastPanel = panelRefs.current[panelRefs.current.length - 1];
    if (lastPanel && lastPanel.scrollIntoView) {
      lastPanel.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'end',
      });
    }
  }, [panels]);

  const openNote = React.useCallback(async (href, baseIndex) => {
    try {
      let fetchUrl = href;
      if (!/\.html($|\?)/.test(fetchUrl)) {
        fetchUrl = href.replace(/(\/notes\/[^/?#]+)(.*)$/, '$1.html$2');
      }

      const res = await fetch(fetchUrl, { credentials: 'same-origin' });
      if (!res.ok) throw new Error('Failed to load ' + fetchUrl);

      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const title =
        (doc.querySelector('.note-title') || {}).textContent || 'Note';
      const body =
        (doc.querySelector('.note-body') || {}).innerHTML ||
        '<p>Content unavailable.</p>';
      const id = getIdFromHref(fetchUrl) || getIdFromHref(href);
      const normalizedHref = id ? `/notes/${id}.html` : fetchUrl;

      let nextPanelsSnapshot = null;
      setPanels((prev) => {
        const base =
          Number.isInteger(baseIndex) && baseIndex >= 0
            ? prev.slice(0, baseIndex + 1)
            : prev.slice();
        const withoutDuplicate = base.filter(
          (panel) => panel.href !== normalizedHref
        );
        const next = [...withoutDuplicate, { title, body, href: normalizedHref, id }];
        const trimmedNext = next.length > 3 ? next.slice(next.length - 3) : next;
        nextPanelsSnapshot = trimmedNext;
        return trimmedNext;
      });

      if (nextPanelsSnapshot) {
        updateHistoryWithPanels(nextPanelsSnapshot, { mode: id ? 'push' : 'replace' });
      }
    } catch (err) {
      console.error(err);
      window.location.href = href;
    }
  }, [updateHistoryWithPanels]);

  const bringPanelToFront = React.useCallback((panelIndex) => {
    setPanels((prev) => {
      if (panelIndex < 0 || panelIndex >= prev.length) return prev;
      const panel = prev[panelIndex];
      const reordered = prev.filter((_, idx) => idx !== panelIndex);
      const next = [...reordered, panel];
      const trimmed = next.length > 3 ? next.slice(next.length - 3) : next;
      updateHistoryWithPanels(trimmed, { mode: 'replace' });
      return trimmed;
    });
  }, [updateHistoryWithPanels]);

  const handleClick = React.useCallback(
    (e) => {
      const link =
        e.target.closest &&
        e.target.closest('a[data-note], a.note-link, a[href^="/notes/"]');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || !href.startsWith('/notes/')) return;

      e.preventDefault();
      const panelEl = e.target.closest('.note-panel');
      const container = containerRef.current;
      const allPanels = container
        ? Array.from(container.querySelectorAll('.note-panel'))
        : [];
      const idx = allPanels.indexOf(panelEl);

      try {
        console.info('[Stack] openNote (react):', href);
      } catch {}
      openNote(href, idx);
    },
    [openNote]
  );

  React.useEffect(() => {
    try {
      const params = new URL(window.location.href).searchParams;
      const ids = params.getAll('stackedNotes');
      ids.forEach((id) => {
        openNote(`/notes/${id}.html`, null);
      });
    } catch (error) {
      console.warn('Restore stack failed', error);
    }
  }, [openNote]);

  return (
    <div
      id="stack"
      className={`pane-container panels-${panels.length}`}
      ref={containerRef}
      onClick={handleClick}
    >
      {panels.map((panel, index) => (
        <Panel
          key={panel.href || `${panel.title || 'panel'}-${index}`}
          title={panel.title}
          body={panel.body}
          index={index}
          totalPanels={panels.length}
          onClick={() => bringPanelToFront(index)}
          ref={(el) => {
            panelRefs.current[index] = el || null;
          }}
        />
      ))}
    </div>
  );
}

import React from 'react';
import { createRoot } from 'react-dom/client';
import StackedApp from './StackedApp.jsx';

function boot() {
  const rootEl = document.getElementById('stack-root');
  if (!rootEl) return;
  const title = (document.querySelector('.note-title') || {}).textContent || 'Note';
  const body = (document.querySelector('.note-body') || {}).innerHTML || '';
  // Signal that React is handling stacking; hide static container, show root
  try {
    window.__STACKED_REACT__ = true;
    const cont = document.getElementById('container');
    if (cont) cont.style.display = 'none';
    rootEl.style.display = 'block';
    console.info('[Stack] Mode: React');
  } catch {}
  createRoot(rootEl).render(
    React.createElement(StackedApp, { initial: { title, body } })
  );
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

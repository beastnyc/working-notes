import React from 'react';
import { createRoot } from 'react-dom/client';
import StackedApp from './StackedApp.jsx';

function boot() {
  const rootEl = document.getElementById('stack-root');
  if (!rootEl) return;
  const title = (document.querySelector('.note-title') || {}).textContent || 'Note';
  const body = (document.querySelector('.note-body') || {}).innerHTML || '';
  createRoot(rootEl).render(
    React.createElement(StackedApp, { initial: { title, body } })
  );
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}


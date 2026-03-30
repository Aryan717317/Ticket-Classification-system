import { qs, qsa, on } from './utils/dom.js';
import { exportCSV } from './utils/export.js';
import { state, clearState } from './core/state.js';
import { CATEGORIES } from './core/categories.js';
import { showView } from './core/router.js';
import { classifyTicket } from './views/classify.js';
import { toggleSetting } from './views/settings.js';
import { updateSidebar, updateBadges } from './components/sidebar.js';

document.addEventListener('DOMContentLoaded', () => {
  // Navigation Router
  qsa('.nav-item').forEach(nav => {
    on(nav, 'click', (e) => {
      const viewName = e.currentTarget.dataset.view;
      showView(viewName, e.currentTarget);
    });
  });

  // Topbar Actions
  on('#btn-export', 'click', () => exportCSV(state.tickets, CATEGORIES));
  
  on('#btn-clear-all', 'click', () => {
    if (!confirm('Clear all classified tickets?')) return;
    clearState();
    qs('#results-container').innerHTML = '';
    updateSidebar();
    updateBadges();
  });

  // Input & Classify
  const ticketInput = qs('#ticket-input');
  on(ticketInput, 'input', () => {
    const len = ticketInput.value.length;
    qs('#char-count').textContent = len;
    qs('#submit-btn').disabled = len === 0;
  });

  on(ticketInput, 'keydown', (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      classifyTicket();
    }
  });

  on('#submit-btn', 'click', classifyTicket);
  
  on('#btn-clear-input', 'click', () => {
    ticketInput.value = '';
    qs('#char-count').textContent = '0';
    qs('#submit-btn').disabled = true;
  });

  // Examples
  qsa('.ex-chip').forEach(chip => {
    on(chip, 'click', (e) => {
      const text = e.currentTarget.dataset.ex;
      ticketInput.value = text;
      qs('#char-count').textContent = text.length;
      qs('#submit-btn').disabled = false;
      ticketInput.focus();
    });
  });

  // Settings
  qsa('.setting-row .toggle').forEach(btn => {
    on(btn, 'click', toggleSetting);
  });
});

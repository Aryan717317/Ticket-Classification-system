import { state } from '../core/state.js';
import { qs } from '../utils/dom.js';

export function updateSidebar() {
  const counts = { auth: 0, hr: 0, it: 0, billing: 0, general: 0 };
  state.tickets.forEach(t => { 
    if (t.winner && counts[t.winner] !== undefined) counts[t.winner]++; 
  });
  
  for (const [key, val] of Object.entries(counts)) {
    const el = qs('#stat-' + key);
    if (el) el.textContent = val;
  }
}

export function updateBadges() {
  const total = state.tickets.length;
  qs('#badge-classify').textContent = total;
  qs('#badge-queue').textContent = total;
}

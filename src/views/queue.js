import { state } from '../core/state.js';
import { CATEGORIES } from '../core/categories.js';
import { qs } from '../utils/dom.js';

export function renderQueue() {
  const container = qs('#queue-content');
  const meta = qs('#queue-meta');

  if (!state.tickets.length) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">○</div><div class="empty-text">No tickets yet.</div></div>`;
    meta.textContent = '0 tickets';
    return;
  }

  meta.textContent = `${state.tickets.length} ticket${state.tickets.length > 1 ? 's' : ''}`;

  const rows = state.tickets.map(t => {
    const cat = t.winner ? CATEGORIES[t.winner] : null;
    const label = cat ? cat.label : 'Unknown';
    const bgClass = cat ? cat.bgClass : 'bg-unknown';
    const dotClass = cat ? cat.dotClass : 'dot-unknown';
    const pct = t.winner ? t.result.scores[t.winner] : 0;
    const timeStr = t.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const priorityClass = { high: 'priority-high', medium: 'priority-medium', low: 'priority-low' }[t.priority];

    return `<tr>
      <td class="q-id">${t.id}</td>
      <td class="q-text">${t.text.slice(0, 60)}${t.text.length > 60 ? '…' : ''}</td>
      <td>
        <span class="q-badge ${bgClass}">
          <span class="q-dot ${dotClass}"></span>
          ${label}
        </span>
      </td>
      <td class="q-conf">${pct}%</td>
      <td class="${priorityClass}" style="font-size:12px">${t.priority}</td>
      <td class="q-time">${timeStr}</td>
    </tr>`;
  }).join('');

  container.innerHTML = `
    <table class="queue-table">
      <thead>
        <tr>
          <th>Ticket ID</th>
          <th>Summary</th>
          <th>Category</th>
          <th>Confidence</th>
          <th>Priority</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

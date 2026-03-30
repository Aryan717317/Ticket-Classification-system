import { state } from '../core/state.js';
import { CATEGORIES } from '../core/categories.js';
import { qs } from '../utils/dom.js';

export function renderAnalytics() {
  const total = state.tickets.length;
  qs('#m-total').textContent = total;

  if (!total) {
    qs('#m-conf').textContent = '—';
    qs('#m-high').textContent = '0';
    qs('#m-neg').textContent = '0';
    qs('#dist-chart').innerHTML = '<div class="empty-text" style="font-size:12px;color:var(--ink-4)">No data yet</div>';
    return;
  }

  const avgConf = Math.round(state.tickets.reduce((s, t) => {
    return s + (t.winner ? t.result.scores[t.winner] : 0);
  }, 0) / total);

  const highCount = state.tickets.filter(t => t.priority === 'high').length;
  const negCount  = state.tickets.filter(t => t.sentiment === 'negative' || t.sentiment === 'urgent').length;

  qs('#m-conf').textContent = avgConf + '%';
  qs('#m-high').textContent = highCount;
  qs('#m-neg').textContent = negCount;

  const counts = {};
  for (const key of Object.keys(CATEGORIES)) counts[key] = 0;
  counts['unknown'] = 0;
  state.tickets.forEach(t => { const k = t.winner || 'unknown'; counts[k] = (counts[k] || 0) + 1; });

  const maxCount = Math.max(...Object.values(counts), 1);
  const colors = { auth:'var(--ink)', hr:'var(--green)', it:'var(--blue)', billing:'var(--amber)', general:'var(--purple)', unknown:'var(--red)' };
  const labels = { auth:'Auth / Password', hr:'HR / Self-Service', it:'IT Support', billing:'Billing / Finance', general:'General', unknown:'Unknown' };

  const barHTML = Object.entries(counts)
    .filter(([,v]) => v > 0)
    .sort((a,b) => b[1]-a[1])
    .map(([key, count]) => `
      <div class="bar-row">
        <div class="bar-label">${labels[key] || key}</div>
        <div class="bar-track"><div class="bar-fill" style="width:${(count/maxCount)*100}%;background:${colors[key] || 'var(--ink)'}"></div></div>
        <div class="bar-count">${count}</div>
      </div>`).join('');

  qs('#dist-chart').innerHTML = barHTML;
}

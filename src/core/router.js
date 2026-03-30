import { renderQueue } from '../views/queue.js';
import { renderAnalytics } from '../views/analytics.js';
import { qsa, qs } from '../utils/dom.js';

const VIEWS = {
  classify: { title: 'Classify Ticket', sub: 'NLP intent detection + auto-routing' },
  queue:    { title: 'Ticket Queue',    sub: 'All classified tickets this session' },
  analytics:{ title: 'Analytics',       sub: 'Classification performance metrics' },
  settings: { title: 'Settings',        sub: 'Configure the AI pipeline' }
};

export function showView(name, btn) {
  qsa('.view').forEach(v => v.classList.remove('active'));
  qsa('.nav-item').forEach(n => n.classList.remove('active'));
  
  const viewEl = qs('#view-' + name);
  if (viewEl) viewEl.classList.add('active');
  if (btn) btn.classList.add('active');

  const v = VIEWS[name];
  if (v) {
    qs('#view-title').textContent = v.title;
    qs('#view-sub').textContent = v.sub;
  }

  if (name === 'queue') renderQueue();
  if (name === 'analytics') renderAnalytics();
}

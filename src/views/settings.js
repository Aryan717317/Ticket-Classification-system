import { state } from '../core/state.js';

export function toggleSetting(e) {
  const btn = e.currentTarget;
  btn.classList.toggle('on');
  const id = btn.id;
  const map = { 'tog-reply': 'autoReply', 'tog-sentiment': 'sentiment', 'tog-priority': 'priority' };
  
  if (map[id]) {
    state.settings[map[id]] = btn.classList.contains('on');
  }
}

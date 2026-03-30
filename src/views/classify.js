import { state, ticketCounter } from '../core/state.js';
import { tokenize, analyzeSentiment, getPriority, classifyText } from '../core/nlp.js';
import { CATEGORIES } from '../core/categories.js';
import { updateSidebar, updateBadges } from '../components/sidebar.js';
import { qs } from '../utils/dom.js';

export function classifyTicket() {
  const inputEl = qs('#ticket-input');
  const text = inputEl.value.trim();
  if (!text) return;

  const submitBtn = qs('#submit-btn');
  submitBtn.disabled = true;

  const processing = qs('#processing-bar');
  processing.classList.add('show');

  setTimeout(() => {
    processing.classList.remove('show');

    const result = classifyText(text);
    const tokens = tokenize(text);
    const sentiment = state.settings.sentiment ? analyzeSentiment(tokens) : 'neutral';
    const priority = state.settings.priority && result.winner
      ? getPriority(result.winner, sentiment, result.confidence)
      : 'medium';

    ticketCounter.value++;
    const ticket = {
      id: `TKT-${ticketCounter.value}`,
      text,
      result,
      sentiment,
      priority,
      timestamp: new Date(),
      winner: result.winner
    };

    state.tickets.unshift(ticket);
    renderResult(ticket);
    updateSidebar();
    updateBadges();

    submitBtn.disabled = false;
    inputEl.value = '';
    qs('#char-count').textContent = '0';
    submitBtn.disabled = true;
  }, 600 + Math.random() * 400);
}

function renderResult(ticket) {
  const container = qs('#results-container');
  const { result, sentiment, priority } = ticket;
  const winCat = result.winner ? CATEGORIES[result.winner] : null;

  const allCats = Object.entries(result.scores)
    .sort((a,b) => b[1]-a[1])
    .slice(0,4);

  const timeStr = ticket.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const div = document.createElement('div');
  div.className = 'result-entry';
  div.style.animationDelay = '0ms';

  const sentimentLabel = { negative: 'Negative', positive: 'Positive', neutral: 'Neutral', urgent: 'Urgent' }[sentiment];
  const sentimentClass  = { negative: 'sent-negative', positive: 'sent-positive', neutral: 'sent-neutral', urgent: 'sent-urgent' }[sentiment];
  const priorityClass   = { high: 'priority-high', medium: 'priority-medium', low: 'priority-low' }[priority];

  const cardsHTML = allCats.map(([key, pct]) => {
    const cat = CATEGORIES[key];
    if (!cat) return '';
    const kws = result.matches[key] || [];
    const isWinner = key === result.winner;
    return `
      <div class="class-card ${cat.cardClass}${isWinner ? ' winner' : ''}">
        <div class="class-name">${cat.label}</div>
        <div class="class-score">${pct}%</div>
        <div class="class-bar"><div class="class-bar-fill" data-width="${pct}"></div></div>
        <div class="class-keywords">${kws.length ? kws.slice(0,3).join(', ') : 'No matches'}</div>
      </div>`;
  }).join('');

  const verdictHTML = winCat ? `
    <div class="verdict-panel">
      <div class="verdict-top">
        <div class="verdict-category">
          <span class="verdict-dot ${winCat.dotClass}"></span>
          <span class="verdict-cat-name">${winCat.label}</span>
        </div>
        <span class="verdict-badge ${winCat.bgClass}">${result.confidence}% confidence</span>
      </div>
      <div class="verdict-body">
        <div class="vd-item">
          <div class="vd-label">Route to</div>
          <div class="vd-value">${winCat.team}</div>
        </div>
        <div class="vd-item">
          <div class="vd-label">SLA Target</div>
          <div class="vd-value vd-sla">${winCat.sla}</div>
        </div>
        <div class="vd-item">
          <div class="vd-label">Priority</div>
          <div class="vd-value ${priorityClass}">${priority.charAt(0).toUpperCase() + priority.slice(1)}</div>
        </div>
      </div>
      ${state.settings.sentiment ? `
      <div class="sentiment-strip">
        Sentiment
        <span class="sentiment-pill ${sentimentClass}">${sentimentLabel}</span>
        &nbsp;·&nbsp; Ticket ID
        <span class="sentiment-pill sent-neutral">${ticket.id}</span>
      </div>` : ''}
      ${state.settings.autoReply ? `
      <div class="verdict-reply">
        <strong>Suggested auto-reply</strong>
        ${winCat.reply}
      </div>` : ''}
    </div>` : `
    <div class="verdict-panel">
      <div class="verdict-top">
        <div class="verdict-category">
          <span class="verdict-dot dot-unknown"></span>
          <span class="verdict-cat-name">Unknown — Human Review Required</span>
        </div>
        <span class="verdict-badge bg-unknown">Low confidence</span>
      </div>
      <div class="verdict-body">
        <div class="vd-item"><div class="vd-label">Route to</div><div class="vd-value">General Queue</div></div>
        <div class="vd-item"><div class="vd-label">Action</div><div class="vd-value">Manual triage</div></div>
        <div class="vd-item"><div class="vd-label">Priority</div><div class="vd-value priority-medium">Review</div></div>
      </div>
    </div>`;

  div.innerHTML = `
    <div class="result-header">
      <div class="result-timestamp">${ticket.id} &nbsp;·&nbsp; ${timeStr}</div>
    </div>
    <div class="result-ticket-preview">"${ticket.text.slice(0, 200)}${ticket.text.length > 200 ? '…' : ''}"</div>
    <div class="classification-grid">${cardsHTML}</div>
    ${verdictHTML}
  `;

  container.insertBefore(div, container.firstChild);

  // Animate bars after paint
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      div.querySelectorAll('.class-bar-fill').forEach(el => {
        el.style.width = el.dataset.width + '%';
      });
    });
  });
}

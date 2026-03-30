import { CATEGORIES, SENTIMENT } from './categories.js';

export function tokenize(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function scoreCategory(tokens, kwMap) {
  let score = 0;
  const matched = [];
  const t = ' ' + tokens + ' ';
  for (const [kw, weight] of Object.entries(kwMap)) {
    if (t.includes(' ' + kw.toLowerCase() + ' ') ||
        t.includes(' ' + kw.toLowerCase()) ||
        t.includes(kw.toLowerCase() + ' ')) {
      score += weight;
      if (!matched.includes(kw)) matched.push(kw);
    }
  }
  return { score, matched };
}

export function analyzeSentiment(tokens) {
  let neg = 0, pos = 0, urg = 0;
  SENTIMENT.negative.forEach(w => { if (tokens.includes(w)) neg++; });
  SENTIMENT.positive.forEach(w => { if (tokens.includes(w)) pos++; });
  SENTIMENT.urgent.forEach(w => { if (tokens.includes(w)) urg++; });
  if (urg > 0) return 'urgent';
  if (neg > 0) return 'negative';
  if (pos > 0) return 'positive';
  return 'neutral';
}

export function getPriority(catKey, sentiment, confidence) {
  if (sentiment === 'urgent') return 'high';
  if (sentiment === 'negative' && confidence > 75) return 'high';
  if (['auth','it'].includes(catKey) && confidence > 70) return 'medium';
  if (confidence < 50) return 'low';
  return 'medium';
}

export function classifyText(text) {
  const tokens = tokenize(text);
  const scores = {};
  const matches = {};
  let totalRaw = 0;

  for (const [key, cat] of Object.entries(CATEGORIES)) {
    const result = scoreCategory(tokens, cat.keywords);
    scores[key] = result.score;
    matches[key] = result.matched;
    totalRaw += result.score;
  }

  // Softmax-style normalization
  const total = totalRaw || 1;
  const normalized = {};
  for (const key of Object.keys(scores)) {
    normalized[key] = Math.round((scores[key] / total) * 100);
  }

  // Winner
  let winner = 'general';
  let maxScore = 0;
  for (const [key, s] of Object.entries(scores)) {
    if (s > maxScore) { maxScore = s; winner = key; }
  }

  const confidence = normalized[winner] || 0;
  if (maxScore < 8) {
    winner = null;
    return { winner: null, scores: normalized, matches, confidence: 0, isUnknown: true };
  }

  return { winner, scores: normalized, matches, confidence, isUnknown: false };
}

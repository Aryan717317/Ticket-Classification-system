export function exportCSV(tickets, categories) {
  if (!tickets.length) {
    alert('No tickets to export.');
    return;
  }
  const headers = ['ID','Text','Category','Confidence','Sentiment','Priority','Time'];
  const rows = tickets.map(t => [
    t.id,
    '"' + t.text.replace(/"/g,'""') + '"',
    t.winner ? categories[t.winner].label : 'Unknown',
    t.winner ? t.result.scores[t.winner] + '%' : '0%',
    t.sentiment,
    t.priority,
    t.timestamp.toISOString()
  ]);
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'triage-tickets.csv'; a.click();
  URL.revokeObjectURL(url);
}

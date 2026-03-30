export const state = {
  tickets: [],
  settings: {
    autoReply: true,
    sentiment: true,
    priority: true,
    threshold: 70
  }
};

export const ticketCounter = {
  value: 1000
};

export function clearState() {
  state.tickets = [];
  ticketCounter.value = 1000;
}

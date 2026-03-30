export const qs = (selector) => document.querySelector(selector);
export const qsa = (selector) => document.querySelectorAll(selector);

export const on = (element, event, handler) => {
  if (typeof element === 'string') {
    element = qs(element);
  }
  if (element) {
    element.addEventListener(event, handler);
  }
};

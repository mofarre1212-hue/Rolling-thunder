const keys = new Set();
const justPressed  = new Set();
const justReleased = new Set();

window.addEventListener('keydown', e => {
  if (!keys.has(e.code)) justPressed.add(e.code);
  keys.add(e.code);
  // Prevent arrow keys / space scrolling the page
  if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code)) {
    e.preventDefault();
  }
});

window.addEventListener('keyup', e => {
  keys.delete(e.code);
  justReleased.add(e.code);
});

export const input = {
  held(code)    { return keys.has(code); },
  pressed(code) { return justPressed.has(code); },
  released(code){ return justReleased.has(code); },
  // Call once per frame after all systems have read input
  flush() {
    justPressed.clear();
    justReleased.clear();
  }
};

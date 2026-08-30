let targetY = 0;
let currentY = 0;
let isRunning = false;

function update() {
  const diff = targetY - currentY;
  if (Math.abs(diff) < 0.5) {
    currentY = targetY;
    isRunning = false;
    return;
  }
  currentY += diff * 0.1;
  window.scrollTo(0, currentY);
  requestAnimationFrame(update);
}

function startLoop() {
  if (!isRunning) {
    isRunning = true;
    requestAnimationFrame(update);
  }
}

export function smoothScrollTo(y: number) {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  targetY = Math.max(0, Math.min(y, max));
  startLoop();
}

export function smoothScrollBy(delta: number) {
  smoothScrollTo(window.scrollY + delta);
}

export function syncScrollPosition() {
  // Call this to sync internal state with actual scroll (e.g. after browser jump)
  currentY = window.scrollY;
  targetY = currentY;
}

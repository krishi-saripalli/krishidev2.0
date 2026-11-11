export type DrawFrame = (context: CanvasRenderingContext2D, width: number, height: number, seconds: number) => void;
/** Mount one canvas; owns resize, visibility, reduced-motion and cleanup. */
export function mountCanvas(canvas: HTMLCanvasElement, draw: DrawFrame, height = 240) {
  const context = canvas.getContext('2d');
  if (!context) return () => {};
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const button = canvas.closest('figure')?.querySelector('button');
  let paused = reduced.matches, visible = false, frame = 0, previous = 0, elapsed = 0, width = 0;
  const paint = () => { context.clearRect(0, 0, width, height); draw(context, width, height, elapsed / 1000); };
  const tick = (now: number) => { elapsed += previous ? Math.min(now - previous, 50) : 0; previous = now; paint(); frame = requestAnimationFrame(tick); };
  const sync = () => {
    cancelAnimationFrame(frame); previous = 0; paint();
    if (visible && !document.hidden && !paused) frame = requestAnimationFrame(tick);
    if (button) { button.textContent = paused ? 'Play' : 'Pause'; button.setAttribute('aria-pressed', String(paused)); }
  };
  const resize = new ResizeObserver(() => {
    width = canvas.clientWidth; const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = width * dpr; canvas.height = height * dpr; context.setTransform(dpr, 0, 0, dpr, 0, 0); paint();
  });
  const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); });
  const toggle = () => { paused = !paused; sync(); };
  const motion = () => { paused = reduced.matches; sync(); };
  resize.observe(canvas); observer.observe(canvas); sync();
  button?.addEventListener('click', toggle); reduced.addEventListener('change', motion); document.addEventListener('visibilitychange', sync);
  return () => { cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect(); button?.removeEventListener('click', toggle); reduced.removeEventListener('change', motion); document.removeEventListener('visibilitychange', sync); };
}

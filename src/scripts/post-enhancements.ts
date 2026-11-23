// These enhancements are loaded only on article pages. The article itself is static HTML.
const article = document.querySelector<HTMLElement>('.prose');
if (article) {
  article.querySelectorAll<HTMLElement>('h2[id], h3[id]').forEach(heading => {
    const anchor = document.createElement('a');
    anchor.className = 'heading-anchor'; anchor.href = `#${heading.id}`; anchor.textContent = '#';
    anchor.setAttribute('aria-label', `Link to ${heading.textContent}`); heading.append(anchor);
  });
  article.querySelectorAll('table').forEach(table => {
    const wrapper = document.createElement('div'); wrapper.className = 'table-scroll'; wrapper.tabIndex = 0;
    wrapper.setAttribute('role', 'region'); wrapper.setAttribute('aria-label', 'Scrollable table');
    table.before(wrapper); wrapper.append(table);
  });
  const dialog = document.createElement('dialog'); dialog.className = 'image-dialog';
  const close = document.createElement('button'); close.textContent = 'Close ×'; close.addEventListener('click', () => dialog.close());
  const image = document.createElement('img'); dialog.append(close, image); document.body.append(dialog);
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  article.querySelectorAll<HTMLImageElement>('img').forEach(img => {
    if (img.closest('a')) return;
    const button = document.createElement('button'); button.className = 'image-zoom'; button.style.cssText = 'display:block;border:0;padding:0;background:transparent;width:100%';
    button.setAttribute('aria-label', `Enlarge image: ${img.alt}`);
    img.before(button); button.append(img);
    button.addEventListener('click', () => { image.src = img.currentSrc || img.src; image.alt = img.alt; dialog.showModal(); });
  });

  const diagrams = new IntersectionObserver(entries => {
    entries.filter(entry => entry.isIntersecting).forEach(async entry => {
      const element = entry.target as HTMLElement; diagrams.unobserve(element);
      const source = element.textContent ?? '';
      try {
        const { default: mermaid } = await import('mermaid');
        mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: 'base', themeVariables: { primaryColor: '#0f172a', primaryTextColor: '#ffffff', primaryBorderColor: '#b8bdc7', lineColor: '#ffffff', secondaryColor: '#0f172a', tertiaryColor: '#0f172a', textColor: '#ffffff', fontFamily: 'Lora Variable, Georgia, serif' } });
        const { svg } = await mermaid.render(`mermaid-${crypto.randomUUID()}`, source);
        element.innerHTML = svg;
      } catch { element.setAttribute('aria-label', 'Diagram source (could not render)'); }
    });
  }, { rootMargin: '200px' });
  article.querySelectorAll('[data-diagram]').forEach(element => diagrams.observe(element));
}

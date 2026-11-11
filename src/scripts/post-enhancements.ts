// These enhancements are loaded only on article pages. The article itself is static HTML.
const article = document.querySelector<HTMLElement>('.prose');
if (article) {
  article.querySelectorAll<HTMLElement>('h2[id], h3[id]').forEach(heading => {
    const anchor = document.createElement('a');
    anchor.className = 'heading-anchor'; anchor.href = `#${heading.id}`; anchor.textContent = '#';
    anchor.setAttribute('aria-label', `Link to ${heading.textContent}`); heading.append(anchor);
  });
  article.querySelectorAll<HTMLElement>('[data-rehype-pretty-code-figure]').forEach(figure => {
    const code = figure.querySelector('pre code');
    if (!code) return;
    const button = document.createElement('button'); button.className = 'copy-code'; button.textContent = 'Copy';
    button.setAttribute('aria-label', 'Copy code'); button.setAttribute('aria-live', 'polite');
    button.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(code.textContent ?? ''); button.textContent = 'Copied'; }
      catch { button.textContent = 'Select to copy'; }
      window.setTimeout(() => { button.textContent = 'Copy'; }, 2000);
    });
    figure.append(button);
  });
  article.querySelectorAll('table').forEach(table => {
    const wrapper = document.createElement('div'); wrapper.className = 'table-scroll'; wrapper.tabIndex = 0;
    wrapper.setAttribute('role', 'region'); wrapper.setAttribute('aria-label', 'Scrollable table');
    table.before(wrapper); wrapper.append(table);
  });
  // Keep original footnotes as the canonical keyboard/screen-reader navigation targets.
  const margin = document.querySelector<HTMLElement>('.sidenotes');
  const renderNotes = () => {
    if (!margin) return;
    margin.replaceChildren();
    if (!matchMedia('(min-width: 1101px)').matches) return;
    const top = article.getBoundingClientRect().top;
    let bottom = 0;
    const seen = new Set<string>();
    article.querySelectorAll<HTMLAnchorElement>('a[data-footnote-ref]').forEach(ref => {
      if (seen.has(ref.hash)) return;
      seen.add(ref.hash);
      const target = document.getElementById(decodeURIComponent(ref.hash.slice(1)));
      if (!target) return;
      const note = document.createElement('div'); note.className = 'sidenote'; note.setAttribute('aria-hidden', 'true');
      const number = document.createElement('span'); number.className = 'sidenote-number'; number.textContent = ref.textContent;
      note.append(number);
      target.childNodes.forEach(child => note.append(child.cloneNode(true)));
      note.querySelectorAll('[id]').forEach(child => child.removeAttribute('id'));
      note.querySelectorAll('[data-footnote-backref]').forEach(child => child.remove());
      note.querySelectorAll('a').forEach(link => link.tabIndex = -1);
      margin.append(note);
      const offset = Math.max(bottom, ref.getBoundingClientRect().top - top);
      note.style.top = `${offset}px`; bottom = offset + note.offsetHeight + 20;
    });
  };
  const resize = new ResizeObserver(renderNotes); resize.observe(article); document.fonts.ready.then(renderNotes);

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

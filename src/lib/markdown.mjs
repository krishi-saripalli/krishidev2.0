import { visit } from 'unist-util-visit';

/** @returns {import('hast').ElementContent[]} */
export function footnoteBackContent(_referenceIndex, occurrence) {
  const icon = {
    type: 'element',
    tagName: 'svg',
    properties: {
      className: ['footnote-back-icon'],
      viewBox: '0 0 32 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      ariaHidden: 'true',
      focusable: 'false',
    },
    children: [{
      type: 'element',
      tagName: 'path',
      properties: { d: 'M5 9h16a7 7 0 0 1 7 7v2M11 3 5 9l6 6' },
      children: [],
    }],
  };
  if (occurrence === 1) return [icon];
  return [icon, {
    type: 'element',
    tagName: 'sup',
    properties: {},
    children: [{ type: 'text', value: String(occurrence) }],
  }];
}

/** Keep Mermaid out of Shiki. Render diagrams only when they enter the viewport. */
export function rehypeDiagrams() {
  return tree => {
    visit(tree, 'element', node => {
      if (node.tagName !== 'pre') return;
      const code = node.children[0];
      if (code?.type !== 'element' || !code.properties?.className?.includes('language-mermaid')) return;
      node.tagName = 'div';
      node.properties = { className: ['diagram'], 'data-diagram': '' };
      code.properties = {};
      code.tagName = 'pre';
    });
  };
}

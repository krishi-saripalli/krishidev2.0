import { visit } from 'unist-util-visit';
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

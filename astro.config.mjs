import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import { rehypeDiagrams } from './src/lib/markdown.mjs';

export default defineConfig({
  site: process.env.SITE_URL,
  output: 'static',
  integrations: [mdx()],
  devToolbar: { enabled: false },
  markdown: {
    syntaxHighlight: false,
    processor: unified({
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeDiagrams, rehypeKatex, [rehypePrettyCode, {
      keepBackground: false,
      theme: {
        name: 'paper-white', type: 'dark',
        colors: { 'editor.background': '#0f172a', 'editor.foreground': '#ffffff' },
        tokenColors: [
          { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#a1a7b2', fontStyle: 'italic' } },
          { scope: ['keyword', 'storage'], settings: { foreground: '#ffffff', fontStyle: 'bold' } },
          { scope: ['string', 'constant'], settings: { foreground: '#d3d6dc' } },
        ],
      },
    }]],
    }),
  },
});

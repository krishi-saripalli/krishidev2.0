# Design and migration notes

## What Nathan's site does

Inspected https://nathan.rs/ and the source at https://github.com/nathanrs/nathan.rs during this migration.

- **Content:** Hugo reads Markdown in `content/posts/`. YAML frontmatter provides titles, dates, descriptions, tags, and optional hero assets. His homepage groups writing into featured, recent, and tag sections; `assets/home-search.js` filters the listing.
- **Assets:** stable media and scripts live in `static/`; stylesheet and enhancement entrypoints live in `assets/`. This is a separate-directory convention, rather than per-post bundles.
- **Math and code:** `hugo.toml` preserves math delimiters for KaTeX. Hugo/Chroma highlights code, and `layouts/_markup/render-codeblock.html` supplies optional filenames. A separate render hook supports Mermaid.
- **Animation:** `layouts/partials/docs/hero.html` dispatches images, looping video, and JavaScript canvas heroes. Newer posts contain additional named canvases. `static/js/post-anim.js` centralizes drawing helpers, theme colors, resize handling, and viewport-based starting; post-specific modules such as `weight-space-lp.js` supply the actual animation. Some modules import adjacent JSON traces. The gzip hero replays recorded output from a real run; it is not running a language model in the browser.
- **Reading helpers:** `assets/toc-scroll.js` handles contents navigation and `assets/post-enhancements.js` places footnotes in the desktop margin. Those are small purpose-built scripts, not a general animation framework.

Useful source links:

- https://github.com/nathanrs/nathan.rs/blob/main/hugo.toml
- https://github.com/nathanrs/nathan.rs/blob/main/layouts/partials/docs/hero.html
- https://github.com/nathanrs/nathan.rs/blob/main/static/js/post-anim.js
- https://github.com/nathanrs/nathan.rs/blob/main/assets/post-enhancements.js

These were architecture references. Nathan's article text, illustrations, and animation implementations were not copied.

## Choices for this site

The homepage remains blank at the owner's request. The existing Lora family is retained, including italics, and self-hosted with Fontsource. All surfaces share `oklch(20.8% 0.042 265.755)`; text, rules, and syntax highlighting use white and white-opacity variations. A lighter mix of the secondary `oklch(37.2% 0.044 257.287)` is used for readable dates. The Open Graph monogram uses a finely dotted `#64748b` outline. Navigation shares the page background.

Astro replaces Next.js entirely because the current site is a static publication. Markdown and MDX become HTML at build time. There is no React client runtime. Small vanilla scripts enhance the menu, copying, images, diagrams, and animations. A CMS, database, and application server would add overhead without helping the current authoring workflow.

Unlike the reference site, each post keeps its media and custom visual code alongside its text. Shared infrastructure lives in `src/`. Astro owns asset resolution and hashing, so there is no custom filesystem HTTP endpoint. Static output is host-independent.

The writing features cover the reference's core publishing experience: math, code, local images and video, bespoke canvas animations, Mermaid, dated post listings, heading links, footnotes and margin notes. This is not a byte-for-byte feature clone. Nathan's specific research animations, terminal-session recordings, theme toggle, external-link entries, and Git-derived edit history are not included. New bespoke visuals are authored per post.

## Cleanup

Removed Next.js, React, Tailwind, the typography plugin, class-merging utilities, old ESLint configuration, the second font, obsolete TypeScript paths, and the old fullscreen Game of Life implementation. Previous versions remain in Git history. Kept legacy public images to preserve archived post references, and moved the two originally unlisted articles to `content/archive/`; the content loader never reads that folder.

The content schema defaults new articles to drafts. `writing-lab` is a Git-ignored, local-only demonstration and is explicitly excluded from production content loading. Production builds contain no draft article routes. As with any static build, drafts are an editorial visibility feature, not a place to store credentials or private data.

## Hosting

Cloudflare Pages builds the `main` branch with `npm run build` and serves `dist/`. `.node-version` pins the build runtime. The build environment sets `SITE_URL=https://www.krishisaripalli.com` for canonical and social-image URLs. DNS and registration remain at Squarespace: `www` points to `krishisaripalli.pages.dev`, and the root domain forwards to `www` while preserving paths.

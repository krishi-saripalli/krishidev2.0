# Site architecture

Astro builds the site as static HTML. Posts live in `content/posts/`, with images, video, and custom components alongside each post. The production build includes published posts. `content/archive/` holds unpublished material outside the content collection.

Markdown and MDX support math, highlighted code, Mermaid diagrams, and footnotes. `src/scripts/post-enhancements.ts` handles code copying, image zoom, and margin notes. `src/lib/canvas.ts` provides shared canvas animation helpers.

Cloudflare Pages builds `main` with `npm run build` and serves `dist/`. `.node-version` pins Node, and `SITE_URL` sets the origin for canonical and social image URLs. Squarespace manages DNS and forwards the root domain to `www`.

import fs from 'node:fs';
import path from 'node:path';
const [slug, ...titleParts] = process.argv.slice(2);
if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error('Usage: npm run new:post -- my-post "My post title"'); process.exit(1);
}
const directory = path.resolve('content/posts', slug);
if (fs.existsSync(directory)) { console.error(`Already exists: ${directory}`); process.exit(1); }
fs.mkdirSync(directory, { recursive: true });
const title = titleParts.join(' ') || slug.replaceAll('-', ' ');
const date = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
fs.writeFileSync(path.join(directory, 'index.mdx'), `---\ntitle: ${JSON.stringify(title)}\ndescription: ""\ndate: ${date}\ntags: []\ndraft: true\nfeatured: false\n---\n\nStart writing here.\n`, { flag: 'wx' });
console.log(`Created ${path.relative(process.cwd(), directory)}/index.mdx (draft).`);

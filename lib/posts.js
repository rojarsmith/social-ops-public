import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

const POSTS_DIR = path.join(process.cwd(), 'posts');

// posts/<slug>.md with YAML front matter: title, date (YYYY-MM-DD), summary, tags, lang.
// Everything is read at build time; the exported site has no server.
export function listPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /^\d{4}-\d{2}-\d{2}-.*\.md$/.test(f))
    .map((f) => {
      const slug = f.replace(/\.md$/, '');
      const { data } = matter(fs.readFileSync(path.join(POSTS_DIR, f), 'utf8'));
      return { slug, ...normalize(data) };
    })
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug) {
  const file = path.join(POSTS_DIR, `${slug}.md`);
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  const html = String(await remark().use(remarkGfm).use(remarkHtml).process(content));
  return { slug, ...normalize(data), html };
}

function normalize(data) {
  return {
    title: data.title ?? '(untitled)',
    date: typeof data.date === 'string' ? data.date : toIso(data.date),
    summary: data.summary ?? '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    lang: data.lang ?? 'zh-TW',
    draft: Boolean(data.draft),
  };
}

function toIso(d) {
  return d instanceof Date ? d.toISOString().slice(0, 10) : '';
}

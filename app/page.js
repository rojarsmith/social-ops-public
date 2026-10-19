import Link from 'next/link';
import { listPosts } from '../lib/posts';
import { site } from '../lib/site';

export default function Home() {
  const posts = listPosts();
  return (
    <>
      <section className="intro">
        <h1>{site.title}</h1>
        <p>{site.description}</p>
      </section>
      <ul className="post-list">
        {posts.map((p) => (
          <li key={p.slug}>
            <time dateTime={p.date}>{p.date}</time>
            <h2><Link href={`/posts/${p.slug}/`}>{p.title}</Link></h2>
            <p>{p.summary}</p>
            {p.tags.length > 0 && (
              <p className="tags">{p.tags.map((t) => <span key={t}>#{t}</span>)}</p>
            )}
          </li>
        ))}
        {posts.length === 0 && <li>No posts yet.</li>}
      </ul>
    </>
  );
}

import Link from 'next/link';
import { getPost, listPosts } from '../../../lib/posts';

export const dynamicParams = false;

export function generateStaticParams() {
  return listPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/posts/${slug}/` },
    openGraph: { title: post.title, description: post.summary, type: 'article', publishedTime: post.date },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return (
    <article className="post">
      <p className="crumbs"><Link href="/">← All posts</Link></p>
      <h1>{post.title}</h1>
      <p className="meta">
        <time dateTime={post.date}>{post.date}</time>
        {post.tags.map((t) => <span key={t} className="tag">#{t}</span>)}
      </p>
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}

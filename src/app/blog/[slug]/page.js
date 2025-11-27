import { getPostBySlug, getAllPosts } from '@/lib/posts';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

// This tells Next.js what slugs exist (for static generation)
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return (
    <div className="min-h-screen bg-[var(--warm-white)]">
      <article className="max-w-3xl mx-auto bg-white p-8 md:p-12 my-12 rounded-xl" style={{ border: '2px solid var(--navy-blue)' }}>
        {/* Post Header */}
        <header className="mb-10 border-b border-[var(--warm-brown)]/20 pb-8">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-sans text-xs uppercase tracking-wider text-[var(--sky-blue)] font-semibold px-2 py-1 bg-[var(--sky-blue)]/10 rounded">
              {post.topic || post.category}
            </span>
            {post.type && (
              <span className="font-sans text-xs tracking-wider text-[var(--text-secondary)]">
                • {post.type}
              </span>
            )}
            <span className="text-[var(--text-secondary)] text-sm font-serif">{post.date}</span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[var(--soft-brown)] mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="font-serif text-xl text-[var(--text-secondary)] leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        {/* Post Content with custom components */}
        <div className="prose prose-lg max-w-none
                        prose-headings:font-serif prose-headings:font-bold prose-headings:text-[var(--soft-brown)]
                        prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
                        prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
                        prose-p:font-serif prose-p:text-[var(--text-primary)] prose-p:leading-relaxed prose-p:mb-4 prose-p:text-lg
                        prose-a:text-[var(--sky-blue)] prose-a:underline hover:prose-a:text-[var(--sunny-yellow)]
                        prose-strong:text-[var(--soft-brown)] prose-strong:font-semibold
                        prose-ul:my-4 prose-li:my-2 prose-li:font-serif prose-li:text-[var(--text-primary)]
                        prose-img:border prose-img:border-[var(--warm-brown)]/20">
          <ReactMarkdown
            components={{
              // Custom image renderer with border
              img: ({node, ...props}) => (
                <span className="block my-8">
                  <img
                    {...props}
                    className="w-full h-auto rounded-sm"
                    style={{
                      border: '2px solid var(--navy-blue)'
                    }}
                    loading="lazy"
                  />
                  {props.alt && (
                    <span className="block text-center text-sm text-[var(--text-secondary)] mt-3 italic font-serif">
                      {props.alt}
                    </span>
                  )}
                </span>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Back to blog link */}
        <div className="mt-12 pt-8 border-t border-[var(--warm-brown)]/20">
          <a href="/blog" className="font-sans text-sm text-[var(--sky-blue)] hover:text-[var(--sunny-yellow)] font-medium transition inline-flex items-center gap-2">
            <span>←</span> Back to all posts
          </a>
        </div>
      </article>
    </div>
  );
}
import { getPostBySlug, getAllPosts, formatDate } from '@/lib/posts';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { getTopicColor } from '@/lib/topicColors';

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
  const topicColor = getTopicColor(post.topic || post.category);

  return (
    <div className="min-h-screen bg-[var(--warm-white)]">
      <article className="max-w-3xl mx-auto bg-white p-8 md:p-12 my-12 rounded-xl relative" style={{ border: '2px solid var(--navy-blue)' }}>
        {/* Topic tag sticker */}
        <div
          className="absolute -top-4 -left-4 font-sans text-xs uppercase tracking-widest font-black px-4 py-2 shadow-lg z-10"
          style={{
            backgroundColor: topicColor.bg,
            color: topicColor.text,
            border: '2px solid var(--navy-blue)',
            transform: 'rotate(-3deg)'
          }}
        >
          {post.topic || post.category}
        </div>

        {/* Post Header */}
        <header className="mb-10 border-b border-[var(--warm-brown)]/20 pb-8">
          <div className="flex items-center gap-4 mb-6">
            {post.type && (
              <span className="font-sans text-xs tracking-wider text-[var(--text-secondary)]">
                {post.type}
              </span>
            )}
            <span className="text-[var(--text-secondary)] text-sm font-serif">• {formatDate(post.date)}</span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[var(--soft-brown)] mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="font-serif text-xl text-[var(--text-secondary)] leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        {/* Post Content with custom components */}
        <div className="prose prose-sm max-w-none
                        prose-headings:font-serif prose-headings:font-semibold prose-headings:text-[var(--soft-brown)]
                        prose-h2:text-xl prose-h2:mt-6 prose-h2:mb-3
                        prose-h3:text-lg prose-h3:mt-5 prose-h3:mb-2
                        prose-p:font-serif prose-p:text-[var(--text-primary)] prose-p:leading-7 prose-p:mb-4 prose-p:text-[15px]
                        prose-a:text-[var(--sky-blue)] prose-a:underline hover:prose-a:text-[var(--sunny-yellow)]
                        prose-strong:text-[var(--soft-brown)] prose-strong:font-semibold
                        prose-ul:my-3 prose-li:my-1 prose-li:font-serif prose-li:text-[var(--text-primary)] prose-li:text-[15px]
                        prose-img:border prose-img:border-[var(--warm-brown)]/20">
          <ReactMarkdown
            components={{
              // Custom image renderer with border
              img: ({node, ...props}) => (
                <span className="block my-5">
                  <img
                    {...props}
                    className="w-full h-auto rounded-sm max-w-sm mx-auto"
                    style={{
                      border: '2px solid var(--navy-blue)'
                    }}
                    loading="lazy"
                  />
                  {props.alt && (
                    <span className="block text-center text-xs text-[var(--text-secondary)] mt-2 italic font-serif">
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
          <a href="/" className="font-sans text-sm text-[var(--sky-blue)] hover:text-[var(--sunny-yellow)] font-medium transition inline-flex items-center gap-2">
            <span>←</span> Back to all posts
          </a>
        </div>
      </article>
    </div>
  );
}
import Link from 'next/link';
import { getAllPosts, getTopicsWithTypes, getPostsByArchive } from '@/lib/posts';
import TopicSidebar from '@/components/TopicSidebar';

export default function Blog() {
  const posts = getAllPosts();
  const topics = getTopicsWithTypes();
  const archives = getPostsByArchive();

  return (
    <div className="min-h-screen bg-[var(--warm-white)]">
      {/* Posts Listing with Sidebar */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            {/* Sidebar - LEFT of content */}
            <div className="hidden lg:block lg:w-64 flex-shrink-0">
              <div className="sticky top-6">
                <TopicSidebar topics={topics} archives={archives} />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 max-w-3xl">
              <div className="space-y-12">
                {posts.map((post) => (
                  <article
                    key={post.slug}
                    className="bg-white border border-[var(--warm-brown)]/20 p-8 md:p-10 hover:border-[var(--warm-gold)] transition-all group"
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <div>
                        {/* Metadata */}
                        <div className="flex items-center gap-4 mb-4">
                          <span className="font-sans text-xs uppercase tracking-wider text-[var(--sky-blue)] font-semibold px-2 py-1 bg-[var(--sky-blue)]/10 rounded">
                            {post.topic || post.category}
                          </span>
                          {post.type && (
                            <span className="font-sans text-xs tracking-wider text-[var(--text-secondary)]">
                              • {post.type}
                            </span>
                          )}
                          <span className="text-[var(--text-secondary)] text-sm font-serif">
                            {post.date}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--soft-brown)] mb-4 group-hover:text-[var(--warm-brown)] transition leading-tight">
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="font-serif text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                          {post.excerpt}
                        </p>

                        {/* Read More Link */}
                        <span className="font-sans text-sm text-[var(--sky-blue)] font-medium group-hover:text-[var(--sunny-yellow)] transition inline-flex items-center gap-2">
                          Read full post
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}

                {/* No posts message */}
                {posts.length === 0 && (
                  <div className="text-center py-16">
                    <p className="font-serif text-xl text-[var(--text-secondary)]">
                      No posts yet. Check back soon!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
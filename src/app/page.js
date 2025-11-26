import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function Home() {
  const posts = getAllPosts();
  const featuredPosts = posts.slice(0, 3); // Get 3 most recent posts

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[var(--cream)] border-b border-[var(--warm-brown)]/20">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-[var(--soft-brown)] mb-6 leading-tight">
            Welcome to My World
          </h1>
          <p className="font-serif text-xl md:text-2xl text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            A place where threads meet code, gardens bloom, and recipes come alive.
            Join me as I document my adventures in making, creating, and learning.
          </p>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="bg-[var(--warm-white)] py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-sans text-sm uppercase tracking-widest text-[var(--warm-brown)] mb-8 font-semibold">
            Recent Posts
          </h2>

          <div className="space-y-8">
            {featuredPosts.map((post, index) => (
              <article key={post.slug} className={`${index === 0 ? 'border-[var(--warm-brown)]/30 border-2' : 'border-[var(--warm-brown)]/20 border'} bg-white p-8 hover:border-[var(--warm-gold)] transition-all`}>
                <Link href={`/blog/${post.slug}`}>
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-sans text-xs uppercase tracking-wider text-[var(--warm-gold)] font-semibold">
                        {post.topic || post.category}
                      </span>
                      {post.type && (
                        <span className="font-sans text-xs tracking-wider text-[var(--text-secondary)]">
                          • {post.type}
                        </span>
                      )}
                      <span className="text-[var(--text-secondary)] text-sm">
                        {post.date}
                      </span>
                    </div>

                    <h3 className={`font-serif ${index === 0 ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'} font-bold text-[var(--soft-brown)] mb-3 hover:text-[var(--warm-brown)] transition leading-tight`}>
                      {post.title}
                    </h3>

                    <p className="font-serif text-lg text-[var(--text-secondary)] leading-relaxed mb-4">
                      {post.excerpt}
                    </p>

                    <span className="font-sans text-sm text-[var(--warm-brown)] font-medium hover:text-[var(--warm-gold)] transition">
                      Read more →
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/blog" className="inline-block font-sans text-sm uppercase tracking-wider bg-[var(--warm-gold)] text-[var(--soft-brown)] px-8 py-3 hover:bg-[var(--warm-brown)] hover:text-white transition font-semibold">
              View All Posts
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-[var(--cream)] py-16 border-t border-[var(--warm-brown)]/20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-sans text-sm uppercase tracking-widest text-[var(--warm-brown)] mb-8 font-semibold">
            Explore by Interest
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/blog" className="group bg-white border border-[var(--warm-brown)]/20 p-8 hover:border-[var(--dusty-rose)] hover:bg-[var(--dusty-rose)]/5 transition">
              <h3 className="font-sans text-xl font-bold text-[var(--soft-brown)] mb-2 group-hover:text-[var(--warm-brown)] transition">
                Sewing
              </h3>
              <p className="font-serif text-[var(--text-secondary)]">
                Patterns, projects & fabric finds
              </p>
            </Link>

            <Link href="/blog" className="group bg-white border border-[var(--warm-brown)]/20 p-8 hover:border-[var(--warm-gold)] hover:bg-[var(--warm-gold)]/5 transition">
              <h3 className="font-sans text-xl font-bold text-[var(--soft-brown)] mb-2 group-hover:text-[var(--warm-brown)] transition">
                Code
              </h3>
              <p className="font-serif text-[var(--text-secondary)]">
                Web dev & tech adventures
              </p>
            </Link>

            <Link href="/blog" className="group bg-white border border-[var(--warm-brown)]/20 p-8 hover:border-[var(--warm-brown)] hover:bg-[var(--warm-brown)]/5 transition">
              <h3 className="font-sans text-xl font-bold text-[var(--soft-brown)] mb-2 group-hover:text-[var(--warm-brown)] transition">
                Gardening
              </h3>
              <p className="font-serif text-[var(--text-secondary)]">
                Growing green & eating fresh
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

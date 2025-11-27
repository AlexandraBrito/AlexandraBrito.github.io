import Link from 'next/link';
import { getAllPosts, getTopicsWithTypes, getPostsByArchive, formatDate } from '@/lib/posts';
import TopicSidebar from '@/components/TopicSidebar';
import { getTopicColor } from '@/lib/topicColors';

// Generate consistent rotation based on post slug
const getRotation = (seed) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash;
  }
  const rotation = ((hash % 14) - 7); // -7 to +7 degrees
  return `${rotation}deg`;
};

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
              {/* <div className="sticky top-6"> */}
                <TopicSidebar topics={topics} archives={archives} />
              {/* </div> */}
            </div>

            {/* Main Content */}
            <div className="flex-1 max-w-3xl">
              <div className="space-y-12">
                {posts.map((post) => {
                  const topicColor = getTopicColor(post.topic || post.category);
                  const rotation = getRotation(post.slug);

                  return (
                  <article
                    key={post.slug}
                    className="bg-white p-8 md:p-10 transition-all group relative rounded-3xl overflow-visible"
                    style={{
                      border: '2px solid var(--navy-blue)'
                    }}
                  >
                    {/* Topic sticker badge */}
                    <div
                      className="absolute -top-3 -left-3 font-sans text-xs uppercase tracking-widest font-black px-4 py-2 shadow-lg transition-transform group-hover:scale-105 z-10"
                      style={{
                        transform: `rotate(${rotation})`,
                        backgroundColor: topicColor.bg,
                        color: topicColor.text,
                        border: '2px solid var(--navy-blue)'
                      }}
                    >
                      {post.topic || post.category}
                    </div>

                    {/* Corner image from post properties */}
                    {post.cornerImage && (
                      <div
                        className="absolute transition-transform"
                        style={{
                          width: `${post.cornerImageSize || 144}px`,
                          height: `${post.cornerImageSize || 144}px`,
                          bottom: `${-(post.cornerImageSize || 144) / 2 + 60}px`,
                          right: `${-(post.cornerImageSize || 144) / 2 + 60}px`,
                          transform: `rotate(${rotation.replace('-', '')})`,
                          transformOrigin: 'center',
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                        }}
                      >
                        <img
                          src={post.cornerImage}
                          alt=""
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}

                    <Link href={`/blog/${post.slug}`}>
                      <div className="flex gap-6">
                        {/* Content */}
                        <div className="flex-1">
                          {/* Metadata */}
                          <div className="flex items-center gap-4 mb-4">
                            {post.type && (
                              <span className="font-sans text-xs tracking-wider text-[var(--text-secondary)]">
                                {post.type}
                              </span>
                            )}
                            <span className="text-[var(--text-secondary)] text-sm font-serif">
                              • {formatDate(post.date)}
                            </span>
                          </div>

                          {/* Title */}
                          <h2 className="font-serif text-xl md:text-2xl font-bold text-[var(--navy-blue)] mb-2 group-hover:text-[#A2A655] transition truncate">
                            {post.title}
                          </h2>

                          {/* Excerpt */}
                          <p className="font-serif text-sm text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>

                          {/* Read More Link */}
                          <span className="font-sans text-sm text-[var(--sky-blue)] font-medium group-hover:text-[#A2A655] transition inline-flex items-center gap-2">
                            Read full post
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                          </span>
                        </div>

                        {/* Featured Image - Side */}
                        {post.featuredImage && (
                          <div className="flex-shrink-0">
                            <img
                              src={post.featuredImage}
                              alt={post.title}
                              className="w-40 h-40 object-cover rounded"
                            />
                          </div>
                        )}
                      </div>
                    </Link>
                  </article>
                  );
                })}

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
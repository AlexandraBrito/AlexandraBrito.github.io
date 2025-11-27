import Link from 'next/link';
import { getAllPosts, getTopicsWithTypes, getPostsByArchive } from '@/lib/posts';
import TopicSidebar from '@/components/TopicSidebar';

// Bold colors matching sidebar
const topicDoodles = {
  sewing: { emoji: '🧵', color: '#F9BBBC', bgColor: 'rgba(249, 187, 188, 0.15)' },
  code: { emoji: '💻', color: '#729DC7', bgColor: 'rgba(114, 157, 199, 0.15)' },
  gardening: { emoji: '🌱', color: '#A2A655', bgColor: 'rgba(162, 166, 85, 0.15)' },
  cooking: { emoji: '🍳', color: '#E87461', bgColor: 'rgba(232, 116, 97, 0.15)' },
  diy: { emoji: '🔨', color: '#FEC10F', bgColor: 'rgba(254, 193, 15, 0.15)' },
  life: { emoji: '✨', color: '#BBDFEE', bgColor: 'rgba(187, 223, 238, 0.15)' }
};

// Variations for random tag styling
const tagSizes = ['text-[10px]', 'text-[11px]', 'text-xs'];
const tagPaddings = ['px-3 py-1.5', 'px-3 py-2', 'px-3.5 py-2', 'px-4 py-2', 'px-4 py-2.5'];
const tagPositions = [
  { top: '-top-3', left: '-left-3', right: 'auto', bottom: 'auto' },
  { top: '-top-3', right: '-right-3', left: 'auto', bottom: 'auto' },
  { top: '-top-4', left: 'left-6', right: 'auto', bottom: 'auto' },
  { top: '-top-4', right: 'right-6', left: 'auto', bottom: 'auto' }
];

// Generate consistent but random-looking variations based on post slug
const getRandomStyle = (seed) => {
  // Simple hash function to generate consistent "random" values from string
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash;
  }

  const rotation = ((hash % 14) - 7); // -7 to +7 degrees
  const sizeIndex = Math.abs(hash % tagSizes.length);
  const paddingIndex = Math.abs((hash >> 2) % tagPaddings.length);
  const positionIndex = Math.abs((hash >> 6) % tagPositions.length);

  return {
    rotation: `${rotation}deg`,
    size: tagSizes[sizeIndex],
    padding: tagPaddings[paddingIndex],
    position: tagPositions[positionIndex]
  };
};

const getTopicDoodle = (topic, slug) => {
  const topicData = topicDoodles[topic?.toLowerCase()] || { emoji: '📌', color: '#8b6f47', bgColor: 'rgba(139, 111, 71, 0.15)' };
  const style = getRandomStyle(slug);
  return { ...topicData, ...style };
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
                  const doodle = getTopicDoodle(post.topic || post.category, post.slug);

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
                      className={`absolute ${doodle.position.top} ${doodle.position.left} ${doodle.position.right} ${doodle.position.bottom} font-sans ${doodle.size} uppercase tracking-widest font-black ${doodle.padding} shadow-lg transition-transform group-hover:scale-105 z-10`}
                      style={{
                        transform: `rotate(${doodle.rotation})`,
                        backgroundColor: doodle.color,
                        color: (post.topic === 'sewing' || post.topic === 'diy' || post.topic === 'life') ? '#472A1A' : 'white',
                        border: '2px solid #2c5282'
                      }}
                    >
                      {post.topic || post.category}
                    </div>

                    {/* Topic-related emoji/doodle */}
                    <div
                      className="absolute -bottom-3 -right-3 text-2xl opacity-80 transition-transform"
                      style={{
                        transform: `rotate(${parseInt(doodle.rotation) * -1}deg)`,
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                      }}
                    >
                      {doodle.emoji}
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <div className="flex gap-6">
                        {/* Content */}
                        <div className="flex-1">
                          {/* Metadata */}
                          <div className="flex items-center gap-4 mb-4">
                            <span className="font-sans text-xs uppercase tracking-wider text-[var(--text-secondary)]">
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
                          <h2 className="font-serif text-xl md:text-2xl font-bold text-[var(--soft-brown)] mb-2 group-hover:text-[var(--warm-brown)] transition truncate">
                            {post.title}
                          </h2>

                          {/* Excerpt */}
                          <p className="font-serif text-sm text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>

                          {/* Read More Link */}
                          <span className="font-sans text-sm text-[var(--sky-blue)] font-medium group-hover:text-[var(--sunny-yellow)] transition inline-flex items-center gap-2">
                            Read full post
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                          </span>
                        </div>

                        {/* Featured Image - Side (Substack style) */}
                        {post.featuredImage && (
                          <div className="flex-shrink-0">
                            <img
                              src={post.featuredImage}
                              alt={post.title}
                              className="w-48 h-32 object-cover"
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
import Link from 'next/link';
import { getAllCategories, getPostsByArchive } from '@/lib/posts';

export default function BlogSidebar() {
  const categories = getAllCategories();
  const archives = getPostsByArchive();

  return (
    <aside className="space-y-8">
      {/* Categories */}
      <div className="bg-white border border-[var(--warm-brown)]/20 p-6">
        <h3 className="font-sans text-sm uppercase tracking-widest text-[var(--warm-brown)] mb-4 font-semibold">
          Categories
        </h3>
        <ul className="space-y-2">
          {categories.map(category => (
            <li key={category.name}>
              <Link
                href={`/blog?category=${category.name}`}
                className="font-serif text-[var(--text-primary)] hover:text-[var(--warm-gold)] transition flex justify-between items-center group"
              >
                <span className="capitalize">{category.name}</span>
                <span className="text-[var(--text-secondary)] text-sm group-hover:text-[var(--warm-gold)]">
                  ({category.count})
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Archives */}
      <div className="bg-white border border-[var(--warm-brown)]/20 p-6">
        <h3 className="font-sans text-sm uppercase tracking-widest text-[var(--warm-brown)] mb-4 font-semibold">
          Archives
        </h3>
        <ul className="space-y-2">
          {archives.map(archive => (
            <li key={`${archive.year}-${archive.month}`}>
              <Link
                href={`/blog?archive=${archive.year}-${archive.month}`}
                className="font-serif text-[var(--text-primary)] hover:text-[var(--warm-gold)] transition flex justify-between items-center group"
              >
                <span>{archive.month} {archive.year}</span>
                <span className="text-[var(--text-secondary)] text-sm group-hover:text-[var(--warm-gold)]">
                  ({archive.posts.length})
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* About snippet */}
      <div className="bg-[var(--cream)] border border-[var(--warm-brown)]/20 p-6">
        <h3 className="font-sans text-sm uppercase tracking-widest text-[var(--warm-brown)] mb-3 font-semibold">
          About
        </h3>
        <p className="font-serif text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
          A place where threads meet code, gardens bloom, and recipes come alive.
        </p>
        <Link
          href="/about"
          className="font-sans text-xs uppercase tracking-wider text-[var(--warm-brown)] hover:text-[var(--warm-gold)] transition font-semibold"
        >
          Read more →
        </Link>
      </div>
    </aside>
  );
}

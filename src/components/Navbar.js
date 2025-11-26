import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-[var(--cream)] border-b border-[var(--warm-brown)]/20">
      <div className="max-w-5xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <Link href="/" className="font-sans text-2xl font-bold text-[var(--soft-brown)] hover:text-[var(--warm-brown)] transition">
            Alexandra Brito
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-8 font-sans text-base">
            <Link href="/" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
              Home
            </Link>
            <Link href="/about" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
              About
            </Link>
            <Link href="/blog" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
              Blog
            </Link>
            <Link href="/contact" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

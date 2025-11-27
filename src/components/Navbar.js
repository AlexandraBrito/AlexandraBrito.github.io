import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white" style={{ borderBottom: '2px solid var(--navy-blue)' }}>
      <div className="max-w-5xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <Link href="/" className="font-sans text-2xl font-bold text-[var(--navy-blue)] hover:text-[var(--sky-blue)] transition">
            Alexandra Brito
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-8 font-sans text-base">
            <Link href="/" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
              Blog
            </Link>
            <Link href="/about" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

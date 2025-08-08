'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-6 flex items-center justify-between rounded-full border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-white text-lg font-medium">⚛️ Priyank Shah</span>
          </div>
          <nav className="flex gap-8 text-sm text-white font-medium">
            <Link href="/" className="hover:text-purple-400 transition">Home</Link>
            <Link href="/about" className="hover:text-purple-400 transition">About</Link>
                        <Link href="/contact" className="hover:text-purple-400 transition">Contact</Link>
            <Link href="/resume" className="hover:text-purple-400 transition">Resume</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

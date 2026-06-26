'use client';

import ChatWidget from './ChatWidget';
import SkillsWheel from './SkillsWheel';

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-white dark:bg-zinc-950 px-10 py-16 pt-32 max-w-5xl mx-auto">

        <nav className="flex justify-between items-center mb-24 fixed top-0 left-0 right-0 z-50 bg-white dark:bg-zinc-950 px-10 py-4 shadow-sm">
          <div className="flex items-center gap-3">
            <img src="/sun.png" alt="sun" style={{ width: '64px', height: '64px', borderRadius: '50%' }} className="sun-spin" />
            <div className="flex flex-col">
              <span className="text-2xl text-zinc-900 dark:text-zinc-100 leading-tight" style={{ fontFamily: 'var(--font-carrois-gothic)' }}>Gamze</span>
              <span className="text-sm text-zinc-400 dark:text-zinc-500 tracking-tight">Product Designer and Strategist</span>
            </div>
          </div>
          <div className="flex gap-6 text-sm text-zinc-500 dark:text-zinc-400">
            <a href="#about" className="hover:text-amber-500 hover:font-bold transition-colors">About</a>
            <a href="/contact" className="hover:text-amber-500 hover:font-bold transition-colors">Contact</a>
          </div>
        </nav>



        <section id="work" className="mb-32 relative">
          <div style={{ position: 'absolute', left: '-160px', top: '-24px' }}>
            <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#f59e0b' }}>Selected work</p>
          </div>
          <p className="text-sm text-zinc-400 dark:text-zinc-500">Case studies coming soon.</p>
        </section>

        <SkillsWheel />

        <footer className="flex justify-between items-center text-sm text-zinc-400 dark:text-zinc-600">
          <span>© 2026 made by curiousity</span>
        </footer>

        <ChatWidget />
      </main>
    </>
  );
}
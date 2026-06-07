import Link from 'next/link';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-100 sticky top-0 z-50 bg-white">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-2xl">✨</span>
            <span className="text-lg font-light text-slate-900 tracking-wide">Petit Bond</span>
          </Link>
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-slate-600 hover:text-slate-900 transition-colors font-light text-sm"
            >
              作品集
            </Link>
            <Link
              href="/inquiry"
              className="px-5 py-2 text-sm font-light text-slate-700 border border-slate-300 rounded hover:border-slate-400 hover:text-slate-900 transition-colors"
            >
              預購詢問
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-slate-500 text-sm font-light">
            <p>© 2024 Petit Bond 手作寵物飾品</p>
            <p className="mt-3">每件都是獨一無二的故事 ✨</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

import Link from 'next/link';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-ivory flex flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-ivory/92 backdrop-blur-md border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-6 md:px-8 py-3 flex items-center justify-between flex-wrap gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-800 text-gold flex items-center justify-center font-cormorant font-bold text-lg tracking-wider">
              PB
            </div>
            <span className="font-cormorant text-2xl tracking-widest text-green-800 whitespace-nowrap">
              Petit Bond
            </span>
          </Link>

          {/* Menu */}
          <div className="flex items-center gap-4 md:gap-8 text-sm text-ink flex-wrap">
            <Link href="/" className="whitespace-nowrap hover:text-green-800 transition-colors">
              首頁
            </Link>
            <Link href="/shop?series=all" className="whitespace-nowrap hover:text-green-800 transition-colors">
              全部作品
            </Link>
            <Link href="/shop?series=classic" className="whitespace-nowrap hover:text-green-800 transition-colors">
              古典系列
            </Link>
            <Link href="/shop?series=couture" className="whitespace-nowrap hover:text-green-800 transition-colors">
              編織系列
            </Link>
            <Link href="/story" className="whitespace-nowrap hover:text-green-800 transition-colors">
              的故事
            </Link>
          </div>

          {/* CTA */}
          <Link
            href="/inquiry"
            className="bg-green-800 text-ivory text-sm tracking-widest px-6 py-3 rounded-full whitespace-nowrap hover:bg-green-700 transition-colors"
          >
            預購詢問
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-green-900 text-text-light border-t border-green-800">
        <div className="max-w-6xl mx-auto px-8 md:px-12 py-12 md:py-16">
          <div className="flex flex-wrap gap-12 md:gap-24 justify-between mb-12">
            {/* Brand */}
            <div className="flex-1 min-w-64">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-green-800 text-gold flex items-center justify-center font-cormorant text-sm border border-gold/40">
                  PB
                </div>
                <span className="font-cormorant text-2xl tracking-widest text-gold">
                  Petit Bond
                </span>
              </div>
              <p className="text-sm leading-relaxed max-w-sm">
                手作的珍珠串串 · 人寵飾品設計。你更溫柔，系更暖。
              </p>
            </div>

            {/* Links */}
            <div className="flex-0 basis-auto">
              <div className="text-xs tracking-widest uppercase text-gold mb-4">
                瀏覽
              </div>
              <div className="flex flex-col gap-3 text-sm">
                <Link href="/" className="hover:text-gold transition-colors">
                  全部作品
                </Link>
                <Link href="/shop?series=classic" className="hover:text-gold transition-colors">
                  古典系列
                </Link>
                <Link href="/shop?series=couture" className="hover:text-gold transition-colors">
                  編織系列
                </Link>
                <Link href="/story" className="hover:text-gold transition-colors">
                  的故事
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div className="flex-0 basis-auto">
              <div className="text-xs tracking-widest uppercase text-gold mb-4">
                聯繫
              </div>
              <div className="flex flex-col gap-3 text-sm">
                <Link href="#" className="hover:text-gold transition-colors">
                  Instagram
                </Link>
                <Link href="#" className="hover:text-gold transition-colors">
                  LINE 官方帳號
                </Link>
                <Link href="/inquiry" className="text-gold hover:text-gold-light transition-colors">
                  填寫預購詢問 →
                </Link>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-green-800 pt-5">
            <div className="text-xs text-text-muted">
              © 2026 Petit Bond · 手作珍珠串串
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Nav() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [menuOpen, setMenuOpen] = useState(false);

  const navKey = `${pathname}?${searchParams.toString()}`;
  const [prevNavKey, setPrevNavKey] = useState(navKey);
  if (navKey !== prevNavKey) {
    setPrevNavKey(navKey);
    setMenuOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navItems = [
    { label: '首頁', href: '/', active: pathname === '/' },
    { label: '全部商品', href: '/shop', active: pathname === '/shop' && !searchParams.get('series') },
    { label: '經典系列', href: '/shop?series=classic', active: pathname === '/shop' && searchParams.get('series') === 'classic' },
    { label: '編織系列', href: '/shop?series=couture', active: pathname === '/shop' && searchParams.get('series') === 'couture' },
    { label: '關於我們', href: '/story', active: pathname === '/story' },
  ];

  return (
    <>
      <div className="sticky top-0 z-50 bg-[#f8f4ea] border-b border-[#e8e0cc]">
        <div className="max-w-[1200px] mx-auto px-[clamp(18px,4vw,40px)] py-[14px] flex items-center justify-between gap-4">
          {/* Logo */}
          <div
            onClick={() => router.push('/')}
            className="flex items-center gap-[11px] cursor-pointer"
          >
            <div className="w-[38px] h-[38px] rounded-full bg-pb-green text-[#e4cd91] font-cormorant font-semibold text-base tracking-wider flex items-center justify-center shrink-0">
              PB
            </div>
            <span className="font-cormorant font-normal text-[22px] tracking-[0.22em] text-pb-green whitespace-nowrap">
              Petit Bond
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex font-noto-sans-tc items-center gap-[clamp(16px,2.6vw,32px)] text-[14px] text-[#3f3b31] font-medium">
            {navItems.map((item) => (
              <span
                key={item.href}
                onClick={() => router.push(item.href)}
                className={`cursor-pointer whitespace-nowrap pb-1 transition-colors ${
                  item.active
                    ? 'border-b-2 border-pb-green text-pb-green'
                    : 'hover:text-pb-green'
                }`}
              >
                {item.label}
              </span>
            ))}
          </div>

          {/* Desktop CTA */}
          <button
            onClick={() => router.push('/inquiry')}
            className="hidden md:block font-noto-sans-tc bg-pb-green text-[#f6efdd] text-[14px] tracking-widest px-[22px] py-[10px] rounded-full cursor-pointer whitespace-nowrap hover:shadow-lg hover:opacity-90 transition-all font-medium"
          >
            預購訂單
          </button>

          {/* Hamburger button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px] cursor-pointer"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="開啟選單"
          >
            <span
              style={{
                display: 'block',
                width: '24px',
                height: '2px',
                backgroundColor: 'var(--color-pb-green)',
                transition: 'transform 0.3s ease',
                transformOrigin: 'center',
                transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '24px',
                height: '2px',
                backgroundColor: 'var(--color-pb-green)',
                transition: 'opacity 0.3s ease',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: 'block',
                width: '24px',
                height: '2px',
                backgroundColor: 'var(--color-pb-green)',
                transition: 'transform 0.3s ease',
                transformOrigin: 'center',
                transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none',
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className="fixed top-0 right-0 z-50 h-full w-[280px] bg-[#f8f4ea] shadow-xl flex flex-col md:hidden"
        style={{
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
        }}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e8e0cc]">
          <span className="font-cormorant text-[20px] tracking-[0.18em] text-pb-green">Petit Bond</span>
          <button
            className="w-8 h-8 flex items-center justify-center text-[#3f3b31] hover:text-pb-green transition-colors"
            onClick={() => setMenuOpen(false)}
            aria-label="關閉選單"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <nav className="flex flex-col px-6 py-6 gap-1 font-noto-sans-tc text-[15px] font-medium text-[#3f3b31]">
          {navItems.map((item) => (
            <span
              key={item.href}
              onClick={() => router.push(item.href)}
              className={`cursor-pointer py-3 border-b border-[#ede6d3] transition-colors ${
                item.active ? 'text-pb-green' : 'hover:text-pb-green'
              }`}
            >
              {item.active && <span className="mr-2 text-pb-green">•</span>}
              {item.label}
            </span>
          ))}
        </nav>

        <div className="px-6 mt-auto pb-8">
          <button
            onClick={() => router.push('/inquiry')}
            className="w-full font-noto-sans-tc bg-pb-green text-[#f6efdd] text-[14px] tracking-widest py-[12px] rounded-full cursor-pointer hover:opacity-90 transition-all font-medium"
          >
            預購訂單
          </button>
        </div>
      </div>
    </>
  );
}

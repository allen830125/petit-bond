'use client';

import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function Nav() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className="sticky top-0 z-50 bg-[#f8f4ea] border-border-default">
      <div className="max-w-[1200px] mx-auto px-[clamp(18px,4vw,40px)] py-[14px] flex items-center justify-between gap-4 flex-wrap">
        <div
          onClick={() => router.push('/')}
          className="flex items-center gap-[11px] cursor-pointer"
        >
          <div className="w-[38px] h-[38px] rounded-full bg-pb-green text-[#e4cd91] font-cormorant font-semibold text-base tracking-wider flex items-center justify-center">
            PB
          </div>
          <span className="font-cormorant font-normal text-[22px] tracking-[0.22em] text-pb-green whitespace-nowrap">
            Petit Bond
          </span>
        </div>

        <div className="font-noto-sans-tc flex items-center gap-[clamp(16px,2.6vw,32px)] text-[14px] text-[#3f3b31] flex-wrap font-medium">
          <span
            onClick={() => router.push('/')}
            className={`cursor-pointer whitespace-nowrap pb-1 transition-colors ${
              pathname === '/'
                ? 'border-b-2 border-pb-green text-pb-green'
                : 'hover:text-pb-green'
            }`}
          >
            首頁
          </span>
          <span
            onClick={() => router.push('/shop')}
            className={`cursor-pointer whitespace-nowrap pb-1 transition-colors ${
              pathname === '/shop' && !searchParams.get('series')
                ? 'border-b-2 border-pb-green text-pb-green'
                : 'hover:text-pb-green'
            }`}
          >
            全部商品
          </span>
          <span
            onClick={() => router.push('/shop?series=classic')}
            className={`cursor-pointer whitespace-nowrap pb-1 transition-colors ${
              pathname === '/shop' && searchParams.get('series') === 'classic'
                ? 'border-b-2 border-pb-green text-pb-green'
                : 'hover:text-pb-green'
            }`}
          >
            經典系列
          </span>
          <span
            onClick={() => router.push('/shop?series=couture')}
            className={`cursor-pointer whitespace-nowrap pb-1 transition-colors ${
              pathname === '/shop' && searchParams.get('series') === 'couture'
                ? 'border-b-2 border-pb-green text-pb-green'
                : 'hover:text-pb-green'
            }`}
          >
            編織系列
          </span>
          <span
            onClick={() => router.push('/story')}
            className={`cursor-pointer whitespace-nowrap pb-1 transition-colors ${
              pathname === '/story'
                ? 'border-b-2 border-pb-green text-pb-green'
                : 'hover:text-pb-green'
            }`}
          >
            關於我們
          </span>
        </div>

        <button
          onClick={() => router.push('/inquiry')}
          className="font-noto-sans-tc bg-pb-green text-[#f6efdd] text-[14px] tracking-widest px-[22px] py-[10px] rounded-full cursor-pointer whitespace-nowrap hover:shadow-lg hover:opacity-90 transition-all font-medium"
        >
          預購訂單
        </button>
      </div>
    </div>
  );
}

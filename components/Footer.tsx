'use client'

import { useRouter } from 'next/navigation'

export default function Footer() {
  const router = useRouter()

  return (
    <div className="bg-pb-forest text-[#bcc7bb]">
      <div className="max-w-[1120px] mx-auto px-[clamp(24px,4vw,48px)] py-[clamp(44px,5vw,64px)] flex flex-wrap gap-9 justify-between">
        <div className="flex-1 min-w-[260px]">
          <div className="flex items-center gap-[11px] mb-4">
            <div className="w-9 h-9 rounded-full bg-pb-green text-[#e4cd91] font-cormorant text-[15px] flex items-center justify-center border border-[rgba(198,162,90,.4)]">
              PB
            </div>
            <span className="font-cormorant text-[22px] tracking-widest text-[#e4cd91]">
              Petit Bond
            </span>
          </div>
          <p className="font-noto-sans-tc text-[13.5px] leading-relaxed max-w-[300px]">
            手做的珍珠手串品 · 人寵物配飾護理。你更重視，珍更溫情。
          </p>
        </div>

        <div className="flex-shrink font-noto-sans-tc">
          <div className="font-cormorant text-[12px] tracking-widest text-[#d6bd84] mb-[14px] font-medium uppercase">
            商品
          </div>
          <div className="flex flex-col gap-[10px] text-[14px]">
            <span
              onClick={() => router.push('/shop')}
              className="cursor-pointer hover:text-[#e4cd91] transition-colors"
            >
              全部商品
            </span>
            <span
              onClick={() => router.push('/shop?series=classic')}
              className="cursor-pointer hover:text-[#e4cd91] transition-colors"
            >
              經典系列
            </span>
            <span
              onClick={() => router.push('/shop?series=couture')}
              className="cursor-pointer hover:text-[#e4cd91] transition-colors"
            >
              編織系列
            </span>
            <span
              onClick={() => router.push('/story')}
              className="cursor-pointer hover:text-[#e4cd91] transition-colors"
            >
              關於我們
            </span>
          </div>
        </div>

        <div className="flex-shrink font-noto-sans-tc">
          <div className="font-cormorant text-[12px] tracking-widest text-[#d6bd84] mb-[14px] font-medium uppercase">
            聯絡
          </div>
          <div className="flex flex-col gap-[10px] text-[14px]">
            <span className="cursor-pointer hover:text-[#e4cd91] transition-colors">
              Instagram
            </span>
            <span className="cursor-pointer hover:text-[#e4cd91] transition-colors">
              LINE 官方帳號
            </span>
            <span
              onClick={() => router.push('/inquiry')}
              className="cursor-pointer text-[#e4cd91] hover:text-[#e4cd91] transition-colors"
            >
              填寫預購訂單 →
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-[rgba(198,162,90,.18)]">
        <div className="font-noto-sans-tc max-w-[1120px] mx-auto px-[clamp(24px,4vw,48px)] py-[18px] text-[12px] text-[#7d8a7c]">
          © 2026 Petit Bond · 手做的珍珠手串品
        </div>
      </div>
    </div>
  )
}

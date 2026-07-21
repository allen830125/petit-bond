'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { useRequest } from '@/lib/hooks';
import { Product } from '@/lib/products';

export default function HomePage() {
  const router = useRouter();
  const { data: products = [] } = useRequest<Product[]>('/api/products/public');

  return (
    <div>
      {/* ===== HERO ===== */}
      <div className="bg-pb-forest text-cream-200 overflow-hidden">
        <div className="max-w-[1200px] mx-auto flex flex-wrap items-stretch">
          <div className="flex-1 basis-[420px] px-[clamp(24px,4vw,64px)] py-[clamp(48px,6vw,88px)] flex flex-col justify-center">
            <div className="font-cormorant italic text-[clamp(15px,1.6vw,18px)] text-gold-400 tracking-widest mb-[18px]">
              Handmade pearl beadwork
            </div>
            <h1 className="font-serif font-semibold text-[clamp(40px,6vw,60px)] leading-[1.26] text-cream-200 mb-2">
              你更重視
              <br />
              珍更溫情
            </h1>
            <div className="w-14 h-px bg-gold-500 my-6" />
            <p className="font-noto-sans-tc text-sage-300 text-[clamp(14px,1.5vw,16px)] leading-relaxed max-w-[380px] mb-9">
              一件件手工串起的珍珠與天然晶石，陪伴你與孩子們，看得到小小美麗。
            </p>
            <div className="flex gap-[14px] flex-wrap">
              <button
                onClick={() => router.push('/shop')}
                className="cursor-pointer text-pb-green font-medium text-[14px] tracking-widest px-8 py-[15px] rounded-sm hover:opacity-90 transition-opacity"
                style={{
                  backgroundImage: 'linear-gradient(135deg, var(--color-gold-300), var(--color-gold-500))',
                }}
              >
                探索精選系列
              </button>
              <button
                onClick={() => router.push('/story')}
                className="cursor-pointer border border-gold-500/50 text-gold-300 text-[14px] tracking-widest px-7 py-[15px] rounded-sm hover:bg-gold-500/10 transition-colors"
              >
                品牌故事
              </button>
            </div>
          </div>
          <div className="flex-1 basis-[380px] relative bg-black min-h-[380px]">
            <Image
              src="/images/pouch-bracelet.jpg"
              alt="珍珠 溫情"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-[18px] border border-gold-300/35 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ===== PAIR STORY BAND ===== */}
      <div className="bg-cream-100">
        <div className="max-w-[1120px] mx-auto px-[clamp(24px,4vw,48px)] py-[clamp(56px,7vw,96px)] flex flex-wrap gap-[clamp(32px,5vw,72px)] items-center">
          <div className="flex-1 basis-[300px] relative">
            <Image
              src="/images/board.jpg"
              alt="是孩子的配飾"
              width={400}
              height={500}
              className="w-full rounded-card-lg shadow-[0_30px_60px_-34px_rgba(30,50,40,.45)]"
            />
          </div>
          <div className="flex-1 basis-[340px]">
            <div className="inline-block bg-sage-100 text-forest-600 text-xs tracking-widest px-4 py-[7px] rounded-pill mb-[22px]">
              人寵物配飾 · 新品系列
            </div>
            <h2 className="font-serif font-semibold text-[clamp(28px,3.6vw,40px)] leading-[1.4] text-taupe-800 mb-5">
              為你和孩子
              <br />
              串一條溫暖的小飾品
            </h2>
            <p className="font-noto-sans-tc text-taupe-600 text-[clamp(14px,1.5vw,16px)] leading-[2.05] max-w-[440px] mb-[18px]">
              每一條都是我用。你的寵愛與孩子們共用一串戲──用不同方式串起自己──就是你與孩子一起用不了的記憶。
            </p>
            <p className="font-noto-sans-tc text-taupe-500 text-[13.5px] leading-[1.9]">
              Petit
              Bond，源自法文「小小的美麗」。以珍珠為起點，任何陪伴你的寵物都能看得。
            </p>
          </div>
        </div>
      </div>

      {/* ===== FEATURED PRODUCTS ===== */}
      <div className="bg-cream-50 border-t border-gold-400">
        <div className="max-w-[1200px] mx-auto px-[clamp(20px,4vw,48px)] py-[clamp(56px,7vw,90px)]">
          <div className="text-center mb-12">
            <div className="text-xs tracking-[0.26em] uppercase text-taupe-400 mb-3">
              Featured
            </div>
            <h2 className="font-serif font-semibold text-[clamp(26px,3.4vw,36px)] text-taupe-800">
              精選商品
            </h2>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[clamp(20px,3vw,34px)]">
            {(products || []).map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>

      {/* ===== TWO SERIES ===== */}
      <div className="bg-cream-100">
        <div className="max-w-[1120px] mx-auto px-[clamp(20px,4vw,48px)] py-[clamp(48px,6vw,80px)] grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          <div
            onClick={() => router.push('/shop?series=classic')}
            className="cursor-pointer bg-cream-50 border border-cream-500 rounded-[16px] px-[34px] py-[38px] hover:shadow-md transition-shadow"
          >
            <div className="font-cormorant text-[15px] tracking-widest uppercase text-taupe-400 mb-[10px]">
              Classic
            </div>
            <h3 className="font-serif text-[26px] text-pb-green mb-3">
              經典系列
            </h3>
            <p className="font-noto-sans-tc text-taupe-600 text-[14.5px] leading-[1.95] mb-[18px]">
              以珍珠為基點，搭配天然晶石的優雅串設計。柔和，優雅，適合日常配戴。
            </p>
            <span className="text-[13px] text-pb-green border-b border-gold-500 pb-[3px] hover:text-forest-500">
              查看經典系列 →
            </span>
          </div>

          <div
            onClick={() => router.push('/shop?series=couture')}
            className="cursor-pointer bg-pb-green text-cream-200 rounded-[16px] px-[34px] py-[38px] hover:shadow-md transition-shadow"
          >
            <div className="font-cormorant text-[15px] tracking-widest uppercase text-gold-400 mb-[10px]">
              Couture
            </div>
            <h3 className="font-serif text-[26px] text-cream-200 mb-3">
              編織系列
            </h3>
            <p className="font-noto-sans-tc text-sage-300 text-[14.5px] leading-[1.95] mb-[18px]">
              親手編織珍珠手串，以編織美感呈現尖銳迭起的花紋，是更講究的名品之選。
            </p>
            <span className="text-[13px] text-gold-300 border-b border-gold-500 pb-[3px] hover:text-gold-400">
              查看編織系列 →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';

interface Product {
  id: string;
  series: 'classic' | 'couture';
  seriesName: string;
  name: string;
  sub: string;
  bracelet: number;
  necklace: number;
  pair: number;
  img: string;
  desc: string;
  stones: string[];
}

const PRODUCTS: Product[] = [
  {
    id: 'bichuan',
    series: 'classic',
    seriesName: '古典系列',
    name: '碧玆',
    sub: '珍珠 × 墨綠 玻璃',
    bracelet: 1180,
    necklace: 1480,
    pair: 2380,
    img: '/images/necklace-frame.jpg',
    desc: '以淡水珍珠為主線，搭配以墨綠 玻璃與細膩的金色黑鎳，洋溢如部分詩意的溫柔。每個系列裡有著珍珠的日常款。',
    stones: ['淡水珍珠', '墨綠 玻璃', '14K 金電鍍配件'],
  },
  {
    id: 'caishi',
    series: 'classic',
    seriesName: '古典系列',
    name: '彩釋',
    sub: '珍珠 × 多彩天然石',
    bracelet: 1280,
    necklace: 1580,
    pair: 2580,
    img: '/images/board.jpg',
    desc: '珍珠乎與天然天然石──翠綠、黑玉、金色與紫色，勻整座身上展示座上賓賓。',
    stones: ['淡水珍珠', '翠綠', '黑玉', '金色石'],
  },
  {
    id: 'zhicui',
    series: 'couture',
    seriesName: '編織系列',
    name: '翠翠',
    sub: '珍珠編織 × 石榴石花芯',
    bracelet: 1480,
    necklace: 1880,
    pair: 2980,
    img: '/images/pouch-bracelet.jpg',
    desc: '流行珍珠手工編織，中央以石榴石花芯襯托，特彩而立高，每個系列裡有著罕見的珠飾之選。',
    stones: ['淡水珍珠', '石榴石花芯', '紅鑽珠石'],
  },
  {
    id: 'nuanyang',
    series: 'couture',
    seriesName: '編織系列',
    name: '暖陽',
    sub: '珍珠編織 × 黑水晶',
    bracelet: 1380,
    necklace: 1780,
    pair: 2780,
    img: '/images/dog-display.jpg',
    desc: '珍珠編織帶入溫層色黑水晶，溫潤亮麗，日常配戴溫雅適閒品味。',
    stones: ['淡水珍珠', '黑水晶', '金電鍍配件'],
  },
];

export default function HomePage() {
  const formatPrice = (price: number) => `NT$${price.toLocaleString()}`;

  return (
    <div className="bg-ivory min-h-screen">
      {/* ================= HERO SECTION ================= */}
      <section className="bg-green-900 text-ivory overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-wrap items-stretch">
          {/* Left */}
          <div className="flex-1 min-w-96 px-8 md:px-16 py-16 md:py-24 flex flex-col justify-center">
            <div className="font-cormorant italic text-sm md:text-base text-gold-muted tracking-wider mb-6">
              Handmade pearl beadwork
            </div>
            <h1 className="font-noto-serif-tc font-semibold text-5xl md:text-6xl leading-tight text-ivory mb-6">
              你更柔<br />系更暖
            </h1>
            <div className="w-14 h-px bg-gold my-6" />
            <p className="text-text-light text-lg leading-loose max-w-lg mb-8">
              一件件手工串起的珍珠 與天然石，讓你與寵物的溫感感，可愛到不行。
            </p>
            <div className="flex gap-4 flex-wrap">
              <button className="btn-gold-gradient px-8 py-4 rounded-sm text-sm tracking-widest font-medium">
                探索作品系列
              </button>
              <button className="border border-gold/50 text-gold px-7 py-4 rounded-sm text-sm tracking-widest">
                的故事
              </button>
            </div>
          </div>

          {/* Right - Hero Image */}
          <div className="flex-1 min-w-96 relative bg-black">
            <img
              src="/images/necklace-frame.jpg"
              alt="珍珠項鏈框架"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-4 border border-gold/35 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ================= PAIR STORY BAND ================= */}
      <section className="bg-ivory py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-8 md:px-12 flex flex-wrap gap-8 md:gap-16 items-center">
          {/* Image */}
          <div className="flex-1 min-w-80">
            <div className="rounded-3xl overflow-hidden bg-photo">
              <img
                src="/images/dog-display.jpg"
                alt="寵物飾品展示"
                className="w-full aspect-square object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 min-w-80">
            <div className="inline-block bg-green-700 bg-opacity-20 text-green-700 text-xs tracking-widest px-4 py-2 rounded-full mb-6">
              人寵綁定 · 系貨珍珠
            </div>
            <h2 className="font-noto-serif-tc font-semibold text-4xl md:text-5xl leading-tight text-ink mb-6">
              為你喜樂，<br />
              一串一串小屬於珍珠
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-4">
              任何一串都是我的。你的滋味，與珍珠古蹟，用不同方向珍珠石作製成──更是您珠繪，就是你與寵物共用了的記念。
            </p>
            <p className="text-text-muted text-base leading-relaxed">
              Petit Bond，取自於法文「小的連繫」。任何親伴你的狗狗都能夠得到。
            </p>
          </div>
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="bg-ivory-card border-t border-gray-200 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-8 md:px-12">
          <div className="text-center mb-12">
            <div className="text-xs tracking-widest uppercase text-gold mb-3">Featured</div>
            <h2 className="font-noto-serif-tc font-semibold text-4xl md:text-5xl text-ink">
              精選作品
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {PRODUCTS.map((product) => (
              <Link
                key={product.id}
                href={`/shop/${product.id}`}
                className="group cursor-pointer"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-square bg-photo mb-4">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-green-900/82 text-gold text-xs tracking-widest px-3 py-1 rounded-full">
                    {product.seriesName}
                  </span>
                </div>

                <div className="px-2">
                  <h3 className="font-noto-serif-tc text-2xl text-ink mb-2">
                    {product.name}
                  </h3>
                  <p className="text-text-muted text-sm mb-3">{product.sub}</p>
                  <p className="text-ink font-medium text-sm">
                    {formatPrice(Math.min(product.bracelet, product.necklace))} 起
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TWO SERIES ================= */}
      <section className="bg-ivory py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-8 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Classic Series */}
            <Link
              href="/shop?series=classic"
              className="cursor-pointer bg-ivory-card border border-gray-200 rounded-2xl p-8 md:p-10 hover:shadow-lg transition-shadow"
            >
              <div className="font-cormorant text-sm tracking-widest uppercase text-gold mb-3">
                Classic
              </div>
              <h3 className="font-noto-serif-tc text-3xl text-green-800 mb-4">
                古典系列
              </h3>
              <p className="text-text-secondary leading-relaxed mb-6 text-base">
                以珍珠為底線基調，搭配天然石與金色黑鎳，洋溢如部分詩意的溫柔。
              </p>
              <span className="text-sm text-green-800 border-b border-gold pb-1 inline-block">
                看古典系列 →
              </span>
            </Link>

            {/* Couture Series */}
            <Link
              href="/shop?series=couture"
              className="cursor-pointer bg-green-800 text-ivory rounded-2xl p-8 md:p-10 hover:shadow-lg transition-shadow"
            >
              <div className="font-cormorant text-sm tracking-widest uppercase text-gold-light mb-3">
                Couture
              </div>
              <h3 className="font-noto-serif-tc text-3xl text-ivory mb-4">
                編織系列
              </h3>
              <p className="text-text-light leading-relaxed mb-6 text-base">
                同樣以珍珠為線，以編織手藝與特別花樣得高起的花朵，更是為特貴的珠飾之選。
              </p>
              <span className="text-sm text-gold-light border-b border-gold pb-1 inline-block">
                看編織系列 →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

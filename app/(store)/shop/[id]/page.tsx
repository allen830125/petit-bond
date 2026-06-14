'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { PRODUCTS, Variant, fmt } from '@/lib/products';

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const product = PRODUCTS.find((p) => p.id === id);
  const [variant, setVariant] = useState<Variant>('pair');

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-taupe-600">商品未找到</p>
      </div>
    );
  }

  const getPrice = () => {
    switch (variant) {
      case 'bracelet':
        return product.bracelet;
      case 'necklace':
        return product.necklace;
      case 'pair':
        return product.pair;
    }
  };

  const variantOptions = [
    { value: 'bracelet', label: '人款手鏈', price: product.bracelet },
    { value: 'necklace', label: '寵款項鍊', price: product.necklace },
    { value: 'pair', label: '成對組 ♡', price: product.pair },
  ];

  return (
    <div className="bg-cream-100 min-h-screen">
      <div className="max-w-[1120px] mx-auto px-[clamp(20px,4vw,48px)] py-[clamp(48px,6vw,80px)]">
        {/* BREADCRUMB */}
        <button
          onClick={() => router.back()}
          className="font-noto-sans-tc cursor-pointer text-taupe-600 text-sm mb-8 hover:text-taupe-800 transition-colors"
        >
          ← 回到全部商品
        </button>

        {/* PRODUCT DETAIL */}
        <div className="flex flex-wrap gap-[clamp(32px,5vw,72px)] items-start">
          {/* LEFT: IMAGE */}
          <div className="flex-1 basis-[320px]">
            <div className="relative rounded-[18px] overflow-hidden aspect-[4/5] bg-taupe-300">
              <Image
                src={product.image || '/placeholder.jpg'}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* RIGHT: DETAILS */}
          <div className="flex-1 basis-[340px]">
            <div className="font-cormorant text-xs tracking-widest text-taupe-400 mb-4 uppercase font-medium">
              {product.seriesName}
            </div>

            <h1 className="font-serif font-semibold text-[clamp(28px,4vw,44px)] text-taupe-800 mb-2 font-medium">
              {product.name}
            </h1>

            <p className="font-noto-sans-tc text-taupe-600 text-[13.5px] mb-6">{product.sub}</p>

            {/* PRICE */}
            <div className="font-cormorant text-[30px] text-pb-green font-semibold mb-8 tracking-wider">
              {fmt(getPrice())}
            </div>

            {/* VARIANT SELECTION */}
            <div className="mb-8">
              <p className="font-noto-sans-tc text-sm text-taupe-600 mb-4 font-medium">選擇款式</p>
              <div className="flex flex-wrap gap-3">
                {variantOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setVariant(opt.value as Variant)}
                    className={`font-noto-sans-tc cursor-pointer px-5 py-3 rounded-[12px] text-[13px] tracking-wider transition-all font-medium ${
                      variant === opt.value
                        ? 'bg-pb-green text-cream-200 font-semibold'
                        : 'bg-cream-50 border border-taupe-300 text-taupe-700 hover:border-taupe-500'
                    }`}
                  >
                    {opt.label}
                    <br />
                    <span className="text-[11px] opacity-90">{fmt(opt.price)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* ADD TO PRE-ORDER BUTTON */}
            <button
              onClick={() =>
                router.push(
                  `/inquiry?productId=${product.id}&variant=${variant}`
                )
              }
              className="font-noto-sans-tc cursor-pointer w-full bg-pb-green text-cream-200 py-[15px] rounded-pill font-medium text-[14px] tracking-widest hover:shadow-lg transition-all mb-8"
            >
              加入預購單
            </button>

            {/* DIVIDER */}
            <div className="border-t border-taupe-300 pt-8 mt-8">
              {/* DESCRIPTION */}
              <div className="mb-8">
                <p className="font-noto-sans-tc text-taupe-600 text-[clamp(14px,1.5vw,16px)] leading-[2]">
                  {product.description}
                </p>
              </div>

              {/* STONES/MATERIALS */}
              <div>
                <p className="font-cormorant text-xs tracking-widest text-taupe-400 mb-4 uppercase font-medium">
                  用料
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.stones.map((stone, i) => (
                    <span
                      key={i}
                      className="font-noto-sans-tc bg-[#f1ece0] text-taupe-700 text-[12px] px-4 py-[6px] rounded-pill whitespace-nowrap"
                    >
                      {stone}
                    </span>
                  ))}
                </div>
              </div>

              {/* CUSTOMIZATION NOTE */}
              <p className="font-noto-sans-tc text-[12px] text-taupe-500 mt-8 leading-relaxed">
                所有商品均為手工製作，可客製化長度、配色等細節。聯絡我們瞭解更多客製選項。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS } from '@/lib/products';

export default function ShopPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const series = searchParams.get('series') || 'all';

  const filtered =
    series === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.series === series);

  const handleFilterChange = (newSeries: string) => {
    if (newSeries === 'all') {
      router.push('/shop');
    } else {
      router.push(`/shop?series=${newSeries}`);
    }
  };

  return (
    <div className="bg-cream-100">
      {/* HEADER */}
      <div className="max-w-[1120px] mx-auto px-[clamp(20px,4vw,48px)] py-[clamp(56px,7vw,96px)]">
        <div className="text-center mb-12">
          <div className="font-cormorant text-xs tracking-[0.26em] uppercase text-taupe-400 mb-3">
            Shop all
          </div>
          <h1 className="font-serif font-semibold text-[clamp(26px,3.4vw,40px)] text-taupe-800">
            全部手作
          </h1>
        </div>

        {/* FILTER CHIPS */}
        <div className="flex justify-center gap-3 flex-wrap mb-12">
          {[
            { value: 'all', label: '全部' },
            { value: 'classic', label: '單珠系列' },
            { value: 'couture', label: '編織系列' },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => handleFilterChange(filter.value)}
              className={`font-noto-sans-tc cursor-pointer text-[13.5px] tracking-widest px-6 py-2 rounded-pill transition-all font-medium ${
                series === filter.value
                  ? 'bg-pb-green text-cream-200 font-medium'
                  : 'bg-transparent border border-taupe-300 text-taupe-600 hover:border-taupe-500'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="max-w-[1120px] mx-auto px-[clamp(20px,4vw,48px)] pb-[clamp(56px,7vw,96px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[clamp(20px,3vw,34px)]">
          {filtered.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product, fmt } from '@/lib/products';

type ProductCardProps = Product;

export default function ProductCard(props: ProductCardProps) {
  const priceFrom = Math.min(props.bracelet, props.necklace);

  return (
    <Link href={`/shop/${props.id}`} className="cursor-pointer">
      <div className="relative rounded-card overflow-hidden aspect-[4/5] bg-bg-photo">
        <Image
          src={props.img}
          alt={props.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span className="absolute top-3 left-3 bg-[rgba(15,44,32,.82)] text-[#e4cd91] text-[11px] tracking-widest px-3 py-[5px] rounded-pill">
          {props.seriesName}
        </span>
      </div>
      <div className="pt-4 px-1">
        <div className="font-serif text-[19px] text-[#26241c] mb-[3px]">
          {props.name}
        </div>
        <div className="text-[13px] text-[#8a8576] mb-2">{props.sub}</div>
        <div className="text-[14px] text-pb-green">{fmt(priceFrom)} 起</div>
      </div>
    </Link>
  );
}

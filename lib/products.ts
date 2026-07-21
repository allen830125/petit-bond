export type ProductImage = {
  id: string;
  url: string;
  order: number;
};

export type Product = {
  id: string;
  series: string;
  seriesName: string;
  name: string;
  sub: string;
  images: ProductImage[];
  bracelet: number;
  necklace: number;
  pair: number;
  description: string;
  stones: string[];
};

export type Variant = 'bracelet' | 'necklace' | 'pair';

export const fmt = (n: number) => 'NT$' + n.toLocaleString();

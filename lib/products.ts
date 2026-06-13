export type Product = {
  id: string
  series: 'classic' | 'couture'
  seriesName: string
  name: string
  sub: string
  img: string
  bracelet: number
  necklace: number
  pair: number
  desc: string
  stones: string[]
}

export const PRODUCTS: Product[] = [
  {
    id: 'bichuan',
    series: 'classic',
    seriesName: '經典系列',
    name: '碧川',
    sub: '淡水珍珠 × 墨綠 尖晶',
    img: '/images/necklace-frame.jpg',
    bracelet: 1180,
    necklace: 1480,
    pair: 2380,
    desc:
      '以淡水珍珠為主串，搭以墨綠 尖晶點綴優雅氣場，柔和卻俐落的氣質彰顯個性。是系列裡最經典的日常款。',
    stones: ['淡水珍珠', '墨綠 尖晶', '14K 金飾件'],
  },
  {
    id: 'caishi',
    series: 'classic',
    seriesName: '經典系列',
    name: '彩石',
    sub: '淡水珍珠 × 五彩天然石',
    img: '/images/board.jpg',
    bracelet: 1280,
    necklace: 1580,
    pair: 2580,
    desc:
      '珍珠 九顆串夾 五彩天然石──蒼白、黑玉、金黃和牙白，卻譜出一座坐鎮整個人身上。',
    stones: ['淡水珍珠', '蒼白', '黑玉', '金黃石'],
  },
  {
    id: 'zhicui',
    series: 'couture',
    seriesName: '編織系列',
    name: '翠翎',
    sub: '淡水珍珠編織 × 綠 石花心',
    img: '/images/pouch-bracelet.jpg',
    bracelet: 1480,
    necklace: 1880,
    pair: 2980,
    desc:
      '親手編織淡水珍珠手工編織，中央以綠 石花心收飾，尖銳迭起，是系列裡最優雅的名品之選。',
    stones: ['淡水珍珠', '綠 石花心', '高級編繩'],
  },
  {
    id: 'nuanyang',
    series: 'couture',
    seriesName: '編織系列',
    name: '暖洋',
    sub: '淡水珍珠編織 × 黑水晶',
    img: '/images/dog-display.jpg',
    bracelet: 1380,
    necklace: 1780,
    pair: 2780,
    desc:
      '淡水珍珠編織與融入暖陽色黑水晶，溫潤感亮，日常搭配暖陽氛圍感裡。',
    stones: ['淡水珍珠', '黑水晶', '高級金飾件'],
  },
]

export type Variant = 'bracelet' | 'necklace' | 'pair'

export const fmt = (n: number) => 'NT$' + n.toLocaleString()

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  story: string;
}

const products: Product[] = [
  {
    id: 1,
    name: '貓咪項圈吊飾',
    price: 299,
    description: '柔軟的蕾絲項圈配上可愛的鈴鐺',
    image: '/images/product-1.jpg',
    story: '這件作品是為了每隻喜歡搗亂的貓咪而設計，舒適又不失風格。',
  },
  {
    id: 2,
    name: '狗狗蝴蝶結',
    price: 249,
    description: '甜美的粉紅色蝴蝶結，適合各種毛色',
    image: '/images/product-2.jpg',
    story: '靈感來自於一隻調皮的小貴賓犬，希望牠每天都開心。',
  },
  {
    id: 3,
    name: '手工編織項圈',
    price: 349,
    description: '採用天然棉線手工編織，耐用又環保',
    image: '/images/product-3.jpg',
    story: '每一根線都代表對毛孩的關心，每一個結都是一份祝福。',
  },
  {
    id: 4,
    name: '珍珠吊墜項圈',
    price: 399,
    description: '精緻的珍珠吊墜，展現高雅氣質',
    image: '/images/product-4.jpg',
    story: '為那些高貴優雅的毛孩而生，讓牠們更加與眾不同。',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 sm:py-28 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Petit Bond
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            手作寵物飾品工坊
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            每件飾品都是精心打造。融合設計與愛心，為您的毛孩帶來獨一無二的風采。
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-foreground mb-16 text-center">
          作品集
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="flex flex-col h-full hover:shadow-lg transition-shadow">
              {/* Image */}
              <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden rounded-t-lg border-b">
                <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center text-muted-foreground text-5xl">
                  ✨
                </div>
              </div>

              {/* Product Info */}
              <CardHeader className="flex-1">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.story}
                </p>
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-lg font-semibold text-foreground">
                    NT${product.price}
                  </span>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/inquiry?product=${product.id}`}>
                      預購
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t bg-muted/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            喜歡的作品？
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            歡迎提出預購需求，我們會盡快為您製作。
          </p>
          <Button asChild size="lg">
            <Link href="/inquiry">立即預購</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

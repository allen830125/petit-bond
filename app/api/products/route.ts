import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { uploadProductImages, parseProductFormData } from '@/lib/product-images';

export const runtime = 'nodejs';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const products = await prisma.product.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    include: { images: { orderBy: { order: 'asc' } } },
  });

  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const formData = await request.formData();
  const parsed = parseProductFormData(formData);
  if ('error' in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  const { data, newImageFiles } = parsed;

  let uploadedUrls: string[];
  try {
    uploadedUrls = await uploadProductImages(newImageFiles);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : '圖片上傳失敗' }, { status: 400 });
  }

  const product = await prisma.product.create({
    data: {
      series: data.series,
      seriesName: data.seriesName,
      name: data.name,
      sub: data.sub,
      description: data.description,
      bracelet: parseFloat(data.bracelet),
      necklace: parseFloat(data.necklace),
      pair: parseFloat(data.pair),
      stones: data.stones,
      userId: user.id,
      images: {
        create: uploadedUrls.map((url, i) => ({ url, order: i })),
      },
    },
    include: { images: { orderBy: { order: 'asc' } } },
  });

  return NextResponse.json(product, { status: 201 });
}

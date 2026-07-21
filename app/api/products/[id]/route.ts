import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { uploadProductImages, parseProductFormData } from '@/lib/product-images';

export const runtime = 'nodejs';

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: { orderBy: { order: 'asc' } } },
  });

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (product.userId !== user?.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return NextResponse.json(product);
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
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

  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: true },
  });

  if (!product || product.userId !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const formData = await request.formData();
  const parsed = parseProductFormData(formData);
  if ('error' in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  const { data, newImageFiles, keepImageIds } = parsed;

  const existingIds = new Set(product.images.map((img) => img.id));
  if (!keepImageIds.every((imgId) => existingIds.has(imgId))) {
    return NextResponse.json({ error: '無效的圖片 ID' }, { status: 400 });
  }
  const removedIds = product.images.map((img) => img.id).filter((imgId) => !keepImageIds.includes(imgId));

  let uploadedUrls: string[];
  try {
    uploadedUrls = await uploadProductImages(newImageFiles);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : '圖片上傳失敗' }, { status: 400 });
  }

  const updated = await prisma.$transaction(async (tx) => {
    if (removedIds.length > 0) {
      await tx.productImage.deleteMany({ where: { id: { in: removedIds } } });
    }
    await Promise.all(
      keepImageIds.map((imgId, i) => tx.productImage.update({ where: { id: imgId }, data: { order: i } }))
    );
    if (uploadedUrls.length > 0) {
      await tx.productImage.createMany({
        data: uploadedUrls.map((url, i) => ({
          url,
          order: keepImageIds.length + i,
          productId: id,
        })),
      });
    }
    return tx.product.update({
      where: { id },
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
      },
      include: { images: { orderBy: { order: 'asc' } } },
    });
  });

  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
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

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product || product.userId !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  await prisma.product.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}

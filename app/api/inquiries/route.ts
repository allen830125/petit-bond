import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

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

  const inquiries = await prisma.inquiry.findMany({
    where: { product: { userId: user.id } },
    include: { product: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(inquiries);
}

export async function POST(request: NextRequest) {
  const data = await request.json();

  if (!data.productId || !data.name || !data.contactType || !data.contact || !data.variant) {
    return NextResponse.json({ error: '請填寫必填欄位' }, { status: 400 });
  }

  const product = await prisma.product.findUnique({
    where: { id: data.productId },
  });

  if (!product) {
    return NextResponse.json({ error: '商品不存在' }, { status: 404 });
  }

  const inquiry = await prisma.inquiry.create({
    data: {
      productId: data.productId,
      variant: data.variant,
      qty: data.qty ? parseInt(data.qty, 10) : 1,
      size: data.size || null,
      name: data.name,
      contactType: data.contactType,
      contact: data.contact,
      notes: data.notes || null,
    },
  });

  return NextResponse.json(inquiry, { status: 201 });
}

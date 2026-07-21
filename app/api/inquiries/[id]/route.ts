import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

type RouteParams = {
  params: Promise<{ id: string }>;
};

const STATUSES = ['pending', 'contacted', 'completed'];

async function getOwnedInquiry(id: string, email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { user: null, inquiry: null };

  const inquiry = await prisma.inquiry.findUnique({
    where: { id },
    include: { product: true },
  });

  if (!inquiry || inquiry.product.userId !== user.id) {
    return { user, inquiry: null };
  }

  return { user, inquiry };
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { inquiry } = await getOwnedInquiry(id, session.user.email);

  if (!inquiry) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const data = await request.json();

  if (!data.status || !STATUSES.includes(data.status)) {
    return NextResponse.json({ error: '無效的狀態' }, { status: 400 });
  }

  const updated = await prisma.inquiry.update({
    where: { id },
    data: { status: data.status },
  });

  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { inquiry } = await getOwnedInquiry(id, session.user.email);

  if (!inquiry) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  await prisma.inquiry.delete({ where: { id } });

  return NextResponse.json({ success: true });
}

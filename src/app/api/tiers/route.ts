import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isUserAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const tiers = await prisma.sponsorTier.findMany({
      orderBy: { displayOrder: 'asc' },
      include: {
        sponsors: {
          orderBy: { displayOrder: 'asc' },
        },
      },
    });

    return NextResponse.json(tiers);
  } catch (error) {
    console.error('Error fetching tiers:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data tier sponsor' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    if (!isUserAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, targetQuota, label } = body;

    if (!name || targetQuota === undefined) {
      return NextResponse.json(
        { error: 'Nama tier dan targetQuota wajib disertakan' },
        { status: 400 }
      );
    }

    const updated = await prisma.sponsorTier.update({
      where: { name: name.toUpperCase() },
      data: {
        targetQuota: Number(targetQuota),
        label: label || undefined,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating tier quota:', error);
    return NextResponse.json(
      { error: 'Gagal memperbarui kuota tier' },
      { status: 500 }
    );
  }
}

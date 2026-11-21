import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isUserAuthenticated } from '@/lib/auth';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!isUserAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();
    const { companyName, tier, status, category, logoUrl, websiteUrl, shortDescription, displayOrder } = body;

    const updated = await prisma.sponsor.update({
      where: { id },
      data: {
        companyName,
        tier: tier ? tier.toUpperCase() : undefined,
        status: status || undefined,
        category: category || undefined,
        logoUrl: logoUrl || undefined,
        websiteUrl: websiteUrl !== undefined ? websiteUrl : undefined,
        shortDescription: shortDescription !== undefined ? shortDescription : undefined,
        displayOrder: displayOrder !== undefined ? Number(displayOrder) : undefined,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating sponsor:', error);
    return NextResponse.json(
      { error: 'Gagal memperbarui sponsor' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!isUserAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    await prisma.sponsor.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Sponsor berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting sponsor:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus sponsor' },
      { status: 500 }
    );
  }
}

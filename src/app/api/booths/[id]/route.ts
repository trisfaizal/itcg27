import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isUserAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';

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
    const { status, sponsorId, sponsorName, logoUrl, description } = body;

    const existingBooth = await prisma.booth.findFirst({
      where: {
        OR: [{ id }, { boothNumber: id }],
      },
    });

    if (!existingBooth) {
      return NextResponse.json({ error: 'Booth tidak ditemukan' }, { status: 404 });
    }

    const updated = await prisma.booth.update({
      where: { id: existingBooth.id },
      data: {
        status: status || existingBooth.status,
        sponsorId: sponsorId !== undefined ? sponsorId : existingBooth.sponsorId,
        sponsorName: sponsorName !== undefined ? sponsorName : existingBooth.sponsorName,
        logoUrl: logoUrl !== undefined ? logoUrl : existingBooth.logoUrl,
        description: description !== undefined ? description : existingBooth.description,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating booth:', error);
    return NextResponse.json(
      { error: 'Gagal memperbarui data booth' },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const booth = await prisma.booth.findFirst({
      where: {
        OR: [{ id }, { boothNumber: id }],
      },
    });

    if (!booth) {
      return NextResponse.json({ error: 'Booth tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json(booth);
  } catch (error) {
    console.error('Error fetching single booth:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data booth' },
      { status: 500 }
    );
  }
}

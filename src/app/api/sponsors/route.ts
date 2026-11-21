import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isUserAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tier = searchParams.get('tier');

    const whereClause: any = {};
    if (tier) {
      whereClause.tier = tier.toUpperCase();
    }

    const sponsors = await prisma.sponsor.findMany({
      where: whereClause,
      orderBy: [
        { displayOrder: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json(sponsors);
  } catch (error) {
    console.error('Error fetching sponsors:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data sponsor' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!isUserAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { companyName, tier, status, category, logoUrl, websiteUrl, shortDescription, displayOrder } = body;

    if (!companyName || !tier || !category || !logoUrl) {
      return NextResponse.json(
        { error: 'Field companyName, tier, category, dan logoUrl wajib diisi' },
        { status: 400 }
      );
    }

    const newSponsor = await prisma.sponsor.create({
      data: {
        companyName,
        tier: tier.toUpperCase(),
        status: status || 'CONFIRMED',
        category,
        logoUrl,
        websiteUrl: websiteUrl || null,
        shortDescription: shortDescription || null,
        displayOrder: Number(displayOrder) || 0,
      },
    });

    return NextResponse.json(newSponsor, { status: 201 });
  } catch (error) {
    console.error('Error creating sponsor:', error);
    return NextResponse.json(
      { error: 'Gagal membuat sponsor baru' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    if (!isUserAuthenticated()) {
      return NextResponse.json(
        { error: 'Unauthorized: Sesi autentikasi admin tidak valid' },
        { status: 401 }
      );
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: 'Format permintaan tidak valid' },
        { status: 400 }
      );
    }

    const { ids } = body || {};

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: 'Daftar ID sponsor tidak boleh kosong' },
        { status: 400 }
      );
    }

    const isValidFormat = ids.every(
      (id: any) => typeof id === 'string' && id.trim().length > 0
    );
    if (!isValidFormat) {
      return NextResponse.json(
        { error: 'Format ID sponsor tidak valid' },
        { status: 400 }
      );
    }

    const uniqueIds = Array.from(new Set(ids.map((id: string) => id.trim())));
    if (uniqueIds.length !== ids.length) {
      return NextResponse.json(
        { error: 'Terdapat duplikasi ID sponsor dalam permintaan' },
        { status: 400 }
      );
    }

    const existing = await prisma.sponsor.findMany({
      where: { id: { in: uniqueIds } },
      select: { id: true },
    });

    if (existing.length !== uniqueIds.length) {
      return NextResponse.json(
        { error: 'Satu atau lebih sponsor tidak ditemukan dalam database' },
        { status: 404 }
      );
    }

    await prisma.$transaction(async (tx) => {
      await tx.sponsor.deleteMany({
        where: { id: { in: uniqueIds } },
      });
    });

    return NextResponse.json({
      success: true,
      count: uniqueIds.length,
      message: `${uniqueIds.length} sponsor berhasil dihapus`,
    });
  } catch (error) {
    console.error('Error deleting sponsors:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus data sponsor' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isUserAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';

async function handleBulkDelete(req: NextRequest) {
  try {
    if (!isUserAuthenticated()) {
      return NextResponse.json(
        { error: 'Unauthorized: Sesi autentikasi admin tidak valid atau telah berakhir' },
        { status: 401 }
      );
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: 'Format permintaan tidak valid (JSON malformed)' },
        { status: 400 }
      );
    }

    const { ids } = body || {};

    // Validate that ids is an array and not empty
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: 'Daftar ID sponsor tidak boleh kosong' },
        { status: 400 }
      );
    }

    // Validate that every item in ids is a non-empty string
    const isValidFormat = ids.every(
      (id: any) => typeof id === 'string' && id.trim().length > 0
    );
    if (!isValidFormat) {
      return NextResponse.json(
        { error: 'Format ID sponsor tidak valid: semua elemen harus berupa string non-kosong' },
        { status: 400 }
      );
    }

    // Check for duplicates
    const trimmedIds = ids.map((id: string) => id.trim());
    const uniqueIds = Array.from(new Set(trimmedIds));
    if (uniqueIds.length !== ids.length) {
      return NextResponse.json(
        { error: 'Terdapat duplikasi ID sponsor dalam permintaan penghapusan' },
        { status: 400 }
      );
    }

    // Verify all submitted IDs exist in database
    const existing = await prisma.sponsor.findMany({
      where: { id: { in: uniqueIds } },
      select: { id: true, companyName: true },
    });

    if (existing.length !== uniqueIds.length) {
      const foundIds = new Set(existing.map((s) => s.id));
      const missingIds = uniqueIds.filter((id) => !foundIds.has(id));
      return NextResponse.json(
        {
          error: `Satu atau lebih sponsor tidak ditemukan dalam database (${missingIds.length} ID tidak valid)`,
        },
        { status: 404 }
      );
    }

    // Atomic transaction for database deletion
    await prisma.$transaction(async (tx) => {
      await tx.sponsor.deleteMany({
        where: { id: { in: uniqueIds } },
      });
    });

    return NextResponse.json({
      success: true,
      count: uniqueIds.length,
      message: `${uniqueIds.length} sponsor berhasil dihapus secara permanen`,
    });
  } catch (error) {
    console.error('Error in bulk delete sponsors:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan sistem saat menghapus data sponsor' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  return handleBulkDelete(req);
}

export async function POST(req: NextRequest) {
  return handleBulkDelete(req);
}

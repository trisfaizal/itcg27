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
    const { title, description, badgeStatus, publishedAt, isActive } = body;

    const updated = await prisma.eventUpdate.update({
      where: { id },
      data: {
        title: title || undefined,
        description: description || undefined,
        badgeStatus: badgeStatus || undefined,
        publishedAt: publishedAt ? new Date(publishedAt) : undefined,
        isActive: isActive !== undefined ? Boolean(isActive) : undefined,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating event update:', error);
    return NextResponse.json(
      { error: 'Gagal memperbarui warta acara' },
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

    await prisma.eventUpdate.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Warta berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting event update:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus warta' },
      { status: 500 }
    );
  }
}

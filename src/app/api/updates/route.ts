import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isUserAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const updates = await prisma.eventUpdate.findMany({
      orderBy: { publishedAt: 'desc' },
    });

    return NextResponse.json(updates);
  } catch (error) {
    console.error('Error fetching event updates:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil warta acara' },
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
    const { title, description, badgeStatus, publishedAt, isActive } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Field title dan description wajib diisi' },
        { status: 400 }
      );
    }

    const newUpdate = await prisma.eventUpdate.create({
      data: {
        title,
        description,
        badgeStatus: badgeStatus || 'Progress',
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      },
    });

    return NextResponse.json(newUpdate, { status: 201 });
  } catch (error) {
    console.error('Error creating event update:', error);
    return NextResponse.json(
      { error: 'Gagal membuat warta acara' },
      { status: 500 }
    );
  }
}

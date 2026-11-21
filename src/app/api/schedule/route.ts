import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isUserAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const sessions = await prisma.scheduleSession.findMany({
      orderBy: [{ day: 'asc' }, { order: 'asc' }],
    });

    return NextResponse.json(sessions, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    });
  } catch (error) {
    console.error('Error fetching schedule sessions:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data jadwal sesi' },
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
    const {
      order,
      day,
      timeSlot,
      time,
      period,
      category,
      isPlatinum,
      title,
      description,
      speakerName,
      speaker,
      speakerRole,
      role,
      companyName,
      company,
      stage,
      location,
      status,
    } = body;

    const finalTimeSlot = (timeSlot || time || '').trim();
    const finalTitle = (title || '').trim();

    if (!finalTitle || !finalTimeSlot) {
      return NextResponse.json(
        { error: 'Field title dan timeSlot/waktu wajib diisi' },
        { status: 400 }
      );
    }

    let finalCategory = category || 'GENERAL';
    if (isPlatinum || finalCategory === 'PLATINUM PARTNER' || finalCategory === 'PLATINUM') {
      finalCategory = 'PLATINUM_KEYNOTE';
    }

    const session = await prisma.scheduleSession.create({
      data: {
        order: Number(order) || 0,
        day: day || 'Day 1',
        timeSlot: finalTimeSlot,
        period: period || 'afternoon',
        category: finalCategory,
        title: finalTitle,
        description: description || '',
        speakerName: speakerName || speaker || (finalCategory === 'PLATINUM_KEYNOTE' ? 'To Be Announced' : null),
        speakerRole: speakerRole || role || (finalCategory === 'PLATINUM_KEYNOTE' ? 'Platinum Technology Partner' : null),
        companyName: companyName || company || null,
        stage: stage || location || 'Panggung Utama (16x6m)',
        status: status || 'TBA',
      },
    });

    return NextResponse.json(session, { status: 201 });
  } catch (error) {
    console.error('Error creating schedule session:', error);
    return NextResponse.json(
      { error: 'Gagal membuat sesi jadwal baru' },
      { status: 500 }
    );
  }
}

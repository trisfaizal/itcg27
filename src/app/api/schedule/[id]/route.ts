import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isUserAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const session = await prisma.scheduleSession.findUnique({
      where: { id },
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Sesi jadwal tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(session);
  } catch (error) {
    console.error('Error fetching session:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data sesi' },
      { status: 500 }
    );
  }
}

async function updateSession(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!isUserAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
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

    let finalCategory = category;
    if (isPlatinum || category === 'PLATINUM PARTNER' || category === 'PLATINUM') {
      finalCategory = 'PLATINUM_KEYNOTE';
    }

    const updated = await prisma.scheduleSession.update({
      where: { id },
      data: {
        order: order !== undefined ? Number(order) : undefined,
        day: day !== undefined ? day : undefined,
        timeSlot: (timeSlot || time) !== undefined ? (timeSlot || time) : undefined,
        period: period !== undefined ? period : undefined,
        category: finalCategory !== undefined ? finalCategory : undefined,
        title: title !== undefined ? title : undefined,
        description: description !== undefined ? description : undefined,
        speakerName: (speakerName !== undefined ? speakerName : speaker) !== undefined ? (speakerName || speaker) : undefined,
        speakerRole: (speakerRole !== undefined ? speakerRole : role) !== undefined ? (speakerRole || role) : undefined,
        companyName: (companyName !== undefined ? companyName : company) !== undefined ? (companyName || company) : undefined,
        stage: (stage !== undefined ? stage : location) !== undefined ? (stage || location) : undefined,
        status: status !== undefined ? status : undefined,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating schedule session:', error);
    return NextResponse.json(
      { error: 'Gagal memperbarui sesi jadwal' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  return updateSession(req, context);
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  return updateSession(req, context);
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
    await prisma.scheduleSession.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Sesi jadwal berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting schedule session:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus sesi jadwal' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const studentInclude = {
  student: {
    include: {
      school: true,
      parent: true,
    },
  },
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');
    const userRole = request.cookies.get('userRole')?.value;
    const parentId = request.cookies.get('parentId')?.value;
    const allowCampusFallback = searchParams.get('allowCampusFallback') === 'true';

    if (userRole === 'PARENT' && !parentId) {
      return NextResponse.json({ error: 'Parent identity is required' }, { status: 401 });
    }

    const where = studentId ? { studentId } : {};

    if (userRole === 'PARENT' && allowCampusFallback) {
      const linkedChild = await prisma.student.findFirst({
        where: { parentId },
        select: { id: true },
      });

      if (linkedChild) {
        where.student = { parentId };
      }
    } else if (userRole === 'PARENT') {
      where.student = { parentId };
    }

    const observations = await prisma.observation.findMany({
      where,
      include: studentInclude,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ observations }, { status: 200 });
  } catch (error) {
    console.error('Error fetching observations:', error);
    return NextResponse.json({ error: 'Failed to fetch observations' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { studentId, category, note, aiInsight } = await request.json();

    if (!studentId || !category || !note) {
      return NextResponse.json(
        { error: 'studentId, category, and note are required' },
        { status: 400 }
      );
    }

    const studentExists = await prisma.student.findUnique({
      where: { id: studentId },
    });

    if (!studentExists) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    const observation = await prisma.observation.create({
      data: {
        studentId,
        category,
        note,
        aiInsight: aiInsight || null,
      },
      include: studentInclude,
    });

    return NextResponse.json({ observation }, { status: 201 });
  } catch (error) {
    console.error('Error creating observation:', error);
    return NextResponse.json({ error: 'Failed to create observation' }, { status: 500 });
  }
}
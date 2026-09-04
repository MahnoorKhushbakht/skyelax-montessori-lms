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

    const attendanceRecords = await prisma.attendance.findMany({
      where: studentId ? { studentId } : {},
      include: studentInclude,
      orderBy: { date: 'desc' },
    });

    return NextResponse.json({ attendance: attendanceRecords }, { status: 200 });
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return NextResponse.json(
      { error: 'Failed to fetch attendance' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { studentId, status, date } = await request.json();

    if (!studentId || !status) {
      return NextResponse.json(
        { error: 'studentId and status are required' },
        { status: 400 }
      );
    }

    const studentExists = await prisma.student.findUnique({
      where: { id: studentId },
    });

    if (!studentExists) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 400 }
      );
    }

    const targetDate = date ? new Date(date) : new Date();
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);


    const existingEntry = await prisma.attendance.findFirst({
      where: {
        studentId,
        date: { gte: startOfDay, lte: endOfDay },
      },
    });

    const attendance = existingEntry
      ? await prisma.attendance.update({
          where: { id: existingEntry.id },
          data: { status },
          include: studentInclude,
        })
      : await prisma.attendance.create({
          data: { studentId, status, date: targetDate },
          include: studentInclude,
        });

    return NextResponse.json({ attendance }, { status: existingEntry ? 200 : 201 });
  } catch (error) {
    console.error('Error marking attendance:', error);
    return NextResponse.json(
      { error: 'Failed to mark attendance' },
      { status: 500 }
    );
  }
}
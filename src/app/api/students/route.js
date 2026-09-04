import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const studentInclude = {
  school: true,
  parent: true,
};

const isValidObjectId = (id) =>
  typeof id === 'string' && /^[0-9a-fA-F]{24}$/.test(id);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const requestedParentId = searchParams.get('parentId');
    const parentId = requestedParentId;

    const students = await prisma.student.findMany({
      where: {
        ...(schoolId && { schoolId }),
        ...(parentId ? { parentId } : {}),
      },
      include: studentInclude,
      orderBy: { name: 'asc' },
    });

    return NextResponse.json({ students }, { status: 200 });
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, parentId, schoolId } = await request.json();

    if (!name) {
      return NextResponse.json({ error: 'Student name is required' }, { status: 400 });
    }

    let resolvedSchoolId = isValidObjectId(schoolId) ? schoolId : null;

    if (!resolvedSchoolId && isValidObjectId(parentId)) {
      const parent = await prisma.user.findUnique({
        where: { id: parentId },
        select: { schoolId: true },
      });
      if (isValidObjectId(parent?.schoolId)) {
        resolvedSchoolId = parent.schoolId;
      }
    }

    if (!resolvedSchoolId) {
      let defaultSchool = await prisma.school.findFirst();
      if (!defaultSchool) {
        defaultSchool = await prisma.school.create({
          data: {
            name: 'Default School',
            code: `DEFAULT-${Date.now()}`,
          },
        });
      }
      resolvedSchoolId = defaultSchool.id;
    }

    const validParentId = isValidObjectId(parentId) ? parentId : null;

    const student = await prisma.student.create({
      data: {
        name,
        ...(validParentId && { parentId: validParentId }),
        schoolId: resolvedSchoolId,
      },
      include: studentInclude,
    });

    return NextResponse.json({ student }, { status: 201 });
  } catch (error) {
    console.error('Error creating student:', error);
    return NextResponse.json({ error: 'Failed to create student' }, { status: 500 });
  }
}
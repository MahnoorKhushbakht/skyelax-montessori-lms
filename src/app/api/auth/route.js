import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        schoolId: true,
        createdAt: true,
        password: true,
        school: {
          select: {
            id: true,
            name: true,
            code: true,
            createdAt: true,
          },
        },
      },
    });

    const isBcryptHash = user?.password?.startsWith("$2");
    const passwordMatches = user && (
      isBcryptHash
        ? await bcrypt.compare(password, user.password)
        : password === user.password
    );

    if (!user || !passwordMatches) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    if (!isBcryptHash) {
      await prisma.user.update({
        where: { id: user.id },
        data: { password: await bcrypt.hash(password, 12) },
      });
    }

    const { password: _, ...safeUser } = user;
    return NextResponse.json({ user: safeUser }, { status: 200 });
  } catch (error) {
    console.error('Error authenticating user:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
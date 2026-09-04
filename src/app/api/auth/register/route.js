import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const roles = new Set(["ADMIN", "TEACHER", "PARENT"]);
const isValidObjectId = (id) => typeof id === "string" && /^[0-9a-fA-F]{24}$/.test(id);

export async function POST(request) {
  try {
    const { name, email, password, role, schoolId } = await request.json();
    const normalizedEmail = email?.trim().toLowerCase();

    if (!name?.trim() || !normalizedEmail || !password || !role) {
      return NextResponse.json(
        { error: "Name, email, password, and role are required." },
        { status: 400 }
      );
    }

    if (!roles.has(role)) {
      return NextResponse.json({ error: "Invalid role selected." }, { status: 400 });
    }

  
    let targetSchoolId = isValidObjectId(schoolId) ? schoolId : null;
    if (targetSchoolId) {
      const school = await prisma.school.findUnique({
        where: { id: targetSchoolId },
        select: { id: true },
      });
      if (!school) targetSchoolId = null;
    }

    if (!targetSchoolId) {
      const defaultSchool = await prisma.school.findFirst({ select: { id: true } });
      if (!defaultSchool) {
        return NextResponse.json(
          { error: "No active school found to assign user." },
          { status: 400 }
        );
      }
      targetSchoolId = defaultSchool.id;
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "A user with this email already exists." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);


    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role,
        schoolId: targetSchoolId,
      },
      select: { id: true, name: true, email: true, role: true, schoolId: true },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json({ error: "Failed to register user." }, { status: 500 });
  }
}
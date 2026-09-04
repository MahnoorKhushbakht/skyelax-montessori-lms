import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ai } from "@/lib/gemini";

export async function POST(req) {
  try {
    const { note, studentId, developmentalArea } = await req.json();

    if (!studentId) {
      return NextResponse.json({ error: "Student ID is required" }, { status: 400 });
    }

   
    const normalizedStudentId = String(studentId);
    const student = await prisma.student.findUnique({
      where: { id: normalizedStudentId },
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const studentObservations = await prisma.observation.findMany({
      where: { studentId: normalizedStudentId },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    const observationText = studentObservations.length > 0
      ? studentObservations
        .map((observation) => `- [${observation.category || "General"}]: ${observation.note}`)
        .join("\n")
      : "Student has actively participated in recent Montessori classroom activities.";
    const submittedNote = note?.trim()
      ? `\n- [${developmentalArea || "General"}]: ${note.trim()}`
      : "";

    const prompt = `
You are an expert Montessori AI Developmental Specialist.
Analyze the following observations for student "${student.name}":

${observationText}${submittedNote}

Generate a concise developmental progress report in valid JSON format:
{
  "developmentalSummary": "string",
  "coreStrengths": ["string"],
  "suggestedActivities": ["string"]
}

Return ONLY valid JSON without markdown code fences.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const rawText = response.text.trim();
    const cleanJson = rawText.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    const insights = JSON.parse(cleanJson);

    return NextResponse.json({ insights });
  } catch (error) {
    console.error("AI Insights Error:", error);
    return NextResponse.json(
      { error: "Failed to generate AI Insights" },
      { status: 500 }
    );
  }
}
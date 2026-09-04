import { NextResponse } from "next/server";
import { ai } from "@/lib/gemini";

export async function POST(req) {
  try {
    const { message, userRole, studentContext } = await req.json();

    const systemInstruction = `
You are SKYEY-AI, an intelligent Montessori Assistant inside the SKYELAX LMS.
Current User Role: ${userRole || "USER"}.
Context: ${studentContext ? JSON.stringify(studentContext) : "General Platform Access"}.

Guidelines:
- If the user is a PARENT, provide supportive, clear insights about child development and home activities.
- If the user is a TEACHER, suggest lesson plans, observation techniques, and Montessori material guides.
- Keep responses concise, professional, and directly helpful.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${systemInstruction}\n\nUser Question: ${message}`,
    });

    return NextResponse.json({ reply: response.text });
  } catch (error) {
    console.error("AI Chat Error:", error);
    return NextResponse.json(
      { error: "AI Assistant failed to respond" },
      { status: 500 }
    );
  }
}
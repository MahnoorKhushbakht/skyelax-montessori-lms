"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import ObservationForm from "../../../components/ObservationForm";
import AttendanceTracker from "../../../components/AttendanceTracker";
import { Wifi } from "lucide-react";

export default function TeacherDashboard() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [category, setCategory] = useState("SENSORIAL");
  const [note, setNote] = useState("");
  const [aiInsight, setAiInsight] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [studentsLoading, setStudentsLoading] = useState(true);
  const [studentsError, setStudentsError] = useState("");
  const [saveState, setSaveState] = useState({ loading: false, error: "", success: "" });
  const [attendanceMap, setAttendanceMap] = useState({});
  const [attendanceState, setAttendanceState] = useState({ loading: false, error: "", success: "" });

  useEffect(() => {
    fetch("/api/students")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data.students) ? data.students : [];
        setStudents(list);
        if (list.length > 0) {
          setStudentId(list[0].id);
          const initialMap = {};
          list.forEach((s) => (initialMap[s.id] = "PRESENT"));
          setAttendanceMap(initialMap);
        }
      })
      .catch((err) => setStudentsError(err.message || "Could not load students."))
      .finally(() => setStudentsLoading(false));
  }, []);

  const handleGenerateAI = async () => {
    if (!note.trim()) {
      setAiError("Please add an observation note before generating an insight.");
      return;
    }

    setLoading(true);
    setAiError("");
    try {
      const res = await fetch("/api/ai/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: note.trim(), studentId, developmentalArea: category }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate AI insight.");

      const summary = data.insights?.developmentalSummary || data.insight;
      if (!summary) throw new Error("The AI response did not include a developmental summary.");
      setAiInsight(summary);
    } catch (err) {
      setAiError(err.message || "Failed to generate AI insight.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveObservation = async () => {
    if (!studentId || !note.trim()) {
      return setSaveState({ loading: false, error: "Please select a student and add a note.", success: "" });
    }
    setSaveState({ loading: true, error: "", success: "" });
    try {
      const res = await fetch("/api/observations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, category, note: note.trim(), aiInsight: aiInsight.trim() || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save observation.");

      setSaveState({ loading: false, error: "", success: "Observation saved successfully." });
      setNote("");
      setAiInsight("");
    } catch (err) {
      setSaveState({ loading: false, error: err.message, success: "" });
    }
  };

  const handleSaveAttendance = async () => {
    if (students.length === 0) return;
    setAttendanceState({ loading: true, error: "", success: "" });
    try {
      const payloads = students.map((s) => ({
        studentId: s.id,
        status: attendanceMap[s.id] || "PRESENT",
        date: new Date().toISOString(),
      }));

      await Promise.all(
        payloads.map(async (p) => {
          const res = await fetch("/api/attendance", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(p),
          });
          if (!res.ok) throw new Error("Failed to save attendance.");
        })
      );
      setAttendanceState({ loading: false, error: "", success: "Daily attendance saved successfully." });
    } catch (err) {
      setAttendanceState({ loading: false, error: err.message, success: "" });
    }
  };

  return (
    <DashboardLayout role="TEACHER">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Montessori Classroom Tracker</h2>
            <p className="text-xs text-slate-500">Record daily developmental observations</p>
          </div>
          <span className="flex items-center gap-1.5 text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-200 font-medium">
            <Wifi className="w-3.5 h-3.5" /> Local Sync Ready
          </span>
        </div>

        {studentsError && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{studentsError}</div>}
        {saveState.success && <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{saveState.success}</div>}
        {saveState.error && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{saveState.error}</div>}
        {aiError && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{aiError}</div>}

        <ObservationForm
          students={students}
          studentId={studentId}
          setStudentId={setStudentId}
          category={category}
          setCategory={setCategory}
          note={note}
          setNote={setNote}
          aiInsight={aiInsight}
          onGenerateAI={handleGenerateAI}
          onSave={handleSaveObservation}
          loading={loading}
          saveState={saveState}
          studentsLoading={studentsLoading}
        />

        <AttendanceTracker
          students={students}
          attendanceMap={attendanceMap}
          onStatusChange={(id, status) => setAttendanceMap((prev) => ({ ...prev, [id]: status }))}
          onSave={handleSaveAttendance}
          state={attendanceState}
          studentsLoading={studentsLoading}
        />
      </div>
    </DashboardLayout>
  );
}
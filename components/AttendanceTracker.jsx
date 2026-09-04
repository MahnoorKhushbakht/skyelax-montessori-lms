import { Save } from "lucide-react";
import Button from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AttendanceTracker({
  students,
  attendanceMap,
  onStatusChange,
  onSave,
  state,
  studentsLoading,
}) {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between border-b pb-2">
        <h3 className="font-semibold text-slate-800 text-base">Attendance Tracker</h3>
      </div>

      {state.success && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {state.success}
        </div>
      )}

      {state.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <div className="space-y-3">
        {students.map((student) => (
          <div key={student.id} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
            <span className="text-sm font-medium text-slate-700">{student.name}</span>
            <div className="flex items-center gap-2">
              {["PRESENT", "ABSENT", "LATE"].map((status) => (
                <Button
                  key={status}
                  type="button"
                  onClick={() => onStatusChange(student.id, status)}
                  className={`px-2.5 py-1.5 rounded-full border text-[10px] font-semibold uppercase tracking-wide transition-all ${
                    attendanceMap[student.id] === status
                      ? "border-indigo-500 bg-indigo-600 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                  variant="secondary"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Button
        type="button"
        onClick={onSave}
        disabled={state.loading || studentsLoading || students.length === 0}
        className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow disabled:opacity-60"
      >
        <Save className="w-4 h-4" />
        {state.loading ? "Saving Attendance..." : "Save Daily Attendance"}
      </Button>
    </Card>
  );
}
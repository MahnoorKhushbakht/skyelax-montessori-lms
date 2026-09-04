import { CheckCircle2 } from "lucide-react";

export default function ChildHeader({ student, students, selectedId, onSelect }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
          {student?.name?.charAt(0).toUpperCase() || "C"}
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">{student?.name || "Child Profile"}</h2>
          <p className="text-xs text-slate-500">Montessori Early Childhood • Group A</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {students.length > 0 && (
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            Select Active Child
            <select
              value={selectedId}
              onChange={(e) => onSelect(e.target.value)}
              className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-normal text-slate-700 focus:bg-white"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </label>
        )}
        <span className="flex items-center gap-1.5 text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-200 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5" /> 95% Monthly Attendance
        </span>
      </div>
    </div>
  );
}
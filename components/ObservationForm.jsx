import { Sparkles, Save, Loader2 } from "lucide-react";
import Button from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ObservationForm({
  students,
  studentId,
  setStudentId,
  category,
  setCategory,
  note,
  setNote,
  aiInsight,
  onGenerateAI,
  onSave,
  loading,
  saveState,
  studentsLoading,
}) {
  return (
    <Card className="p-6 space-y-4">
      <h3 className="font-semibold text-slate-800 border-b pb-2 text-base">New Observation Entry</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Select Student</label>
          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            disabled={studentsLoading || students.length === 0}
            className="w-full rounded-lg p-2.5 text-sm bg-slate-800 text-white border border-slate-700 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 disabled:opacity-60"
          >
            {studentsLoading ? (
              <option value="">Loading students...</option>
            ) : students.length === 0 ? (
              <option value="">No students available</option>
            ) : (
              students.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))
            )}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Developmental Area</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg p-2.5 text-sm bg-slate-800 text-white border border-slate-700 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
          >
            <option value="PRACTICAL_LIFE">Practical Life</option>
            <option value="SENSORIAL">Sensorial</option>
            <option value="LANGUAGE">Language</option>
            <option value="MATHEMATICS">Mathematics</option>
            <option value="CULTURE">Culture</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Observation Note</label>
        <textarea
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Describe student's engagement with Montessori materials..."
          className="w-full rounded-lg p-3 text-sm bg-slate-800 text-white border border-slate-700 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
        />
      </div>

      <div className="flex flex-wrap justify-between items-center gap-3 pt-2">
        <Button
          type="button"
          onClick={onGenerateAI}
          disabled={loading || !note.trim()}
          className="flex items-center gap-2 text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold px-4 py-2.5 rounded-lg border border-indigo-200 disabled:opacity-60"
          variant="secondary"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin text-indigo-600" /> : <Sparkles className="w-4 h-4 text-indigo-600" />}
          {loading ? "Analyzing Note..." : "Generate AI Insight"}
        </Button>

        <Button
          type="button"
          onClick={onSave}
          disabled={saveState.loading || studentsLoading || !studentId}
          className="flex items-center gap-2 text-xs bg-slate-900 hover:bg-slate-800 text-white font-medium px-5 py-2.5 rounded-lg shadow disabled:opacity-60"
        >
          <Save className="w-4 h-4" />
          {saveState.loading ? "Saving..." : "Save Record"}
        </Button>
      </div>

      {aiInsight && (
        <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-lg space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> AI Suggestion Preview
          </div>
          <p className="text-xs text-indigo-800 leading-relaxed">{aiInsight}</p>
        </div>
      )}
    </Card>
  );
}
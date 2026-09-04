import { Sparkles } from "lucide-react";

const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "Unknown date";

const formatCategory = (cat) =>
  cat ? cat.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()) : "General";

export default function ObservationCard({ item }) {
  return (
    <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
      <div className="flex justify-between items-center text-xs">
        <span className="font-bold text-emerald-800 uppercase tracking-wide bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          {formatCategory(item.category)}
        </span>
        <span className="text-slate-400 font-mono">{formatDate(item.createdAt)}</span>
      </div>
      <p className="text-xs text-slate-700 leading-relaxed">{item.note}</p>
      {item.aiInsight && (
        <div className="pt-2 border-t border-slate-200/60 flex items-start gap-2">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 mt-0.5 shrink-0" />
          <p className="text-[11px] text-indigo-900 font-medium">
            <span className="font-semibold">AI Digest:</span> {item.aiInsight}
          </p>
        </div>
      )}
    </div>
  );
}
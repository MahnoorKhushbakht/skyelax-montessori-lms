import { Plus } from "lucide-react";
import Button from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function FormCard({ title, icon: Icon, onSubmit, loading, error, success, children, buttonText }) {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between border-b pb-2">
        <h3 className="font-semibold text-slate-800 text-base flex items-center gap-2">
          <Icon className="w-4 h-4 text-indigo-600" /> {title}
        </h3>
      </div>
      <form onSubmit={onSubmit} className="space-y-3">
        {children}
        {error && <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">{error}</div>}
        {success && <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">{success}</div>}
        <Button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium disabled:opacity-60"
          variant="secondary"
        >
          <Plus className="w-4 h-4" />
          {loading ? "Creating..." : buttonText}
        </Button>
      </form>
    </Card>
  );
}
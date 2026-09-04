export default function StatCard({ icon: Icon, color, title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs text-slate-500 font-medium">{title}</p>
        <h4 className="text-lg font-bold text-slate-900">{value}</h4>
      </div>
    </div>
  );
}
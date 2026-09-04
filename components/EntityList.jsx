export default function EntityList({ title, items, loading, emptyText, renderSubtext, badgeColor }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
      <h3 className="font-semibold text-slate-800 text-base border-b pb-2">{title}</h3>
      {loading ? (
        <p className="text-sm text-slate-500">Loading {title.toLowerCase()}...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-slate-500">{emptyText}</p>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
              <div>
                <p className="font-medium text-slate-700">{item.name}</p>
                <p className="text-xs text-slate-500">{renderSubtext(item)}</p>
              </div>
              <span className={`rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${badgeColor}`}>
                {item.role || (item.parent ? "Linked Parent" : "Unlinked")}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
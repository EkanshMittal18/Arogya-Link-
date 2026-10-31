
import { Search, SlidersHorizontal } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search records...",
  filter = false,
  onFilter
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row">

      {/* Search Input */}
      <div className="relative min-w-0 flex-1">

        <Search
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
        />

      </div>

      {/* Filter Button */}
      {filter && (
        <button
          type="button"
          onClick={onFilter}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          <SlidersHorizontal size={16} />
          Filter
        </button>
      )}

    </div>
  );
}

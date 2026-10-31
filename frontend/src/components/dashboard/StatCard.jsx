
import { ArrowUpRight } from "lucide-react";

export default function StatCard({
  title,
  value,
  detail,
  icon: Icon,
  tone = "teal",
  trend
}) {
  const tones = {
    teal: "bg-teal-50 text-teal-700",
    blue: "bg-blue-50 text-blue-700",
    violet: "bg-violet-50 text-violet-700",
    orange: "bg-orange-50 text-orange-700",
    rose: "bg-rose-50 text-rose-700",
    green: "bg-emerald-50 text-emerald-700"
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      
      <div className="flex items-start justify-between">
        
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </h2>
        </div>

        <div
          className={`grid h-11 w-11 place-items-center rounded-xl ${
            tones[tone] || tones.teal
          }`}
        >
          {Icon && <Icon size={21} />}
        </div>

      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        
        <span>{detail}</span>

        {trend && (
          <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
            {trend}
            <ArrowUpRight size={13} />
          </span>
        )}

      </div>

    </div>
  );
}

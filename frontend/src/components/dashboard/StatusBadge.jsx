
const styles = {
  "Under Review": "bg-amber-50 text-amber-700 ring-amber-200",
  "Referred": "bg-blue-50 text-blue-700 ring-blue-200",
  "Follow-up Due": "bg-rose-50 text-rose-700 ring-rose-200",
  "Completed": "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "Pending": "bg-amber-50 text-amber-700 ring-amber-200",
  "Acknowledged": "bg-violet-50 text-violet-700 ring-violet-200",
  "Patient Arrived": "bg-cyan-50 text-cyan-700 ring-cyan-200",
  "Urgent Review": "bg-rose-50 text-rose-700 ring-rose-200",
  "Normal Review": "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "Awaiting Information": "bg-orange-50 text-orange-700 ring-orange-200",
  "Active": "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "Inactive": "bg-slate-100 text-slate-600 ring-slate-200"
};

export default function StatusBadge({ status = "Pending" }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        styles[status] || styles.Pending
      }`}
    >
      {status}
    </span>
  );
}

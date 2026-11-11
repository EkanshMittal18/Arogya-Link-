import React, { useState } from "react";
import {
  Bell,
  CalendarDays,
  FileText,
  Activity,
  CheckCircle2,
  Trash2,
  Check,
  Clock,
  AlertCircle,
  CheckCheck,
  Inbox,
} from "lucide-react";
import { useAarogya } from "../../context/AarogyaContext";

function PatientNotifications() {
  const { notifications, markNotificationRead, clearNotifications } = useAarogya();
  const [filter, setFilter] = useState("all");

  const patientNotifs = notifications.filter((n) => n.role === "patient");

  const unreadCount = patientNotifs.filter((n) => !n.read).length;

  const filteredNotifs = patientNotifs.filter((notif) => {
    if (filter === "unread") return !notif.read;
    if (filter === "read") return notif.read;
    return true;
  });

  const getIcon = (type) => {
    switch (type) {
      case "appointment":
        return <CalendarDays size={20} className="text-blue-500" />;
      case "record":
      case "prescription":
      case "consultation":
        return <FileText size={20} className="text-purple-500" />;
      case "referral":
        return <Activity size={20} className="text-emerald-500" />;
      default:
        return <AlertCircle size={20} className="text-amber-500" />;
    }
  };

  return (
    <div className="patient-notifications-page p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Bell size={26} className="text-emerald-600" />
            Notifications & Alerts
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Real-time updates regarding appointments, prescriptions, and referral status.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {patientNotifs.length > 0 && (
            <button
              onClick={() => clearNotifications("patient")}
              className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg font-semibold transition"
            >
              <Trash2 size={14} /> Clear All
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 my-5">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
            filter === "all" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          All ({patientNotifs.length})
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
            filter === "unread" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {filteredNotifs.length > 0 ? (
          filteredNotifs.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-xl border transition flex items-start gap-4 ${
                !n.read ? "bg-emerald-50/60 border-emerald-200 shadow-sm" : "bg-white border-slate-100"
              }`}
            >
              <div className="p-2.5 rounded-full bg-white shadow-sm border border-slate-100">
                {getIcon(n.type)}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-slate-800 text-sm">{n.title}</h4>
                  <span className="text-[11px] text-slate-400 whitespace-nowrap">{n.date}</span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
              </div>

              {!n.read && (
                <button
                  onClick={() => markNotificationRead(n.id)}
                  title="Mark as read"
                  className="text-xs text-emerald-600 hover:text-emerald-700 p-1.5 rounded-lg hover:bg-white"
                >
                  <Check size={16} />
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-100 p-6">
            <Inbox size={40} className="mx-auto text-slate-300 mb-2" />
            <h4 className="text-sm font-semibold text-slate-700">No Notifications</h4>
            <p className="text-xs text-slate-400 mt-1">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientNotifications;

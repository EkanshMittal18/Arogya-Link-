import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HeartPulse,
  Stethoscope,
  Users,
  ArrowRightLeft,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { useAarogya } from "../../context/AarogyaContext";

export default function DashboardSwitcher({ currentRole }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { patients, activePatientId, setActivePatientId, resetToSeedData } = useAarogya();
  const [collapsed, setCollapsed] = useState(false);

  const roles = [
    {
      id: "patient",
      title: "Patient Dashboard",
      short: "Patient",
      path: "/patient-preview",
      icon: HeartPulse,
      badgeColor: "bg-emerald-600 text-white",
      activeBg: "bg-emerald-50 text-emerald-800 border-emerald-500",
    },
    {
      id: "doctor",
      title: "Doctor Portal",
      short: "Doctor",
      path: "/doctor",
      icon: Stethoscope,
      badgeColor: "bg-teal-700 text-white",
      activeBg: "bg-teal-50 text-teal-800 border-teal-500",
    },
    {
      id: "health_worker",
      title: "Health Worker (ASHA)",
      short: "Health Worker",
      path: "/health-worker-dashboard",
      icon: Users,
      badgeColor: "bg-blue-600 text-white",
      activeBg: "bg-blue-50 text-blue-800 border-blue-500",
    },
  ];

  const handlePatientChange = (e) => {
    setActivePatientId(e.target.value);
  };

  const handleReset = () => {
    if (window.confirm("Reset all 3 dashboards to initial synchronized sample data?")) {
      resetToSeedData();
    }
  };

  if (collapsed) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setCollapsed(false)}
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full shadow-2xl hover:bg-slate-800 transition-all text-xs font-semibold border border-slate-700"
          title="Open Dashboard Switcher"
        >
          <ArrowRightLeft size={14} className="text-emerald-400 animate-spin" style={{ animationDuration: "8s" }} />
          <span>Switch Dashboard</span>
          <ChevronUp size={14} />
        </button>
      </div>
    );
  }

  return (
    <aside aria-label="Connected Dashboards Bar" className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white px-4 py-2.5 text-xs shadow-md border-b border-slate-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Branding & Live Sync indicator */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/30 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-bold tracking-wider text-[11px]">3 DASHBOARDS CONNECTED</span>
          </div>
          <span className="text-slate-400 hidden sm:inline">|</span>
          <span className="text-slate-300 hidden md:inline text-[11px]">
            Live Shared State Active
          </span>
        </div>

        {/* Middle: 3 Dashboard Quick Switch Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-lg border border-slate-700/60">
          {roles.map((role) => {
            const Icon = role.icon;
            const isActive =
              currentRole === role.id ||
              location.pathname === role.path ||
              (role.id === "patient" && location.pathname.includes("patient")) ||
              (role.id === "doctor" && location.pathname.includes("doctor")) ||
              (role.id === "health_worker" && location.pathname.includes("health-worker"));

            return (
              <button
                key={role.id}
                onClick={() => navigate(role.path)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium text-xs transition-all ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-sm font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/60"
                }`}
              >
                <Icon size={14} />
                <span>{role.short}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Active Patient Picker & Reset */}
        <div className="flex items-center gap-2.5">
          {/* Active Patient selector when in patient dashboard or whenever needed */}
          <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">
            <UserCheck size={13} className="text-emerald-400" />
            <span className="text-slate-400 text-[11px]">Active Patient:</span>
            <select
              value={activePatientId}
              onChange={handlePatientChange}
              className="bg-transparent text-emerald-300 text-xs font-semibold focus:outline-none cursor-pointer"
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                  {p.name} ({p.id})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleReset}
            title="Reset synced data to default"
            className="text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded transition-colors"
          >
            <RefreshCw size={13} />
          </button>

          <button
            onClick={() => setCollapsed(true)}
            title="Collapse bar"
            className="text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded transition-colors"
          >
            <ChevronUp size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}


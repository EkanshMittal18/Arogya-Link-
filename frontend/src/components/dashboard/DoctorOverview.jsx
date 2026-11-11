import React from "react";
import {
  Users,
  CalendarDays,
  ClipboardCheck,
  FileText,
  Clock,
  ArrowUpRight,
  ArrowRight,
  Plus,
  UserPlus,
  Pill,
  Stethoscope,
  Activity,
} from "lucide-react";
import { useAarogya } from "../../context/AarogyaContext";

function DoctorOverview({ onNavigate }) {
  const { patients, appointments, consultations, referrals, medicalRecords } = useAarogya();

  const pendingReferrals = referrals.filter(
    (r) => r.status === "Pending" || r.status === "In Progress"
  ).length;

  const stats = [
    {
      title: "Total Patients",
      value: String(patients.length),
      change: `${patients.length} registered in system`,
      icon: Users,
      color: "green",
      section: "My Patients",
    },
    {
      title: "Active Appointments",
      value: String(appointments.length),
      change: `${appointments.filter((a) => a.status === "Upcoming" || a.status === "Pending").length} upcoming today`,
      icon: CalendarDays,
      color: "blue",
      section: "Appointments",
    },
    {
      title: "Completed Consultations",
      value: String(consultations.length),
      change: `${consultations.length} recorded history`,
      icon: ClipboardCheck,
      color: "purple",
      section: "Consultations",
    },
    {
      title: "Pending Referrals",
      value: String(pendingReferrals).padStart(2, "0"),
      change: pendingReferrals > 0 ? "Requires review from ASHA" : "All referrals reviewed",
      icon: FileText,
      color: "orange",
      section: "Referrals",
    },
  ];

  return (
    <div className="doctor-overview">
      {/* Welcome Section */}
      <div className="overview-welcome">
        <div>
          <span className="overview-label">DOCTOR WORKSPACE • LIVE CONNECTED</span>
          <h1>Good Morning, Doctor! 👋</h1>
          <p>
            Here's what's happening with your rural patients, ASHA worker referrals, and consultations today.
          </p>
        </div>

        <div className="overview-date">
          <CalendarDays size={19} />
          <span>
            {new Date().toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Statistics */}
      <div className="overview-stats">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              className="overview-stat-card cursor-pointer"
              key={item.title}
              onClick={() => onNavigate && onNavigate(item.section)}
            >
              <div className={`overview-stat-icon ${item.color}`}>
                <Icon size={23} />
              </div>

              <p>{item.title}</p>
              <h2>{item.value}</h2>

              <span className="overview-stat-change">{item.change}</span>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="overview-section-heading">
        <div>
          <h2>Quick Actions</h2>
          <p>Frequently used clinical actions</p>
        </div>
      </div>

      <div className="overview-quick-actions">
        <button
          className="overview-action-card"
          onClick={() => onNavigate && onNavigate("My Patients")}
        >
          <div className="action-icon green">
            <UserPlus size={22} />
          </div>
          <div>
            <h3>View Patients</h3>
            <p>{patients.length} registered patients</p>
          </div>
          <ArrowUpRight size={19} />
        </button>

        <button
          className="overview-action-card"
          onClick={() => onNavigate && onNavigate("Appointments")}
        >
          <div className="action-icon blue">
            <CalendarDays size={22} />
          </div>
          <div>
            <h3>Appointments</h3>
            <p>Schedule or review visits</p>
          </div>
          <ArrowUpRight size={19} />
        </button>

        <button
          className="overview-action-card"
          onClick={() => onNavigate && onNavigate("Prescriptions")}
        >
          <div className="action-icon purple">
            <Pill size={22} />
          </div>
          <div>
            <h3>Issue Prescription</h3>
            <p>Syncs to patient health records</p>
          </div>
          <ArrowUpRight size={19} />
        </button>

        <button
          className="overview-action-card"
          onClick={() => onNavigate && onNavigate("Consultations")}
        >
          <div className="action-icon orange">
            <Activity size={22} />
          </div>
          <div>
            <h3>Consultations</h3>
            <p>Conduct clinical exam</p>
          </div>
          <ArrowUpRight size={19} />
        </button>
      </div>

      {/* Bottom Sections */}
      <div className="overview-bottom-grid">
        {/* Appointments */}
        <div className="overview-panel">
          <div className="overview-panel-header">
            <div>
              <h2>Scheduled Appointments</h2>
              <p>Upcoming consultations across rural centres</p>
            </div>

            <button
              className="overview-view-all"
              onClick={() => onNavigate && onNavigate("Appointments")}
            >
              View All <ArrowRight size={16} />
            </button>
          </div>

          <div className="overview-appointments">
            {appointments.slice(0, 5).map((appointment, index) => (
              <div className="overview-appointment-row" key={appointment.id || index}>
                <div className="overview-patient-avatar">
                  {appointment.initials || "PT"}
                </div>

                <div className="overview-appointment-info">
                  <h4>{appointment.patient || appointment.name}</h4>
                  <span>{appointment.type || "Consultation"}</span>
                </div>

                <div className="overview-appointment-time">
                  <Clock size={14} />
                  {appointment.time || "10:00 AM"}
                </div>

                <span
                  className={`overview-status ${(appointment.status || "upcoming").toLowerCase()}`}
                >
                  {appointment.status}
                </span>
              </div>
            ))}

            {appointments.length === 0 && (
              <p className="text-slate-400 text-xs py-4 text-center">No appointments scheduled.</p>
            )}
          </div>
        </div>

        {/* Recent Patients */}
        <div className="overview-panel">
          <div className="overview-panel-header">
            <div>
              <h2>Recent Patients</h2>
              <p>Registered community patients</p>
            </div>

            <button
              className="overview-view-all"
              onClick={() => onNavigate && onNavigate("My Patients")}
            >
              View All <ArrowRight size={16} />
            </button>
          </div>

          <div className="overview-patients">
            {patients.slice(0, 5).map((patient, index) => (
              <div className="overview-patient-row" key={patient.id || index}>
                <div className="overview-patient-avatar">
                  {patient.initials || "PT"}
                </div>

                <div className="overview-patient-info">
                  <h4>{patient.name}</h4>
                  <span>ID: {patient.id} • {patient.condition || "Active"}</span>
                </div>

                <div className="overview-patient-meta">
                  <span className="text-xs text-slate-500">{patient.village}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorOverview;

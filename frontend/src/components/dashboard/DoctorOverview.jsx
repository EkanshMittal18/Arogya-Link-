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

const stats = [
  {
    title: "Total Patients",
    value: "248",
    change: "+12 this month",
    icon: Users,
    color: "green",
  },
  {
    title: "Today's Appointments",
    value: "18",
    change: "6 remaining",
    icon: CalendarDays,
    color: "blue",
  },
  {
    title: "Completed Consultations",
    value: "156",
    change: "This month",
    icon: ClipboardCheck,
    color: "purple",
  },
  {
    title: "Pending Reports",
    value: "07",
    change: "Needs attention",
    icon: FileText,
    color: "orange",
  },
];

const appointments = [
  {
    name: "Rahul Sharma",
    type: "General Checkup",
    time: "09:30 AM",
    status: "Confirmed",
    initials: "RS",
  },
  {
    name: "Priya Verma",
    type: "Follow-up",
    time: "10:15 AM",
    status: "Waiting",
    initials: "PV",
  },
  {
    name: "Amit Kumar",
    type: "Consultation",
    time: "11:00 AM",
    status: "Confirmed",
    initials: "AK",
  },
  {
    name: "Neha Singh",
    type: "Health Checkup",
    time: "12:30 PM",
    status: "Pending",
    initials: "NS",
  },
];

const patients = [
  {
    name: "Rahul Sharma",
    id: "AL-1024",
    condition: "General Checkup",
    date: "Today",
    initials: "RS",
  },
  {
    name: "Priya Verma",
    id: "AL-1025",
    condition: "Fever & Cold",
    date: "Yesterday",
    initials: "PV",
  },
  {
    name: "Amit Kumar",
    id: "AL-1026",
    condition: "Blood Pressure",
    date: "Yesterday",
    initials: "AK",
  },
];

function DoctorOverview() {
  return (
    <div className="doctor-overview">

      {/* Welcome Section */}
      <div className="overview-welcome">
        <div>
          <span className="overview-label">DOCTOR WORKSPACE</span>
          <h1>Good Morning, Doctor! 👋</h1>
          <p>
            Here's what's happening with your patients and appointments today.
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
            <div className="overview-stat-card" key={item.title}>
              <div className={`overview-stat-icon ${item.color}`}>
                <Icon size={23} />
              </div>

              <p>{item.title}</p>
              <h2>{item.value}</h2>

              <span className="overview-stat-change">
                {item.change}
              </span>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="overview-section-heading">
        <div>
          <h2>Quick Actions</h2>
          <p>Frequently used doctor tools</p>
        </div>
      </div>

      <div className="overview-quick-actions">

        <button className="overview-action-card">
          <div className="action-icon green">
            <UserPlus size={22} />
          </div>
          <div>
            <h3>View Patients</h3>
            <p>Manage patient details</p>
          </div>
          <ArrowUpRight size={19} />
        </button>

        <button className="overview-action-card">
          <div className="action-icon blue">
            <CalendarDays size={22} />
          </div>
          <div>
            <h3>Appointments</h3>
            <p>Check your schedule</p>
          </div>
          <ArrowUpRight size={19} />
        </button>

        <button className="overview-action-card">
          <div className="action-icon purple">
            <Pill size={22} />
          </div>
          <div>
            <h3>Prescription</h3>
            <p>Create prescriptions</p>
          </div>
          <ArrowUpRight size={19} />
        </button>

        <button className="overview-action-card">
          <div className="action-icon orange">
            <Activity size={22} />
          </div>
          <div>
            <h3>Consultations</h3>
            <p>Manage consultations</p>
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
              <h2>Today's Appointments</h2>
              <p>Your upcoming patient visits</p>
            </div>

            <button className="overview-view-all">
              View All <ArrowRight size={16} />
            </button>
          </div>

          <div className="overview-appointments">

            {appointments.map((appointment, index) => (
              <div className="overview-appointment-row" key={index}>

                <div className="overview-patient-avatar">
                  {appointment.initials}
                </div>

                <div className="overview-appointment-info">
                  <h4>{appointment.name}</h4>
                  <span>{appointment.type}</span>
                </div>

                <div className="overview-appointment-time">
                  <Clock size={14} />
                  {appointment.time}
                </div>

                <span
                  className={`overview-status ${appointment.status.toLowerCase()}`}
                >
                  {appointment.status}
                </span>

              </div>
            ))}

          </div>
        </div>

        {/* Recent Patients */}
        <div className="overview-panel">
          <div className="overview-panel-header">
            <div>
              <h2>Recent Patients</h2>
              <p>Recently added patients</p>
            </div>

            <button className="overview-view-all">
              View All <ArrowRight size={16} />
            </button>
          </div>

          <div className="overview-recent-patients">

            {patients.map((patient, index) => (
              <div className="overview-recent-row" key={index}>

                <div className="overview-patient-avatar">
                  {patient.initials}
                </div>

                <div className="overview-recent-info">
                  <h4>{patient.name}</h4>
                  <span>{patient.id} · {patient.condition}</span>
                </div>

                <span className="overview-patient-date">
                  {patient.date}
                </span>

              </div>
            ))}

          </div>

          <button className="overview-add-patient">
            <Plus size={17} />
            Add New Patient
          </button>

        </div>

      </div>

      {/* Bottom Note */}
      <div className="overview-footer-note">
        <Stethoscope size={19} />
        <span>
          AAROGYA LINK — Connecting doctors with communities for better healthcare.
        </span>
      </div>

    </div>
  );
}

export default DoctorOverview;
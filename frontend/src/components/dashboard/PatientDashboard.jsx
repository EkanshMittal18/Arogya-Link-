import React, { useMemo, useState } from "react";
import {
  HeartPulse,
  LayoutDashboard,
  FileText,
  CalendarDays,
  ArrowLeftRight,
  ClipboardCheck,
  Bell,
  UserRound,
  CircleHelp,
  LogOut,
  Languages,
  CalendarCheck,
  Activity,
  Leaf,
  Droplets,
  ChevronRight,
  Clock3,
  ArrowUpRight,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useAarogya } from "../../context/AarogyaContext";
import DashboardSwitcher from "../common/DashboardSwitcher";
import "./PatientDashboard.css";

import PatientHealthRecords from "./PatientHealthRecords";
import PatientAppointments from "./PatientAppointments";
import PatientReferrals from "./PatientReferrals";
import PatientFollowups from "./PatientFollowups";
import PatientNotifications from "./PatientNotifications";
import PatientProfile from "./PatientProfile";
import PatientHelp from "./PatientHelp";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "My Health Records", icon: FileText },
  { label: "My Appointments", icon: CalendarDays },
  { label: "My Referrals", icon: ArrowLeftRight },
  { label: "Follow-ups", icon: ClipboardCheck },
  { label: "Notifications", icon: Bell },
  { label: "My Profile", icon: UserRound },
  { label: "Help & Support", icon: CircleHelp },
];

export default function PatientDashboard() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const navigate = useNavigate();

  const context = useAarogya() || {};
  const {
    activePatient = {},
    medicalRecords = [],
    appointments = [],
    referrals = [],
    followups = [],
    notifications = [],
    consultations = [],
  } = context;

  const patientId = activePatient?.id;

  const patientRecords = useMemo(
    () => medicalRecords.filter((record) => record.patientId === patientId),
    [medicalRecords, patientId]
  );

  const patientAppointments = useMemo(
    () => appointments.filter((item) => item.patientId === patientId),
    [appointments, patientId]
  );

  const upcomingAppointments = patientAppointments.filter(
    (item) => item.status === "Upcoming" || item.status === "Pending"
  );

  const patientReferrals = referrals.filter((item) => item.patientId === patientId);
  const activeReferrals = patientReferrals.filter(
    (item) => item.status === "In Progress" || item.status === "Accepted"
  );

  const patientFollowups = followups.filter((item) => item.patientId === patientId);
  const dueFollowups = patientFollowups.filter((item) => item.status !== "Completed");

  const unreadNotifs = notifications.filter(
    (item) => item.role === "patient" && !item.read
  ).length;

  const nextAppointment = upcomingAppointments[0];
  const nextFollowup = dueFollowups[0];
  const latestConsultation = consultations.find(
    (item) => item.patientId === patientId
  );

  const handleLogout = async () => {
    try {
      if (auth?.currentUser) {
        await signOut(auth);
      }
    } catch (error) {
      console.error("Logout error:", error);
      window.alert("Unable to logout. Please try again.");
      return;
    }

    navigate("/login", { replace: true });
  };

  const renderActiveSection = () => {
    switch (activeMenu) {
      case "My Health Records":
        return <PatientHealthRecords />;
      case "My Appointments":
        return <PatientAppointments />;
      case "My Referrals":
        return <PatientReferrals />;
      case "Follow-ups":
        return <PatientFollowups />;
      case "Notifications":
        return <PatientNotifications />;
      case "My Profile":
        return <PatientProfile />;
      case "Help & Support":
        return <PatientHelp />;
      default:
        return null;
    }
  };

  const activeSection = renderActiveSection();

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardSwitcher currentRole="patient" />

      <div className="patient-dashboard flex-1">
        <aside className="patient-sidebar">
          <div className="patient-brand">
            <div className="patient-brand-icon">
              <HeartPulse size={42} />
            </div>
            <h2>AAROGYA LINK</h2>
            <p>Rural Health, Digitally Connected</p>
          </div>

          <nav className="patient-sidebar-menu">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const badge =
                item.label === "Notifications" && unreadNotifs > 0
                  ? unreadNotifs
                  : null;

              return (
                <button
                  key={item.label}
                  type="button"
                  className={`patient-menu-item ${
                    activeMenu === item.label ? "active" : ""
                  }`}
                  onClick={() => setActiveMenu(item.label)}
                >
                  <Icon size={22} />
                  <span className="flex-1 text-left">{item.label}</span>
                  {badge !== null && (
                    <span className="bg-emerald-400 text-slate-900 text-xs px-2 py-0.5 rounded-full font-bold">
                      {badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <button
            className="patient-logout"
            onClick={handleLogout}
            type="button"
          >
            <LogOut size={21} />
            <span>Logout</span>
          </button>
        </aside>

        <main className="patient-main">
          <header className="patient-topbar">
            <div className="patient-welcome">
              <h1>Welcome, {activePatient?.name || "Patient"} 👋</h1>
              <p>
                Your Health, Our Priority | ID: {activePatient?.id || "Not assigned"}
              </p>
            </div>

            <div className="patient-topbar-actions">
              <button className="patient-language" type="button">
                <Languages size={19} />
                <span>English</span>
              </button>

              <button
                className="patient-notification relative"
                type="button"
                onClick={() => setActiveMenu("Notifications")}
                title="Notifications"
              >
                <Bell size={23} />
                {unreadNotifs > 0 && <span className="notification-dot" />}
              </button>

              <button
                className="patient-avatar"
                type="button"
                onClick={() => setActiveMenu("My Profile")}
                title="View Profile"
              >
                <UserRound size={23} />
              </button>
            </div>
          </header>

          {activeSection || (
            <div className="patient-overview">
              <div className="patient-stats-grid">
                <div
                  className="patient-stat-card green-card cursor-pointer"
                  onClick={() => setActiveMenu("My Health Records")}
                  role="button"
                  tabIndex={0}
                >
                  <div className="stat-icon"><HeartPulse size={29} /></div>
                  <div>
                    <h4>My Health Records</h4>
                    <h2>{patientRecords.length}</h2>
                    <p>
                      {patientRecords.length === 1
                        ? "1 Record Available"
                        : `${patientRecords.length} Records Available`}
                    </p>
                  </div>
                </div>

                <div
                  className="patient-stat-card blue-card cursor-pointer"
                  onClick={() => setActiveMenu("My Appointments")}
                  role="button"
                  tabIndex={0}
                >
                  <div className="stat-icon"><CalendarDays size={29} /></div>
                  <div>
                    <h4>Upcoming Appointments</h4>
                    <h2>{upcomingAppointments.length}</h2>
                    <p>
                      {nextAppointment
                        ? `Next: ${nextAppointment.date || "Scheduled"}`
                        : "No appointments due"}
                    </p>
                  </div>
                </div>

                <div
                  className="patient-stat-card yellow-card cursor-pointer"
                  onClick={() => setActiveMenu("My Referrals")}
                  role="button"
                  tabIndex={0}
                >
                  <div className="stat-icon"><ArrowLeftRight size={29} /></div>
                  <div>
                    <h4>Active Referrals</h4>
                    <h2>{activeReferrals.length}</h2>
                    <p>
                      {activeReferrals.length > 0
                        ? "Care in Progress"
                        : "No active referrals"}
                    </p>
                  </div>
                </div>

                <div
                  className="patient-stat-card purple-card cursor-pointer"
                  onClick={() => setActiveMenu("Follow-ups")}
                  role="button"
                  tabIndex={0}
                >
                  <div className="stat-icon"><ClipboardCheck size={29} /></div>
                  <div>
                    <h4>Follow-ups Due</h4>
                    <h2>{dueFollowups.length}</h2>
                    <p>
                      {nextFollowup
                        ? `Next: ${nextFollowup.date || "Scheduled"}`
                        : "All follow-ups cleared"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="patient-middle-grid">
                <section className="patient-panel health-summary">
                  <div className="panel-heading">
                    <HeartPulse size={25} />
                    <h2>My Health Summary</h2>
                  </div>

                  <div className="health-profile-card">
                    <div className="health-avatar font-bold text-2xl text-emerald-800 bg-emerald-100 flex items-center justify-center rounded-full w-14 h-14">
                      {activePatient?.initials || "PT"}
                    </div>

                    <div className="health-patient-info flex-1">
                      <h3>{activePatient?.name || "Patient Name"}</h3>
                      <p>
                        Age: {activePatient?.age ?? "—"} Years | Gender:{" "}
                        {activePatient?.gender || "—"} | Blood:{" "}
                        {activePatient?.bloodGroup || "—"}
                      </p>
                      <p className="text-xs text-slate-500">
                        Patient ID: {activePatient?.id || "—"} | Village:{" "}
                        {activePatient?.village || "—"}
                      </p>

                      {activePatient?.vitals && (
                        <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t border-emerald-100 text-xs">
                          <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-medium">
                            BP: {activePatient.vitals.bloodPressure || "—"}
                          </span>
                          <span className="bg-teal-50 text-teal-800 px-2 py-0.5 rounded font-medium">
                            Pulse: {activePatient.vitals.heartRate || "—"}
                          </span>
                          <span className="bg-blue-50 text-blue-800 px-2 py-0.5 rounded font-medium">
                            SpO2: {activePatient.vitals.oxygen || "—"}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="health-last-consultation">
                      <p><CalendarDays size={17} /> Last Consultation</p>
                      <span className="font-semibold text-emerald-900">
                        {latestConsultation?.date ||
                          activePatient?.lastVisit ||
                          "No consultation yet"}
                      </span>
                      <button
                        type="button"
                        className="view-details-btn"
                        onClick={() => setActiveMenu("My Health Records")}
                      >
                        View Records <ArrowUpRight size={17} />
                      </button>
                    </div>
                  </div>
                </section>

                <section className="patient-panel next-action">
                  <div className="panel-heading">
                    <ClipboardCheck size={25} />
                    <h2>Next Actions & Care Steps</h2>
                  </div>

                  <div
                    className="action-card appointment-action cursor-pointer"
                    onClick={() => setActiveMenu("My Appointments")}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="action-icon"><CalendarCheck size={27} /></div>
                    <div className="flex-1">
                      <h4>
                        {nextAppointment
                          ? `Appointment with ${nextAppointment.doctor || "Doctor"}`
                          : "Schedule Doctor Consultation"}
                      </h4>
                      <p>
                        {nextAppointment
                          ? `${nextAppointment.date || ""} at ${
                              nextAppointment.time || ""
                            } (${nextAppointment.type || "Consultation"})`
                          : "Book your upcoming checkup"}
                      </p>
                    </div>
                    <ChevronRight size={23} />
                  </div>

                  <div
                    className="action-card followup-action cursor-pointer"
                    onClick={() => setActiveMenu("Follow-ups")}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="action-icon"><Activity size={27} /></div>
                    <div className="flex-1">
                      <h4>
                        {nextFollowup?.title || "Community Health Follow-up"}
                      </h4>
                      <p>
                        {nextFollowup
                          ? `Due on ${nextFollowup.date || "Scheduled"} at ${
                              nextFollowup.location || "your local health centre"
                            }`
                          : "No pending follow-ups"}
                      </p>
                    </div>
                    <ChevronRight size={23} />
                  </div>
                </section>
              </div>

              <div className="patient-bottom-grid">
                <section className="patient-panel recent-activity">
                  <div className="panel-heading activity-heading">
                    <div>
                      <Clock3 size={25} />
                      <h2>Recent Health Activity</h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveMenu("My Health Records")}
                    >
                      View All <ArrowUpRight size={17} />
                    </button>
                  </div>

                  <div className="activity-list">
                    {patientRecords.slice(0, 3).map((record) => (
                      <div className="activity-item" key={record.id}>
                        <span className="activity-dot" />
                        <div className="activity-date">{record.date || "—"}</div>
                        <div>
                          <h4>{record.title || "Health record"}</h4>
                          <p>{record.description || "No description available."}</p>
                        </div>
                      </div>
                    ))}

                    {patientRecords.length === 0 && (
                      <p className="text-slate-500 text-sm py-4">
                        No recent health records yet. Schedule a consultation
                        or visit with a health worker.
                      </p>
                    )}
                  </div>
                </section>

                <section className="patient-panel health-tips">
                  <div className="panel-heading">
                    <Leaf size={25} />
                    <h2>Daily Rural Health Tips</h2>
                  </div>

                  <div className="health-tip-card">
                    <div className="tip-illustration"><Droplets size={55} /></div>
                    <div>
                      <h3>Stay Hydrated & Clean Water</h3>
                      <p>
                        Drink boiled or filtered clean water throughout the day.
                        Take your prescribed medicines according to your
                        healthcare professional's instructions.
                      </p>
                    </div>
                  </div>

                  <p className="health-tip-note">
                    Contact your ASHA worker or local PHC for routine health
                    screening.
                  </p>
                </section>
              </div>
            </div>
          )}

          <div className="hwa-bottom-note">
            AAROGYA LINK — Connecting Communities to Better Healthcare
          </div>
        </main>
      </div>
    </div>
  );
}

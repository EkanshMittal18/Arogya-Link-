import React from "react";

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

function PatientDashboard() {
  const [activeMenu, setActiveMenu] = React.useState("Dashboard");

  const navigate = useNavigate();

  // Firebase Logout Function
  const handleLogout = async () => {
    try {
      await signOut(auth);

      // Redirect to Login page
      navigate("/login", { replace: true });

    } catch (error) {
      console.error("Logout Error:", error);
      alert("Unable to logout. Please try again.");
    }
  };

  return (
    <div className="patient-dashboard">

      {/* SIDEBAR */}
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

            return (
              <button
                key={item.label}
                className={`patient-menu-item ${
                  activeMenu === item.label ? "active" : ""
                }`}
                onClick={() => setActiveMenu(item.label)}
              >
                <Icon size={22} />
                <span>{item.label}</span>
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


      {/* MAIN CONTENT */}
      <main className="patient-main">

        {/* TOP NAVBAR */}
        <header className="patient-topbar">

          <div className="patient-welcome">
            <h1>Welcome, Patient 👋</h1>
            <p>Your Health, Our Priority</p>
          </div>

          <div className="patient-topbar-actions">

            <button className="patient-language">
              <Languages size={19} />
              <span>English</span>
            </button>

            <button className="patient-notification">
              <Bell size={23} />
              <span className="notification-dot"></span>
            </button>

            <button className="patient-avatar">
              <UserRound size={23} />
            </button>

          </div>

        </header>


        {/* DASHBOARD OVERVIEW */}
        {activeMenu === "My Health Records" ? (
  <PatientHealthRecords />
  ) : activeMenu === "My Appointments" ? (
  <PatientAppointments />
  ) : activeMenu === "My Referrals" ? (
  <PatientReferrals />
) : activeMenu === "Follow-ups" ? (
  <PatientFollowups />
  ) : activeMenu === "Notifications" ? (
  <PatientNotifications />
    ) : activeMenu === "My Profile" ? (
    <PatientProfile />
    ) : activeMenu === "Help & Support" ? (
  <PatientHelp />
) : (
  <div className="patient-overview">

          {/* STATISTICS CARDS */}
          <div className="patient-stats-grid">

            <div className="patient-stat-card green-card">
              <div className="stat-icon">
                <HeartPulse size={29} />
              </div>
              <div>
                <h4>My Health Records</h4>
                <h2>3</h2>
                <p>Records Available</p>
              </div>
            </div>

            <div className="patient-stat-card blue-card">
              <div className="stat-icon">
                <CalendarDays size={29} />
              </div>
              <div>
                <h4>Upcoming Appointments</h4>
                <h2>1</h2>
                <p>Next: 28 Oct 2026</p>
              </div>
            </div>

            <div className="patient-stat-card yellow-card">
              <div className="stat-icon">
                <ArrowLeftRight size={29} />
              </div>
              <div>
                <h4>Active Referrals</h4>
                <h2>1</h2>
                <p>In Progress</p>
              </div>
            </div>

            <div className="patient-stat-card purple-card">
              <div className="stat-icon">
                <ClipboardCheck size={29} />
              </div>
              <div>
                <h4>Follow-ups</h4>
                <h2>2</h2>
                <p>Due in Next 30 Days</p>
              </div>
            </div>

          </div>


          {/* MIDDLE SECTION */}
          <div className="patient-middle-grid">

            {/* HEALTH SUMMARY */}
            <section className="patient-panel health-summary">

              <div className="panel-heading">
                <HeartPulse size={25} />
                <h2>My Health Summary</h2>
              </div>

              <div className="health-profile-card">

                <div className="health-avatar">
                  <UserRound size={48} />
                </div>

                <div className="health-patient-info">
                  <h3>Demo Patient</h3>
                  <p>Age: 35 Years | Gender: Not specified</p>
                  <p>Patient ID: ALP10234</p>
                </div>

                <div className="health-last-consultation">
                  <p>
                    <CalendarDays size={17} />
                    Last Consultation
                  </p>

                  <span>Not available</span>

                  <button
                    type="button"
                    className="view-details-btn"
                  >
                    View Details
                    <ArrowUpRight size={17} />
                  </button>
                </div>

              </div>

            </section>


            {/* NEXT ACTION */}
            <section className="patient-panel next-action">

              <div className="panel-heading">
                <ClipboardCheck size={25} />
                <h2>Next Action</h2>
              </div>

              <div className="action-card appointment-action">

                <div className="action-icon">
                  <CalendarCheck size={27} />
                </div>

                <div>
                  <h4>Upcoming Appointment</h4>
                  <p>Check your appointment schedule</p>
                </div>

                <ChevronRight size={23} />

              </div>

              <div className="action-card followup-action">

                <div className="action-icon">
                  <Activity size={27} />
                </div>

                <div>
                  <h4>Follow-up Reminder</h4>
                  <p>Check your pending follow-ups</p>
                </div>

                <ChevronRight size={23} />

              </div>

            </section>

          </div>


          {/* BOTTOM SECTION */}
          <div className="patient-bottom-grid">

            {/* RECENT ACTIVITY */}
            <section className="patient-panel recent-activity">

              <div className="panel-heading activity-heading">

                <div>
                  <Clock3 size={25} />
                  <h2>Recent Health Activity</h2>
                </div>

                <button type="button">
                  View All
                  <ArrowUpRight size={17} />
                </button>

              </div>

              <div className="activity-list">

                <div className="activity-item">
                  <span className="activity-dot"></span>

                  <div className="activity-date">
                    20 Oct 2026
                  </div>

                  <div>
                    <h4>Patient Profile Created</h4>
                    <p>Your patient profile is ready.</p>
                  </div>
                </div>

                <div className="activity-item">
                  <span className="activity-dot"></span>

                  <div className="activity-date">
                    21 Oct 2026
                  </div>

                  <div>
                    <h4>Health Information Updated</h4>
                    <p>Your health information was updated.</p>
                  </div>
                </div>

                <div className="activity-item">
                  <span className="activity-dot"></span>

                  <div className="activity-date">
                    22 Oct 2026
                  </div>

                  <div>
                    <h4>Dashboard Accessed</h4>
                    <p>You visited your health dashboard.</p>
                  </div>
                </div>

              </div>

            </section>


            {/* HEALTH TIPS */}
            <section className="patient-panel health-tips">

              <div className="panel-heading">
                <Leaf size={25} />
                <h2>Health Tips</h2>
              </div>

              <div className="health-tip-card">

                <div className="tip-illustration">
                  <Droplets size={55} />
                </div>

                <div>
                  <h3>Stay Hydrated</h3>
                  <p>
                    Drink enough clean water throughout
                    the day to maintain good health.
                  </p>
                </div>

              </div>

              <p className="health-tip-note">
                Small healthy habits make a big difference!
              </p>

            </section>

          </div>

        </div>
)}
      </main>

    </div>
  );
}

export default PatientDashboard;
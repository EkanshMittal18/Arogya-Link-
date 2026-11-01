import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";

import {
  LayoutDashboard,
  Users,
  UserPlus,
  ClipboardList,
  CalendarDays,
  FileText,
  Activity,
  Bell,
  User,
  HelpCircle,
  LogOut,
  Menu,
  Search,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  HeartPulse,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";

import "./HealthWorkerDashboard.css";
import HealthWorkerPatients from "./HealthWorkerPatients";
import HealthWorkerRegisterPatient from "./HealthWorkerRegisterPatient";
import HealthWorkerScreening from "./HealthWorkerScreening";
import HealthWorkerAppointments from "./HealthWorkerAppointments";
import HealthWorkerReferrals from "./HealthWorkerReferrals";
import HealthWorkerFollowUps from "./HealthWorkerFollowUps";
import HealthWorkerHomeVisits from "./HealthWorkerHomeVisits";
import HealthWorkerNotifications from "./HealthWorkerNotifications";
import HealthWorkerProfile from "./HealthWorkerProfile";
import HealthWorkerSupport from "./HealthWorkerSupport";

function HealthWorkerDashboard() {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sidebar Menu
  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "My Patients",
      icon: Users,
    },
    {
      title: "Register Patient",
      icon: UserPlus,
    },
    {
      title: "Patient Screening",
      icon: ClipboardList,
    },
    {
      title: "Appointments",
      icon: CalendarDays,
    },
    {
      title: "Referrals",
      icon: FileText,
    },
    {
      title: "Follow-ups",
      icon: Activity,
    },
    {
      title: "Home Visits",
      icon: MapPin,
    },
    {
      title: "Notifications",
      icon: Bell,
    },
    {
      title: "My Profile",
      icon: User,
    },
    {
      title: "Help & Support",
      icon: HelpCircle,
    },
  ];

  // Dashboard Statistics
  const stats = [
    {
      title: "Total Registered Patients",
      value: "248",
      change: "+12.5%",
      description: "Compared to last month",
      icon: Users,
      color: "blue",
    },
    {
      title: "Today's Home Visits",
      value: "18",
      change: "+4 today",
      description: "Scheduled home visits",
      icon: MapPin,
      color: "green",
    },
    {
      title: "Pending Referrals",
      value: "12",
      change: "Needs attention",
      description: "Awaiting doctor review",
      icon: FileText,
      color: "orange",
    },
    {
      title: "Follow-ups Due",
      value: "09",
      change: "Today",
      description: "Patients requiring follow-up",
      icon: Clock,
      color: "purple",
    },
  ];

  // Recent Patient Records
  const recentPatients = [
    {
      id: "AL001",
      name: "Ramesh Kumar",
      age: 45,
      gender: "Male",
      village: "Rampur",
      condition: "Fever",
      status: "Follow-up Required",
      statusType: "warning",
    },
    {
      id: "AL002",
      name: "Sunita Devi",
      age: 32,
      gender: "Female",
      village: "Shivpur",
      condition: "General Checkup",
      status: "Completed",
      statusType: "success",
    },
    {
      id: "AL003",
      name: "Mohan Singh",
      age: 58,
      gender: "Male",
      village: "Lakshmipur",
      condition: "High BP",
      status: "Doctor Referral",
      statusType: "danger",
    },
    {
      id: "AL004",
      name: "Pooja Sharma",
      age: 26,
      gender: "Female",
      village: "Rampur",
      condition: "Pregnancy Checkup",
      status: "In Progress",
      statusType: "info",
    },
  ];

  // Today's Tasks
  const todayTasks = [
    {
      time: "09:00 AM",
      title: "Home Visit - Ramesh Kumar",
      location: "Rampur Village",
      status: "Completed",
    },
    {
      time: "10:30 AM",
      title: "Patient Screening - Sunita Devi",
      location: "Shivpur Village",
      status: "In Progress",
    },
    {
      time: "12:00 PM",
      title: "Follow-up - Mohan Singh",
      location: "Lakshmipur Village",
      status: "Pending",
    },
    {
      time: "02:30 PM",
      title: "New Patient Registration",
      location: "Rampur Village",
      status: "Pending",
    },
  ];

  // Logout Function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout Error:", error);
      alert("Unable to logout. Please try again.");
    }
  };

  // Sidebar Menu Click
  const handleMenuClick = (menuTitle) => {
    setActiveMenu(menuTitle);
    setSidebarOpen(false);
  };

  // Dashboard Overview
  const renderDashboard = () => {
    return (
      <>
        {/* Welcome Section */}
        <section className="hw-welcome-section">
          <div>
            <p className="hw-welcome-label">HEALTH WORKER PORTAL</p>

            <h1>Welcome Back, Health Worker! 👋</h1>

            <p>
              Manage your patients, coordinate healthcare services,
              and make a difference in your community.
            </p>
          </div>

          <div className="hw-welcome-icon">
            <HeartPulse size={55} />
          </div>
        </section>

        {/* Statistics Cards */}
        <section className="hw-stats-grid">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div className="hw-stat-card" key={index}>
                <div className="hw-stat-top">
                  <div className={`hw-stat-icon ${stat.color}`}>
                    <Icon size={23} />
                  </div>

                  <button className="hw-more-button" type="button">
                    <MoreHorizontal size={21} />
                  </button>
                </div>

                <h2>{stat.value}</h2>

                <h3>{stat.title}</h3>

                <div className="hw-stat-bottom">
                  <span className={`hw-stat-change ${stat.color}`}>
                    {stat.change}
                  </span>

                  <span>{stat.description}</span>
                </div>
              </div>
            );
          })}
        </section>

        {/* Main Dashboard Content */}
        <section className="hw-dashboard-grid">

          {/* Recent Patients */}
          <div className="hw-content-card hw-patients-card">
            <div className="hw-card-header">
              <div>
                <h2>Recent Patients</h2>
                <p>Recently registered and updated patients</p>
              </div>

              <button
                className="hw-view-all"
                onClick={() => handleMenuClick("My Patients")}
              >
                View All <ArrowUpRight size={16} />
              </button>
            </div>

            <div className="hw-table-wrapper">
              <table className="hw-patient-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Village</th>
                    <th>Condition</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {recentPatients.map((patient) => (
                    <tr key={patient.id}>
                      <td>
                        <div className="hw-patient-info">
                          <div className="hw-patient-avatar">
                            {patient.name.charAt(0)}
                          </div>

                          <div>
                            <strong>{patient.name}</strong>
                            <span>
                              {patient.id} · {patient.age} years
                            </span>
                          </div>
                        </div>
                      </td>

                      <td>{patient.village}</td>

                      <td>{patient.condition}</td>

                      <td>
                        <span
                          className={`hw-status-badge ${patient.statusType}`}
                        >
                          {patient.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Today's Tasks */}
          <div className="hw-content-card hw-tasks-card">
            <div className="hw-card-header">
              <div>
                <h2>Today's Activities</h2>
                <p>Your scheduled tasks</p>
              </div>

              <CalendarDays size={22} />
            </div>

            <div className="hw-tasks-list">
              {todayTasks.map((task, index) => (
                <div className="hw-task-item" key={index}>
                  <div className="hw-task-timeline">
                    <span className="hw-task-dot"></span>

                    {index !== todayTasks.length - 1 && (
                      <span className="hw-task-line"></span>
                    )}
                  </div>

                  <div className="hw-task-content">
                    <span className="hw-task-time">{task.time}</span>

                    <h4>{task.title}</h4>

                    <p>
                      <MapPin size={13} />
                      {task.location}
                    </p>

                    <span
                      className={`hw-task-status ${task.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="hw-quick-actions-section">
          <div className="hw-section-heading">
            <div>
              <h2>Quick Actions</h2>
              <p>Frequently used health worker services</p>
            </div>
          </div>

          <div className="hw-quick-actions-grid">
            <button
              className="hw-quick-action"
              onClick={() => handleMenuClick("Register Patient")}
            >
              <div className="hw-quick-icon green">
                <UserPlus size={24} />
              </div>

              <div>
                <h3>Register Patient</h3>
                <p>Add a new patient</p>
              </div>

              <ArrowUpRight size={18} />
            </button>

            <button
              className="hw-quick-action"
              onClick={() => handleMenuClick("Patient Screening")}
            >
              <div className="hw-quick-icon blue">
                <ClipboardList size={24} />
              </div>

              <div>
                <h3>Patient Screening</h3>
                <p>Record patient symptoms</p>
              </div>

              <ArrowUpRight size={18} />
            </button>

            <button
              className="hw-quick-action"
              onClick={() => handleMenuClick("Referrals")}
            >
              <div className="hw-quick-icon orange">
                <FileText size={24} />
              </div>

              <div>
                <h3>Create Referral</h3>
                <p>Refer patient to a doctor</p>
              </div>

              <ArrowUpRight size={18} />
            </button>

            <button
              className="hw-quick-action"
              onClick={() => handleMenuClick("Follow-ups")}
            >
              <div className="hw-quick-icon purple">
                <Activity size={24} />
              </div>

              <div>
                <h3>Patient Follow-up</h3>
                <p>Track patient recovery</p>
              </div>

              <ArrowUpRight size={18} />
            </button>
          </div>
        </section>
      </>
    );
  };

  // Other Sections Placeholder
  const renderOtherSection = () => {


    if (activeMenu === "My Patients") {
  return <HealthWorkerPatients />;
}
if (activeMenu === "Register Patient") {
  return <HealthWorkerRegisterPatient />;
}
if (activeMenu === "Patient Screening") {
    return <HealthWorkerScreening />;
}
if (activeMenu === "Appointments") {
  return <HealthWorkerAppointments />;
}

if (activeMenu === "Referrals") {
    return <HealthWorkerReferrals />;
}
if (activeMenu === "Follow-ups") {
  return <HealthWorkerFollowUps />;
}

if (activeMenu === "Home Visits") {
    return <HealthWorkerHomeVisits />;
}

if (activeMenu === "Notifications") {
    return <HealthWorkerNotifications />;
}

if (activeMenu === "My Profile") {
    return <HealthWorkerProfile />;
}

if (activeMenu === "Help & Support") {
  return <HealthWorkerSupport />;
}

    const activeItem = menuItems.find(
      (item) => item.title === activeMenu
    );

    const Icon = activeItem?.icon || LayoutDashboard;

    return (
      <div className="hw-empty-section">
        <div className="hw-empty-icon">
          <Icon size={42} />
        </div>

        <h2>{activeMenu}</h2>

        <p>
          The {activeMenu} section will be implemented in the next
          development steps.
        </p>

        <button
          className="hw-back-dashboard"
          onClick={() => handleMenuClick("Dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    );
  };

  return (
    <div className="hw-dashboard">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="hw-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`hw-sidebar ${sidebarOpen ? "open" : ""}`}>

        {/* Logo */}
        <div className="hw-logo">
          <div className="hw-logo-icon">
            <HeartPulse size={27} />
          </div>

          <div className="hw-logo-text">
            <h2>AAROGYA LINK</h2>
            <span>Healthcare for Everyone</span>
          </div>
        </div>

        {/* Profile */}
        <div className="hw-sidebar-profile">
          <div className="hw-profile-avatar">
            <User size={24} />
          </div>

          <div>
            <h3>Health Worker</h3>
            <p>Community Health Worker</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="hw-sidebar-heading">
          MAIN MENU
        </div>

        <nav className="hw-sidebar-nav">
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={index}
                className={`hw-nav-item ${
                  activeMenu === item.title ? "active" : ""
                }`}
                onClick={() => handleMenuClick(item.title)}
                type="button"
              >
                <Icon size={20} />

                <span>{item.title}</span>

                {item.title === "Notifications" && (
                  <span className="hw-notification-count">3</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Bottom */}
        <div className="hw-sidebar-bottom">
          <div className="hw-support-box">
            <div className="hw-support-icon">
              <HelpCircle size={22} />
            </div>

            <h4>Need Help?</h4>

            <p>Contact our support team for assistance.</p>

            <button
              onClick={() => handleMenuClick("Help & Support")}
              type="button"
            >
              Get Support
            </button>
          </div>

          <button
            className="hw-logout-button"
            onClick={handleLogout}
            type="button"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="hw-main">

        {/* Top Navbar */}
        <header className="hw-topbar">

          <div className="hw-topbar-left">
            <button
              className="hw-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              type="button"
            >
              <Menu size={23} />
            </button>

            <div>
              <h2>{activeMenu}</h2>
              <p>Welcome to your healthcare workspace</p>
            </div>
          </div>

          <div className="hw-topbar-right">

            {/* Search */}
            <div className="hw-search-box">
              <Search size={18} />

              <input
                type="text"
                placeholder="Search patients..."
              />
            </div>

            {/* Notification */}
            <button
              className="hw-topbar-icon"
              onClick={() => handleMenuClick("Notifications")}
              type="button"
            >
              <Bell size={21} />
              <span className="hw-notification-dot"></span>
            </button>

            {/* Profile */}
            <button
              className="hw-topbar-profile"
              onClick={() => handleMenuClick("My Profile")}
              type="button"
            >
              <div className="hw-topbar-avatar">
                HW
              </div>

              <div>
                <strong>Health Worker</strong>
                <span>Community Worker</span>
              </div>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="hw-content">

          {activeMenu === "Dashboard"
            ? renderDashboard()
            : renderOtherSection()}

        </div>

        {/* Footer */}
        <footer className="hw-footer">
          <p>
            © 2026 AAROGYA LINK. All rights reserved.
          </p>

          <span>
            <HeartPulse size={15} />
            Bridging the Gap Between Care and Medicine
          </span>
        </footer>
      </main>
    </div>
  );
}

export default HealthWorkerDashboard;
import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  ClipboardList,
  FileText,
  Pill,
  UserRound,
  Settings,
  LogOut,
  Menu,
  Bell,
  Search,
  Stethoscope,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";

import DoctorOverview from "./DoctorOverview";
import DoctorPatients from "./DoctorPatients";
import DoctorAppointments from "./DoctorAppointments";
import DoctorConsultations from "./DoctorConsultations";
import DoctorPrescriptions from "./DoctorPrescriptions";
import DoctorMedicalRecords from "./DoctorMedicalRecords";
import DoctorReferrals from "./DoctorReferrals";
import DoctorProfile from "./DoctorProfile";
import DoctorSettings from "./DoctorSettings";

import "./DoctorDashboard.css";

const DoctorDashboard = () => {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { name: "Overview", icon: LayoutDashboard },
    { name: "My Patients", icon: Users },
    { name: "Appointments", icon: CalendarDays },
    { name: "Consultations", icon: Stethoscope },
    { name: "Prescriptions", icon: Pill },
    { name: "Medical Records", icon: FileText },
    { name: "Referrals", icon: ClipboardList },
    { name: "My Profile", icon: UserRound },
    { name: "Settings", icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="doctor-dashboard">

      {/* Sidebar */}
      <aside className={`doctor-sidebar ${sidebarOpen ? "" : "collapsed"}`}>

        <div className="doctor-brand">
          <div className="doctor-brand-icon">
            <Stethoscope size={24} />
          </div>

          {sidebarOpen && (
            <div>
              <h2>AAROGYA LINK</h2>
              <span>Doctor Portal</span>
            </div>
          )}
        </div>

        <div className="doctor-menu-heading">
          {sidebarOpen && "MAIN MENU"}
        </div>

        <nav className="doctor-navigation">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`doctor-nav-item ${
                  activeSection === item.name ? "active" : ""
                }`}
                onClick={() => setActiveSection(item.name)}
                title={!sidebarOpen ? item.name : ""}
              >
                <Icon size={20} />

                {sidebarOpen && <span>{item.name}</span>}
              </button>
            );
          })}
        </nav>

        <button className="doctor-logout" onClick={handleLogout}>
          <LogOut size={20} />
          {sidebarOpen && <span>Logout</span>}
        </button>

      </aside>

      {/* Main Content */}
      <main className="doctor-main">

        {/* Header */}
        <header className="doctor-header">

          <div className="doctor-header-left">
            <button
              className="doctor-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={22} />
            </button>

            <div>
              <h2>{activeSection}</h2>
              <p>Welcome to your Doctor Dashboard</p>
            </div>
          </div>

          <div className="doctor-header-right">

            <div className="doctor-search">
              <Search size={18} />
              <input type="text" placeholder="Search anything..." />
            </div>

            <button className="doctor-notification">
              <Bell size={21} />
              <span></span>
            </button>

            <div className="doctor-profile">
              <div className="doctor-avatar">D</div>

              <div>
                <h4>Doctor</h4>
                <span>Medical Professional</span>
              </div>
            </div>

          </div>
        </header>

        {/* Section Content */}
        <section className="doctor-content">

          {activeSection === "Overview" && <DoctorOverview />}
          {activeSection === "My Patients" && <DoctorPatients />}
          {activeSection === "Appointments" && <DoctorAppointments />}
            {activeSection === "Consultations" && <DoctorConsultations />}
            {activeSection === "Prescriptions" && <DoctorPrescriptions />}
            {activeSection === "Medical Records" && <DoctorMedicalRecords />}
            {activeSection === "Referrals" && <DoctorReferrals />}
            {activeSection === "My Profile" && <DoctorProfile />}
            {activeSection === "Settings" && <DoctorSettings />}
          {activeSection !== "Overview" && activeSection !== "My Patients" && activeSection !== "Appointments" && activeSection !== "Consultations" && activeSection !== "Prescriptions" && (
            <div className="doctor-placeholder">
              <h2>{activeSection}</h2>
              <p>This section will be developed step by step.</p>
            </div>
          )}

        </section>

      </main>

    </div>
  );
};

export default DoctorDashboard;
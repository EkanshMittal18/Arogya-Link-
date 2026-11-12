import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  UserRound,
  Pill,
  CalendarDays,
  ClipboardList,
  BriefcaseMedical,
  BarChart3,
  Bell,
  Building2,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Search,
  Plus,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Activity,
  UserCheck,
  Clock,
  CheckCircle,
  AlertCircle,
  HeartPulse,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
} from "lucide-react";
import "./HospitalAdminDashboard.css";
import DashboardSwitcher from "../common/DashboardSwitcher";

const HospitalAdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const menuItems = [
    { title: "Overview", icon: LayoutDashboard },
    { title: "Doctors Management", icon: Stethoscope },
    { title: "Patients Management", icon: Users },
    { title: "Health Workers", icon: UserRound },
    { title: "Pharmacy Management", icon: Pill },
    { title: "Appointments", icon: CalendarDays },
    { title: "Referrals", icon: ClipboardList },
    { title: "Staff Management", icon: BriefcaseMedical },
    { title: "Reports & Analytics", icon: BarChart3 },
    { title: "Notifications", icon: Bell },
    { title: "Hospital Profile", icon: Building2 },
    { title: "Settings", icon: Settings },
  ];

  const stats = [
    {
      title: "Total Patients",
      value: "2,450",
      change: "+12.5%",
      icon: Users,
      color: "blue",
    },
    {
      title: "Registered Doctors",
      value: "48",
      change: "+8.2%",
      icon: Stethoscope,
      color: "green",
    },
    {
      title: "Appointments",
      value: "186",
      change: "+15.3%",
      icon: CalendarDays,
      color: "purple",
    },
    {
      title: "Health Workers",
      value: "32",
      change: "+5.4%",
      icon: UserCheck,
      color: "orange",
    },
  ];

  const doctors = [
    {
      id: "DOC-001",
      name: "Dr. Amit Sharma",
      specialization: "General Physician",
      phone: "9876543210",
      email: "amit@hospital.com",
      status: "Active",
    },
    {
      id: "DOC-002",
      name: "Dr. Neha Verma",
      specialization: "Pediatrician",
      phone: "9876543211",
      email: "neha@hospital.com",
      status: "Active",
    },
    {
      id: "DOC-003",
      name: "Dr. Rahul Singh",
      specialization: "Cardiologist",
      phone: "9876543212",
      email: "rahul@hospital.com",
      status: "Pending",
    },
  ];

  const patients = [
    {
      id: "PAT-1001",
      name: "Vikash Gupta",
      age: 35,
      gender: "Male",
      phone: "9876543210",
      status: "Active",
    },
    {
      id: "PAT-1002",
      name: "Sunita Devi",
      age: 42,
      gender: "Female",
      phone: "9876543211",
      status: "Active",
    },
    {
      id: "PAT-1003",
      name: "Mohan Singh",
      age: 28,
      gender: "Male",
      phone: "9876543212",
      status: "Active",
    },
  ];

  const workers = [
    {
      id: "HW-001",
      name: "Priya Kumari",
      location: "Rampur",
      phone: "9876543201",
      status: "Active",
    },
    {
      id: "HW-002",
      name: "Ravi Kumar",
      location: "Moradabad",
      phone: "9876543202",
      status: "Active",
    },
  ];

  const pharmacies = [
    {
      id: "PH-001",
      name: "Community Pharmacy",
      location: "Rampur",
      phone: "9876543210",
      status: "Verified",
    },
    {
      id: "PH-002",
      name: "City Medical Store",
      location: "Moradabad",
      phone: "9876543211",
      status: "Pending",
    },
  ];

  const appointments = [
    {
      id: "APT-001",
      patient: "Vikash Gupta",
      doctor: "Dr. Amit Sharma",
      date: "12 Nov 2026",
      time: "10:30 AM",
      status: "Confirmed",
    },
    {
      id: "APT-002",
      patient: "Sunita Devi",
      doctor: "Dr. Neha Verma",
      date: "12 Nov 2026",
      time: "11:30 AM",
      status: "Pending",
    },
  ];

  const referrals = [
    {
      id: "REF-001",
      patient: "Mohan Singh",
      referredBy: "Dr. Amit Sharma",
      destination: "District Hospital",
      status: "Pending",
    },
    {
      id: "REF-002",
      patient: "Sunita Devi",
      referredBy: "Dr. Neha Verma",
      destination: "Specialist Department",
      status: "Completed",
    },
  ];

  const staff = [
    {
      id: "STF-001",
      name: "Anjali Verma",
      role: "Receptionist",
      department: "Administration",
      status: "Active",
    },
    {
      id: "STF-002",
      name: "Rohit Kumar",
      role: "Nurse",
      department: "Emergency",
      status: "Active",
    },
  ];

  const notifications = [
    {
      id: 1,
      title: "New Doctor Registration",
      message: "Dr. Rahul Singh has requested hospital registration.",
      time: "10 minutes ago",
    },
    {
      id: 2,
      title: "New Pharmacy Request",
      message: "City Medical Store has requested verification.",
      time: "1 hour ago",
    },
    {
      id: 3,
      title: "Appointment Update",
      message: "A new appointment has been scheduled.",
      time: "2 hours ago",
    },
  ];

  const handleMenuClick = (title) => {
    setActiveMenu(title);
    setSidebarOpen(false);
    setSearchTerm("");
    setSelectedItem(null);
  };

  const handleLogout = () => {
    alert("Logout functionality will be connected with Firebase.");
  };

  const getStatusClass = (status) => {
    if (["Active", "Verified", "Confirmed", "Completed"].includes(status)) {
      return "ha-status success";
    }

    if (["Pending"].includes(status)) {
      return "ha-status pending";
    }

    return "ha-status neutral";
  };

  const renderHeader = (title, description, buttonText) => (
    <div className="ha-section-header">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      {buttonText && (
        <button
          className="ha-primary-btn"
          onClick={() => setShowModal(true)}
        >
          <Plus size={17} />
          {buttonText}
        </button>
      )}
    </div>
  );

  const renderTable = (headers, data, type) => {
    const filteredData = data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    return (
      <div className="ha-table-wrapper">
        <table className="ha-table">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                {Object.entries(item).map(([key, value]) => (
                  <td key={key}>
                    {key === "status" ? (
                      <span className={getStatusClass(value)}>
                        {value}
                      </span>
                    ) : (
                      value
                    )}
                  </td>
                ))}

                <td>
                  <div className="ha-table-actions">
                    <button
                      title="View"
                      onClick={() => setSelectedItem(item)}
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      title="Edit"
                      onClick={() => {
                        setSelectedItem(item);
                        setShowModal(true);
                      }}
                    >
                      <Edit size={16} />
                    </button>

                    <button
                      title="More"
                      onClick={() => alert(`${type}: ${item.id}`)}
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredData.length === 0 && (
              <tr>
                <td colSpan={headers.length + 1} className="ha-empty">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const renderOverview = () => (
    <>
      <div className="ha-welcome">
        <div>
          <span>HOSPITAL ADMINISTRATION</span>
          <h1>Welcome back, Hospital Admin!</h1>
          <p>
            Here's what's happening in your hospital today.
            Manage your healthcare operations from one place.
          </p>
        </div>

        <div className="ha-welcome-icon">
          <Building2 size={55} />
        </div>
      </div>

      <div className="ha-stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="ha-stat-card" key={stat.title}>
              <div className="ha-stat-top">
                <div className={`ha-stat-icon ${stat.color}`}>
                  <Icon size={23} />
                </div>

                <span className="ha-stat-change">
                  <TrendingUp size={14} />
                  {stat.change}
                </span>
              </div>

              <h2>{stat.value}</h2>
              <p>{stat.title}</p>
            </div>
          );
        })}
      </div>

      <div className="ha-overview-grid">
        <section className="ha-card">
          <div className="ha-card-heading">
            <div>
              <h3>Recent Appointments</h3>
              <p>Latest hospital appointments</p>
            </div>

            <button onClick={() => handleMenuClick("Appointments")}>
              View All
            </button>
          </div>

          {appointments.map((appointment) => (
            <div className="ha-activity-item" key={appointment.id}>
              <div className="ha-activity-icon">
                <CalendarDays size={19} />
              </div>

              <div>
                <strong>{appointment.patient}</strong>
                <p>{appointment.doctor}</p>
                <span>{appointment.date} · {appointment.time}</span>
              </div>

              <span className={getStatusClass(appointment.status)}>
                {appointment.status}
              </span>
            </div>
          ))}
        </section>

        <section className="ha-card">
          <div className="ha-card-heading">
            <div>
              <h3>Recent Activities</h3>
              <p>Hospital updates and notifications</p>
            </div>
          </div>

          {notifications.map((item) => (
            <div className="ha-activity-item" key={item.id}>
              <div className="ha-activity-icon">
                <Bell size={19} />
              </div>

              <div>
                <strong>{item.title}</strong>
                <p>{item.message}</p>
                <span>{item.time}</span>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );

  const renderNotifications = () => (
    <section className="ha-card">
      {renderHeader(
        "Notifications",
        "Stay updated with hospital activities"
      )}

      {notifications.map((item) => (
        <div className="ha-notification-item" key={item.id}>
          <div className="ha-activity-icon">
            <Bell size={20} />
          </div>

          <div>
            <h3>{item.title}</h3>
            <p>{item.message}</p>
            <span>{item.time}</span>
          </div>
        </div>
      ))}
    </section>
  );

  const renderProfile = () => (
    <section className="ha-card ha-profile-card">
      <div className="ha-profile-cover">
        <div className="ha-profile-avatar">
          <Building2 size={35} />
        </div>
      </div>

      <div className="ha-profile-body">
        <h2>AAROGYA Community Hospital</h2>
        <p>Registered Healthcare Partner</p>

        <div className="ha-profile-grid">
          <div>
            <span>Hospital ID</span>
            <strong>HSP-1001</strong>
          </div>

          <div>
            <span>Hospital Name</span>
            <strong>AAROGYA Community Hospital</strong>
          </div>

          <div>
            <span>Contact Number</span>
            <strong><Phone size={15} /> 9876543210</strong>
          </div>

          <div>
            <span>Email Address</span>
            <strong><Mail size={15} /> admin@aarogya.in</strong>
          </div>

          <div>
            <span>Location</span>
            <strong><MapPin size={15} /> Moradabad, Uttar Pradesh</strong>
          </div>

          <div>
            <span>Verification</span>
            <strong className="ha-verified">
              <ShieldCheck size={16} /> Verified Hospital
            </strong>
          </div>
        </div>
      </div>
    </section>
  );

  const renderSettings = () => (
    <section className="ha-card">
      {renderHeader(
        "Hospital Settings",
        "Manage hospital preferences and account settings"
      )}

      <div className="ha-settings-list">
        <div>
          <div>
            <h3>Hospital Information</h3>
            <p>Manage hospital details and contact information.</p>
          </div>
          <button onClick={() => handleMenuClick("Hospital Profile")}>
            Manage
          </button>
        </div>

        <div>
          <div>
            <h3>Staff Permissions</h3>
            <p>Manage staff access and responsibilities.</p>
          </div>
          <button onClick={() => handleMenuClick("Staff Management")}>
            Manage
          </button>
        </div>

        <div>
          <div>
            <h3>Notifications</h3>
            <p>View hospital notifications and updates.</p>
          </div>
          <button onClick={() => handleMenuClick("Notifications")}>
            View
          </button>
        </div>
      </div>
    </section>
  );

  const renderSection = () => {
    switch (activeMenu) {
      case "Overview":
        return renderOverview();

      case "Doctors Management":
        return (
          <section className="ha-card">
            {renderHeader(
              "Doctors Management",
              "Manage registered doctors and their accounts",
              "Add Doctor"
            )}
            {renderTable(
              ["Doctor ID", "Doctor Name", "Specialization", "Phone", "Email", "Status"],
              doctors,
              "Doctor"
            )}
          </section>
        );

      case "Patients Management":
        return (
          <section className="ha-card">
            {renderHeader(
              "Patients Management",
              "View and manage registered hospital patients"
            )}
            {renderTable(
              ["Patient ID", "Patient Name", "Age", "Gender", "Phone", "Status"],
              patients,
              "Patient"
            )}
          </section>
        );

      case "Health Workers":
        return (
          <section className="ha-card">
            {renderHeader(
              "Health Workers",
              "Manage community healthcare workers",
              "Add Health Worker"
            )}
            {renderTable(
              ["Worker ID", "Worker Name", "Location", "Phone", "Status"],
              workers,
              "Health Worker"
            )}
          </section>
        );

      case "Pharmacy Management":
        return (
          <section className="ha-card">
            {renderHeader(
              "Pharmacy Management",
              "Manage registered pharmacy partners"
            )}
            {renderTable(
              ["Pharmacy ID", "Pharmacy Name", "Location", "Phone", "Status"],
              pharmacies,
              "Pharmacy"
            )}
          </section>
        );

      case "Appointments":
        return (
          <section className="ha-card">
            {renderHeader(
              "Appointments Management",
              "Monitor patient appointments"
            )}
            {renderTable(
              ["Appointment ID", "Patient", "Doctor", "Date", "Time", "Status"],
              appointments,
              "Appointment"
            )}
          </section>
        );

      case "Referrals":
        return (
          <section className="ha-card">
            {renderHeader(
              "Referrals Management",
              "Monitor patient referrals and their progress"
            )}
            {renderTable(
              ["Referral ID", "Patient", "Referred By", "Destination", "Status"],
              referrals,
              "Referral"
            )}
          </section>
        );

      case "Staff Management":
        return (
          <section className="ha-card">
            {renderHeader(
              "Staff Management",
              "Manage hospital staff members",
              "Add Staff"
            )}
            {renderTable(
              ["Staff ID", "Staff Name", "Role", "Department", "Status"],
              staff,
              "Staff"
            )}
          </section>
        );

      case "Reports & Analytics":
        return (
          <section className="ha-card">
            {renderHeader(
              "Reports & Analytics",
              "Hospital performance overview"
            )}

            <div className="ha-report-grid">
              <div>
                <Activity size={25} />
                <h2>2,450</h2>
                <p>Total Patient Registrations</p>
              </div>

              <div>
                <CalendarDays size={25} />
                <h2>186</h2>
                <p>Total Appointments</p>
              </div>

              <div>
                <UserCheck size={25} />
                <h2>48</h2>
                <p>Registered Doctors</p>
              </div>

              <div>
                <TrendingUp size={25} />
                <h2>94%</h2>
                <p>Appointment Completion</p>
              </div>
            </div>

            <p className="ha-demo-note">
              Analytics currently display sample data.
              Live reports will be connected with Firebase.
            </p>
          </section>
        );

      case "Notifications":
        return renderNotifications();

      case "Hospital Profile":
        return renderProfile();

      case "Settings":
        return renderSettings();

      default:
        return renderOverview();
    }
  };

  return (
    <div className="ha-page">
      <DashboardSwitcher currentRole="hospital_admin" />

      <div className="ha-dashboard">
        {sidebarOpen && (
          <div
            className="ha-sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside className={`ha-sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="ha-logo">
            <div className="ha-logo-icon">
              <HeartPulse size={27} />
            </div>

            <div>
              <h2>AAROGYA LINK</h2>
              <span>Healthcare for Everyone</span>
            </div>
          </div>

          <div className="ha-admin-profile">
            <div className="ha-admin-avatar">
              <Building2 size={23} />
            </div>

            <div>
              <h3>Hospital Admin</h3>
              <p>Hospital Administrator</p>
            </div>
          </div>

          <div className="ha-sidebar-heading">MAIN MENU</div>

          <nav className="ha-sidebar-nav">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  type="button"
                  key={item.title}
                  className={`ha-nav-item ${
                    activeMenu === item.title ? "active" : ""
                  }`}
                  onClick={() => handleMenuClick(item.title)}
                >
                  <Icon size={19} />
                  <span>{item.title}</span>
                </button>
              );
            })}
          </nav>

          <div className="ha-sidebar-bottom">
            <div className="ha-help-box">
              <HelpCircle size={23} />
              <h4>Need Help?</h4>
              <p>Contact our support team for assistance.</p>
              <button onClick={() => alert("Support section coming soon")}>
                Get Support
              </button>
            </div>

            <button
              className="ha-logout"
              onClick={handleLogout}
              type="button"
            >
              <LogOut size={19} />
              Logout
            </button>
          </div>
        </aside>

        <main className="ha-main">
          <header className="ha-topbar">
            <div className="ha-topbar-left">
              <button
                className="ha-menu-toggle"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                type="button"
              >
                <Menu size={23} />
              </button>

              <div>
                <h2>{activeMenu}</h2>
                <p>Welcome to your hospital administration workspace</p>
              </div>
            </div>

            <div className="ha-topbar-right">
              <div className="ha-search-box">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <button
                className="ha-notification-btn"
                onClick={() => handleMenuClick("Notifications")}
                type="button"
              >
                <Bell size={21} />
                <span />
              </button>

              <div className="ha-topbar-user">
                <div className="ha-topbar-avatar">HA</div>
                <div>
                  <strong>Hospital Admin</strong>
                  <span>Administrator</span>
                </div>
              </div>
            </div>
          </header>

          <div className="ha-content">
            {renderSection()}
          </div>

          <footer className="ha-footer">
            <p>© 2026 AAROGYA LINK. All rights reserved.</p>
            <span>
              <HeartPulse size={15} />
              Bridging the Gap Between Care and Medicine
            </span>
          </footer>
        </main>
      </div>

      {selectedItem && !showModal && (
        <div
          className="ha-modal-overlay"
          onClick={() => setSelectedItem(null)}
        >
          <div className="ha-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ha-modal-header">
              <h2>Record Details</h2>
              <button onClick={() => setSelectedItem(null)}>
                <X size={20} />
              </button>
            </div>

            {Object.entries(selectedItem).map(([key, value]) => (
              <div className="ha-detail-row" key={key}>
                <span>{key}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      )}

      {showModal && (
        <div
          className="ha-modal-overlay"
          onClick={() => {
            setShowModal(false);
            setSelectedItem(null);
          }}
        >
          <div className="ha-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ha-modal-header">
              <div>
                <h2>{selectedItem ? "Edit Record" : "Add New Record"}</h2>
                <p>
                  {selectedItem
                    ? "Review the selected record."
                    : "New records will be connected with Firebase later."}
                </p>
              </div>

              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedItem(null);
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="ha-modal-placeholder">
              <AlertCircle size={28} />
              <p>
                This form is a UI placeholder. Data saving and editing
                functionality will be implemented in the next development
                phase.
              </p>
            </div>

            <button
              className="ha-primary-btn ha-modal-close-btn"
              onClick={() => {
                setShowModal(false);
                setSelectedItem(null);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalAdminDashboard;
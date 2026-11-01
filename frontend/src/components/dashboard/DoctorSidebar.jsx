
import React from "react";
import "./DoctorSidebar.css";
import logo from "../../assets/aarogya-link-logo.png";

const menuItems = [
  { name: "Overview", icon: "⌂", id: "overview" },
  { name: "Patient Management", icon: "♙", id: "patients" },
  { name: "AI Clinical Summary", icon: "✧", id: "ai-summary" },
  { name: "Patient Cases", icon: "▤", id: "cases" },
  { name: "Prescriptions", icon: "✚", id: "prescriptions" },
  { name: "Referrals", icon: "⇄", id: "referrals" },
  { name: "Follow-ups", icon: "◷", id: "followups" },
  { name: "Notifications", icon: "♧", id: "notifications" },
  { name: "Settings", icon: "⚙", id: "settings" },
];

function DoctorSidebar({ activeItem = "overview", onNavigate }) {
  return (
    <aside className="doctor-sidebar">

      {/* Original Aarogya Link Logo */}
      <div className="doctor-sidebar-logo">
        <img
          src={logo}
          alt="Aarogya Link Logo"
          className="doctor-brand-logo"
        />
      </div>

      {/* Doctor Profile */}
      <div className="doctor-sidebar-profile">
        <div className="doctor-avatar">DR</div>
        <div>
          <h3>Doctor Portal</h3>
          <p>Medical Professional</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="doctor-sidebar-menu">
        <p className="sidebar-section-title">MAIN MENU</p>

        {menuItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`doctor-menu-item ${
              activeItem === item.id ? "active" : ""
            }`}
            onClick={() => onNavigate?.(item.id)}
          >
            <span className="doctor-menu-icon">{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </div>

      {/* Help Section */}
      <div className="doctor-sidebar-help">
        <div className="help-icon">?</div>
        <h4>Need Help?</h4>
        <p>Contact support for assistance with your portal.</p>
        <button type="button">Contact Support</button>
      </div>

      {/* Footer */}
      <div className="doctor-sidebar-footer">
        <p>© 2026 Aarogya Link</p>
        <span>Bridging Care & Community</span>
      </div>

    </aside>
  );
}

export default DoctorSidebar;

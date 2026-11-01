import React, { useState } from "react";
import {
  Settings,
  Bell,
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  Globe,
  Moon,
  Sun,
  Mail,
  MessageSquare,
  Smartphone,
  CalendarDays,
  Save,
  CheckCircle,
  AlertCircle,
  UserRound,
  LogOut,
} from "lucide-react";

function DoctorSettings() {
  const [activeTab, setActiveTab] = useState("General");
  const [saved, setSaved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [settings, setSettings] = useState({
    language: "English",
    timezone: "Asia/Kolkata",
    theme: "Light",
    emailNotifications: true,
    appointmentNotifications: true,
    patientNotifications: true,
    systemNotifications: false,
    smsNotifications: true,
    twoFactor: false,
    profileVisibility: true,
    showAvailability: true,
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));

    setSaved(false);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();

    if (passwords.new !== passwords.confirm) {
      alert("New password and confirm password do not match.");
      return;
    }

    if (passwords.new.length < 8) {
      alert("Password must contain at least 8 characters.");
      return;
    }

    alert(
      "Demo mode: Password update is not connected to Firebase Authentication."
    );

    setPasswords({
      current: "",
      new: "",
      confirm: "",
    });
  };

  const tabs = [
    { name: "General", icon: Settings },
    { name: "Notifications", icon: Bell },
    { name: "Privacy", icon: ShieldCheck },
    { name: "Security", icon: Lock },
  ];

  const Toggle = ({ value, onChange }) => (
    <button
      type="button"
      className={`settings-toggle ${value ? "active" : ""}`}
      onClick={() => onChange(!value)}
      aria-pressed={value}
    >
      <span></span>
    </button>
  );

  return (
    <div className="doctor-section doctor-settings-section">

      {/* Heading */}

      <div className="doctor-section-heading">
        <div>
          <span className="doctor-eyebrow">ACCOUNT PREFERENCES</span>
          <h2>Settings</h2>
          <p>
            Customize your dashboard experience, notifications and security.
          </p>
        </div>
      </div>

      {saved && (
        <div className="settings-success-message">
          <CheckCircle size={18} />
          Settings saved for this session.
        </div>
      )}

      <div className="settings-layout">

        {/* Sidebar Tabs */}

        <div className="settings-sidebar">
          <div className="settings-sidebar-title">
            <Settings size={17} />
            <span>Settings Menu</span>
          </div>

          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.name}
                className={`settings-tab ${
                  activeTab === tab.name ? "active" : ""
                }`}
                onClick={() => setActiveTab(tab.name)}
              >
                <Icon size={18} />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Settings Content */}

        <div className="settings-content">

          {/* GENERAL */}

          {activeTab === "General" && (
            <div className="settings-panel">

              <div className="settings-panel-heading">
                <div>
                  <h3>General Settings</h3>
                  <p>Manage your dashboard preferences.</p>
                </div>

                <Settings size={22} />
              </div>

              <div className="settings-option">
                <div className="settings-option-info">
                  <div className="settings-option-icon">
                    <Globe size={19} />
                  </div>

                  <div>
                    <h4>Language</h4>
                    <p>Select your preferred dashboard language.</p>
                  </div>
                </div>

                <select
                  value={settings.language}
                  onChange={(e) =>
                    updateSetting("language", e.target.value)
                  }
                  className="settings-select"
                >
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Assamese</option>
                </select>
              </div>

              <div className="settings-option">
                <div className="settings-option-info">
                  <div className="settings-option-icon">
                    <CalendarDays size={19} />
                  </div>

                  <div>
                    <h4>Timezone</h4>
                    <p>Set your local timezone.</p>
                  </div>
                </div>

                <select
                  value={settings.timezone}
                  onChange={(e) =>
                    updateSetting("timezone", e.target.value)
                  }
                  className="settings-select"
                >
                  <option value="Asia/Kolkata">
                    India Standard Time
                  </option>
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">
                    Eastern Time
                  </option>
                </select>
              </div>

              <div className="settings-option">
                <div className="settings-option-info">
                  <div className="settings-option-icon">
                    {settings.theme === "Light" ? (
                      <Sun size={19} />
                    ) : (
                      <Moon size={19} />
                    )}
                  </div>

                  <div>
                    <h4>Appearance</h4>
                    <p>Choose your dashboard appearance.</p>
                  </div>
                </div>

                <select
                  value={settings.theme}
                  onChange={(e) =>
                    updateSetting("theme", e.target.value)
                  }
                  className="settings-select"
                >
                  <option>Light</option>
                  <option>Dark</option>
                </select>
              </div>

            </div>
          )}

          {/* NOTIFICATIONS */}

          {activeTab === "Notifications" && (
            <div className="settings-panel">

              <div className="settings-panel-heading">
                <div>
                  <h3>Notification Preferences</h3>
                  <p>Choose which notifications you want to receive.</p>
                </div>

                <Bell size={22} />
              </div>

              <div className="settings-group-title">
                Email Notifications
              </div>

              <div className="settings-option">
                <div className="settings-option-info">
                  <div className="settings-option-icon">
                    <Mail size={19} />
                  </div>

                  <div>
                    <h4>Email Updates</h4>
                    <p>Receive important updates through email.</p>
                  </div>
                </div>

                <Toggle
                  value={settings.emailNotifications}
                  onChange={(value) =>
                    updateSetting("emailNotifications", value)
                  }
                />
              </div>

              <div className="settings-option">
                <div className="settings-option-info">
                  <div className="settings-option-icon">
                    <CalendarDays size={19} />
                  </div>

                  <div>
                    <h4>Appointment Alerts</h4>
                    <p>Get notified about new appointments.</p>
                  </div>
                </div>

                <Toggle
                  value={settings.appointmentNotifications}
                  onChange={(value) =>
                    updateSetting("appointmentNotifications", value)
                  }
                />
              </div>

              <div className="settings-option">
                <div className="settings-option-info">
                  <div className="settings-option-icon">
                    <UserRound size={19} />
                  </div>

                  <div>
                    <h4>Patient Updates</h4>
                    <p>Receive important patient-related updates.</p>
                  </div>
                </div>

                <Toggle
                  value={settings.patientNotifications}
                  onChange={(value) =>
                    updateSetting("patientNotifications", value)
                  }
                />
              </div>

              <div className="settings-group-title">
                Other Notifications
              </div>

              <div className="settings-option">
                <div className="settings-option-info">
                  <div className="settings-option-icon">
                    <MessageSquare size={19} />
                  </div>

                  <div>
                    <h4>System Notifications</h4>
                    <p>Receive platform announcements and updates.</p>
                  </div>
                </div>

                <Toggle
                  value={settings.systemNotifications}
                  onChange={(value) =>
                    updateSetting("systemNotifications", value)
                  }
                />
              </div>

              <div className="settings-option">
                <div className="settings-option-info">
                  <div className="settings-option-icon">
                    <Smartphone size={19} />
                  </div>

                  <div>
                    <h4>SMS Notifications</h4>
                    <p>Receive alerts through text messages.</p>
                  </div>
                </div>

                <Toggle
                  value={settings.smsNotifications}
                  onChange={(value) =>
                    updateSetting("smsNotifications", value)
                  }
                />
              </div>

            </div>
          )}

          {/* PRIVACY */}

          {activeTab === "Privacy" && (
            <div className="settings-panel">

              <div className="settings-panel-heading">
                <div>
                  <h3>Privacy Settings</h3>
                  <p>Manage your account visibility and preferences.</p>
                </div>

                <ShieldCheck size={22} />
              </div>

              <div className="settings-option">
                <div className="settings-option-info">
                  <div className="settings-option-icon">
                    <Eye size={19} />
                  </div>

                  <div>
                    <h4>Profile Visibility</h4>
                    <p>
                      Allow authorized users to view your doctor profile.
                    </p>
                  </div>
                </div>

                <Toggle
                  value={settings.profileVisibility}
                  onChange={(value) =>
                    updateSetting("profileVisibility", value)
                  }
                />
              </div>

              <div className="settings-option">
                <div className="settings-option-info">
                  <div className="settings-option-icon">
                    <CalendarDays size={19} />
                  </div>

                  <div>
                    <h4>Show Availability</h4>
                    <p>
                      Display your consultation availability to patients.
                    </p>
                  </div>
                </div>

                <Toggle
                  value={settings.showAvailability}
                  onChange={(value) =>
                    updateSetting("showAvailability", value)
                  }
                />
              </div>

              <div className="settings-security-note">
                <ShieldCheck size={20} />
                <div>
                  <h4>Patient Data Protection</h4>
                  <p>
                    Patient medical records should only be accessible to
                    authorized healthcare professionals with appropriate
                    patient consent.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* SECURITY */}

          {activeTab === "Security" && (
            <div className="settings-panel">

              <div className="settings-panel-heading">
                <div>
                  <h3>Security Settings</h3>
                  <p>Manage your account security.</p>
                </div>

                <Lock size={22} />
              </div>

              <div className="settings-option">
                <div className="settings-option-info">
                  <div className="settings-option-icon">
                    <ShieldCheck size={19} />
                  </div>

                  <div>
                    <h4>Two-Factor Authentication</h4>
                    <p>
                      Enable an additional verification step for your account.
                    </p>
                  </div>
                </div>

                <Toggle
                  value={settings.twoFactor}
                  onChange={(value) =>
                    updateSetting("twoFactor", value)
                  }
                />
              </div>

              <div className="settings-password-card">
                <div className="settings-password-heading">
                  <Lock size={19} />
                  <div>
                    <h4>Change Password</h4>
                    <p>Update your account password.</p>
                  </div>
                </div>

                <form onSubmit={handlePasswordSave}>

                  <div className="settings-password-field">
                    <label>Current Password</label>

                    <input
                      type="password"
                      name="current"
                      value={passwords.current}
                      onChange={handlePasswordChange}
                      placeholder="Enter current password"
                      required
                    />
                  </div>

                  <div className="settings-password-field">
                    <label>New Password</label>

                    <div className="settings-password-input">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="new"
                        value={passwords.new}
                        onChange={handlePasswordChange}
                        placeholder="Enter new password"
                        required
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                      >
                        {showPassword ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="settings-password-field">
                    <label>Confirm New Password</label>

                    <input
                      type="password"
                      name="confirm"
                      value={passwords.confirm}
                      onChange={handlePasswordChange}
                      placeholder="Confirm new password"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="settings-password-btn"
                  >
                    <Lock size={16} />
                    Update Password
                  </button>

                </form>
              </div>

              <div className="settings-security-note">
                <AlertCircle size={20} />
                <div>
                  <h4>Account Security</h4>
                  <p>
                    Password updates and two-factor authentication must be
                    connected to Firebase Authentication before they can
                    provide actual account security.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* Save Button */}

          <div className="settings-save-footer">
            <p>Review your preferences before saving.</p>

            <button
              className="doctor-primary-btn"
              onClick={handleSave}
            >
              <Save size={17} />
              Save Settings
            </button>
          </div>

        </div>
      </div>

      <div className="settings-demo-notice">
        <ShieldCheck size={17} />
        <p>
          Demo mode: Settings are stored temporarily in React state.
          Notification delivery, theme switching, two-factor authentication
          and Firebase synchronization are not connected yet.
        </p>
      </div>

    </div>
  );
}

export default DoctorSettings;
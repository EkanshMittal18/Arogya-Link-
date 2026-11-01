import React, { useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Droplets,
  HeartPulse,
  ShieldCheck,
  Camera,
  Edit3,
  Save,
  X,
  AlertCircle,
  CheckCircle2,
  User,
  Lock,
} from "lucide-react";

const initialProfile = {
  name: "Demo Patient",
  patientId: "ALP10234",
  age: "35",
  gender: "Male",
  dob: "1991-05-15",
  phone: "+91 98765 43210",
  email: "patient@example.com",
  address: "Moradabad, Uttar Pradesh, India",
  bloodGroup: "B+",
  allergies: "None reported",
  emergencyName: "Rahul Sharma",
  emergencyPhone: "+91 98765 12345",
  medicalHistory: "No medical history added",
};

function PatientProfile() {
  const [profile, setProfile] = useState(initialProfile);
  const [editMode, setEditMode] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setEditMode(false);
    setSaved(true);
  };

  const handleCancel = () => {
    setProfile(initialProfile);
    setEditMode(false);
    setSaved(false);
  };

  const profileFields = [
    { label: "Full Name", name: "name", icon: UserRound },
    { label: "Age", name: "age", icon: CalendarDays },
    { label: "Gender", name: "gender", icon: User },
    { label: "Date of Birth", name: "dob", icon: CalendarDays },
    { label: "Phone Number", name: "phone", icon: Phone },
    { label: "Email Address", name: "email", icon: Mail },
    { label: "Address", name: "address", icon: MapPin },
  ];

  return (
    <div className="profile-page">

      {/* HEADER */}
      <div className="profile-header">
        <div>
          <span className="profile-eyebrow">YOUR ACCOUNT</span>
          <h1>My Profile</h1>
          <p>Manage your personal information and healthcare details.</p>
        </div>

        <div className="profile-header-icon">
          <UserRound size={28} />
        </div>
      </div>

      {/* PROFILE HERO */}
      <div className="profile-hero-card">

        <div className="profile-avatar-wrapper">
          <div className="profile-avatar">
            <UserRound size={48} />
          </div>

          <button
            type="button"
            className="profile-camera-btn"
            title="Profile photo preview only"
            onClick={() => window.alert("Photo upload will be added later.")}
          >
            <Camera size={16} />
          </button>
        </div>

        <div className="profile-hero-info">
          <h2>{profile.name}</h2>
          <p>Patient ID: {profile.patientId}</p>

          <span className="profile-verified">
            <ShieldCheck size={14} />
            Patient Account
          </span>
        </div>

        <div className="profile-completion">
          <div className="profile-completion-heading">
            <span>Profile Completion</span>
            <strong>85%</strong>
          </div>

          <div className="profile-progress-track">
            <div className="profile-progress-fill"></div>
          </div>

          <small>Keep your information updated.</small>
        </div>

      </div>

      {/* SUCCESS MESSAGE */}
      {saved && (
        <div className="profile-success">
          <CheckCircle2 size={18} />
          Profile updated successfully in this preview.
        </div>
      )}

      {/* PERSONAL INFORMATION */}
      <form onSubmit={handleSave}>

        <div className="profile-section">

          <div className="profile-section-heading">
            <div>
              <h2>Personal Information</h2>
              <p>Your basic personal and contact details.</p>
            </div>

            {!editMode ? (
              <button
                type="button"
                className="profile-edit-btn"
                onClick={() => setEditMode(true)}
              >
                <Edit3 size={16} />
                Edit Profile
              </button>
            ) : (
              <div className="profile-edit-actions">

                <button
                  type="button"
                  className="profile-cancel-btn"
                  onClick={handleCancel}
                >
                  <X size={15} />
                  Cancel
                </button>

                <button
                  type="submit"
                  className="profile-save-btn"
                >
                  <Save size={15} />
                  Save Changes
                </button>

              </div>
            )}
          </div>

          <div className="profile-fields-grid">

            {profileFields.map((field) => {
              const Icon = field.icon;

              return (
                <div className="profile-field" key={field.name}>

                  <label>{field.label}</label>

                  <div className="profile-input-wrapper">
                    <Icon size={17} />

                    <input
                      type={
                        field.name === "dob"
                          ? "date"
                          : field.name === "email"
                          ? "email"
                          : field.name === "age"
                          ? "number"
                          : "text"
                      }
                      name={field.name}
                      value={profile[field.name]}
                      onChange={handleChange}
                      disabled={!editMode}
                      required
                      min={field.name === "age" ? "1" : undefined}
                      max={field.name === "age" ? "120" : undefined}
                    />
                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </form>

      {/* HEALTH INFORMATION */}
      <div className="profile-section">

        <div className="profile-section-heading">
          <div>
            <h2>Healthcare Information</h2>
            <p>Important health information for your care journey.</p>
          </div>
        </div>

        <div className="profile-health-grid">

          <div className="profile-health-card">
            <div className="profile-health-icon blood">
              <Droplets size={22} />
            </div>

            <div>
              <span>Blood Group</span>
              <h3>{profile.bloodGroup}</h3>
            </div>
          </div>

          <div className="profile-health-card">
            <div className="profile-health-icon allergy">
              <AlertCircle size={22} />
            </div>

            <div>
              <span>Known Allergies</span>
              <h3>{profile.allergies}</h3>
            </div>
          </div>

          <div className="profile-health-card">
            <div className="profile-health-icon history">
              <HeartPulse size={22} />
            </div>

            <div>
              <span>Medical History</span>
              <h3>{profile.medicalHistory}</h3>
            </div>
          </div>

        </div>

        <div className="profile-health-note">
          <AlertCircle size={17} />
          <p>
            Healthcare information should be verified by a qualified
            healthcare professional.
          </p>
        </div>

      </div>

      {/* EMERGENCY CONTACT */}
      <div className="profile-section">

        <div className="profile-section-heading">
          <div>
            <h2>Emergency Contact</h2>
            <p>Person to contact in case of an emergency.</p>
          </div>
        </div>

        <div className="profile-emergency-grid">

          <div className="profile-field">
            <label>Contact Person</label>

            <div className="profile-input-wrapper">
              <UserRound size={17} />

              <input
                value={profile.emergencyName}
                disabled
                readOnly
              />
            </div>
          </div>

          <div className="profile-field">
            <label>Emergency Phone</label>

            <div className="profile-input-wrapper">
              <Phone size={17} />

              <input
                value={profile.emergencyPhone}
                disabled
                readOnly
              />
            </div>
          </div>

        </div>

        <p className="profile-demo-note">
          Emergency contact editing will be available in the next backend
          integration phase.
        </p>

      </div>

      {/* PRIVACY */}
      <div className="profile-privacy-box">

        <div className="profile-privacy-icon">
          <Lock size={23} />
        </div>

        <div>
          <h4>Your Information is Important</h4>
          <p>
            Your personal and healthcare information should only be accessed
            with appropriate authorization and your consent.
          </p>
        </div>

        <ShieldCheck size={25} />

      </div>

      <p className="profile-demo-footer">
        Demo profile information is displayed for preview. Backend
        integration and secure cloud storage will be added later.
      </p>

    </div>
  );
}

export default PatientProfile;
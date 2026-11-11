import React, { useState, useEffect } from "react";
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
import { useAarogya } from "../../context/AarogyaContext";

function PatientProfile() {
  const { activePatient, updatePatientProfile } = useAarogya();

  const [profile, setProfile] = useState({
    name: activePatient.name || "Demo Patient",
    patientId: activePatient.id || "ALP10234",
    age: String(activePatient.age || "35"),
    gender: activePatient.gender || "Male",
    dob: activePatient.dob || "1991-05-15",
    phone: activePatient.phone || "+91 98765 43210",
    email: activePatient.email || "patient@aarogyalink.in",
    address: activePatient.address || `${activePatient.village || "Rampur"}, Moradabad, Uttar Pradesh`,
    bloodGroup: activePatient.bloodGroup || "B+",
    allergies: "None reported",
    emergencyName: activePatient.emergencyName || "Sunil Sharma",
    emergencyPhone: activePatient.emergencyPhone || "+91 98765 12345",
    medicalHistory: activePatient.medicalHistory || "Hypertension under observation",
  });

  const [editMode, setEditMode] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setProfile({
      name: activePatient.name || "Demo Patient",
      patientId: activePatient.id || "ALP10234",
      age: String(activePatient.age || "35"),
      gender: activePatient.gender || "Male",
      dob: activePatient.dob || "1991-05-15",
      phone: activePatient.phone || "+91 98765 43210",
      email: activePatient.email || "patient@aarogyalink.in",
      address: activePatient.address || `${activePatient.village || "Rampur"}, Moradabad, Uttar Pradesh`,
      bloodGroup: activePatient.bloodGroup || "B+",
      allergies: "None reported",
      emergencyName: activePatient.emergencyName || "Sunil Sharma",
      emergencyPhone: activePatient.emergencyPhone || "+91 98765 12345",
      medicalHistory: activePatient.medicalHistory || "Hypertension under observation",
    });
  }, [activePatient]);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    updatePatientProfile(activePatient.id, {
      name: profile.name,
      age: profile.age,
      gender: profile.gender,
      phone: profile.phone,
      address: profile.address,
      bloodGroup: profile.bloodGroup,
      medicalHistory: profile.medicalHistory,
      emergencyName: profile.emergencyName,
      emergencyPhone: profile.emergencyPhone,
    });
    setEditMode(false);
    setSaved(true);
  };

  const handleCancel = () => {
    setProfile({
      name: activePatient.name,
      patientId: activePatient.id,
      age: String(activePatient.age),
      gender: activePatient.gender,
      dob: activePatient.dob,
      phone: activePatient.phone,
      email: activePatient.email || "patient@aarogyalink.in",
      address: activePatient.address,
      bloodGroup: activePatient.bloodGroup,
      allergies: "None reported",
      emergencyName: activePatient.emergencyName,
      emergencyPhone: activePatient.emergencyPhone,
      medicalHistory: activePatient.medicalHistory,
    });
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
          <p>Manage your personal information, emergency contacts, and healthcare records.</p>
        </div>

        <div className="profile-header-icon">
          <UserRound size={28} />
        </div>
      </div>

      {/* PROFILE HERO */}
      <div className="profile-hero-card">
        <div className="profile-avatar-wrapper">
          <div className="profile-avatar font-bold text-xl text-emerald-800 bg-emerald-100 flex items-center justify-center">
            {activePatient.initials || "PT"}
          </div>
        </div>

        <div className="profile-hero-info">
          <h2>{profile.name}</h2>
          <p>Patient ID: {profile.patientId} • Village: {activePatient.village || "Rampur"}</p>

          <span className="profile-verified">
            <ShieldCheck size={14} />
            Verified Patient Account
          </span>
        </div>

        <div className="profile-completion">
          <div className="profile-completion-heading">
            <span>Profile Completion</span>
            <strong>95%</strong>
          </div>

          <div className="profile-progress-track">
            <div className="profile-progress-fill" style={{ width: "95%" }}></div>
          </div>

          <small>Live connected across Aarogya Link</small>
        </div>
      </div>

      {/* SUCCESS MESSAGE */}
      {saved && (
        <div className="profile-success flex items-center gap-2 bg-emerald-50 text-emerald-800 p-3 rounded-xl border border-emerald-200">
          <CheckCircle2 size={18} />
          Profile updated successfully and synchronized across Doctor & Health Worker portals!
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
              <div className="profile-edit-actions flex gap-2">
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
                  className="profile-save-btn bg-emerald-600 text-white px-4 py-2 rounded-xl flex items-center gap-1.5"
                >
                  <Save size={15} />
                  Save Changes
                </button>
              </div>
            )}
          </div>

          <div className="profile-grid">
            {profileFields.map((field) => {
              const Icon = field.icon;

              return (
                <div className="profile-field" key={field.name}>
                  <label>
                    <Icon size={16} />
                    <span>{field.label}</span>
                  </label>

                  {editMode ? (
                    <input
                      type="text"
                      name={field.name}
                      value={profile[field.name] || ""}
                      onChange={handleChange}
                      className="border rounded-xl p-2 text-sm w-full"
                    />
                  ) : (
                    <div className="profile-value">{profile[field.name]}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* MEDICAL DETAILS */}
        <div className="profile-section mt-6">
          <div className="profile-section-heading">
            <div>
              <h2>Medical Background</h2>
              <p>Details reviewed by visiting health workers and doctors.</p>
            </div>
          </div>

          <div className="profile-grid">
            <div className="profile-field">
              <label>
                <Droplets size={16} />
                <span>Blood Group</span>
              </label>
              {editMode ? (
                <input
                  type="text"
                  name="bloodGroup"
                  value={profile.bloodGroup}
                  onChange={handleChange}
                  className="border rounded-xl p-2 text-sm w-full"
                />
              ) : (
                <div className="profile-value">{profile.bloodGroup}</div>
              )}
            </div>

            <div className="profile-field">
              <label>
                <HeartPulse size={16} />
                <span>Medical History</span>
              </label>
              {editMode ? (
                <input
                  type="text"
                  name="medicalHistory"
                  value={profile.medicalHistory}
                  onChange={handleChange}
                  className="border rounded-xl p-2 text-sm w-full"
                />
              ) : (
                <div className="profile-value">{profile.medicalHistory}</div>
              )}
            </div>

            <div className="profile-field">
              <label>
                <UserRound size={16} />
                <span>Emergency Contact Person</span>
              </label>
              {editMode ? (
                <input
                  type="text"
                  name="emergencyName"
                  value={profile.emergencyName}
                  onChange={handleChange}
                  className="border rounded-xl p-2 text-sm w-full"
                />
              ) : (
                <div className="profile-value">{profile.emergencyName}</div>
              )}
            </div>

            <div className="profile-field">
              <label>
                <Phone size={16} />
                <span>Emergency Phone</span>
              </label>
              {editMode ? (
                <input
                  type="text"
                  name="emergencyPhone"
                  value={profile.emergencyPhone}
                  onChange={handleChange}
                  className="border rounded-xl p-2 text-sm w-full"
                />
              ) : (
                <div className="profile-value">{profile.emergencyPhone}</div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PatientProfile;

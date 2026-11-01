import React, { useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  Stethoscope,
  GraduationCap,
  BriefcaseMedical,
  Clock,
  Award,
  Edit3,
  Save,
  X,
  Camera,
  ShieldCheck,
} from "lucide-react";

const initialProfile = {
  name: "Dr. Ekansh Mittal",
  email: "doctor@aarogya-link.com",
  phone: "+91 98765 43210",
  gender: "Male",
  specialization: "General Physician",
  qualification: "MBBS",
  experience: "5 Years",
  registration: "MCI-2021-45892",
  hospital: "Aarogya Community Hospital",
  address: "Moradabad, Uttar Pradesh, India",
  about:
    "Dedicated medical professional focused on providing accessible and quality healthcare services to patients.",
  availability: "Monday - Saturday",
  consultationTime: "09:00 AM - 05:00 PM",
};

function DoctorProfile() {
  const [profile, setProfile] = useState(initialProfile);
  const [editMode, setEditMode] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));

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

  return (
    <div className="doctor-section doctor-profile-section">

      {/* Page Heading */}

      <div className="doctor-section-heading">
        <div>
          <span className="doctor-eyebrow">ACCOUNT MANAGEMENT</span>
          <h2>My Profile</h2>
          <p>
            Manage your personal information and professional details.
          </p>
        </div>

        {!editMode ? (
          <button
            className="doctor-primary-btn"
            onClick={() => setEditMode(true)}
          >
            <Edit3 size={17} />
            Edit Profile
          </button>
        ) : (
          <div className="profile-heading-actions">
            <button
              className="profile-cancel-btn"
              onClick={handleCancel}
            >
              <X size={16} />
              Cancel
            </button>

            <button
              className="doctor-primary-btn"
              onClick={() =>
                document.getElementById("doctor-profile-form").requestSubmit()
              }
            >
              <Save size={17} />
              Save Changes
            </button>
          </div>
        )}
      </div>

      {saved && (
        <div className="profile-success-message">
          <ShieldCheck size={18} />
          Profile changes saved for this session.
        </div>
      )}

      <form id="doctor-profile-form" onSubmit={handleSave}>

        {/* Profile Banner */}

        <div className="doctor-profile-banner">
          <div className="profile-cover-pattern"></div>

          <div className="profile-banner-content">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar">
                <UserRound size={48} />
              </div>

              {editMode && (
                <button
                  type="button"
                  className="profile-camera-btn"
                  title="Profile photo upload coming soon"
                >
                  <Camera size={16} />
                </button>
              )}
            </div>

            <div className="profile-banner-info">
              <h2>{profile.name}</h2>
              <p>{profile.specialization}</p>

              <span className="profile-verified">
                <ShieldCheck size={14} />
                Doctor Account
              </span>
            </div>

            <div className="profile-banner-status">
              <span className="profile-active-dot"></span>
              Active Account
            </div>
          </div>
        </div>

        {/* Personal Information */}

        <div className="profile-content-grid">

          <div className="profile-information-card">
            <div className="profile-card-heading">
              <div>
                <div className="profile-heading-icon">
                  <UserRound size={19} />
                </div>
              </div>

              <div>
                <h3>Personal Information</h3>
                <p>Your basic personal details.</p>
              </div>
            </div>

            <div className="profile-fields-grid">

              <div className="profile-field">
                <label>Full Name</label>
                <div className="profile-input-wrapper">
                  <UserRound size={16} />
                  <input
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    disabled={!editMode}
                    required
                  />
                </div>
              </div>

              <div className="profile-field">
                <label>Email Address</label>
                <div className="profile-input-wrapper">
                  <Mail size={16} />
                  <input
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!editMode}
                    required
                  />
                </div>
              </div>

              <div className="profile-field">
                <label>Phone Number</label>
                <div className="profile-input-wrapper">
                  <Phone size={16} />
                  <input
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </div>
              </div>

              <div className="profile-field">
                <label>Gender</label>
                <div className="profile-input-wrapper">
                  <UserRound size={16} />
                  <select
                    name="gender"
                    value={profile.gender}
                    onChange={handleChange}
                    disabled={!editMode}
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="profile-field full">
                <label>Address</label>
                <div className="profile-input-wrapper">
                  <MapPin size={16} />
                  <input
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Professional Information */}

          <div className="profile-information-card">
            <div className="profile-card-heading">
              <div className="profile-heading-icon">
                <BriefcaseMedical size={19} />
              </div>

              <div>
                <h3>Professional Information</h3>
                <p>Your medical qualifications and experience.</p>
              </div>
            </div>

            <div className="profile-fields-grid">

              <div className="profile-field">
                <label>Specialization</label>
                <div className="profile-input-wrapper">
                  <Stethoscope size={16} />
                  <input
                    name="specialization"
                    value={profile.specialization}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </div>
              </div>

              <div className="profile-field">
                <label>Qualification</label>
                <div className="profile-input-wrapper">
                  <GraduationCap size={16} />
                  <input
                    name="qualification"
                    value={profile.qualification}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </div>
              </div>

              <div className="profile-field">
                <label>Experience</label>
                <div className="profile-input-wrapper">
                  <Award size={16} />
                  <input
                    name="experience"
                    value={profile.experience}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </div>
              </div>

              <div className="profile-field">
                <label>Registration Number</label>
                <div className="profile-input-wrapper">
                  <ShieldCheck size={16} />
                  <input
                    name="registration"
                    value={profile.registration}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </div>
              </div>

              <div className="profile-field full">
                <label>Hospital / Healthcare Center</label>
                <div className="profile-input-wrapper">
                  <BriefcaseMedical size={16} />
                  <input
                    name="hospital"
                    value={profile.hospital}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* About Doctor */}

          <div className="profile-information-card profile-about-card">
            <div className="profile-card-heading">
              <div className="profile-heading-icon">
                <FileTextIcon />
              </div>

              <div>
                <h3>About Me</h3>
                <p>Professional introduction.</p>
              </div>
            </div>

            <textarea
              name="about"
              value={profile.about}
              onChange={handleChange}
              disabled={!editMode}
              rows="4"
            />
          </div>

          {/* Availability */}

          <div className="profile-information-card">
            <div className="profile-card-heading">
              <div className="profile-heading-icon">
                <Clock size={19} />
              </div>

              <div>
                <h3>Consultation Availability</h3>
                <p>Your working schedule.</p>
              </div>
            </div>

            <div className="profile-fields-grid">

              <div className="profile-field">
                <label>Available Days</label>
                <div className="profile-input-wrapper">
                  <Clock size={16} />
                  <input
                    name="availability"
                    value={profile.availability}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </div>
              </div>

              <div className="profile-field">
                <label>Consultation Hours</label>
                <div className="profile-input-wrapper">
                  <Clock size={16} />
                  <input
                    name="consultationTime"
                    value={profile.consultationTime}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </div>
              </div>

            </div>
          </div>

        </div>

      </form>

      <div className="profile-demo-notice">
        <ShieldCheck size={17} />
        <p>
          Demo mode: Profile changes are stored temporarily in React state.
          Firebase profile synchronization and verified medical credentials
          will be integrated separately.
        </p>
      </div>

    </div>
  );
}

function FileTextIcon() {
  return <BriefcaseMedical size={19} />;
}

export default DoctorProfile;
import React, { useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  BriefcaseMedical,
  ShieldCheck,
  CalendarDays,
  Edit3,
  Save,
  X,
  Camera,
  Clock,
  Award,
  Building2,
  CheckCircle2,
} from "lucide-react";

const initialProfile = {
  name: "Health Worker",
  email: "healthworker@aarogyalink.in",
  phone: "+91 98765 43210",
  gender: "Female",
  dateOfBirth: "1998-05-15",
  address: "Village Rampur, District Moradabad",
  designation: "Community Health Worker",
  employeeId: "HW-2026-001",
  department: "Community Healthcare",
  healthCenter: "Primary Health Center, Rampur",
  joiningDate: "2025-06-10",
  qualification: "ANM / Community Health Training",
  experience: "2 Years",
};

const HealthWorkerProfile = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [formData, setFormData] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setFormData(profile);
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();

    setProfile(formData);
    setIsEditing(false);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="hwp-profile-page">

      {/* Page Header */}
      <div className="hwp-profile-header">
        <div>
          <div className="hwp-profile-heading-icon">
            <UserRound size={21} />
          </div>

          <h1>My Profile</h1>

          <p>
            Manage your personal information and professional details.
          </p>
        </div>

        {!isEditing ? (
          <button className="hwp-edit-btn" onClick={handleEdit}>
            <Edit3 size={17} />
            Edit Profile
          </button>
        ) : (
          <button className="hwp-cancel-btn" onClick={handleCancel}>
            <X size={17} />
            Cancel Editing
          </button>
        )}
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="hwp-success-message">
          <CheckCircle2 size={18} />
          Profile updated successfully!
        </div>
      )}

      {/* Profile Layout */}
      <div className="hwp-profile-layout">

        {/* Left Profile Card */}
        <div className="hwp-profile-sidebar">

          <div className="hwp-profile-cover"></div>

          <div className="hwp-profile-avatar-wrapper">
            <div className="hwp-profile-avatar">
              {getInitials(profile.name)}
            </div>

            <span className="hwp-online-indicator"></span>
          </div>

          <div className="hwp-profile-identity">
            <h2>{profile.name}</h2>
            <p>{profile.designation}</p>

            <span className="hwp-active-badge">
              <CheckCircle2 size={13} />
              Active Account
            </span>
          </div>

          <div className="hwp-profile-divider"></div>

          <div className="hwp-profile-contact">

            <div className="hwp-contact-item">
              <Mail size={17} />
              <div>
                <span>Email Address</span>
                <p>{profile.email}</p>
              </div>
            </div>

            <div className="hwp-contact-item">
              <Phone size={17} />
              <div>
                <span>Phone Number</span>
                <p>{profile.phone}</p>
              </div>
            </div>

            <div className="hwp-contact-item">
              <MapPin size={17} />
              <div>
                <span>Location</span>
                <p>{profile.address}</p>
              </div>
            </div>

          </div>

          <div className="hwp-profile-verification">
            <ShieldCheck size={20} />
            <div>
              <strong>Verified Health Worker</strong>
              <p>Your account is active.</p>
            </div>
          </div>

        </div>

        {/* Right Profile Details */}
        <div className="hwp-profile-main">

          <form onSubmit={handleSave}>

            {/* Personal Information */}
            <div className="hwp-profile-section">

              <div className="hwp-section-heading">
                <div className="hwp-section-icon">
                  <UserRound size={19} />
                </div>

                <div>
                  <h2>Personal Information</h2>
                  <p>Your basic personal details.</p>
                </div>
              </div>

              <div className="hwp-form-grid">

                <div className="hwp-form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={isEditing ? formData.name : profile.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                  />
                </div>

                <div className="hwp-form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={isEditing ? formData.email : profile.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                  />
                </div>

                <div className="hwp-form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={isEditing ? formData.phone : profile.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                  />
                </div>

                <div className="hwp-form-group">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={isEditing ? formData.gender : profile.gender}
                    onChange={handleChange}
                    disabled={!isEditing}
                  >
                    <option>Female</option>
                    <option>Male</option>
                    <option>Other</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>

                <div className="hwp-form-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={
                      isEditing
                        ? formData.dateOfBirth
                        : profile.dateOfBirth
                    }
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="hwp-form-group">
                  <label>Residential Address</label>
                  <input
                    type="text"
                    name="address"
                    value={isEditing ? formData.address : profile.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

              </div>
            </div>

            {/* Professional Information */}
            <div className="hwp-profile-section">

              <div className="hwp-section-heading">
                <div className="hwp-section-icon">
                  <BriefcaseMedical size={19} />
                </div>

                <div>
                  <h2>Professional Information</h2>
                  <p>Your healthcare employment details.</p>
                </div>
              </div>

              <div className="hwp-form-grid">

                <div className="hwp-form-group">
                  <label>Designation</label>
                  <input
                    type="text"
                    name="designation"
                    value={
                      isEditing
                        ? formData.designation
                        : profile.designation
                    }
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="hwp-form-group">
                  <label>Employee ID</label>
                  <input
                    type="text"
                    value={profile.employeeId}
                    disabled
                  />
                </div>

                <div className="hwp-form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    name="department"
                    value={
                      isEditing
                        ? formData.department
                        : profile.department
                    }
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="hwp-form-group">
                  <label>Health Center</label>
                  <input
                    type="text"
                    name="healthCenter"
                    value={
                      isEditing
                        ? formData.healthCenter
                        : profile.healthCenter
                    }
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="hwp-form-group">
                  <label>Joining Date</label>
                  <input
                    type="date"
                    name="joiningDate"
                    value={
                      isEditing
                        ? formData.joiningDate
                        : profile.joiningDate
                    }
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="hwp-form-group">
                  <label>Experience</label>
                  <input
                    type="text"
                    name="experience"
                    value={
                      isEditing
                        ? formData.experience
                        : profile.experience
                    }
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="hwp-form-group hwp-full-width">
                  <label>Educational Qualification</label>
                  <input
                    type="text"
                    name="qualification"
                    value={
                      isEditing
                        ? formData.qualification
                        : profile.qualification
                    }
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

              </div>
            </div>

            {/* Account Information */}
            <div className="hwp-profile-section">

              <div className="hwp-section-heading">
                <div className="hwp-section-icon">
                  <ShieldCheck size={19} />
                </div>

                <div>
                  <h2>Account Information</h2>
                  <p>Your account status and identification.</p>
                </div>
              </div>

              <div className="hwp-account-info-grid">

                <div className="hwp-account-info-card">
                  <div>
                    <Building2 size={19} />
                  </div>
                  <span>Account Role</span>
                  <strong>Health Worker</strong>
                </div>

                <div className="hwp-account-info-card">
                  <div>
                    <ShieldCheck size={19} />
                  </div>
                  <span>Account Status</span>
                  <strong className="hwp-status-active">Active</strong>
                </div>

                <div className="hwp-account-info-card">
                  <div>
                    <CalendarDays size={19} />
                  </div>
                  <span>Employee ID</span>
                  <strong>{profile.employeeId}</strong>
                </div>

              </div>

            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="hwp-save-area">
                <button
                  type="button"
                  className="hwp-cancel-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>

                <button type="submit" className="hwp-save-btn">
                  <Save size={17} />
                  Save Changes
                </button>
              </div>
            )}

          </form>

        </div>
      </div>
    </div>
  );
};

export default HealthWorkerProfile;
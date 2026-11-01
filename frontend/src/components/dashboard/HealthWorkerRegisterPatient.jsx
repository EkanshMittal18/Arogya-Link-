import React, { useState } from "react";
import {
  UserPlus,
  User,
  Phone,
  MapPin,
  CalendarDays,
  HeartPulse,
  Droplet,
  ShieldCheck,
  Save,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

const initialForm = {
  fullName: "",
  dateOfBirth: "",
  age: "",
  gender: "",
  mobile: "",
  alternateMobile: "",
  bloodGroup: "",
  village: "",
  district: "",
  state: "",
  pincode: "",
  address: "",
  emergencyName: "",
  emergencyPhone: "",
  medicalHistory: "",
  existingConditions: [],
  otherCondition: "",
  consent: false,
};

const conditions = [
  "Diabetes",
  "High Blood Pressure",
  "Heart Disease",
  "Asthma",
  "Kidney Disease",
  "Thyroid",
  "Other",
];

export default function HealthWorkerRegisterPatient() {
  const [form, setForm] = useState(initialForm);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
    setSuccess(false);
  };

  const handleCondition = (condition) => {
    setForm((prev) => ({
      ...prev,
      existingConditions: prev.existingConditions.includes(condition)
        ? prev.existingConditions.filter((item) => item !== condition)
        : [...prev.existingConditions, condition],
    }));
  };

  const handleDateChange = (e) => {
    const dob = e.target.value;
    let calculatedAge = "";

    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();

      calculatedAge = today.getFullYear() - birthDate.getFullYear();

      const monthDifference = today.getMonth() - birthDate.getMonth();

      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        calculatedAge--;
      }
    }

    setForm((prev) => ({
      ...prev,
      dateOfBirth: dob,
      age: dob ? String(calculatedAge) : "",
    }));
  };

  const handleReset = () => {
    setForm(initialForm);
    setError("");
    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.consent) {
      setError("Please obtain patient consent before registration.");
      return;
    }

    if (!form.fullName.trim() || !form.mobile || !form.gender) {
      setError("Please fill in all required patient details.");
      return;
    }

    if (!/^[0-9]{10}$/.test(form.mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (form.emergencyPhone && !/^[0-9]{10}$/.test(form.emergencyPhone)) {
      setError("Please enter a valid emergency contact number.");
      return;
    }

    if (form.pincode && !/^[0-9]{6}$/.test(form.pincode)) {
      setError("Please enter a valid 6-digit PIN code.");
      return;
    }

    // Demo submission: data is not saved to Firebase yet.
    console.log("Patient Registration Data:", form);

    setSuccess(true);
    setError("");
    setForm(initialForm);
  };

  return (
    <div className="hwr-container">
      {/* Header */}
      <div className="hwr-heading">
        <div>
          <div className="hwr-breadcrumb">
            Dashboard <span>/</span> Register Patient
          </div>

          <h1>Register New Patient</h1>

          <p>
            Add a new patient to your healthcare network and maintain their
            basic health information.
          </p>
        </div>

        <div className="hwr-heading-icon">
          <UserPlus size={27} />
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="hwr-success">
          <CheckCircle2 size={21} />
          <div>
            <strong>Patient details submitted successfully!</strong>
            <p>
              This is a demo submission. Firebase storage will be connected
              after configuring secure permissions.
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="hwr-error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <section className="hwr-card">
          <div className="hwr-card-heading">
            <div className="hwr-section-icon">
              <User size={20} />
            </div>

            <div>
              <h2>Personal Information</h2>
              <p>Enter the patient's basic personal details.</p>
            </div>
          </div>

          <div className="hwr-grid">
            <div className="hwr-field hwr-full">
              <label>Full Name <span>*</span></label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter patient's full name"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="hwr-field">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleDateChange}
              />
            </div>

            <div className="hwr-field">
              <label>Age</label>
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={form.age}
                onChange={handleChange}
                min="0"
                max="120"
              />
            </div>

            <div className="hwr-field">
              <label>Gender <span>*</span></label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            <div className="hwr-field">
              <label>Blood Group</label>
              <select
                name="bloodGroup"
                value={form.bloodGroup}
                onChange={handleChange}
              >
                <option value="">Select blood group</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  )
                )}
                <option value="Unknown">Unknown</option>
              </select>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="hwr-card">
          <div className="hwr-card-heading">
            <div className="hwr-section-icon">
              <Phone size={20} />
            </div>

            <div>
              <h2>Contact Information</h2>
              <p>Patient's contact details and emergency contact.</p>
            </div>
          </div>

          <div className="hwr-grid">
            <div className="hwr-field">
              <label>Mobile Number <span>*</span></label>
              <input
                type="tel"
                name="mobile"
                placeholder="10-digit mobile number"
                value={form.mobile}
                onChange={handleChange}
                maxLength="10"
                required
              />
            </div>

            <div className="hwr-field">
              <label>Alternate Mobile Number</label>
              <input
                type="tel"
                name="alternateMobile"
                placeholder="Optional contact number"
                value={form.alternateMobile}
                onChange={handleChange}
                maxLength="10"
              />
            </div>

            <div className="hwr-field">
              <label>Emergency Contact Name</label>
              <input
                type="text"
                name="emergencyName"
                placeholder="Enter contact person's name"
                value={form.emergencyName}
                onChange={handleChange}
              />
            </div>

            <div className="hwr-field">
              <label>Emergency Contact Number</label>
              <input
                type="tel"
                name="emergencyPhone"
                placeholder="10-digit mobile number"
                value={form.emergencyPhone}
                onChange={handleChange}
                maxLength="10"
              />
            </div>
          </div>
        </section>

        {/* Address Information */}
        <section className="hwr-card">
          <div className="hwr-card-heading">
            <div className="hwr-section-icon">
              <MapPin size={20} />
            </div>

            <div>
              <h2>Address Information</h2>
              <p>Enter the patient's residential location.</p>
            </div>
          </div>

          <div className="hwr-grid">
            <div className="hwr-field">
              <label>Village / Town</label>
              <input
                type="text"
                name="village"
                placeholder="Enter village or town"
                value={form.village}
                onChange={handleChange}
              />
            </div>

            <div className="hwr-field">
              <label>District</label>
              <input
                type="text"
                name="district"
                placeholder="Enter district"
                value={form.district}
                onChange={handleChange}
              />
            </div>

            <div className="hwr-field">
              <label>State</label>
              <input
                type="text"
                name="state"
                placeholder="Enter state"
                value={form.state}
                onChange={handleChange}
              />
            </div>

            <div className="hwr-field">
              <label>PIN Code</label>
              <input
                type="text"
                name="pincode"
                placeholder="6-digit PIN code"
                value={form.pincode}
                onChange={handleChange}
                maxLength="6"
              />
            </div>

            <div className="hwr-field hwr-full">
              <label>Complete Address</label>
              <textarea
                name="address"
                placeholder="Enter house number, street, landmark, etc."
                value={form.address}
                onChange={handleChange}
                rows="3"
              />
            </div>
          </div>
        </section>

        {/* Medical Information */}
        <section className="hwr-card">
          <div className="hwr-card-heading">
            <div className="hwr-section-icon">
              <HeartPulse size={20} />
            </div>

            <div>
              <h2>Medical Information</h2>
              <p>Record the patient's existing health conditions.</p>
            </div>
          </div>

          <div className="hwr-field">
            <label>Existing Health Conditions</label>

            <div className="hwr-conditions">
              {conditions.map((condition) => (
                <label
                  key={condition}
                  className={`hwr-condition ${
                    form.existingConditions.includes(condition)
                      ? "selected"
                      : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form.existingConditions.includes(condition)}
                    onChange={() => handleCondition(condition)}
                  />
                  {condition}
                </label>
              ))}
            </div>
          </div>

          {form.existingConditions.includes("Other") && (
            <div className="hwr-field hwr-other-condition">
              <label>Specify Other Condition</label>
              <input
                type="text"
                name="otherCondition"
                placeholder="Enter health condition"
                value={form.otherCondition}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="hwr-field hwr-medical-history">
            <label>Medical History / Additional Notes</label>
            <textarea
              name="medicalHistory"
              placeholder="Enter allergies, previous surgeries, ongoing treatment, or other relevant information..."
              value={form.medicalHistory}
              onChange={handleChange}
              rows="4"
            />
          </div>
        </section>

        {/* Consent */}
        <section className="hwr-consent-card">
          <div className="hwr-consent-icon">
            <ShieldCheck size={25} />
          </div>

          <div className="hwr-consent-content">
            <h3>Patient Consent & Privacy</h3>

            <p>
              Before registration, explain to the patient how their information
              will be used for healthcare coordination. Collect their consent
              and handle their health information securely.
            </p>

            <label className="hwr-consent-check">
              <input
                type="checkbox"
                name="consent"
                checked={form.consent}
                onChange={handleChange}
              />

              <span>
                I confirm that the patient has provided consent for collecting
                and processing the information entered above.
              </span>
            </label>
          </div>
        </section>

        {/* Buttons */}
        <div className="hwr-actions">
          <button
            type="button"
            className="hwr-reset-btn"
            onClick={handleReset}
          >
            <RotateCcw size={17} />
            Reset Form
          </button>

          <button type="submit" className="hwr-submit-btn">
            <Save size={18} />
            Register Patient
          </button>
        </div>
      </form>

      <div className="hwr-bottom-note">
        <Droplet size={16} />
        AAROGYA LINK — Connecting Communities to Better Healthcare
      </div>
    </div>
  );
}
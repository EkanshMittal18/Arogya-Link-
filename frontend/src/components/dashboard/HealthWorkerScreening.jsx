import React, { useState } from "react";
import {
  Activity,
  HeartPulse,
  Thermometer,
  Wind,
  Droplets,
  Weight,
  Ruler,
  ClipboardCheck,
  User,
  Search,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { useAarogya } from "../../context/AarogyaContext";

const symptomsList = [
  "Fever",
  "Headache",
  "Cough",
  "Cold",
  "Breathing Difficulty",
  "Chest Pain",
  "Body Pain",
  "Weakness",
  "Vomiting",
  "Diarrhea",
  "Dizziness",
  "Other",
];

export default function HealthWorkerScreening() {
  const { patients, recordScreening } = useAarogya();

  const [form, setForm] = useState({
    patientId: patients[0]?.id || "AL-1024",
    patientName: patients[0]?.name || "Rahul Sharma",
    screeningDate: new Date().toISOString().split("T")[0],
    bloodPressure: "120/80",
    temperature: "98.6",
    heartRate: "72",
    oxygen: "98",
    weight: "65",
    height: "168",
    symptoms: ["Headache"],
    duration: "2 days",
    severity: "Moderate",
    observations: "Patient screened at home visit. Advised rest and fluids.",
    referralRequired: "No",
  });

  const [success, setSuccess] = useState(false);
  const [screenedPatientName, setScreenedPatientName] = useState("");
  const [error, setError] = useState("");

  const handlePatientSelect = (e) => {
    const pId = e.target.value;
    const p = patients.find((pat) => pat.id === pId);
    if (p) {
      setForm((prev) => ({
        ...prev,
        patientId: p.id,
        patientName: p.name,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess(false);
  };

  const handleSymptom = (symptom) => {
    setForm((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter((item) => item !== symptom)
        : [...prev.symptoms, symptom],
    }));

    setSuccess(false);
  };

  const handleReset = () => {
    setForm({
      patientId: patients[0]?.id || "AL-1024",
      patientName: patients[0]?.name || "Rahul Sharma",
      screeningDate: new Date().toISOString().split("T")[0],
      bloodPressure: "",
      temperature: "",
      heartRate: "",
      oxygen: "",
      weight: "",
      height: "",
      symptoms: [],
      duration: "",
      severity: "",
      observations: "",
      referralRequired: "",
    });
    setError("");
    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.patientId.trim() || !form.patientName.trim()) {
      setError("Please select the patient.");
      return;
    }

    if (!form.screeningDate) {
      setError("Please select the screening date.");
      return;
    }

    if (form.symptoms.length === 0) {
      setError("Please select at least one symptom.");
      return;
    }

    if (!form.severity) {
      setError("Please select the symptom severity.");
      return;
    }

    const screeningData = {
      ...form,
      recordedAt: new Date().toISOString(),
    };

    recordScreening(screeningData);

    setScreenedPatientName(form.patientName);
    setSuccess(true);
    setError("");
  };

  return (
    <div className="hws-container">

      {/* Header */}
      <div className="hws-heading">
        <div>
          <div className="hws-breadcrumb">
            Dashboard <span>/</span> Patient Screening
          </div>

          <h1>Patient Screening</h1>

          <p>
            Record patient symptoms, vital signs and initial health observations.
          </p>
        </div>

        <div className="hws-heading-icon">
          <Activity size={27} />
        </div>
      </div>

      {/* Success */}
      {success && (
        <div className="hws-success flex items-start gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
          <CheckCircle2 size={24} className="text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-base block">Vitals Screening Recorded & Synced!</strong>
            <p className="text-xs text-emerald-800">
              Vitals and symptoms for <strong>{screenedPatientName || form.patientName}</strong> ({form.patientId}) have been attached to their health profile. The doctor can now view these readings in their clinic dashboard, and the patient can view them in their health summary.
            </p>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="hws-error">
          <AlertTriangle size={17} />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        {/* Patient Details */}
        <section className="hws-card">
          <div className="hws-card-heading">
            <div className="hws-section-icon">
              <User size={20} />
            </div>

            <div>
              <h2>Patient Details</h2>
              <p>Select a registered community patient to screen vitals.</p>
            </div>
          </div>

          <div className="hws-grid">
            <div className="hws-field">
              <label>Select Registered Patient <span>*</span></label>
              <select
                value={form.patientId}
                onChange={handlePatientSelect}
                className="w-full border rounded-xl p-2.5 text-sm bg-white"
              >
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.id}) - {p.village || "Rural"}
                  </option>
                ))}
              </select>
            </div>

            <div className="hws-field">
              <label>Patient Name</label>

              <input
                type="text"
                name="patientName"
                placeholder="Patient Name"
                value={form.patientName}
                readOnly
                className="bg-slate-50 cursor-not-allowed"
              />
            </div>

            <div className="hws-field">
              <label>Screening Date</label>

              <input
                type="date"
                name="screeningDate"
                value={form.screeningDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </section>

        {/* Vital Signs */}
        <section className="hws-card">
          <div className="hws-card-heading">
            <div className="hws-section-icon">
              <HeartPulse size={20} />
            </div>

            <div>
              <h2>Vital Signs</h2>
              <p>Record the patient's basic physical measurements.</p>
            </div>
          </div>

          <div className="hws-vitals-grid">

            <div className="hws-vital-card">
              <div className="hws-vital-icon hws-vital-red">
                <HeartPulse size={21} />
              </div>

              <label>Blood Pressure</label>

              <input
                type="text"
                name="bloodPressure"
                placeholder="120/80"
                value={form.bloodPressure}
                onChange={handleChange}
              />

              <span>mmHg</span>
            </div>

            <div className="hws-vital-card">
              <div className="hws-vital-icon hws-vital-orange">
                <Thermometer size={21} />
              </div>

              <label>Body Temperature</label>

              <input
                type="number"
                name="temperature"
                placeholder="37"
                value={form.temperature}
                onChange={handleChange}
                step="0.1"
                min="25"
                max="45"
              />

              <span>°C</span>
            </div>

            <div className="hws-vital-card">
              <div className="hws-vital-icon hws-vital-pink">
                <Activity size={21} />
              </div>

              <label>Heart Rate / Pulse</label>

              <input
                type="number"
                name="heartRate"
                placeholder="72"
                value={form.heartRate}
                onChange={handleChange}
                min="0"
              />

              <span>BPM</span>
            </div>

            <div className="hws-vital-card">
              <div className="hws-vital-icon hws-vital-blue">
                <Wind size={21} />
              </div>

              <label>Oxygen Saturation</label>

              <input
                type="number"
                name="oxygen"
                placeholder="98"
                value={form.oxygen}
                onChange={handleChange}
                min="0"
                max="100"
              />

              <span>SpO₂ %</span>
            </div>

            <div className="hws-vital-card">
              <div className="hws-vital-icon hws-vital-purple">
                <Weight size={21} />
              </div>

              <label>Weight</label>

              <input
                type="number"
                name="weight"
                placeholder="65"
                value={form.weight}
                onChange={handleChange}
                min="0"
                step="0.1"
              />

              <span>kg</span>
            </div>

            <div className="hws-vital-card">
              <div className="hws-vital-icon hws-vital-green">
                <Ruler size={21} />
              </div>

              <label>Height</label>

              <input
                type="number"
                name="height"
                placeholder="170"
                value={form.height}
                onChange={handleChange}
                min="0"
                step="0.1"
              />

              <span>cm</span>
            </div>

          </div>
        </section>

        {/* Symptoms */}
        <section className="hws-card">
          <div className="hws-card-heading">
            <div className="hws-section-icon">
              <ClipboardCheck size={20} />
            </div>

            <div>
              <h2>Symptoms Assessment</h2>
              <p>Select the symptoms reported by the patient.</p>
            </div>
          </div>

          <div className="hws-field">
            <label>Reported Symptoms <span>*</span></label>

            <div className="hws-symptoms">
              {symptomsList.map((symptom) => (
                <label
                  key={symptom}
                  className={`hws-symptom ${
                    form.symptoms.includes(symptom) ? "selected" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form.symptoms.includes(symptom)}
                    onChange={() => handleSymptom(symptom)}
                  />

                  {symptom}
                </label>
              ))}
            </div>
          </div>

          <div className="hws-grid hws-symptom-details">

            <div className="hws-field">
              <label>Duration of Symptoms</label>

              <select
                name="duration"
                value={form.duration}
                onChange={handleChange}
              >
                <option value="">Select duration</option>
                <option value="Less than 24 hours">Less than 24 hours</option>
                <option value="1-3 days">1-3 days</option>
                <option value="4-7 days">4-7 days</option>
                <option value="1-2 weeks">1-2 weeks</option>
                <option value="More than 2 weeks">More than 2 weeks</option>
              </select>
            </div>

            <div className="hws-field">
              <label>Symptom Severity <span>*</span></label>

              <select
                name="severity"
                value={form.severity}
                onChange={handleChange}
                required
              >
                <option value="">Select severity</option>
                <option value="Mild">Mild</option>
                <option value="Moderate">Moderate</option>
                <option value="Severe">Severe</option>
              </select>
            </div>

          </div>
        </section>

        {/* Observations */}
        <section className="hws-card">
          <div className="hws-card-heading">
            <div className="hws-section-icon">
              <Droplets size={20} />
            </div>

            <div>
              <h2>Health Observations & Referral</h2>
              <p>Record additional observations and referral information.</p>
            </div>
          </div>

          <div className="hws-field">
            <label>Additional Observations</label>

            <textarea
              name="observations"
              rows="4"
              placeholder="Enter relevant observations reported by the patient or noted during screening..."
              value={form.observations}
              onChange={handleChange}
            />
          </div>

          <div className="hws-field hws-referral">
            <label>Does the patient require medical referral?</label>

            <div className="hws-referral-options">
              <label
                className={
                  form.referralRequired === "Yes" ? "selected" : ""
                }
              >
                <input
                  type="radio"
                  name="referralRequired"
                  value="Yes"
                  checked={form.referralRequired === "Yes"}
                  onChange={handleChange}
                />
                Yes, referral required
              </label>

              <label
                className={
                  form.referralRequired === "No" ? "selected" : ""
                }
              >
                <input
                  type="radio"
                  name="referralRequired"
                  value="No"
                  checked={form.referralRequired === "No"}
                  onChange={handleChange}
                />
                No referral indicated
              </label>

              <label
                className={
                  form.referralRequired === "Pending" ? "selected" : ""
                }
              >
                <input
                  type="radio"
                  name="referralRequired"
                  value="Pending"
                  checked={form.referralRequired === "Pending"}
                  onChange={handleChange}
                />
                Needs clinician review
              </label>
            </div>
          </div>
        </section>

        {/* Note */}
        <div className="hws-info-note">
          <AlertTriangle size={19} />

          <p>
            Screening records are for initial health assessment only. They do
            not provide a medical diagnosis. Clinical decisions and referrals
            should be made by qualified healthcare professionals.
          </p>
        </div>

        {/* Actions */}
        <div className="hws-actions">
          <button
            type="button"
            className="hws-reset-btn"
            onClick={handleReset}
          >
            <RotateCcw size={17} />
            Reset Form
          </button>

          <button type="submit" className="hws-submit-btn">
            <Save size={18} />
            Submit Screening
          </button>
        </div>

      </form>

      <div className="hws-bottom-note">
        AAROGYA LINK — Connecting Communities to Better Healthcare
      </div>

    </div>
  );
}
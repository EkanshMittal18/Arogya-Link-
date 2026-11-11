import React, { useState } from "react";
import { useAarogya } from "../../context/AarogyaContext";
import {
  ClipboardList,
  Plus,
  Search,
  Filter,
  User,
  MapPin,
  CalendarDays,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Trash2,
  X,
  Hospital,
  Stethoscope,
  ArrowUpRight,
} from "lucide-react";

export default function HealthWorkerReferrals() {
  const { referrals, patients, addReferral, updateReferralStatus } = useAarogya();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    patientId: (patients[0] && patients[0].id) || "AL-1024",
    patient: (patients[0] && patients[0].name) || "Rahul Sharma",
    hospital: "District Civil Hospital",
    doctor: "Dr. Amit Sharma",
    department: "General Medicine",
    date: new Date().toISOString().split("T")[0],
    priority: "High",
    reason: "",
    notes: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const total = referrals.length;
  const pending = referrals.filter((r) => r.status === "Pending").length;
  const accepted = referrals.filter((r) => r.status === "Accepted").length;
  const completed = referrals.filter((r) => r.status === "Completed").length;

  const filteredReferrals = referrals.filter((item) => {
    const matchesSearch =
      item.patient.toLowerCase().includes(search.toLowerCase()) ||
      item.patientId.toLowerCase().includes(search.toLowerCase()) ||
      item.hospital.toLowerCase().includes(search.toLowerCase()) ||
      item.doctor.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "All" || item.status === filter;

    return matchesSearch && matchesFilter;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const showMessage = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selPatient = patients.find((p) => p.id === form.patientId);
    if (!selPatient) {
      setError("Please select a registered patient.");
      return;
    }

    if (!form.hospital.trim() || !form.doctor.trim() || !form.date || !form.reason.trim()) {
      setError("Please complete all required fields.");
      return;
    }

    addReferral({
      patientId: selPatient.id,
      patient: selPatient.name,
      hospital: form.hospital,
      doctor: form.doctor,
      specialist: form.doctor,
      department: form.department || "General Medicine",
      date: form.date,
      priority: form.priority,
      reason: form.reason,
      notes: form.notes,
      referredBy: "Community Health Worker (ASHA)",
      status: "Pending",
    });

    setShowModal(false);
    setError("");
    showMessage("New referral created and sent to Doctor portal!");
  };

  const updateStatus = (id, status) => {
    updateReferralStatus(id, status);
    showMessage(`Referral status updated to ${status}.`);
  };

  const deleteReferral = (id) => {
    if (!window.confirm("Are you sure you want to delete this referral?")) {
      return;
    }

    setReferrals((prev) => prev.filter((item) => item.id !== id));
    showMessage("Referral deleted successfully.");
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="hwrf-container">

      {/* Header */}
      <div className="hwrf-heading">
        <div>
          <div className="hwrf-breadcrumb">
            Dashboard <span>/</span> Referrals
          </div>

          <h1>Patient Referrals</h1>

          <p>
            Refer patients to appropriate doctors and healthcare facilities.
          </p>
        </div>

        <button
          className="hwrf-add-btn"
          onClick={() => {
            setForm(emptyForm);
            setError("");
            setShowModal(true);
          }}
        >
          <Plus size={18} />
          Create Referral
        </button>
      </div>

      {/* Success */}
      {success && (
        <div className="hwrf-success">
          <CheckCircle2 size={18} />
          {success}
        </div>
      )}

      {/* Statistics */}
      <div className="hwrf-stats">

        <div className="hwrf-stat">
          <div className="hwrf-stat-icon blue">
            <ClipboardList size={22} />
          </div>
          <div>
            <p>Total Referrals</p>
            <h2>{total}</h2>
            <span>All patient referrals</span>
          </div>
        </div>

        <div className="hwrf-stat">
          <div className="hwrf-stat-icon orange">
            <Clock size={22} />
          </div>
          <div>
            <p>Pending</p>
            <h2>{pending}</h2>
            <span>Awaiting response</span>
          </div>
        </div>

        <div className="hwrf-stat">
          <div className="hwrf-stat-icon purple">
            <ArrowUpRight size={22} />
          </div>
          <div>
            <p>Accepted</p>
            <h2>{accepted}</h2>
            <span>Accepted by facility</span>
          </div>
        </div>

        <div className="hwrf-stat">
          <div className="hwrf-stat-icon green">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <p>Completed</p>
            <h2>{completed}</h2>
            <span>Successfully referred</span>
          </div>
        </div>

      </div>

      {/* Referral Directory */}
      <div className="hwrf-directory">

        <div className="hwrf-directory-header">
          <div>
            <h2>Referral Directory</h2>
            <p>Track and manage patient referral requests.</p>
          </div>

          <div className="hwrf-directory-icon">
            <Hospital size={21} />
          </div>
        </div>

        {/* Toolbar */}
        <div className="hwrf-toolbar">

          <div className="hwrf-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search patient, hospital or doctor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="hwrf-filter">
            <Filter size={16} />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Referrals</option>
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

        </div>

        {/* Table */}
        <div className="hwrf-table-wrap">
          <table className="hwrf-table">

            <thead>
              <tr>
                <th>Patient</th>
                <th>Hospital / Facility</th>
                <th>Department</th>
                <th>Referral Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredReferrals.map((item) => (
                <tr key={item.id}>

                  <td>
                    <div className="hwrf-patient">
                      <div className="hwrf-avatar">
                        {item.patient.charAt(0)}
                      </div>

                      <div>
                        <strong>{item.patient}</strong>
                        <span>{item.patientId}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="hwrf-hospital">
                      <strong>{item.hospital}</strong>
                      <span>
                        <User size={12} />
                        {item.doctor}
                      </span>
                    </div>
                  </td>

                  <td>
                    <span className="hwrf-department">
                      {item.department || "-"}
                    </span>
                  </td>

                  <td>
                    <div className="hwrf-date">
                      <CalendarDays size={14} />
                      {formatDate(item.date)}
                    </div>
                  </td>

                  <td>
                    <span
                      className={`hwrf-priority ${item.priority.toLowerCase()}`}
                    >
                      {item.priority}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`hwrf-status ${item.status.toLowerCase()}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <div className="hwrf-actions">

                      {item.status === "Pending" && (
                        <button
                          className="hwrf-accept"
                          title="Mark accepted"
                          onClick={() =>
                            updateStatus(item.id, "Accepted")
                          }
                        >
                          <CheckCircle2 size={16} />
                        </button>
                      )}

                      {item.status === "Accepted" && (
                        <button
                          className="hwrf-complete"
                          title="Mark completed"
                          onClick={() =>
                            updateStatus(item.id, "Completed")
                          }
                        >
                          <CheckCircle2 size={16} />
                        </button>
                      )}

                      {(item.status === "Pending" ||
                        item.status === "Accepted") && (
                        <button
                          className="hwrf-cancel"
                          title="Cancel referral"
                          onClick={() =>
                            updateStatus(item.id, "Cancelled")
                          }
                        >
                          <XCircle size={16} />
                        </button>
                      )}

                      <button
                        className="hwrf-delete"
                        title="Delete referral"
                        onClick={() => deleteReferral(item.id)}
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

          {filteredReferrals.length === 0 && (
            <div className="hwrf-empty">
              <ClipboardList size={35} />
              <h3>No referrals found</h3>
              <p>Try changing your search or filter.</p>
            </div>
          )}
        </div>

        <div className="hwrf-table-footer">
          Showing {filteredReferrals.length} of {total} referrals
        </div>

      </div>

      {/* Create Referral Modal */}
      {showModal && (
        <div
          className="hwrf-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="hwrf-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="hwrf-modal-header">
              <div>
                <h2>Create Patient Referral</h2>
                <p>Provide patient and referral information.</p>
              </div>

              <button onClick={() => setShowModal(false)}>
                <X size={21} />
              </button>
            </div>

            {error && (
              <div className="hwrf-modal-error">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="hwrf-modal-grid">

                <div className="hwrf-field hwrf-full">
                  <label>Select Community Patient *</label>
                  <select
                    name="patientId"
                    value={form.patientId}
                    onChange={(e) => {
                      const pId = e.target.value;
                      const pat = patients.find((p) => p.id === pId);
                      setForm((prev) => ({
                        ...prev,
                        patientId: pId,
                        patient: pat?.name || "",
                      }));
                    }}
                    className="w-full border rounded-xl p-2.5 text-sm bg-white"
                  >
                    {patients.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.id}) - {p.village || "Rural"}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="hwrf-field">
                  <label>Hospital / Healthcare Facility *</label>
                  <input
                    name="hospital"
                    placeholder="e.g. District Civil Hospital"
                    value={form.hospital}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="hwrf-field">
                  <label>Consulting Doctor / Specialist *</label>
                  <select
                    name="doctor"
                    value={form.doctor}
                    onChange={(e) => {
                      const doc = e.target.value;
                      const dep =
                        doc === "Dr. Rajesh Sharma"
                          ? "Cardiology"
                          : doc === "Dr. Neha Verma"
                          ? "General Medicine"
                          : "General Medicine";
                      setForm((prev) => ({ ...prev, doctor: doc, department: dep }));
                    }}
                    className="w-full border rounded-xl p-2.5 text-sm bg-white"
                  >
                    <option value="Dr. Amit Sharma">Dr. Amit Sharma (General Physician)</option>
                    <option value="Dr. Neha Verma">Dr. Neha Verma (General Medicine)</option>
                    <option value="Dr. Rajesh Sharma">Dr. Rajesh Sharma (Cardiologist)</option>
                  </select>
                </div>

                <div className="hwrf-field">
                  <label>Department / Specialization</label>
                  <select
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                  >
                    <option value="">Select department</option>
                    <option>General Medicine</option>
                    <option>Cardiology</option>
                    <option>Gynecology</option>
                    <option>Pediatrics</option>
                    <option>Dermatology</option>
                    <option>Orthopedics</option>
                    <option>Neurology</option>
                    <option>Ophthalmology</option>
                    <option>Emergency</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="hwrf-field">
                  <label>Referral Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="hwrf-field">
                  <label>Priority Level</label>
                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div className="hwrf-field hwrf-full">
                  <label>Reason for Referral *</label>
                  <textarea
                    name="reason"
                    placeholder="Describe why the patient needs referral..."
                    rows="3"
                    value={form.reason}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="hwrf-field hwrf-full">
                  <label>Additional Clinical Notes</label>
                  <textarea
                    name="notes"
                    placeholder="Add relevant screening observations or other notes..."
                    rows="3"
                    value={form.notes}
                    onChange={handleChange}
                  />
                </div>

              </div>

              <div className="hwrf-modal-actions">
                <button
                  type="button"
                  className="hwrf-reset-btn"
                  onClick={() => {
                    setForm(emptyForm);
                    setError("");
                  }}
                >
                  Reset
                </button>

                <button type="submit" className="hwrf-submit-btn">
                  <Plus size={17} />
                  Create Referral
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      <div className="hwrf-bottom-note">
        AAROGYA LINK — Connecting Communities to Better Healthcare
      </div>

    </div>
  );
}
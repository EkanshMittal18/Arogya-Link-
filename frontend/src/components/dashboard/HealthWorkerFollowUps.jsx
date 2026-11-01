import React, { useState } from "react";
import {
  CalendarDays,
  Clock,
  Users,
  CheckCircle2,
  AlertCircle,
  Search,
  Plus,
  Filter,
  Phone,
  User,
  X,
  Trash2,
  ClipboardCheck,
  MessageCircle,
} from "lucide-react";

const initialFollowUps = [
  {
    id: 1,
    patient: "Rahul Sharma",
    patientId: "PT-1001",
    phone: "9876543210",
    date: "2026-11-02",
    time: "10:00",
    purpose: "Blood Pressure Monitoring",
    notes: "Check BP after prescribed treatment.",
    status: "Pending",
  },
  {
    id: 2,
    patient: "Priya Singh",
    patientId: "PT-1002",
    phone: "9876543211",
    date: "2026-11-03",
    time: "11:30",
    purpose: "Post Consultation Follow-up",
    notes: "Review patient's recovery progress.",
    status: "Completed",
  },
  {
    id: 3,
    patient: "Aman Gupta",
    patientId: "PT-1003",
    phone: "9876543212",
    date: "2026-11-04",
    time: "09:30",
    purpose: "Diabetes Monitoring",
    notes: "Review glucose monitoring record.",
    status: "Pending",
  },
  {
    id: 4,
    patient: "Sneha Das",
    patientId: "PT-1004",
    phone: "9876543213",
    date: "2026-10-28",
    time: "14:00",
    purpose: "General Health Checkup",
    notes: "Routine health progress review.",
    status: "Missed",
  },
];

const emptyForm = {
  patient: "",
  patientId: "",
  phone: "",
  date: "",
  time: "",
  purpose: "",
  notes: "",
};

export default function HealthWorkerFollowUps() {
  const [followUps, setFollowUps] = useState(initialFollowUps);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const total = followUps.length;

  const pending = followUps.filter(
    (item) => item.status === "Pending"
  ).length;

  const completed = followUps.filter(
    (item) => item.status === "Completed"
  ).length;

  const missed = followUps.filter(
    (item) => item.status === "Missed"
  ).length;

  const filteredFollowUps = followUps.filter((item) => {
    const matchesSearch =
      item.patient.toLowerCase().includes(search.toLowerCase()) ||
      item.patientId.toLowerCase().includes(search.toLowerCase()) ||
      item.purpose.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || item.status === filter;

    return matchesSearch && matchesFilter;
  });

  const showMessage = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.patient.trim() ||
      !form.patientId.trim() ||
      !form.date ||
      !form.time ||
      !form.purpose.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (form.phone && !/^[0-9]{10}$/.test(form.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    const newFollowUp = {
      ...form,
      id: Date.now(),
      status: "Pending",
    };

    setFollowUps((prev) => [newFollowUp, ...prev]);

    setForm(emptyForm);
    setShowModal(false);
    setError("");

    showMessage("New follow-up scheduled successfully!");
  };

  const updateStatus = (id, status) => {
    setFollowUps((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );

    showMessage(`Follow-up marked as ${status}.`);
  };

  const deleteFollowUp = (id) => {
    if (!window.confirm("Are you sure you want to delete this follow-up?")) {
      return;
    }

    setFollowUps((prev) =>
      prev.filter((item) => item.id !== id)
    );

    showMessage("Follow-up deleted successfully.");
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    if (!time) return "-";

    const [hours, minutes] = time.split(":");
    const date = new Date();

    date.setHours(Number(hours), Number(minutes));

    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="hwf-container">

      {/* Header */}
      <div className="hwf-heading">
        <div>
          <div className="hwf-breadcrumb">
            Dashboard <span>/</span> Follow-ups
          </div>

          <h1>Patient Follow-ups</h1>

          <p>
            Track patient recovery, schedule follow-ups and monitor progress.
          </p>
        </div>

        <button
          className="hwf-add-btn"
          onClick={() => {
            setForm(emptyForm);
            setError("");
            setShowModal(true);
          }}
        >
          <Plus size={18} />
          Schedule Follow-up
        </button>
      </div>

      {/* Success */}
      {success && (
        <div className="hwf-success">
          <CheckCircle2 size={18} />
          {success}
        </div>
      )}

      {/* Statistics */}
      <div className="hwf-stats">

        <div className="hwf-stat">
          <div className="hwf-stat-icon blue">
            <ClipboardCheck size={22} />
          </div>

          <div>
            <p>Total Follow-ups</p>
            <h2>{total}</h2>
            <span>All scheduled records</span>
          </div>
        </div>

        <div className="hwf-stat">
          <div className="hwf-stat-icon orange">
            <Clock size={22} />
          </div>

          <div>
            <p>Pending</p>
            <h2>{pending}</h2>
            <span>Awaiting follow-up</span>
          </div>
        </div>

        <div className="hwf-stat">
          <div className="hwf-stat-icon green">
            <CheckCircle2 size={22} />
          </div>

          <div>
            <p>Completed</p>
            <h2>{completed}</h2>
            <span>Successfully completed</span>
          </div>
        </div>

        <div className="hwf-stat">
          <div className="hwf-stat-icon red">
            <AlertCircle size={22} />
          </div>

          <div>
            <p>Missed</p>
            <h2>{missed}</h2>
            <span>Follow-ups not attended</span>
          </div>
        </div>

      </div>

      {/* Follow-up Directory */}
      <div className="hwf-directory">

        <div className="hwf-directory-header">
          <div>
            <h2>Follow-up Directory</h2>
            <p>Manage and monitor patient follow-up activities.</p>
          </div>

          <div className="hwf-directory-icon">
            <CalendarDays size={21} />
          </div>
        </div>

        {/* Toolbar */}
        <div className="hwf-toolbar">

          <div className="hwf-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search patient, ID or purpose..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="hwf-filter">
            <Filter size={16} />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Follow-ups</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Missed">Missed</option>
            </select>
          </div>

        </div>

        {/* Table */}
        <div className="hwf-table-wrap">
          <table className="hwf-table">

            <thead>
              <tr>
                <th>Patient Details</th>
                <th>Follow-up Purpose</th>
                <th>Date & Time</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredFollowUps.map((item) => (
                <tr key={item.id}>

                  <td>
                    <div className="hwf-patient">
                      <div className="hwf-avatar">
                        {item.patient.charAt(0)}
                      </div>

                      <div>
                        <strong>{item.patient}</strong>
                        <span>{item.patientId}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="hwf-purpose">
                      <strong>{item.purpose}</strong>
                      <span>{item.notes || "No additional notes"}</span>
                    </div>
                  </td>

                  <td>
                    <div className="hwf-date">
                      <strong>{formatDate(item.date)}</strong>

                      <span>
                        <Clock size={12} />
                        {formatTime(item.time)}
                      </span>
                    </div>
                  </td>

                  <td>
                    {item.phone ? (
                      <a
                        href={`tel:${item.phone}`}
                        className="hwf-phone"
                      >
                        <Phone size={14} />
                        {item.phone}
                      </a>
                    ) : (
                      <span className="hwf-no-phone">Not provided</span>
                    )}
                  </td>

                  <td>
                    <span
                      className={`hwf-status ${item.status.toLowerCase()}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <div className="hwf-actions">

                      {item.status !== "Completed" && (
                        <button
                          className="hwf-complete"
                          title="Mark completed"
                          onClick={() =>
                            updateStatus(item.id, "Completed")
                          }
                        >
                          <CheckCircle2 size={16} />
                        </button>
                      )}

                      {item.status === "Pending" && (
                        <button
                          className="hwf-missed"
                          title="Mark missed"
                          onClick={() =>
                            updateStatus(item.id, "Missed")
                          }
                        >
                          <AlertCircle size={16} />
                        </button>
                      )}

                      <button
                        className="hwf-delete"
                        title="Delete follow-up"
                        onClick={() => deleteFollowUp(item.id)}
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

          {filteredFollowUps.length === 0 && (
            <div className="hwf-empty">
              <CalendarDays size={35} />
              <h3>No follow-ups found</h3>
              <p>Try changing your search or filter.</p>
            </div>
          )}

        </div>

        <div className="hwf-table-footer">
          Showing {filteredFollowUps.length} of {total} follow-ups
        </div>

      </div>

      {/* Schedule Modal */}
      {showModal && (
        <div
          className="hwf-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="hwf-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="hwf-modal-header">
              <div>
                <h2>Schedule Patient Follow-up</h2>
                <p>Enter patient and follow-up details.</p>
              </div>

              <button onClick={() => setShowModal(false)}>
                <X size={21} />
              </button>
            </div>

            {error && (
              <div className="hwf-modal-error">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="hwf-modal-grid">

                <div className="hwf-field">
                  <label>Patient Name *</label>
                  <input
                    name="patient"
                    placeholder="Enter patient name"
                    value={form.patient}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="hwf-field">
                  <label>Patient ID *</label>
                  <input
                    name="patientId"
                    placeholder="e.g. PT-1006"
                    value={form.patientId}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="hwf-field">
                  <label>Mobile Number</label>
                  <input
                    name="phone"
                    type="tel"
                    maxLength="10"
                    placeholder="10-digit mobile number"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="hwf-field">
                  <label>Follow-up Purpose *</label>
                  <select
                    name="purpose"
                    value={form.purpose}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select purpose</option>
                    <option>General Health Checkup</option>
                    <option>Blood Pressure Monitoring</option>
                    <option>Diabetes Monitoring</option>
                    <option>Post Consultation Follow-up</option>
                    <option>Medication Follow-up</option>
                    <option>Recovery Monitoring</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="hwf-field">
                  <label>Follow-up Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="hwf-field">
                  <label>Follow-up Time *</label>
                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="hwf-field hwf-full">
                  <label>Additional Notes</label>
                  <textarea
                    name="notes"
                    rows="3"
                    placeholder="Enter follow-up instructions or observations..."
                    value={form.notes}
                    onChange={handleChange}
                  />
                </div>

              </div>

              <div className="hwf-modal-actions">
                <button
                  type="button"
                  className="hwf-reset-btn"
                  onClick={() => {
                    setForm(emptyForm);
                    setError("");
                  }}
                >
                  Reset
                </button>

                <button type="submit" className="hwf-submit-btn">
                  <Plus size={17} />
                  Schedule Follow-up
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      <div className="hwf-bottom-note">
        AAROGYA LINK — Connecting Communities to Better Healthcare
      </div>

    </div>
  );
}
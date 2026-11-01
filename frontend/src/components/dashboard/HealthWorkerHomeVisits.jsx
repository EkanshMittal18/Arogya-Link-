import React, { useState } from "react";
import {
  Home,
  Plus,
  Search,
  Filter,
  CalendarDays,
  Clock,
  MapPin,
  User,
  Phone,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Trash2,
  X,
  ClipboardList,
  Navigation,
} from "lucide-react";

const initialVisits = [
  {
    id: 1,
    patient: "Rahul Sharma",
    patientId: "PT-1001",
    phone: "9876543210",
    village: "Rampur",
    address: "Near Primary School, Rampur",
    date: "2026-11-02",
    time: "10:00",
    purpose: "Routine Health Checkup",
    notes: "Check general health and blood pressure.",
    status: "Scheduled",
  },
  {
    id: 2,
    patient: "Priya Singh",
    patientId: "PT-1002",
    phone: "9876543211",
    village: "Shivpur",
    address: "Main Road, Shivpur",
    date: "2026-11-03",
    time: "11:30",
    purpose: "Post Treatment Follow-up",
    notes: "Review recovery progress.",
    status: "Completed",
  },
  {
    id: 3,
    patient: "Aman Gupta",
    patientId: "PT-1003",
    phone: "9876543212",
    village: "Lakhanpur",
    address: "Ward No. 3, Lakhanpur",
    date: "2026-11-04",
    time: "09:30",
    purpose: "Diabetes Monitoring",
    notes: "Review glucose monitoring.",
    status: "Scheduled",
  },
  {
    id: 4,
    patient: "Sneha Das",
    patientId: "PT-1004",
    phone: "9876543213",
    village: "Madhopur",
    address: "Near Community Center",
    date: "2026-10-28",
    time: "14:00",
    purpose: "General Health Checkup",
    notes: "Patient was unavailable.",
    status: "Missed",
  },
];

const emptyForm = {
  patient: "",
  patientId: "",
  phone: "",
  village: "",
  address: "",
  date: "",
  time: "",
  purpose: "",
  notes: "",
};

export default function HealthWorkerHomeVisits() {
  const [visits, setVisits] = useState(initialVisits);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const total = visits.length;

  const scheduled = visits.filter(
    (item) => item.status === "Scheduled"
  ).length;

  const completed = visits.filter(
    (item) => item.status === "Completed"
  ).length;

  const missed = visits.filter(
    (item) => item.status === "Missed"
  ).length;

  const filteredVisits = visits.filter((item) => {
    const matchesSearch =
      item.patient.toLowerCase().includes(search.toLowerCase()) ||
      item.patientId.toLowerCase().includes(search.toLowerCase()) ||
      item.village.toLowerCase().includes(search.toLowerCase()) ||
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
      !form.village.trim() ||
      !form.address.trim() ||
      !form.date ||
      !form.time ||
      !form.purpose
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (form.phone && !/^[0-9]{10}$/.test(form.phone)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    const newVisit = {
      ...form,
      id: Date.now(),
      status: "Scheduled",
    };

    setVisits((prev) => [newVisit, ...prev]);

    setForm(emptyForm);
    setShowModal(false);
    setError("");

    showMessage("Home visit scheduled successfully!");
  };

  const updateStatus = (id, status) => {
    setVisits((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );

    showMessage(`Home visit marked as ${status}.`);
  };

  const deleteVisit = (id) => {
    if (!window.confirm("Are you sure you want to delete this visit?")) {
      return;
    }

    setVisits((prev) => prev.filter((item) => item.id !== id));

    showMessage("Home visit deleted successfully.");
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
    <div className="hwhv-container">

      {/* Header */}
      <div className="hwhv-heading">
        <div>
          <div className="hwhv-breadcrumb">
            Dashboard <span>/</span> Home Visits
          </div>

          <h1>Home Visits Management</h1>

          <p>
            Schedule and monitor patient visits in rural communities.
          </p>
        </div>

        <button
          className="hwhv-add-btn"
          onClick={() => {
            setForm(emptyForm);
            setError("");
            setShowModal(true);
          }}
        >
          <Plus size={18} />
          Schedule Home Visit
        </button>
      </div>

      {/* Success */}
      {success && (
        <div className="hwhv-success">
          <CheckCircle2 size={18} />
          {success}
        </div>
      )}

      {/* Statistics */}
      <div className="hwhv-stats">

        <div className="hwhv-stat">
          <div className="hwhv-stat-icon blue">
            <Home size={22} />
          </div>

          <div>
            <p>Total Home Visits</p>
            <h2>{total}</h2>
            <span>All scheduled records</span>
          </div>
        </div>

        <div className="hwhv-stat">
          <div className="hwhv-stat-icon orange">
            <CalendarDays size={22} />
          </div>

          <div>
            <p>Scheduled</p>
            <h2>{scheduled}</h2>
            <span>Upcoming home visits</span>
          </div>
        </div>

        <div className="hwhv-stat">
          <div className="hwhv-stat-icon green">
            <CheckCircle2 size={22} />
          </div>

          <div>
            <p>Completed</p>
            <h2>{completed}</h2>
            <span>Successfully visited</span>
          </div>
        </div>

        <div className="hwhv-stat">
          <div className="hwhv-stat-icon red">
            <AlertCircle size={22} />
          </div>

          <div>
            <p>Missed Visits</p>
            <h2>{missed}</h2>
            <span>Visits not completed</span>
          </div>
        </div>

      </div>

      {/* Visit Directory */}
      <div className="hwhv-directory">

        <div className="hwhv-directory-header">
          <div>
            <h2>Home Visit Directory</h2>
            <p>View and manage scheduled patient home visits.</p>
          </div>

          <div className="hwhv-directory-icon">
            <ClipboardList size={21} />
          </div>
        </div>

        {/* Toolbar */}
        <div className="hwhv-toolbar">

          <div className="hwhv-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search patient, ID or village..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="hwhv-filter">
            <Filter size={16} />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Visits</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Missed">Missed</option>
            </select>
          </div>

        </div>

        {/* Table */}
        <div className="hwhv-table-wrap">
          <table className="hwhv-table">

            <thead>
              <tr>
                <th>Patient Details</th>
                <th>Location</th>
                <th>Visit Purpose</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredVisits.map((item) => (
                <tr key={item.id}>

                  <td>
                    <div className="hwhv-patient">
                      <div className="hwhv-avatar">
                        {item.patient.charAt(0)}
                      </div>

                      <div>
                        <strong>{item.patient}</strong>
                        <span>{item.patientId}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="hwhv-location">
                      <strong>
                        <MapPin size={13} />
                        {item.village}
                      </strong>
                      <span>{item.address}</span>
                    </div>
                  </td>

                  <td>
                    <div className="hwhv-purpose">
                      {item.purpose}
                    </div>
                  </td>

                  <td>
                    <div className="hwhv-date">
                      <strong>{formatDate(item.date)}</strong>

                      <span>
                        <Clock size={12} />
                        {formatTime(item.time)}
                      </span>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`hwhv-status ${item.status.toLowerCase()}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <div className="hwhv-actions">

                      {item.status === "Scheduled" && (
                        <>
                          <button
                            className="hwhv-complete"
                            title="Mark completed"
                            onClick={() =>
                              updateStatus(item.id, "Completed")
                            }
                          >
                            <CheckCircle2 size={16} />
                          </button>

                          <button
                            className="hwhv-missed"
                            title="Mark missed"
                            onClick={() =>
                              updateStatus(item.id, "Missed")
                            }
                          >
                            <AlertCircle size={16} />
                          </button>
                        </>
                      )}

                      <button
                        className="hwhv-delete"
                        title="Delete visit"
                        onClick={() => deleteVisit(item.id)}
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

          {filteredVisits.length === 0 && (
            <div className="hwhv-empty">
              <Home size={35} />
              <h3>No home visits found</h3>
              <p>Try changing your search or filter.</p>
            </div>
          )}

        </div>

        <div className="hwhv-table-footer">
          Showing {filteredVisits.length} of {total} home visits
        </div>

      </div>

      {/* Schedule Home Visit Modal */}
      {showModal && (
        <div
          className="hwhv-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="hwhv-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="hwhv-modal-header">
              <div>
                <h2>Schedule Home Visit</h2>
                <p>Enter patient and visit information.</p>
              </div>

              <button onClick={() => setShowModal(false)}>
                <X size={21} />
              </button>
            </div>

            {error && (
              <div className="hwhv-modal-error">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="hwhv-modal-grid">

                <div className="hwhv-field">
                  <label>Patient Name *</label>
                  <input
                    name="patient"
                    placeholder="Enter patient name"
                    value={form.patient}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="hwhv-field">
                  <label>Patient ID *</label>
                  <input
                    name="patientId"
                    placeholder="e.g. PT-1006"
                    value={form.patientId}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="hwhv-field">
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

                <div className="hwhv-field">
                  <label>Village / Town *</label>
                  <input
                    name="village"
                    placeholder="Enter village or town"
                    value={form.village}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="hwhv-field hwhv-full">
                  <label>Complete Address *</label>
                  <input
                    name="address"
                    placeholder="House number, street, landmark..."
                    value={form.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="hwhv-field">
                  <label>Visit Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="hwhv-field">
                  <label>Visit Time *</label>
                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="hwhv-field hwhv-full">
                  <label>Purpose of Visit *</label>
                  <select
                    name="purpose"
                    value={form.purpose}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select visit purpose</option>
                    <option>Routine Health Checkup</option>
                    <option>Post Treatment Follow-up</option>
                    <option>Blood Pressure Monitoring</option>
                    <option>Diabetes Monitoring</option>
                    <option>Medication Follow-up</option>
                    <option>Maternal Health Checkup</option>
                    <option>Child Health Monitoring</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="hwhv-field hwhv-full">
                  <label>Additional Notes</label>
                  <textarea
                    name="notes"
                    rows="3"
                    placeholder="Enter visit instructions or additional information..."
                    value={form.notes}
                    onChange={handleChange}
                  />
                </div>

              </div>

              <div className="hwhv-modal-actions">
                <button
                  type="button"
                  className="hwhv-reset-btn"
                  onClick={() => {
                    setForm(emptyForm);
                    setError("");
                  }}
                >
                  Reset
                </button>

                <button type="submit" className="hwhv-submit-btn">
                  <Plus size={17} />
                  Schedule Visit
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      <div className="hwhv-bottom-note">
        AAROGYA LINK — Connecting Communities to Better Healthcare
      </div>

    </div>
  );
}
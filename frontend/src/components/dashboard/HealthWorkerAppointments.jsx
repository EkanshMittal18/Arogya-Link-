import React, { useState } from "react";
import {
  CalendarDays,
  Clock,
  Users,
  CheckCircle2,
  XCircle,
  Search,
  Plus,
  Filter,
  Video,
  MapPin,
  User,
  Phone,
  X,
  Trash2,
  ClipboardList,
} from "lucide-react";

const initialAppointments = [
  {
    id: 1,
    patient: "Rahul Sharma",
    patientId: "PT-1001",
    doctor: "Dr. Amit Kumar",
    date: "2026-11-02",
    time: "10:00",
    type: "In-Person",
    reason: "Fever and headache",
    phone: "9876543210",
    status: "Upcoming",
  },
  {
    id: 2,
    patient: "Priya Singh",
    patientId: "PT-1002",
    doctor: "Dr. Neha Verma",
    date: "2026-11-02",
    time: "11:30",
    type: "Online",
    reason: "Regular health checkup",
    phone: "9876543211",
    status: "Upcoming",
  },
  {
    id: 3,
    patient: "Aman Gupta",
    patientId: "PT-1003",
    doctor: "Dr. Rajesh Sharma",
    date: "2026-10-30",
    time: "12:00",
    type: "In-Person",
    reason: "Blood pressure checkup",
    phone: "9876543212",
    status: "Completed",
  },
  {
    id: 4,
    patient: "Sneha Das",
    patientId: "PT-1004",
    doctor: "Dr. Amit Kumar",
    date: "2026-10-29",
    time: "14:00",
    type: "Online",
    reason: "Cough and cold",
    phone: "9876543213",
    status: "Cancelled",
  },
  {
    id: 5,
    patient: "Rohit Verma",
    patientId: "PT-1005",
    doctor: "Dr. Neha Verma",
    date: "2026-11-04",
    time: "09:30",
    type: "In-Person",
    reason: "General consultation",
    phone: "9876543214",
    status: "Upcoming",
  },
];

const emptyForm = {
  patient: "",
  patientId: "",
  doctor: "",
  date: "",
  time: "",
  type: "In-Person",
  reason: "",
  phone: "",
};

export default function HealthWorkerAppointments() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const total = appointments.length;
  const upcoming = appointments.filter(
    (item) => item.status === "Upcoming"
  ).length;
  const completed = appointments.filter(
    (item) => item.status === "Completed"
  ).length;
  const cancelled = appointments.filter(
    (item) => item.status === "Cancelled"
  ).length;

  const filteredAppointments = appointments.filter((item) => {
    const matchesSearch =
      item.patient.toLowerCase().includes(search.toLowerCase()) ||
      item.patientId.toLowerCase().includes(search.toLowerCase()) ||
      item.doctor.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      activeFilter === "All" || item.status === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleAddAppointment = (e) => {
    e.preventDefault();

    if (
      !form.patient.trim() ||
      !form.patientId.trim() ||
      !form.doctor.trim() ||
      !form.date ||
      !form.time
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (form.date < today) {
      setError("Please select today or a future date.");
      return;
    }

    if (form.phone && !/^[0-9]{10}$/.test(form.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    const newAppointment = {
      ...form,
      id: Date.now(),
      status: "Upcoming",
    };

    setAppointments((prev) => [newAppointment, ...prev]);
    setForm(emptyForm);
    setShowModal(false);
    setError("");
    setSuccess("New appointment scheduled successfully!");

    setTimeout(() => setSuccess(""), 3000);
  };

  const updateStatus = (id, status) => {
    setAppointments((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );

    setSuccess(`Appointment marked as ${status}.`);
    setTimeout(() => setSuccess(""), 3000);
  };

  const deleteAppointment = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this appointment?"
    );

    if (!confirmDelete) return;

    setAppointments((prev) => prev.filter((item) => item.id !== id));
    setSuccess("Appointment deleted successfully!");

    setTimeout(() => setSuccess(""), 3000);
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
    <div className="hwa-container">

      {/* Header */}
      <div className="hwa-heading">
        <div>
          <div className="hwa-breadcrumb">
            Dashboard <span>/</span> Appointments
          </div>

          <h1>Appointments Management</h1>

          <p>
            Schedule, manage and track patient appointments.
          </p>
        </div>

        <button
          className="hwa-add-btn"
          onClick={() => {
            setForm(emptyForm);
            setError("");
            setShowModal(true);
          }}
        >
          <Plus size={18} />
          Schedule Appointment
        </button>
      </div>

      {/* Success Message */}
      {success && (
        <div className="hwa-success">
          <CheckCircle2 size={18} />
          {success}
        </div>
      )}

      {/* Statistics */}
      <div className="hwa-stats">

        <div className="hwa-stat">
          <div className="hwa-stat-icon hwa-stat-blue">
            <CalendarDays size={22} />
          </div>

          <div>
            <p>Total Appointments</p>
            <h2>{total}</h2>
            <span>All scheduled appointments</span>
          </div>
        </div>

        <div className="hwa-stat">
          <div className="hwa-stat-icon hwa-stat-orange">
            <Clock size={22} />
          </div>

          <div>
            <p>Upcoming</p>
            <h2>{upcoming}</h2>
            <span>Awaiting consultation</span>
          </div>
        </div>

        <div className="hwa-stat">
          <div className="hwa-stat-icon hwa-stat-green">
            <CheckCircle2 size={22} />
          </div>

          <div>
            <p>Completed</p>
            <h2>{completed}</h2>
            <span>Successfully completed</span>
          </div>
        </div>

        <div className="hwa-stat">
          <div className="hwa-stat-icon hwa-stat-red">
            <XCircle size={22} />
          </div>

          <div>
            <p>Cancelled</p>
            <h2>{cancelled}</h2>
            <span>Cancelled appointments</span>
          </div>
        </div>

      </div>

      {/* Appointment Directory */}
      <div className="hwa-directory">

        <div className="hwa-directory-header">
          <div>
            <h2>Appointment Directory</h2>
            <p>Manage all patient appointments from one place.</p>
          </div>

          <div className="hwa-directory-icon">
            <ClipboardList size={21} />
          </div>
        </div>

        {/* Toolbar */}
        <div className="hwa-toolbar">

          <div className="hwa-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search patient, ID or doctor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="hwa-filter">
            <Filter size={16} />

            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
            >
              <option value="All">All Appointments</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

        </div>

        {/* Table */}
        <div className="hwa-table-wrap">
          <table className="hwa-table">

            <thead>
              <tr>
                <th>Patient Details</th>
                <th>Doctor</th>
                <th>Date & Time</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredAppointments.map((item) => (
                <tr key={item.id}>

                  <td>
                    <div className="hwa-patient">
                      <div className="hwa-avatar">
                        {item.patient.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <strong>{item.patient}</strong>
                        <span>{item.patientId}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="hwa-doctor">
                      <User size={15} />
                      {item.doctor}
                    </div>
                  </td>

                  <td>
                    <div className="hwa-date">
                      <strong>{formatDate(item.date)}</strong>
                      <span>
                        <Clock size={12} />
                        {formatTime(item.time)}
                      </span>
                    </div>
                  </td>

                  <td>
                    <span className={`hwa-type ${
                      item.type === "Online" ? "online" : "inperson"
                    }`}>
                      {item.type === "Online" ? (
                        <Video size={13} />
                      ) : (
                        <MapPin size={13} />
                      )}

                      {item.type}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`hwa-status ${item.status.toLowerCase()}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <div className="hwa-row-actions">

                      {item.status === "Upcoming" && (
                        <>
                          <button
                            className="hwa-complete-btn"
                            title="Mark completed"
                            onClick={() =>
                              updateStatus(item.id, "Completed")
                            }
                          >
                            <CheckCircle2 size={16} />
                          </button>

                          <button
                            className="hwa-cancel-btn"
                            title="Cancel appointment"
                            onClick={() =>
                              updateStatus(item.id, "Cancelled")
                            }
                          >
                            <XCircle size={16} />
                          </button>
                        </>
                      )}

                      <button
                        className="hwa-delete-btn"
                        title="Delete appointment"
                        onClick={() => deleteAppointment(item.id)}
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

          {filteredAppointments.length === 0 && (
            <div className="hwa-empty">
              <CalendarDays size={35} />
              <h3>No appointments found</h3>
              <p>Try changing your search or filter.</p>
            </div>
          )}

        </div>

        <div className="hwa-table-footer">
          Showing {filteredAppointments.length} of {total} appointments
        </div>

      </div>

      {/* Schedule Appointment Modal */}
      {showModal && (
        <div
          className="hwa-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="hwa-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="hwa-modal-header">
              <div>
                <h2>Schedule Appointment</h2>
                <p>Enter patient and appointment details.</p>
              </div>

              <button onClick={() => setShowModal(false)}>
                <X size={21} />
              </button>
            </div>

            {error && (
              <div className="hwa-modal-error">
                {error}
              </div>
            )}

            <form onSubmit={handleAddAppointment}>

              <div className="hwa-modal-grid">

                <div className="hwa-field">
                  <label>Patient Name *</label>
                  <input
                    name="patient"
                    placeholder="Patient full name"
                    value={form.patient}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="hwa-field">
                  <label>Patient ID *</label>
                  <input
                    name="patientId"
                    placeholder="e.g. PT-1006"
                    value={form.patientId}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="hwa-field">
                  <label>Doctor Name *</label>
                  <input
                    name="doctor"
                    placeholder="Enter doctor's name"
                    value={form.doctor}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="hwa-field">
                  <label>Patient Phone</label>
                  <input
                    name="phone"
                    type="tel"
                    maxLength="10"
                    placeholder="10-digit phone number"
                    value={form.phone}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="hwa-field">
                  <label>Appointment Date *</label>
                  <input
                    type="date"
                    name="date"
                    min={today}
                    value={form.date}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="hwa-field">
                  <label>Appointment Time *</label>
                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="hwa-field">
                  <label>Appointment Type</label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleFormChange}
                  >
                    <option value="In-Person">In-Person</option>
                    <option value="Online">Online Consultation</option>
                  </select>
                </div>

                <div className="hwa-field hwa-modal-full">
                  <label>Reason for Visit</label>
                  <textarea
                    name="reason"
                    placeholder="Describe the reason for appointment..."
                    rows="3"
                    value={form.reason}
                    onChange={handleFormChange}
                  />
                </div>

              </div>

              <div className="hwa-modal-actions">
                <button
                  type="button"
                  className="hwa-modal-reset"
                  onClick={() => {
                    setForm(emptyForm);
                    setError("");
                  }}
                >
                  Reset
                </button>

                <button type="submit" className="hwa-modal-submit">
                  <Plus size={17} />
                  Create Appointment
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      <div className="hwa-bottom-note">
        AAROGYA LINK — Connecting Communities to Better Healthcare
      </div>

    </div>
  );
}
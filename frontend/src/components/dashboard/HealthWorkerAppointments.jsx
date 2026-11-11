import React, { useState } from "react";
import { useAarogya } from "../../context/AarogyaContext";
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

export default function HealthWorkerAppointments() {
  const {
    appointments,
    patients,
    addAppointment,
    updateAppointmentStatus,
    deleteAppointment,
  } = useAarogya();

  const emptyForm = {
    patientId: (patients[0] && patients[0].id) || "AL-1024",
    doctor: "Dr. Amit Sharma",
    doctorSpecialty: "General Physician",
    date: new Date().toISOString().split("T")[0],
    time: "10:00 AM",
    type: "Hospital Visit",
    reason: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const total = appointments.length;
  const upcoming = appointments.filter((i) => i.status === "Upcoming").length;
  const completed = appointments.filter((i) => i.status === "Completed").length;
  const cancelled = appointments.filter((i) => i.status === "Cancelled").length;

  const filteredAppointments = appointments.filter((item) => {
    const matchesSearch =
      item.patient.toLowerCase().includes(search.toLowerCase()) ||
      item.patientId.toLowerCase().includes(search.toLowerCase()) ||
      item.doctor.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "All" || item.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleAddAppointment = (e) => {
    e.preventDefault();
    const selPatient = patients.find((p) => p.id === form.patientId);
    if (!selPatient) {
      setError("Please select a patient.");
      return;
    }
    if (!form.date) {
      setError("Please select appointment date.");
      return;
    }
    addAppointment({
      patientId: selPatient.id,
      patient: selPatient.name,
      doctor: form.doctor,
      doctorSpecialty: form.doctorSpecialty,
      date: form.date,
      time: form.time || "10:00 AM",
      type: form.type,
      mode:
        form.type === "Online" || form.type === "Teleconsultation"
          ? "Online"
          : "In-Person",
      location:
        form.type === "Online"
          ? "Online Consultation"
          : "District Government Hospital",
      reason: form.reason || "General health consultation",
      status: "Upcoming",
      createdBy: "health_worker",
    });
    setShowModal(false);
    setError("");
    setSuccess(
      "New appointment scheduled successfully and synced with Doctor portal!"
    );
    setTimeout(() => setSuccess(""), 3500);
  };

  const updateStatus = (id, status) => {
    updateAppointmentStatus(id, status);
    setSuccess(`Appointment marked as ${status}.`);
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
    const d = new Date();
    d.setHours(Number(hours), Number(minutes));
    return d.toLocaleTimeString("en-US", {
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
          <p>Schedule, manage and track patient appointments.</p>
        </div>
        <button className="hwa-add-btn" onClick={() => {
            setForm(emptyForm);
            setError("");
            setShowModal(true);
          }}>
          <Plus size={18} /> Schedule Appointment
        </button>
      </div>

      {/* Success Message */}
      {success && (
        <div className="hwa-success">
          <CheckCircle2 size={18} />{success}
        </div>
      )}

      {/* Statistics */}
      <div className="hwa-stats">
        <div className="hwa-stat">
          <div className="hwa-stat-icon hwa-stat-blue"><CalendarDays size={22} /></div>
          <div>
            <p>Total Appointments</p>
            <h2>{total}</h2>
            <span>All scheduled appointments</span>
          </div>
        </div>
        <div className="hwa-stat">
          <div className="hwa-stat-icon hwa-stat-orange"><Clock size={22} /></div>
          <div>
            <p>Upcoming</p>
            <h2>{upcoming}</h2>
            <span>Awaiting consultation</span>
          </div>
        </div>
        <div className="hwa-stat">
          <div className="hwa-stat-icon hwa-stat-green"><CheckCircle2 size={22} /></div>
          <div>
            <p>Completed</p>
            <h2>{completed}</h2>
            <span>Successfully completed</span>
          </div>
        </div>
        <div className="hwa-stat">
          <div className="hwa-stat-icon hwa-stat-red"><XCircle size={22} /></div>
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
          <div className="hwa-directory-icon"><ClipboardList size={21} /></div>
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
            <select value={activeFilter} onChange={(e) => setActiveFilter(e.target.value)}>
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
                <th>Date &amp; Time</th>
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
                      <div className="hwa-avatar">{item.patient.charAt(0).toUpperCase()}</div>
                      <div>
                        <strong>{item.patient}</strong>
                        <span>{item.patientId}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="hwa-doctor"><User size={15} />{item.doctor}</div>
                  </td>
                  <td>
                    <div className="hwa-date">
                      <strong>{formatDate(item.date)}</strong>
                      <span><Clock size={12} />{formatTime(item.time)}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`hwa-type ${item.type === "Online" ? "online" : "inperson"}`}> 
                      {item.type === "Online" ? <Video size={13} /> : <MapPin size={13} />}
                      {item.type}
                    </span>
                  </td>
                  <td>
                    <span className={`hwa-status ${item.status.toLowerCase()}`}>{item.status}</span>
                  </td>
                  <td>
                    <div className="hwa-row-actions">
                      {item.status === "Upcoming" && (
                        <>
                          <button
                            className="hwa-complete-btn"
                            title="Mark completed"
                            onClick={() => updateStatus(item.id, "Completed")}
                          >
                            <CheckCircle2 size={16} />
                          </button>
                          <button
                            className="hwa-cancel-btn"
                            title="Cancel appointment"
                            onClick={() => updateStatus(item.id, "Cancelled")}
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
          <div className="hwa-table-footer">
            Showing {filteredAppointments.length} of {total} appointments
          </div>
        </div>
        {/* Schedule Appointment Modal */}
        {showModal && (
          <div className="hwa-modal-overlay" onClick={() => setShowModal(false)}>
            <div className="hwa-modal" onClick={(e) => e.stopPropagation()}>
              <div className="hwa-modal-header">
                <div>
                  <h2>Schedule Appointment</h2>
                  <p>Enter patient and appointment details.</p>
                </div>
                <button onClick={() => setShowModal(false)}><X size={21} /></button>
              </div>
              {error && <div className="hwa-modal-error">{error}</div>}
              <form onSubmit={handleAddAppointment}>
                <div className="hwa-modal-grid">
                  <div className="hwa-field hwa-modal-full">
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
                          phone: pat?.phone || "",
                        }));
                      }}
                      className="w-full border rounded-xl p-2.5 text-sm"
                    >
                      {patients.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.id}) - {p.village || "Rural"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="hwa-field">
                    <label>Consulting Doctor *</label>
                    <select
                      name="doctor"
                      value={form.doctor}
                      onChange={(e) => {
                        const doc = e.target.value;
                        const spec =
                          doc === "Dr. Neha Verma"
                            ? "General Medicine"
                            : doc === "Dr. Rajesh Sharma"
                            ? "Cardiology"
                            : "General Physician";
                        setForm((prev) => ({ ...prev, doctor: doc, doctorSpecialty: spec }));
                      }}
                      className="w-full border rounded-xl p-2.5 text-sm"
                    >
                      <option value="Dr. Amit Sharma">Dr. Amit Sharma (General Physician)</option>
                      <option value="Dr. Neha Verma">Dr. Neha Verma (General Medicine)</option>
                      <option value="Dr. Rajesh Sharma">Dr. Rajesh Sharma (Cardiology)</option>
                    </select>
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
                    <select name="type" value={form.type} onChange={handleFormChange}>
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
                    <Plus size={17} /> Create Appointment
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
    </div>
  );
}

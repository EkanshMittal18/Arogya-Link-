import React, { useState } from "react";
import {
  CalendarDays,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  ChevronDown,
  Eye,
  X,
  MapPin,
  Phone,
  Video,
  Plus,
  Stethoscope,
  Check,
} from "lucide-react";
import { useAarogya } from "../../context/AarogyaContext";

function DoctorAppointments() {
  const {
    appointments,
    patients,
    addAppointment,
    updateAppointmentStatus,
    addConsultation,
  } = useAarogya();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConsultModal, setShowConsultModal] = useState(false);

  // New appointment form state
  const [addForm, setAddForm] = useState({
    patientId: (patients[0] && patients[0].id) || "AL-1024",
    date: new Date().toISOString().split("T")[0],
    time: "10:00 AM",
    type: "Hospital Visit",
    reason: "General Consultation",
  });

  // Quick Consultation modal form
  const [consultForm, setConsultForm] = useState({
    symptoms: "",
    diagnosis: "",
    notes: "",
  });

  const confirmed = appointments.filter((item) => item.status === "Confirmed" || item.status === "Upcoming").length;
  const pending = appointments.filter((item) => item.status === "Pending").length;
  const completed = appointments.filter((item) => item.status === "Completed").length;

  const filteredAppointments = appointments.filter((item) => {
    const matchesSearch =
      (item.patient || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.id || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.patientId || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.reason || "").toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id, newStatus) => {
    updateAppointmentStatus(id, newStatus);
    if (selectedAppointment && selectedAppointment.id === id) {
      setSelectedAppointment({ ...selectedAppointment, status: newStatus });
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const selPatient = patients.find((p) => p.id === addForm.patientId);
    if (!selPatient) return;

    addAppointment({
      patientId: selPatient.id,
      patient: selPatient.name,
      doctor: "Dr. Amit Sharma",
      date: addForm.date,
      time: addForm.time,
      type: addForm.type,
      mode: addForm.type === "Teleconsultation" ? "Online" : "In-Person",
      location: addForm.type === "Teleconsultation" ? "Online Video Room" : "District Hospital OPD Room 4",
      reason: addForm.reason,
      status: "Confirmed",
      createdBy: "doctor",
    });

    setShowAddModal(false);
  };

  const handleCompleteConsultation = (e) => {
    e.preventDefault();
    if (!selectedAppointment) return;

    // 1. Log Consultation
    addConsultation({
      patientId: selectedAppointment.patientId,
      patient: selectedAppointment.patient,
      doctor: "Dr. Amit Sharma",
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      time: selectedAppointment.time || "10:00 AM",
      type: selectedAppointment.type || "General Consultation",
      symptoms: consultForm.symptoms || selectedAppointment.reason || "Reported symptoms reviewed",
      diagnosis: consultForm.diagnosis || "Clinical assessment completed",
      notes: consultForm.notes || "Advice and lifestyle guidance given to patient.",
      status: "Completed",
    });

    // 2. Mark appointment completed
    updateAppointmentStatus(selectedAppointment.id, "Completed");

    setShowConsultModal(false);
    setSelectedAppointment(null);
    setConsultForm({ symptoms: "", diagnosis: "", notes: "" });
  };

  return (
    <div className="doctor-appointments">
      {/* Heading */}
      <div className="appointments-heading">
        <div>
          <span className="appointments-label">SCHEDULE & OPD MANAGEMENT • LIVE</span>
          <h1>Appointments</h1>
          <p>
            Real-time appointments booked by rural patients, ASHA workers, or clinic reception.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-700 shadow-md"
        >
          <Plus size={18} />
          <span>New Appointment</span>
        </button>
      </div>

      {/* Statistics */}
      <div className="appointments-stats">
        <div className="appointments-stat-card">
          <div className="appointments-stat-icon green">
            <CalendarDays size={22} />
          </div>
          <div>
            <span>Total Appointments</span>
            <h2>{appointments.length}</h2>
            <small>Live synchronized</small>
          </div>
        </div>

        <div className="appointments-stat-card">
          <div className="appointments-stat-icon blue">
            <CheckCircle size={22} />
          </div>
          <div>
            <span>Confirmed / Active</span>
            <h2>{confirmed}</h2>
            <small>Ready for consultation</small>
          </div>
        </div>

        <div className="appointments-stat-card">
          <div className="appointments-stat-icon orange">
            <Clock size={22} />
          </div>
          <div>
            <span>Pending Requests</span>
            <h2>{pending}</h2>
            <small>From patients/ASHA</small>
          </div>
        </div>

        <div className="appointments-stat-card">
          <div className="appointments-stat-icon purple">
            <Users size={22} />
          </div>
          <div>
            <span>Completed</span>
            <h2>{completed}</h2>
            <small>Consultations done</small>
          </div>
        </div>
      </div>

      {/* Appointment Table */}
      <div className="appointments-table-container">
        <div className="appointments-table-header">
          <div>
            <h2>Scheduled Consultations</h2>
            <p>Select an appointment to confirm or begin clinical consultation.</p>
          </div>

          <span className="appointments-total-badge">
            {filteredAppointments.length} Appointments
          </span>
        </div>

        {/* Toolbar */}
        <div className="appointments-toolbar">
          <div className="appointments-search">
            <Search size={19} />
            <input
              type="text"
              placeholder="Search by patient, ID, or reason..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="appointments-filter">
            <Filter size={17} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <ChevronDown size={15} />
          </div>
        </div>

        {/* Table */}
        <div className="appointments-table-wrapper">
          <table className="appointments-table">
            <thead>
              <tr>
                <th>APPOINTMENT ID</th>
                <th>PATIENT</th>
                <th>DATE & TIME</th>
                <th>TYPE / MODE</th>
                <th>REASON / SYMPTOMS</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <span className="appointments-id font-mono font-semibold">
                        {item.id}
                      </span>
                    </td>

                    <td>
                      <div className="appointments-patient-cell">
                        <div className="appointments-avatar font-bold text-xs">
                          {item.initials || "PT"}
                        </div>
                        <div>
                          <strong>{item.patient}</strong>
                          <span className="text-[11px] text-slate-500 block">ID: {item.patientId}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="text-xs">
                        <span className="font-semibold block text-slate-800">{item.date}</span>
                        <span className="text-slate-500 flex items-center gap-1 mt-0.5">
                          <Clock size={12} /> {item.time}
                        </span>
                      </div>
                    </td>

                    <td>
                      <span className="text-xs flex items-center gap-1.5 font-medium text-slate-700">
                        {item.type === "Teleconsultation" || item.mode === "Online" ? (
                          <Video size={14} className="text-blue-600" />
                        ) : (
                          <MapPin size={14} className="text-emerald-600" />
                        )}
                        {item.type}
                      </span>
                    </td>

                    <td>
                      <span className="text-xs text-slate-600 line-clamp-1">
                        {item.reason || "General checkup"}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`appointments-status ${(item.status || "upcoming").toLowerCase()}`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <div className="flex items-center gap-1.5">
                        <button
                          className="appointments-view-button"
                          onClick={() => setSelectedAppointment(item)}
                          title="View Details"
                        >
                          <Eye size={15} />
                          Details
                        </button>

                        {item.status !== "Completed" && item.status !== "Cancelled" && (
                          <button
                            onClick={() => {
                              setSelectedAppointment(item);
                              setShowConsultModal(true);
                            }}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1 font-semibold"
                            title="Start Clinical Consultation"
                          >
                            <Stethoscope size={14} />
                            Consult
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="appointments-empty">
                    No appointments found matching current filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="appointments-table-footer">
          Showing {filteredAppointments.length} of {appointments.length} appointments
        </div>
      </div>

      {/* Appointment Details Modal */}
      {selectedAppointment && !showConsultModal && (
        <div
          className="appointments-modal-overlay"
          onClick={() => setSelectedAppointment(null)}
        >
          <div
            className="appointments-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="appointments-modal-header">
              <div>
                <h2>Appointment Details</h2>
                <p>Manage consultation status and patient visit</p>
              </div>
              <button onClick={() => setSelectedAppointment(null)}>
                <X size={21} />
              </button>
            </div>

            <div className="appointments-modal-profile">
              <div className="appointments-modal-avatar font-bold">
                {selectedAppointment.initials || "PT"}
              </div>
              <div>
                <h3>{selectedAppointment.patient}</h3>
                <span>
                  Patient ID: {selectedAppointment.patientId} • Apt: {selectedAppointment.id}
                </span>
              </div>
            </div>

            <div className="appointments-modal-details">
              <div>
                <span>Scheduled Date</span>
                <strong>{selectedAppointment.date}</strong>
              </div>

              <div>
                <span>Scheduled Time</span>
                <strong>{selectedAppointment.time}</strong>
              </div>

              <div>
                <span>Consultation Mode</span>
                <strong>{selectedAppointment.type} ({selectedAppointment.mode || "In-Person"})</strong>
              </div>

              <div>
                <span>Location / Link</span>
                <strong>{selectedAppointment.location || "District Hospital OPD"}</strong>
              </div>

              <div>
                <span>Current Status</span>
                <strong className="text-emerald-700 font-bold">{selectedAppointment.status}</strong>
              </div>

              <div>
                <span>Reason</span>
                <strong>{selectedAppointment.reason || "General checkup"}</strong>
              </div>
            </div>

            {/* Quick Status Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-3 border-t">
              {selectedAppointment.status !== "Confirmed" && selectedAppointment.status !== "Completed" && (
                <button
                  type="button"
                  onClick={() => handleStatusChange(selectedAppointment.id, "Confirmed")}
                  className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-700"
                >
                  Confirm Appointment
                </button>
              )}

              {selectedAppointment.status !== "Completed" && (
                <button
                  type="button"
                  onClick={() => setShowConsultModal(true)}
                  className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-emerald-700 flex items-center gap-1"
                >
                  <Stethoscope size={14} /> Start Consultation
                </button>
              )}

              {selectedAppointment.status !== "Cancelled" && (
                <button
                  type="button"
                  onClick={() => handleStatusChange(selectedAppointment.id, "Cancelled")}
                  className="bg-slate-100 text-red-600 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Start Consultation Modal */}
      {showConsultModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b">
              <div className="flex items-center gap-2">
                <Stethoscope size={22} className="text-emerald-600" />
                <h3 className="text-base font-bold text-slate-800">
                  Conduct Consultation: {selectedAppointment.patient}
                </h3>
              </div>
              <button
                onClick={() => setShowConsultModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCompleteConsultation} className="space-y-3 mt-4 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-xl border text-xs flex justify-between">
                <span>Patient ID: <strong>{selectedAppointment.patientId}</strong></span>
                <span>Type: <strong>{selectedAppointment.type}</strong></span>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Observed Symptoms
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fever, elevated blood pressure, headache"
                  value={consultForm.symptoms}
                  onChange={(e) => setConsultForm({ ...consultForm, symptoms: e.target.value })}
                  className="w-full border rounded-xl p-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Doctor's Clinical Diagnosis
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Essential Hypertension Stage 1"
                  value={consultForm.diagnosis}
                  onChange={(e) => setConsultForm({ ...consultForm, diagnosis: e.target.value })}
                  className="w-full border rounded-xl p-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Consultation Notes & Lifestyle Advice
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Advised low-salt diet, daily walking, and follow-up in 2 weeks..."
                  value={consultForm.notes}
                  onChange={(e) => setConsultForm({ ...consultForm, notes: e.target.value })}
                  className="w-full border rounded-xl p-2.5 text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowConsultModal(false)}
                  className="px-4 py-2 border rounded-xl font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 shadow-md flex items-center gap-1.5"
                >
                  <Check size={16} /> Save & Complete Consultation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Appointment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b">
              <div className="flex items-center gap-2">
                <CalendarDays size={22} className="text-emerald-600" />
                <h3 className="text-base font-bold text-slate-800">Schedule Patient Appointment</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 mt-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Patient</label>
                <select
                  value={addForm.patientId}
                  onChange={(e) => setAddForm({ ...addForm, patientId: e.target.value })}
                  className="w-full border rounded-xl p-2.5 text-sm"
                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.id}) - {p.village || "Rural"}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={addForm.date}
                    onChange={(e) => setAddForm({ ...addForm, date: e.target.value })}
                    className="w-full border rounded-xl p-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Time</label>
                  <select
                    value={addForm.time}
                    onChange={(e) => setAddForm({ ...addForm, time: e.target.value })}
                    className="w-full border rounded-xl p-2.5 text-sm"
                  >
                    <option value="09:30 AM">09:30 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:30 PM">03:30 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Appointment Type</label>
                <select
                  value={addForm.type}
                  onChange={(e) => setAddForm({ ...addForm, type: e.target.value })}
                  className="w-full border rounded-xl p-2.5 text-sm"
                >
                  <option value="Hospital Visit">In-Person Hospital Visit (OPD)</option>
                  <option value="Teleconsultation">Online Teleconsultation</option>
                  <option value="Follow-up">Clinical Follow-up</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Reason / Clinical Purpose</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hypertension management checkup"
                  value={addForm.reason}
                  onChange={(e) => setAddForm({ ...addForm, reason: e.target.value })}
                  className="w-full border rounded-xl p-2.5 text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-xl font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 shadow-md"
                >
                  Schedule Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorAppointments;

import React, { useState } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  UserRound,
  Search,
  Video,
  Hospital,
  CheckCircle2,
  Clock3,
  XCircle,
  Plus,
  X,
  Stethoscope,
} from "lucide-react";
import { useAarogya } from "../../context/AarogyaContext";

function PatientAppointments() {
  const { appointments, activePatient, addAppointment, updateAppointmentStatus } = useAarogya();
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [showBookingModal, setShowBookingModal] = useState(false);

  // New appointment form state
  const [form, setForm] = useState({
    doctor: "Dr. Amit Sharma",
    doctorSpecialty: "General Physician",
    date: new Date().toISOString().split("T")[0],
    time: "10:00 AM",
    type: "Hospital Visit",
    reason: "",
  });

  const patientAppointments = appointments.filter((a) => a.patientId === activePatient.id);

  const upcomingCount = patientAppointments.filter((a) => a.status === "Upcoming" || a.status === "Pending").length;
  const completedCount = patientAppointments.filter((a) => a.status === "Completed").length;
  const cancelledCount = patientAppointments.filter((a) => a.status === "Cancelled").length;

  const nextAppointment = patientAppointments.find((a) => a.status === "Upcoming" || a.status === "Pending");

  const filteredAppointments = patientAppointments.filter((appointment) => {
    const matchesTab =
      activeTab === "All" ||
      (activeTab === "Upcoming" && (appointment.status === "Upcoming" || appointment.status === "Pending")) ||
      appointment.status === activeTab;

    const matchesSearch =
      (appointment.doctor || "").toLowerCase().includes(search.toLowerCase()) ||
      (appointment.doctorSpecialty || "").toLowerCase().includes(search.toLowerCase()) ||
      (appointment.reason || "").toLowerCase().includes(search.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const handleBookSubmit = (e) => {
    e.preventDefault();
    addAppointment({
      patientId: activePatient.id,
      patient: activePatient.name,
      doctor: form.doctor,
      doctorSpecialty: form.doctorSpecialty,
      date: form.date,
      time: form.time,
      type: form.type,
      mode: form.type === "Teleconsultation" ? "Online" : "In-Person",
      location: form.type === "Teleconsultation" ? "Online Video Consultation" : "District Government Hospital",
      reason: form.reason || "General Consultation",
      status: "Upcoming",
      createdBy: "patient",
    });
    setShowBookingModal(false);
    setForm({
      doctor: "Dr. Amit Sharma",
      doctorSpecialty: "General Physician",
      date: new Date().toISOString().split("T")[0],
      time: "10:00 AM",
      type: "Hospital Visit",
      reason: "",
    });
  };

  return (
    <div className="appointments-page">
      {/* HEADER */}
      <div className="appointments-header">
        <div>
          <h2>My Appointments</h2>
          <p>Book consultations, view appointment schedules, and track doctor visits.</p>
        </div>

        <button
          onClick={() => setShowBookingModal(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-semibold shadow-md transition-all text-sm"
        >
          <Plus size={18} />
          <span>Book New Appointment</span>
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="appointment-stats">
        <div className="appointment-stat-card">
          <CalendarDays size={25} />
          <div>
            <h3>{String(upcomingCount).padStart(2, "0")}</h3>
            <p>Upcoming</p>
          </div>
        </div>

        <div className="appointment-stat-card completed-stat">
          <CheckCircle2 size={25} />
          <div>
            <h3>{String(completedCount).padStart(2, "0")}</h3>
            <p>Completed</p>
          </div>
        </div>

        <div className="appointment-stat-card cancelled-stat">
          <XCircle size={25} />
          <div>
            <h3>{String(cancelledCount).padStart(2, "0")}</h3>
            <p>Cancelled</p>
          </div>
        </div>
      </div>

      {/* UPCOMING APPOINTMENT */}
      {nextAppointment && (
        <section className="upcoming-appointment-panel">
          <div className="upcoming-title">
            <div>
              <CalendarDays size={23} />
              <h3>Next Upcoming Consultation</h3>
            </div>
            <span>{nextAppointment.status}</span>
          </div>

          <div className="upcoming-details">
            <div className="upcoming-doctor-icon">
              <UserRound size={34} />
            </div>

            <div className="upcoming-doctor-info">
              <h3>{nextAppointment.doctor}</h3>
              <p>{nextAppointment.doctorSpecialty || "Specialist Physician"}</p>
              <div className="upcoming-meta">
                <span>
                  <CalendarDays size={15} /> {nextAppointment.date}
                </span>
                <span>
                  <Clock size={15} /> {nextAppointment.time}
                </span>
                <span>
                  <MapPin size={15} /> {nextAppointment.location}
                </span>
              </div>
              {nextAppointment.reason && (
                <p className="text-xs text-slate-600 mt-2">
                  <span className="font-semibold">Reason:</span> {nextAppointment.reason}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* SEARCH AND FILTER */}
      <div className="appointment-toolbar">
        <div className="appointment-search">
          <Search size={19} />
          <input
            type="text"
            placeholder="Search doctor, specialty, or condition..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="appointment-tabs">
          {["All", "Upcoming", "Completed", "Cancelled"].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "selected-tab" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* APPOINTMENT LIST */}
      <section className="appointment-list-panel">
        <div className="appointment-list-heading">
          <div>
            <h3>Appointment History</h3>
            <p>Your previous and upcoming healthcare consultations</p>
          </div>
          <span>{filteredAppointments.length} Appointments</span>
        </div>

        {filteredAppointments.length > 0 ? (
          <div className="appointment-list">
            {filteredAppointments.map((appointment) => (
              <div className="appointment-card" key={appointment.id}>
                <div className="appointment-date-box">
                  <CalendarDays size={23} />
                  <span>{appointment.date}</span>
                </div>

                <div className="appointment-doctor flex-1">
                  <h4>{appointment.doctor}</h4>
                  <p>{appointment.doctorSpecialty || "General Physician"}</p>

                  <div className="appointment-information">
                    <span>
                      <Clock size={14} /> {appointment.time}
                    </span>
                    <span>
                      {appointment.type === "Teleconsultation" ? (
                        <Video size={14} />
                      ) : (
                        <Hospital size={14} />
                      )}
                      {appointment.type}
                    </span>
                    {appointment.reason && (
                      <span className="text-slate-500 text-xs italic">
                        "{appointment.reason}"
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="appointment-status">
                    <span className={`status-${(appointment.status || "upcoming").toLowerCase()}`}>
                      {appointment.status}
                    </span>
                  </div>
                  {appointment.status !== "Cancelled" && appointment.status !== "Completed" && (
                    <button
                      onClick={() => updateAppointmentStatus(appointment.id, "Cancelled")}
                      className="text-xs text-red-600 hover:text-red-700 underline"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="appointment-empty">
            <CalendarDays size={40} />
            <h3>No Appointments Found</h3>
            <p>You have no appointments matching this filter.</p>
          </div>
        )}
      </section>

      {/* BOOK APPOINTMENT MODAL */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b">
              <div className="flex items-center gap-2">
                <Stethoscope size={22} className="text-emerald-600" />
                <h3 className="text-lg font-bold text-slate-800">Book Doctor Consultation</h3>
              </div>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleBookSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Select Doctor
                </label>
                <select
                  value={form.doctor}
                  onChange={(e) => {
                    const doc = e.target.value;
                    const specialty =
                      doc === "Dr. Neha Verma"
                        ? "General Medicine / Pulmonology"
                        : "General Physician";
                    setForm({ ...form, doctor: doc, doctorSpecialty: specialty });
                  }}
                  className="w-full border rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="Dr. Amit Sharma">Dr. Amit Sharma (General Physician)</option>
                  <option value="Dr. Neha Verma">Dr. Neha Verma (General Medicine)</option>
                  <option value="Dr. Rajesh Sharma">Dr. Rajesh Sharma (Cardiology Specialist)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full border rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Time Slot
                  </label>
                  <select
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="w-full border rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="09:30 AM">09:30 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:30 PM">04:30 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Consultation Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, type: "Hospital Visit" })}
                    className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 ${
                      form.type === "Hospital Visit"
                        ? "border-emerald-600 bg-emerald-50 text-emerald-800 font-bold"
                        : "border-slate-200 text-slate-600"
                    }`}
                  >
                    <Hospital size={16} />
                    In-Person Hospital Visit
                  </button>

                  <button
                    type="button"
                    onClick={() => setForm({ ...form, type: "Teleconsultation" })}
                    className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 ${
                      form.type === "Teleconsultation"
                        ? "border-emerald-600 bg-emerald-50 text-emerald-800 font-bold"
                        : "border-slate-200 text-slate-600"
                    }`}
                  >
                    <Video size={16} />
                    Online Teleconsultation
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Reason for Consultation / Symptoms
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your health problem or reason for checkup..."
                  value={form.reason}
                  onChange={(e) => setForm({ ...form, reason: e.target.value })}
                  className="w-full border rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="px-4 py-2 border rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 shadow-md"
                >
                  Confirm Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INFORMATION */}
      <div className="appointment-info-note">
        <Clock3 size={20} />
        <p>
          Consultations are synchronized live across the Doctor and Health Worker portals.
          Arrive on time or join your teleconsultation room 5 minutes before scheduled time.
        </p>
      </div>
    </div>
  );
}

export default PatientAppointments;

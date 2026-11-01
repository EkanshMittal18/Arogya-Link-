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
} from "lucide-react";

const initialAppointments = [
  {
    id: "APT-1001",
    patient: "Rahul Sharma",
    patientId: "AL-1024",
    age: 32,
    gender: "Male",
    phone: "9876543210",
    date: "2026-11-01",
    time: "09:30 AM",
    type: "General Checkup",
    mode: "In-Person",
    reason: "Regular health checkup",
    status: "Confirmed",
    initials: "RS",
  },
  {
    id: "APT-1002",
    patient: "Priya Verma",
    patientId: "AL-1025",
    age: 26,
    gender: "Female",
    phone: "9876543211",
    date: "2026-11-01",
    time: "10:15 AM",
    type: "Follow-up",
    mode: "Online",
    reason: "Follow-up consultation",
    status: "Pending",
    initials: "PV",
  },
  {
    id: "APT-1003",
    patient: "Amit Kumar",
    patientId: "AL-1026",
    age: 45,
    gender: "Male",
    phone: "9876543212",
    date: "2026-11-01",
    time: "11:00 AM",
    type: "Consultation",
    mode: "In-Person",
    reason: "Blood pressure monitoring",
    status: "Confirmed",
    initials: "AK",
  },
  {
    id: "APT-1004",
    patient: "Neha Singh",
    patientId: "AL-1027",
    age: 29,
    gender: "Female",
    phone: "9876543213",
    date: "2026-11-01",
    time: "12:30 PM",
    type: "Health Checkup",
    mode: "Online",
    reason: "General health assessment",
    status: "Pending",
    initials: "NS",
  },
  {
    id: "APT-1005",
    patient: "Vikash Gupta",
    patientId: "AL-1028",
    age: 51,
    gender: "Male",
    phone: "9876543214",
    date: "2026-11-01",
    time: "02:00 PM",
    type: "Follow-up",
    mode: "In-Person",
    reason: "Diabetes follow-up",
    status: "Completed",
    initials: "VG",
  },
  {
    id: "APT-1006",
    patient: "Anjali Mehta",
    patientId: "AL-1029",
    age: 34,
    gender: "Female",
    phone: "9876543215",
    date: "2026-11-01",
    time: "03:30 PM",
    type: "Consultation",
    mode: "Online",
    reason: "Headache consultation",
    status: "Cancelled",
    initials: "AM",
  },
];

function DoctorAppointments() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const today = "2026-11-01";

  const todayAppointments = appointments.filter(
    (item) => item.date === today
  );

  const confirmed = appointments.filter(
    (item) => item.status === "Confirmed"
  ).length;

  const pending = appointments.filter(
    (item) => item.status === "Pending"
  ).length;

  const completed = appointments.filter(
    (item) => item.status === "Completed"
  ).length;

  const filteredAppointments = appointments.filter((item) => {
    const matchesSearch =
      item.patient.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.patientId.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id, newStatus) => {
    setAppointments((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );

    setSelectedAppointment(null);
  };

  return (
    <div className="doctor-appointments">

      {/* Heading */}
      <div className="appointments-heading">
        <div>
          <span className="appointments-label">SCHEDULE MANAGEMENT</span>
          <h1>Appointments</h1>
          <p>Manage your patient appointments and daily schedule.</p>
        </div>

        <div className="appointments-today-badge">
          <CalendarDays size={18} />
          November 1, 2026
        </div>
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
            <small>All scheduled visits</small>
          </div>
        </div>

        <div className="appointments-stat-card">
          <div className="appointments-stat-icon blue">
            <Users size={22} />
          </div>
          <div>
            <span>Today's Appointments</span>
            <h2>{todayAppointments.length}</h2>
            <small>Scheduled for today</small>
          </div>
        </div>

        <div className="appointments-stat-card">
          <div className="appointments-stat-icon purple">
            <CheckCircle size={22} />
          </div>
          <div>
            <span>Confirmed</span>
            <h2>{confirmed}</h2>
            <small>Ready for consultation</small>
          </div>
        </div>

        <div className="appointments-stat-card">
          <div className="appointments-stat-icon orange">
            <Clock size={22} />
          </div>
          <div>
            <span>Pending</span>
            <h2>{pending}</h2>
            <small>Awaiting confirmation</small>
          </div>
        </div>

      </div>

      {/* Schedule Overview */}
      <div className="appointments-schedule-banner">
        <div className="appointments-schedule-icon">
          <CalendarDays size={24} />
        </div>

        <div>
          <h3>Today's Schedule</h3>
          <p>
            You have {todayAppointments.length} appointments scheduled today,
            including {completed} completed consultations.
          </p>
        </div>

        <div className="appointments-schedule-time">
          <Clock size={16} />
          <span>Daily Schedule</span>
        </div>
      </div>

      {/* Appointment Directory */}
      <div className="appointments-table-container">

        <div className="appointments-table-header">
          <div>
            <h2>Appointment Directory</h2>
            <p>View and manage patient appointment requests.</p>
          </div>

          <span className="appointments-count">
            {filteredAppointments.length} Appointments
          </span>
        </div>

        {/* Search and Filter */}
        <div className="appointments-toolbar">

          <div className="appointments-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search patient or appointment ID..."
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
                <th>PATIENT</th>
                <th>APPOINTMENT ID</th>
                <th>DATE & TIME</th>
                <th>APPOINTMENT TYPE</th>
                <th>MODE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>

              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((item) => (
                  <tr key={item.id}>

                    <td>
                      <div className="appointments-patient-cell">
                        <div className="appointments-avatar">
                          {item.initials}
                        </div>

                        <div>
                          <strong>{item.patient}</strong>
                          <span>{item.patientId}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="appointments-id">
                        {item.id}
                      </span>
                    </td>

                    <td>
                      <div className="appointments-date-cell">
                        <strong>
                          {new Date(item.date + "T00:00:00").toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </strong>
                        <span>{item.time}</span>
                      </div>
                    </td>

                    <td>{item.type}</td>

                    <td>
                      <span className="appointments-mode">
                        {item.mode === "Online" ? (
                          <Video size={15} />
                        ) : (
                          <MapPin size={15} />
                        )}
                        {item.mode}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`appointments-status ${item.status.toLowerCase()}`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="appointments-view-button"
                        onClick={() => setSelectedAppointment(item)}
                      >
                        <Eye size={15} />
                        View
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="appointments-empty">
                    No appointments found.
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
      {selectedAppointment && (
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
                <p>{selectedAppointment.id}</p>
              </div>

              <button onClick={() => setSelectedAppointment(null)}>
                <X size={21} />
              </button>
            </div>

            <div className="appointments-modal-patient">
              <div className="appointments-modal-avatar">
                {selectedAppointment.initials}
              </div>

              <div>
                <h3>{selectedAppointment.patient}</h3>
                <span>{selectedAppointment.patientId}</span>
              </div>
            </div>

            <div className="appointments-modal-details">

              <div>
                <span>Age / Gender</span>
                <strong>
                  {selectedAppointment.age} Years / {selectedAppointment.gender}
                </strong>
              </div>

              <div>
                <span>Phone Number</span>
                <strong>
                  <Phone size={14} />
                  {selectedAppointment.phone}
                </strong>
              </div>

              <div>
                <span>Appointment Date</span>
                <strong>{selectedAppointment.date}</strong>
              </div>

              <div>
                <span>Appointment Time</span>
                <strong>{selectedAppointment.time}</strong>
              </div>

              <div>
                <span>Appointment Type</span>
                <strong>{selectedAppointment.type}</strong>
              </div>

              <div>
                <span>Consultation Mode</span>
                <strong>{selectedAppointment.mode}</strong>
              </div>

              <div className="appointment-reason">
                <span>Reason for Visit</span>
                <strong>{selectedAppointment.reason}</strong>
              </div>

              <div>
                <span>Current Status</span>
                <strong>{selectedAppointment.status}</strong>
              </div>

            </div>

            {selectedAppointment.status === "Pending" && (
              <div className="appointments-modal-actions">

                <button
                  className="appointment-confirm-button"
                  onClick={() =>
                    updateStatus(selectedAppointment.id, "Confirmed")
                  }
                >
                  <CheckCircle size={17} />
                  Confirm Appointment
                </button>

                <button
                  className="appointment-cancel-button"
                  onClick={() =>
                    updateStatus(selectedAppointment.id, "Cancelled")
                  }
                >
                  <XCircle size={17} />
                  Cancel Appointment
                </button>

              </div>
            )}

            {selectedAppointment.status === "Confirmed" && (
              <button
                className="appointment-complete-button"
                onClick={() =>
                  updateStatus(selectedAppointment.id, "Completed")
                }
              >
                <CheckCircle size={17} />
                Mark as Completed
              </button>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

export default DoctorAppointments;
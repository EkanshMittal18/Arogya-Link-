import React, { useState } from "react";
import {
  Stethoscope,
  Users,
  Clock,
  CheckCircle,
  Search,
  Eye,
  X,
  Activity,
  FileText,
  CalendarDays,
  Play,
  Check,
} from "lucide-react";

const initialConsultations = [
  {
    id: "CON-1001",
    patient: "Rahul Sharma",
    patientId: "AL-1024",
    age: 32,
    gender: "Male",
    date: "01 Nov 2026",
    time: "09:30 AM",
    type: "General Checkup",
    symptoms: "Headache, fatigue and mild fever",
    diagnosis: "Seasonal viral infection",
    notes: "Patient advised rest and adequate hydration.",
    status: "Completed",
    initials: "RS",
  },
  {
    id: "CON-1002",
    patient: "Priya Verma",
    patientId: "AL-1025",
    age: 26,
    gender: "Female",
    date: "01 Nov 2026",
    time: "10:15 AM",
    type: "Follow-up",
    symptoms: "Persistent cough and weakness",
    diagnosis: "Under evaluation",
    notes: "Review symptoms and monitor progress.",
    status: "In Progress",
    initials: "PV",
  },
  {
    id: "CON-1003",
    patient: "Amit Kumar",
    patientId: "AL-1026",
    age: 45,
    gender: "Male",
    date: "01 Nov 2026",
    time: "11:00 AM",
    type: "Consultation",
    symptoms: "High blood pressure",
    diagnosis: "Hypertension",
    notes: "Blood pressure monitoring recommended.",
    status: "Scheduled",
    initials: "AK",
  },
  {
    id: "CON-1004",
    patient: "Neha Singh",
    patientId: "AL-1027",
    age: 29,
    gender: "Female",
    date: "31 Oct 2026",
    time: "12:30 PM",
    type: "Health Checkup",
    symptoms: "Recurring headaches",
    diagnosis: "Migraine",
    notes: "Follow-up recommended if symptoms persist.",
    status: "Completed",
    initials: "NS",
  },
  {
    id: "CON-1005",
    patient: "Vikash Gupta",
    patientId: "AL-1028",
    age: 51,
    gender: "Male",
    date: "31 Oct 2026",
    time: "02:00 PM",
    type: "Follow-up",
    symptoms: "Elevated blood sugar",
    diagnosis: "Type 2 Diabetes",
    notes: "Regular blood sugar monitoring advised.",
    status: "Scheduled",
    initials: "VG",
  },
];

function DoctorConsultations() {
  const [consultations, setConsultations] = useState(initialConsultations);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  const completed = consultations.filter(
    (item) => item.status === "Completed"
  ).length;

  const inProgress = consultations.filter(
    (item) => item.status === "In Progress"
  ).length;

  const scheduled = consultations.filter(
    (item) => item.status === "Scheduled"
  ).length;

  const todayCount = consultations.filter(
    (item) => item.date === "01 Nov 2026"
  ).length;

  const filteredConsultations = consultations.filter((item) => {
    const matchesSearch =
      item.patient.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.patientId.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id, status) => {
    setConsultations((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );

    setSelectedConsultation((previous) =>
      previous ? { ...previous, status } : null
    );
  };

  return (
    <div className="doctor-consultations">

      {/* Heading */}
      <div className="consultations-heading">
        <div>
          <span className="consultations-label">
            CLINICAL MANAGEMENT
          </span>

          <h1>Consultations</h1>

          <p>
            Manage patient consultations, clinical observations and treatment records.
          </p>
        </div>

        <div className="consultations-date">
          <CalendarDays size={18} />
          November 1, 2026
        </div>
      </div>

      {/* Statistics */}
      <div className="consultations-stats">

        <div className="consultations-stat-card">
          <div className="consultations-stat-icon green">
            <Stethoscope size={23} />
          </div>

          <div>
            <span>Total Consultations</span>
            <h2>{consultations.length}</h2>
            <small>All consultation records</small>
          </div>
        </div>

        <div className="consultations-stat-card">
          <div className="consultations-stat-icon blue">
            <CalendarDays size={23} />
          </div>

          <div>
            <span>Today's Consultations</span>
            <h2>{todayCount}</h2>
            <small>Scheduled for today</small>
          </div>
        </div>

        <div className="consultations-stat-card">
          <div className="consultations-stat-icon purple">
            <CheckCircle size={23} />
          </div>

          <div>
            <span>Completed</span>
            <h2>{completed}</h2>
            <small>Successfully completed</small>
          </div>
        </div>

        <div className="consultations-stat-card">
          <div className="consultations-stat-icon orange">
            <Clock size={23} />
          </div>

          <div>
            <span>In Progress</span>
            <h2>{inProgress}</h2>
            <small>{scheduled} scheduled</small>
          </div>
        </div>

      </div>

      {/* Information Banner */}
      <div className="consultations-banner">
        <div className="consultations-banner-icon">
          <Activity size={24} />
        </div>

        <div>
          <h3>Clinical Consultation Workspace</h3>
          <p>
            Review patient symptoms, record clinical observations and
            maintain consultation history.
          </p>
        </div>
      </div>

      {/* Consultation Directory */}
      <div className="consultations-container">

        <div className="consultations-container-header">
          <div>
            <h2>Consultation History</h2>
            <p>All patient consultation records</p>
          </div>

          <span className="consultations-count">
            {filteredConsultations.length} Records
          </span>
        </div>

        {/* Search and Filter */}
        <div className="consultations-toolbar">

          <div className="consultations-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search patient name or consultation ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="consultations-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

        </div>

        {/* Table */}
        <div className="consultations-table-wrapper">

          <table className="consultations-table">

            <thead>
              <tr>
                <th>PATIENT</th>
                <th>CONSULTATION ID</th>
                <th>DATE & TIME</th>
                <th>CONSULTATION TYPE</th>
                <th>DIAGNOSIS</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>

              {filteredConsultations.length > 0 ? (
                filteredConsultations.map((item) => (
                  <tr key={item.id}>

                    <td>
                      <div className="consultations-patient-cell">

                        <div className="consultations-avatar">
                          {item.initials}
                        </div>

                        <div>
                          <strong>{item.patient}</strong>
                          <span>{item.patientId}</span>
                        </div>

                      </div>
                    </td>

                    <td>
                      <span className="consultations-id">
                        {item.id}
                      </span>
                    </td>

                    <td>
                      <div className="consultations-date-cell">
                        <strong>{item.date}</strong>
                        <span>{item.time}</span>
                      </div>
                    </td>

                    <td>{item.type}</td>

                    <td>{item.diagnosis}</td>

                    <td>
                      <span
                        className={`consultations-status ${
                          item.status.toLowerCase().replace(" ", "-")
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="consultations-view-button"
                        onClick={() => setSelectedConsultation(item)}
                      >
                        <Eye size={15} />
                        View
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="consultations-empty">
                    No consultations found.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

        <div className="consultations-footer">
          Showing {filteredConsultations.length} of {consultations.length} consultations
        </div>

      </div>

      {/* Details Modal */}
      {selectedConsultation && (
        <div
          className="consultations-modal-overlay"
          onClick={() => setSelectedConsultation(null)}
        >

          <div
            className="consultations-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="consultations-modal-header">
              <div>
                <h2>Consultation Details</h2>
                <p>{selectedConsultation.id}</p>
              </div>

              <button
                onClick={() => setSelectedConsultation(null)}
              >
                <X size={21} />
              </button>
            </div>

            {/* Patient */}
            <div className="consultations-modal-patient">

              <div className="consultations-modal-avatar">
                {selectedConsultation.initials}
              </div>

              <div>
                <h3>{selectedConsultation.patient}</h3>
                <span>{selectedConsultation.patientId}</span>
              </div>

            </div>

            {/* Details */}
            <div className="consultations-modal-details">

              <div>
                <span>Age / Gender</span>
                <strong>
                  {selectedConsultation.age} Years / {selectedConsultation.gender}
                </strong>
              </div>

              <div>
                <span>Date & Time</span>
                <strong>
                  {selectedConsultation.date}, {selectedConsultation.time}
                </strong>
              </div>

              <div>
                <span>Consultation Type</span>
                <strong>{selectedConsultation.type}</strong>
              </div>

              <div>
                <span>Current Status</span>
                <strong>{selectedConsultation.status}</strong>
              </div>

              <div className="consultations-detail-full">
                <span>Reported Symptoms</span>
                <strong>{selectedConsultation.symptoms}</strong>
              </div>

              <div className="consultations-detail-full">
                <span>Diagnosis</span>
                <strong>{selectedConsultation.diagnosis}</strong>
              </div>

              <div className="consultations-detail-full">
                <span>Doctor's Notes</span>
                <strong>{selectedConsultation.notes}</strong>
              </div>

            </div>

            {/* Actions */}
            <div className="consultations-modal-actions">

              {selectedConsultation.status === "Scheduled" && (
                <button
                  className="consultation-start-button"
                  onClick={() =>
                    updateStatus(selectedConsultation.id, "In Progress")
                  }
                >
                  <Play size={17} />
                  Start Consultation
                </button>
              )}

              {selectedConsultation.status === "In Progress" && (
                <button
                  className="consultation-complete-button"
                  onClick={() =>
                    updateStatus(selectedConsultation.id, "Completed")
                  }
                >
                  <Check size={17} />
                  Complete Consultation
                </button>
              )}

              <button
                className="consultation-close-button"
                onClick={() => setSelectedConsultation(null)}
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default DoctorConsultations;
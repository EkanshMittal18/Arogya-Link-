import React, { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Eye,
  X,
  ArrowUpRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Building2,
  UserRound,
  CalendarDays,
  Stethoscope,
} from "lucide-react";

const initialReferrals = [
  {
    id: "REF-1001",
    patient: "Rahul Sharma",
    patientId: "AL-1024",
    department: "Cardiology",
    specialist: "Dr. Amit Verma",
    hospital: "City Heart Hospital",
    reason: "Chest discomfort and irregular heartbeat",
    priority: "Urgent",
    status: "Pending",
    date: "2026-11-01",
    notes: "Patient requires specialist evaluation.",
  },
  {
    id: "REF-1002",
    patient: "Priya Singh",
    patientId: "AL-1025",
    department: "Neurology",
    specialist: "Dr. Neha Gupta",
    hospital: "District Medical Center",
    reason: "Recurring headaches",
    priority: "Routine",
    status: "Accepted",
    date: "2026-10-30",
    notes: "Referral submitted for further assessment.",
  },
  {
    id: "REF-1003",
    patient: "Aman Kumar",
    patientId: "AL-1026",
    department: "Orthopedics",
    specialist: "Dr. Raj Malhotra",
    hospital: "Green Valley Hospital",
    reason: "Persistent knee pain",
    priority: "Routine",
    status: "Completed",
    date: "2026-10-28",
    notes: "Specialist consultation completed.",
  },
  {
    id: "REF-1004",
    patient: "Sneha Verma",
    patientId: "AL-1027",
    department: "Dermatology",
    specialist: "Dr. Pooja Mehta",
    hospital: "Care Plus Clinic",
    reason: "Skin condition requiring specialist review",
    priority: "Routine",
    status: "Pending",
    date: "2026-10-27",
    notes: "Awaiting specialist response.",
  },
  {
    id: "REF-1005",
    patient: "Vikas Yadav",
    patientId: "AL-1028",
    department: "General Medicine",
    specialist: "Dr. Karan Singh",
    hospital: "Community Health Center",
    reason: "Further medical evaluation required",
    priority: "Urgent",
    status: "Cancelled",
    date: "2026-10-25",
    notes: "Referral cancelled.",
  },
];

const emptyForm = {
  patient: "",
  patientId: "",
  department: "",
  specialist: "",
  hospital: "",
  reason: "",
  priority: "Routine",
  notes: "",
};

function DoctorReferrals() {
  const [referrals, setReferrals] = useState(initialReferrals);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedReferral, setSelectedReferral] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const filteredReferrals = useMemo(() => {
    return referrals.filter((referral) => {
      const matchesSearch = [
        referral.id,
        referral.patient,
        referral.patientId,
        referral.department,
        referral.hospital,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || referral.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [referrals, search, statusFilter]);

  const stats = [
    {
      label: "Total Referrals",
      value: referrals.length,
      icon: ArrowUpRight,
      color: "blue",
    },
    {
      label: "Pending",
      value: referrals.filter((r) => r.status === "Pending").length,
      icon: Clock,
      color: "orange",
    },
    {
      label: "Accepted",
      value: referrals.filter((r) => r.status === "Accepted").length,
      icon: CheckCircle,
      color: "green",
    },
    {
      label: "Completed",
      value: referrals.filter((r) => r.status === "Completed").length,
      icon: CheckCircle,
      color: "purple",
    },
  ];

  const updateField = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const createReferral = (e) => {
    e.preventDefault();

    const newReferral = {
      ...form,
      id: `REF-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
    };

    setReferrals((prev) => [newReferral, ...prev]);
    setForm(emptyForm);
    setShowCreateModal(false);
  };

  const updateStatus = (id, status) => {
    setReferrals((prev) =>
      prev.map((referral) =>
        referral.id === id ? { ...referral, status } : referral
      )
    );

    setSelectedReferral((prev) =>
      prev && prev.id === id ? { ...prev, status } : prev
    );
  };

  const getStatusClass = (status) => {
    return status.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <div className="doctor-section referrals-section">
      <div className="doctor-section-heading">
        <div>
          <span className="doctor-eyebrow">PATIENT CARE COORDINATION</span>
          <h2>Referral Management</h2>
          <p>
            Manage patient referrals and coordinate care with specialists
            and healthcare centers.
          </p>
        </div>

        <button
          className="doctor-primary-btn"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={18} />
          Create Referral
        </button>
      </div>

      {/* Statistics */}

      <div className="referral-stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="referral-stat-card" key={stat.label}>
              <div className={`referral-stat-icon ${stat.color}`}>
                <Icon size={21} />
              </div>

              <div>
                <p>{stat.label}</p>
                <h3>{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search and Filters */}

      <div className="referral-toolbar">
        <div className="referral-search">
          <Search size={19} />
          <input
            type="text"
            placeholder="Search patient, referral ID, hospital..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="referral-filter">
          <Filter size={17} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Referrals Table */}

      <div className="referral-table-card">
        <div className="referral-table-heading">
          <div>
            <h3>Patient Referrals</h3>
            <p>Track and manage specialist referrals.</p>
          </div>

          <span className="referral-count">
            {filteredReferrals.length} Records
          </span>
        </div>

        <div className="referral-table-wrapper">
          <table className="referral-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Referral ID</th>
                <th>Specialist / Department</th>
                <th>Priority</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredReferrals.map((referral) => (
                <tr key={referral.id}>
                  <td>
                    <div className="referral-patient">
                      <div className="referral-avatar">
                        <UserRound size={18} />
                      </div>

                      <div>
                        <strong>{referral.patient}</strong>
                        <span>{referral.patientId}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="referral-id">{referral.id}</span>
                  </td>

                  <td>
                    <div className="referral-department">
                      <strong>{referral.department}</strong>
                      <span>{referral.specialist}</span>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`referral-priority ${referral.priority.toLowerCase()}`}
                    >
                      {referral.priority === "Urgent" && (
                        <AlertTriangle size={13} />
                      )}
                      {referral.priority}
                    </span>
                  </td>

                  <td>
                    <span className="referral-date">{referral.date}</span>
                  </td>

                  <td>
                    <span
                      className={`referral-status ${getStatusClass(
                        referral.status
                      )}`}
                    >
                      {referral.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="referral-view-btn"
                      onClick={() => setSelectedReferral(referral)}
                    >
                      <Eye size={16} />
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {filteredReferrals.length === 0 && (
                <tr>
                  <td colSpan="7" className="referral-empty">
                    No referrals found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Referral Modal */}

      {showCreateModal && (
        <div
          className="referral-modal-overlay"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="referral-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="referral-modal-header">
              <div>
                <h3>Create New Referral</h3>
                <p>Enter patient and referral information.</p>
              </div>

              <button onClick={() => setShowCreateModal(false)}>
                <X size={21} />
              </button>
            </div>

            <form onSubmit={createReferral}>
              <div className="referral-form-grid">
                <div className="referral-form-group">
                  <label>Patient Name *</label>
                  <input
                    name="patient"
                    value={form.patient}
                    onChange={updateField}
                    placeholder="Enter patient name"
                    required
                  />
                </div>

                <div className="referral-form-group">
                  <label>Patient ID *</label>
                  <input
                    name="patientId"
                    value={form.patientId}
                    onChange={updateField}
                    placeholder="e.g. AL-1030"
                    required
                  />
                </div>

                <div className="referral-form-group">
                  <label>Department *</label>
                  <select
                    name="department"
                    value={form.department}
                    onChange={updateField}
                    required
                  >
                    <option value="">Select department</option>
                    <option>Cardiology</option>
                    <option>Neurology</option>
                    <option>Orthopedics</option>
                    <option>Dermatology</option>
                    <option>General Medicine</option>
                    <option>Ophthalmology</option>
                    <option>Pediatrics</option>
                    <option>Gynecology</option>
                  </select>
                </div>

                <div className="referral-form-group">
                  <label>Specialist Name *</label>
                  <input
                    name="specialist"
                    value={form.specialist}
                    onChange={updateField}
                    placeholder="Enter specialist name"
                    required
                  />
                </div>

                <div className="referral-form-group full">
                  <label>Hospital / Healthcare Center *</label>
                  <input
                    name="hospital"
                    value={form.hospital}
                    onChange={updateField}
                    placeholder="Enter hospital name"
                    required
                  />
                </div>

                <div className="referral-form-group">
                  <label>Priority *</label>
                  <select
                    name="priority"
                    value={form.priority}
                    onChange={updateField}
                  >
                    <option>Routine</option>
                    <option>Urgent</option>
                    <option>Emergency</option>
                  </select>
                </div>

                <div className="referral-form-group full">
                  <label>Reason for Referral *</label>
                  <textarea
                    name="reason"
                    value={form.reason}
                    onChange={updateField}
                    placeholder="Enter referral reason"
                    rows="3"
                    required
                  />
                </div>

                <div className="referral-form-group full">
                  <label>Additional Notes</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={updateField}
                    placeholder="Add additional information..."
                    rows="2"
                  />
                </div>
              </div>

              <div className="referral-modal-actions">
                <button
                  type="button"
                  className="referral-cancel-btn"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="doctor-primary-btn">
                  <Plus size={17} />
                  Create Referral
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Referral Details Modal */}

      {selectedReferral && (
        <div
          className="referral-modal-overlay"
          onClick={() => setSelectedReferral(null)}
        >
          <div
            className="referral-modal referral-details-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="referral-modal-header">
              <div>
                <span className="doctor-eyebrow">REFERRAL DETAILS</span>
                <h3>{selectedReferral.id}</h3>
              </div>

              <button onClick={() => setSelectedReferral(null)}>
                <X size={21} />
              </button>
            </div>

            <div className="referral-detail-grid">
              <div className="referral-detail-item">
                <UserRound size={18} />
                <div>
                  <span>Patient Name</span>
                  <strong>{selectedReferral.patient}</strong>
                </div>
              </div>

              <div className="referral-detail-item">
                <FileText size={18} />
                <div>
                  <span>Patient ID</span>
                  <strong>{selectedReferral.patientId}</strong>
                </div>
              </div>

              <div className="referral-detail-item">
                <Stethoscope size={18} />
                <div>
                  <span>Department</span>
                  <strong>{selectedReferral.department}</strong>
                </div>
              </div>

              <div className="referral-detail-item">
                <UserRound size={18} />
                <div>
                  <span>Specialist</span>
                  <strong>{selectedReferral.specialist}</strong>
                </div>
              </div>

              <div className="referral-detail-item full">
                <Building2 size={18} />
                <div>
                  <span>Hospital / Center</span>
                  <strong>{selectedReferral.hospital}</strong>
                </div>
              </div>

              <div className="referral-detail-item">
                <CalendarDays size={18} />
                <div>
                  <span>Referral Date</span>
                  <strong>{selectedReferral.date}</strong>
                </div>
              </div>

              <div className="referral-detail-item">
                <AlertTriangle size={18} />
                <div>
                  <span>Priority</span>
                  <strong>{selectedReferral.priority}</strong>
                </div>
              </div>
            </div>

            <div className="referral-detail-description">
              <h4>Reason for Referral</h4>
              <p>{selectedReferral.reason}</p>
            </div>

            <div className="referral-detail-description">
              <h4>Additional Notes</h4>
              <p>{selectedReferral.notes || "No additional notes."}</p>
            </div>

            <div className="referral-detail-footer">
              <div>
                <span>Current Status</span>
                <span
                  className={`referral-status ${getStatusClass(
                    selectedReferral.status
                  )}`}
                >
                  {selectedReferral.status}
                </span>
              </div>

              <div className="referral-status-actions">
                {selectedReferral.status === "Pending" && (
                  <button
                    className="referral-accept-btn"
                    onClick={() =>
                      updateStatus(selectedReferral.id, "Accepted")
                    }
                  >
                    <CheckCircle size={16} />
                    Accept
                  </button>
                )}

                {selectedReferral.status === "Accepted" && (
                  <button
                    className="referral-complete-btn"
                    onClick={() =>
                      updateStatus(selectedReferral.id, "Completed")
                    }
                  >
                    <CheckCircle size={16} />
                    Mark Completed
                  </button>
                )}

                {selectedReferral.status !== "Completed" &&
                  selectedReferral.status !== "Cancelled" && (
                    <button
                      className="referral-reject-btn"
                      onClick={() =>
                        updateStatus(selectedReferral.id, "Cancelled")
                      }
                    >
                      <XCircle size={16} />
                      Cancel
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="referral-demo-notice">
        <AlertTriangle size={17} />
        <p>
          Demo mode: Referral records and status updates are stored temporarily
          in React state. They are not saved to Firebase.
        </p>
      </div>
    </div>
  );
}

export default DoctorReferrals;
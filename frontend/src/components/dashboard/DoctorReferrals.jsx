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
  Check,
} from "lucide-react";
import { useAarogya } from "../../context/AarogyaContext";

function DoctorReferrals() {
  const { referrals, patients, addReferral, updateReferralStatus } = useAarogya();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedReferral, setSelectedReferral] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [form, setForm] = useState({
    patientId: patients[0]?.id || "AL-1024",
    hospital: "City Heart Specialty Hospital",
    department: "Cardiology",
    specialist: "Dr. Raj Malhotra",
    reason: "Further specialist evaluation required",
    priority: "Urgent",
    notes: "Patient screened with recurring symptoms.",
  });

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

      const matchesStatus = statusFilter === "All" || referral.status === statusFilter;

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
      label: "Pending Review",
      value: referrals.filter((r) => r.status === "Pending" || r.status === "In Progress").length,
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

  const handleCreateReferral = (e) => {
    e.preventDefault();
    const selPatient = patients.find((p) => p.id === form.patientId);
    if (!selPatient) return;

    addReferral({
      patientId: selPatient.id,
      patient: selPatient.name,
      hospital: form.hospital,
      department: form.department,
      doctor: form.specialist,
      specialist: form.specialist,
      reason: form.reason,
      priority: form.priority,
      notes: form.notes,
      referredBy: "Dr. Amit Sharma",
      date: new Date().toISOString().split("T")[0],
      status: "In Progress",
    });

    setShowCreateModal(false);
  };

  const handleStatusChange = (id, newStatus) => {
    updateReferralStatus(id, newStatus);
    if (selectedReferral && selectedReferral.id === id) {
      setSelectedReferral((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  return (
    <div className="doctor-section referrals-section">
      <div className="doctor-section-heading">
        <div>
          <span className="doctor-eyebrow">CARE COORDINATION • LIVE CONNECTED</span>
          <h2>Referral Management</h2>
          <p>
            Review incoming referrals sent by ASHA Rural Health Workers and coordinate specialist referrals.
          </p>
        </div>

        <button
          className="doctor-primary-btn"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={18} />
          Create Specialist Referral
        </button>
      </div>

      {/* Stats */}
      <div className="referrals-stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div className={`referral-stat-card ${stat.color}`} key={index}>
              <div className="referral-stat-icon">
                <Icon size={20} />
              </div>
              <div className="referral-stat-content">
                <span className="referral-stat-value">{stat.value}</span>
                <span className="referral-stat-label">{stat.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Container */}
      <div className="referrals-container">
        <div className="referrals-toolbar">
          <div className="referrals-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search by patient, ID, department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="referrals-filter">
            <Filter size={16} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Referrals</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="referrals-table-wrapper">
          <table className="referrals-table">
            <thead>
              <tr>
                <th>PATIENT</th>
                <th>DEPARTMENT / SPECIALIST</th>
                <th>HOSPITAL</th>
                <th>PRIORITY</th>
                <th>STATUS</th>
                <th>REFERRED BY</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredReferrals.length > 0 ? (
                filteredReferrals.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="referral-patient-cell">
                        <div className="referral-avatar font-bold text-xs">
                          {(item.patient || "PT").slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <strong>{item.patient}</strong>
                          <span>{item.id}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div>
                        <strong>{item.department || "General Medicine"}</strong>
                        <span className="block text-slate-500 text-xs">{item.doctor || item.specialist}</span>
                      </div>
                    </td>

                    <td>{item.hospital}</td>

                    <td>
                      <span className={`priority-badge ${(item.priority || "routine").toLowerCase()}`}>
                        {item.priority || "Routine"}
                      </span>
                    </td>

                    <td>
                      <span className={`status-badge ${(item.status || "pending").toLowerCase().replace(" ", "-")}`}>
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <span className="text-xs text-slate-600 font-medium">
                        {item.referredBy || "ASHA Health Worker"}
                      </span>
                    </td>

                    <td>
                      <div className="flex items-center gap-1.5">
                        <button
                          className="action-btn"
                          onClick={() => setSelectedReferral(item)}
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>

                        {item.status !== "Accepted" && item.status !== "Completed" && (
                          <button
                            onClick={() => handleStatusChange(item.id, "Accepted")}
                            className="text-xs bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-semibold px-2 py-1 rounded"
                            title="Accept Referral"
                          >
                            Accept
                          </button>
                        )}
                        {item.status === "Accepted" && (
                          <button
                            onClick={() => handleStatusChange(item.id, "Completed")}
                            className="text-xs bg-purple-50 text-purple-800 hover:bg-purple-100 font-semibold px-2 py-1 rounded"
                            title="Mark Consultation Completed"
                          >
                            Complete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-slate-400 text-xs">
                    No referrals found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Referral Details Modal */}
      {selectedReferral && (
        <div
          className="patients-modal-overlay"
          onClick={() => setSelectedReferral(null)}
        >
          <div className="patients-modal max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="patients-modal-header">
              <div>
                <h2>Referral Dossier</h2>
                <p>Referral ID: {selectedReferral.id}</p>
              </div>
              <button onClick={() => setSelectedReferral(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="p-4 space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border flex justify-between">
                <div>
                  <span className="text-slate-500">Patient:</span>
                  <strong className="block text-slate-900 text-sm">{selectedReferral.patient}</strong>
                  <span className="text-[11px] text-slate-500">ID: {selectedReferral.patientId}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500">Facility:</span>
                  <strong className="block text-slate-900">{selectedReferral.hospital}</strong>
                  <span className="text-[11px] text-emerald-700 font-bold">{selectedReferral.status}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-500 uppercase">Reason for Referral</span>
                <p className="p-2.5 bg-slate-50 rounded-lg border mt-1 text-slate-800 font-medium">
                  {selectedReferral.reason}
                </p>
              </div>

              {selectedReferral.notes && (
                <div>
                  <span className="font-bold text-slate-500 uppercase">Clinical / Field Observations</span>
                  <p className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-100 mt-1 text-slate-700">
                    {selectedReferral.notes}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-50 p-2.5 rounded-lg border">
                  <span className="text-slate-500">Priority:</span>
                  <strong className="block text-slate-800">{selectedReferral.priority || "Routine"}</strong>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border">
                  <span className="text-slate-500">Referred By:</span>
                  <strong className="block text-slate-800">{selectedReferral.referredBy || "ASHA Worker"}</strong>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t">
                {selectedReferral.status !== "Accepted" && selectedReferral.status !== "Completed" && (
                  <button
                    onClick={() => handleStatusChange(selectedReferral.id, "Accepted")}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold"
                  >
                    Accept Referral
                  </button>
                )}
                {selectedReferral.status !== "Completed" && (
                  <button
                    onClick={() => handleStatusChange(selectedReferral.id, "Completed")}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold"
                  >
                    Mark Completed
                  </button>
                )}
                <button
                  onClick={() => setSelectedReferral(null)}
                  className="px-4 py-2 border rounded-lg font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Referral Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b">
              <div className="flex items-center gap-2">
                <Plus size={20} className="text-emerald-600" />
                <h3 className="text-base font-bold text-slate-800">Create Specialist Referral</h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateReferral} className="space-y-3 mt-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Patient</label>
                <select
                  value={form.patientId}
                  onChange={(e) => setForm({ ...form, patientId: e.target.value })}
                  className="w-full border rounded-xl p-2.5 text-sm"
                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.id}) - {p.village || "Rural"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Hospital / Medical Center</label>
                <input
                  type="text"
                  required
                  value={form.hospital}
                  onChange={(e) => setForm({ ...form, hospital: e.target.value })}
                  className="w-full border rounded-xl p-2.5 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    required
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full border rounded-xl p-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Priority</label>
                  <select
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    className="w-full border rounded-xl p-2.5 text-sm"
                  >
                    <option value="Urgent">Urgent</option>
                    <option value="High">High</option>
                    <option value="Routine">Routine</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Clinical Reason for Referral</label>
                <textarea
                  rows={2}
                  required
                  value={form.reason}
                  onChange={(e) => setForm({ ...form, reason: e.target.value })}
                  className="w-full border rounded-xl p-2.5 text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border rounded-xl font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 shadow-md"
                >
                  Create & Transmit Referral
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorReferrals;

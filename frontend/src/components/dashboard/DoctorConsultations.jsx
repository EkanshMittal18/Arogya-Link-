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
  Plus,
  Check,
} from "lucide-react";
import { useAarogya } from "../../context/AarogyaContext";

function DoctorConsultations() {
  const { consultations, patients, addConsultation } = useAarogya();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [form, setForm] = useState({
    patientId: (patients[0] && patients[0].id) || "AL-1024",
    type: "General Consultation",
    symptoms: "",
    diagnosis: "",
    notes: "",
  });

  const completed = consultations.filter((item) => item.status === "Completed").length;
  const inProgress = consultations.filter((item) => item.status === "In Progress" || item.status === "Scheduled").length;

  const filteredConsultations = consultations.filter((item) => {
    const matchesSearch =
      (item.patient || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.id || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.diagnosis || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.symptoms || "").toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const selPatient = patients.find((p) => p.id === form.patientId);
    if (!selPatient) return;

    addConsultation({
      patientId: selPatient.id,
      patient: selPatient.name,
      age: selPatient.age,
      gender: selPatient.gender,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: form.type,
      doctor: "Dr. Amit Sharma",
      symptoms: form.symptoms,
      diagnosis: form.diagnosis,
      notes: form.notes,
      status: "Completed",
    });

    setShowAddModal(false);
    setForm({
      patientId: (patients[0] && patients[0].id) || "AL-1024",
      type: "General Consultation",
      symptoms: "",
      diagnosis: "",
      notes: "",
    });
  };

  return (
    <div className="doctor-consultations">
      {/* Heading */}
      <div className="consultations-heading">
        <div>
          <span className="consultations-label">CLINICAL MANAGEMENT • LIVE</span>
          <h1>Clinical Consultations</h1>
          <p>
            Conduct clinical examinations, record diagnoses, and synchronize treatment notes with Patient Health Records.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-700 shadow-md"
        >
          <Plus size={18} />
          <span>New Consultation</span>
        </button>
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
            <span>Registered Patients</span>
            <h2>{patients.length}</h2>
            <small>Active in care network</small>
          </div>
        </div>

        <div className="consultations-stat-card">
          <div className="consultations-stat-icon purple">
            <CheckCircle size={23} />
          </div>
          <div>
            <span>Completed</span>
            <h2>{completed}</h2>
            <small>Successfully documented</small>
          </div>
        </div>

        <div className="consultations-stat-card">
          <div className="consultations-stat-icon orange">
            <Clock size={23} />
          </div>
          <div>
            <span>In Progress / Scheduled</span>
            <h2>{inProgress}</h2>
            <small>Awaiting clinical review</small>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="consultations-table-container">
        <div className="consultations-table-header">
          <div>
            <h2>Consultation Records</h2>
            <p>Clinical observations, diagnoses, and medical summaries</p>
          </div>
          <span className="consultations-badge">{filteredConsultations.length} Records</span>
        </div>

        {/* Toolbar */}
        <div className="consultations-toolbar">
          <div className="consultations-search">
            <Search size={19} />
            <input
              type="text"
              placeholder="Search by patient, diagnosis, or symptom..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="consultations-filter">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Scheduled">Scheduled</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="consultations-table-wrapper">
          <table className="consultations-table">
            <thead>
              <tr>
                <th>CONSULTATION ID</th>
                <th>PATIENT</th>
                <th>DATE & TIME</th>
                <th>TYPE</th>
                <th>DIAGNOSIS</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredConsultations.length > 0 ? (
                filteredConsultations.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <span className="font-mono text-xs font-semibold text-emerald-800">
                        {item.id}
                      </span>
                    </td>

                    <td>
                      <div className="consultations-patient-cell">
                        <div className="consultations-avatar font-bold text-xs">
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
                        <span className="font-semibold block">{item.date}</span>
                        <span className="text-slate-500">{item.time}</span>
                      </div>
                    </td>

                    <td>
                      <span className="text-xs text-slate-700">{item.type}</span>
                    </td>

                    <td>
                      <strong className="text-xs text-slate-800 block">{item.diagnosis}</strong>
                      <span className="text-[11px] text-slate-500 line-clamp-1">{item.symptoms}</span>
                    </td>

                    <td>
                      <span
                        className={`consultations-status ${(item.status || "completed")
                          .toLowerCase()
                          .replace(" ", "")}`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="consultations-view-button"
                        onClick={() => setSelectedConsultation(item)}
                      >
                        <Eye size={16} />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-slate-400 text-xs">
                    No consultations found matching current filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedConsultation && (
        <div
          className="consultations-modal-overlay"
          onClick={() => setSelectedConsultation(null)}
        >
          <div className="consultations-modal max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="consultations-modal-header">
              <div>
                <h2>Consultation Clinical Notes</h2>
                <p>Record ID: {selectedConsultation.id}</p>
              </div>
              <button onClick={() => setSelectedConsultation(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="p-4 space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border flex justify-between">
                <div>
                  <span className="text-slate-500 block">Patient</span>
                  <strong className="text-slate-900 text-sm">{selectedConsultation.patient}</strong>
                  <span className="text-[11px] text-slate-500">ID: {selectedConsultation.patientId}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block">Date</span>
                  <strong className="text-slate-900">{selectedConsultation.date}</strong>
                  <span className="text-[11px] text-emerald-700 font-bold block">{selectedConsultation.status}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-500 uppercase">Symptoms Reported</span>
                <p className="p-2.5 bg-slate-50 rounded-lg border mt-1 text-slate-800 font-medium">
                  {selectedConsultation.symptoms}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-500 uppercase">Clinical Diagnosis</span>
                <p className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-100 mt-1 text-emerald-950 font-bold">
                  {selectedConsultation.diagnosis}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-500 uppercase">Doctor's Clinical Notes</span>
                <p className="p-2.5 bg-slate-50 rounded-lg border mt-1 text-slate-700">
                  {selectedConsultation.notes}
                </p>
              </div>
            </div>

            <div className="flex justify-end p-4 border-t">
              <button
                onClick={() => setSelectedConsultation(null)}
                className="px-4 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Consultation Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b">
              <div className="flex items-center gap-2">
                <Stethoscope size={22} className="text-emerald-600" />
                <h3 className="text-base font-bold text-slate-800">New Clinical Consultation</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3 mt-4 text-xs">
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
                <label className="block font-semibold text-slate-700 mb-1">Consultation Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full border rounded-xl p-2.5 text-sm"
                >
                  <option value="General Consultation">General OPD Consultation</option>
                  <option value="Hypertension Review">Hypertension Review</option>
                  <option value="Diabetes Follow-up">Diabetes Follow-up</option>
                  <option value="Teleconsultation">Teleconsultation</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Observed Symptoms</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Headache, high BP reading, fatigue"
                  value={form.symptoms}
                  onChange={(e) => setForm({ ...form, symptoms: e.target.value })}
                  className="w-full border rounded-xl p-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Clinical Diagnosis</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Essential Hypertension Stage 1"
                  value={form.diagnosis}
                  onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
                  className="w-full border rounded-xl p-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Clinical Instructions & Advice</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Advised low-sodium diet, regular aerobic exercise, and weekly BP checks..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
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
                  className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 shadow-md flex items-center gap-1.5"
                >
                  <Check size={16} /> Save Consultation & Sync Records
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorConsultations;

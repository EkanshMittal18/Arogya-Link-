import React, { useState } from "react";
import {
  FileText,
  FileImage,
  ClipboardList,
  Upload,
  Search,
  Eye,
  Download,
  CalendarDays,
  User,
  X,
  Filter,
  File,
  Plus,
  Trash2,
} from "lucide-react";
import { useAarogya } from "../../context/AarogyaContext";

function DoctorMedicalRecords() {
  const { medicalRecords, patients, addMedicalRecord } = useAarogya();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showUpload, setShowUpload] = useState(false);

  const [form, setForm] = useState({
    patientId: patients[0]?.id || "AL-1024",
    type: "Lab Report",
    title: "",
    description: "",
  });

  const filteredRecords = medicalRecords.filter((record) => {
    const matchesSearch =
      (record.patient || "").toLowerCase().includes(search.toLowerCase()) ||
      (record.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (record.id || "").toLowerCase().includes(search.toLowerCase()) ||
      (record.patientId || "").toLowerCase().includes(search.toLowerCase());

    const matchesType = typeFilter === "All" || record.type === typeFilter || record.category === typeFilter;

    return matchesSearch && matchesType;
  });

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    const selPatient = patients.find((p) => p.id === form.patientId);
    if (!selPatient || !form.title.trim()) return;

    addMedicalRecord({
      patientId: selPatient.id,
      patient: selPatient.name,
      type: form.type,
      category: form.type,
      title: form.title,
      description: form.description || "Uploaded medical record.",
      doctor: "Dr. Amit Sharma",
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      fileName: `${form.title.toLowerCase().replace(/\s+/g, "_")}.pdf`,
      status: "Available",
    });

    setShowUpload(false);
    setForm({
      patientId: patients[0]?.id || "AL-1024",
      type: "Lab Report",
      title: "",
      description: "",
    });
  };

  return (
    <div className="doctor-medical-records">
      {/* Header */}
      <div className="medical-records-header">
        <div>
          <span className="medical-records-label">CLINICAL DOCUMENTATION • LIVE</span>
          <h1>Medical Records</h1>
          <p>Access and upload patient diagnostic reports, digital prescriptions, and clinical history.</p>
        </div>

        <button
          className="medical-records-upload-btn"
          onClick={() => setShowUpload(true)}
        >
          <Upload size={18} />
          Upload Record
        </button>
      </div>

      {/* Stats */}
      <div className="medical-records-stats">
        <div className="medical-records-stat-card">
          <div className="medical-records-stat-icon green">
            <FileText size={22} />
          </div>
          <div>
            <span>Total Records</span>
            <h2>{medicalRecords.length}</h2>
            <small>Live synchronized</small>
          </div>
        </div>

        <div className="medical-records-stat-card">
          <div className="medical-records-stat-icon blue">
            <ClipboardList size={22} />
          </div>
          <div>
            <span>Consultations</span>
            <h2>{medicalRecords.filter((r) => r.type === "Consultation" || r.category === "Consultation").length}</h2>
            <small>Clinical notes</small>
          </div>
        </div>

        <div className="medical-records-stat-card">
          <div className="medical-records-stat-icon purple">
            <FileText size={22} />
          </div>
          <div>
            <span>Prescriptions</span>
            <h2>{medicalRecords.filter((r) => r.type === "Prescription" || r.category === "Prescription").length}</h2>
            <small>Issued digital Rx</small>
          </div>
        </div>

        <div className="medical-records-stat-card">
          <div className="medical-records-stat-icon orange">
            <FileImage size={22} />
          </div>
          <div>
            <span>Diagnostic Reports</span>
            <h2>{medicalRecords.filter((r) => r.type === "Lab Report" || r.type === "Imaging").length}</h2>
            <small>Labs & imaging</small>
          </div>
        </div>
      </div>

      {/* Records Table */}
      <div className="medical-records-container">
        <div className="medical-records-toolbar">
          <div className="medical-records-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search by patient, title, or record ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="medical-records-filter">
            <Filter size={16} />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Lab Report">Lab Reports</option>
              <option value="Prescription">Prescriptions</option>
              <option value="Consultation">Consultations</option>
              <option value="Imaging">Imaging</option>
            </select>
          </div>
        </div>

        <div className="medical-records-table-wrapper">
          <table className="medical-records-table">
            <thead>
              <tr>
                <th>PATIENT</th>
                <th>DOCUMENT / TITLE</th>
                <th>TYPE</th>
                <th>DATE</th>
                <th>DOCTOR / PROVIDER</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="medical-records-patient-cell">
                        <div className="medical-records-avatar font-bold text-xs">
                          {(item.patient || "PT").slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <strong>{item.patient}</strong>
                          <span className="text-[11px] text-slate-500 block">ID: {item.patientId}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <strong className="text-slate-800 text-xs block">{item.title}</strong>
                      <span className="text-[11px] text-slate-500 line-clamp-1">{item.description}</span>
                    </td>

                    <td>
                      <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                        {item.type || item.category}
                      </span>
                    </td>

                    <td>{item.date}</td>

                    <td>{item.doctor}</td>

                    <td>
                      <span className="text-xs font-semibold text-emerald-700">
                        {item.status || "Available"}
                      </span>
                    </td>

                    <td>
                      <button
                        className="action-btn"
                        onClick={() => setSelectedRecord(item)}
                        title="View Record"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-slate-400 text-xs">
                    No medical records found matching your filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedRecord && (
        <div
          className="patients-modal-overlay"
          onClick={() => setSelectedRecord(null)}
        >
          <div className="patients-modal max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="patients-modal-header">
              <div>
                <h2>{selectedRecord.title}</h2>
                <p>Record ID: {selectedRecord.id} • {selectedRecord.date}</p>
              </div>
              <button onClick={() => setSelectedRecord(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="p-4 space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border flex justify-between">
                <div>
                  <span className="text-slate-500">Patient:</span>
                  <strong className="block text-slate-900">{selectedRecord.patient}</strong>
                  <span className="text-[11px] text-slate-500">ID: {selectedRecord.patientId}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500">Provider:</span>
                  <strong className="block text-slate-900">{selectedRecord.doctor}</strong>
                  <span className="text-[11px] text-emerald-700 font-bold">{selectedRecord.status}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-500 uppercase">Record Details & Observations</span>
                <p className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 mt-1 text-slate-800 leading-relaxed">
                  {selectedRecord.description}
                </p>
              </div>

              {selectedRecord.prescriptionDetails && selectedRecord.prescriptionDetails.medicines && (
                <div>
                  <span className="font-bold text-slate-500 uppercase">Prescribed Medicines</span>
                  <div className="border rounded-xl overflow-hidden mt-1 text-xs">
                    <table className="w-full text-left">
                      <thead className="bg-slate-100 text-slate-700">
                        <tr>
                          <th className="p-2">Medicine</th>
                          <th className="p-2">Dosage</th>
                          <th className="p-2">Frequency</th>
                          <th className="p-2">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {selectedRecord.prescriptionDetails.medicines.map((m, idx) => (
                          <tr key={idx}>
                            <td className="p-2 font-semibold text-slate-800">{m.name}</td>
                            <td className="p-2 text-slate-600">{m.dosage}</td>
                            <td className="p-2 text-slate-600">{m.frequency}</td>
                            <td className="p-2 text-slate-600">{m.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end p-4 border-t gap-2">
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-200"
              >
                Print
              </button>
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Record Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b">
              <div className="flex items-center gap-2">
                <Upload size={20} className="text-emerald-600" />
                <h3 className="text-base font-bold text-slate-800">Add Patient Medical Record</h3>
              </div>
              <button
                onClick={() => setShowUpload(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-3 mt-4 text-xs">
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Record Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full border rounded-xl p-2.5 text-sm"
                  >
                    <option value="Lab Report">Lab Report</option>
                    <option value="Imaging">Imaging / X-Ray</option>
                    <option value="Consultation">Clinical Consultation</option>
                    <option value="Other">Previous Medical Record</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Record Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Complete Blood Count (CBC)"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full border rounded-xl p-2.5 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Clinical Findings / Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter test values, diagnostic impression, or findings..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full border rounded-xl p-2.5 text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowUpload(false)}
                  className="px-4 py-2 border rounded-xl font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 shadow-md"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorMedicalRecords;

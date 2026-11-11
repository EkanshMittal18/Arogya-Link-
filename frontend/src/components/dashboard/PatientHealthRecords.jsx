import React, { useState } from "react";
import {
  Search,
  FileText,
  Download,
  Eye,
  CalendarDays,
  Activity,
  Pill,
  FlaskConical,
  ClipboardList,
  Filter,
  X,
  Printer,
  Stethoscope,
} from "lucide-react";
import { useAarogya } from "../../context/AarogyaContext";

function PatientHealthRecords() {
  const { medicalRecords, activePatient, prescriptions } = useAarogya();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedRecord, setSelectedRecord] = useState(null);

  const patientRecords = medicalRecords.filter((r) => r.patientId === activePatient.id);

  const consultationCount = patientRecords.filter((r) => r.category === "Consultation" || r.type === "Consultation").length;
  const prescriptionCount = patientRecords.filter((r) => r.category === "Prescription" || r.type === "Prescription").length;
  const labCount = patientRecords.filter((r) => r.category === "Lab Report" || r.type === "Lab Report").length;

  const filteredRecords = patientRecords.filter((record) => {
    const matchesSearch =
      (record.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (record.doctor || "").toLowerCase().includes(search.toLowerCase()) ||
      (record.description || "").toLowerCase().includes(search.toLowerCase());

    const recordCat = record.category || record.type;
    const matchesCategory = category === "All" || recordCat === category;

    return matchesSearch && matchesCategory;
  });

  const getRecordIcon = (type) => {
    switch (type) {
      case "Prescription":
        return Pill;
      case "Lab Report":
        return FlaskConical;
      default:
        return ClipboardList;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="health-records-page">
      {/* PAGE HEADER */}
      <div className="records-header">
        <div>
          <h2>My Health Records</h2>
          <p>Access and view prescriptions, doctor consultations, lab reports, and vitals history.</p>
        </div>

        <div className="records-total">
          <FileText size={22} />
          <div>
            <h3>{patientRecords.length}</h3>
            <span>Total Records</span>
          </div>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="records-summary">
        <div className="record-summary-card">
          <div className="record-summary-icon green">
            <FileText size={23} />
          </div>
          <div>
            <h3>{String(patientRecords.length).padStart(2, "0")}</h3>
            <p>Total Records</p>
          </div>
        </div>

        <div className="record-summary-card">
          <div className="record-summary-icon blue">
            <Activity size={23} />
          </div>
          <div>
            <h3>{String(consultationCount).padStart(2, "0")}</h3>
            <p>Consultations</p>
          </div>
        </div>

        <div className="record-summary-card">
          <div className="record-summary-icon purple">
            <Pill size={23} />
          </div>
          <div>
            <h3>{String(prescriptionCount).padStart(2, "0")}</h3>
            <p>Prescriptions</p>
          </div>
        </div>

        <div className="record-summary-card">
          <div className="record-summary-icon orange">
            <FlaskConical size={23} />
          </div>
          <div>
            <h3>{String(labCount).padStart(2, "0")}</h3>
            <p>Lab Reports</p>
          </div>
        </div>
      </div>

      {/* SEARCH AND FILTER */}
      <div className="records-toolbar">
        <div className="records-search">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search medical records, diagnoses, or doctors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="records-filter">
          <Filter size={19} />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All Records</option>
            <option value="Consultation">Consultations</option>
            <option value="Prescription">Prescriptions</option>
            <option value="Lab Report">Lab Reports</option>
          </select>
        </div>
      </div>

      {/* RECORDS LIST */}
      <section className="records-list-section">
        <div className="records-list-heading">
          <div>
            <h3>Medical History Timeline</h3>
            <p>Records synced with Doctor and Health Worker consultations</p>
          </div>
          <span>{filteredRecords.length} Records</span>
        </div>

        {filteredRecords.length > 0 ? (
          <div className="records-list">
            {filteredRecords.map((record) => {
              const Icon = getRecordIcon(record.type || record.category);

              return (
                <div className="medical-record-card" key={record.id}>
                  <div className="medical-record-icon">
                    <Icon size={25} />
                  </div>

                  <div className="medical-record-info flex-1">
                    <h4>{record.title}</h4>
                    <p>{record.doctor}</p>
                    <div className="medical-record-date">
                      <CalendarDays size={15} />
                      {record.date}
                    </div>
                    {record.description && (
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{record.description}</p>
                    )}
                  </div>

                  <div className="medical-record-status">
                    <span>{record.status || "Available"}</span>
                    <small>{record.category || record.type}</small>
                  </div>

                  <div className="medical-record-actions">
                    <button
                      type="button"
                      title="View Record Details"
                      onClick={() => setSelectedRecord(record)}
                    >
                      <Eye size={19} />
                    </button>
                    <button
                      type="button"
                      title="Print or Download Record"
                      onClick={() => {
                        setSelectedRecord(record);
                        setTimeout(() => window.print(), 300);
                      }}
                    >
                      <Download size={19} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="records-empty">
            <FileText size={42} />
            <h3>No Records Found</h3>
            <p>Try changing your search or filter.</p>
          </div>
        )}
      </section>

      {/* RECORD DETAILS MODAL */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl animate-in fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b">
              <div className="flex items-center gap-2">
                <FileText size={22} className="text-emerald-600" />
                <h3 className="text-lg font-bold text-slate-800">
                  {selectedRecord.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl text-xs">
                <div>
                  <span className="text-slate-500">Patient:</span>{" "}
                  <strong className="text-slate-800">{activePatient.name} ({activePatient.id})</strong>
                </div>
                <div>
                  <span className="text-slate-500">Date:</span>{" "}
                  <strong className="text-slate-800">{selectedRecord.date}</strong>
                </div>
                <div>
                  <span className="text-slate-500">Doctor/Facility:</span>{" "}
                  <strong className="text-slate-800">{selectedRecord.doctor}</strong>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Clinical Summary & Notes
                </h4>
                <p className="text-sm text-slate-700 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                  {selectedRecord.description}
                </p>
              </div>

              {/* If prescription details available */}
              {selectedRecord.prescriptionDetails && selectedRecord.prescriptionDetails.medicines && (
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Prescribed Medicines
                  </h4>
                  <div className="border rounded-xl overflow-hidden text-xs">
                    <table className="w-full text-left">
                      <thead className="bg-slate-100 text-slate-700">
                        <tr>
                          <th className="p-2.5">Medicine</th>
                          <th className="p-2.5">Dosage</th>
                          <th className="p-2.5">Frequency</th>
                          <th className="p-2.5">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {selectedRecord.prescriptionDetails.medicines.map((m, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="p-2.5 font-semibold text-slate-800">{m.name}</td>
                            <td className="p-2.5 text-slate-600">{m.dosage}</td>
                            <td className="p-2.5 text-slate-600">{m.frequency}</td>
                            <td className="p-2.5 text-slate-600">{m.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {selectedRecord.prescriptionDetails.instructions && (
                    <div className="mt-3 text-xs bg-amber-50 text-amber-900 p-2.5 rounded-lg border border-amber-200">
                      <strong>Doctor's Instructions:</strong> {selectedRecord.prescriptionDetails.instructions}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <span className="text-xs text-slate-400">
                Verified Digital Record • Aarogya Link
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
                >
                  <Printer size={14} />
                  Print
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRecord(null)}
                  className="px-4 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PRIVACY NOTE */}
      <div className="records-privacy-note">
        <FileText size={19} />
        <p>
          Your medical records are encrypted, private, and synced across your authorized doctors and healthcare workers.
        </p>
      </div>
    </div>
  );
}

export default PatientHealthRecords;

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

const initialRecords = [
  {
    id: "REC-1001",
    patient: "Rahul Sharma",
    patientId: "AL-1024",
    type: "Lab Report",
    title: "Complete Blood Count",
    date: "01 Nov 2026",
    doctor: "Doctor",
    description: "Blood test report uploaded for review.",
    fileName: "rahul_cbc_report.pdf",
    status: "Reviewed",
  },
  {
    id: "REC-1002",
    patient: "Priya Verma",
    patientId: "AL-1025",
    type: "Prescription",
    title: "General Consultation Prescription",
    date: "01 Nov 2026",
    doctor: "Doctor",
    description: "Digital prescription record.",
    fileName: "priya_prescription.pdf",
    status: "Available",
  },
  {
    id: "REC-1003",
    patient: "Amit Kumar",
    patientId: "AL-1026",
    type: "Imaging",
    title: "Chest X-Ray",
    date: "31 Oct 2026",
    doctor: "Doctor",
    description: "Chest imaging report for clinical review.",
    fileName: "amit_xray.png",
    status: "Reviewed",
  },
  {
    id: "REC-1004",
    patient: "Neha Singh",
    patientId: "AL-1027",
    type: "Lab Report",
    title: "Blood Sugar Report",
    date: "30 Oct 2026",
    doctor: "Doctor",
    description: "Blood glucose test report.",
    fileName: "neha_sugar_report.pdf",
    status: "Available",
  },
  {
    id: "REC-1005",
    patient: "Vikash Gupta",
    patientId: "AL-1028",
    type: "Other",
    title: "Previous Medical History",
    date: "29 Oct 2026",
    doctor: "Doctor",
    description: "Previously recorded medical history document.",
    fileName: "vikash_history.pdf",
    status: "Reviewed",
  },
];

function DoctorMedicalRecords() {
  const [records, setRecords] = useState(initialRecords);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [form, setForm] = useState({
    patient: "",
    patientId: "",
    type: "Lab Report",
    title: "",
    description: "",
  });

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.patient.toLowerCase().includes(search.toLowerCase()) ||
      record.id.toLowerCase().includes(search.toLowerCase()) ||
      record.patientId.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      typeFilter === "All" || record.type === typeFilter;

    return matchesSearch && matchesType;
  });

  const labReports = records.filter(
    (record) => record.type === "Lab Report"
  ).length;

  const prescriptions = records.filter(
    (record) => record.type === "Prescription"
  ).length;

  const imaging = records.filter(
    (record) => record.type === "Imaging"
  ).length;

  const handleUpload = (e) => {
    e.preventDefault();

    if (!form.patient.trim() || !form.patientId.trim() || !form.title.trim()) {
      alert("Please complete patient name, ID and record title.");
      return;
    }

    if (!selectedFile) {
      alert("Please select a document.");
      return;
    }

    const newRecord = {
      id: `REC-${Date.now().toString().slice(-6)}`,
      patient: form.patient,
      patientId: form.patientId,
      type: form.type,
      title: form.title,
      date: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      doctor: "Doctor",
      description: form.description,
      fileName: selectedFile.name,
      status: "Available",
      file: selectedFile,
    };

    setRecords((previous) => [newRecord, ...previous]);

    setForm({
      patient: "",
      patientId: "",
      type: "Lab Report",
      title: "",
      description: "",
    });

    setSelectedFile(null);
    setShowUpload(false);
  };

  const downloadRecord = (record) => {
    if (record.file) {
      const url = URL.createObjectURL(record.file);
      const link = document.createElement("a");

      link.href = url;
      link.download = record.fileName;
      link.click();

      URL.revokeObjectURL(url);
      return;
    }

    alert(
      "This is sample data. The original document is not uploaded yet."
    );
  };

  return (
    <div className="doctor-medical-records">

      {/* Heading */}
      <div className="medical-records-heading">
        <div>
          <span className="medical-records-label">
            PATIENT HEALTH INFORMATION
          </span>

          <h1>Medical Records</h1>

          <p>
            Access and manage patient medical documents and health history.
          </p>
        </div>

        <button
          className="medical-upload-button"
          onClick={() => setShowUpload(true)}
        >
          <Upload size={18} />
          Upload Record
        </button>
      </div>

      {/* Statistics */}
      <div className="medical-records-stats">

        <div className="medical-stat-card">
          <div className="medical-stat-icon green">
            <FileText size={23} />
          </div>

          <div>
            <span>Total Records</span>
            <h2>{records.length}</h2>
            <small>All medical documents</small>
          </div>
        </div>

        <div className="medical-stat-card">
          <div className="medical-stat-icon blue">
            <ClipboardList size={23} />
          </div>

          <div>
            <span>Lab Reports</span>
            <h2>{labReports}</h2>
            <small>Laboratory documents</small>
          </div>
        </div>

        <div className="medical-stat-card">
          <div className="medical-stat-icon purple">
            <FileText size={23} />
          </div>

          <div>
            <span>Prescriptions</span>
            <h2>{prescriptions}</h2>
            <small>Medication records</small>
          </div>
        </div>

        <div className="medical-stat-card">
          <div className="medical-stat-icon orange">
            <FileImage size={23} />
          </div>

          <div>
            <span>Imaging Reports</span>
            <h2>{imaging}</h2>
            <small>Scan and imaging files</small>
          </div>
        </div>

      </div>

      {/* Banner */}
      <div className="medical-records-banner">
        <div className="medical-banner-icon">
          <FileText size={24} />
        </div>

        <div>
          <h3>Centralized Medical Records</h3>
          <p>
            Keep patient reports, prescriptions and medical history
            organized in one workspace.
          </p>
        </div>
      </div>

      {/* Records Directory */}
      <div className="medical-records-container">

        <div className="medical-records-container-header">
          <div>
            <h2>Medical Document Directory</h2>
            <p>Browse patient medical records.</p>
          </div>

          <span className="medical-records-count">
            {filteredRecords.length} Records
          </span>
        </div>

        {/* Search and Filter */}
        <div className="medical-records-toolbar">

          <div className="medical-records-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search patient or record ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="medical-records-filter">
            <Filter size={17} />

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Record Types</option>
              <option value="Lab Report">Lab Reports</option>
              <option value="Prescription">Prescriptions</option>
              <option value="Imaging">Imaging</option>
              <option value="Other">Other Records</option>
            </select>
          </div>

        </div>

        {/* Table */}
        <div className="medical-records-table-wrapper">

          <table className="medical-records-table">

            <thead>
              <tr>
                <th>RECORD</th>
                <th>PATIENT</th>
                <th>RECORD ID</th>
                <th>TYPE</th>
                <th>DATE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>

              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={record.id}>

                    <td>
                      <div className="medical-record-title">
                        <div className="medical-file-icon">
                          <FileText size={19} />
                        </div>

                        <div>
                          <strong>{record.title}</strong>
                          <span>{record.fileName}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="medical-patient-cell">
                        <strong>{record.patient}</strong>
                        <span>{record.patientId}</span>
                      </div>
                    </td>

                    <td>
                      <span className="medical-record-id">
                        {record.id}
                      </span>
                    </td>

                    <td>
                      <span className="medical-record-type">
                        {record.type}
                      </span>
                    </td>

                    <td>
                      <span className="medical-record-date">
                        <CalendarDays size={14} />
                        {record.date}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`medical-record-status ${record.status.toLowerCase()}`}
                      >
                        {record.status}
                      </span>
                    </td>

                    <td>
                      <div className="medical-record-actions">

                        <button
                          title="View details"
                          onClick={() => setSelectedRecord(record)}
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          title="Download"
                          onClick={() => downloadRecord(record)}
                        >
                          <Download size={16} />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="medical-records-empty">
                    No medical records found.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

        <div className="medical-records-footer">
          Showing {filteredRecords.length} of {records.length} medical records
        </div>

      </div>

      {/* View Record Modal */}
      {selectedRecord && (
        <div
          className="medical-modal-overlay"
          onClick={() => setSelectedRecord(null)}
        >
          <div
            className="medical-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="medical-modal-header">
              <div>
                <h2>Medical Record Details</h2>
                <p>{selectedRecord.id}</p>
              </div>

              <button onClick={() => setSelectedRecord(null)}>
                <X size={21} />
              </button>
            </div>

            <div className="medical-modal-info">

              <div>
                <span>Patient Name</span>
                <strong>{selectedRecord.patient}</strong>
              </div>

              <div>
                <span>Patient ID</span>
                <strong>{selectedRecord.patientId}</strong>
              </div>

              <div>
                <span>Record Title</span>
                <strong>{selectedRecord.title}</strong>
              </div>

              <div>
                <span>Record Type</span>
                <strong>{selectedRecord.type}</strong>
              </div>

              <div>
                <span>Upload Date</span>
                <strong>{selectedRecord.date}</strong>
              </div>

              <div>
                <span>Uploaded By</span>
                <strong>{selectedRecord.doctor}</strong>
              </div>

            </div>

            <div className="medical-modal-description">
              <span>Description</span>
              <p>{selectedRecord.description}</p>
            </div>

            <div className="medical-modal-file">
              <File size={22} />

              <div>
                <strong>{selectedRecord.fileName}</strong>
                <span>Medical document</span>
              </div>
            </div>

            <div className="medical-modal-actions">

              <button
                className="medical-download-button"
                onClick={() => downloadRecord(selectedRecord)}
              >
                <Download size={17} />
                Download Document
              </button>

              <button
                className="medical-close-button"
                onClick={() => setSelectedRecord(null)}
              >
                Close
              </button>

            </div>

          </div>
        </div>
      )}

      {/* Upload Record Modal */}
      {showUpload && (
        <div
          className="medical-modal-overlay"
          onClick={() => setShowUpload(false)}
        >
          <div
            className="medical-modal medical-upload-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="medical-modal-header">
              <div>
                <h2>Upload Medical Record</h2>
                <p>Add a document to a patient's medical record.</p>
              </div>

              <button onClick={() => setShowUpload(false)}>
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleUpload} className="medical-upload-form">

              <label>Patient Name</label>
              <input
                required
                value={form.patient}
                onChange={(e) =>
                  setForm({ ...form, patient: e.target.value })
                }
                placeholder="Enter patient name"
              />

              <label>Patient ID</label>
              <input
                required
                value={form.patientId}
                onChange={(e) =>
                  setForm({ ...form, patientId: e.target.value })
                }
                placeholder="Enter patient ID"
              />

              <label>Record Title</label>
              <input
                required
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                placeholder="Enter document title"
              />

              <label>Record Type</label>
              <select
                value={form.type}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value })
                }
              >
                <option value="Lab Report">Lab Report</option>
                <option value="Prescription">Prescription</option>
                <option value="Imaging">Imaging</option>
                <option value="Other">Other</option>
              </select>

              <label>Description</label>
              <textarea
                rows="3"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Enter document description"
              />

              <label>Select Document</label>

              <div className="medical-file-upload">
                <Upload size={22} />

                <span>
                  {selectedFile
                    ? selectedFile.name
                    : "Choose a PDF or image document"}
                </span>

                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) =>
                    setSelectedFile(e.target.files?.[0] || null)
                  }
                  required
                />
              </div>

              <button type="submit" className="medical-submit-button">
                <Plus size={17} />
                Add Medical Record
              </button>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

export default DoctorMedicalRecords;
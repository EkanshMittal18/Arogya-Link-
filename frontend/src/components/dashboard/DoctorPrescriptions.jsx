import React, { useState } from "react";
import {
  FileText,
  Pill,
  Send,
  Clock,
  Search,
  Eye,
  Plus,
  X,
  Printer,
  CalendarDays,
  User,
  Trash2,
} from "lucide-react";

const initialPrescriptions = [
  {
    id: "PRE-1001",
    patient: "Rahul Sharma",
    patientId: "AL-1024",
    date: "01 Nov 2026",
    diagnosis: "Seasonal Viral Infection",
    status: "Issued",
    medicines: [
      {
        name: "Paracetamol",
        dosage: "500 mg",
        frequency: "As directed",
        duration: "3 days",
      },
      {
        name: "Vitamin C",
        dosage: "500 mg",
        frequency: "Once daily",
        duration: "5 days",
      },
    ],
    instructions: "Rest and maintain adequate hydration.",
  },
  {
    id: "PRE-1002",
    patient: "Priya Verma",
    patientId: "AL-1025",
    date: "01 Nov 2026",
    diagnosis: "General Follow-up",
    status: "Draft",
    medicines: [
      {
        name: "Medicine Example",
        dosage: "As prescribed",
        frequency: "As directed",
        duration: "5 days",
      },
    ],
    instructions: "Follow-up as advised.",
  },
  {
    id: "PRE-1003",
    patient: "Amit Kumar",
    patientId: "AL-1026",
    date: "31 Oct 2026",
    diagnosis: "Blood Pressure Monitoring",
    status: "Issued",
    medicines: [
      {
        name: "Medicine Example",
        dosage: "As prescribed",
        frequency: "As directed",
        duration: "7 days",
      },
    ],
    instructions: "Monitor blood pressure regularly.",
  },
];

function DoctorPrescriptions() {
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  const [form, setForm] = useState({
    patient: "",
    patientId: "",
    diagnosis: "",
    instructions: "",
    medicines: [
      {
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
      },
    ],
  });

  const issued = prescriptions.filter(
    (item) => item.status === "Issued"
  ).length;

  const drafts = prescriptions.filter(
    (item) => item.status === "Draft"
  ).length;

  const filtered = prescriptions.filter((item) => {
    const matchesSearch =
      item.patient.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.patientId.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || item.status === filter;

    return matchesSearch && matchesFilter;
  });

  const updateMedicine = (index, field, value) => {
    setForm((previous) => ({
      ...previous,
      medicines: previous.medicines.map((medicine, i) =>
        i === index ? { ...medicine, [field]: value } : medicine
      ),
    }));
  };

  const addMedicine = () => {
    setForm((previous) => ({
      ...previous,
      medicines: [
        ...previous.medicines,
        { name: "", dosage: "", frequency: "", duration: "" },
      ],
    }));
  };

  const removeMedicine = (index) => {
    setForm((previous) => ({
      ...previous,
      medicines: previous.medicines.filter((_, i) => i !== index),
    }));
  };

  const createPrescription = (status) => {
    if (!form.patient.trim() || !form.patientId.trim() || !form.diagnosis.trim()) {
      alert("Please enter patient name, patient ID and diagnosis.");
      return;
    }

    if (
      form.medicines.some(
        (medicine) =>
          !medicine.name.trim() ||
          !medicine.dosage.trim() ||
          !medicine.frequency.trim() ||
          !medicine.duration.trim()
      )
    ) {
      alert("Please complete all medicine details.");
      return;
    }

    const newPrescription = {
      ...form,
      id: `PRE-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status,
    };

    setPrescriptions((previous) => [
      newPrescription,
      ...previous,
    ]);

    setForm({
      patient: "",
      patientId: "",
      diagnosis: "",
      instructions: "",
      medicines: [
        { name: "", dosage: "", frequency: "", duration: "" },
      ],
    });

    setShowCreate(false);
  };

  const printPrescription = (item) => {
    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      alert("Please allow pop-ups to print the prescription.");
      return;
    }

    const medicineRows = item.medicines
      .map(
        (medicine) => `
          <tr>
            <td>${medicine.name}</td>
            <td>${medicine.dosage}</td>
            <td>${medicine.frequency}</td>
            <td>${medicine.duration}</td>
          </tr>
        `
      )
      .join("");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${item.id}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 35px; color: #183b32; }
          h1 { color: #168b68; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          th { background: #eaf6f0; }
          .footer { margin-top: 40px; }
        </style>
      </head>
      <body>
        <h1>AAROGYA LINK</h1>
        <h2>Medical Prescription</h2>
        <p><b>Prescription ID:</b> ${item.id}</p>
        <p><b>Patient:</b> ${item.patient}</p>
        <p><b>Patient ID:</b> ${item.patientId}</p>
        <p><b>Date:</b> ${item.date}</p>
        <p><b>Diagnosis:</b> ${item.diagnosis}</p>
        <table>
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Dosage</th>
              <th>Frequency</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>${medicineRows}</tbody>
        </table>
        <p><b>Instructions:</b> ${item.instructions || "None"}</p>
        <div class="footer">
          <p>Doctor's Signature: __________________</p>
          <p>This is a demonstration document, not a validated medical prescription.</p>
        </div>
        <script>window.onload = () => window.print();</script>
      </body>
      </html>
    `);

    printWindow.document.close();
  };

  return (
    <div className="doctor-prescriptions">

      {/* Heading */}
      <div className="prescriptions-heading">
        <div>
          <span className="prescriptions-label">
            DIGITAL HEALTH RECORDS
          </span>
          <h1>Prescriptions</h1>
          <p>Create and manage patient medication records.</p>
        </div>

        <button
          className="prescriptions-create-btn"
          onClick={() => setShowCreate(true)}
        >
          <Plus size={18} />
          Create Prescription
        </button>
      </div>

      {/* Statistics */}
      <div className="prescriptions-stats">

        <div className="prescriptions-stat-card">
          <div className="prescriptions-stat-icon green">
            <FileText size={23} />
          </div>
          <div>
            <span>Total Prescriptions</span>
            <h2>{prescriptions.length}</h2>
            <small>All prescription records</small>
          </div>
        </div>

        <div className="prescriptions-stat-card">
          <div className="prescriptions-stat-icon blue">
            <Send size={23} />
          </div>
          <div>
            <span>Issued Prescriptions</span>
            <h2>{issued}</h2>
            <small>Successfully issued</small>
          </div>
        </div>

        <div className="prescriptions-stat-card">
          <div className="prescriptions-stat-icon orange">
            <Clock size={23} />
          </div>
          <div>
            <span>Draft Prescriptions</span>
            <h2>{drafts}</h2>
            <small>Saved as drafts</small>
          </div>
        </div>

        <div className="prescriptions-stat-card">
          <div className="prescriptions-stat-icon purple">
            <Pill size={23} />
          </div>
          <div>
            <span>Medicine Entries</span>
            <h2>
              {prescriptions.reduce(
                (total, item) => total + item.medicines.length,
                0
              )}
            </h2>
            <small>Total medicine entries</small>
          </div>
        </div>

      </div>

      {/* Banner */}
      <div className="prescriptions-banner">
        <div className="prescriptions-banner-icon">
          <FileText size={24} />
        </div>

        <div>
          <h3>Digital Prescription Management</h3>
          <p>
            Prepare, review and print patient prescription records
            from one workspace.
          </p>
        </div>
      </div>

      {/* Directory */}
      <div className="prescriptions-container">

        <div className="prescriptions-container-header">
          <div>
            <h2>Prescription Records</h2>
            <p>All your prescription records</p>
          </div>

          <span className="prescriptions-count">
            {filtered.length} Records
          </span>
        </div>

        <div className="prescriptions-toolbar">

          <div className="prescriptions-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search patient or prescription ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="prescriptions-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Issued">Issued</option>
            <option value="Draft">Draft</option>
          </select>

        </div>

        <div className="prescriptions-table-wrapper">

          <table className="prescriptions-table">
            <thead>
              <tr>
                <th>PATIENT</th>
                <th>PRESCRIPTION ID</th>
                <th>DATE</th>
                <th>DIAGNOSIS</th>
                <th>MEDICINES</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="prescriptions-patient">
                        <div className="prescriptions-avatar">
                          {item.patient
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <div>
                          <strong>{item.patient}</strong>
                          <span>{item.patientId}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="prescriptions-id">
                        {item.id}
                      </span>
                    </td>

                    <td>{item.date}</td>
                    <td>{item.diagnosis}</td>
                    <td>{item.medicines.length} Medicines</td>

                    <td>
                      <span
                        className={`prescriptions-status ${item.status.toLowerCase()}`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="prescriptions-view-btn"
                        onClick={() => setSelected(item)}
                      >
                        <Eye size={15} />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="prescriptions-empty">
                    No prescriptions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

        </div>

        <div className="prescriptions-footer">
          Showing {filtered.length} of {prescriptions.length} prescriptions
        </div>

      </div>

      {/* View Prescription Modal */}
      {selected && (
        <div
          className="prescriptions-modal-overlay"
          onClick={() => setSelected(null)}
        >
          <div
            className="prescriptions-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="prescriptions-modal-header">
              <div>
                <h2>Prescription Details</h2>
                <p>{selected.id}</p>
              </div>

              <button onClick={() => setSelected(null)}>
                <X size={21} />
              </button>
            </div>

            <div className="prescriptions-patient-info">
              <User size={20} />
              <div>
                <strong>{selected.patient}</strong>
                <span>{selected.patientId} · {selected.date}</span>
              </div>
            </div>

            <div className="prescriptions-diagnosis">
              <span>Diagnosis</span>
              <strong>{selected.diagnosis}</strong>
            </div>

            <h3 className="prescriptions-medicine-heading">
              Medicine Details
            </h3>

            <div className="prescriptions-medicine-list">
              {selected.medicines.map((medicine, index) => (
                <div className="prescriptions-medicine-item" key={index}>
                  <div className="prescriptions-medicine-number">
                    {index + 1}
                  </div>

                  <div>
                    <strong>{medicine.name}</strong>
                    <span>
                      {medicine.dosage} · {medicine.frequency} · {medicine.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="prescriptions-instructions">
              <span>Doctor's Instructions</span>
              <p>{selected.instructions || "No additional instructions."}</p>
            </div>

            <div className="prescriptions-modal-actions">
              <button
                className="prescriptions-print-btn"
                onClick={() => printPrescription(selected)}
              >
                <Printer size={17} />
                Print Prescription
              </button>

              <button
                className="prescriptions-close-btn"
                onClick={() => setSelected(null)}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Create Prescription Modal */}
      {showCreate && (
        <div
          className="prescriptions-modal-overlay"
          onClick={() => setShowCreate(false)}
        >
          <div
            className="prescriptions-modal create-prescription-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="prescriptions-modal-header">
              <div>
                <h2>Create Prescription</h2>
                <p>Enter patient and medicine information.</p>
              </div>

              <button onClick={() => setShowCreate(false)}>
                <X size={21} />
              </button>
            </div>

            <div className="prescriptions-form">

              <label>Patient Name</label>
              <input
                value={form.patient}
                onChange={(e) =>
                  setForm({ ...form, patient: e.target.value })
                }
                placeholder="Enter patient name"
              />

              <label>Patient ID</label>
              <input
                value={form.patientId}
                onChange={(e) =>
                  setForm({ ...form, patientId: e.target.value })
                }
                placeholder="Enter patient ID"
              />

              <label>Diagnosis</label>
              <input
                value={form.diagnosis}
                onChange={(e) =>
                  setForm({ ...form, diagnosis: e.target.value })
                }
                placeholder="Enter diagnosis"
              />

              <div className="prescriptions-form-divider">
                Medicine Information
              </div>

              {form.medicines.map((medicine, index) => (
                <div className="prescriptions-medicine-form" key={index}>

                  <div className="prescriptions-medicine-form-heading">
                    <strong>Medicine {index + 1}</strong>

                    {form.medicines.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMedicine(index)}
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>
                    )}
                  </div>

                  <label>Medicine Name</label>
                  <input
                    value={medicine.name}
                    onChange={(e) =>
                      updateMedicine(index, "name", e.target.value)
                    }
                    placeholder="Medicine name"
                  />

                  <div className="prescriptions-form-grid">

                    <div>
                      <label>Dosage</label>
                      <input
                        value={medicine.dosage}
                        onChange={(e) =>
                          updateMedicine(index, "dosage", e.target.value)
                        }
                        placeholder="Dosage"
                      />
                    </div>

                    <div>
                      <label>Frequency</label>
                      <input
                        value={medicine.frequency}
                        onChange={(e) =>
                          updateMedicine(index, "frequency", e.target.value)
                        }
                        placeholder="Frequency"
                      />
                    </div>

                    <div>
                      <label>Duration</label>
                      <input
                        value={medicine.duration}
                        onChange={(e) =>
                          updateMedicine(index, "duration", e.target.value)
                        }
                        placeholder="Duration"
                      />
                    </div>

                  </div>

                </div>
              ))}

              <button
                type="button"
                className="prescriptions-add-medicine"
                onClick={addMedicine}
              >
                <Plus size={16} />
                Add Another Medicine
              </button>

              <label>Doctor's Instructions</label>
              <textarea
                rows="3"
                value={form.instructions}
                onChange={(e) =>
                  setForm({ ...form, instructions: e.target.value })
                }
                placeholder="Enter additional instructions..."
              />

              <div className="prescriptions-create-actions">
                <button
                  onClick={() => createPrescription("Draft")}
                  className="prescriptions-save-draft"
                >
                  Save as Draft
                </button>

                <button
                  onClick={() => createPrescription("Issued")}
                  className="prescriptions-issue-btn"
                >
                  <Send size={16} />
                  Issue Prescription
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default DoctorPrescriptions;
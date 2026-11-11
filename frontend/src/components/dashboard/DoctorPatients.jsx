import React, { useState } from "react";
import {
  Search,
  Users,
  UserCheck,
  UserPlus,
  Activity,
  Eye,
  Phone,
  CalendarDays,
  Filter,
  ChevronDown,
  Plus,
  X,
  HeartPulse,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { useAarogya } from "../../context/AarogyaContext";

function DoctorPatients() {
  const { patients, registerPatient } = useAarogya();
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newPatientForm, setNewPatientForm] = useState({
    name: "",
    age: "",
    gender: "Male",
    phone: "",
    village: "",
    condition: "General Health",
    bloodGroup: "B+",
    medicalHistory: "",
  });

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      (patient.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (patient.id || "").toLowerCase().includes(search.toLowerCase()) ||
      (patient.village || "").toLowerCase().includes(search.toLowerCase()) ||
      (patient.condition || "").toLowerCase().includes(search.toLowerCase());

    const matchesGender = genderFilter === "All" || patient.gender === genderFilter;

    return matchesSearch && matchesGender;
  });

  const activeCount = patients.filter((patient) => patient.status === "Active").length;
  const followUpCount = patients.filter((patient) => patient.status === "Follow-up").length;

  const handleAddPatientSubmit = (e) => {
    e.preventDefault();
    if (!newPatientForm.name || !newPatientForm.phone) return;

    registerPatient({
      name: newPatientForm.name,
      age: newPatientForm.age || "30",
      gender: newPatientForm.gender,
      phone: newPatientForm.phone,
      village: newPatientForm.village || "Rural Area",
      condition: newPatientForm.condition,
      bloodGroup: newPatientForm.bloodGroup,
      medicalHistory: newPatientForm.medicalHistory,
    });

    setShowAddModal(false);
    setNewPatientForm({
      name: "",
      age: "",
      gender: "Male",
      phone: "",
      village: "",
      condition: "General Health",
      bloodGroup: "B+",
      medicalHistory: "",
    });
  };

  return (
    <div className="doctor-patients">
      {/* Page Heading */}
      <div className="patients-heading">
        <div>
          <span className="patients-label">PATIENT DIRECTORY • LIVE CONNECTED</span>
          <h1>My Patients</h1>
          <p>
            Patients registered by Community Health Workers (ASHA) and direct clinic registrations.
          </p>
        </div>

        <button
          className="patients-add-button"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={18} />
          Add New Patient
        </button>
      </div>

      {/* Statistics */}
      <div className="patients-stats">
        <div className="patients-stat-card">
          <div className="patients-stat-icon green">
            <Users size={23} />
          </div>
          <div>
            <span>Total Patients</span>
            <h2>{patients.length}</h2>
            <small>Live synchronized</small>
          </div>
        </div>

        <div className="patients-stat-card">
          <div className="patients-stat-icon blue">
            <UserCheck size={23} />
          </div>
          <div>
            <span>Active Patients</span>
            <h2>{activeCount}</h2>
            <small>Currently active</small>
          </div>
        </div>

        <div className="patients-stat-card">
          <div className="patients-stat-icon purple">
            <UserPlus size={23} />
          </div>
          <div>
            <span>Rural Patients</span>
            <h2>{patients.filter((p) => p.village).length}</h2>
            <small>From local villages</small>
          </div>
        </div>

        <div className="patients-stat-card">
          <div className="patients-stat-icon orange">
            <Activity size={23} />
          </div>
          <div>
            <span>Follow-ups Due</span>
            <h2>{followUpCount}</h2>
            <small>Require attention</small>
          </div>
        </div>
      </div>

      {/* Patient Table */}
      <div className="patients-table-container">
        <div className="patients-table-header">
          <div>
            <h2>Patient Directory</h2>
            <p>Comprehensive patient records with vitals screened by rural health workers.</p>
          </div>

          <span className="patients-total-badge">{filteredPatients.length} Patients</span>
        </div>

        {/* Search and Filters */}
        <div className="patients-toolbar">
          <div className="patients-search">
            <Search size={19} />
            <input
              type="text"
              placeholder="Search by name, ID, village, or condition..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="patients-filter">
            <Filter size={17} />
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
            >
              <option value="All">All Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <ChevronDown size={15} />
          </div>
        </div>

        {/* Table */}
        <div className="patients-table-wrapper">
          <table className="patients-table">
            <thead>
              <tr>
                <th>PATIENT</th>
                <th>PATIENT ID</th>
                <th>VILLAGE</th>
                <th>AGE / GENDER</th>
                <th>CONDITION</th>
                <th>LATEST BP / VITALS</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <tr key={patient.id}>
                    <td>
                      <div className="patients-name-cell">
                        <div className="patients-avatar font-bold text-xs">
                          {patient.initials || "PT"}
                        </div>
                        <strong>{patient.name}</strong>
                      </div>
                    </td>

                    <td>
                      <span className="patients-id">{patient.id}</span>
                    </td>

                    <td>
                      <span className="text-xs text-slate-600 flex items-center gap-1">
                        <MapPin size={12} className="text-emerald-600" />
                        {patient.village || "Rampur"}
                      </span>
                    </td>

                    <td>
                      {patient.age} Yrs / {patient.gender}
                    </td>

                    <td>{patient.condition || "General"}</td>

                    <td>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
                        {patient.vitals?.bloodPressure || "120/80"}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`patients-status ${(patient.status || "active")
                          .toLowerCase()
                          .replace("-", "")}`}
                      >
                        {patient.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="patients-view-button"
                        onClick={() => setSelectedPatient(patient)}
                      >
                        <Eye size={16} />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="patients-empty">
                    No patients found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="patients-table-footer">
          Showing {filteredPatients.length} of {patients.length} patients
        </div>
      </div>

      {/* Patient Details Modal */}
      {selectedPatient && (
        <div
          className="patients-modal-overlay"
          onClick={() => setSelectedPatient(null)}
        >
          <div className="patients-modal" onClick={(e) => e.stopPropagation()}>
            <div className="patients-modal-header">
              <div>
                <h2>Clinical Patient Dossier</h2>
                <p>Information synced from Health Worker Field Screenings</p>
              </div>

              <button onClick={() => setSelectedPatient(null)}>
                <X size={21} />
              </button>
            </div>

            <div className="patients-modal-profile">
              <div className="patients-modal-avatar font-bold">
                {selectedPatient.initials || "PT"}
              </div>

              <div>
                <h3>{selectedPatient.name}</h3>
                <span>{selectedPatient.id} • Village: {selectedPatient.village}</span>
              </div>
            </div>

            {/* Vitals Ribbon */}
            {selectedPatient.vitals && (
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 mb-4">
                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide flex items-center gap-1 mb-2">
                  <HeartPulse size={14} /> Screened Vitals (by ASHA Health Worker)
                </span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500">Blood Pressure:</span>
                    <strong className="block text-emerald-950 font-bold">{selectedPatient.vitals.bloodPressure || "120/80"}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Pulse:</span>
                    <strong className="block text-emerald-950 font-bold">{selectedPatient.vitals.heartRate || "72 bpm"}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">SpO2:</span>
                    <strong className="block text-emerald-950 font-bold">{selectedPatient.vitals.oxygen || "98%"}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Temperature:</span>
                    <strong className="block text-slate-800">{selectedPatient.vitals.temperature || "98.6 °F"}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Weight:</span>
                    <strong className="block text-slate-800">{selectedPatient.vitals.weight || "65 kg"}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Screening Date:</span>
                    <strong className="block text-slate-800">{selectedPatient.vitals.lastScreeningDate || "Recent"}</strong>
                  </div>
                </div>
              </div>
            )}

            <div className="patients-modal-details">
              <div>
                <span>Age / Gender</span>
                <strong>{selectedPatient.age} Years / {selectedPatient.gender}</strong>
              </div>

              <div>
                <span>Blood Group</span>
                <strong>{selectedPatient.bloodGroup || "B+"}</strong>
              </div>

              <div>
                <span>Phone Number</span>
                <strong>
                  <Phone size={14} />
                  {selectedPatient.phone}
                </strong>
              </div>

              <div>
                <span>Village / Address</span>
                <strong>{selectedPatient.address || selectedPatient.village}</strong>
              </div>

              <div>
                <span>Medical History</span>
                <strong>{selectedPatient.medicalHistory || "None recorded"}</strong>
              </div>

              <div>
                <span>Existing Conditions</span>
                <strong>{(selectedPatient.existingConditions || []).join(", ") || selectedPatient.condition || "General"}</strong>
              </div>
            </div>

            <button
              className="patients-modal-close"
              onClick={() => setSelectedPatient(null)}
            >
              Close Details
            </button>
          </div>
        </div>
      )}

      {/* Add New Patient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b">
              <div className="flex items-center gap-2">
                <UserPlus size={22} className="text-emerald-600" />
                <h3 className="text-lg font-bold text-slate-800">Add New Patient</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddPatientSubmit} className="space-y-3 mt-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={newPatientForm.name}
                  onChange={(e) => setNewPatientForm({ ...newPatientForm, name: e.target.value })}
                  className="w-full border rounded-xl p-2.5 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Age</label>
                  <input
                    type="number"
                    required
                    placeholder="35"
                    value={newPatientForm.age}
                    onChange={(e) => setNewPatientForm({ ...newPatientForm, age: e.target.value })}
                    className="w-full border rounded-xl p-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Gender</label>
                  <select
                    value={newPatientForm.gender}
                    onChange={(e) => setNewPatientForm({ ...newPatientForm, gender: e.target.value })}
                    className="w-full border rounded-xl p-2.5 text-sm"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile"
                    value={newPatientForm.phone}
                    onChange={(e) => setNewPatientForm({ ...newPatientForm, phone: e.target.value })}
                    className="w-full border rounded-xl p-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Village</label>
                  <input
                    type="text"
                    placeholder="e.g. Rampur"
                    value={newPatientForm.village}
                    onChange={(e) => setNewPatientForm({ ...newPatientForm, village: e.target.value })}
                    className="w-full border rounded-xl p-2.5 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Primary Condition / Symptoms</label>
                <input
                  type="text"
                  placeholder="e.g. Hypertension, Fever"
                  value={newPatientForm.condition}
                  onChange={(e) => setNewPatientForm({ ...newPatientForm, condition: e.target.value })}
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
                  className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 shadow-md"
                >
                  Register Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorPatients;

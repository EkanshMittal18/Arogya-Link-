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
} from "lucide-react";

const initialPatients = [
  {
    id: "AL-1024",
    name: "Rahul Sharma",
    age: 32,
    gender: "Male",
    phone: "9876543210",
    condition: "Hypertension",
    lastVisit: "01 Nov 2026",
    status: "Active",
    initials: "RS",
  },
  {
    id: "AL-1025",
    name: "Priya Verma",
    age: 26,
    gender: "Female",
    phone: "9876543211",
    condition: "Fever & Cold",
    lastVisit: "31 Oct 2026",
    status: "Active",
    initials: "PV",
  },
  {
    id: "AL-1026",
    name: "Amit Kumar",
    age: 45,
    gender: "Male",
    phone: "9876543212",
    condition: "Diabetes",
    lastVisit: "30 Oct 2026",
    status: "Follow-up",
    initials: "AK",
  },
  {
    id: "AL-1027",
    name: "Neha Singh",
    age: 29,
    gender: "Female",
    phone: "9876543213",
    condition: "Migraine",
    lastVisit: "29 Oct 2026",
    status: "Active",
    initials: "NS",
  },
  {
    id: "AL-1028",
    name: "Vikash Gupta",
    age: 51,
    gender: "Male",
    phone: "9876543214",
    condition: "Blood Pressure",
    lastVisit: "28 Oct 2026",
    status: "Follow-up",
    initials: "VG",
  },
  {
    id: "AL-1029",
    name: "Anjali Mehta",
    age: 34,
    gender: "Female",
    phone: "9876543215",
    condition: "General Checkup",
    lastVisit: "27 Oct 2026",
    status: "Active",
    initials: "AM",
  },
];

function DoctorPatients() {
  const [patients, setPatients] = useState(initialPatients);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.id.toLowerCase().includes(search.toLowerCase());

    const matchesGender =
      genderFilter === "All" || patient.gender === genderFilter;

    return matchesSearch && matchesGender;
  });

  const activeCount = patients.filter(
    (patient) => patient.status === "Active"
  ).length;

  const followUpCount = patients.filter(
    (patient) => patient.status === "Follow-up"
  ).length;

  return (
    <div className="doctor-patients">

      {/* Page Heading */}
      <div className="patients-heading">
        <div>
          <span className="patients-label">PATIENT MANAGEMENT</span>
          <h1>My Patients</h1>
          <p>Manage and monitor all your registered patients.</p>
        </div>

        <button className="patients-add-button">
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
            <small>Registered patients</small>
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
            <span>New Patients</span>
            <h2>12</h2>
            <small>This month</small>
          </div>
        </div>

        <div className="patients-stat-card">
          <div className="patients-stat-icon orange">
            <Activity size={23} />
          </div>
          <div>
            <span>Follow-ups</span>
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
            <p>View and manage your patient records.</p>
          </div>

          <span className="patients-total-badge">
            {filteredPatients.length} Patients
          </span>
        </div>

        {/* Search and Filters */}
        <div className="patients-toolbar">

          <div className="patients-search">
            <Search size={19} />
            <input
              type="text"
              placeholder="Search by patient name or ID..."
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
                <th>AGE / GENDER</th>
                <th>CONDITION</th>
                <th>LAST VISIT</th>
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
                        <div className="patients-avatar">
                          {patient.initials}
                        </div>

                        <strong>{patient.name}</strong>
                      </div>
                    </td>

                    <td>
                      <span className="patients-id">
                        {patient.id}
                      </span>
                    </td>

                    <td>
                      {patient.age} Years / {patient.gender}
                    </td>

                    <td>{patient.condition}</td>

                    <td>
                      <span className="patients-date">
                        <CalendarDays size={14} />
                        {patient.lastVisit}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`patients-status ${patient.status
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
                  <td colSpan="7" className="patients-empty">
                    No patients found.
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
          <div
            className="patients-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="patients-modal-header">
              <div>
                <h2>Patient Details</h2>
                <p>Patient information and medical overview</p>
              </div>

              <button onClick={() => setSelectedPatient(null)}>
                <X size={21} />
              </button>
            </div>

            <div className="patients-modal-profile">
              <div className="patients-modal-avatar">
                {selectedPatient.initials}
              </div>

              <div>
                <h3>{selectedPatient.name}</h3>
                <span>{selectedPatient.id}</span>
              </div>
            </div>

            <div className="patients-modal-details">

              <div>
                <span>Age</span>
                <strong>{selectedPatient.age} Years</strong>
              </div>

              <div>
                <span>Gender</span>
                <strong>{selectedPatient.gender}</strong>
              </div>

              <div>
                <span>Phone Number</span>
                <strong>
                  <Phone size={14} />
                  {selectedPatient.phone}
                </strong>
              </div>

              <div>
                <span>Medical Condition</span>
                <strong>{selectedPatient.condition}</strong>
              </div>

              <div>
                <span>Last Visit</span>
                <strong>{selectedPatient.lastVisit}</strong>
              </div>

              <div>
                <span>Patient Status</span>
                <strong>{selectedPatient.status}</strong>
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

    </div>
  );
}

export default DoctorPatients;
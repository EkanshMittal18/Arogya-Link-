import React, { useState } from "react";
import {
  Users,
  UserRound,
  Search,
  Filter,
  UserPlus,
  Eye,
  MapPin,
  Phone,
  CalendarDays,
  Activity,
  Clock,
  FileText,
  X,
  HeartPulse,
} from "lucide-react";

function HealthWorkerPatients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Demo Patient Data
  const patients = [
    {
      id: "AL001",
      name: "Ramesh Kumar",
      age: 45,
      gender: "Male",
      phone: "9876543210",
      village: "Rampur",
      condition: "Fever",
      status: "Follow-up Required",
      registered: "12 Oct 2026",
      lastVisit: "28 Oct 2026",
      bloodGroup: "B+",
    },
    {
      id: "AL002",
      name: "Sunita Devi",
      age: 32,
      gender: "Female",
      phone: "9876543211",
      village: "Shivpur",
      condition: "General Checkup",
      status: "Active",
      registered: "14 Oct 2026",
      lastVisit: "30 Oct 2026",
      bloodGroup: "O+",
    },
    {
      id: "AL003",
      name: "Mohan Singh",
      age: 58,
      gender: "Male",
      phone: "9876543212",
      village: "Lakshmipur",
      condition: "High BP",
      status: "Referred",
      registered: "18 Oct 2026",
      lastVisit: "29 Oct 2026",
      bloodGroup: "A+",
    },
    {
      id: "AL004",
      name: "Pooja Sharma",
      age: 26,
      gender: "Female",
      phone: "9876543213",
      village: "Rampur",
      condition: "Pregnancy Checkup",
      status: "Active",
      registered: "20 Oct 2026",
      lastVisit: "31 Oct 2026",
      bloodGroup: "AB+",
    },
    {
      id: "AL005",
      name: "Amit Verma",
      age: 39,
      gender: "Male",
      phone: "9876543214",
      village: "Shivpur",
      condition: "Diabetes",
      status: "Follow-up Required",
      registered: "21 Oct 2026",
      lastVisit: "27 Oct 2026",
      bloodGroup: "O-",
    },
    {
      id: "AL006",
      name: "Kavita Devi",
      age: 51,
      gender: "Female",
      phone: "9876543215",
      village: "Rampur",
      condition: "Joint Pain",
      status: "Active",
      registered: "23 Oct 2026",
      lastVisit: "30 Oct 2026",
      bloodGroup: "B-",
    },
    {
      id: "AL007",
      name: "Rahul Kumar",
      age: 29,
      gender: "Male",
      phone: "9876543216",
      village: "Lakshmipur",
      condition: "General Checkup",
      status: "Referred",
      registered: "25 Oct 2026",
      lastVisit: "29 Oct 2026",
      bloodGroup: "A-",
    },
    {
      id: "AL008",
      name: "Meena Kumari",
      age: 36,
      gender: "Female",
      phone: "9876543217",
      village: "Shivpur",
      condition: "Anemia Screening",
      status: "Follow-up Required",
      registered: "27 Oct 2026",
      lastVisit: "31 Oct 2026",
      bloodGroup: "O+",
    },
  ];

  // Statistics
  const activePatients = patients.filter(
    (p) => p.status === "Active"
  ).length;

  const followUpPatients = patients.filter(
    (p) => p.status === "Follow-up Required"
  ).length;

  const referredPatients = patients.filter(
    (p) => p.status === "Referred"
  ).length;

  // Search and Filter
  const filteredPatients = patients.filter((patient) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      patient.name.toLowerCase().includes(search) ||
      patient.id.toLowerCase().includes(search) ||
      patient.village.toLowerCase().includes(search) ||
      patient.condition.toLowerCase().includes(search);

    const matchesFilter =
      activeFilter === "All" ||
      patient.status === activeFilter ||
      (activeFilter === "Follow-up" &&
        patient.status === "Follow-up Required");

    return matchesSearch && matchesFilter;
  });

  const getStatusClass = (status) => {
    if (status === "Active") return "active";
    if (status === "Follow-up Required") return "followup";
    if (status === "Referred") return "referred";
    return "";
  };

  return (
    <div className="hwp-container">

      <style>{`

        .hwp-container {
          width: 100%;
          color: #173b3a;
          font-family: inherit;
        }

        .hwp-container * {
          box-sizing: border-box;
        }

        /* PAGE HEADER */

        .hwp-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 25px;
        }

        .hwp-breadcrumb {
          color: #87988e;
          font-size: 11px;
          margin-bottom: 10px;
        }

        .hwp-breadcrumb span {
          color: #168b68;
          font-weight: 700;
        }

        .hwp-heading h1 {
          font-size: 25px;
          font-weight: 800;
          margin: 0 0 8px;
        }

        .hwp-heading p {
          color: #788a80;
          font-size: 12px;
          margin: 0;
        }

        .hwp-add-btn {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 12px 17px;
          background: #168b68;
          color: white;
          border: none;
          border-radius: 9px;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
        }

        .hwp-add-btn:hover {
          background: #106e53;
        }

        /* STATISTICS */

        .hwp-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 25px;
        }

        .hwp-stat {
          display: flex;
          align-items: flex-start;
          gap: 13px;
          padding: 20px 16px;
          background: white;
          border: 1px solid #e3eee8;
          border-radius: 13px;
          box-shadow: 0 4px 18px rgba(20,80,55,0.05);
          min-width: 0;
        }

        .hwp-stat-icon {
          width: 43px;
          height: 43px;
          min-width: 43px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hwp-blue {
          background: #e9f1ff;
          color: #2563eb;
        }

        .hwp-green {
          background: #e3f6ed;
          color: #168b68;
        }

        .hwp-orange {
          background: #fff2df;
          color: #ea8a20;
        }

        .hwp-purple {
          background: #f3eaff;
          color: #9255d8;
        }

        .hwp-stat h2 {
          font-size: 25px;
          font-weight: 800;
          margin: 0 0 5px;
        }

        .hwp-stat p {
          font-size: 11px;
          font-weight: 700;
          margin: 0 0 6px;
        }

        .hwp-stat span {
          font-size: 9px;
          color: #8b9b91;
        }

        /* DIRECTORY */

        .hwp-directory {
          background: white;
          border: 1px solid #e3eee8;
          border-radius: 15px;
          padding: 23px;
          box-shadow: 0 4px 20px rgba(20,80,55,0.05);
        }

        .hwp-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          margin-bottom: 23px;
        }

        .hwp-card-header h2 {
          font-size: 16px;
          font-weight: 800;
          margin: 0 0 6px;
        }

        .hwp-card-header p {
          font-size: 11px;
          color: #87988e;
          margin: 0;
        }

        .hwp-total {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 9px 12px;
          background: #eaf7ef;
          color: #168b68;
          border-radius: 8px;
          font-size: 10px;
          font-weight: 700;
          white-space: nowrap;
        }

        /* TOOLBAR */

        .hwp-toolbar {
          display: flex;
          align-items: center;
          gap: 13px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .hwp-search {
          flex: 1;
          min-width: 210px;
          display: flex;
          align-items: center;
          gap: 10px;
          background: #f7faf8;
          border: 1px solid #e3eee8;
          padding: 11px 13px;
          border-radius: 9px;
          color: #82958a;
        }

        .hwp-search input {
          width: 100%;
          border: none;
          outline: none;
          background: transparent;
          font-size: 11px;
          color: #173b3a;
        }

        .hwp-search input::placeholder {
          color: #9baaa2;
        }

        .hwp-search button {
          display: flex;
          background: transparent;
          border: none;
          color: #82958a;
          cursor: pointer;
        }

        .hwp-filter-label {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #71847a;
          font-size: 11px;
          font-weight: 700;
        }

        .hwp-filters {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .hwp-filters button {
          padding: 9px 12px;
          background: white;
          color: #6f8177;
          border: 1px solid #e3eee8;
          border-radius: 8px;
          font-size: 10px;
          font-weight: 700;
          cursor: pointer;
        }

        .hwp-filters button.selected {
          background: #168b68;
          border-color: #168b68;
          color: white;
        }

        /* TABLE */

        .hwp-table-wrap {
          width: 100%;
          overflow-x: auto;
        }

        .hwp-table {
          width: 100%;
          min-width: 850px;
          border-collapse: collapse;
          text-align: left;
        }

        .hwp-table thead {
          background: #f4faf6;
        }

        .hwp-table th {
          padding: 14px 12px;
          color: #7f9186;
          font-size: 9px;
          font-weight: 800;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .hwp-table td {
          padding: 14px 12px;
          border-bottom: 1px solid #edf3ef;
          font-size: 10px;
          color: #64786c;
          white-space: nowrap;
        }

        .hwp-table tbody tr:hover {
          background: #fbfefc;
        }

        .hwp-patient {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .hwp-avatar {
          width: 37px;
          height: 37px;
          min-width: 37px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 11px;
          background: #e3f6ed;
          color: #168b68;
          font-size: 13px;
          font-weight: 800;
        }

        .hwp-patient strong {
          display: block;
          font-size: 11px;
          color: #304d40;
          margin-bottom: 5px;
        }

        .hwp-patient span {
          display: block;
          font-size: 9px;
          color: #91a097;
        }

        .hwp-id {
          color: #168b68;
          font-weight: 800;
        }

        .hwp-village {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .hwp-village svg {
          color: #168b68;
        }

        /* STATUS */

        .hwp-status {
          display: inline-block;
          padding: 6px 10px;
          border-radius: 20px;
          font-size: 9px;
          font-weight: 700;
          white-space: nowrap;
        }

        .hwp-status.active {
          color: #168b68;
          background: #e3f6ed;
        }

        .hwp-status.followup {
          color: #d68a19;
          background: #fff4df;
        }

        .hwp-status.referred {
          color: #dc4545;
          background: #fff0ee;
        }

        .hwp-view {
          width: 33px;
          height: 33px;
          border: 1px solid #dcece2;
          background: #f1faf5;
          color: #168b68;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .hwp-view:hover {
          background: #168b68;
          color: white;
        }

        /* EMPTY STATE */

        .hwp-empty {
          padding: 55px 20px;
          text-align: center;
        }

        .hwp-empty h3 {
          font-size: 16px;
          margin: 12px 0 8px;
        }

        .hwp-empty p {
          color: #87988e;
          font-size: 11px;
        }

        .hwp-empty button {
          margin-top: 10px;
          background: #168b68;
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 8px;
          cursor: pointer;
        }

        .hwp-footer {
          border-top: 1px solid #edf3ef;
          padding-top: 15px;
          margin-top: 10px;
        }

        .hwp-footer p {
          color: #87988e;
          font-size: 10px;
          margin: 0;
        }

        .hwp-footer strong {
          color: #168b68;
        }

        /* MODAL */

        .hwp-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(15,40,30,0.48);
          backdrop-filter: blur(3px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .hwp-modal {
          width: 100%;
          max-width: 550px;
          max-height: 90vh;
          overflow-y: auto;
          background: white;
          border-radius: 17px;
          padding: 25px;
          box-shadow: 0 15px 50px rgba(0,0,0,0.15);
          animation: hwpOpen 0.25s ease;
        }

        @keyframes hwpOpen {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hwp-modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding-bottom: 18px;
          border-bottom: 1px solid #edf3ef;
        }

        .hwp-modal-header h2 {
          font-size: 19px;
          margin: 0 0 6px;
        }

        .hwp-modal-header p {
          font-size: 10px;
          color: #87988e;
          margin: 0;
        }

        .hwp-modal-header button {
          width: 34px;
          height: 34px;
          border: none;
          background: #f3f8f5;
          color: #61776c;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .hwp-modal-profile {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 20px 0;
        }

        .hwp-modal-avatar {
          width: 58px;
          height: 58px;
          border-radius: 15px;
          background: #e3f6ed;
          color: #168b68;
          font-size: 22px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hwp-modal-profile h3 {
          font-size: 16px;
          margin: 0 0 8px;
        }

        .hwp-details {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 17px;
          padding: 18px;
          background: #f7fbf8;
          border: 1px solid #e8f1eb;
          border-radius: 12px;
        }

        .hwp-detail {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .hwp-detail > svg {
          color: #168b68;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .hwp-detail span {
          display: block;
          color: #8b9b91;
          font-size: 9px;
          margin-bottom: 5px;
        }

        .hwp-detail strong {
          display: block;
          color: #304d40;
          font-size: 10px;
          word-break: break-word;
        }

        .hwp-modal-footer {
          display: flex;
          justify-content: flex-end;
          margin-top: 20px;
        }

        .hwp-close {
          background: #168b68;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 11px 23px;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
        }

        /* RESPONSIVE */

        @media(max-width:1200px) {
          .hwp-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .hwp-search {
            flex-basis: 100%;
          }
        }

        @media(max-width:700px) {
          .hwp-heading {
            align-items: flex-start;
            flex-direction: column;
          }

          .hwp-heading h1 {
            font-size: 21px;
          }

          .hwp-stats {
            gap: 10px;
          }

          .hwp-stat {
            padding: 13px 10px;
            gap: 9px;
          }

          .hwp-stat-icon {
            width: 35px;
            height: 35px;
            min-width: 35px;
          }

          .hwp-stat h2 {
            font-size: 21px;
          }

          .hwp-stat p {
            font-size: 10px;
          }

          .hwp-directory {
            padding: 15px 11px;
          }

          .hwp-toolbar {
            align-items: flex-start;
          }

          .hwp-filters {
            width: 100%;
          }

          .hwp-filters button {
            flex: 1;
            padding: 9px 6px;
          }

          .hwp-details {
            grid-template-columns: 1fr;
          }

          .hwp-modal {
            padding: 18px;
          }
        }

        @media(max-width:420px) {
          .hwp-stats {
            grid-template-columns: 1fr;
          }

          .hwp-card-header {
            align-items: flex-start;
          }

          .hwp-total {
            font-size: 9px;
          }
        }

      `}</style>

      {/* PAGE HEADER */}

      <div className="hwp-heading">

        <div>
          <div className="hwp-breadcrumb">
            Dashboard / <span>My Patients</span>
          </div>

          <h1>My Patients</h1>

          <p>
            Manage and monitor patients registered under your care.
          </p>
        </div>

        <button
          className="hwp-add-btn"
          onClick={() => alert("Patient registration coming soon!")}
        >
          <UserPlus size={18} />
          Register New Patient
        </button>

      </div>

      {/* STATISTICS */}

      <div className="hwp-stats">

        <div className="hwp-stat">
          <div className="hwp-stat-icon hwp-blue">
            <Users size={23} />
          </div>

          <div>
            <h2>{patients.length}</h2>
            <p>Total Patients</p>
            <span>All registered patients</span>
          </div>
        </div>

        <div className="hwp-stat">
          <div className="hwp-stat-icon hwp-green">
            <HeartPulse size={23} />
          </div>

          <div>
            <h2>{activePatients}</h2>
            <p>Active Patients</p>
            <span>Currently under care</span>
          </div>
        </div>

        <div className="hwp-stat">
          <div className="hwp-stat-icon hwp-orange">
            <Clock size={23} />
          </div>

          <div>
            <h2>{followUpPatients}</h2>
            <p>Follow-up Required</p>
            <span>Patients needing attention</span>
          </div>
        </div>

        <div className="hwp-stat">
          <div className="hwp-stat-icon hwp-purple">
            <FileText size={23} />
          </div>

          <div>
            <h2>{referredPatients}</h2>
            <p>Referred Patients</p>
            <span>Sent for doctor consultation</span>
          </div>
        </div>

      </div>

      {/* PATIENT DIRECTORY */}

      <div className="hwp-directory">

        <div className="hwp-card-header">

          <div>
            <h2>Patient Directory</h2>
            <p>View and manage all your registered patients.</p>
          </div>

          <div className="hwp-total">
            <Users size={16} />
            {filteredPatients.length} Patients
          </div>

        </div>

        {/* SEARCH AND FILTER */}

        <div className="hwp-toolbar">

          <div className="hwp-search">
            <Search size={19} />

            <input
              type="text"
              placeholder="Search by name, ID, village..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                <X size={17} />
              </button>
            )}
          </div>

          <div className="hwp-filter-label">
            <Filter size={17} />
            Filter:
          </div>

          <div className="hwp-filters">

            {["All", "Active", "Follow-up", "Referred"].map(
              (filter) => (
                <button
                  key={filter}
                  className={
                    activeFilter === filter ? "selected" : ""
                  }
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              )
            )}

          </div>

        </div>

        {/* PATIENT TABLE */}

        <div className="hwp-table-wrap">

          <table className="hwp-table">

            <thead>
              <tr>
                <th>Patient Information</th>
                <th>Patient ID</th>
                <th>Age / Gender</th>
                <th>Village</th>
                <th>Health Condition</th>
                <th>Last Visit</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredPatients.map((patient) => (

                <tr key={patient.id}>

                  <td>
                    <div className="hwp-patient">

                      <div className="hwp-avatar">
                        {patient.name.charAt(0)}
                      </div>

                      <div>
                        <strong>{patient.name}</strong>
                        <span>{patient.phone}</span>
                      </div>

                    </div>
                  </td>

                  <td>
                    <span className="hwp-id">
                      {patient.id}
                    </span>
                  </td>

                  <td>
                    {patient.age} yrs / {patient.gender}
                  </td>

                  <td>
                    <div className="hwp-village">
                      <MapPin size={14} />
                      {patient.village}
                    </div>
                  </td>

                  <td>{patient.condition}</td>

                  <td>{patient.lastVisit}</td>

                  <td>
                    <span
                      className={`hwp-status ${getStatusClass(
                        patient.status
                      )}`}
                    >
                      {patient.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="hwp-view"
                      onClick={() => setSelectedPatient(patient)}
                      title="View patient details"
                    >
                      <Eye size={17} />
                    </button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {/* NO RESULTS */}

          {filteredPatients.length === 0 && (

            <div className="hwp-empty">

              <Search size={30} />

              <h3>No Patients Found</h3>

              <p>
                No patients match your search or selected filter.
              </p>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveFilter("All");
                }}
              >
                Clear Filters
              </button>

            </div>

          )}

        </div>

        {/* TABLE FOOTER */}

        <div className="hwp-footer">
          <p>
            Showing <strong>{filteredPatients.length}</strong> of{" "}
            <strong>{patients.length}</strong> patients
          </p>
        </div>

      </div>

      {/* PATIENT DETAILS MODAL */}

      {selectedPatient && (

        <div
          className="hwp-overlay"
          onClick={() => setSelectedPatient(null)}
        >

          <div
            className="hwp-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="hwp-modal-header">

              <div>
                <h2>Patient Details</h2>
                <p>Patient ID: {selectedPatient.id}</p>
              </div>

              <button
                onClick={() => setSelectedPatient(null)}
              >
                <X size={21} />
              </button>

            </div>

            {/* PROFILE */}

            <div className="hwp-modal-profile">

              <div className="hwp-modal-avatar">
                {selectedPatient.name.charAt(0)}
              </div>

              <div>
                <h3>{selectedPatient.name}</h3>

                <span
                  className={`hwp-status ${getStatusClass(
                    selectedPatient.status
                  )}`}
                >
                  {selectedPatient.status}
                </span>
              </div>

            </div>

            {/* DETAILS */}

            <div className="hwp-details">

              <div className="hwp-detail">
                <UserRound size={18} />
                <div>
                  <span>Age / Gender</span>
                  <strong>
                    {selectedPatient.age} Years / {selectedPatient.gender}
                  </strong>
                </div>
              </div>

              <div className="hwp-detail">
                <Phone size={18} />
                <div>
                  <span>Phone Number</span>
                  <strong>{selectedPatient.phone}</strong>
                </div>
              </div>

              <div className="hwp-detail">
                <MapPin size={18} />
                <div>
                  <span>Village</span>
                  <strong>{selectedPatient.village}</strong>
                </div>
              </div>

              <div className="hwp-detail">
                <Activity size={18} />
                <div>
                  <span>Health Condition</span>
                  <strong>{selectedPatient.condition}</strong>
                </div>
              </div>

              <div className="hwp-detail">
                <HeartPulse size={18} />
                <div>
                  <span>Blood Group</span>
                  <strong>{selectedPatient.bloodGroup}</strong>
                </div>
              </div>

              <div className="hwp-detail">
                <CalendarDays size={18} />
                <div>
                  <span>Registration Date</span>
                  <strong>{selectedPatient.registered}</strong>
                </div>
              </div>

            </div>

            <div className="hwp-modal-footer">
              <button
                className="hwp-close"
                onClick={() => setSelectedPatient(null)}
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

export default HealthWorkerPatients;
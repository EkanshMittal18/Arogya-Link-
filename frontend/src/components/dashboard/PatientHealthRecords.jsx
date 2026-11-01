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
} from "lucide-react";

const records = [
  {
    id: 1,
    title: "General Consultation",
    category: "Consultation",
    doctor: "Dr. Amit Sharma",
    date: "20 Oct 2026",
    status: "Completed",
    icon: ClipboardList,
  },
  {
    id: 2,
    title: "Blood Test Report",
    category: "Lab Report",
    doctor: "City Diagnostic Centre",
    date: "18 Oct 2026",
    status: "Available",
    icon: FlaskConical,
  },
  {
    id: 3,
    title: "Medical Prescription",
    category: "Prescription",
    doctor: "Dr. Neha Verma",
    date: "15 Oct 2026",
    status: "Available",
    icon: Pill,
  },
];

function PatientHealthRecords() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.title.toLowerCase().includes(search.toLowerCase()) ||
      record.doctor.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || record.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="health-records-page">

      {/* PAGE HEADER */}

      <div className="records-header">
        <div>
          <h2>My Health Records</h2>
          <p>Access and manage your personal medical history.</p>
        </div>

        <div className="records-total">
          <FileText size={22} />
          <div>
            <h3>{records.length}</h3>
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
            <h3>03</h3>
            <p>Total Records</p>
          </div>
        </div>

        <div className="record-summary-card">
          <div className="record-summary-icon blue">
            <Activity size={23} />
          </div>
          <div>
            <h3>01</h3>
            <p>Consultations</p>
          </div>
        </div>

        <div className="record-summary-card">
          <div className="record-summary-icon purple">
            <Pill size={23} />
          </div>
          <div>
            <h3>01</h3>
            <p>Prescriptions</p>
          </div>
        </div>

        <div className="record-summary-card">
          <div className="record-summary-icon orange">
            <FlaskConical size={23} />
          </div>
          <div>
            <h3>01</h3>
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
            placeholder="Search medical records..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="records-filter">
          <Filter size={19} />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
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
            <h3>Medical History</h3>
            <p>Your previous healthcare records</p>
          </div>

          <span>{filteredRecords.length} Records</span>
        </div>

        {filteredRecords.length > 0 ? (

          <div className="records-list">

            {filteredRecords.map((record) => {
              const Icon = record.icon;

              return (
                <div className="medical-record-card" key={record.id}>

                  <div className="medical-record-icon">
                    <Icon size={25} />
                  </div>

                  <div className="medical-record-info">
                    <h4>{record.title}</h4>

                    <p>{record.doctor}</p>

                    <div className="medical-record-date">
                      <CalendarDays size={15} />
                      {record.date}
                    </div>
                  </div>

                  <div className="medical-record-status">
                    <span>{record.status}</span>
                    <small>{record.category}</small>
                  </div>

                  <div className="medical-record-actions">
                    <button type="button" title="View Record">
                      <Eye size={19} />
                    </button>

                    <button type="button" title="Download Record">
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

      {/* PRIVACY NOTE */}

      <div className="records-privacy-note">
        <FileText size={19} />
        <p>
          Your medical records are private and accessible only
          to authorized users.
        </p>
      </div>

    </div>
  );
}

export default PatientHealthRecords;
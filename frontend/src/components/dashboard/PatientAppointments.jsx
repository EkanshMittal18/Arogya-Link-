import React, { useState } from "react";
import {
CalendarDays,
Clock,
MapPin,
UserRound,
Search,
Video,
Hospital,
CheckCircle2,
Clock3,
XCircle,
Plus,
} from "lucide-react";

const appointments = [
{
id: 1,
doctor: "Dr. Amit Sharma",
specialization: "General Physician",
date: "28 Oct 2026",
time: "10:00 AM",
location: "District Hospital",
type: "Hospital Visit",
status: "Upcoming",
},
{
id: 2,
doctor: "Dr. Neha Verma",
specialization: "General Medicine",
date: "15 Oct 2026",
time: "11:30 AM",
location: "Online Consultation",
type: "Teleconsultation",
status: "Completed",
},
{
id: 3,
doctor: "Dr. Rahul Mehta",
specialization: "General Physician",
date: "10 Oct 2026",
time: "09:30 AM",
location: "Community Health Centre",
type: "Hospital Visit",
status: "Cancelled",
},
];

function PatientAppointments() {
const [activeTab, setActiveTab] = useState("All");
const [search, setSearch] = useState("");

const filteredAppointments = appointments.filter((appointment) => {
const matchesTab =
activeTab === "All" || appointment.status === activeTab;

const matchesSearch =
  appointment.doctor.toLowerCase().includes(search.toLowerCase()) ||
  appointment.specialization.toLowerCase().includes(search.toLowerCase());

return matchesTab && matchesSearch;

});

return ( <div className="appointments-page">


  {/* HEADER */}
  <div className="appointments-header">
    <div>
      <h2>My Appointments</h2>
      <p>Manage your consultations and appointments.</p>
    </div>

    <div className="appointment-header-icon">
      <CalendarDays size={25} />
      <span>Appointment History</span>
    </div>
  </div>

  {/* SUMMARY CARDS */}
  <div className="appointment-stats">

    <div className="appointment-stat-card">
      <CalendarDays size={25} />
      <div>
        <h3>01</h3>
        <p>Upcoming</p>
      </div>
    </div>

    <div className="appointment-stat-card completed-stat">
      <CheckCircle2 size={25} />
      <div>
        <h3>01</h3>
        <p>Completed</p>
      </div>
    </div>

    <div className="appointment-stat-card cancelled-stat">
      <XCircle size={25} />
      <div>
        <h3>01</h3>
        <p>Cancelled</p>
      </div>
    </div>

  </div>

  {/* UPCOMING APPOINTMENT */}
  <section className="upcoming-appointment-panel">

    <div className="upcoming-title">
      <div>
        <CalendarDays size={23} />
        <h3>Next Appointment</h3>
      </div>

      <span>Upcoming</span>
    </div>

    <div className="upcoming-details">
      <div className="upcoming-doctor-icon">
        <UserRound size={34} />
      </div>

      <div className="upcoming-doctor-info">
        <h3>Dr. Amit Sharma</h3>
        <p>General Physician</p>
        <div className="upcoming-meta">
          <span><CalendarDays size={15} /> 28 Oct 2026</span>
          <span><Clock size={15} /> 10:00 AM</span>
          <span><MapPin size={15} /> District Hospital</span>
        </div>
      </div>
    </div>

  </section>

  {/* SEARCH AND FILTER */}
  <div className="appointment-toolbar">

    <div className="appointment-search">
      <Search size={19} />
      <input
        type="text"
        placeholder="Search doctor or specialization..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    <div className="appointment-tabs">
      {["All", "Upcoming", "Completed", "Cancelled"].map((tab) => (
        <button
          key={tab}
          className={activeTab === tab ? "selected-tab" : ""}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>

  </div>

  {/* APPOINTMENT LIST */}
  <section className="appointment-list-panel">

    <div className="appointment-list-heading">
      <div>
        <h3>Appointment History</h3>
        <p>Your previous and upcoming consultations</p>
      </div>

      <span>{filteredAppointments.length} Appointments</span>
    </div>

    {filteredAppointments.length > 0 ? (
      <div className="appointment-list">

        {filteredAppointments.map((appointment) => (
          <div className="appointment-card" key={appointment.id}>

            <div className="appointment-date-box">
              <CalendarDays size={23} />
              <span>{appointment.date}</span>
            </div>

            <div className="appointment-doctor">
              <h4>{appointment.doctor}</h4>
              <p>{appointment.specialization}</p>

              <div className="appointment-information">
                <span><Clock size={14} /> {appointment.time}</span>

                <span>
                  {appointment.type === "Teleconsultation" ? (
                    <Video size={14} />
                  ) : (
                    <Hospital size={14} />
                  )}
                  {appointment.type}
                </span>
              </div>
            </div>

            <div className="appointment-status">
              <span className={`status-${appointment.status.toLowerCase()}`}>
                {appointment.status}
              </span>
            </div>

          </div>
        ))}

      </div>
    ) : (
      <div className="appointment-empty">
        <CalendarDays size={40} />
        <h3>No Appointments Found</h3>
        <p>Try changing your search or filter.</p>
      </div>
    )}

  </section>

  {/* INFORMATION */}
  <div className="appointment-info-note">
    <Clock3 size={20} />
    <p>
      Please arrive on time for your scheduled consultation.
      Contact your healthcare facility if you need assistance.
    </p>
  </div>

</div>

);
}

export default PatientAppointments;

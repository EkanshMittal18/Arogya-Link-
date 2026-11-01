import React, { useState } from "react";
import {
CalendarDays,
Clock,
CheckCircle2,
CircleAlert,
Activity,
UserRound,
MapPin,
Phone,
ChevronRight,
Bell,
ClipboardCheck,
} from "lucide-react";

const followupData = [
{
id: 1,
doctor: "Dr. Amit Sharma",
specialty: "General Physician",
title: "General Health Check-up",
date: "05 November 2026",
time: "10:30 AM",
location: "District Government Hospital",
status: "Upcoming",
type: "Hospital Visit",
description: "Follow-up consultation for recurring fever and weakness.",
},
{
id: 2,
doctor: "Dr. Neha Verma",
specialty: "General Medicine",
title: "Blood Pressure Monitoring",
date: "03 November 2026",
time: "11:00 AM",
location: "Community Health Centre",
status: "Pending",
type: "Health Check",
description: "Monitor blood pressure and review previous readings.",
},
{
id: 3,
doctor: "Dr. Rahul Mehta",
specialty: "General Physician",
title: "Post-treatment Review",
date: "25 October 2026",
time: "09:30 AM",
location: "Primary Health Centre",
status: "Completed",
type: "Hospital Visit",
description: "Review recovery progress after previous consultation.",
},
{
id: 4,
doctor: "Dr. Neha Verma",
specialty: "General Medicine",
title: "Routine Health Follow-up",
date: "20 October 2026",
time: "12:00 PM",
location: "Community Health Centre",
status: "Completed",
type: "Health Check",
description: "Routine review of general health condition.",
},
];

function PatientFollowups() {
const [activeFilter, setActiveFilter] = useState("All");
const [followups, setFollowups] = useState(followupData);

const filters = ["All", "Upcoming", "Pending", "Completed"];

const filteredFollowups =
activeFilter === "All"
? followups
: followups.filter((item) => item.status === activeFilter);

const upcomingCount = followups.filter(
(item) => item.status === "Upcoming"
).length;

const pendingCount = followups.filter(
(item) => item.status === "Pending"
).length;

const completedCount = followups.filter(
(item) => item.status === "Completed"
).length;

const markCompleted = (id) => {
setFollowups((previous) =>
previous.map((item) =>
item.id === id ? { ...item, status: "Completed" } : item
)
);
};

return ( <div className="followup-page">

```
  {/* Header */}
  <div className="followup-header">
    <div>
      <span className="followup-eyebrow">YOUR CONTINUOUS CARE</span>
      <h1>My Follow-ups</h1>
      <p>
        Keep track of your health check-ups and stay connected with your
        healthcare providers.
      </p>
    </div>

    <div className="followup-header-icon">
      <CalendarDays size={27} />
    </div>
  </div>

  {/* Summary Cards */}
  <div className="followup-stats">

    <div className="followup-stat-card">
      <div className="followup-stat-icon green">
        <CalendarDays size={22} />
      </div>
      <div>
        <h3>{upcomingCount}</h3>
        <p>Upcoming</p>
      </div>
    </div>

    <div className="followup-stat-card">
      <div className="followup-stat-icon orange">
        <Clock size={22} />
      </div>
      <div>
        <h3>{pendingCount}</h3>
        <p>Pending</p>
      </div>
    </div>

    <div className="followup-stat-card">
      <div className="followup-stat-icon blue">
        <CheckCircle2 size={22} />
      </div>
      <div>
        <h3>{completedCount}</h3>
        <p>Completed</p>
      </div>
    </div>

  </div>

  {/* Reminder Banner */}
  <div className="followup-reminder">
    <div className="followup-reminder-icon">
      <Bell size={22} />
    </div>

    <div>
      <h4>Stay on track with your health!</h4>
      <p>
        Don't miss your scheduled follow-up visits. Regular check-ups help
        your healthcare provider monitor your progress.
      </p>
    </div>
  </div>

  {/* Follow-up List */}
  <div className="followup-section">

    <div className="followup-section-heading">
      <div>
        <h2>Follow-up Schedule</h2>
        <p>Manage and track your healthcare follow-ups.</p>
      </div>
    </div>

    {/* Filters */}
    <div className="followup-filters">
      {filters.map((filter) => (
        <button
          key={filter}
          className={
            activeFilter === filter ? "active" : ""
          }
          onClick={() => setActiveFilter(filter)}
        >
          {filter}
        </button>
      ))}
    </div>

    {/* Cards */}
    <div className="followup-list">

      {filteredFollowups.length > 0 ? (
        filteredFollowups.map((item) => (

          <div className="followup-card" key={item.id}>

            <div className="followup-card-top">

              <div className="followup-card-title">
                <div className="followup-card-icon">
                  <ClipboardCheck size={22} />
                </div>

                <div>
                  <h3>{item.title}</h3>
                  <span>{item.type}</span>
                </div>
              </div>

              <span
                className={`followup-status ${item.status.toLowerCase()}`}
              >
                {item.status}
              </span>

            </div>

            <p className="followup-description">
              {item.description}
            </p>

            <div className="followup-details">

              <div>
                <UserRound size={16} />
                <span>{item.doctor}</span>
              </div>

              <div>
                <Activity size={16} />
                <span>{item.specialty}</span>
              </div>

              <div>
                <CalendarDays size={16} />
                <span>{item.date}</span>
              </div>

              <div>
                <Clock size={16} />
                <span>{item.time}</span>
              </div>

              <div>
                <MapPin size={16} />
                <span>{item.location}</span>
              </div>

            </div>

            <div className="followup-card-footer">

              <span className="followup-doctor-note">
                Healthcare Follow-up
              </span>

              {item.status !== "Completed" ? (
                <button
                  className="followup-complete-btn"
                  onClick={() => markCompleted(item.id)}
                >
                  <CheckCircle2 size={16} />
                  Mark Completed
                </button>
              ) : (
                <span className="followup-completed-label">
                  <CheckCircle2 size={16} />
                  Completed
                </span>
              )}

            </div>

          </div>

        ))
      ) : (
        <div className="followup-empty">
          <CircleAlert size={30} />
          <h3>No follow-ups found</h3>
          <p>There are no follow-ups in this category right now.</p>
        </div>
      )}

    </div>

  </div>

  {/* Help Section */}
  <div className="followup-help">

    <div className="followup-help-icon">
      <Phone size={22} />
    </div>

    <div>
      <h4>Need assistance?</h4>
      <p>
        Contact your community health worker if you need help with your
        follow-up schedule or hospital visit.
      </p>
    </div>

    <ChevronRight size={20} />

  </div>

  <p className="followup-demo-note">
    Demo follow-up records are displayed for preview. Real patient
    follow-up data and reminders will be connected through the backend.
  </p>

</div>

);
}

export default PatientFollowups;

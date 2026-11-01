import React from "react";
import {
ArrowUpRight,
MapPin,
CalendarDays,
Clock,
UserRound,
Hospital,
CheckCircle2,
Circle,
FileText,
Phone,
Navigation,
Activity,
} from "lucide-react";

const referrals = [
{
id: "REF-2026-001",
doctor: "Dr. Amit Sharma",
specialty: "General Physician",
hospital: "District Government Hospital",
location: "Moradabad, Uttar Pradesh",
date: "28 October 2026",
time: "10:30 AM",
status: "In Progress",
priority: "Normal",
reason: "Further evaluation of recurring fever and weakness.",
steps: [
{ title: "Referral Created", date: "24 Oct 2026", completed: true },
{ title: "Referral Accepted", date: "25 Oct 2026", completed: true },
{ title: "Hospital Visit", date: "28 Oct 2026", completed: false },
{ title: "Doctor Review", date: "Pending", completed: false },
],
},
{
id: "REF-2026-002",
doctor: "Dr. Neha Verma",
specialty: "General Medicine",
hospital: "Community Health Centre",
location: "Moradabad, Uttar Pradesh",
date: "18 October 2026",
time: "11:00 AM",
status: "Completed",
priority: "Normal",
reason: "Routine medical examination and consultation.",
steps: [
{ title: "Referral Created", date: "15 Oct 2026", completed: true },
{ title: "Referral Accepted", date: "16 Oct 2026", completed: true },
{ title: "Hospital Visit", date: "18 Oct 2026", completed: true },
{ title: "Doctor Review", date: "18 Oct 2026", completed: true },
],
},
];

function PatientReferrals() {
const activeReferrals = referrals.filter(
(item) => item.status === "In Progress"
).length;

const completedReferrals = referrals.filter(
(item) => item.status === "Completed"
).length;

return ( <div className="referral-page">

```
  {/* Page Heading */}
  <div className="referral-heading">
    <div>
      <span className="referral-eyebrow">YOUR HEALTH JOURNEY</span>
      <h1>My Referrals</h1>
      <p>
        Track your hospital referrals and stay updated on your care journey.
      </p>
    </div>

    <div className="referral-heading-icon">
      <Activity size={28} />
    </div>
  </div>

  {/* Statistics */}
  <div className="referral-stats">

    <div className="referral-stat-card">
      <div className="referral-stat-icon green">
        <FileText size={21} />
      </div>
      <div>
        <h3>{referrals.length}</h3>
        <p>Total Referrals</p>
      </div>
    </div>

    <div className="referral-stat-card">
      <div className="referral-stat-icon orange">
        <Clock size={21} />
      </div>
      <div>
        <h3>{activeReferrals}</h3>
        <p>Active Referrals</p>
      </div>
    </div>

    <div className="referral-stat-card">
      <div className="referral-stat-icon blue">
        <CheckCircle2 size={21} />
      </div>
      <div>
        <h3>{completedReferrals}</h3>
        <p>Completed</p>
      </div>
    </div>

  </div>

  {/* Referral List */}
  <div className="referral-section-heading">
    <div>
      <h2>Referral History</h2>
      <p>View the status and details of your referrals.</p>
    </div>
  </div>

  <div className="referral-list">

    {referrals.map((referral) => (
      <div className="referral-card" key={referral.id}>

        {/* Card Header */}
        <div className="referral-card-header">
          <div className="referral-card-title">
            <div className="referral-hospital-icon">
              <Hospital size={23} />
            </div>

            <div>
              <h3>{referral.hospital}</h3>
              <span>{referral.id}</span>
            </div>
          </div>

          <span
            className={`referral-status ${
              referral.status === "Completed" ? "completed" : "progress"
            }`}
          >
            {referral.status}
          </span>
        </div>

        {/* Referral Details */}
        <div className="referral-details">

          <div className="referral-detail-item">
            <UserRound size={17} />
            <div>
              <small>Referred By</small>
              <p>{referral.doctor}</p>
            </div>
          </div>

          <div className="referral-detail-item">
            <Activity size={17} />
            <div>
              <small>Specialty</small>
              <p>{referral.specialty}</p>
            </div>
          </div>

          <div className="referral-detail-item">
            <CalendarDays size={17} />
            <div>
              <small>Appointment Date</small>
              <p>{referral.date}</p>
            </div>
          </div>

          <div className="referral-detail-item">
            <MapPin size={17} />
            <div>
              <small>Hospital Location</small>
              <p>{referral.location}</p>
            </div>
          </div>

        </div>

        {/* Reason */}
        <div className="referral-reason">
          <strong>Referral Reason</strong>
          <p>{referral.reason}</p>
        </div>

        {/* Timeline */}
        <div className="referral-timeline-section">
          <h4>Referral Progress</h4>

          <div className="referral-timeline">
            {referral.steps.map((step, index) => (
              <div className="referral-timeline-item" key={index}>
                <div className="referral-timeline-marker">
                  {step.completed ? (
                    <CheckCircle2 size={19} />
                  ) : (
                    <Circle size={19} />
                  )}
                </div>

                <div className="referral-timeline-content">
                  <strong>{step.title}</strong>
                  <span>{step.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="referral-card-footer">
          <span>
            <Clock size={15} /> {referral.time}
          </span>

          <button
            type="button"
            className="referral-action-btn"
            onClick={() =>
              window.alert("Referral details preview only.")
            }
          >
            View Details <ArrowUpRight size={16} />
          </button>
        </div>

      </div>
    ))}

  </div>

  {/* Help Note */}
  <div className="referral-help-box">
    <div className="referral-help-icon">
      <Phone size={21} />
    </div>

    <div>
      <h4>Need help with your referral?</h4>
      <p>
        Contact your community health worker for assistance with hospital
        visits and referral updates.
      </p>
    </div>
  </div>

  <p className="referral-demo-note">
    Demo data is displayed for preview. Real referral records will be
    connected through the backend later.
  </p>

</div>

);
}

export default PatientReferrals;

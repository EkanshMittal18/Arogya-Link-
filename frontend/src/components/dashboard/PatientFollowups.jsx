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
import { useAarogya } from "../../context/AarogyaContext";

function PatientFollowups() {
  const { followups, activePatient, updateFollowupStatus } = useAarogya();
  const [activeFilter, setActiveFilter] = useState("All");

  const patientFollowups = followups.filter((f) => f.patientId === activePatient.id);

  const filters = ["All", "Upcoming", "Pending", "Completed"];

  const filteredFollowups =
    activeFilter === "All"
      ? patientFollowups
      : patientFollowups.filter((item) => item.status === activeFilter);

  const upcomingCount = patientFollowups.filter((item) => item.status === "Upcoming").length;
  const pendingCount = patientFollowups.filter((item) => item.status === "Pending").length;
  const completedCount = patientFollowups.filter((item) => item.status === "Completed").length;

  const handleMarkCompleted = (id) => {
    updateFollowupStatus(id, "Completed");
  };

  return (
    <div className="followup-page">
      {/* Header */}
      <div className="followup-header">
        <div>
          <span className="followup-eyebrow">YOUR CONTINUOUS CARE</span>
          <h1>My Follow-ups</h1>
          <p>
            Keep track of your health check-ups and stay connected with your healthcare providers.
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
            Timely follow-ups help doctors prevent complications and ensure your prescribed medicines are working effectively.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="followup-filter-bar">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`followup-filter-btn ${activeFilter === filter ? "active" : ""}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Follow-up Cards */}
      {filteredFollowups.length > 0 ? (
        <div className="followup-list">
          {filteredFollowups.map((item) => (
            <div className="followup-card" key={item.id}>
              <div className="followup-card-top">
                <div className="followup-card-title">
                  <div className="followup-type-icon">
                    <Activity size={22} />
                  </div>

                  <div>
                    <h3>{item.title}</h3>
                    <span>{item.type || "Health Check"}</span>
                  </div>
                </div>

                <span
                  className={`followup-status ${
                    item.status === "Completed"
                      ? "completed"
                      : item.status === "Pending"
                      ? "pending"
                      : "upcoming"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="followup-info-grid">
                <div className="followup-info-item">
                  <UserRound size={17} />
                  <div>
                    <small>Doctor / Provider</small>
                    <p>{item.doctor || "General Physician"}</p>
                  </div>
                </div>

                <div className="followup-info-item">
                  <CalendarDays size={17} />
                  <div>
                    <small>Follow-up Date</small>
                    <p>{item.date}</p>
                  </div>
                </div>

                <div className="followup-info-item">
                  <Clock size={17} />
                  <div>
                    <small>Scheduled Time</small>
                    <p>{item.time || "10:00 AM"}</p>
                  </div>
                </div>

                <div className="followup-info-item">
                  <MapPin size={17} />
                  <div>
                    <small>Facility / Location</small>
                    <p>{item.location || "Community Health Centre"}</p>
                  </div>
                </div>
              </div>

              <div className="followup-description">
                <strong>Doctor's Instructions & Purpose</strong>
                <p>{item.description}</p>
              </div>

              <div className="followup-card-footer">
                <span className="text-xs text-slate-500">
                  Patient: {activePatient.name} ({activePatient.id})
                </span>

                {item.status !== "Completed" && (
                  <button
                    type="button"
                    className="followup-action-btn flex items-center gap-1.5"
                    onClick={() => handleMarkCompleted(item.id)}
                  >
                    <CheckCircle2 size={16} /> Mark as Done
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-white rounded-2xl border border-slate-100 p-8">
          <CalendarDays size={42} className="mx-auto text-slate-300 mb-2" />
          <h3 className="text-base font-bold text-slate-700">No Follow-ups Found</h3>
          <p className="text-xs text-slate-500 mt-1">There are no follow-ups under "{activeFilter}".</p>
        </div>
      )}
    </div>
  );
}

export default PatientFollowups;

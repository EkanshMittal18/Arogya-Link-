import React, { useState } from "react";
import {
  Bell,
  CalendarDays,
  FileText,
  Activity,
  CheckCircle2,
  Trash2,
  Check,
  Clock,
  AlertCircle,
  CheckCheck,
  Inbox,
} from "lucide-react";

const initialNotifications = [
  {
    id: 1,
    title: "Upcoming Appointment",
    message:
      "Your appointment with Dr. Amit Sharma is scheduled for 5 November 2026 at 10:30 AM.",
    date: "Today, 10:30 AM",
    type: "appointment",
    read: false,
  },
  {
    id: 2,
    title: "Referral Status Updated",
    message:
      "Your referral to District Government Hospital has been accepted.",
    date: "Yesterday, 04:15 PM",
    type: "referral",
    read: false,
  },
  {
    id: 3,
    title: "Follow-up Reminder",
    message:
      "Your blood pressure monitoring follow-up is scheduled for 3 November 2026.",
    date: "Yesterday, 11:00 AM",
    type: "followup",
    read: false,
  },
  {
    id: 4,
    title: "Health Record Updated",
    message:
      "Your latest consultation record has been added to your health records.",
    date: "28 October 2026",
    type: "record",
    read: true,
  },
  {
    id: 5,
    title: "Appointment Completed",
    message:
      "Your previous consultation has been marked as completed.",
    date: "25 October 2026",
    type: "appointment",
    read: true,
  },
  {
    id: 6,
    title: "Health Reminder",
    message:
      "Remember to maintain healthy habits and drink sufficient clean water.",
    date: "22 October 2026",
    type: "general",
    read: true,
  },
];

function PatientNotifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeFilter, setActiveFilter] = useState("All");

  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  const readCount = notifications.filter(
    (item) => item.read
  ).length;

  const filteredNotifications = notifications.filter((item) => {
    if (activeFilter === "Unread") return !item.read;
    if (activeFilter === "Read") return item.read;
    return true;
  });

  const getIcon = (type) => {
    switch (type) {
      case "appointment":
        return <CalendarDays size={21} />;

      case "referral":
        return <FileText size={21} />;

      case "followup":
        return <Activity size={21} />;

      case "record":
        return <CheckCircle2 size={21} />;

      default:
        return <Bell size={21} />;
    }
  };

  const markAsRead = (id) => {
    setNotifications((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((item) => ({ ...item, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="notification-page">

      {/* HEADER */}
      <div className="notification-page-header">
        <div>
          <span className="notification-eyebrow">
            STAY INFORMED
          </span>

          <h1>Notifications</h1>

          <p>
            Stay updated with your appointments, referrals and healthcare
            activities.
          </p>
        </div>

        <div className="notification-header-icon">
          <Bell size={28} />
          {unreadCount > 0 && (
            <span>{unreadCount}</span>
          )}
        </div>
      </div>

      {/* STATISTICS */}
      <div className="notification-stats">

        <div className="notification-stat-card">
          <div className="notification-stat-icon green">
            <Inbox size={22} />
          </div>

          <div>
            <h3>{notifications.length}</h3>
            <p>Total Notifications</p>
          </div>
        </div>

        <div className="notification-stat-card">
          <div className="notification-stat-icon orange">
            <AlertCircle size={22} />
          </div>

          <div>
            <h3>{unreadCount}</h3>
            <p>Unread</p>
          </div>
        </div>

        <div className="notification-stat-card">
          <div className="notification-stat-icon blue">
            <CheckCheck size={22} />
          </div>

          <div>
            <h3>{readCount}</h3>
            <p>Read</p>
          </div>
        </div>

      </div>

      {/* NOTIFICATION SECTION */}
      <div className="notification-content">

        <div className="notification-section-header">

          <div>
            <h2>Recent Notifications</h2>
            <p>Manage all your healthcare updates in one place.</p>
          </div>

          <button
            className="notification-mark-all"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <CheckCheck size={16} />
            Mark All as Read
          </button>

        </div>

        {/* FILTERS */}
        <div className="notification-filters">

          {["All", "Unread", "Read"].map((filter) => (
            <button
              key={filter}
              className={
                activeFilter === filter ? "active" : ""
              }
              onClick={() => setActiveFilter(filter)}
            >
              {filter}

              {filter === "Unread" && unreadCount > 0 && (
                <span className="notification-filter-count">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}

        </div>

        {/* NOTIFICATION LIST */}
        <div className="notification-list">

          {filteredNotifications.length > 0 ? (

            filteredNotifications.map((item) => (

              <div
                className={`notification-card ${
                  !item.read ? "unread" : ""
                }`}
                key={item.id}
              >

                <div className={`notification-item-icon ${item.type}`}>
                  {getIcon(item.type)}
                </div>

                <div className="notification-item-content">

                  <div className="notification-item-heading">

                    <h3>{item.title}</h3>

                    {!item.read && (
                      <span className="notification-new-badge">
                        New
                      </span>
                    )}

                  </div>

                  <p>{item.message}</p>

                  <span className="notification-date">
                    <Clock size={13} />
                    {item.date}
                  </span>

                  <div className="notification-item-actions">

                    {!item.read && (
                      <button
                        onClick={() => markAsRead(item.id)}
                        className="notification-read-btn"
                      >
                        <Check size={15} />
                        Mark as Read
                      </button>
                    )}

                    <button
                      onClick={() => deleteNotification(item.id)}
                      className="notification-delete-btn"
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>

                  </div>

                </div>

                {!item.read && (
                  <span className="notification-unread-dot"></span>
                )}

              </div>

            ))

          ) : (

            <div className="notification-empty">

              <div>
                <Bell size={30} />
              </div>

              <h3>No notifications found</h3>

              <p>
                There are no {activeFilter.toLowerCase()} notifications
                available right now.
              </p>

            </div>

          )}

        </div>

      </div>

      {/* INFORMATION BOX */}
      <div className="notification-info-box">

        <div className="notification-info-icon">
          <AlertCircle size={21} />
        </div>

        <div>
          <h4>Important Healthcare Updates</h4>

          <p>
            Keep checking your notifications for appointment reminders,
            referral updates and important healthcare information.
          </p>
        </div>

      </div>

      <p className="notification-demo-note">
        Demo notifications are displayed for preview. Real-time alerts
        and notifications will be integrated with the backend later.
      </p>

    </div>
  );
}

export default PatientNotifications;
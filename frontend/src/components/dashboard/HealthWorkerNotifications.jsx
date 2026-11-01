import React, { useMemo, useState } from "react";
import {
  Bell,
  CalendarDays,
  ClipboardList,
  HeartPulse,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Search,
  Check,
  CheckCheck,
  Trash2,
  Filter,
  ArrowRight,
  Info,
  X,
} from "lucide-react";

const initialNotifications = [
  {
    id: 1,
    title: "New Appointment Assigned",
    message:
      "A new patient appointment has been assigned to you. Please review the details.",
    category: "Appointment",
    priority: "Normal",
    date: "Today",
    time: "09:30 AM",
    read: false,
  },
  {
    id: 2,
    title: "Urgent Patient Alert",
    message:
      "Patient Ramesh Kumar requires immediate follow-up due to elevated blood pressure.",
    category: "Urgent",
    priority: "Urgent",
    date: "Today",
    time: "08:45 AM",
    read: false,
  },
  {
    id: 3,
    title: "Referral Status Updated",
    message:
      "Your referral request for Sunita Devi has been accepted by the district hospital.",
    category: "Referral",
    priority: "Normal",
    date: "Yesterday",
    time: "04:15 PM",
    read: false,
  },
  {
    id: 4,
    title: "Patient Follow-up Reminder",
    message:
      "You have a scheduled follow-up visit with Mohan Lal tomorrow.",
    category: "Follow-up",
    priority: "Normal",
    date: "Yesterday",
    time: "02:00 PM",
    read: true,
  },
  {
    id: 5,
    title: "Screening Record Updated",
    message:
      "A patient screening record has been successfully updated.",
    category: "Patient",
    priority: "Normal",
    date: "Oct 30",
    time: "11:20 AM",
    read: true,
  },
  {
    id: 6,
    title: "Monthly Health Report",
    message:
      "Your monthly community health activity report is ready for review.",
    category: "System",
    priority: "Normal",
    date: "Oct 29",
    time: "10:00 AM",
    read: true,
  },
];

const getIcon = (category) => {
  switch (category) {
    case "Appointment":
      return CalendarDays;
    case "Urgent":
      return AlertTriangle;
    case "Referral":
      return ClipboardList;
    case "Follow-up":
      return Clock;
    case "Patient":
      return HeartPulse;
    default:
      return Info;
  }
};

const HealthWorkerNotifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNotification, setSelectedNotification] = useState(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const urgentCount = notifications.filter(
    (n) => n.priority === "Urgent"
  ).length;

  const readCount = notifications.filter((n) => n.read).length;

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const matchesSearch =
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesFilter = true;

      if (activeFilter === "Unread") {
        matchesFilter = !notification.read;
      } else if (activeFilter === "Read") {
        matchesFilter = notification.read;
      } else if (activeFilter === "Urgent") {
        matchesFilter = notification.priority === "Urgent";
      }

      return matchesSearch && matchesFilter;
    });
  }, [notifications, activeFilter, searchTerm]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  const markAsUnread = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, read: false } : item
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
    setSelectedNotification(null);
  };

  const openNotification = (notification) => {
    setSelectedNotification(notification);
    markAsRead(notification.id);
  };

  return (
    <div className="hwn-page">
      {/* Header */}
      <div className="hwn-header">
        <div>
          <div className="hwn-heading-icon">
            <Bell size={21} />
          </div>

          <h1>Notifications</h1>
          <p>
            Stay updated with patient activities, appointments and important
            healthcare alerts.
          </p>
        </div>

        <button className="hwn-mark-all" onClick={markAllAsRead}>
          <CheckCheck size={17} />
          Mark all as read
        </button>
      </div>

      {/* Statistics */}
      <div className="hwn-stats">
        <div className="hwn-stat-card">
          <div className="hwn-stat-icon hwn-blue">
            <Bell size={21} />
          </div>
          <div>
            <span>Total Notifications</span>
            <h2>{notifications.length}</h2>
          </div>
        </div>

        <div className="hwn-stat-card">
          <div className="hwn-stat-icon hwn-orange">
            <Info size={21} />
          </div>
          <div>
            <span>Unread</span>
            <h2>{unreadCount}</h2>
          </div>
        </div>

        <div className="hwn-stat-card">
          <div className="hwn-stat-icon hwn-red">
            <AlertTriangle size={21} />
          </div>
          <div>
            <span>Urgent Alerts</span>
            <h2>{urgentCount}</h2>
          </div>
        </div>

        <div className="hwn-stat-card">
          <div className="hwn-stat-icon hwn-green">
            <CheckCircle2 size={21} />
          </div>
          <div>
            <span>Read</span>
            <h2>{readCount}</h2>
          </div>
        </div>
      </div>

      {/* Notification Content */}
      <div className="hwn-content">
        <div className="hwn-content-header">
          <div>
            <h2>All Notifications</h2>
            <p>Manage your latest updates and alerts.</p>
          </div>

          <div className="hwn-search">
            <Search size={17} />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="hwn-filters">
          <div className="hwn-filter-label">
            <Filter size={16} />
            Filter:
          </div>

          {["All", "Unread", "Read", "Urgent"].map((filter) => (
            <button
              key={filter}
              className={`hwn-filter-btn ${
                activeFilter === filter ? "active" : ""
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
              {filter === "Unread" && unreadCount > 0 && (
                <span>{unreadCount}</span>
              )}
            </button>
          ))}
        </div>

        {/* Notification List */}
        <div className="hwn-list">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => {
              const Icon = getIcon(notification.category);

              return (
                <div
                  key={notification.id}
                  className={`hwn-notification ${
                    !notification.read ? "unread" : ""
                  }`}
                >
                  <div className={`hwn-notification-icon ${notification.category.toLowerCase().replace("-", "")}`}>
                    <Icon size={21} />
                  </div>

                  <div
                    className="hwn-notification-details"
                    onClick={() => openNotification(notification)}
                  >
                    <div className="hwn-title-row">
                      <h3>{notification.title}</h3>

                      {!notification.read && (
                        <span className="hwn-new-badge">New</span>
                      )}

                      {notification.priority === "Urgent" && (
                        <span className="hwn-urgent-badge">Urgent</span>
                      )}
                    </div>

                    <p>{notification.message}</p>

                    <div className="hwn-meta">
                      <span>
                        <CalendarDays size={13} />
                        {notification.date}
                      </span>
                      <span>
                        <Clock size={13} />
                        {notification.time}
                      </span>
                      <span className="hwn-category">
                        {notification.category}
                      </span>
                    </div>
                  </div>

                  <div className="hwn-actions">
                    <button
                      title={notification.read ? "Mark as unread" : "Mark as read"}
                      onClick={() =>
                        notification.read
                          ? markAsUnread(notification.id)
                          : markAsRead(notification.id)
                      }
                    >
                      {notification.read ? (
                        <Bell size={17} />
                      ) : (
                        <Check size={17} />
                      )}
                    </button>

                    <button
                      title="Delete notification"
                      className="hwn-delete"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <Trash2 size={17} />
                    </button>

                    <button
                      title="View details"
                      onClick={() => openNotification(notification)}
                    >
                      <ArrowRight size={17} />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="hwn-empty">
              <div>
                <Bell size={30} />
              </div>
              <h3>No notifications found</h3>
              <p>
                There are no notifications matching your current search or
                filter.
              </p>
              <button
                onClick={() => {
                  setActiveFilter("All");
                  setSearchTerm("");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {selectedNotification && (
        <div
          className="hwn-modal-overlay"
          onClick={() => setSelectedNotification(null)}
        >
          <div className="hwn-modal" onClick={(e) => e.stopPropagation()}>
            <div className="hwn-modal-header">
              <div>
                <span>NOTIFICATION DETAILS</span>
                <h2>{selectedNotification.title}</h2>
              </div>

              <button onClick={() => setSelectedNotification(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="hwn-modal-body">
              <p>{selectedNotification.message}</p>

              <div className="hwn-detail-row">
                <span>Category</span>
                <strong>{selectedNotification.category}</strong>
              </div>

              <div className="hwn-detail-row">
                <span>Priority</span>
                <strong>{selectedNotification.priority}</strong>
              </div>

              <div className="hwn-detail-row">
                <span>Date</span>
                <strong>{selectedNotification.date}</strong>
              </div>

              <div className="hwn-detail-row">
                <span>Time</span>
                <strong>{selectedNotification.time}</strong>
              </div>

              <div className="hwn-detail-row">
                <span>Status</span>
                <strong>
                  {selectedNotification.read ? "Read" : "Unread"}
                </strong>
              </div>
            </div>

            <div className="hwn-modal-footer">
              <button
                className="hwn-modal-delete"
                onClick={() => deleteNotification(selectedNotification.id)}
              >
                <Trash2 size={16} />
                Delete
              </button>

              <button
                className="hwn-modal-close"
                onClick={() => setSelectedNotification(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthWorkerNotifications;
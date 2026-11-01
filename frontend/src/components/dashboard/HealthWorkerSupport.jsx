import React, { useState } from "react";
import {
  Headset,
  Search,
  MessageCircle,
  BookOpen,
  CircleHelp,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  Send,
  FileText,
  ShieldCheck,
  UserRound,
  CalendarDays,
  Wifi,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const faqs = [
  {
    category: "Account",
    question: "How can I update my profile information?",
    answer:
      "Open the My Profile section from the sidebar. Click Edit Profile, update your information and select Save Changes.",
  },
  {
    category: "Patients",
    question: "How can I register a new patient?",
    answer:
      "Open Register Patient from the sidebar. Enter the patient's personal and contact information, provide the required details and submit the registration form.",
  },
  {
    category: "Patients",
    question: "Where can I view registered patients?",
    answer:
      "Navigate to My Patients from the sidebar. You can search patients by name, patient ID, village or medical condition.",
  },
  {
    category: "Appointments",
    question: "How can I schedule a patient appointment?",
    answer:
      "Open Appointments and select the Schedule Appointment option. Enter patient details, doctor information, date and time.",
  },
  {
    category: "Referrals",
    question: "How can I refer a patient to a hospital?",
    answer:
      "Open Referrals and create a new referral. Enter the patient's details, hospital, department, priority and reason for referral.",
  },
  {
    category: "Technical",
    question: "What should I do if the internet connection is unavailable?",
    answer:
      "Check your internet connection and try again. Offline data synchronization depends on the application's offline-storage implementation. Avoid assuming that a record has synced until confirmation is displayed.",
  },
  {
    category: "Technical",
    question: "Is patient information secure?",
    answer:
      "Patient information should only be accessed by authorized users. Always protect your login credentials and avoid sharing patient information with unauthorized people.",
  },
  {
    category: "Account",
    question: "What should I do if I cannot log in?",
    answer:
      "Verify your email and password, check your internet connection and make sure your account is active. Contact your administrator if the problem continues.",
  },
];

const supportTopics = [
  {
    title: "Account & Login",
    description: "Login issues, profile and account access.",
    icon: UserRound,
  },
  {
    title: "Patient Management",
    description: "Patient registration and medical records.",
    icon: FileText,
  },
  {
    title: "Appointments & Referrals",
    description: "Scheduling, referrals and follow-ups.",
    icon: CalendarDays,
  },
  {
    title: "Technical Issues",
    description: "Internet, loading and application problems.",
    icon: Wifi,
  },
];

const HealthWorkerSupport = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedFaq, setExpandedFaq] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    category: "Technical Issue",
    priority: "Normal",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const categories = ["All", "Account", "Patients", "Appointments", "Referrals", "Technical"];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "All" || faq.category === activeCategory;

    const matchesSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Demo submission: connect to backend/Firebase later.
    const supportRequest = {
      ...form,
      submittedAt: new Date().toISOString(),
    };

    console.log("Support Request:", supportRequest);

    setSubmitted(true);

    setForm({
      name: "",
      email: "",
      subject: "",
      category: "Technical Issue",
      priority: "Normal",
      message: "",
    });
  };

  return (
    <div className="hwsup-page">

      {/* Header */}
      <div className="hwsup-header">
        <div>
          <div className="hwsup-heading-icon">
            <Headset size={22} />
          </div>

          <h1>Help & Support</h1>
          <p>
            Find answers, explore help topics and get assistance with
            Aarogya Link.
          </p>
        </div>
      </div>

      {/* Hero Support Card */}
      <div className="hwsup-hero">
        <div className="hwsup-hero-content">
          <span>WE ARE HERE TO HELP</span>
          <h2>How can we help you today?</h2>
          <p>
            Explore our help resources or send us a support request.
            We're here to make your healthcare workflow easier.
          </p>

          <div className="hwsup-hero-search">
            <Search size={19} />
            <input
              type="text"
              placeholder="Search your question..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="hwsup-hero-illustration">
          <div className="hwsup-illustration-circle">
            <Headset size={75} />
            <span>
              <MessageCircle size={24} />
            </span>
          </div>
        </div>
      </div>

      {/* Support Topics */}
      <div className="hwsup-section">
        <div className="hwsup-section-heading">
          <div>
            <h2>Browse Help Topics</h2>
            <p>Choose a category to find relevant assistance.</p>
          </div>
        </div>

        <div className="hwsup-topics-grid">
          {supportTopics.map((topic, index) => {
            const Icon = topic.icon;

            return (
              <div className="hwsup-topic-card" key={index}>
                <div className="hwsup-topic-icon">
                  <Icon size={23} />
                </div>

                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQs */}
      <div className="hwsup-section">
        <div className="hwsup-section-heading">
          <div>
            <h2>Frequently Asked Questions</h2>
            <p>Quick answers to common questions.</p>
          </div>

          <span className="hwsup-faq-count">
            {filteredFaqs.length} Questions
          </span>
        </div>

        <div className="hwsup-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={activeCategory === category ? "active" : ""}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="hwsup-faq-list">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = expandedFaq === faq.question;

              return (
                <div className="hwsup-faq-item" key={index}>
                  <button
                    className="hwsup-faq-question"
                    onClick={() =>
                      setExpandedFaq(isOpen ? null : faq.question)
                    }
                  >
                    <div>
                      <CircleHelp size={18} />
                      <span>{faq.question}</span>
                    </div>

                    {isOpen ? (
                      <ChevronUp size={19} />
                    ) : (
                      <ChevronDown size={19} />
                    )}
                  </button>

                  {isOpen && (
                    <div className="hwsup-faq-answer">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="hwsup-no-results">
              <Search size={25} />
              <h3>No matching questions found</h3>
              <p>Try another keyword or select a different category.</p>
            </div>
          )}
        </div>
      </div>

      {/* Contact Support */}
      <div className="hwsup-contact-layout">

        <div className="hwsup-contact-info">
          <div className="hwsup-contact-icon">
            <MessageCircle size={24} />
          </div>

          <h2>Still need help?</h2>

          <p>
            Couldn't find the answer? Send a support request with your
            problem details.
          </p>

          <div className="hwsup-contact-method">
            <div>
              <Mail size={19} />
            </div>
            <span>
              <small>Email Support</small>
              <strong>support@aarogyalink.in</strong>
            </span>
          </div>

          <div className="hwsup-contact-method">
            <div>
              <Phone size={19} />
            </div>
            <span>
              <small>Support Hours</small>
              <strong>Monday - Saturday</strong>
            </span>
          </div>

          <div className="hwsup-contact-note">
            <ShieldCheck size={18} />
            <span>
              Do not include passwords or unnecessary sensitive patient
              information in support requests.
            </span>
          </div>
        </div>

        <div className="hwsup-contact-form">
          <div className="hwsup-form-heading">
            <h2>Submit a Support Request</h2>
            <p>Tell us how we can assist you.</p>
          </div>

          {submitted && (
            <div className="hwsup-success">
              <CheckCircle2 size={18} />
              Demo request submitted successfully!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="hwsup-form-grid">

              <div className="hwsup-form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="hwsup-form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="hwsup-form-group hwsup-full">
                <label>Subject *</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Briefly describe your issue"
                  value={form.subject}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="hwsup-form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleFormChange}
                >
                  <option>Technical Issue</option>
                  <option>Account & Login</option>
                  <option>Patient Management</option>
                  <option>Appointments</option>
                  <option>Referrals</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="hwsup-form-group">
                <label>Priority</label>
                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleFormChange}
                >
                  <option>Normal</option>
                  <option>High</option>
                  <option>Urgent</option>
                </select>
              </div>

              <div className="hwsup-form-group hwsup-full">
                <label>Describe Your Issue *</label>
                <textarea
                  name="message"
                  placeholder="Explain the problem you are facing..."
                  value={form.message}
                  onChange={handleFormChange}
                  rows="5"
                  required
                />
              </div>

            </div>

            <button type="submit" className="hwsup-submit-btn">
              <Send size={17} />
              Submit Request
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Help Note */}
      <div className="hwsup-bottom-note">
        <AlertCircle size={18} />
        <p>
          For medical emergencies, contact your local emergency services
          or nearest healthcare facility. This support section is for
          application-related assistance only.
        </p>
      </div>

    </div>
  );
};

export default HealthWorkerSupport;
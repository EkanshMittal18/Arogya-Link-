import React, { useState } from "react";
import {
  HelpCircle,
  Search,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  HeartPulse,
  Wifi,
  UserRound,
  Send,
  Headphones,
  AlertTriangle,
  Clock,
  CheckCircle2,
  FileText,
} from "lucide-react";

const faqData = [
  {
    question: "How can I book a doctor appointment?",
    answer:
      "Open My Appointments from your dashboard to view your appointment information. Appointment booking functionality will be connected with the backend.",
    category: "Appointments",
  },
  {
    question: "How can I access my health records?",
    answer:
      "Visit My Health Records to view your consultation details, medical reports and prescriptions stored in your patient account.",
    category: "Health Records",
  },
  {
    question: "What happens if I lose my internet connection?",
    answer:
      "AAROGYA LINK is designed with an offline-first approach. Supported information can be stored locally and synchronized when internet connectivity becomes available.",
    category: "Technical",
  },
  {
    question: "How can I check my referral status?",
    answer:
      "Open My Referrals to check your referral information and its current progress.",
    category: "Referrals",
  },
  {
    question: "How can I update my personal information?",
    answer:
      "Open My Profile and select Edit Profile to update the available personal information.",
    category: "Account",
  },
  {
    question: "Can I get assistance from a community health worker?",
    answer:
      "Yes. Community health workers can assist patients with basic registration, healthcare navigation and referral coordination.",
    category: "Healthcare",
  },
];

function PatientHelp() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [submitted, setSubmitted] = useState(false);

  const [supportForm, setSupportForm] = useState({
    name: "",
    email: "",
    issue: "",
    message: "",
  });

  const categories = [
    "All",
    "Appointments",
    "Health Records",
    "Technical",
    "Referrals",
    "Account",
    "Healthcare",
  ];

  const filteredFaqs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || faq.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const handleFormChange = (e) => {
    setSupportForm({
      ...supportForm,
      [e.target.name]: e.target.value,
    });
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setSupportForm({
      name: "",
      email: "",
      issue: "",
      message: "",
    });
  };

  return (
    <div className="help-page">

      {/* HEADER */}
      <div className="help-header">
        <div>
          <span className="help-eyebrow">WE ARE HERE TO HELP</span>
          <h1>Help & Support</h1>
          <p>
            Find answers, get assistance and learn how to use AAROGYA LINK.
          </p>
        </div>

        <div className="help-header-icon">
          <Headphones size={30} />
        </div>
      </div>

      {/* HERO SUPPORT CARD */}
      <div className="help-hero">

        <div className="help-hero-content">
          <span>SUPPORT CENTER</span>

          <h2>How can we help you today?</h2>

          <p>
            Explore helpful resources, find answers to common questions
            and get assistance with your healthcare journey.
          </p>

          <div className="help-search">
            <Search size={19} />

            <input
              type="text"
              placeholder="Search for help..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

          </div>
        </div>

        <div className="help-hero-illustration">
          <Headphones size={90} />
          <MessageCircle size={35} />
        </div>

      </div>

      {/* SUPPORT OPTIONS */}
      <div className="help-options-grid">

        <div className="help-option-card">
          <div className="help-option-icon green">
            <MessageCircle size={23} />
          </div>

          <h3>General Support</h3>

          <p>
            Get assistance with your account and platform-related questions.
          </p>

          <span>Support assistance</span>
        </div>

        <div className="help-option-card">
          <div className="help-option-icon blue">
            <HeartPulse size={23} />
          </div>

          <h3>Healthcare Assistance</h3>

          <p>
            Learn about healthcare services, referrals and patient support.
          </p>

          <span>Healthcare guidance</span>
        </div>

        <div className="help-option-card">
          <div className="help-option-icon orange">
            <Wifi size={23} />
          </div>

          <h3>Technical Support</h3>

          <p>
            Find help with connectivity, account access and app usage.
          </p>

          <span>Technical guidance</span>
        </div>

      </div>

      {/* FAQ SECTION */}
      <div className="help-section">

        <div className="help-section-heading">
          <div>
            <h2>Frequently Asked Questions</h2>
            <p>Find quick answers to common questions.</p>
          </div>

          <div className="help-faq-icon">
            <HelpCircle size={24} />
          </div>
        </div>

        {/* CATEGORY FILTER */}
        <div className="help-category-filters">

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

        {/* FAQ LIST */}
        <div className="help-faq-list">

          {filteredFaqs.length > 0 ? (

            filteredFaqs.map((faq, index) => (

              <div className="help-faq-item" key={faq.question}>

                <button
                  className="help-faq-question"
                  onClick={() =>
                    setActiveFaq(activeFaq === faq.question ? null : faq.question)
                  }
                >
                  <div>
                    <span className="help-faq-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span>{faq.question}</span>
                  </div>

                  {activeFaq === faq.question ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}

                </button>

                {activeFaq === faq.question && (
                  <div className="help-faq-answer">
                    {faq.answer}
                  </div>
                )}

              </div>

            ))

          ) : (

            <div className="help-no-results">
              <Search size={28} />
              <h3>No results found</h3>
              <p>Try searching with different keywords.</p>
            </div>

          )}

        </div>

      </div>

      {/* EMERGENCY ASSISTANCE */}
      <div className="help-emergency">

        <div className="help-emergency-icon">
          <AlertTriangle size={26} />
        </div>

        <div className="help-emergency-content">
          <h3>Need Emergency Medical Assistance?</h3>

          <p>
            If someone is experiencing a serious medical emergency,
            seek immediate professional medical assistance.
          </p>

          <strong>India Emergency Number: 112</strong>
        </div>

        <a href="tel:112" className="help-emergency-btn">
          <Phone size={17} />
          Call 112
        </a>

      </div>

      {/* SUPPORT FORM */}
      <div className="help-section help-contact-section">

        <div className="help-section-heading">
          <div>
            <h2>Contact Support</h2>
            <p>Send us your question or describe the issue you're facing.</p>
          </div>

          <div className="help-faq-icon">
            <Mail size={23} />
          </div>
        </div>

        {submitted && (
          <div className="help-success-message">
            <CheckCircle2 size={19} />
            Your support request has been submitted in this preview.
          </div>
        )}

        <form className="help-contact-form" onSubmit={handleSubmit}>

          <div className="help-form-grid">

            <div className="help-form-field">
              <label>Your Name</label>

              <div className="help-input-wrapper">
                <UserRound size={17} />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={supportForm.name}
                  onChange={handleFormChange}
                  required
                />
              </div>
            </div>

            <div className="help-form-field">
              <label>Email Address</label>

              <div className="help-input-wrapper">
                <Mail size={17} />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={supportForm.email}
                  onChange={handleFormChange}
                  required
                />
              </div>
            </div>

          </div>

          <div className="help-form-field">
            <label>Issue Category</label>

            <select
              name="issue"
              value={supportForm.issue}
              onChange={handleFormChange}
              required
            >
              <option value="">Select an issue</option>
              <option value="Account Problem">Account Problem</option>
              <option value="Appointment Assistance">Appointment Assistance</option>
              <option value="Health Records">Health Records</option>
              <option value="Technical Issue">Technical Issue</option>
              <option value="Referral Assistance">Referral Assistance</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="help-form-field">
            <label>Describe Your Issue</label>

            <textarea
              name="message"
              placeholder="Write your message here..."
              rows="5"
              value={supportForm.message}
              onChange={handleFormChange}
              required
            />
          </div>

          <button type="submit" className="help-submit-btn">
            <Send size={17} />
            Submit Support Request
          </button>

        </form>

      </div>

      {/* ADDITIONAL INFORMATION */}
      <div className="help-bottom-grid">

        <div className="help-bottom-card">
          <Clock size={22} />
          <h4>Support Availability</h4>
          <p>Contact your local healthcare worker for assistance.</p>
        </div>

        <div className="help-bottom-card">
          <ShieldCheck size={22} />
          <h4>Privacy & Security</h4>
          <p>Your health information should remain private and protected.</p>
        </div>

        <div className="help-bottom-card">
          <FileText size={22} />
          <h4>Patient Guidance</h4>
          <p>Get help understanding the different dashboard sections.</p>
        </div>

      </div>

      <p className="help-demo-note">
        This is a demonstration support interface. Support requests are
        not sent to a server until backend integration is completed.
      </p>

    </div>
  );
}

export default PatientHelp;
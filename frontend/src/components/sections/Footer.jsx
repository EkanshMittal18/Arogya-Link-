import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer" id="footer">

      {/* Main Footer */}
      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-brand">
          <a href="#home" className="footer-logo">
            <span className="logo-icon">✚</span>
            AAROGYA<span>LINK</span>
          </a>

          <p className="footer-description">
            Bridging the gap between communities and quality healthcare.
            Connecting people, healthcare workers, and medical services
            for a healthier tomorrow.
          </p>

          <div className="footer-status">
            <span className="status-dot"></span>
            Healthcare Without Boundaries
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Explore</h3>
          <a href="#home">Home</a>
          <a href="#healthcare-gap">The Healthcare Gap</a>
          <a href="#our-solution">Our Solution</a>
          <a href="#features">Core Features</a>
        </div>

        {/* Platform */}
        <div className="footer-links">
          <h3>Our Platform</h3>
          <a href="#how-it-works">How It Works</a>
          <a href="#designed-for-everyone">Designed for Everyone</a>
          <a href="#trust-accessibility">Trust & Accessibility</a>
        </div>

        {/* Mission */}
        <div className="footer-mission">
          <h3>Our Mission</h3>
          <p>
            Healthcare should never be limited by geography,
            connectivity, or accessibility.
          </p>

          <a href="#home" className="footer-back-top">
            Back to Top ↑
          </a>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} AarogyaLink. All rights reserved.
        </p>

        <p className="footer-tagline">
          Designed with purpose. Built for everyone.
        </p>
      </div>

    </footer>
  );
};

export default Footer;
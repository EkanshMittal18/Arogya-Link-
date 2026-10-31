
import React from "react";
import { HeartPulse, Users, Activity, WifiOff } from "lucide-react";
import "./Auth.css";

function AuthLayout({ children }) {
  return (
    <main className="auth-page">
      {/* LEFT SIDE */}
      <section className="auth-visual">
        <div className="auth-visual-content">
          <h1>
            Better Healthcare.
            <br />
            <span>Everywhere.</span>
            <br />
            For Everyone.
          </h1>

          <div className="auth-doctor-wrap">
            <div className="auth-doctor-circle" />
            <img
              src="/doctor.png"
              alt="Healthcare professional"
              className="auth-doctor-image"
            />
            <span className="auth-plus">+</span>
          </div>

          <div className="auth-benefits">
            <div className="auth-benefit">
              <span className="auth-benefit-icon">
                <Users size={22} />
              </span>
              <span>Connect with<br />Qualified Doctors</span>
            </div>

            <div className="auth-benefit">
              <span className="auth-benefit-icon purple">
                <Activity size={22} />
              </span>
              <span>AI-assisted<br />Clinical Support</span>
            </div>

            <div className="auth-benefit">
              <span className="auth-benefit-icon mint">
                <WifiOff size={22} />
              </span>
              <span>Works Online &<br />Offline</span>
            </div>
          </div>
        </div>
      </section>

      {/* RIGHT SIDE */}
      <section className="auth-form-section">
        <div className="auth-form-card">
          <a href="/" className="auth-brand">
            <span className="auth-brand-icon">
              <HeartPulse size={30} strokeWidth={2.3} />
            </span>
            <span>
              AAROGYA<span>LINK</span>
            </span>
          </a>

          {children}
        </div>
      </section>
    </main>
  );
}

export default AuthLayout;

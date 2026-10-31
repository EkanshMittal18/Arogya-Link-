
import React, { useState } from "react";

import {
  Users,
  BriefcaseMedical,
  Stethoscope,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import "./Auth.css";

const roles = [
  {
    id: "patient",
    label: "Patient",
    icon: Users,
  },
  {
    id: "health_worker",
    label: "Health Worker",
    icon: BriefcaseMedical,
  },
  {
    id: "doctor",
    label: "Doctor",
    icon: Stethoscope,
  },
];

function Signup() {
  const [selectedRole, setSelectedRole] = useState("patient");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage(
      `Signup form is ready for ${selectedRole.replace("_", " ")}. Backend registration will be connected later.`
    );
  };

  return (
    <AuthLayout>
      <div className="auth-heading signup-heading">
        <h2>Create an Account</h2>
        <p>Join AAROGYA LINK and be part of connected care</p>
      </div>

      <form className="auth-form signup-form" onSubmit={handleSubmit}>
        <div className="auth-role-section">
          <label className="auth-role-title">I am a</label>

          <div className="auth-role-grid">
            {roles.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;

              return (
                <button
                  key={role.id}
                  type="button"
                  className={`auth-role-card ${
                    isSelected ? "selected" : ""
                  }`}
                  onClick={() => setSelectedRole(role.id)}
                  aria-pressed={isSelected}
                >
                  <Icon size={25} />
                  <span>{role.label}</span>
                  <span className="auth-role-radio">
                    {isSelected && <span />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="auth-field">
          <label htmlFor="signup-name">Full Name</label>

          <div className="auth-input-wrap">
            <User size={19} />
            <input
              id="signup-name"
              type="text"
              placeholder="Enter your full name"
              required
            />
          </div>
        </div>

        <div className="auth-field">
          <label htmlFor="signup-email">Email Address</label>

          <div className="auth-input-wrap">
            <Mail size={19} />
            <input
              id="signup-email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div className="auth-field">
          <label htmlFor="signup-phone">Phone Number</label>

          <div className="auth-input-wrap">
            <Phone size={19} />
            <input
              id="signup-phone"
              type="tel"
              placeholder="Enter your phone number"
              required
            />
          </div>
        </div>

        <div className="auth-field">
          <label htmlFor="signup-password">Password</label>

          <div className="auth-input-wrap">
            <Lock size={19} />
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              minLength={8}
              required
            />

            <button
              type="button"
              className="auth-eye-button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>
        </div>

        <button type="submit" className="auth-submit signup-submit">
          Sign Up <ArrowRight size={21} />
        </button>

        {message && (
          <p className="auth-message">
            <CheckCircle2 size={17} />
            {message}
          </p>
        )}
      </form>

      <p className="auth-switch signup-switch">
        Already have an account?
        <Link to="/login"> Login</Link>
      </p>
    </AuthLayout>
  );
}

export default Signup;

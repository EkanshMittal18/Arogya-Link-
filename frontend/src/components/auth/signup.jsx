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

import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import AuthLayout from "./AuthLayout";
import { auth, db } from "../../firebase/firebase";
import "./Auth.css";

const roles = [
  { id: "patient", label: "Patient", icon: Users },
  { id: "health_worker", label: "Health Worker", icon: BriefcaseMedical },
  { id: "doctor", label: "Doctor", icon: Stethoscope },
];

function Signup() {
  const [selectedRole, setSelectedRole] = useState("patient");
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      // Create Firebase account
      const cleanName = name.trim();
const cleanEmail = email.trim();
const cleanPhone = phone.trim();

const userCredential = await createUserWithEmailAndPassword(
  auth,
  cleanEmail,
  password
);

      const user = userCredential.user;

      // Save user's display name
      await updateProfile(user, {
        displayName: cleanName,
      });

      // Save user profile and role in Firestore
await setDoc(doc(db, "users", user.uid), {
  uid: user.uid,
  name: cleanName,
  email: cleanEmail,
  phone: cleanPhone,
  role: selectedRole,
  createdAt: serverTimestamp(),
  status: selectedRole === "doctor" ? "pending" : "active",
});

      setMessage("Account created successfully!");

      console.log("Registered User:", {
        uid: user.uid,
        name,
        email,
        phone,
        role: selectedRole,
      });

      // Redirect after successful signup
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      console.error("Signup Error:", err);

      switch (err.code) {
        case "auth/email-already-in-use":
          setError("This email is already registered. Please login.");
          break;

        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;

        case "auth/weak-password":
          setError("Password must be at least 6 characters.");
          break;

        case "auth/network-request-failed":
          setError("Network error. Please check your internet connection.");
          break;

        default:
          setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="auth-heading signup-heading">
        <h2>Create Your Account</h2>
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
                  className={`auth-role-card ${isSelected ? "selected" : ""}`}
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
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

        <button
          type="submit"
          className="auth-submit signup-submit"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Sign Up"}
          {!loading && <ArrowRight size={21} />}
        </button>

        {message && (
          <p className="auth-message">
            <CheckCircle2 size={17} />
            {message}
          </p>
        )}

        {error && (
          <p className="auth-error">
            {error}
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
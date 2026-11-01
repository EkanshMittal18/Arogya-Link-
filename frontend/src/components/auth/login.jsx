import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Globe,
  CheckCircle2,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  signOut,
} from "firebase/auth";

import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../../firebase/firebase";
import AuthLayout from "./AuthLayout";
import "./Auth.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [email, setEmail] = useState("");
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
    // Set login persistence
    await setPersistence(
      auth,
      rememberMe
        ? browserLocalPersistence
        : browserSessionPersistence
    );

    // Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );

    const user = userCredential.user;

    // Fetch user role from Firestore
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      setError("User profile not found. Please contact support.");
      await signOut(auth);
      return;
    }

    const userData = userSnap.data();

    // Check account status
    if (userData.status !== "active") {
      setError("Your account is pending approval or inactive.");
      await signOut(auth);
      return;
    }

    setMessage("Login successful!");

    // Role-based navigation
    switch (userData.role) {
      case "patient":
        navigate("/patient-preview");
        break;

      case "health_worker":
        navigate("/health-worker-dashboard");
        break;

      case "doctor":
        navigate("/doctor");
        break;

      default:
        setError("Invalid account role.");
        await signOut(auth);
    }

  } catch (err) {
    console.error("Login Error:", err);

    switch (err.code) {
      case "auth/invalid-credential":
        setError("Invalid email or password.");
        break;

      case "auth/invalid-email":
        setError("Please enter a valid email.");
        break;

      case "auth/too-many-requests":
        setError("Too many attempts. Please try again later.");
        break;

      case "auth/network-request-failed":
        setError("Network error. Check your internet connection.");
        break;

      default:
        setError(err.message || "Login failed.");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <AuthLayout>
      <div className="auth-heading">
        <h2>Welcome Back</h2>
        <p>Login to your AAROGYA LINK account</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label htmlFor="login-email">Email Address</label>

          <div className="auth-input-wrap">
            <Mail size={20} />
            <input
  id="login-email"
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>
          </div>
        </div>

        <div className="auth-field">
          <label htmlFor="login-password">Password</label>

          <div className="auth-input-wrap">
            <Lock size={20} />
           <input
  id="login-password"
  type={showPassword ? "text" : "password"}
  placeholder="Enter your password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
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

        <div className="auth-options">
          <label className="auth-remember">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span>Remember me</span>
          </label>

          <a href="/forgot-password" className="auth-text-link">
            Forgot Password?
          </a>
        </div>

        <button
  type="submit"
  className="auth-submit"
  disabled={loading}
>
  {loading ? "Logging in..." : "Login"}
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

      <div className="auth-divider">
        <span />
        or continue with
        <span />
      </div>

      <div className="auth-social-buttons">
        <button type="button" className="auth-social-button">
          <Globe size={21} className="google-icon" />
          Continue with Google
        </button>

        <button type="button" className="auth-social-button">
          <span className="microsoft-icon">
            <i />
            <i />
            <i />
            <i />
          </span>
          Continue with Microsoft
        </button>
      </div>

      <p className="auth-switch">
        Don't have an account?
       <Link to="/signup"> Sign Up</Link>
      </p>
    </AuthLayout>
  );
}

export default Login;

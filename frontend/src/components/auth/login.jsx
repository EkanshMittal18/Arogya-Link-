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

import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import "./Auth.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Login UI is ready. Backend authentication will be connected later.");
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

        <button type="submit" className="auth-submit">
          Login <ArrowRight size={21} />
        </button>

        {message && (
          <p className="auth-message">
            <CheckCircle2 size={17} />
            {message}
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

// ============================================================

// AAROGYA LINK — HERO SECTION

// React + Tailwind CSS v4 + Lucide React

// ============================================================

import { useState, useEffect} from "react";

import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase/firebase";
import { Navigate, useLocation } from "react-router-dom";

import PatientDashboard from "./components/dashboard/PatientDashboard";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import HealthWorkerDashboard from "./components/dashboard/HealthWorkerDashboard";

import HealthcareGap from "./components/sections/HealthcareGap";

import OurSolution from "./components/sections/OurSolution";
import CoreFeatures from "./components/sections/CoreFeatures";
import HowItWorks from "./components/sections/HowItWorks";
import DesignedForEveryone from "./components/sections/DesignedForEveryone";
import TrustAccessibility from "./components/sections/TrustAccessibility";
import Footer from "./components/sections/Footer";
import DoctorDashboard from "./components/dashboard/DoctorDashboard";

import {

  HeartPulse,

  Menu,

  X,

  ArrowRight,

  ShieldCheck,

  Users,

  Activity,

  Stethoscope,

  ClipboardList,

  ChevronRight,

  WifiOff,

} from "lucide-react";

function HomePage() {

  // ==========================================================

  // 1. MOBILE MENU STATE

  // ==========================================================

  const [menuOpen, setMenuOpen] = useState(false);

  // ==========================================================

  // 2. NAVIGATION LINKS

  // ==========================================================

  const navigation = [

    { name: "Home", href: "#home" },

    { name: "The Gap", href: "#gap" },

    { name: "Our Solution", href: "#solution" },

    { name: "Features", href: "#features" },

    { name: "How It Works", href: "#workflow" },

    { name: "Who It's For", href: "#audience" },

    { name: "Trust & Safety", href: "#trust" },

  ];

  // ==========================================================

  // 3. HEALTHCARE JOURNEY CARDS

  // ==========================================================

  const careSteps = [

    {

      icon: Users,

      title: "Patient Intake",

      description: "Local language & history",

      color: "bg-orange-100 text-orange-600",

    },

    {

      icon: Activity,

      title: "AI Assistance",

      description: "Structured clinical summary",

      color: "bg-purple-100 text-purple-600",

    },

    {

      icon: Stethoscope,

      title: "Doctor Review",

      description: "Qualified professional review",

      color: "bg-emerald-100 text-emerald-600",

    },

    {

      icon: ClipboardList,

      title: "Referral & Follow-up",

      description: "Connected care journey",

      color: "bg-orange-100 text-orange-600",

    },

  ];

  // ==========================================================

  // 4. MAIN WEBSITE

  // ==========================================================

  return (

    <main className="min-h-screen w-full overflow-x-clip bg-white">

      {/* ======================================================

          SECTION 1 — NAVIGATION BAR

      ====================================================== */}

      <header className="sticky top-0 z-50 w-full border-b border-emerald-100/80 bg-white/95 shadow-[0_4px_20px_rgba(20,80,55,0.04)] backdrop-blur-xl">

        <nav className="mx-auto flex h-[76px] max-w-[1720px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12 2xl:px-14">

          {/* LOGO */}

          <a

            href="#home"

            className="flex shrink-0 items-center gap-3"

            onClick={() => setMenuOpen(false)}

          >

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e3f6ed] text-[#15966e]">

              <HeartPulse size={29} strokeWidth={2.2} />

            </div>

            <span className="font-display text-xl font-extrabold tracking-[-1.2px] text-[#173b3a] sm:text-2xl">

              AAROGYA<span className="text-[#15966e]">LINK</span>

            </span>

          </a>

          {/* DESKTOP NAVIGATION */}

          <div className="hidden flex-1 items-center justify-center gap-4 lg:flex 2xl:gap-6">

            {navigation.map((item, index) => (

              <a

                key={item.name}

                href={item.href}

                className={`whitespace-nowrap text-[11px] font-bold transition duration-200 2xl:text-xs ${

                  index === 0

                    ? "border-b-2 border-[#15966e] py-2 text-[#15966e]"

                    : "text-[#344e48] hover:text-[#15966e]"

                }`}

              >

                {item.name}

              </a>

            ))}

          </div>

          {/* LOGIN AND SIGNUP */}

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
  <Link
    to="/login"
    className="rounded-full border border-[#15966e] px-6 py-2.5 text-sm font-bold !text-[#168b68] transition hover:bg-[#eaf6ef]"
  >
    Login
  </Link>

  <Link
  to="/signup"
  className="rounded-full bg-[#168b68] px-7 py-2.5 text-sm font-bold !text-white shadow-sm transition hover:bg-[#106e53]"
>
  Sign Up
</Link>

          </div>

          {/* MOBILE MENU BUTTON */}

          <button

            type="button"

            onClick={() => setMenuOpen(!menuOpen)}

            aria-label="Toggle navigation"

            aria-expanded={menuOpen}

            className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf6ef] text-[#168b68] lg:hidden"

          >

            {menuOpen ? <X size={24} /> : <Menu size={24} />}

          </button>

        </nav>

        {/* MOBILE NAVIGATION DROPDOWN */}

        {menuOpen && (

          <div className="absolute left-0 top-full z-50 max-h-[80vh] w-full overflow-y-auto border-t border-emerald-100 bg-white px-5 py-5 shadow-xl lg:hidden">

            <div className="flex flex-col gap-1">

              {navigation.map((item) => (

                <a

                  key={item.name}

                  href={item.href}

                  onClick={() => setMenuOpen(false)}

                  className="rounded-xl px-4 py-3 text-sm font-semibold text-[#405b55] hover:bg-[#eaf6ef] hover:text-[#168b68]"

                >

                  {item.name}

                </a>

              ))}

            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">

              <a

                href="#access"

                onClick={() => setMenuOpen(false)}

                className="rounded-full border border-[#168b68] py-3 text-center text-sm font-bold text-[#168b68]"

              >

                Login

              </a>

              <a

                href="#access"

                onClick={() => setMenuOpen(false)}

                className="rounded-full bg-[#168b68] py-3 text-center text-sm font-bold text-white"

              >

                Sign Up

              </a>

            </div>

          </div>

        )}

      </header>

      {/* ======================================================

          SECTION 2 — HERO SECTION

      ====================================================== */}

      <section

        id="home"

        className="relative isolate min-h-[700px] overflow-hidden bg-gradient-to-br from-[#f0fbf6] via-[#f8fcfa] to-[#e6f8ee]"

      >

        {/* BACKGROUND CIRCULAR GLOW */}

        <div className="pointer-events-none absolute -right-32 top-10 h-[600px] w-[600px] rounded-full bg-[#bdeed8]/40 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-[#d5f3e4]/70 blur-3xl" />

        {/* HERO CONTAINER */}

        <div className="relative mx-auto grid min-h-[700px] max-w-[1720px] grid-cols-1 items-center gap-8 px-5 py-14 sm:px-8 md:px-12 lg:grid-cols-2 lg:gap-5 lg:px-14 lg:py-16 xl:px-20 2xl:px-24">

          {/* ==================================================

              LEFT SIDE — HERO CONTENT

          ================================================== */}

          <div className="relative z-20 w-full max-w-[720px]">

            {/* BADGE */}

            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-emerald-100 bg-white/70 px-5 py-3 text-[11px] font-extrabold tracking-[1.1px] text-[#168b68] sm:text-xs">

              <span className="h-2.5 w-2.5 rounded-full bg-[#15966e]" />

              HEALTHCARE WITHOUT BARRIERS

            </div>

            {/* MAIN HEADING */}

            <h1 className="font-display text-[42px] font-extrabold leading-[1.12] tracking-[-2px] text-[#152b43] min-[375px]:text-[46px] sm:text-[57px] md:text-[65px] lg:text-[53px] xl:text-[64px] 2xl:text-[72px]">

              Better Healthcare.

              <br />

              <span className="text-[#15966e]">

                Everywhere.

              </span>

              <br />

              For Everyone.

            </h1>

            {/* DESCRIPTION */}

            <p className="mt-7 max-w-[620px] text-[15px] leading-[1.85] text-[#627873] sm:text-base md:text-lg">

              Connecting rural communities, community health workers

              and qualified doctors through one intelligent,

              offline-first healthcare platform.

            </p>

            {/* GET STARTED BUTTON */}

            <div className="mt-8">

              <a

                href="#access"

                className="inline-flex items-center gap-4 rounded-full bg-gradient-to-r from-[#15966e] to-[#078d61] px-8 py-4 text-base font-bold !text-white shadow-lg shadow-emerald-900/15 transition duration-300 hover:-translate-y-1 hover:shadow-xl"

              >

                Get Started

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">

                  <ArrowRight size={18} />

                </span>

              </a>

            </div>

            {/* TRUST LINE */}

            <div className="mt-7 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#526f65] sm:text-sm">

              <ShieldCheck size={21} className="text-[#15966e]" />

              <span>

                Privacy-focused · Human-led healthcare · AI-assisted

              </span>

            </div>

          </div>

          {/* ==================================================

              RIGHT SIDE — DOCTOR VISUAL

          ================================================== */}

          <div className="relative mx-auto flex min-h-[520px] w-full max-w-[700px] items-center justify-center sm:min-h-[620px] lg:min-h-[650px]">

            {/* GREEN CIRCLE */}

            <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[22px] border-[#b9ebd5] bg-[#d2f4e5] sm:h-[450px] sm:w-[450px] sm:border-[30px] lg:h-[480px] lg:w-[480px] xl:h-[530px] xl:w-[530px]" />

            {/* DECORATIVE PLUS */}

            <div className="absolute right-[8%] top-[7%] z-10 text-[#6ed0a8]">

              <span className="text-7xl font-light sm:text-8xl">

                +

              </span>

            </div>

            {/* DOCTOR IMAGE */}

            <div className="absolute bottom-0 left-1/2 z-10 flex h-[430px] w-full -translate-x-1/2 items-end justify-center sm:h-[530px] lg:h-[590px] xl:h-[640px]">

              <img

                src="/doctor.png"

                alt="Healthcare professional"

                className="h-full max-w-full object-contain object-bottom drop-shadow-[0_15px_30px_rgba(21,60,55,0.12)]"

              />

            </div>

            {/* ==================================================

                CONNECTED CARE FLOATING CARD

            ================================================== */}

            <div className="absolute left-0 top-[12%] z-30 w-[195px] rounded-[22px] border border-white bg-white/95 p-3.5 shadow-xl backdrop-blur-md sm:left-0 sm:w-[250px] sm:p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e3f5ec] text-[#15966e] sm:h-12 sm:w-12">

                  <HeartPulse size={26} />

                </div>

                <div className="min-w-0">

                  <h3 className="text-sm font-extrabold text-[#173b3a]">

                    Connected Care

                  </h3>

                  <p className="mt-1 text-[11px] text-gray-500 sm:text-xs">

                    One healthcare journey

                  </p>

                </div>

              </div>

              <div className="mt-3 flex items-center gap-2 text-[11px] font-bold text-[#168b68] sm:text-xs">

                <span className="h-2.5 w-2.5 rounded-full bg-[#15966e]" />

                <WifiOff size={15} />

                Offline Ready

              </div>

            </div>

            {/* ==================================================

                PATIENT JOURNEY FLOATING CARD

            ================================================== */}

            <div className="absolute right-0 top-[29%] z-30 w-[210px] rounded-[22px] border border-white/90 bg-white/95 p-2.5 shadow-2xl backdrop-blur-xl sm:w-[270px] sm:p-3.5 lg:right-0 xl:w-[300px]">

              {careSteps.map((step, index) => {

                const Icon = step.icon;

                return (

                  <div

                    key={step.title}

                    className={`flex items-center gap-2.5 py-3 sm:gap-3 ${

                      index !== careSteps.length - 1

                        ? "border-b border-gray-100"

                        : ""

                    }`}

                  >

                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11 ${step.color}`}>

                      <Icon size={21} />

                    </div>

                    <div className="min-w-0 flex-1">

                      <h4 className="text-[11px] font-extrabold text-[#173b3a] sm:text-sm">

                        {step.title}

                      </h4>

                      <p className="mt-1 text-[9px] text-gray-500 sm:text-[11px]">

                        {step.description}

                      </p>

                    </div>

                    <ChevronRight

                      size={18}

                      className="shrink-0 text-[#168b68]"

                    />

                  </div>

                );

              })}

            </div>

          </div>

        </div>

        {/* BOTTOM GREEN WAVE */}

        <div className="pointer-events-none absolute bottom-0 left-0 h-8 w-full rounded-t-[50%] bg-white/70" />

      </section>

{/* SECTION 3 — THE HEALTHCARE GAP */}

<HealthcareGap />

{/* SECTION: OUR SOLUTION */}

<OurSolution />

{/* SECTION: CORE FEATURES */}

<CoreFeatures />

{/* SECTION: HOW IT WORKS */}

<HowItWorks />

{/* SECTION: DESIGNED FOR EVERYONE */}

<DesignedForEveryone />

{/* SECTION: TRUST & ACCESSIBILITY */}

<TrustAccessibility />

{/* SECTION: FOOTER */}

<Footer />
    </main>



  );

}

// ============================================================

// 5. EXPORT

// ============================================================

// MAIN APP ROUTING
// ============================================================
// PROTECTED ROUTE — ROLE BASED DASHBOARD ACCESS
// ============================================================

function ProtectedRoute({ children, allowedRole }) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setProfile(userSnap.data());
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error("Profile verification error:", error);
        setProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (!profile || profile.status !== "active") {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  if (profile.role !== allowedRole) {
    const routes = {
      patient: "/patient-preview",
      doctor: "/doctor",
      health_worker: "/health-worker-dashboard",
    };

    return (
      <Navigate
        to={routes[profile.role] || "/login"}
        replace
      />
    );
  }

  return children;
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
<Route path="/" element={<HomePage />} />

<Route path="/login" element={<Login />} />

<Route path="/signup" element={<Signup />} />

{/* PATIENT DASHBOARD */}
<Route
  path="/patient-preview"
  element={
    <ProtectedRoute allowedRole="patient">
      <PatientDashboard />
    </ProtectedRoute>
  }
/>

{/* DOCTOR DASHBOARD */}
<Route
  path="/doctor"
  element={
    <ProtectedRoute allowedRole="doctor">
      <DoctorDashboard />
    </ProtectedRoute>
  }
/>

{/* HEALTH WORKER DASHBOARD */}
<Route
  path="/health-worker-dashboard"
  element={
    <ProtectedRoute allowedRole="health_worker">
      <HealthWorkerDashboard />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
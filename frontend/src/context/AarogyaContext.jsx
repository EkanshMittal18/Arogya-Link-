import React, { createContext, useContext, useState, useEffect } from "react";

// Initial seed data shared across all 3 dashboards
const INITIAL_PATIENTS = [
  {
    id: "AL-1024",
    name: "Rahul Sharma",
    age: 32,
    gender: "Male",
    dob: "1994-04-12",
    phone: "9876543210",
    village: "Rampur",
    district: "Moradabad",
    state: "Uttar Pradesh",
    pincode: "244001",
    address: "House 45, Rampur Village, Moradabad",
    bloodGroup: "B+",
    emergencyName: "Sunil Sharma",
    emergencyPhone: "9876543219",
    medicalHistory: "Mild seasonal allergies, hypertension under observation",
    existingConditions: ["High Blood Pressure"],
    condition: "Hypertension",
    status: "Active",
    registeredDate: "2026-10-12",
    lastVisit: "2026-11-01",
    vitals: {
      bloodPressure: "135/88",
      temperature: "98.6 °F",
      heartRate: "76 bpm",
      oxygen: "98%",
      weight: "68 kg",
      height: "172 cm",
      lastScreeningDate: "2026-11-01",
    },
    initials: "RS",
  },
  {
    id: "AL-1025",
    name: "Priya Verma",
    age: 26,
    gender: "Female",
    dob: "2000-08-20",
    phone: "9876543211",
    village: "Shivpur",
    district: "Moradabad",
    state: "Uttar Pradesh",
    pincode: "244001",
    address: "Near Post Office, Shivpur",
    bloodGroup: "O+",
    emergencyName: "Rohan Verma",
    emergencyPhone: "9876543220",
    medicalHistory: "Recovering from viral respiratory illness",
    existingConditions: ["Asthma"],
    condition: "Fever & Cold",
    status: "Follow-up",
    registeredDate: "2026-10-14",
    lastVisit: "2026-10-31",
    vitals: {
      bloodPressure: "118/76",
      temperature: "99.2 °F",
      heartRate: "82 bpm",
      oxygen: "97%",
      weight: "54 kg",
      height: "160 cm",
      lastScreeningDate: "2026-10-31",
    },
    initials: "PV",
  },
  {
    id: "AL-1026",
    name: "Amit Kumar",
    age: 45,
    gender: "Male",
    dob: "1981-01-15",
    phone: "9876543212",
    village: "Lakshmipur",
    district: "Moradabad",
    state: "Uttar Pradesh",
    pincode: "244002",
    address: "Ward 3, Main Market, Lakshmipur",
    bloodGroup: "A+",
    emergencyName: "Kavita Devi",
    emergencyPhone: "9876543221",
    medicalHistory: "Type 2 Diabetes diagnosed 2 years ago",
    existingConditions: ["Diabetes"],
    condition: "Diabetes",
    status: "Active",
    registeredDate: "2026-10-18",
    lastVisit: "2026-10-30",
    vitals: {
      bloodPressure: "128/82",
      temperature: "98.4 °F",
      heartRate: "72 bpm",
      oxygen: "99%",
      weight: "74 kg",
      height: "168 cm",
      lastScreeningDate: "2026-10-30",
    },
    initials: "AK",
  },
  {
    id: "AL-1027",
    name: "Neha Singh",
    age: 29,
    gender: "Female",
    dob: "1997-06-11",
    phone: "9876543213",
    village: "Rampur",
    district: "Moradabad",
    state: "Uttar Pradesh",
    pincode: "244001",
    address: "Lane 2, Rampur Village",
    bloodGroup: "AB+",
    emergencyName: "Ajay Singh",
    emergencyPhone: "9876543222",
    medicalHistory: "Frequent migraines triggered by stress",
    existingConditions: ["Other"],
    condition: "Migraine",
    status: "Active",
    registeredDate: "2026-10-20",
    lastVisit: "2026-10-29",
    vitals: {
      bloodPressure: "115/75",
      temperature: "98.2 °F",
      heartRate: "70 bpm",
      oxygen: "99%",
      weight: "58 kg",
      height: "163 cm",
      lastScreeningDate: "2026-10-29",
    },
    initials: "NS",
  },
  {
    id: "AL-1028",
    name: "Vikash Gupta",
    age: 51,
    gender: "Male",
    dob: "1975-09-03",
    phone: "9876543214",
    village: "Shivpur",
    district: "Moradabad",
    state: "Uttar Pradesh",
    pincode: "244001",
    address: "Opposite Panchayat Bhavan, Shivpur",
    bloodGroup: "O-",
    emergencyName: "Meena Gupta",
    emergencyPhone: "9876543223",
    medicalHistory: "Hypertension & borderline blood sugar",
    existingConditions: ["High Blood Pressure", "Diabetes"],
    condition: "Blood Pressure",
    status: "Follow-up",
    registeredDate: "2026-10-22",
    lastVisit: "2026-10-28",
    vitals: {
      bloodPressure: "142/90",
      temperature: "98.8 °F",
      heartRate: "80 bpm",
      oxygen: "96%",
      weight: "82 kg",
      height: "170 cm",
      lastScreeningDate: "2026-10-28",
    },
    initials: "VG",
  },
];

const INITIAL_APPOINTMENTS = [
  {
    id: "APT-1001",
    patientId: "AL-1024",
    patient: "Rahul Sharma",
    doctor: "Dr. Amit Sharma",
    doctorSpecialty: "General Physician",
    date: "2026-11-12",
    time: "10:00 AM",
    type: "Hospital Visit",
    mode: "In-Person",
    location: "District Government Hospital",
    reason: "Hypertension & routine health follow-up",
    status: "Upcoming",
    initials: "RS",
    createdBy: "doctor",
  },
  {
    id: "APT-1002",
    patientId: "AL-1025",
    patient: "Priya Verma",
    doctor: "Dr. Neha Verma",
    doctorSpecialty: "General Medicine",
    date: "2026-11-14",
    time: "11:30 AM",
    type: "Teleconsultation",
    mode: "Online",
    location: "Online Video Consultation",
    reason: "Respiratory recovery and cough follow-up",
    status: "Upcoming",
    initials: "PV",
    createdBy: "health_worker",
  },
  {
    id: "APT-1003",
    patientId: "AL-1026",
    patient: "Amit Kumar",
    doctor: "Dr. Amit Sharma",
    doctorSpecialty: "General Physician",
    date: "2026-11-10",
    time: "09:30 AM",
    type: "Hospital Visit",
    mode: "In-Person",
    location: "Community Health Centre",
    reason: "Blood sugar routine review",
    status: "Completed",
    initials: "AK",
    createdBy: "doctor",
  },
  {
    id: "APT-1004",
    patientId: "AL-1027",
    patient: "Neha Singh",
    doctor: "Dr. Neha Verma",
    doctorSpecialty: "General Medicine",
    date: "2026-11-15",
    time: "12:30 PM",
    type: "Teleconsultation",
    mode: "Online",
    location: "Online Consultation",
    reason: "Migraine management review",
    status: "Pending",
    initials: "NS",
    createdBy: "patient",
  },
];

const INITIAL_REFERRALS = [
  {
    id: "REF-1001",
    patientId: "AL-1024",
    patient: "Rahul Sharma",
    hospital: "District Civil Hospital",
    doctor: "Dr. Amit Sharma",
    specialist: "Dr. Amit Sharma",
    department: "Cardiology & General Medicine",
    priority: "Urgent",
    reason: "Recurring high blood pressure readings and chest tightness observed during home visit",
    date: "2026-11-05",
    status: "In Progress",
    referredBy: "ASHA Worker (Sunita)",
    notes: "Patient screened with BP 145/95; immediate physician consultation advised.",
    steps: [
      { title: "Referral Created", date: "05 Nov 2026", completed: true },
      { title: "Doctor Accepted", date: "06 Nov 2026", completed: true },
      { title: "Hospital Visit", date: "12 Nov 2026", completed: false },
      { title: "Prescription & Review", date: "Pending", completed: false },
    ],
  },
  {
    id: "REF-1002",
    patientId: "AL-1025",
    patient: "Priya Verma",
    hospital: "Community Health Centre, Moradabad",
    doctor: "Dr. Neha Verma",
    specialist: "Dr. Neha Verma",
    department: "Pulmonology / General Medicine",
    priority: "Medium",
    reason: "Persistent bronchial wheezing requiring specialist spirometry review",
    date: "2026-10-30",
    status: "Accepted",
    referredBy: "Health Worker (Ramesh)",
    notes: "Referral submitted after 2-week persistent cough.",
    steps: [
      { title: "Referral Created", date: "30 Oct 2026", completed: true },
      { title: "Doctor Accepted", date: "31 Oct 2026", completed: true },
      { title: "Hospital Visit", date: "14 Nov 2026", completed: false },
      { title: "Prescription & Review", date: "Pending", completed: false },
    ],
  },
  {
    id: "REF-1003",
    patientId: "AL-1026",
    patient: "Amit Kumar",
    hospital: "City Care Specialty Hospital",
    doctor: "Dr. Raj Malhotra",
    specialist: "Dr. Raj Malhotra",
    department: "Endocrinology",
    priority: "Routine",
    reason: "Comprehensive diabetic neuropathy screening",
    date: "2026-10-25",
    status: "Completed",
    referredBy: "Dr. Amit Sharma",
    notes: "Specialist consultation completed; medication dosage updated.",
    steps: [
      { title: "Referral Created", date: "25 Oct 2026", completed: true },
      { title: "Doctor Accepted", date: "26 Oct 2026", completed: true },
      { title: "Hospital Visit", date: "28 Oct 2026", completed: true },
      { title: "Prescription & Review", date: "29 Oct 2026", completed: true },
    ],
  },
];

const INITIAL_CONSULTATIONS = [
  {
    id: "CON-1001",
    patientId: "AL-1024",
    patient: "Rahul Sharma",
    age: 32,
    gender: "Male",
    date: "2026-11-01",
    time: "09:30 AM",
    type: "General Checkup",
    doctor: "Dr. Amit Sharma",
    symptoms: "Occasional morning headaches, mild fatigue, elevated BP",
    diagnosis: "Stage 1 Essential Hypertension",
    notes: "Advised low-sodium diet, regular aerobic exercise, and started on Telmisartan 40mg. Follow-up BP monitoring scheduled.",
    status: "Completed",
    initials: "RS",
  },
  {
    id: "CON-1002",
    patientId: "AL-1025",
    patient: "Priya Verma",
    age: 26,
    gender: "Female",
    date: "2026-11-01",
    time: "10:15 AM",
    type: "Follow-up",
    doctor: "Dr. Neha Verma",
    symptoms: "Mild dry cough, recovery from seasonal infection",
    diagnosis: "Post-viral bronchial hyper-reactivity",
    notes: "Lungs clear on auscultation. Advised warm water saline gargling and prescribed anti-allergic medication.",
    status: "Completed",
    initials: "PV",
  },
];

const INITIAL_PRESCRIPTIONS = [
  {
    id: "PRE-1001",
    patientId: "AL-1024",
    patient: "Rahul Sharma",
    doctor: "Dr. Amit Sharma",
    date: "2026-11-01",
    diagnosis: "Stage 1 Essential Hypertension",
    status: "Issued",
    medicines: [
      {
        name: "Telmisartan",
        dosage: "40 mg",
        frequency: "Once daily (Morning)",
        duration: "30 days",
      },
      {
        name: "Amlodipine",
        dosage: "2.5 mg",
        frequency: "Once daily (Night)",
        duration: "30 days",
      },
      {
        name: "Multivitamin (Zinc + B-Complex)",
        dosage: "1 tablet",
        frequency: "Once daily after meals",
        duration: "15 days",
      },
    ],
    instructions: "Restrict salt intake (<5g/day). Avoid heavy lifting. Regular morning walk 30 mins. Re-check BP weekly with ASHA worker.",
  },
  {
    id: "PRE-1002",
    patientId: "AL-1025",
    patient: "Priya Verma",
    doctor: "Dr. Neha Verma",
    date: "2026-11-01",
    diagnosis: "Post-viral bronchial hyper-reactivity",
    status: "Issued",
    medicines: [
      {
        name: "Montelukast + Levocetirizine",
        dosage: "10 mg / 5 mg",
        frequency: "Once daily at bedtime",
        duration: "10 days",
      },
      {
        name: "Paracetamol",
        dosage: "500 mg",
        frequency: "SOS if fever or headache > 100°F",
        duration: "3 days",
      },
    ],
    instructions: "Avoid cold water and sudden temperature changes. Steam inhalation twice a day.",
  },
];

const INITIAL_RECORDS = [
  {
    id: "REC-1001",
    patientId: "AL-1024",
    patient: "Rahul Sharma",
    type: "Prescription",
    title: "Hypertension Management Prescription",
    category: "Prescription",
    date: "01 Nov 2026",
    doctor: "Dr. Amit Sharma",
    description: "Digital prescription issued by Dr. Amit Sharma including Telmisartan 40mg and lifestyle instructions.",
    fileName: "rahul_sharma_prescription_nov2026.pdf",
    status: "Available",
  },
  {
    id: "REC-1002",
    patientId: "AL-1024",
    patient: "Rahul Sharma",
    type: "Consultation",
    title: "General Physician Clinical Consultation",
    category: "Consultation",
    date: "01 Nov 2026",
    doctor: "Dr. Amit Sharma",
    description: "Comprehensive health checkup, recorded BP 135/88, diagnosed Essential Hypertension Stage 1.",
    fileName: "rahul_consultation_notes.pdf",
    status: "Completed",
  },
  {
    id: "REC-1003",
    patientId: "AL-1024",
    patient: "Rahul Sharma",
    type: "Lab Report",
    title: "Lipid Profile & Serum Creatinine",
    category: "Lab Report",
    date: "28 Oct 2026",
    doctor: "District Diagnostic Centre",
    description: "Total Cholesterol: 195 mg/dL, HDL: 44 mg/dL, Triglycerides: 155 mg/dL, Creatinine: 0.9 mg/dL (Normal).",
    fileName: "lipid_profile_oct2026.pdf",
    status: "Reviewed",
  },
  {
    id: "REC-1004",
    patientId: "AL-1025",
    patient: "Priya Verma",
    type: "Prescription",
    title: "Bronchial Recovery Prescription",
    category: "Prescription",
    date: "01 Nov 2026",
    doctor: "Dr. Neha Verma",
    description: "Prescribed Montelukast + Levocetirizine and steam inhalation.",
    fileName: "priya_prescription.pdf",
    status: "Available",
  },
];

const INITIAL_FOLLOWUPS = [
  {
    id: "FOL-1001",
    patientId: "AL-1024",
    patient: "Rahul Sharma",
    doctor: "Dr. Amit Sharma",
    specialty: "General Physician",
    title: "Blood Pressure & Medication Check",
    date: "2026-11-18",
    time: "10:30 AM",
    location: "District Government Hospital / PHC Rampur",
    status: "Upcoming",
    type: "Health Check",
    description: "Review blood pressure after 2 weeks of Telmisartan 40mg therapy.",
  },
  {
    id: "FOL-1002",
    patientId: "AL-1025",
    patient: "Priya Verma",
    doctor: "Dr. Neha Verma",
    specialty: "General Medicine",
    title: "Post-Treatment Respiratory Review",
    date: "2026-11-12",
    time: "11:00 AM",
    location: "Community Health Centre",
    status: "Upcoming",
    type: "Hospital Visit",
    description: "Assess resolution of cough and ensure no wheezing remains.",
  },
  {
    id: "FOL-1003",
    patientId: "AL-1026",
    patient: "Amit Kumar",
    doctor: "Dr. Amit Sharma",
    specialty: "General Physician",
    title: "Fasting Blood Glucose Check",
    date: "2026-10-30",
    time: "09:00 AM",
    location: "Community Health Centre",
    status: "Completed",
    type: "Health Check",
    description: "Follow-up HbA1c review and insulin/diet plan review.",
  },
];

const INITIAL_HOME_VISITS = [
  {
    id: "VIS-1001",
    patientId: "AL-1024",
    patient: "Rahul Sharma",
    phone: "9876543210",
    village: "Rampur",
    address: "House 45, Rampur Village",
    date: "2026-11-13",
    time: "10:00 AM",
    purpose: "Blood Pressure Check & Medication Adherence",
    notes: "Verify patient is taking BP medication regularly in morning.",
    status: "Scheduled",
  },
  {
    id: "VIS-1002",
    patientId: "AL-1025",
    patient: "Priya Verma",
    phone: "9876543211",
    village: "Shivpur",
    address: "Near Post Office, Shivpur",
    date: "2026-11-14",
    time: "11:30 AM",
    purpose: "Child & Maternal Health Review",
    notes: "Routine community checkup.",
    status: "Scheduled",
  },
  {
    id: "VIS-1003",
    patientId: "AL-1026",
    patient: "Amit Kumar",
    phone: "9876543212",
    village: "Lakshmipur",
    address: "Ward 3, Main Market",
    date: "2026-10-29",
    time: "09:30 AM",
    purpose: "Diabetic Foot & Blood Sugar Check",
    notes: "Blood glucose measured 138 mg/dL post-prandial.",
    status: "Completed",
  },
];

const INITIAL_NOTIFICATIONS = [
  {
    id: "NOTIF-1",
    role: "patient",
    title: "Upcoming Appointment with Dr. Amit Sharma",
    message: "Your appointment is scheduled for 12 Nov 2026 at 10:00 AM at District Government Hospital.",
    date: "Today, 10:00 AM",
    type: "appointment",
    read: false,
  },
  {
    id: "NOTIF-2",
    role: "patient",
    title: "New Digital Prescription Issued",
    message: "Dr. Amit Sharma has issued your hypertension management prescription. View it in My Health Records.",
    date: "01 Nov 2026",
    type: "record",
    read: false,
  },
  {
    id: "NOTIF-3",
    role: "patient",
    title: "Referral Accepted by District Hospital",
    message: "Your cardiology referral request has been accepted. Hospital visit is scheduled for 12 Nov 2026.",
    date: "06 Nov 2026",
    type: "referral",
    read: true,
  },
  {
    id: "NOTIF-4",
    role: "doctor",
    title: "Urgent Referral from ASHA Worker",
    message: "ASHA Worker Sunita referred patient Rahul Sharma (BP 145/95). Please review in Referrals tab.",
    date: "Today, 08:30 AM",
    type: "referral",
    read: false,
  },
  {
    id: "NOTIF-5",
    role: "doctor",
    title: "New Appointment Booked",
    message: "Neha Singh booked an online consultation for 15 Nov 2026 at 12:30 PM.",
    date: "Yesterday",
    type: "appointment",
    read: false,
  },
  {
    id: "NOTIF-6",
    role: "health_worker",
    title: "Doctor Accepted Referral for Rahul Sharma",
    message: "Dr. Amit Sharma accepted your referral. Please inform the patient about hospital visit on 12 Nov.",
    date: "06 Nov 2026",
    type: "referral",
    read: false,
  },
  {
    id: "NOTIF-7",
    role: "health_worker",
    title: "Home Visit Reminder",
    message: "Scheduled home visit for Rahul Sharma tomorrow at 10:00 AM in Rampur Village.",
    date: "Today, 07:00 AM",
    type: "visit",
    read: false,
  },
];

const STORAGE_KEY = "aarogya_link_db_v2";

const AarogyaContext = createContext(null);

export function AarogyaProvider({ children }) {
  // Try loading from localStorage, fallback to seed
  const loadInitial = (key, fallback) => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed[key]) return parsed[key];
      }
    } catch (e) {
      console.warn("Error loading Aarogya storage:", e);
    }
    return fallback;
  };

  const [patients, setPatients] = useState(() => loadInitial("patients", INITIAL_PATIENTS));
  const [appointments, setAppointments] = useState(() => loadInitial("appointments", INITIAL_APPOINTMENTS));
  const [referrals, setReferrals] = useState(() => loadInitial("referrals", INITIAL_REFERRALS));
  const [consultations, setConsultations] = useState(() => loadInitial("consultations", INITIAL_CONSULTATIONS));
  const [prescriptions, setPrescriptions] = useState(() => loadInitial("prescriptions", INITIAL_PRESCRIPTIONS));
  const [medicalRecords, setMedicalRecords] = useState(() => loadInitial("medicalRecords", INITIAL_RECORDS));
  const [followups, setFollowups] = useState(() => loadInitial("followups", INITIAL_FOLLOWUPS));
  const [homeVisits, setHomeVisits] = useState(() => loadInitial("homeVisits", INITIAL_HOME_VISITS));
  const [notifications, setNotifications] = useState(() => loadInitial("notifications", INITIAL_NOTIFICATIONS));
  const [activePatientId, setActivePatientId] = useState(() => loadInitial("activePatientId", "AL-1024"));

  // Sync back to localStorage whenever anything updates
  useEffect(() => {
    try {
      const payload = {
        patients,
        appointments,
        referrals,
        consultations,
        prescriptions,
        medicalRecords,
        followups,
        homeVisits,
        notifications,
        activePatientId,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error("Failed to save Aarogya data to localStorage:", e);
    }
  }, [
    patients,
    appointments,
    referrals,
    consultations,
    prescriptions,
    medicalRecords,
    followups,
    homeVisits,
    notifications,
    activePatientId,
  ]);

  // Current active patient object
  const activePatient =
    patients.find((p) => p.id === activePatientId) ||
    patients[0] || {
      id: "AL-1024",
      name: "Rahul Sharma",
      age: 32,
      gender: "Male",
      phone: "9876543210",
      village: "Rampur",
      condition: "Hypertension",
      vitals: {},
    };

  // 1. REGISTER NEW PATIENT (e.g. from Health Worker or Patient Signup)
  const registerPatient = (newPatientData) => {
    const nextNum = patients.length + 1025;
    const newId = newPatientData.id || `AL-${nextNum}`;
    const initials = (newPatientData.fullName || newPatientData.name || "Patient")
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const patientRecord = {
      id: newId,
      name: newPatientData.fullName || newPatientData.name || "Unnamed Patient",
      age: newPatientData.age || "30",
      gender: newPatientData.gender || "Other",
      dob: newPatientData.dateOfBirth || newPatientData.dob || "",
      phone: newPatientData.mobile || newPatientData.phone || "",
      village: newPatientData.village || "Rural Area",
      district: newPatientData.district || "District",
      state: newPatientData.state || "State",
      pincode: newPatientData.pincode || "",
      address: newPatientData.address || `${newPatientData.village || ""}, ${newPatientData.district || ""}`,
      bloodGroup: newPatientData.bloodGroup || "Not specified",
      emergencyName: newPatientData.emergencyName || "",
      emergencyPhone: newPatientData.emergencyPhone || "",
      medicalHistory: newPatientData.medicalHistory || "None provided",
      existingConditions: newPatientData.existingConditions || [],
      condition:
        (newPatientData.existingConditions && newPatientData.existingConditions[0]) ||
        newPatientData.condition ||
        "General Health",
      status: "Active",
      registeredDate: new Date().toISOString().split("T")[0],
      lastVisit: new Date().toISOString().split("T")[0],
      vitals: {
        bloodPressure: "120/80",
        temperature: "98.6 °F",
        heartRate: "72 bpm",
        oxygen: "98%",
        weight: "60 kg",
        height: "165 cm",
        lastScreeningDate: new Date().toISOString().split("T")[0],
      },
      initials,
    };

    setPatients((prev) => [patientRecord, ...prev]);

    // Send notifications to Doctor & Health Worker
    sendNotification({
      role: "doctor",
      title: "New Patient Registered",
      message: `${patientRecord.name} (${patientRecord.id}) registered from ${patientRecord.village}.`,
      type: "patient",
    });

    sendNotification({
      role: "health_worker",
      title: "Patient Registered Successfully",
      message: `${patientRecord.name} was assigned ID ${patientRecord.id}.`,
      type: "patient",
    });

    return patientRecord;
  };

  // 2. RECORD PATIENT SCREENING / VITALS (from Health Worker)
  const recordScreening = (screeningData) => {
    const { patientId, bloodPressure, temperature, heartRate, oxygen, weight, height, symptoms, observations } =
      screeningData;

    setPatients((prev) =>
      prev.map((p) => {
        if (p.id === patientId) {
          return {
            ...p,
            lastVisit: new Date().toISOString().split("T")[0],
            vitals: {
              bloodPressure: bloodPressure || p.vitals?.bloodPressure || "120/80",
              temperature: temperature ? `${temperature} °F` : p.vitals?.temperature || "98.6 °F",
              heartRate: heartRate ? `${heartRate} bpm` : p.vitals?.heartRate || "75 bpm",
              oxygen: oxygen ? `${oxygen}%` : p.vitals?.oxygen || "98%",
              weight: weight ? `${weight} kg` : p.vitals?.weight || "60 kg",
              height: height ? `${height} cm` : p.vitals?.height || "165 cm",
              lastScreeningDate: new Date().toISOString().split("T")[0],
            },
            symptoms: symptoms || p.symptoms,
          };
        }
        return p;
      })
    );

    // Save as a Medical Record
    const targetPatient = patients.find((p) => p.id === patientId);
    const patientName = targetPatient ? targetPatient.name : "Patient";

    addMedicalRecord({
      patientId,
      patient: patientName,
      type: "Consultation",
      title: `Vitals & Health Screening Record`,
      category: "Consultation",
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      doctor: "Community Health Worker",
      description: `Screening observations: BP ${bloodPressure || "normal"}, Pulse ${heartRate || "normal"}, Temp ${temperature || "normal"}. Symptoms: ${(symptoms || []).join(", ") || "None"}. Notes: ${observations || "Routine screening"}`,
      status: "Reviewed",
    });

    // Notify doctor
    sendNotification({
      role: "doctor",
      title: `New Screening: ${patientName}`,
      message: `Health worker recorded vitals for ${patientName}: BP ${bloodPressure || "120/80"}, HR ${heartRate || "75"}.`,
      type: "screening",
    });

    return true;
  };

  // 3. APPOINTMENTS (Book, Update Status, Cancel)
  const addAppointment = (aptData) => {
    const targetPatient = patients.find((p) => p.id === (aptData.patientId || activePatientId));
    const patientName = aptData.patient || (targetPatient ? targetPatient.name : "Patient");
    const patientId = aptData.patientId || (targetPatient ? targetPatient.id : activePatientId);

    const newAppointment = {
      id: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
      patientId,
      patient: patientName,
      doctor: aptData.doctor || "Dr. Amit Sharma",
      doctorSpecialty: aptData.doctorSpecialty || "General Physician",
      date: aptData.date || new Date().toISOString().split("T")[0],
      time: aptData.time || "10:00 AM",
      type: aptData.type || "Hospital Visit",
      mode: aptData.mode || (aptData.type === "Teleconsultation" ? "Online" : "In-Person"),
      location: aptData.location || (aptData.type === "Teleconsultation" ? "Online Consultation" : "District Hospital"),
      reason: aptData.reason || "General Medical Checkup",
      status: aptData.status || "Upcoming",
      initials: patientName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
      createdBy: aptData.createdBy || "patient",
    };

    setAppointments((prev) => [newAppointment, ...prev]);

    // Send notifications to patient and doctor
    sendNotification({
      role: "doctor",
      title: "New Appointment Scheduled",
      message: `${patientName} has an appointment on ${newAppointment.date} at ${newAppointment.time}.`,
      type: "appointment",
    });

    sendNotification({
      role: "patient",
      title: "Appointment Confirmed",
      message: `Your appointment with ${newAppointment.doctor} is scheduled for ${newAppointment.date} at ${newAppointment.time}.`,
      type: "appointment",
    });

    return newAppointment;
  };

  const updateAppointmentStatus = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          // If completed, notify patient
          if (newStatus === "Completed") {
            sendNotification({
              role: "patient",
              title: "Consultation Completed",
              message: `Your appointment with ${a.doctor} has been marked as completed. Check your updated health records.`,
              type: "appointment",
            });
          }
          return { ...a, status: newStatus };
        }
        return a;
      })
    );
  };

  // 4. REFERRALS (Health Worker -> Doctor / Hospital)

  // 4b. DELETE APPOINTMENT (Health Worker)
  const deleteAppointment = (id) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
    // Notify patient about deletion
    sendNotification({
      role: "patient",
      title: "Appointment Cancelled",
      message: `Your appointment has been removed from the schedule.`,
      type: "appointment",
    });
    // Notify health worker
    sendNotification({
      role: "health_worker",
      title: "Appointment Deleted",
      message: `Appointment ${id} was deleted.`,
      type: "appointment",
    });
  };

  const addReferral = (refData) => {
    const targetPatient = patients.find((p) => p.id === (refData.patientId || activePatientId));
    const patientName = refData.patient || (targetPatient ? targetPatient.name : "Patient");
    const patientId = refData.patientId || (targetPatient ? targetPatient.id : activePatientId);

    const newReferral = {
      id: `REF-${Math.floor(1000 + Math.random() * 9000)}`,
      patientId,
      patient: patientName,
      hospital: refData.hospital || "District Government Hospital",
      doctor: refData.doctor || refData.specialist || "Dr. Amit Sharma",
      specialist: refData.specialist || refData.doctor || "Dr. Amit Sharma",
      department: refData.department || "General Medicine",
      priority: refData.priority || "Urgent",
      reason: refData.reason || "Specialist examination required",
      date: refData.date || new Date().toISOString().split("T")[0],
      status: refData.status || "In Progress",
      referredBy: refData.referredBy || "Community Health Worker (ASHA)",
      notes: refData.notes || "Referral submitted for patient assessment.",
      steps: [
        {
          title: "Referral Created",
          date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
          completed: true,
        },
        { title: "Doctor Review", date: "In Progress", completed: false },
        { title: "Hospital Visit", date: "Pending", completed: false },
        { title: "Prescription & Closure", date: "Pending", completed: false },
      ],
    };

    setReferrals((prev) => [newReferral, ...prev]);

    // Send notifications to Doctor & Patient
    sendNotification({
      role: "doctor",
      title: `New Referral: ${patientName}`,
      message: `ASHA worker referred ${patientName} (${newReferral.priority} priority). Reason: ${newReferral.reason}`,
      type: "referral",
    });

    sendNotification({
      role: "patient",
      title: "New Referral Initiated",
      message: `Your referral to ${newReferral.hospital} has been created and sent to the doctor.`,
      type: "referral",
    });

    return newReferral;
  };

  const updateReferralStatus = (id, newStatus) => {
    setReferrals((prev) =>
      prev.map((ref) => {
        if (ref.id === id) {
          const updatedSteps = [...(ref.steps || [])];
          if (newStatus === "Accepted" && updatedSteps[1]) {
            updatedSteps[1] = { ...updatedSteps[1], completed: true, date: "Accepted" };
          } else if (newStatus === "Completed") {
            updatedSteps.forEach((s) => (s.completed = true));
          }

          sendNotification({
            role: "patient",
            title: `Referral Status: ${newStatus}`,
            message: `Your referral at ${ref.hospital} status is now ${newStatus}.`,
            type: "referral",
          });

          sendNotification({
            role: "health_worker",
            title: `Referral Updated: ${ref.patient}`,
            message: `Referral for ${ref.patient} at ${ref.hospital} is now ${newStatus}.`,
            type: "referral",
          });

          return { ...ref, status: newStatus, steps: updatedSteps };
        }
        return ref;
      })
    );
  };

  // 5. CONSULTATIONS (Doctor conducts consultation)
  const addConsultation = (conData) => {
    const targetPatient = patients.find((p) => p.id === conData.patientId);
    const patientName = conData.patient || (targetPatient ? targetPatient.name : "Patient");

    const newCon = {
      id: `CON-${Math.floor(1000 + Math.random() * 9000)}`,
      patientId: conData.patientId || (targetPatient ? targetPatient.id : "AL-1024"),
      patient: patientName,
      age: conData.age || (targetPatient ? targetPatient.age : 30),
      gender: conData.gender || (targetPatient ? targetPatient.gender : "Male"),
      date: conData.date || new Date().toISOString().split("T")[0],
      time: conData.time || "11:00 AM",
      type: conData.type || "General Consultation",
      doctor: conData.doctor || "Dr. Amit Sharma",
      symptoms: conData.symptoms || "Reported symptoms reviewed",
      diagnosis: conData.diagnosis || "Clinical assessment completed",
      notes: conData.notes || "Advice given to patient.",
      status: conData.status || "Completed",
      initials: patientName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
    };

    setConsultations((prev) => [newCon, ...prev]);

    // Also add to patient's Medical Records
    addMedicalRecord({
      patientId: newCon.patientId,
      patient: patientName,
      type: "Consultation",
      title: `${newCon.diagnosis || "Medical Consultation"}`,
      category: "Consultation",
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      doctor: newCon.doctor,
      description: `Symptoms: ${newCon.symptoms}. Diagnosis: ${newCon.diagnosis}. Notes: ${newCon.notes}`,
      fileName: `consultation_${newCon.id.toLowerCase()}.pdf`,
      status: "Completed",
    });

    sendNotification({
      role: "patient",
      title: "Consultation Notes Available",
      message: `${newCon.doctor} has saved your consultation notes for ${newCon.diagnosis}.`,
      type: "consultation",
    });

    return newCon;
  };

  // 6. PRESCRIPTIONS (Doctor writes prescription -> automatically syncs to Patient Medical Records)
  const addPrescription = (prescData) => {
    const targetPatient = patients.find((p) => p.id === prescData.patientId);
    const patientName = prescData.patient || (targetPatient ? targetPatient.name : "Patient");
    const patientId = prescData.patientId || (targetPatient ? targetPatient.id : "AL-1024");

    const newPrescription = {
      id: `PRE-${Math.floor(1000 + Math.random() * 9000)}`,
      patientId,
      patient: patientName,
      doctor: prescData.doctor || "Dr. Amit Sharma",
      date: prescData.date || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      diagnosis: prescData.diagnosis || "General Treatment",
      status: prescData.status || "Issued",
      medicines: prescData.medicines || [],
      instructions: prescData.instructions || "Take medicines on time as prescribed.",
    };

    setPrescriptions((prev) => [newPrescription, ...prev]);

    // Auto-create in Medical Records for Patient
    addMedicalRecord({
      patientId,
      patient: patientName,
      type: "Prescription",
      title: `Prescription: ${newPrescription.diagnosis}`,
      category: "Prescription",
      date: newPrescription.date,
      doctor: newPrescription.doctor,
      description: `Medicines: ${(newPrescription.medicines || []).map((m) => m.name).join(", ")}. Instructions: ${newPrescription.instructions}`,
      fileName: `prescription_${newPrescription.id.toLowerCase()}.pdf`,
      status: "Available",
      prescriptionDetails: newPrescription,
    });

    sendNotification({
      role: "patient",
      title: "New Prescription Issued",
      message: `${newPrescription.doctor} issued a new prescription for ${newPrescription.diagnosis}. View in My Health Records.`,
      type: "prescription",
    });

    return newPrescription;
  };

  // 7. MEDICAL RECORDS
  const addMedicalRecord = (recordData) => {
    const newRecord = {
      id: `REC-${Math.floor(1000 + Math.random() * 9000)}`,
      patientId: recordData.patientId || activePatientId,
      patient: recordData.patient || "Patient",
      type: recordData.type || "Lab Report",
      title: recordData.title || "Health Record",
      category: recordData.category || recordData.type || "Consultation",
      date: recordData.date || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      doctor: recordData.doctor || "Medical Professional",
      description: recordData.description || "Healthcare document record.",
      fileName: recordData.fileName || "medical_record.pdf",
      status: recordData.status || "Available",
      prescriptionDetails: recordData.prescriptionDetails || null,
    };

    setMedicalRecords((prev) => [newRecord, ...prev]);
    return newRecord;
  };

  // 8. FOLLOW-UPS (Doctor / Health Worker -> Patient)
  const addFollowup = (folData) => {
    const targetPatient = patients.find((p) => p.id === folData.patientId);
    const patientName = folData.patient || (targetPatient ? targetPatient.name : "Patient");

    const newFol = {
      id: `FOL-${Math.floor(1000 + Math.random() * 9000)}`,
      patientId: folData.patientId || activePatientId,
      patient: patientName,
      doctor: folData.doctor || "Dr. Amit Sharma",
      specialty: folData.specialty || "General Physician",
      title: folData.title || folData.purpose || "Health Follow-up",
      date: folData.date || new Date().toISOString().split("T")[0],
      time: folData.time || "10:30 AM",
      location: folData.location || "Community Health Centre",
      status: folData.status || "Upcoming",
      type: folData.type || "Hospital Visit",
      description: folData.description || folData.notes || "Follow-up consultation.",
    };

    setFollowups((prev) => [newFol, ...prev]);

    sendNotification({
      role: "patient",
      title: "New Follow-up Scheduled",
      message: `Follow-up for ${newFol.title} is scheduled on ${newFol.date} at ${newFol.location}.`,
      type: "followup",
    });

    sendNotification({
      role: "health_worker",
      title: `Follow-up Due: ${patientName}`,
      message: `Follow-up for ${patientName} on ${newFol.date} for ${newFol.title}.`,
      type: "followup",
    });

    return newFol;
  };

  const updateFollowupStatus = (id, newStatus) => {
    setFollowups((prev) => prev.map((f) => (f.id === id ? { ...f, status: newStatus } : f)));
  };

  // 9. HOME VISITS (Health Worker)
  const addHomeVisit = (visitData) => {
    const targetPatient = patients.find((p) => p.id === visitData.patientId);
    const patientName = visitData.patient || (targetPatient ? targetPatient.name : "Patient");

    const newVisit = {
      id: `VIS-${Math.floor(1000 + Math.random() * 9000)}`,
      patientId: visitData.patientId || (targetPatient ? targetPatient.id : "AL-1024"),
      patient: patientName,
      phone: visitData.phone || (targetPatient ? targetPatient.phone : ""),
      village: visitData.village || (targetPatient ? targetPatient.village : "Village"),
      address: visitData.address || (targetPatient ? targetPatient.address : ""),
      date: visitData.date || new Date().toISOString().split("T")[0],
      time: visitData.time || "10:00 AM",
      purpose: visitData.purpose || "Health Inspection & Follow-up",
      notes: visitData.notes || "Check general recovery.",
      status: visitData.status || "Scheduled",
    };

    setHomeVisits((prev) => [newVisit, ...prev]);

    sendNotification({
      role: "patient",
      title: "Health Worker Home Visit",
      message: `Community Health Worker has scheduled a home visit on ${newVisit.date} at ${newVisit.time}.`,
      type: "visit",
    });

    return newVisit;
  };

  const updateHomeVisitStatus = (id, newStatus) => {
    setHomeVisits((prev) => prev.map((v) => (v.id === id ? { ...v, status: newStatus } : v)));
  };

  // 10. NOTIFICATIONS
  const sendNotification = ({ role, title, message, type }) => {
    const newNotif = {
      id: `NOTIF-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      role,
      title,
      message,
      date: "Just now",
      type: type || "general",
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markNotificationRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearNotifications = (role) => {
    setNotifications((prev) => prev.filter((n) => n.role !== role));
  };

  // 11. UPDATE PATIENT PROFILE
  const updatePatientProfile = (patientId, updatedData) => {
    setPatients((prev) =>
      prev.map((p) => {
        if (p.id === patientId) {
          return { ...p, ...updatedData };
        }
        return p;
      })
    );
  };

  // Reset to initial seed demo data
  const resetToSeedData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setPatients(INITIAL_PATIENTS);
    setAppointments(INITIAL_APPOINTMENTS);
    setReferrals(INITIAL_REFERRALS);
    setConsultations(INITIAL_CONSULTATIONS);
    setPrescriptions(INITIAL_PRESCRIPTIONS);
    setMedicalRecords(INITIAL_RECORDS);
    setFollowups(INITIAL_FOLLOWUPS);
    setHomeVisits(INITIAL_HOME_VISITS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setActivePatientId("AL-1024");
  };

  const value = {
    patients,
    activePatient,
    activePatientId,
    setActivePatientId,
    appointments,
    deleteAppointment,
    referrals,
    consultations,
    prescriptions,
    medicalRecords,
    followups,
    homeVisits,
    notifications,
    registerPatient,
    recordScreening,
    addAppointment,
    updateAppointmentStatus,
    addReferral,
    updateReferralStatus,
    addConsultation,
    addPrescription,
    addMedicalRecord,
    addFollowup,
    updateFollowupStatus,
    addHomeVisit,
    updateHomeVisitStatus,
    sendNotification,
    markNotificationRead,
    clearNotifications,
    updatePatientProfile,
    resetToSeedData,
  };

  return <AarogyaContext.Provider value={value}>{children}</AarogyaContext.Provider>;
}

export function useAarogya() {
  const context = useContext(AarogyaContext);
  if (!context) {
    throw new Error("useAarogya must be used within an AarogyaProvider");
  }
  return context;
}


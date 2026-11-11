import React, { useState } from "react";
import {
  ArrowUpRight,
  MapPin,
  CalendarDays,
  Clock,
  UserRound,
  Hospital,
  CheckCircle2,
  Circle,
  FileText,
  Phone,
  Navigation,
  Activity,
  X,
  AlertCircle,
} from "lucide-react";
import { useAarogya } from "../../context/AarogyaContext";

function PatientReferrals() {
  const { referrals, activePatient } = useAarogya();
  const [selectedReferral, setSelectedReferral] = useState(null);

  const patientReferrals = referrals.filter((item) => item.patientId === activePatient.id);

  const activeReferralsCount = patientReferrals.filter(
    (item) => item.status === "In Progress" || item.status === "Accepted"
  ).length;

  const completedReferralsCount = patientReferrals.filter(
    (item) => item.status === "Completed"
  ).length;

  return (
    <div className="referral-page">
      {/* Page Heading */}
      <div className="referral-heading">
        <div>
          <span className="referral-eyebrow">YOUR HEALTH JOURNEY</span>
          <h1>My Referrals</h1>
          <p>
            Track your hospital referrals and stay updated on your care journey across doctors and specialists.
          </p>
        </div>

        <div className="referral-heading-icon">
          <Activity size={28} />
        </div>
      </div>

      {/* Statistics */}
      <div className="referral-stats">
        <div className="referral-stat-card">
          <div className="referral-stat-icon green">
            <FileText size={21} />
          </div>
          <div>
            <h3>{patientReferrals.length}</h3>
            <p>Total Referrals</p>
          </div>
        </div>

        <div className="referral-stat-card">
          <div className="referral-stat-icon orange">
            <Clock size={21} />
          </div>
          <div>
            <h3>{activeReferralsCount}</h3>
            <p>Active Referrals</p>
          </div>
        </div>

        <div className="referral-stat-card">
          <div className="referral-stat-icon blue">
            <CheckCircle2 size={21} />
          </div>
          <div>
            <h3>{completedReferralsCount}</h3>
            <p>Completed</p>
          </div>
        </div>
      </div>

      {/* Referral List */}
      <div className="referral-section-heading">
        <div>
          <h2>Referral History</h2>
          <p>View the status, destination facility, and live progress of your referrals.</p>
        </div>
        <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full">
          {patientReferrals.length} Records Synced
        </span>
      </div>

      {patientReferrals.length > 0 ? (
        <div className="referral-list">
          {patientReferrals.map((referral) => (
            <div className="referral-card" key={referral.id}>
              {/* Card Header */}
              <div className="referral-card-header">
                <div className="referral-card-title">
                  <div className="referral-hospital-icon">
                    <Hospital size={23} />
                  </div>

                  <div>
                    <h3>{referral.hospital}</h3>
                    <span>{referral.id} • {referral.priority || "Normal"} Priority</span>
                  </div>
                </div>

                <span
                  className={`referral-status ${
                    referral.status === "Completed"
                      ? "completed"
                      : referral.status === "Accepted"
                      ? "progress"
                      : "progress"
                  }`}
                >
                  {referral.status}
                </span>
              </div>

              {/* Referral Details */}
              <div className="referral-details">
                <div className="referral-detail-item">
                  <UserRound size={17} />
                  <div>
                    <small>Referred By</small>
                    <p>{referral.referredBy || referral.doctor || "Health Worker"}</p>
                  </div>
                </div>

                <div className="referral-detail-item">
                  <Activity size={17} />
                  <div>
                    <small>Department / Specialty</small>
                    <p>{referral.department || "General Medicine"}</p>
                  </div>
                </div>

                <div className="referral-detail-item">
                  <CalendarDays size={17} />
                  <div>
                    <small>Referral Date</small>
                    <p>{referral.date}</p>
                  </div>
                </div>

                <div className="referral-detail-item">
                  <MapPin size={17} />
                  <div>
                    <small>Doctor / Hospital</small>
                    <p>{referral.doctor || referral.specialist || "District Hospital"}</p>
                  </div>
                </div>
              </div>

              {/* Reason */}
              <div className="referral-reason">
                <strong>Referral Reason</strong>
                <p>{referral.reason}</p>
              </div>

              {/* Timeline */}
              {referral.steps && referral.steps.length > 0 && (
                <div className="referral-timeline-section">
                  <h4>Referral Progress Tracker</h4>

                  <div className="referral-timeline">
                    {referral.steps.map((step, index) => (
                      <div className="referral-timeline-item" key={index}>
                        <div className="referral-timeline-marker">
                          {step.completed ? (
                            <CheckCircle2 size={19} className="text-emerald-600" />
                          ) : (
                            <Circle size={19} className="text-slate-300" />
                          )}
                        </div>

                        <div className="referral-timeline-content">
                          <strong className={step.completed ? "text-emerald-900" : "text-slate-500"}>
                            {step.title}
                          </strong>
                          <span>{step.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="referral-card-footer">
                <span className="text-xs text-slate-500">
                  <Clock size={15} /> Last updated: {referral.date}
                </span>

                <button
                  type="button"
                  className="referral-action-btn"
                  onClick={() => setSelectedReferral(referral)}
                >
                  View Details <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 p-8">
          <Hospital size={44} className="mx-auto text-slate-300 mb-3" />
          <h3 className="text-base font-bold text-slate-700">No Active Referrals</h3>
          <p className="text-xs text-slate-500 mt-1">
            If your community health worker or doctor refers you to a district hospital or specialist, it will appear here.
          </p>
        </div>
      )}

      {/* REFERRAL DETAIL MODAL */}
      {selectedReferral && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b">
              <div className="flex items-center gap-2">
                <Hospital size={22} className="text-emerald-600" />
                <h3 className="text-lg font-bold text-slate-800">Referral Details</h3>
              </div>
              <button
                onClick={() => setSelectedReferral(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="py-4 space-y-3 text-sm">
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                <div className="font-bold text-emerald-900 text-base">{selectedReferral.hospital}</div>
                <div className="text-xs text-emerald-700">Department: {selectedReferral.department}</div>
                <div className="text-xs text-emerald-700">Doctor: {selectedReferral.doctor || selectedReferral.specialist}</div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-500 uppercase">Patient</span>
                <p className="font-semibold text-slate-800">{activePatient.name} (ID: {activePatient.id})</p>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-500 uppercase">Reason for Referral</span>
                <p className="text-slate-700 mt-0.5">{selectedReferral.reason}</p>
              </div>

              {selectedReferral.notes && (
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase">Clinical Notes from Health Worker</span>
                  <p className="text-slate-700 mt-0.5 text-xs bg-slate-50 p-2.5 rounded-lg border">
                    {selectedReferral.notes}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-50 p-2.5 rounded-lg border text-xs">
                  <span className="text-slate-500">Priority:</span>
                  <p className="font-bold text-slate-800">{selectedReferral.priority || "Normal"}</p>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border text-xs">
                  <span className="text-slate-500">Current Status:</span>
                  <p className="font-bold text-emerald-600">{selectedReferral.status}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <button
                onClick={() => setSelectedReferral(null)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Help Note */}
      <div className="referral-help-box">
        <div className="referral-help-icon">
          <Phone size={21} />
        </div>

        <div>
          <h4>Need help with your referral?</h4>
          <p>
            Contact your community health worker for assistance with transport, hospital navigation, and appointments.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PatientReferrals;

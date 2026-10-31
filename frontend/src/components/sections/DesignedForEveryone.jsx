import React from "react";
import {
  UserRound,
  HeartHandshake,
  Stethoscope,
  Hospital,
  HeartPulse,
} from "lucide-react";

const stakeholders = [
  {
    title: "Patients",
    badge: "For Better Care",
    description:
      "Get easier access to quality healthcare and keep your medical records in one place.",
    icon: UserRound,
  },
  {
    title: "Health Workers (CHWs)",
    badge: "For Last-Mile Reach",
    description:
      "Capture patient information, track health updates and connect patients to the right care.",
    icon: HeartHandshake,
  },
  {
    title: "Doctors",
    badge: "For Smarter Care",
    description:
      "Review structured patient information, make clinical decisions and manage treatment.",
    icon: Stethoscope,
  },
  {
    title: "Hospitals",
    badge: "For Better Management",
    description:
      "Improve coordination, manage resources and deliver efficient healthcare services.",
    icon: Hospital,
  },
];

export default function DesignedForEveryone() {
  return (
    <section
      id="audience"
      className="relative overflow-hidden bg-white px-5 py-14 sm:px-8 lg:px-14 lg:py-16"
    >
      {/* Background */}
      <div className="pointer-events-none absolute -left-32 top-40 h-80 w-80 rounded-full bg-green-50 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-emerald-50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* Main Layout */}
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">

          {/* Left Content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

            <span className="rounded-full border border-green-100 bg-green-50 px-5 py-2 text-xs font-bold tracking-[0.2em] text-green-800 sm:text-sm">
              DESIGNED FOR EVERYONE
            </span>

            <h2 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Built for
              <span className="block text-green-700">
                Every Stakeholder
              </span>
            </h2>

            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
              AarogyaLink brings patients, health workers, doctors and
              hospitals onto one connected platform for seamless and
              inclusive healthcare.
            </p>

            {/* Single Image */}
            <div className="relative mt-8 flex w-full items-center justify-center">
              <div className="absolute h-64 w-64 rounded-full bg-green-100/70 blur-3xl sm:h-80 sm:w-80" />

              <img
                src="/how-it-works-dashboard.png"
                alt="AarogyaLink Healthcare Dashboard"
                loading="lazy"
                className="relative z-10 w-full max-w-lg object-contain drop-shadow-xl"
              />
            </div>
          </div>

          {/* Right Stakeholder Cards */}
          <div className="flex flex-col gap-4">
            {stakeholders.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="group rounded-2xl border border-green-100 bg-white p-5 shadow-[0_5px_20px_rgba(22,139,104,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-[0_10px_28px_rgba(22,139,104,0.12)] sm:p-6"
                >
                  <div className="flex items-center gap-4">

                    {/* Icon */}
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700 transition-colors group-hover:bg-green-100">
                      <Icon size={32} strokeWidth={1.8} />
                    </div>

                    {/* Text */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
                          {item.title}
                        </h3>

                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                          {item.badge}
                        </span>
                      </div>

                      <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                        {item.description}
                      </p>
                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 flex flex-col items-center gap-5 rounded-3xl bg-gradient-to-r from-green-700 to-green-950 px-7 py-7 text-center text-white shadow-lg sm:px-10 md:flex-row md:text-left">

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
            <HeartPulse size={32} />
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-bold sm:text-2xl">
              A Connected Platform
              <span className="block">
                for a Healthier Community
              </span>
            </h3>
          </div>

          <div className="hidden h-14 w-px bg-white/25 md:block" />

          <p className="max-w-md text-sm leading-6 text-green-50 sm:text-base">
            Different roles. A common goal — accessible, timely and
            quality healthcare for everyone.
          </p>
        </div>

      </div>
    </section>
  );
}


import React from "react";
import {
  ShieldCheck,
  LockKeyhole,
  Database,
  WifiOff,
  UsersRound,
  Award,
} from "lucide-react";

const trustFeatures = [
  {
    title: "Data Privacy",
    description:
      "Health information stays protected and is shared only with authorized users.",
    icon: ShieldCheck,
  },
  {
    title: "Strong Security",
    description:
      "Role-based access and secure records help keep patient information safe.",
    icon: Database,
  },
  {
    title: "Works Offline Too",
    description:
      "Capture patient information without internet and sync it when connected.",
    icon: WifiOff,
  },
  {
    title: "Inclusive Access",
    description:
      "Designed for smartphones, basic phones through SMS/IVR and hospitals.",
    icon: UsersRound,
  },
];

export default function TrustAccessibility() {
  return (
    <section
      id="trust"
      className="relative overflow-hidden bg-white px-5 py-12 sm:px-8 lg:px-14 lg:py-14"
    >
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-green-50 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-emerald-50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-9 text-center">
          <span className="inline-flex rounded-full border border-green-100 bg-green-50 px-5 py-2 text-xs font-bold tracking-[0.2em] text-green-800 sm:text-sm">
            TRUST & ACCESSIBILITY
          </span>

          <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[42px]">
            Connected Care that is{" "}
            <span className="text-green-700">
              Secure, Private & Inclusive
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-4xl text-sm leading-6 text-slate-600 sm:text-base">
            AarogyaLink is built with a focus on data privacy, reliability
            and equal access to healthcare for everyone — including rural
            and low-digital communities.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid items-center gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-10">

          {/* Single Main Visual */}
          <div className="flex items-center justify-center py-3">
            <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-gradient-to-br from-green-50 via-emerald-100 to-green-200 shadow-inner sm:h-72 sm:w-72 lg:h-80 lg:w-80">

              <div className="absolute inset-5 rounded-full border border-green-200/70" />
              <div className="absolute inset-10 rounded-full border border-green-300/50" />

              <div className="relative flex h-44 w-44 items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-green-600 to-green-900 shadow-[0_20px_50px_rgba(22,139,104,0.3)] sm:h-52 sm:w-52">
                <ShieldCheck
                  size={112}
                  strokeWidth={1.4}
                  className="text-white sm:h-32 sm:w-32"
                />

                <div className="absolute -bottom-4 -right-4 flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-white bg-green-100 text-green-700 shadow-lg">
                  <LockKeyhole size={30} />
                </div>
              </div>

              <div className="absolute -bottom-1 left-5 flex h-12 w-12 items-center justify-center rounded-xl border-2 border-white bg-green-600 text-white shadow-lg">
                <ShieldCheck size={25} />
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {trustFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="group flex min-h-[145px] items-start gap-4 rounded-2xl border border-green-100 bg-white p-5 shadow-[0_5px_20px_rgba(22,139,104,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-[0_10px_25px_rgba(22,139,104,0.12)] sm:p-5"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700 transition-colors group-hover:bg-green-100">
                    <Icon size={30} strokeWidth={1.8} />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {feature.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Bottom Trust Banner */}
        <div className="mt-9 grid grid-cols-1 gap-5 rounded-2xl bg-gradient-to-r from-green-700 via-emerald-800 to-green-950 px-6 py-6 text-white sm:grid-cols-3 sm:items-center sm:gap-4 sm:px-8">

          <div className="flex items-center justify-center gap-3 sm:justify-start">
            <Award size={34} className="shrink-0 text-green-100" />
            <div>
              <h3 className="font-bold">Trusted Platform</h3>
              <p className="text-xs text-green-100">Built for safer care</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 border-y border-white/20 py-4 sm:border-x sm:border-y-0 sm:py-0">
            <ShieldCheck size={30} className="shrink-0" />
            <span className="text-sm font-semibold">Secure by Design</span>
          </div>

          <div className="flex items-center justify-center gap-3 sm:justify-end">
            <WifiOff size={30} className="shrink-0" />
            <span className="text-sm font-semibold">
              Offline Friendly · For Everyone
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}


import {
  WifiOff,
  Languages,
  BrainCircuit,
  ShieldAlert,
  FileHeart,
  ClipboardCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

function CoreFeatures() {
  const features = [
    {
      number: "01",
      icon: WifiOff,
      title: "Offline-First Access",
      description:
        "Access essential patient information without internet. Records sync when connectivity returns.",
      color: "bg-emerald-50 text-emerald-700",
    },
    {
      number: "02",
      icon: Languages,
      title: "Local Language Support",
      description:
        "Communicate easily with Hindi, regional languages and voice-based input.",
      color: "bg-blue-50 text-blue-700",
    },
    {
      number: "03",
      icon: BrainCircuit,
      title: "AI-Assisted Summaries",
      description:
        "Organize symptoms and medical history into structured summaries for doctors.",
      color: "bg-violet-50 text-violet-700",
    },
    {
      number: "04",
      icon: ShieldAlert,
      title: "Smart Risk Alerts",
      description:
        "Highlight potentially urgent cases using transparent, clinician-approved rules.",
      color: "bg-orange-50 text-orange-700",
    },
    {
      number: "05",
      icon: FileHeart,
      title: "Digital Health Records",
      description:
        "Keep patient history, consultation details and prescriptions organized securely.",
      color: "bg-pink-50 text-pink-700",
    },
    {
      number: "06",
      icon: ClipboardCheck,
      title: "Referral & Follow-up",
      description:
        "Track referrals, appointments and follow-up progress in one place.",
      color: "bg-teal-50 text-teal-700",
    },
  ];

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-white px-5 py-10 sm:px-8 lg:px-12 lg:py-12"
    >
      <div className="mx-auto max-w-[1450px]">

        {/* SECTION HEADER */}
        <div className="mb-7 text-center">

          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-[#f3fbf6] px-5 py-2 text-xs font-extrabold tracking-widest text-[#168b68]">
            <span className="h-2 w-2 rounded-full bg-[#15966e]" />
            CORE FEATURES
          </div>

          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-[#152b43] sm:text-4xl lg:text-5xl">
            Everything You Need for{" "}
            <span className="text-[#15966e]">
              Connected Healthcare.
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#71847d] sm:text-base">
            Thoughtfully designed features that make healthcare
            accessible, connected and reliable for rural communities.
          </p>

        </div>

        {/* COMPACT SHOWCASE */}
        <div className="mb-8 grid items-center gap-5 overflow-hidden rounded-3xl border border-[#e7f1ea] bg-gradient-to-br from-[#f0faf4] via-white to-[#e8f7ef] px-6 py-5 sm:px-8 lg:grid-cols-2 lg:gap-8">

          {/* LEFT CONTENT */}
          <div className="relative z-10">

            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#168b68] shadow-sm">
              <BrainCircuit size={24} />
            </div>

            <p className="mb-2 text-[11px] font-extrabold tracking-widest text-[#168b68]">
              INTELLIGENCE THAT ASSISTS
            </p>

            <h3 className="font-display text-2xl font-extrabold leading-tight text-[#173b3a] sm:text-3xl">
              Technology that supports{" "}
              <span className="text-[#15966e]">
                better decisions.
              </span>
            </h3>

            <p className="mt-3 max-w-lg text-sm leading-6 text-[#71847d]">
              AarogyaLink organizes patient information and helps
              healthcare workers connect doctors with relevant
              details for professional review.
            </p>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">

              {[
                "Human-led decisions",
                "Offline-first access",
                "Secure health records",
              ].map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-2 text-xs font-semibold text-[#315b4e]"
                >
                  <CheckCircle2
                    size={16}
                    className="shrink-0 text-[#15966e]"
                  />
                  {point}
                </div>
              ))}

            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex min-w-0 items-center justify-center">

            <div className="absolute h-4/5 w-4/5 rounded-full bg-[#c9efdc] blur-3xl" />

            <img
              src="/aarogyalink-dashboard-mockup.png"
              alt="AarogyaLink healthcare dashboard"
              loading="lazy"
              className="relative z-10 h-auto max-h-[230px] w-full object-contain drop-shadow-lg"
            />

          </div>
        </div>

        {/* FEATURES HEADING */}
        <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">

          <div>
            <p className="mb-1 text-[11px] font-extrabold tracking-widest text-[#168b68]">
              BUILT AROUND REAL NEEDS
            </p>

            <h3 className="font-display text-xl font-extrabold text-[#173b3a] sm:text-2xl">
              Features that make a difference.
            </h3>
          </div>

          <p className="max-w-md text-xs leading-5 text-[#71847d]">
            Every feature solves a practical challenge in the
            rural healthcare journey.
          </p>

        </div>

        {/* SIX COMPACT FEATURE CARDS */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.number}
                className="group rounded-2xl border border-[#e8f0eb] bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_12px_30px_rgba(21,60,55,0.08)] sm:p-5"
              >

                {/* CARD HEADER */}
                <div className="mb-3 flex items-center justify-between">

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${feature.color}`}
                  >
                    <Icon size={23} />
                  </div>

                  <span className="text-xs font-extrabold tracking-wider text-[#bdcec3]">
                    {feature.number}
                  </span>

                </div>

                {/* CARD CONTENT */}
                <h4 className="mb-2 text-base font-extrabold text-[#173b3a]">
                  {feature.title}
                </h4>

                <p className="text-xs leading-5 text-[#71847d] sm:text-sm">
                  {feature.description}
                </p>

                {/* CARD FOOTER */}
                <div className="mt-3 flex items-center justify-between border-t border-[#edf3ef] pt-3">

                  <span className="text-[10px] font-bold tracking-wide text-[#168b68]">
                    AAROGYALINK
                  </span>

                  <ArrowRight
                    size={17}
                    className="text-[#15966e] transition-transform duration-300 group-hover:translate-x-1"
                  />

                </div>

              </article>
            );
          })}

        </div>

        {/* COMPACT BOTTOM BANNER */}
        <div className="mt-7 flex flex-col items-center justify-center gap-2 rounded-2xl bg-[#153c37] px-5 py-5 text-center sm:flex-row sm:gap-6 sm:py-6">

          <div>
            <p className="mb-1 text-[10px] font-extrabold tracking-widest text-[#8de0b9]">
              CARE WITHOUT BARRIERS
            </p>

            <h3 className="font-display text-lg font-extrabold text-white sm:text-xl">
              Designed for people. Powered by technology.
            </h3>
          </div>

          <div className="hidden h-10 w-px bg-white/20 sm:block" />

          <p className="max-w-md text-xs leading-5 text-[#c0d8ce] sm:text-sm">
            Connecting patients, community health workers and
            qualified doctors through one platform.
          </p>

        </div>

      </div>
    </section>
  );
}

export default CoreFeatures;

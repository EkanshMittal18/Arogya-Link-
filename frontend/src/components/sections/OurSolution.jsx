
import {
  Stethoscope,
  Wifi,
  Pill,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

function OurSolution() {
  const solutions = [
    {
      icon: Stethoscope,
      title: "End-to-End Healthcare",
      description:
        "From appointments and consultations to prescriptions and follow-ups, everything stays connected.",
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      icon: Wifi,
      title: "Built for Rural India",
      description:
        "Designed for low-connectivity areas with offline support, local languages, SMS and IVR assistance.",
      color: "bg-blue-100 text-blue-700",
    },
    {
      icon: Pill,
      title: "Smart Medicine Access",
      description:
        "Help patients discover nearby verified medicine sources and check medicine availability.",
      color: "bg-orange-100 text-orange-700",
    },
    {
      icon: ShieldCheck,
      title: "Secure & Connected Records",
      description:
        "Keep patient history, prescriptions and referrals organized with privacy-focused access.",
      color: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <section
      id="solution"
      className="relative overflow-hidden bg-gradient-to-b from-white via-[#f7fcf9] to-[#edfaf3] px-5 py-10 sm:px-8 lg:px-12 lg:py-12"
    >
      <div className="mx-auto max-w-[1450px]">

        {/* COMPACT SECTION HEADING */}
        <div className="mx-auto mb-8 max-w-5xl text-center">

          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-5 py-2 text-xs font-extrabold tracking-widest text-[#168b68] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#15966e]" />
            OUR SOLUTION
          </div>

          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-[#152b43] sm:text-4xl lg:text-5xl">
            AarogyaLink: One Connected Journey
            <span className="mt-1 block text-[#15966e]">
              from Care to Medicine
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-[#687d77] sm:text-base">
            A unified, offline-first healthcare platform connecting
            patients, doctors, hospitals and medicine sources —
            especially for rural India.
          </p>
        </div>

        {/* MAIN SOLUTION LAYOUT */}
        <div className="grid items-center gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">

          {/* LEFT: DEVICE IMAGE */}
          <div className="relative min-w-0">

            <div className="absolute left-1/2 top-1/2 h-4/5 w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9f0df] blur-3xl" />

            <div className="relative rounded-3xl border border-white bg-white/80 p-4 shadow-[0_15px_45px_rgba(21,60,55,0.07)] sm:p-5">

              {/* IMAGE HEADER */}
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e4f5ec] text-[#168b68]">
                  <Stethoscope size={21} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#173b3a] sm:text-base">
                    Connected Healthcare Platform
                  </h3>
                  <p className="text-xs text-[#71847d]">
                    One platform. Every step of care.
                  </p>
                </div>
              </div>

              {/* MAIN IMAGE */}
              <img
                src="/aarogyalink-devices.png"
                alt="AarogyaLink patient dashboard on laptop and mobile"
                loading="lazy"
                className="relative z-10 mx-auto h-auto max-h-[310px] w-full object-contain"
              />

              {/* IMAGE HIGHLIGHTS */}
              <div className="mt-2 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[11px] font-semibold text-[#168b68] sm:text-xs">
                <span>✓ Patient Dashboard</span>
                <span>✓ Mobile Access</span>
                <span>✓ Connected Care</span>
              </div>

            </div>
          </div>

          {/* RIGHT: SOLUTION CARDS */}
          <div className="flex flex-col gap-3">

            {solutions.map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="group flex items-center gap-4 rounded-2xl border border-[#e8f1eb] bg-white p-4 shadow-[0_5px_20px_rgba(21,60,55,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_12px_30px_rgba(21,60,55,0.08)] sm:p-5"
                >

                  {/* ICON */}
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl sm:h-14 sm:w-14 ${item.color}`}
                  >
                    <Icon size={25} />
                  </div>

                  {/* TEXT */}
                  <div className="min-w-0 flex-1">

                    <div className="mb-1 flex items-center justify-between gap-2">
                      <h3 className="text-sm font-extrabold text-[#173b3a] sm:text-base">
                        {item.title}
                      </h3>

                      <span className="shrink-0 text-xs font-bold text-[#b4c9be]">
                        0{index + 1}
                      </span>
                    </div>

                    <p className="text-xs leading-5 text-[#71847d] sm:text-sm sm:leading-6">
                      {item.description}
                    </p>

                  </div>

                  <ArrowRight
                    size={18}
                    className="hidden shrink-0 text-[#15966e] transition-transform group-hover:translate-x-1 sm:block"
                  />

                </article>
              );
            })}

          </div>
        </div>

        {/* COMPACT BOTTOM BANNER */}
        <div className="mt-8 rounded-2xl border border-emerald-100 bg-[#e9f7ef] px-5 py-5 text-center sm:px-8 sm:py-6">

          <h3 className="font-display text-xl font-extrabold text-[#173b3a] sm:text-2xl">
            From the first consultation to the right medicine.
          </h3>

          <p className="mx-auto mt-2 max-w-2xl text-xs leading-5 text-[#71847d] sm:text-sm">
            AarogyaLink brings every step closer, making healthcare
            coordination simpler, smarter and more accessible.
          </p>

        </div>

      </div>
    </section>
  );
}

export default OurSolution;

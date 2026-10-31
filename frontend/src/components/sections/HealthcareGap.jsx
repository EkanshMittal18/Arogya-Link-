
import {
  Stethoscope,
  Languages,
  WifiOff,
  Clock,
  Users,
  Activity,
  ArrowRight,
} from "lucide-react";

function HealthcareGap() {
  const challenges = [
    {
      icon: Stethoscope,
      title: "Limited Access to Doctors",
      description:
        "Qualified healthcare professionals are often far from rural communities.",
      color: "bg-emerald-50 text-emerald-700",
    },
    {
      icon: Languages,
      title: "Language Barriers",
      description:
        "Patients struggle to explain symptoms in a language they understand.",
      color: "bg-blue-50 text-blue-700",
    },
    {
      icon: WifiOff,
      title: "Poor Connectivity",
      description:
        "Unreliable internet makes digital healthcare difficult to access.",
      color: "bg-purple-50 text-purple-700",
    },
    {
      icon: Clock,
      title: "Delayed Treatment",
      description:
        "Healthcare barriers can delay medical attention and increase health risks.",
      color: "bg-orange-50 text-orange-700",
    },
  ];

  return (
    <section
      id="gap"
      className="relative overflow-hidden bg-gradient-to-b from-white via-[#f7fcf9] to-[#eaf8f1] px-5 py-9 sm:px-8 lg:px-12 lg:py-10"
    >
      <div className="mx-auto max-w-[1500px]">

        {/* COMPACT SECTION HEADER */}
        <div className="mb-7 max-w-4xl">

          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 text-xs font-extrabold tracking-wider text-[#168b68]">
            <span className="h-2 w-2 rounded-full bg-[#15966e]" />
            THE HEALTHCARE GAP
          </div>

          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-[#152b43] sm:text-4xl lg:text-5xl">
            Healthcare Isn't Equally
            <span className="block text-[#15966e]">
              Accessible to Everyone.
            </span>
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#687d77] sm:text-base">
            For millions in rural communities, reaching the right
            doctor is still a challenge. Distance, language and poor
            connectivity create barriers to quality healthcare.
          </p>

        </div>

        {/* MAIN CONTENT */}
        <div className="grid items-center gap-5 lg:grid-cols-[1fr_0.95fr] lg:gap-7">

          {/* LEFT: FOUR CHALLENGE CARDS */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

            {challenges.map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="group rounded-2xl border border-[#e6f0ea] bg-white p-4 shadow-[0_5px_20px_rgba(21,60,55,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_12px_28px_rgba(21,60,55,0.08)] sm:p-5"
                >

                  <div className="mb-3 flex items-center justify-between">

                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.color}`}
                    >
                      <Icon size={23} />
                    </div>

                    <span className="text-xs font-extrabold text-[#b6c9bf]">
                      0{index + 1}
                    </span>

                  </div>

                  <h3 className="mb-2 text-base font-extrabold text-[#173b3a]">
                    {item.title}
                  </h3>

                  <p className="text-xs leading-5 text-[#71847d] sm:text-sm sm:leading-6">
                    {item.description}
                  </p>

                </article>
              );
            })}

          </div>

          {/* RIGHT: SINGLE HEALTHCARE IMAGE */}
          <div className="relative mx-auto w-full max-w-[570px]">

            <div className="absolute inset-5 rounded-[45%] bg-[#c9efdd] blur-2xl" />

            <div className="relative overflow-hidden rounded-3xl border border-white bg-gradient-to-br from-[#e2f7ed] to-[#f5fbf7] p-3 shadow-[0_15px_40px_rgba(21,60,55,0.08)] sm:p-5">

              <img
                src="/healthcare-consultation.png"
                alt="Doctor helping a rural patient with a digital consultation"
                loading="lazy"
                className="relative z-10 mx-auto h-auto max-h-[350px] w-full object-contain"
              />

              {/* IMAGE CAPTION */}
              <div className="relative z-20 mt-2 rounded-xl border border-white bg-white/95 p-3 shadow-sm sm:p-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e4f5ec] text-[#168b68]">
                    <Activity size={21} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#173b3a]">
                      Every Patient Deserves Care
                    </h3>

                    <p className="mt-1 text-xs text-[#71847d]">
                      Distance should never decide access to healthcare.
                    </p>
                  </div>

                </div>
              </div>

            </div>

            {/* FLOATING BADGE */}
            <div className="absolute -right-1 top-5 z-20 hidden items-center gap-2 rounded-xl border border-white bg-white px-3 py-2.5 text-xs font-bold text-[#168b68] shadow-lg sm:flex">
              <Users size={17} />
              Rural Communities
            </div>

          </div>

        </div>

        {/* COMPACT BOTTOM MESSAGE */}
        <div className="mt-7 flex flex-col justify-between gap-4 rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-sm sm:flex-row sm:items-center sm:px-7 sm:py-5">

          <div>
            <p className="mb-1 text-[10px] font-extrabold tracking-widest text-[#168b68]">
              THE REAL CHALLENGE
            </p>

            <h3 className="max-w-3xl font-display text-lg font-extrabold leading-snug text-[#173b3a] sm:text-xl lg:text-2xl">
              Healthcare is not just about finding a doctor.
              <span className="text-[#15966e]">
                {" "}It's about reaching the right care.
              </span>
            </h3>
          </div>

          <a
            href="#solution"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#168b68] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#106e53] sm:text-sm"
          >
            Explore Our Solution
            <ArrowRight size={17} />
          </a>

        </div>

      </div>
    </section>
  );
}

export default HealthcareGap;

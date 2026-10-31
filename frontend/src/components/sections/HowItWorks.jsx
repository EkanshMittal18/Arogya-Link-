import {
  UserPlus,
  BrainCircuit,
  Stethoscope,
  ClipboardCheck,
  ArrowRight,
  CheckCircle2,
  WifiOff,
} from "lucide-react";

function HowItWorks() {

  // HOW IT WORKS - FOUR MAIN STEPS
  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "Patient Information",
      subtitle: "Start with understanding",
      description:
        "Community Health Workers register patients and collect their symptoms, medical history and basic health information.",
      points: [
        "Patient registration",
        "Local language input",
        "Voice or text information",
      ],
      color: "bg-blue-50 text-blue-600",
    },
    {
      number: "02",
      icon: BrainCircuit,
      title: "AI Assistance",
      subtitle: "Organize information",
      description:
        "AI helps organize the collected information into a structured summary that makes it easier for doctors to review.",
      points: [
        "Speech-to-text assistance",
        "Structured patient summary",
        "Clinician-approved risk flags",
      ],
      color: "bg-purple-50 text-purple-600",
    },
    {
      number: "03",
      icon: Stethoscope,
      title: "Doctor Review",
      subtitle: "Professional care decisions",
      description:
        "Qualified doctors review patient information, assess the case and make appropriate clinical decisions.",
      points: [
        "Patient history review",
        "Doctor consultation",
        "Digital prescription",
      ],
      color: "bg-emerald-50 text-emerald-700",
    },
    {
      number: "04",
      icon: ClipboardCheck,
      title: "Referral & Follow-up",
      subtitle: "Stay connected",
      description:
        "Patients receive referral guidance and follow-up support so their healthcare journey does not stop after consultation.",
      points: [
        "Hospital referrals",
        "Medicine information",
        "Follow-up tracking",
      ],
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <section
      id="workflow"
      className="relative overflow-hidden bg-[#f6faf8] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px]">

        {/* SECTION HEADER */}
        <div className="mx-auto mb-20 max-w-3xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-5 py-2.5 text-xs font-extrabold tracking-widest text-[#168b68]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#15966e]" />
            HOW IT WORKS
          </div>

          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-[#152b43] sm:text-4xl md:text-5xl lg:text-6xl">
            From First Symptoms to
            <span className="block text-[#15966e]">
              Connected Care.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#71847d] sm:text-lg">
            A simple, connected process that brings patients,
            community health workers and qualified doctors together.
          </p>
        </div>

        {/* FOUR STEP PROCESS */}
        <div className="relative">

          {/* DESKTOP CONNECTING LINE */}
          <div className="absolute left-[12%] right-[12%] top-10 hidden border-t-2 border-dashed border-[#b9dfca] lg:block" />

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="group relative rounded-3xl border border-[#e5eee8] bg-white p-6 shadow-[0_10px_35px_rgba(21,60,55,0.04)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(21,60,55,0.09)] sm:p-7"
                >

                  {/* STEP NUMBER AND ICON */}
                  <div className="relative z-10 mb-8 flex items-center justify-between">

                    <div
                      className={`flex h-[76px] w-[76px] items-center justify-center rounded-3xl border-[7px] border-white shadow-sm ${step.color}`}
                    >
                      <Icon size={30} />
                    </div>

                    <span className="font-display text-3xl font-extrabold text-[#dcece3]">
                      {step.number}
                    </span>

                  </div>

                  {/* STEP CONTENT */}
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#15966e]">
                    {step.subtitle}
                  </p>

                  <h3 className="mb-4 text-xl font-extrabold text-[#173b3a]">
                    {step.title}
                  </h3>

                  <p className="min-h-[112px] text-sm leading-7 text-[#71847d]">
                    {step.description}
                  </p>

                  {/* STEP CHECKLIST */}
                  <div className="mt-6 space-y-3 border-t border-[#edf2ee] pt-5">

                    {step.points.map((point) => (
                      <div
                        key={point}
                        className="flex items-start gap-2 text-xs font-semibold text-[#526d62]"
                      >
                        <CheckCircle2
                          size={16}
                          className="mt-0.5 shrink-0 text-[#15966e]"
                        />
                        <span>{point}</span>
                      </div>
                    ))}

                  </div>

                  {/* MOBILE / TABLET ARROW */}
                  {index !== steps.length - 1 && (
                    <div className="absolute -bottom-5 left-1/2 z-20 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-emerald-100 bg-white text-[#168b68] shadow-sm lg:hidden">
                      <ArrowRight size={17} className="rotate-90" />
                    </div>
                  )}

                </article>
              );
            })}

          </div>
        </div>

        {/* OFFLINE SUPPORT HIGHLIGHT */}
        <div className="mt-16 flex flex-col gap-5 rounded-3xl border border-emerald-100 bg-white p-7 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-9">

          <div className="flex items-start gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#e5f6ed] text-[#168b68]">
              <WifiOff size={27} />
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-[#173b3a] sm:text-xl">
                Healthcare that works beyond connectivity.
              </h3>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-[#71847d]">
                CHWs can capture essential patient information offline.
                Records can synchronize securely when the internet becomes available.
              </p>
            </div>

          </div>

          <div className="shrink-0 rounded-full bg-[#e8f7ef] px-5 py-3 text-xs font-extrabold text-[#168b68]">
            OFFLINE-FIRST PLATFORM
          </div>

        </div>

        {/* BOTTOM MESSAGE */}
        <div className="mt-14 text-center">

          <h3 className="font-display text-2xl font-extrabold text-[#173b3a] sm:text-3xl">
            One journey. Four steps.
            <span className="text-[#15966e]"> Better-connected care.</span>
          </h3>

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;
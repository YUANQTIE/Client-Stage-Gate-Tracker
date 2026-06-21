"use client";

interface StageGateStepperProps {
  activePhase: number;
  setActivePhase: (phase: number) => void;
}

const phases = [
  { number: 1, name: "Phase 1", subtitle: "Discovery" },
  { number: 2, name: "Phase 2", subtitle: "Core Dev" },
  { number: 3, name: "Phase 3", subtitle: "Production" },
  { number: 4, name: "Phase 4", subtitle: "Deployment" },
];

const gates = [
  { label: "GATE REVIEW", phaseIndex: 0 },
  { label: "GATE", phaseIndex: 1 },
  { label: "GATE", phaseIndex: 2 },
  { label: "GATE", phaseIndex: 3 },
];

export function StageGateStepper({ activePhase, setActivePhase }: StageGateStepperProps) {
  return (
    <div className="relative bg-white border border-[#E2E8F0] rounded-xl shadow-sm mb-8">
      <div className="px-8 py-8">
        <div className="flex justify-between items-start relative">
          {phases.map((phase, idx) => {
            const isActive = phase.number === activePhase;
            const isCompleted = phase.number < activePhase;
            const isPending = phase.number > activePhase;

            return (
              <div key={phase.number} className="relative flex flex-col items-center flex-1">
                {/* Phase Node */}
                <button
                  onClick={() => setActivePhase(phase.number)}
                  className="relative z-10 focus:outline-none group"
                >
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      transition-all duration-200
                      ${isActive 
                        ? "bg-[#4F46E5] border-2 border-[#4F46E5] shadow-lg" 
                        : isCompleted
                        ? "bg-[#3525CD] border-2 border-white shadow-md"
                        : "bg-white border-2 border-[#E2E8F0] group-hover:border-[#4F46E5]"
                      }
                    `}
                  >
                    {isCompleted ? (
                      <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                        <path
                          d="M1 6L5.5 10.5L15 1"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <span
                        className={`
                          font-semibold text-sm
                          ${isActive ? "text-white" : isPending ? "text-[#94A3B8]" : "text-[#475569]"}
                        `}
                      >
                        {phase.number}
                      </span>
                    )}
                  </div>
                </button>

                {/* Phase Labels */}
                <div className="mt-3 text-center">
                  <div
                    className={`
                      text-xs font-semibold tracking-wide
                      ${isActive ? "text-[#4F46E5]" : isPending ? "text-[#94A3B8]" : "text-[#475569]"}
                    `}
                  >
                    {phase.name}
                  </div>
                  <div
                    className={`
                      text-[11px] mt-0.5
                      ${isActive ? "text-[#4F46E5]" : isPending ? "text-[#94A3B8]" : "text-[#64748B]"}
                    `}
                  >
                    {phase.subtitle}
                  </div>
                </div>

                {/* Diamond Gate - positioned between phases */}
                {idx < phases.length - 1 && (
                  <div className="absolute -right-[calc(15%-20px)] top-3">
                    <div className="relative">
                      {/* Diamond shape */}
                      <div className={`w-6 h-6 border-2 rotate-45 border-[#CBD5E1] transition-all duration-200
                                ${isCompleted 
                                    ? "bg-[#F1F5F9]" 
                                    : "bg-[F1F5F9]"
                                }
                                `}
                      />

                      {/* Gate label */}
                      <div className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap top-8">
                        <span className="text-[9px] font-bold text-[#64748B] uppercase tracking-wider 
                        bg-white px-2 py-0.5 rounded">
                          GATE
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Connecting Line */}
        <div className="absolute left-[calc(8%+20px)] right-[calc(8%+20px)] top-[calc(50%+4px)] h-0.5 bg-[#E2E8F0] -translate-y-1/2" />
      </div>
    </div>
  );
}
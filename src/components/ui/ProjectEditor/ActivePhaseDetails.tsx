"use client";

interface ActivePhaseDetailsProps {
  activePhase: number;
}

export function ActivePhaseDetails({ activePhase }: ActivePhaseDetailsProps) {
  const phaseData = {
    1: {
      name: "Discovery & Research",
      description: "Initial market research, competitor analysis, and requirement gathering from stakeholders.",
    },
    2: {
      name: "Core Development & Integration",
      description: "Implementation of core backend services, identity provider integration, and primary user dashboards.",
    },
    3: {
      name: "Beta Launch & Testing",
      description: "Internal beta testing, user acceptance testing, and performance optimization.",
    },
    4: {
      name: "Production Deployment",
      description: "Final deployment to production, monitoring setup, and post-launch support.",
    },
  };

  const currentPhase = phaseData[activePhase as keyof typeof phaseData] || phaseData[2];

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm mb-8 relative">
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#4F46E5] rounded-l-xl" />

      <div className="p-6 pl-7">
        {/* Header */}
        <div className="flex justify-between items-start mb-5">
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 2V16M2 9H16"
                stroke="#4F46E5"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="9" cy="9" r="2.5" fill="#4F46E5" />
            </svg>
            <h2 className="text-base font-semibold text-[#0F172A]">
              Active Phase Details
            </h2>
          </div>
          <div className="px-2.5 py-1 bg-[#EFF6FF] text-[#4F46E5] rounded-md">
            <span className="text-[10px] font-bold tracking-wide">
              PHASE {activePhase}
            </span>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-[1fr,2fr] gap-6">
          <div>
            <label className="block text-xs font-semibold text-[#475569] mb-1.5">
              Phase Name
            </label>
            <input
              type="text"
              value={currentPhase.name}
              onChange={() => {}}
              className="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#475569] mb-1.5">
              Description
            </label>
            <textarea
              value={currentPhase.description}
              onChange={() => {}}
              rows={2}
              className="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-sm text-[#0F172A] resize-none focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
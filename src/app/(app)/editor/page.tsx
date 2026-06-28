"use client";
import Sidebar from '@/components/layout/sidebar';

import { useState } from "react";
import {
  StageGateStepper,
  ActivePhaseDetails,
  ModulesCard,
  ScreenApiTracker,
} from "@/components/ui/ProjectEditor";

export default function EditorPage() {
  const [activePhase, setActivePhase] = useState(2);

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <Sidebar>
      <div className="max-w-[1400px] mx-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-end pb-6 mb-6 border-b border-[#E2E8F0]">
          <div>
            <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
              Structure Editor
            </h1>
            <p className="text-sm text-[#64748B] mt-1">
              Define project phases, modules, and workflows.
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] transition-all shadow-sm">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1V13M1 7H13"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="font-semibold text-sm">Add Phase</span>
          </button>
        </div>

        {/* Stage-Gate Pipeline Stepper */}
        <StageGateStepper activePhase={activePhase} setActivePhase={setActivePhase} />

        {/* Active Phase Details Editor */}
        <ActivePhaseDetails activePhase={activePhase} />

        {/* Modules & Workflows Area */}
        <ModulesCard activePhase={activePhase} />

        {/* Screen & API Tracker */}
        {/*<ScreenApiTracker /> */}
        {/* <ScreenApiTracker /> */}
      </div>
      </Sidebar>
    </div>
  );
}
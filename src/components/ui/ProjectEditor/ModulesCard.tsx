"use client";

import { useState } from "react";

interface Workflow {
  id: string;
  name: string;
  tags: string[];
  ticketCount: number;
  progress: number;
}

interface ModulesCardProps {
  activePhase: number;
}

const workflowsData: Workflow[] = [
  {
    id: "1",
    name: "User Login Flow",
    tags: ["Frontend"],
    ticketCount: 8,
    progress: 75,
  },
  {
    id: "2",
    name: "Password Reset",
    tags: ["Backend"],
    ticketCount: 3,
    progress: 30,
  },
];

export function ModulesCard({ activePhase }: ModulesCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [workflows, setWorkflows] = useState(workflowsData);

  const addWorkflow = () => {
    const newWorkflow: Workflow = {
      id: Date.now().toString(),
      name: "New Workflow",
      tags: ["Draft"],
      ticketCount: 0,
      progress: 0,
    };
    setWorkflows([...workflows, newWorkflow]);
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-[#0F172A]">Modules</h3>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#4F46E5] text-white text-sm font-semibold rounded-lg hover:bg-[#4338CA] transition-all shadow-sm">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2V12M2 7H12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Add Module
        </button>
      </div>

      {/* Module Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm overflow-hidden">
        {/* Module Header */}
        <div
          className="flex justify-between items-center px-5 py-4 bg-[#F8FAFC] border-b border-[#E2E8F0] cursor-pointer hover:bg-[#F1F5F9] transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-3">
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              className={`transform transition-transform ${isExpanded ? "rotate-180" : ""}`}
            >
              <path d="M1 1L6 6L11 1" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <div>
              <h4 className="font-semibold text-sm text-[#0F172A]">
                Module 1: Authentication & Identity
              </h4>
              <p className="text-xs text-[#64748B] mt-0.5">SSO, JWT, User Roles</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Sample users */}
            <div className="relative w-6 h-6">
              <div className="absolute inset-0 bg-[#4F46E5] rounded-full flex items-center justify-center shadow-[0_0_0_2px_#FAF8FF]">
                <span className="text-[10px] font-bold text-white">6</span>
              </div>
            </div>
            <div className="w-6 h-6 bg-[#006C49] rounded-full flex items-center justify-center shadow-[0_0_0_2px_#FAF8FF]">
              <span className="text-[10px] font-bold text-white">7</span>
            </div>
            <div className="w-px h-4 bg-[#C7C4D8] mx-2" />

            {/* Elipses */}
            <button className="opacity-100">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="1.75" fill="#C7C4D8"/>
                <circle cx="7" cy="2.4" r="1.75" fill="#C7C4D8" />
                <circle cx="7" cy="11.6" r="1.75" fill="#C7C4D8" />
              </svg>
            </button>
          </div>
        </div>

        {/* Workflows List */}
        {isExpanded && (
          <div className="bg-white">
            {workflows.map((workflow) => (
              <div
                key={workflow.id}
                className="flex items-center justify-between px-4 py-3 border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors group"
              >
                <div className="flex items-center gap-3 flex-1">
                  <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                    <circle cx="3" cy="3" r="2" fill="#94A3B8" />
                  </svg>
                  <span className="font-medium text-sm text-[#0F172A]">
                    {workflow.name}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {/* Tags */}
                  <div className="flex gap-1.5">
                    {workflow.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-[#EFF6FF] text-[#3B82F6] rounded text-[10px] font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Ticket Count */}
                  <div className="flex items-center gap-1.5 min-w-[90px]">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M6 0L7.5 3.5L11 4L8.5 6.5L9 10L6 8L3 10L3.5 6.5L1 4L4.5 3.5L6 0Z"
                        fill="#94A3B8"
                      />
                    </svg>
                    <span className="text-xs text-[#64748B]">
                      {workflow.ticketCount} Tickets
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="flex items-center gap-2 min-w-[140px]">
                    <div className="w-20 h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#4F46E5] rounded-full transition-all"
                        style={{ width: `${workflow.progress}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-[#475569]">
                      {workflow.progress}%
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Workflow Button */}
            <button
              onClick={addWorkflow}
              className="w-full m-3 py-2 border-2 border-dashed border-[#CBD5E1] rounded-lg flex items-center justify-center gap-2 hover:bg-[#F8FAFC] hover:border-[#4F46E5] transition-all"
              style={{ width: "calc(100% - 24px)" }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1V11M1 6H11" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="text-sm font-medium text-[#64748B]">
                Add Workflow
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
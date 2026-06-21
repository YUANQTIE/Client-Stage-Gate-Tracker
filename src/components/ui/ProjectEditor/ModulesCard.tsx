"use client";

import { useState } from "react";
import { Module, Phase, Workflow } from "@/app/(app)/editor/page";
import { WorkflowsList } from "./WorkflowsList";

interface ModulesCardProps {
  activePhase: number;
  phases: Phase[];
  setPhases: (phases: Phase[]) => void;
}

export function ModulesCard({ activePhase, phases, setPhases }: ModulesCardProps) {
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(["1"]));
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState<string | null>(null);

  // Get modules for the current active phase
  const currentPhase = phases.find(p => p.number === activePhase);
  const modules = currentPhase?.modules || [];

  // Module form state
  const [moduleFormData, setModuleFormData] = useState({
    name: "",
    description: "",
    roles: "",
  });

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  // Module CRUD operations
  const openCreateModuleModal = () => {
    setEditingModule(null);
    setModuleFormData({ name: "", description: "", roles: "" });
    setIsModuleModalOpen(true);
  };

  const openEditModuleModal = (module: Module) => {
    setEditingModule(module);
    setModuleFormData({
      name: module.name,
      description: module.description,
      roles: module.roles.join(", "),
    });
    setIsModuleModalOpen(true);
  };

  const closeModuleModal = () => {
    setIsModuleModalOpen(false);
    setEditingModule(null);
    setModuleFormData({ name: "", description: "", roles: "" });
  };

  const handleSaveModule = () => {
    const rolesList = moduleFormData.roles.split(",").map((r) => r.trim()).filter(Boolean);
    
    const updatedPhases = phases.map((phase) => {
      if (phase.number !== activePhase) return phase;

      if (editingModule) {
        return {
          ...phase,
          modules: phase.modules.map((m) =>
            m.id === editingModule.id
              ? { ...m, name: moduleFormData.name, description: moduleFormData.description, roles: rolesList }
              : m
          ),
        };
      } else {
        const newModule: Module = {
          id: Date.now().toString(),
          name: moduleFormData.name || "New Module",
          description: moduleFormData.description || "Module description",
          roles: rolesList.length > 0 ? rolesList : ["Unassigned"],
          workflows: [],
        };
        return {
          ...phase,
          modules: [...phase.modules, newModule],
        };
      }
    });

    setPhases(updatedPhases);
    
    if (!editingModule) {
      const newId = Date.now().toString();
      setExpandedModules((prev) => new Set(prev).add(newId));
    }
    
    closeModuleModal();
  };

  const confirmDelete = (moduleId: string) => {
    setModuleToDelete(moduleId);
    setIsDeleteConfirmOpen(true);
    closeModuleModal();
  };

  const handleDeleteModule = () => {
    if (!moduleToDelete) return;
    
    const updatedPhases = phases.map((phase) => {
      if (phase.number !== activePhase) return phase;
      return {
        ...phase,
        modules: phase.modules.filter((m) => m.id !== moduleToDelete),
      };
    });
    setPhases(updatedPhases);
    
    setIsDeleteConfirmOpen(false);
    setModuleToDelete(null);
  };

  const handleUpdateWorkflows = (moduleId: string, workflows: Workflow[]) => {
    const updatedPhases = phases.map((phase) => {
      if (phase.number !== activePhase) return phase;
      return {
        ...phase,
        modules: phase.modules.map((m) =>
          m.id === moduleId
            ? { ...m, workflows }
            : m
        ),
      };
    });
    setPhases(updatedPhases);
  };

  const roleColors = ["#4F46E5", "#006C49", "#D97706", "#DC2626", "#7C3AED"];

  return (
    <div className="mb-8">
      {/* Header with Add Module button */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-[#0F172A]">
          Modules {currentPhase && `(Phase ${activePhase})`}
        </h3>
        <button
          onClick={openCreateModuleModal}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#4F46E5] text-white text-sm font-semibold rounded-lg hover:bg-[#4338CA] transition-all shadow-sm"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2V12M2 7H12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Add Module
        </button>
      </div>

      {/* Module Cards */}
      <div className="space-y-4">
        {modules.length === 0 ? (
          <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-8 text-center">
            <p className="text-sm text-[#64748B]">No modules yet for this phase.</p>
            <p className="text-xs text-[#94A3B8] mt-1">Click Add Module to create one.</p>
          </div>
        ) : (
          modules.map((module) => {
            const isExpanded = expandedModules.has(module.id);

            return (
              <div
                key={module.id}
                className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm overflow-hidden"
              >
                {/* Module Header */}
                <div className="flex justify-between items-center px-5 py-4 bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <div
                    className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity flex-1"
                    onClick={() => toggleModule(module.id)}
                  >
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
                        {module.name}
                      </h4>
                      <p className="text-xs text-[#64748B] mt-0.5">{module.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Role avatars */}
                    <div className="flex items-center -space-x-1">
                      {module.roles.slice(0, 3).map((role, idx) => (
                        <div
                          key={idx}
                          className="w-6 h-6 rounded-full flex items-center justify-center shadow-[0_0_0_2px_#FAF8FF]"
                          style={{ backgroundColor: roleColors[idx % roleColors.length] }}
                        >
                          <span className="text-[9px] font-bold text-white">
                            {role.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      ))}
                      {module.roles.length > 3 && (
                        <div className="w-6 h-6 bg-[#94A3B8] rounded-full flex items-center justify-center shadow-[0_0_0_2px_#FAF8FF]">
                          <span className="text-[9px] font-bold text-white">
                            +{module.roles.length - 3}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="w-px h-4 bg-[#C7C4D8] mx-2" />

                    {/* Edit button */}
                    <button
                      onClick={() => openEditModuleModal(module)}
                      className="opacity-60 hover:opacity-100 transition-opacity p-1 hover:bg-[#F1F5F9] rounded"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="1.75" fill="#64748B" />
                        <circle cx="7" cy="2.4" r="1.75" fill="#64748B" />
                        <circle cx="7" cy="11.6" r="1.75" fill="#64748B" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Workflows List */}
                {isExpanded && (
                  <WorkflowsList
                    workflows={module.workflows}
                    moduleId={module.id}
                    onUpdateWorkflows={(workflows) => handleUpdateWorkflows(module.id, workflows)}
                  />
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Module Modal */}
      {isModuleModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
            <button
              onClick={closeModuleModal}
              className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#475569] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <h2 className="text-xl font-bold text-[#0F172A] mb-2">
              {editingModule ? "Edit Module" : "Create New Module"}
            </h2>
            <p className="text-sm text-[#64748B] mb-6">
              {editingModule 
                ? "Update the module details below." 
                : `Fill in the details to create a new module for Phase ${activePhase}.`}
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#475569] mb-1.5">
                  Module Name *
                </label>
                <input
                  type="text"
                  value={moduleFormData.name}
                  onChange={(e) => setModuleFormData({ ...moduleFormData, name: e.target.value })}
                  placeholder="e.g., Authentication & Identity"
                  className="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#475569] mb-1.5">
                  Description
                </label>
                <input
                  type="text"
                  value={moduleFormData.description}
                  onChange={(e) => setModuleFormData({ ...moduleFormData, description: e.target.value })}
                  placeholder="e.g., SSO, JWT, User Roles"
                  className="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#475569] mb-1.5">
                  Roles (comma-separated)
                </label>
                <input
                  type="text"
                  value={moduleFormData.roles}
                  onChange={(e) => setModuleFormData({ ...moduleFormData, roles: e.target.value })}
                  placeholder="e.g., Frontend, Backend, DevOps"
                  className="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
                />
                <p className="text-xs text-[#94A3B8] mt-1.5">
                  Separate roles with commas
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#F1F5F9]">
              {editingModule && (
                <button
                  onClick={() => confirmDelete(editingModule.id)}
                  className="px-4 py-2 text-sm font-semibold text-[#EF4444] hover:text-[#DC2626] hover:bg-[#FEE2E2] rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Delete Module
                </button>
              )}
              
              <div className="flex gap-3 ml-auto">
                <button
                  onClick={closeModuleModal}
                  className="px-4 py-2 text-sm font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveModule}
                  className="px-4 py-2 bg-[#4F46E5] text-white text-sm font-semibold rounded-lg hover:bg-[#4338CA] transition-all shadow-sm"
                >
                  {editingModule ? "Save Changes" : "Create Module"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 relative">
            <h2 className="text-xl font-bold text-[#0F172A] mb-2">
              Delete Module
            </h2>
            <p className="text-sm text-[#64748B] mb-6">
              Are you sure you want to delete this module? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsDeleteConfirmOpen(false);
                  setModuleToDelete(null);
                }}
                className="px-4 py-2 text-sm font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteModule}
                className="px-4 py-2 bg-[#EF4444] text-white text-sm font-semibold rounded-lg hover:bg-[#DC2626] transition-all shadow-sm"
              >
                Delete Module
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
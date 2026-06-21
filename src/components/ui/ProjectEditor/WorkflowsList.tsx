"use client";

import { useState } from "react";
import { Workflow } from "@/app/(app)/editor/page";

interface WorkflowsListProps {
  workflows: Workflow[];
  moduleId: string;
  onUpdateWorkflows: (workflows: Workflow[]) => void;
}

export function WorkflowsList({ workflows, moduleId, onUpdateWorkflows }: WorkflowsListProps) {
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState<Workflow | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [workflowToDelete, setWorkflowToDelete] = useState<string | null>(null);

  // Workflow form state
  const [workflowFormData, setWorkflowFormData] = useState({
    name: "",
    tags: "",
  });

  const openCreateWorkflowModal = () => {
    setEditingWorkflow(null);
    setWorkflowFormData({ name: "", tags: "" });
    setIsWorkflowModalOpen(true);
  };

  const openEditWorkflowModal = (workflow: Workflow) => {
    setEditingWorkflow(workflow);
    setWorkflowFormData({
      name: workflow.name,
      tags: workflow.tags.join(", "),
    });
    setIsWorkflowModalOpen(true);
  };

  const closeWorkflowModal = () => {
    setIsWorkflowModalOpen(false);
    setEditingWorkflow(null);
    setWorkflowFormData({ name: "", tags: "" });
  };

  const handleSaveWorkflow = () => {
    const tagsList = workflowFormData.tags.split(",").map((t) => t.trim()).filter(Boolean);
    
    let updatedWorkflows: Workflow[];
    
    if (editingWorkflow) {
      // Edit existing workflow
      updatedWorkflows = workflows.map((w) =>
        w.id === editingWorkflow.id
          ? { 
              ...w, 
              name: workflowFormData.name || "New Workflow", 
              tags: tagsList.length > 0 ? tagsList : ["Draft"] 
            }
          : w
      );
    } else {
      // Create new workflow
      const newWorkflow: Workflow = {
        id: Date.now().toString(),
        name: workflowFormData.name || "New Workflow",
        tags: tagsList.length > 0 ? tagsList : ["Draft"],
        ticketCount: 0,
        progress: 0,
      };
      updatedWorkflows = [...workflows, newWorkflow];
    }

    onUpdateWorkflows(updatedWorkflows);
    closeWorkflowModal();
  };

  const confirmDelete = (workflowId: string) => {
    setWorkflowToDelete(workflowId);
    setIsDeleteConfirmOpen(true);
    closeWorkflowModal();
  };

  const handleDeleteWorkflow = () => {
    if (!workflowToDelete) return;
    const updatedWorkflows = workflows.filter((w) => w.id !== workflowToDelete);
    onUpdateWorkflows(updatedWorkflows);
    setIsDeleteConfirmOpen(false);
    setWorkflowToDelete(null);
  };

  return (
    <>
      {/* Workflows List */}
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

              {/* Workflow Actions */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openEditWorkflowModal(workflow)}
                  className="p-1 hover:bg-[#F1F5F9] rounded transition-colors"
                  title="Edit workflow"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M8.5 1.5L10.5 3.5L3.5 10.5L1 11L1.5 8.5L8.5 1.5Z" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 2.5L9.5 5" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                <button
                  onClick={() => confirmDelete(workflow.id)}
                  className="p-1 hover:bg-[#FEE2E2] rounded transition-colors"
                  title="Delete workflow"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M9 3L3 9M3 3L9 9" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add Workflow Button */}
        <button
          onClick={openCreateWorkflowModal}
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

      {/* Workflow Modal */}
      {isWorkflowModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
            <button
              onClick={closeWorkflowModal}
              className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#475569] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <h2 className="text-xl font-bold text-[#0F172A] mb-2">
              {editingWorkflow ? "Edit Workflow" : "Create New Workflow"}
            </h2>
            <p className="text-sm text-[#64748B] mb-6">
              {editingWorkflow 
                ? "Update the workflow details below." 
                : "Fill in the details to create a new workflow."}
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#475569] mb-1.5">
                  Workflow Name *
                </label>
                <input
                  type="text"
                  value={workflowFormData.name}
                  onChange={(e) => setWorkflowFormData({ ...workflowFormData, name: e.target.value })}
                  placeholder="e.g., User Login Flow"
                  className="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#475569] mb-1.5">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={workflowFormData.tags}
                  onChange={(e) => setWorkflowFormData({ ...workflowFormData, tags: e.target.value })}
                  placeholder="e.g., Frontend, Backend, DevOps"
                  className="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
                />
                <p className="text-xs text-[#94A3B8] mt-1.5">
                  Separate tags with commas
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#F1F5F9]">
              {editingWorkflow && (
                <button
                  onClick={() => confirmDelete(editingWorkflow.id)}
                  className="px-4 py-2 text-sm font-semibold text-[#EF4444] hover:text-[#DC2626] hover:bg-[#FEE2E2] rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Delete Workflow
                </button>
              )}
              
              <div className="flex gap-3 ml-auto">
                <button
                  onClick={closeWorkflowModal}
                  className="px-4 py-2 text-sm font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveWorkflow}
                  className="px-4 py-2 bg-[#4F46E5] text-white text-sm font-semibold rounded-lg hover:bg-[#4338CA] transition-all shadow-sm"
                >
                  {editingWorkflow ? "Save Changes" : "Create Workflow"}
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
              Delete Workflow
            </h2>
            <p className="text-sm text-[#64748B] mb-6">
              Are you sure you want to delete this workflow? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsDeleteConfirmOpen(false);
                  setWorkflowToDelete(null);
                }}
                className="px-4 py-2 text-sm font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteWorkflow}
                className="px-4 py-2 bg-[#EF4444] text-white text-sm font-semibold rounded-lg hover:bg-[#DC2626] transition-all shadow-sm"
              >
                Delete Workflow
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
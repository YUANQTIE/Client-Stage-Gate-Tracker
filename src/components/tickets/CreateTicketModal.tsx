'use client';

import { useState } from 'react';
import { Ticket, ColumnId } from './types';
import Input from '@/components/ui/input';

// ── Icons ─────────────────────────────────────────────────────────────────────

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function CloudUploadIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface CreateTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTicket: (ticket: Omit<Ticket, 'id'>) => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function CreateTicketModal({ isOpen, onClose, onCreateTicket }: CreateTicketModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [deadline, setDeadline] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    onCreateTicket({
      column: 'TODO' as ColumnId,
      title: title.trim(),
      description: description.trim() || undefined,
      type: type || undefined,
      typeColor: type === 'Frontend' ? 'bg-blue-500' : type === 'Backend' ? 'bg-green-500' : type === 'Integration' ? 'bg-purple-500' : undefined,
      deadline: deadline || undefined,
    });

    setTitle('');
    setDescription('');
    setType('');
    setDeadline('');
    onClose();
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl w-full max-w-[612px] max-h-[92vh] flex flex-col shadow-2xl">
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-5 shrink-0">
          <h2 className="text-lg font-semibold text-gray-900">New Ticket</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
          >
            <XIcon />
          </button>
        </div>

        <div className="h-px bg-gray-100 shrink-0" />

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Ticket Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Ticket Name <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="e.g., Update Landing Page Hero"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              placeholder="Provide detailed information about this ticket..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Type + Tags row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Type */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Type</label>
              <div className="relative">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 pr-9 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Select type</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Integration">Integration</option>
                  <option value="Design">Design</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <ChevronDownIcon />
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Tags</label>
              <div className="relative">
                <select className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 pr-9 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                  <option value="">Create tag</option>
                  <option value="urgent">Urgent</option>
                  <option value="api">API</option>
                  <option value="ux">UX</option>
                  <option value="auth">Auth</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <ChevronDownIcon />
                </div>
              </div>
            </div>
          </div>

          {/* Assigned To + Watcher row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Assigned To */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Assigned To</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <UserIcon />
                </div>
                <select className="w-full appearance-none rounded-lg border border-gray-200 bg-white pl-9 pr-9 py-2.5 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                  <option value="">Unassigned</option>
                  <option value="am">Alex M.</option>
                  <option value="mc">Michael Chen</option>
                  <option value="sj">Sarah Jenkins</option>
                  <option value="jk">Jane K.</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <ChevronDownIcon />
                </div>
              </div>
            </div>

            {/* Watcher */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Watcher</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <EyeIcon />
                </div>
                <select className="w-full appearance-none rounded-lg border border-gray-200 bg-white pl-9 pr-9 py-2.5 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                  <option value="">Add watchers...</option>
                  <option value="am">Alex M.</option>
                  <option value="mc">Michael Chen</option>
                  <option value="sj">Sarah Jenkins</option>
                  <option value="jk">Jane K.</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <ChevronDownIcon />
                </div>
              </div>
            </div>
          </div>

          {/* Deadline */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Deadline</label>
            <Input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="text-gray-500"
            />
          </div>

          {/* Attachments */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Attachments</label>
            <div className="border-2 border-dashed border-indigo-200 rounded-xl bg-indigo-50/50 p-8 text-center cursor-pointer hover:bg-indigo-50 transition-colors">
              <div className="flex justify-center mb-2">
                <CloudUploadIcon />
              </div>
              <p className="text-sm">
                <span className="text-indigo-600 font-medium hover:text-indigo-700">Upload a file</span>
              </p>
              <p className="text-sm text-gray-500 mt-0.5">or drag and drop</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, PDF up to 10MB</p>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="h-px bg-gray-100 shrink-0" />
        <div className="flex items-center justify-end gap-3 px-6 py-4 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            Create Ticket
          </button>
        </div>
      </div>
    </div>
  );
}

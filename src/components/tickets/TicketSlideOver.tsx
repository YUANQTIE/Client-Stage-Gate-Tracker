'use client';

import { useState, useRef, useEffect } from 'react';
import { Ticket } from './types';

// ── Icons ─────────────────────────────────────────────────────────────────────

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}

function CalendarIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
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

function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

// ── Column helpers ─────────────────────────────────────────────────────────────

const COLUMNS: Ticket['column'][] = ['TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'];

function columnLabel(column: Ticket['column']) {
  const map: Record<Ticket['column'], string> = {
    TODO: 'To Do', IN_PROGRESS: 'In Progress', IN_REVIEW: 'In Review', DONE: 'Done',
  };
  return map[column];
}

// ── Editable field wrapper ────────────────────────────────────────────────────

function EditableField({
  label,
  children,
  onEditClick,
  showEditBtn = true,
}: {
  label: string;
  children: React.ReactNode;
  onEditClick?: () => void;
  showEditBtn?: boolean;
}) {
  return (
    <div className="group">
      <div className="flex items-center gap-1.5 mb-1.5">
        <p className="text-xs text-gray-400 font-medium">{label}</p>
        {showEditBtn && (
          <button
            onClick={onEditClick}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-indigo-500 p-0.5 rounded"
            title={`Edit ${label}`}
          >
            <PencilIcon />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

// ── Dropdown menu ─────────────────────────────────────────────────────────────

function DropdownMenu({
  options,
  onSelect,
  onClose,
}: {
  options: { label: string; value: string; color?: string }[];
  onSelect: (value: string) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute z-50 mt-1 min-w-[160px] bg-white border border-gray-200 rounded-lg shadow-lg py-1 overflow-hidden"
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => { onSelect(opt.value); onClose(); }}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
        >
          {opt.color && <span className={`w-2 h-2 rounded-full shrink-0 ${opt.color}`} />}
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

interface TicketSlideOverProps {
  ticket: Ticket | null;
  isOpen: boolean;
  onClose: () => void;
}

type EditingField = 'title' | 'assignee' | 'watcher' | 'deadline' | 'type' | 'tags' | 'description' | 'column' | null;

const TEAM_MEMBERS = [
  { name: 'Alex Morgan', initials: 'AM', bgColor: 'bg-indigo-500' },
  { name: 'Sam Lee', initials: 'SL', bgColor: 'bg-emerald-500' },
  { name: 'Jordan Kim', initials: 'JK', bgColor: 'bg-amber-500' },
  { name: 'Casey Reyes', initials: 'CR', bgColor: 'bg-rose-500' },
  { name: 'Morgan Chen', initials: 'MC', bgColor: 'bg-violet-500' },
];

const TYPE_OPTIONS = [
  { label: 'Bug', value: 'Bug', color: 'bg-red-400' },
  { label: 'Feature', value: 'Feature', color: 'bg-blue-400' },
  { label: 'Task', value: 'Task', color: 'bg-gray-400' },
  { label: 'Improvement', value: 'Improvement', color: 'bg-green-400' },
  { label: 'Research', value: 'Research', color: 'bg-purple-400' },
];

const TAG_OPTIONS = [
  { label: 'backend', color: 'bg-blue-100 text-blue-700' },
  { label: 'frontend', color: 'bg-purple-100 text-purple-700' },
  { label: 'urgent', color: 'bg-red-100 text-red-700' },
  { label: 'design', color: 'bg-pink-100 text-pink-700' },
  { label: 'performance', color: 'bg-amber-100 text-amber-700' },
  { label: 'api', color: 'bg-green-100 text-green-700' },
  { label: 'devops', color: 'bg-slate-100 text-slate-700' },
];

export default function TicketSlideOver({ ticket: initialTicket, isOpen, onClose }: TicketSlideOverProps) {
  const [ticket, setTicket] = useState<Ticket | null>(initialTicket);
  const [editing, setEditing] = useState<EditingField>(null);
  const [titleDraft, setTitleDraft] = useState('');
  const [descDraft, setDescDraft] = useState('');
  const [deadlineDraft, setDeadlineDraft] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  // Sync when initialTicket changes
  useEffect(() => {
    setTicket(initialTicket);
    setEditing(null);
  }, [initialTicket]);

  // Auto-focus on edit open
  useEffect(() => {
    if (editing === 'title') titleRef.current?.focus();
    if (editing === 'description') descRef.current?.focus();
  }, [editing]);

  if (!ticket) return null;

  const completedSubtasks = ticket.subtasks?.filter((s) => s.completed).length ?? 0;
  const totalSubtasks = ticket.subtasks?.length ?? 0;

  function startEdit(field: EditingField) {
    setEditing(field);
    if (field === 'title') setTitleDraft(ticket!.title);
    if (field === 'description') setDescDraft(ticket!.description ?? '');
    if (field === 'deadline') setDeadlineDraft(ticket!.deadline ?? '');
  }

  function commitTitle() {
    if (titleDraft.trim()) setTicket((t) => t ? { ...t, title: titleDraft.trim() } : t);
    setEditing(null);
  }

  function commitDesc() {
    setTicket((t) => t ? { ...t, description: descDraft } : t);
    setEditing(null);
  }

  function commitDeadline() {
    setTicket((t) => t ? { ...t, deadline: deadlineDraft || undefined } : t);
    setEditing(null);
  }

  function setAssignee(name: string) {
    const member = TEAM_MEMBERS.find((m) => m.name === name) ?? null;
    setTicket((t) => t ? { ...t, assignee: member ?? undefined } : t);
  }

  function setWatcher(name: string) {
    const member = TEAM_MEMBERS.find((m) => m.name === name) ?? null;
    setTicket((t) => t ? { ...t, watcher: member ?? undefined } : t);
  }

  function setType(value: string) {
    const opt = TYPE_OPTIONS.find((o) => o.value === value);
    setTicket((t) => t ? { ...t, type: value, typeColor: opt?.color.replace('bg-', 'bg-') } : t);
  }

  function toggleTag(label: string) {
    setTicket((t) => {
      if (!t) return t;
      const existing = t.tags ?? [];
      const has = existing.some((tg) => tg.label === label);
      if (has) return { ...t, tags: existing.filter((tg) => tg.label !== label) };
      const opt = TAG_OPTIONS.find((o) => o.label === label);
      return { ...t, tags: [...existing, { label, color: opt?.color ?? 'bg-gray-100 text-gray-700' }] };
    });
  }

  function setColumn(col: string) {
    setTicket((t) => t ? { ...t, column: col as Ticket['column'] } : t);
    setEditing(null);
  }

  function toggleSubtask(id: string) {
    setTicket((t) => {
      if (!t) return t;
      return {
        ...t,
        subtasks: t.subtasks?.map((s) => s.id === id ? { ...s, completed: !s.completed } : s),
      };
    });
  }

  const typeColor = TYPE_OPTIONS.find((o) => o.value === ticket.type)?.color ?? 'bg-gray-400';

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[520px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <>
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 shrink-0">
            <span className="text-xs font-semibold text-indigo-600 shrink-0">{ticket.id}</span>

            {editing === 'title' ? (
              <input
                ref={titleRef}
                value={titleDraft}
                onChange={(e) => setTitleDraft(e.target.value)}
                onBlur={commitTitle}
                onKeyDown={(e) => { if (e.key === 'Enter') commitTitle(); if (e.key === 'Escape') setEditing(null); }}
                className="flex-1 text-sm font-semibold text-gray-900 border border-indigo-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ) : (
              <h2
                className="text-sm font-semibold text-gray-900 flex-1 truncate cursor-pointer hover:text-indigo-700 transition-colors group flex items-center gap-1"
                onClick={() => startEdit('title')}
                title="Click to edit title"
              >
                {ticket.title}
                <span className="opacity-0 group-hover:opacity-60 transition-opacity shrink-0"><PencilIcon /></span>
              </h2>
            )}

            <div className="flex items-center gap-2 shrink-0">
              <button className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded"><ShareIcon /></button>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded"><XIcon /></button>
            </div>
          </div>

          {/* Status actions */}
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-100 shrink-0 relative">
            <div className="relative">
              <button
                onClick={() => setEditing(editing === 'column' ? null : 'column')}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-3.5 py-2 rounded-lg transition-colors"
              >
                <PlayIcon />
                {columnLabel(ticket.column)}
                <ChevronDownIcon />
              </button>
              {editing === 'column' && (
                <DropdownMenu
                  options={COLUMNS.map((c) => ({ label: columnLabel(c), value: c }))}
                  onSelect={setColumn}
                  onClose={() => setEditing(null)}
                />
              )}
            </div>
            <button
              onClick={() => setColumn('DONE')}
              className="flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium px-3.5 py-2 rounded-lg transition-colors"
            >
              <CheckIcon className="text-gray-500" />
              Mark Done
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto">
            {/* Metadata grid */}
            <div className="px-5 py-4 grid grid-cols-2 gap-x-6 gap-y-4 border-b border-gray-100">

              {/* Assigned To */}
              <div className="relative">
                <EditableField label="Assigned To" onEditClick={() => startEdit('assignee')}>
                  {ticket.assignee ? (
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 ${ticket.assignee.bgColor}`}>
                        {ticket.assignee.initials}
                      </div>
                      <span className="text-sm text-gray-700 font-medium">{ticket.assignee.name}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">Unassigned</span>
                  )}
                </EditableField>
                {editing === 'assignee' && (
                  <DropdownMenu
                    options={[
                      { label: 'Unassigned', value: '' },
                      ...TEAM_MEMBERS.map((m) => ({ label: m.name, value: m.name })),
                    ]}
                    onSelect={(v) => { setAssignee(v); setEditing(null); }}
                    onClose={() => setEditing(null)}
                  />
                )}
              </div>

              {/* Watcher */}
              <div className="relative">
                <EditableField label="Watcher" onEditClick={() => startEdit('watcher')}>
                  {ticket.watcher ? (
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 ${ticket.watcher.bgColor}`}>
                        {ticket.watcher.initials}
                      </div>
                      <span className="text-sm text-gray-700 font-medium">{ticket.watcher.name}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">—</span>
                  )}
                </EditableField>
                {editing === 'watcher' && (
                  <DropdownMenu
                    options={[
                      { label: 'None', value: '' },
                      ...TEAM_MEMBERS.map((m) => ({ label: m.name, value: m.name })),
                    ]}
                    onSelect={(v) => { setWatcher(v); setEditing(null); }}
                    onClose={() => setEditing(null)}
                  />
                )}
              </div>

              {/* Deadline */}
              <div>
                <EditableField label="Deadline" onEditClick={() => startEdit('deadline')}>
                  {editing === 'deadline' ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="date"
                        value={deadlineDraft}
                        onChange={(e) => setDeadlineDraft(e.target.value)}
                        onBlur={commitDeadline}
                        onKeyDown={(e) => { if (e.key === 'Enter') commitDeadline(); if (e.key === 'Escape') setEditing(null); }}
                        className="text-sm border border-indigo-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        autoFocus
                      />
                    </div>
                  ) : ticket.deadline ? (
                    <div className={`flex items-center gap-1.5 text-sm font-medium ${ticket.isOverdue ? 'text-red-500' : 'text-gray-700'}`}>
                      <CalendarIcon className={ticket.isOverdue ? 'text-red-500' : 'text-gray-400'} />
                      {ticket.deadline}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">No deadline</span>
                  )}
                </EditableField>
              </div>

              {/* Type */}
              <div className="relative">
                <EditableField label="Type" onEditClick={() => startEdit('type')}>
                  {ticket.type ? (
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${typeColor}`} />
                      <span className="text-sm text-gray-700 font-medium">{ticket.type}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">—</span>
                  )}
                </EditableField>
                {editing === 'type' && (
                  <DropdownMenu
                    options={TYPE_OPTIONS.map((o) => ({ label: o.label, value: o.value, color: o.color }))}
                    onSelect={(v) => { setType(v); setEditing(null); }}
                    onClose={() => setEditing(null)}
                  />
                )}
              </div>

              {/* Tags */}
              <div className="col-span-2">
                <EditableField label="Tags" onEditClick={() => startEdit('tags')}>
                  <div className="flex flex-wrap gap-1.5 items-center">
                    {(ticket.tags ?? []).map((tag) => (
                      <span key={tag.label} className={`text-xs font-medium px-2.5 py-1 rounded-full ${tag.color}`}>
                        {tag.label}
                      </span>
                    ))}
                    {(ticket.tags ?? []).length === 0 && (
                      <span className="text-sm text-gray-400">No tags</span>
                    )}
                  </div>
                </EditableField>
                {editing === 'tags' && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {TAG_OPTIONS.map((opt) => {
                      const active = (ticket.tags ?? []).some((t) => t.label === opt.label);
                      return (
                        <button
                          key={opt.label}
                          onClick={() => toggleTag(opt.label)}
                          className={`text-xs font-medium px-2.5 py-1 rounded-full border transition-all ${
                            active
                              ? `${opt.color} border-current ring-1 ring-current`
                              : 'border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-600'
                          }`}
                        >
                          {active ? '✓ ' : '+ '}{opt.label}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setEditing(null)}
                      className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="px-5 py-4 border-b border-gray-100">
              <EditableField label="" showEditBtn={false}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-900">Description</h3>
                  {editing !== 'description' && (
                    <button
                      onClick={() => startEdit('description')}
                      className="text-xs text-indigo-600 font-medium hover:text-indigo-700 transition-colors flex items-center gap-1"
                    >
                      <PencilIcon /> Edit
                    </button>
                  )}
                </div>
                {editing === 'description' ? (
                  <div className="space-y-2">
                    <textarea
                      ref={descRef}
                      value={descDraft}
                      onChange={(e) => setDescDraft(e.target.value)}
                      rows={5}
                      className="w-full text-sm text-gray-600 border border-indigo-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none leading-relaxed"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={commitDesc}
                        className="text-xs font-medium bg-indigo-600 text-white px-3 py-1.5 rounded-md hover:bg-indigo-700 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditing(null)}
                        className="text-xs font-medium text-gray-500 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p
                    className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap cursor-pointer hover:text-gray-800 transition-colors"
                    onClick={() => startEdit('description')}
                    title="Click to edit"
                  >
                    {ticket.description || <span className="text-gray-400 italic">No description yet. Click to add one.</span>}
                  </p>
                )}
              </EditableField>
            </div>

            {/* Subtasks */}
            {ticket.subtasks && ticket.subtasks.length > 0 && (
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Subtasks ({completedSubtasks}/{totalSubtasks})
                </h3>
                <div className="space-y-2">
                  {ticket.subtasks.map((subtask) => (
                    <div
                      key={subtask.id}
                      className="flex items-center gap-3 group cursor-pointer"
                      onClick={() => toggleSubtask(subtask.id)}
                    >
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border transition-colors ${
                          subtask.completed
                            ? 'bg-indigo-600 border-indigo-600'
                            : 'border-gray-300 group-hover:border-indigo-400'
                        }`}
                      >
                        {subtask.completed && <CheckIcon className="text-white" />}
                      </div>
                      <span className={`text-sm flex-1 transition-colors ${subtask.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                        {subtask.title}
                      </span>
                      {subtask.assignee ? (
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0 z-10 ${subtask.assignee.bgColor}`} title={subtask.assignee.name}>
                          {subtask.assignee.initials}
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-dashed border-gray-200 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Attachments */}
            {ticket.attachments && ticket.attachments.length > 0 && (
              <div className="px-5 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">Attachments</h3>
                  <button className="text-xs text-indigo-600 font-medium hover:text-indigo-700 transition-colors">Add New</button>
                </div>
                <div className="flex gap-3 flex-wrap">
                  {ticket.attachments.map((attachment) => (
                    <div key={attachment.id} className="flex flex-col items-center gap-1.5 w-24 p-3 bg-slate-50 rounded-xl border border-gray-100 hover:border-gray-200 cursor-pointer transition-colors">
                      <div className="text-gray-400">{attachment.type === 'image' ? <ImageIcon /> : <DocumentIcon />}</div>
                      <span className="text-[10px] text-gray-500 text-center truncate w-full">{attachment.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activity */}
            {ticket.activity && ticket.activity.length > 0 && (
              <div className="px-5 py-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Activity</h3>
                <div className="relative">
                  <div className="absolute left-[13px] top-5 bottom-5 w-px bg-gray-200" />
                  <div className="space-y-4">
                    {ticket.activity.map((item) => (
                      <div key={item.id} className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0 z-10 ${item.user.bgColor}`}>
                          {item.user.initials}
                        </div>
                        <div className="flex-1 pt-0.5">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium text-gray-800">{item.user.name}</span>{' '}
                            {item.action}{' '}
                            {item.highlight && (
                              <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${item.highlightColor ?? ''}`}>
                                {item.highlight}
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="h-4" />
          </div>

          {/* Comment input */}
          <div className="flex items-center gap-3 px-5 py-3.5 border-t border-gray-100 shrink-0 bg-white">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">AM</div>
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 text-sm text-gray-700 placeholder:text-gray-400 bg-gray-50 rounded-lg px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
            />
            <button className="text-indigo-600 hover:text-indigo-700 transition-colors p-1.5 rounded-lg hover:bg-indigo-50"><SendIcon /></button>
          </div>
        </>
      </div>
    </>
  );
}
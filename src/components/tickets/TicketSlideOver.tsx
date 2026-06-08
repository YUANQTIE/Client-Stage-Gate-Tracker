'use client';

import { Ticket } from './types';

// ── Icons ─────────────────────────────────────────────────────────────────────

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}

function CalendarIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
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
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
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

// ── Column label helpers ──────────────────────────────────────────────────────

function columnLabel(column: Ticket['column']) {
  const map: Record<Ticket['column'], string> = {
    TODO: 'To Do',
    IN_PROGRESS: 'In Progress',
    IN_REVIEW: 'In Review',
    DONE: 'Done',
  };
  return map[column];
}

// ── Component ─────────────────────────────────────────────────────────────────

interface TicketSlideOverProps {
  ticket: Ticket | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TicketSlideOver({ ticket, isOpen, onClose }: TicketSlideOverProps) {
  const completedSubtasks = ticket?.subtasks?.filter((s) => s.completed).length ?? 0;
  const totalSubtasks = ticket?.subtasks?.length ?? 0;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[520px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {!ticket ? null : (
          <>
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 shrink-0">
              <span className="text-xs font-semibold text-indigo-600 shrink-0">{ticket.id}</span>
              <h2 className="text-sm font-semibold text-gray-900 flex-1 truncate">{ticket.title}</h2>
              <div className="flex items-center gap-2 shrink-0">
                <button className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded">
                  <ShareIcon />
                </button>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded">
                  <XIcon />
                </button>
              </div>
            </div>

            {/* Status actions */}
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-100 shrink-0">
              <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-3.5 py-2 rounded-lg transition-colors">
                <PlayIcon />
                {columnLabel(ticket.column)}
                <ChevronDownIcon />
              </button>
              <button className="flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium px-3.5 py-2 rounded-lg transition-colors">
                <CheckIcon className="text-gray-500" />
                Mark Done
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              {/* Metadata grid */}
              <div className="px-5 py-4 grid grid-cols-2 gap-x-6 gap-y-4 border-b border-gray-100">
                {/* Assigned To */}
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-1.5">Assigned To</p>
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
                </div>

                {/* Watcher */}
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-1.5">Watcher</p>
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
                </div>

                {/* Deadline */}
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-1.5">Deadline</p>
                  {ticket.deadline ? (
                    <div className={`flex items-center gap-1.5 text-sm font-medium ${ticket.isOverdue ? 'text-red-500' : 'text-gray-700'}`}>
                      <CalendarIcon className={ticket.isOverdue ? 'text-red-500' : 'text-gray-400'} />
                      {ticket.deadline}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">No deadline</span>
                  )}
                </div>

                {/* Type */}
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-1.5">Type</p>
                  {ticket.type ? (
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${ticket.typeColor ?? 'bg-gray-400'}`} />
                      <span className="text-sm text-gray-700 font-medium">{ticket.type}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">—</span>
                  )}
                </div>

                {/* Tags */}
                {ticket.tags && ticket.tags.length > 0 && (
                  <div className="col-span-2">
                    <p className="text-xs text-gray-400 font-medium mb-1.5">Tags</p>
                    <div className="flex flex-wrap gap-1.5">
                      {ticket.tags.map((tag) => (
                        <span
                          key={tag.label}
                          className={`text-xs font-medium px-2.5 py-1 rounded-full ${tag.color}`}
                        >
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              {ticket.description && (
                <div className="px-5 py-4 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {ticket.description}
                  </p>
                  {ticket.id === 'ASC-1024' && (
                    <ul className="mt-2.5 space-y-1.5 pl-4">
                      <li className="text-sm text-gray-600 list-disc">Implement retry queue (Max 5 attempts)</li>
                      <li className="text-sm text-gray-600 list-disc">Initial delay: 2s, Factor: 2x</li>
                      <li className="text-sm text-gray-600 list-disc">Log all failed final attempts to DataDog</li>
                    </ul>
                  )}
                </div>
              )}

              {/* Subtasks */}
              {ticket.subtasks && ticket.subtasks.length > 0 && (
                <div className="px-5 py-4 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Subtasks ({completedSubtasks}/{totalSubtasks})
                  </h3>
                  <div className="space-y-2">
                    {ticket.subtasks.map((subtask) => (
                      <div key={subtask.id} className="flex items-center gap-3 group">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border transition-colors ${
                            subtask.completed
                              ? 'bg-indigo-600 border-indigo-600'
                              : 'border-gray-300 group-hover:border-gray-400'
                          }`}
                        >
                          {subtask.completed && <CheckIcon className="text-white" />}
                        </div>
                        <span
                          className={`text-sm flex-1 ${
                            subtask.completed ? 'line-through text-gray-400' : 'text-gray-700'
                          }`}
                        >
                          {subtask.title}
                        </span>
                        {subtask.assignee ? (
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0 ${subtask.assignee.bgColor}`}
                            title={subtask.assignee.name}
                          >
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
                    <button className="text-xs text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
                      Add New
                    </button>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    {ticket.attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="flex flex-col items-center gap-1.5 w-24 p-3 bg-slate-50 rounded-xl border border-gray-100 hover:border-gray-200 cursor-pointer transition-colors"
                      >
                        <div className="text-gray-400">
                          {attachment.type === 'image' ? <ImageIcon /> : <DocumentIcon />}
                        </div>
                        <span className="text-[10px] text-gray-500 text-center truncate w-full">
                          {attachment.name}
                        </span>
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
                    {/* Vertical connector line */}
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

              {/* Bottom padding so content isn't hidden behind comment bar */}
              <div className="h-4" />
            </div>

            {/* Comment input — fixed to bottom of panel */}
            <div className="flex items-center gap-3 px-5 py-3.5 border-t border-gray-100 shrink-0 bg-white">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                AM
              </div>
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-1 text-sm text-gray-700 placeholder:text-gray-400 bg-gray-50 rounded-lg px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
              />
              <button className="text-indigo-600 hover:text-indigo-700 transition-colors p-1.5 rounded-lg hover:bg-indigo-50">
                <SendIcon />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

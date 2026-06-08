'use client';

import { useDraggable } from '@dnd-kit/core';
import { Ticket } from './types';

// ── Icons ─────────────────────────────────────────────────────────────────────

function CalendarIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function AlertTriangleIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function FlagIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  );
}

function MoreHorizontalIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
    </svg>
  );
}

// ── Card content (pure presentation, no DnD) ─────────────────────────────────

interface CardContentProps {
  ticket: Ticket;
  onSelect: (ticket: Ticket) => void;
}

export function TicketCardContent({ ticket, onSelect }: CardContentProps) {
  const completedSubtasks = ticket.subtasks?.filter((s) => s.completed).length ?? 0;
  const totalSubtasks = ticket.subtasks?.length ?? 0;

  return (
    <div
      onClick={() => onSelect(ticket)}
      className={[
        'bg-white rounded-xl p-4 border border-gray-200 cursor-pointer',
        'hover:border-gray-300 transition-colors duration-150 select-none',
        ticket.isOverdue ? 'border-l-4 border-l-red-500' : '',
      ].join(' ')}
    >
      {/* Top row: ID + badges + menu */}
      <div className="flex items-center justify-between mb-2.5 gap-1">
        <span className="text-xs font-semibold text-indigo-600 shrink-0">{ticket.id}</span>
        <div className="flex items-center gap-1.5 ml-auto">
          {ticket.isActive && (
            <span className="text-[10px] font-semibold tracking-wide text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase">
              Active
            </span>
          )}
          {ticket.isOverdue && (
            <span className="text-[10px] font-semibold tracking-wide text-red-600 bg-red-50 px-2 py-0.5 rounded-full uppercase">
              Overdue
            </span>
          )}
          {ticket.isFlagged && <FlagIcon className="text-red-500" />}
          <button
            onClick={(e) => e.stopPropagation()}
            className="text-gray-400 hover:text-gray-600 p-0.5 rounded transition-colors"
          >
            <MoreHorizontalIcon />
          </button>
        </div>
      </div>

      {/* Title */}
      <p className="text-sm font-medium text-gray-900 leading-snug mb-3 line-clamp-2">
        {ticket.title}
      </p>

      {/* Subtask progress (only if there are subtasks) */}
      {totalSubtasks > 0 && (
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-400 rounded-full transition-all"
              style={{ width: `${(completedSubtasks / totalSubtasks) * 100}%` }}
            />
          </div>
          <span className="text-[10px] text-gray-400 font-medium shrink-0">
            {completedSubtasks}/{totalSubtasks}
          </span>
        </div>
      )}

      {/* Bottom row: deadline + assignee avatar */}
      <div className="flex items-center justify-between">
        {ticket.deadline ? (
          <div
            className={`flex items-center gap-1 text-xs font-medium ${
              ticket.isOverdue ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            {ticket.isOverdue ? (
              <AlertTriangleIcon className="text-red-500" />
            ) : (
              <CalendarIcon />
            )}
            {ticket.deadline}
          </div>
        ) : (
          <div />
        )}

        {ticket.assignee ? (
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0 ${ticket.assignee.bgColor}`}
            title={ticket.assignee.name}
          >
            {ticket.assignee.initials}
          </div>
        ) : (
          <div className="w-6 h-6 rounded-full border-2 border-dashed border-gray-200" />
        )}
      </div>
    </div>
  );
}

// ── Draggable card ────────────────────────────────────────────────────────────

interface TicketCardProps {
  ticket: Ticket;
  onSelect: (ticket: Ticket) => void;
}

export default function TicketCard({ ticket, onSelect }: TicketCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: ticket.id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 50 : undefined,
    position: isDragging ? ('relative' as const) : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing focus:outline-none"
    >
      <TicketCardContent ticket={ticket} onSelect={onSelect} />
    </div>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { type Ticket } from "@/actions/ticketActions";

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

// ── Delete Confirmation Modal ────────────────────────────────────────────────

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  ticketTitle: string;
}

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, ticketTitle }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div 
        className="bg-white rounded-xl max-w-sm w-full p-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()} 
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Ticket?</h3>
        <p className="text-sm text-gray-500 mb-6">
          Are you sure you want to delete <span className="font-medium text-gray-700">"{ticketTitle}"</span>? This action cannot be undone.
        </p>
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Card content (pure presentation, no DnD) ─────────────────────────────────

interface CardContentProps {
  ticket: Ticket;
  onSelect: (ticket: Ticket) => void;
  onEdit: (ticket: Ticket) => void;
  onDelete: (ticketId: string) => void;
}

function getInitials(name: string): string {
  return name
    .trim()                        // Remove trailing/leading spaces
    .split(/\s+/)                  // Split into words by any spacing
    .map((word) => word[0])        // Grab the first character of each word
    .slice(0, 2)                   // Keep only the first two characters
    .join("")                      // Combine them
    .toUpperCase();                // Force uppercase
}

export function TicketCardContent({ ticket, onSelect, onEdit, onDelete }: CardContentProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

//   const completedSubtasks = ticket.subtasks?.filter((s) => s.completed).length ?? 0;
//   const totalSubtasks = ticket.subtasks?.length ?? 0;

  // Auto-close menu on outside clicks
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);
	const today = new Date();
	today.setHours(0,0,0,0)
  return (
    <div
      onClick={() => onSelect(ticket)}
      className={[
        'bg-white rounded-xl p-4 border border-gray-200 cursor-pointer relative',
        'hover:border-gray-300 transition-colors duration-150 select-none',
        ticket.deadline_date < today ? 'border-l-4 border-l-red-500' : '',
      ].join(' ')}
    >
      {/* Top row: ID + badges + menu */}
			
      <div className="flex items-center justify-center mb-2.5 gap-1">
				{/* Title */}
				<p className="text-sm font-medium text-gray-900 leading-snug  line-clamp-2">
					{ticket.name}
				</p>
        {/* <span className="text-xs font-semibold text-indigo-600 shrink-0">{ticket.ticket_id}</span> */}
        <div className="flex items-center gap-1.5 ml-auto relative" ref={menuRef}>
          {/* {ticket.isActive && (
            <span className="text-[10px] font-semibold tracking-wide text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase">
              Active
            </span>
          )} */}
          {ticket.deadline_date < today && (
            <span className="text-[10px] font-semibold tracking-wide text-red-600 bg-red-50 px-2 py-0.5 rounded-full uppercase">
              Overdue
            </span>
          )}
          {/* {ticket.isFlagged && <FlagIcon className="text-red-500" />} */}
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className={`p-0.5 rounded transition-colors ${menuOpen ? 'text-gray-700 bg-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <MoreHorizontalIcon />
          </button>

          {/* Action Menu Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg border border-gray-200 shadow-lg py-1 z-30">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                  onSelect(ticket);
                  onEdit(ticket);
                }}
                className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 font-medium"
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                  setIsDeleteModalOpen(true);
                }}
                className="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 font-medium"
              >
                Delete
              </button>
            </div>
          )}
        </div>
				
      </div>

      

      {/* Subtask progress */}
      {/* {totalSubtasks > 0 && (
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
      )} */}

      {/* Bottom row: deadline + assignee avatar */}
      { <div className="flex items-center justify-between">
        {ticket.deadline_date ? (
          <div
            className={`flex items-center gap-1 text-xs font-medium ${
              ticket.deadline_date < today ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            {ticket.deadline_date < today ? (
              <AlertTriangleIcon className="text-red-500" />
            ) : (
              <CalendarIcon />
            )}
            {ticket.deadline_date.toLocaleDateString('en-US', {
				month: 'short',
				day: '2-digit',
				year: 'numeric'
			})}
          </div>
        ) : (
          <div />
        )}

        {ticket.Users_Tickets_watcher_idToUsers ? (
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white bg-gray-600 shrink-0 {usercolor}`}
            title={ticket.Users_Tickets_watcher_idToUsers?.name}
          >
            {getInitials(ticket.Users_Tickets_watcher_idToUsers?.name)}
          </div>
        ) : (
          <div className="w-6 h-6 rounded-full border-2 border-dashed border-gray-200" />
        )}
      </div> }

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        ticketTitle={ticket.name}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          setIsDeleteModalOpen(false);
          onDelete(ticket.ticket_id);
        }}
      />
    </div>
  );
}

// ── Draggable card ────────────────────────────────────────────────────────────

interface TicketCardProps {
  ticket: Ticket;
  onSelect: (ticket: Ticket) => void;
  onEdit: (ticket: Ticket) => void;
  onDelete: (ticketId: string) => void;
}

export default function TicketCard({ ticket, onSelect, onEdit, onDelete }: TicketCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: ticket.ticket_id,
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
      <TicketCardContent 
        ticket={ticket} 
        onSelect={onSelect} 
        onEdit={onEdit} 
        onDelete={onDelete} 
      />
    </div>
  );
}
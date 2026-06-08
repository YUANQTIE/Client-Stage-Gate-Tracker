'use client';

import { useDroppable } from '@dnd-kit/core';
import TicketCard from './TicketCard';
import { Column, Ticket } from './types';

interface TicketColumnProps {
  column: Column;
  tickets: Ticket[];
  onSelectTicket: (ticket: Ticket) => void;
}

export default function TicketColumn({ column, tickets, onSelectTicket }: TicketColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <div className="flex flex-col w-72 shrink-0">
      {/* Column header */}
      <div className="flex items-center gap-2 mb-2.5 px-1">
        <span className={`w-2 h-2 rounded-full ${column.dotColor}`} />
        <span className="text-sm font-semibold text-gray-700">{column.title}</span>
        <span className="ml-auto text-xs font-semibold text-gray-400 bg-gray-100 w-5 h-5 flex items-center justify-center rounded-full">
          {tickets.length}
        </span>
      </div>

      {/* Flat bordered container + cards drop zone */}
      <div
        ref={setNodeRef}
        className={[
          'flex flex-col gap-2 flex-1 rounded-xl p-2.5 border transition-colors duration-150',
          isOver
            ? 'bg-indigo-50 border-indigo-200'
            : 'bg-[#F2F3FF] border-gray-200',
        ].join(' ')}
      >
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            onSelect={onSelectTicket}
          />
        ))}

        {tickets.length === 0 && (
          <div className="flex items-center justify-center h-20 border border-dashed border-gray-200 rounded-lg">
            <p className="text-xs text-gray-300 font-medium">Drop here</p>
          </div>
        )}
      </div>
    </div>
  );
}

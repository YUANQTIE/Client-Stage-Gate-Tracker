"use client";

import { useEffect, useRef, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { TicketCardContent } from "./TicketCard";
import TicketColumn from "./TicketColumn";
import CreateTicketModal from "./CreateTicketModal";
import EditTicketModal from "./EditTicketModal";
import TopNav from "@/components/layout/TopNav";
import { COLUMNS } from "./types";

import { Prisma } from "@/lib/generated/prisma";
import { ticketSelect, ticketUpdateStatus, ticketCreate,ticketDelete, type Ticket } from "@/actions/ticketActions";
// ── Icons ─────────────────────────────────────────────────────────────────────

function FilterIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

// ── Main board ────────────────────────────────────────────────────────────────

interface TicketBoardProps {
  projectId: string;
  workflowId: string;
}

export default function TicketBoard({
  projectId,
  workflowId,
}: TicketBoardProps) {
	// Initialize state using Ticket directly
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [slideOverOpen, setSlideOverOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const wasDraggingRef = useRef(false);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 8 },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 200, tolerance: 5 },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  const activeTicket = activeId ? tickets.find((t) => t.ticket_id === activeId) : null;

  async function loadDatabaseTickets() {
    try {
      setIsLoading(true);
      const data = await ticketSelect();
      setTickets(data);
    } catch (error) {
      console.error("Error loading tickets from database:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadDatabaseTickets();
  }, []);

  function handleSelectTicket(ticket: Ticket) {
    if (wasDraggingRef.current) return;
    setSelectedTicket(ticket);
    setSlideOverOpen(true);
  }

  async function handleCreateTicket(newTicketData: Partial<Ticket>, tagIds: string[] = []) 
	{
		const previousTickets = tickets;
		try {
			const newTicket = await ticketCreate(
				{
					name: newTicketData.name ?? "New Ticket",
					description: newTicketData.description ?? null,
					status: newTicketData.status ?? "PENDING",
					assigner_id: newTicketData.assigner_id ?? "",
					watcher_id: newTicketData.watcher_id ?? null,
					deadline_date: newTicketData.deadline_date ?? new Date(),
				},
				tagIds
			);
			setTickets(prev => [...prev, newTicket]);
		} catch (error) {
			setTickets(previousTickets);
			console.error("Failed to create ticket:", error);
		}
	}

  async function handleDeleteTicket(ticketId: string) 
	{
		const previousTickets = tickets;
		try {
			setTickets(prev => prev.filter(t => t.ticket_id !== ticketId));
			await ticketDelete(ticketId);
		} catch (error) {
			setTickets(previousTickets);
			console.error("Failed to delete ticket:", error);
		}
	}

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
    wasDraggingRef.current = true;
  }

  async function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;
		setActiveId(null);

		if (over && active.id !== over.id) {
			const newStatus = over.id as Ticket['status'];
			const previousTickets = tickets; // snapshot before updating

			setTickets((prev) =>
				prev.map((t) =>
					t.ticket_id === active.id ? { ...t, status: newStatus } : t
				)
			);

			try {
				await ticketUpdateStatus(active.id as string, newStatus);
			} catch (error) {
				setTickets(previousTickets); // roll back to snapshot
				console.error("Failed to update ticket status:", error);
			}
		}

		setTimeout(() => {
			wasDraggingRef.current = false;
		}, 100);
	}

  // 6. Handle loading screen while data transfers from server
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-slate-50">
        <div className="text-gray-500 font-medium animate-pulse">Loading database tickets...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <TopNav breadcrumbs={["Acesoft", "Project Alpha", "Tickets"]} />

      {/* Sprint header */}
      <div className="flex items-center justify-between px-6 py-5 shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-gray-900">Current Sprint</h1>
          {/* Sprint member avatars */}
          {/* <div className="flex items-center">
            {SPRINT_MEMBERS.map((m, i) => (
              <div
                key={m.initials}
                className={`w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white ${m.bgColor}`}
                style={{ marginLeft: i > 0 ? "-8px" : "0" }}
                title={m.initials}
              >
                {m.initials}
              </div>
            ))}
            <div
              className="w-7 h-7 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[9px] font-bold text-gray-500"
              style={{ marginLeft: "-8px" }}
            >
              +3
            </div>
          </div> */}
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 text-sm font-medium text-gray-600 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <FilterIcon />
            Filter
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors"
          >
            <PlusIcon />
            New Issue
          </button>
        </div>
      </div>

      {/* Kanban columns */}
      <DndContext
        id="ticket-board-dnd"
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex-1 overflow-x-auto overflow-y-hidden px-6 pb-6">
          <div className="flex gap-5 h-full items-start">
            {COLUMNS.map((column) => (
              <TicketColumn
                key={column.id}
                column={column}
								tickets={tickets.filter((t) => t.status === column.id)}
								onSelectTicket={handleSelectTicket}
								onDeleteTicket={handleDeleteTicket}
              />
            ))}
          </div>
        </div>

        {/* Drag overlay — renders a visual ghost while dragging */}
        <DragOverlay dropAnimation={null}>
          {activeTicket ? (
            <div className="rotate-2 opacity-90">
              <TicketCardContent ticket={activeTicket} onSelect={() => {}}  onEdit={() => {}}  onDelete={() => {}}/>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Ticket detail slide-over */}
      <EditTicketModal
				ticket={selectedTicket}
				isOpen={slideOverOpen}
				onClose={() => setSlideOverOpen(false)}
				onUpdate={(updated) => setTickets(prev => prev.map(t => t.ticket_id === updated.ticket_id ? updated : t))}
			/>

      {/* Create ticket modal */}
      <CreateTicketModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreateTicket={handleCreateTicket}
      />
    </div>
  );
}

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

// Import your custom generated Prisma types and enums
import { Prisma, status as TicketStatus } from "@/lib/generated/prisma";
import { selectTicket, ticketUpdateStatus, createTicket, deleteTicket } from "@/actions/ticketActions";

// ── Define the strict Ticket Type using Prisma's payload generator ──────────
type Ticket = Prisma.TicketsGetPayload<{
    include: {
        TicketTags: true;
        TicketAssigned: true;
        TicketSubtasks_TicketSubtasks_ticket_idToTickets: true;
    }
}>;

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

    useEffect(() => {
        let isMounted = true;

        async function fetchBot() {
            try {
                setIsLoading(true);
                const data = await selectTicket();

                // Only update state if the user is still looking at this page!
                if (isMounted) {
                    setTickets(data as Ticket[]);
                }
            } catch (error) {
                console.error("Error loading tickets from database:", error);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        fetchBot();

        // Cleanup function: Fires if the component unmounts mid-fetch
        return () => {
            isMounted = false;
        };
    }, []); // Empty array is perfectly fine now because fetchBot is self-contained

    function handleSelectTicket(ticket: Ticket) {
        if (wasDraggingRef.current) return;
        setSelectedTicket(ticket);
        setSlideOverOpen(true);
    }

    // Pass down the raw parameter fields that your modal form fields will gather
    async function handleCreateTicket(
        name: string,
        deadlineDate: Date,
        description?: string | null,
        startDate?: Date | null,
        endDate?: Date | null
    ) {
        const previousTickets = tickets;
        try {
            // Clean matching call setup with deadlineDate passed as the 3rd argument
            const result = await createTicket(
                workflowId,
                name,
                deadlineDate,
                description,
                startDate,
                endDate
            );

            if (result.success && result.data) {
                setTickets((prev) => [...prev, result.data as Ticket]);
                setModalOpen(false);
            }
        } catch (error) {
            setTickets(previousTickets);
            console.error("Failed to create ticket:", error);
        }
    }

    async function handleDeleteTicket(ticketId: string) {
        const previousTickets = tickets;
        try {
            setTickets((prev) => prev.filter((t) => t.ticket_id !== ticketId));
            await deleteTicket(ticketId);
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
            const newStatus = over.id as TicketStatus;
            const previousTickets = tickets;

            setTickets((prev) =>
                prev.map((t) =>
                    t.ticket_id === active.id ? { ...t, status: newStatus } : t
                )
            );

            try {
                await ticketUpdateStatus(active.id as string, newStatus);
            } catch (error) {
                setTickets(previousTickets);
                console.error("Failed to update ticket status:", error);
            }
        }

        setTimeout(() => {
            wasDraggingRef.current = false;
        }, 100);
    }

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

            <div className="flex items-center justify-between px-6 py-5 shrink-0">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-bold text-gray-900">Current Sprint</h1>
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

                <DragOverlay dropAnimation={null}>
                    {activeTicket ? (
                        <div className="rotate-2 opacity-90">
                            <TicketCardContent ticket={activeTicket} onSelect={() => {}} onEdit={() => {}} onDelete={() => {}} />
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>

            <EditTicketModal
                ticket={selectedTicket}
                isOpen={slideOverOpen}
                onClose={() => setSlideOverOpen(false)}
                onUpdate={(updated) => setTickets((prev) => prev.map((t) => t.ticket_id === updated.ticket_id ? (updated as Ticket) : t))}
            />

            <CreateTicketModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onCreateTicket={handleCreateTicket}
            />
        </div>
    );
}
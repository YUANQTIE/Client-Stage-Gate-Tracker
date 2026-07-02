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
import { COLUMNS, Ticket, Tag, TicketAssigned } from "./types";
import { TagManager} from "./TagModals";
import { status as TicketStatus } from "@/lib/generated/prisma";
import {
    selectTicket,
    updateTicketStatus,
    createTicket,
    cascadeSoftDeleteTicket
} from "@/actions/ticketActions";
import {
    selectTag,
    updateTag,
    createTag,
    softDeleteTag
} from "@/actions/tagActions";

// ── Icons ─────────────────────────────────────────────────────────────────────

function TagsIcon() {
  return (
    <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.07 10.3L15.07 4.29996C14.93 4.15996 14.74 4.07996 14.54 4.07996H3C2.59 4.07996 2.25 4.41996 2.25 4.82996V12.71C2.25 12.91 2.33 13.1 2.47 13.24L8.47 19.23C8.91 19.67 9.49 19.91 10.11 19.91C10.73 19.91 11.32 19.67 11.75 19.23L11.97 19.01C12.01 19.09 12.05 19.17 12.12 19.23C12.57 19.68 13.17 19.91 13.76 19.91C14.35 19.91 14.95 19.68 15.41 19.23L21.06 13.58C21.96 12.68 21.96 11.21 21.06 10.3H21.07ZM10.7 18.17C10.54 18.33 10.34 18.41 10.12 18.41C9.9 18.41 9.69 18.32 9.54 18.17L3.75 12.4V5.57996H10.57L16.35 11.36C16.67 11.68 16.67 12.2 16.35 12.52L10.7 18.17ZM20.01 12.52L14.36 18.17C14.04 18.49 13.51 18.49 13.19 18.17C13.12 18.1 13.05 18.06 12.96 18.02L17.4 13.58C18.3 12.67 18.3 11.2 17.4 10.3L12.68 5.57996H14.22L20 11.36C20.32 11.68 20.32 12.2 20 12.52H20.01ZM8.25 8.49996C8.25 9.18996 7.69 9.74996 7 9.74996C6.31 9.74996 5.75 9.18996 5.75 8.49996C5.75 7.80996 6.31 7.24996 7 7.24996C7.69 7.24996 8.25 7.80996 8.25 8.49996Z" fill="#000000"/>
    </svg>
  );
}
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
    const [tags, setTags] = useState<Tag[]>([]);

    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [slideOverOpen, setSlideOverOpen] = useState(false);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [tagManagerOpen, setTagManagerOpen] = useState(false);

    const wasDraggingRef = useRef(false);

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: { distance: 8 },
    });
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: { delay: 200, tolerance: 5 },
    });
    const sensors = useSensors(mouseSensor, touchSensor);

    const activeTicket = activeId ? tickets.find((t)=>
        t.ticket_id === activeId) : null;

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            selectTag()
                .then((data) => {
                    if (isMounted) {
                        setTags(data as Tag[]);
                    }
                })
                .catch((err) => console.error("Failed to fetch tags:", err));
        }

        return () => {
            isMounted = false; // Prevents updating state if component unmounts mid-fetch
        };
    }, []);

    useEffect(() => {
        let isMounted = true;

        async function fetchBot() {
            try {
                setIsLoading(true);
                const data = await selectTicket();

                // Only update state if the user is still looking at this page!
                if (isMounted) {
                    setTickets(data);
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
    async function handleCreateTicket({
                                          name,
                                          deadline_date,
                                          watcher_id,
                                          TicketAssigned,
                                          tagIds,
                                          description,
                                          start_date,
                                          end_date,
                                      }: {
        // Declare the types here in a separate block!
        name: string;
        deadline_date: Date;
        watcher_id?: string | null;
        TicketAssigned?: string[] | null;
        tagIds?: string[] | null;
        description?: string | null;
        start_date?: Date | null;
        end_date?: Date | null;
    }) {
        const previousTickets = tickets;
        try {
            // Clean matching call setup with deadlineDate passed as the 3rd argument
            const result = await createTicket(
                {
                    workflow_id: "cddde38b-1a89-440a-9d39-6bf12cfb3d05",
                    name: name,
                    deadline_date: deadline_date,
                    status: TicketStatus.PENDING,
                    watcher_id: watcher_id ?? null,
                    TicketAssigned: TicketAssigned ?? [],
                    tagIds: tagIds ?? [],
                    description: description ?? null,
                    start_date: start_date ?? null,
                    end_date: end_date ?? null
                }
            );

            if (result) {
                setTickets((prev) =>
                    [...prev, result as Ticket]);
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
            setTickets((prev) =>
                prev.filter((t) => t.ticket_id !== ticketId));
            await cascadeSoftDeleteTicket(ticketId);
        } catch (error) {
            setTickets(previousTickets);
            console.error("Failed to delete ticket:", error);
        }
    }

    async function handleSaveTag(
        tag_id: string,
        name: string,
        description?: string | null,
        color?: string | null,
    )
    {
        if (tag_id) {
            // Edit
            const result = await updateTag(tag_id, name, description, color);

            if (result.name)
                setTags((prev) => prev.map((t) => t.tag_id === tag_id ? { ...t, ...{name, description, color} } as Tag : t));
        } else {
            // Create
            const result = await createTag(name, description, color);

            if (result.success)
                setTags((prev) => [...prev, {
                    tag_id:result?.data?.tag_id ?? "",
                    name:name,
                    description:description,
                    color:color,
                    deleted_at:null,
                    is_deleted:false
                } as Tag]);
        }
    }

    async function handleDeleteTag(tagId: string) {
        const previousTag = tags;
        try {
            setTags((prev) =>
                prev.filter((t) => t.tag_id !== tagId));
            await softDeleteTag(tagId);
        } catch (error) {
            setTags(previousTag);
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
                await updateTicketStatus(active.id as string, newStatus);
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
                    <button
                        onClick={() => setTagManagerOpen(true)}
                        className="flex items-center gap-1.5 text-sm font-medium text-gray-600 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <TagsIcon />
                        Tags
                    </button>

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
                            <TicketCardContent ticket={activeTicket} onSelect={() => {}} onEdit={() =>
                            {}} onDelete={() => {}} />
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>

            <EditTicketModal
                ticket={selectedTicket}
                isOpen={slideOverOpen}
                onClose={() => setSlideOverOpen(false)}
                onUpdate={(updated) => setTickets((prev) => prev.map((t) => t.ticket_id === updated.ticket_id ? (updated as Ticket) : t))}
                tags={tags}
            />

            <CreateTicketModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onCreateTicket={handleCreateTicket}
                tags={tags}
            />

            <TagManager
                isOpen={tagManagerOpen}
                onClose={() => setTagManagerOpen(false)}
                onSave={handleSaveTag}
                onDelete={handleDeleteTag}
                tags={tags}
            />
        </div>
    );
}
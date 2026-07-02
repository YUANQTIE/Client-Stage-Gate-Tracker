"use client";

import { useState, useEffect } from "react";
import {selectTag, createTag, updateTag, softDeleteTag} from "@/actions/tagActions";
import { Tag } from './types';


// ── Color palette — each entry is the "base" hue used to derive pastel badge style ──

const TAG_COLORS = [
    // row 1 — lighter/medium hues
    "#EF4444", "#F97316", "#EAB308", "#84CC16", "#22C55E", "#06B6D4", "#6366F1", "#EC4899", "#8B5CF6",
    // row 2 — deeper hues
    "#DC2626", "#EA580C", "#CA8A04", "#16A34A", "#0D9488", "#0284C7", "#4338CA", "#DB2777", "#7C3AED",
];

// Derive pastel badge colors from a base hex
function getPastelStyle(hex: string): { bg: string; text: string; border: string } {
    // Parse RGB
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    // Pastel bg: mix heavily with white (15% color, 85% white)
    const bg = `rgba(${r}, ${g}, ${b}, 0.12)`;
    // Text: the base color itself (saturated, readable on white-ish bg)
    const text = hex;
    // Border: very light tint
    const border = `rgba(${r}, ${g}, ${b}, 0.25)`;
    return { bg, text, border };
}

// ── Shared close button ───────────────────────────────────────────────────────

function CloseButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
        >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
        </button>
    );
}

// ── Tag badge — pastel pill style matching the design ─────────────────────────

function TagBadge({ tag }: { tag: Tag }) {
    const { bg, text, border } = getPastelStyle(tag?.color ?? "#06B6D4");
    return (
        <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
            style={{ backgroundColor: bg, color: text, borderColor: border }}
        >
            {tag.name}
        </span>
    );
}

// ── Color picker ──────────────────────────────────────────────────────────────

function ColorPicker({ value, onChange }: { value: string; onChange: (c: string) => void }) {
    return (
        <div className="grid grid-cols-9 gap-1.5">
            {TAG_COLORS.map((color) => {
                const isSelected = value === color;
                return (
                    <button
                        key={color}
                        onClick={() => onChange(color)}
                        className="w-7 h-7 rounded-md transition-all hover:scale-110 border-2"
                        style={{
                            backgroundColor: color,
                            borderColor: isSelected ? "#1E1B4B" : "transparent",
                            boxShadow: isSelected ? `0 0 0 2px white, 0 0 0 4px ${color}` : "none",
                        }}
                        aria-label={color}
                    >
                        {isSelected && (
                            <span style={{ color: "white", fontSize: 10, lineHeight: 1, textShadow: "0 0 2px rgba(0,0,0,0.4)" }}>✓</span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}

// ── Modal backdrop ────────────────────────────────────────────────────────────

function Backdrop({ onClick }: { onClick: () => void }) {
    return (
        <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClick}
        />
    );
}

// ── Tag List Modal ────────────────────────────────────────────────────────────

interface TagListModalProps {
    tags: Tag[];
    onClose: () => void;
    onCreateTag: () => void;
    onEditTag: (tag: Tag) => void;
    onDeleteTag: (tag_id: string) => void;
}

function TagListModal({ tags, onClose, onCreateTag, onEditTag, onDeleteTag }: TagListModalProps) {
    return (
        <>
            <Backdrop onClick={onClose} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl min-h-[65vh] max-h-[65vh] flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                        <h2 className="text-base font-semibold text-gray-900">Tags</h2>
                        <CloseButton onClick={onClose} />
                    </div>

                    {/* Table Body Area */}
                    <div className="flex-1 overflow-y-auto px-6 flex flex-col">
                        {/* Purple-tinted header — sticky, sits above the scroll area */}
                        <table className="w-full table-fixed">
                            <colgroup>
                                <col style={{ width: "28%" }} />
                                <col style={{ width: "48%" }} />
                                <col style={{ width: "24%" }} />
                            </colgroup>
                            <thead>
                                <tr
                                    className="text-xs font-semibold uppercase tracking-wider"
                                    style={{ backgroundColor: "#EEF2FF", color: "#6366F1" }}
                                >
                                    <th className="text-center py-2.5 px-3 rounded-l-lg">Tag</th>
                                    <th className="text-center py-2.5 px-3">Description</th>
                                    <th className="text-center py-2.5 px-3 rounded-r-lg">Actions</th>
                                </tr>
                            </thead>
                        </table>

                        {/* Scrollable rows */}
                        <div className="tag-scroll flex-1 overflow-y-auto">
                            <style>{`
                                .tag-scroll::-webkit-scrollbar { width: 5px; }
                                .tag-scroll::-webkit-scrollbar-track { background: #F5F3FF; border-radius: 99px; }
                                .tag-scroll::-webkit-scrollbar-thumb { background: #C7D2FE; border-radius: 99px; }
                                .tag-scroll::-webkit-scrollbar-thumb:hover { background: #A5B4FC; }
                            `}</style>
                            <table className="w-full table-fixed">
                                <colgroup>
                                    <col style={{ width: "28%" }} />
                                    <col style={{ width: "48%" }} />
                                    <col style={{ width: "24%" }} />
                                </colgroup>
                                <tbody className="divide-y divide-gray-200">
                                    {tags.length === 0 && (
                                        <tr>
                                            <td colSpan={3} className="py-8 text-center text-sm text-gray-400">
                                                No tags yet. Create one to get started.
                                            </td>
                                        </tr>
                                    )}
                                    {tags.map((tag) => (
                                        <tr key={tag.tag_id} className="group hover:bg-indigo-50/50 transition-colors">
                                            <td className="py-3 px-3 align-middle text-center">
                                                <TagBadge tag={tag} />
                                            </td>
                                            <td className="py-3 px-3 text-sm text-gray-500 text-center align-middle">{tag.description}</td>
                                            <td className="py-3 px-3 align-middle">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => onEditTag(tag)}
                                                        className="text-indigo-400 hover:text-indigo-600 transition-colors"
                                                        aria-label="Edit tag"
                                                    >
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => onDeleteTag(tag.tag_id)}
                                                        className="text-red-400 hover:text-red-600 transition-colors"
                                                        aria-label="Delete tag"
                                                    >
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                                                            <polyline points="3 6 5 6 21 6" />
                                                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                                            <path d="M10 11v6M14 11v6" />
                                                            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Footer Divider */}
                    <div className="h-px bg-gray-100 shrink-0" />

                    {/* Footer */}
                    <div className="px-6 py-4 flex justify-end shrink-0 bg-gray-50/50">
                        <button
                            onClick={onCreateTag}
                            className="flex items-center gap-1.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors shadow-sm"
                        >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            Create Tag
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

// ── Create / Edit Tag Modal ───────────────────────────────────────────────────

interface TagFormModalProps {
    mode: "create" | "edit";
    initial?: Tag;
    onClose: () => void;
    onSubmit: (name:string, description?:string, color?:string, tag_id?:string) => void;
}

function TagFormModal({ mode, initial, onClose, onSubmit }: TagFormModalProps) {
    const [name, setName] = useState(initial?.name ?? "");
    const [description, setDescription] = useState(initial?.description ?? "");
    const [color, setColor] = useState(initial?.color ?? "#3B82F6");

    function handleSubmit()
    {
        onSubmit(name,description,color,initial?.tag_id)
    }

    return (
        <>
            <Backdrop onClick={onClose} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                        <h2 className="text-base font-semibold text-gray-900">
                            {mode === "create" ? "Create Tag" : "Edit Tag"}
                        </h2>
                        <CloseButton onClick={onClose} />
                    </div>

                    {/* Body */}
                    <div className="px-6 py-5 space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Tag Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Production"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Used for critical infrastructure and customer facing assets."
                                rows={3}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tag Color
                            </label>
                            <ColorPicker value={color} onChange={setColor} />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
                        <button
                            onClick={handleSubmit}
                            disabled={!name.trim()}
                            className="text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed px-5 py-2 rounded-lg transition-colors"
                        >
                            Save Tag
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

// ── Delete Tag Modal ──────────────────────────────────────────────────────────

interface DeleteTagModalProps {
    tag: Tag;
    onClose: () => void;
    onConfirm: (tag_id:string) => void;
}

function DeleteTagModal({ tag, onClose, onConfirm }: DeleteTagModalProps) {

    function handleDelete(){
        onConfirm(tag.tag_id)
    }

    return (
        <>
            <Backdrop onClick={onClose} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                        <h2 className="text-base font-semibold text-gray-900">Delete Tag</h2>
                        <CloseButton onClick={onClose} />
                    </div>

                    {/* Body */}
                    <div className="px-6 py-5">
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Are you sure you want to remove the tag,{" "}
                            <TagBadge tag={tag} />
                            ?
                        </p>
                        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                            Removing this tag will immediately disassociate it from all resources
                            in your workspace. This action cannot be undone.
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="text-sm font-medium text-gray-600 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            className="text-sm font-semibold text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors"
                        >
                            Yes, Delete
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

// ── Tag Manager (orchestrates all modals) ─────────────────────────────────────

type TagModalView = "list" | "create" | "edit" | "delete" | null;

interface TagManagerProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (
            tag_id: string,
            name: string,
            description?: string | null,
            color?: string | null,
            ) => void;
    onDelete: (tag_id: string) => void;
    tags : Tag[]
}

export function TagManager({ isOpen, onClose, onSave, onDelete, tags }: TagManagerProps) {
    const [view, setView] = useState<TagModalView>("list");
    const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

    if (!isOpen) return null;

    function handleClose() {
        setView("list");
        setSelectedTag(null);
        onClose();
    }

    function handleEditTag(tag: Tag) {
        setSelectedTag(tag);
        setView("edit");
    }

    function handleSaveTag(name:string, description?:string, color?:string, tag_id?:string) {
        if (!name.trim()) return;
        onSave(
            name.trim(),
            description?.trim() ?? "",
            color,
            tag_id ?? "",
        );
        setView("list");
        setSelectedTag(null);
    }

    function handleDeleteTag(tag_id:string) {
        onDelete(tag_id);
        setView("list");
        setSelectedTag(null);
    }

    if (view === "list") {
        return (
            <TagListModal
                tags={tags}
                onClose={handleClose}
                onCreateTag={() => setView("create")}
                onEditTag={handleEditTag}
                onDeleteTag={handleDeleteTag}
            />
        );
    }

    if (view === "create") {
        return (
            <TagFormModal
                mode="create"
                onClose={() => setView("list")}
                onSubmit={handleSaveTag}
            />
        );
    }

    if (view === "edit" && selectedTag) {
        return (
            <TagFormModal
                mode="edit"
                initial={selectedTag}
                onClose={() => setView("list")}
                onSubmit={handleSaveTag}
            />
        );
    }

    if (view === "delete" && selectedTag) {
        return (
            <DeleteTagModal
                tag={selectedTag}
                onClose={() => setView("list")}
                onConfirm={handleDeleteTag}
            />
        );
    }

    return null;
}
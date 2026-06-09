'use client';

import { useState, useRef, useEffect } from 'react';
import { Prisma } from "@/lib/generated/prisma"; 
import { type Ticket , tagSelect} from "@/actions/ticketActions";
import { userSelect } from "@/actions/userActions";
import { Input } from '@/components/ui/input';

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
  onCreateTicket: (ticket: Partial<Ticket>) => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function CreateTicketModal({ isOpen, onClose, onCreateTicket }: CreateTicketModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [deadline, setDeadline] = useState('');

	const [tags, setTags] = useState<string[]>([]);
	const [tagsOpen, setTagsOpen] = useState(false);
	const tagsRef = useRef<HTMLDivElement>(null);

	const [users, setUsers] = useState<Prisma.usersGetPayload<{}>[]>([]);
	const [assignerId, setAssignerId] = useState('');
	const [assignedIds, setAssignedIds] = useState<string[]>([]);	
	const [watcherId, setWatcherId] = useState('');
	const [availableTags, setAvailableTags] = useState<Prisma.TagsGetPayload<{}>[]>([]);
	const assignedRef = useRef<HTMLDivElement>(null);
	const [assignedOpen, setAssignedOpen] = useState(false);

	useEffect(() => {
		userSelect().then(setUsers);
		tagSelect().then(setAvailableTags);
	
		function handleClickOutside(e: MouseEvent) {
			if (tagsRef.current && !tagsRef.current.contains(e.target as Node)) {
				setTagsOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	function toggleTag(tagId: string) {
		setTags(prev => prev.includes(tagId) ? prev.filter(t => t !== tagId) : [...prev, tagId]);
	}

	function toggleAssigned(userId: string) {
		setAssignedIds(prev => 
			prev.includes(userId) 
				? prev.filter(id => id !== userId) 
				: [...prev, userId]
		);
	}

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

	onCreateTicket({
		name: title.trim(),
		description: description.trim() || null,
		deadline_date: deadline ? new Date(deadline) : new Date(),
		assigner_id: assignerId,
		watcher_id: watcherId || null,
		status: 'PENDING',
		},tags,assignedIds // [ERROR] Tags. Idk how.
	);

    setTitle('');
    setDescription('');
    setType('');
    setDeadline('');
		setAssignerId('');
		setWatcherId('');
		setTags([]);
    onClose();
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  if (!isOpen) return null;

	const colorClasses = {
		indigo: "bg-indigo-50 text-indigo-700",
		red:    "bg-red-50 text-red-700",
		green:  "bg-green-50 text-green-700",
		blue:   "bg-blue-50 text-blue-700",
		yellow: "bg-yellow-50 text-yellow-700",
		purple: "bg-purple-50 text-purple-700",
		pink:   "bg-pink-50 text-pink-700",
		gray:   "bg-gray-50 text-gray-700",
		// add more as needed
	};
	console.log(users)
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

          {/* Assigned to + Watchers row */}
          <div className="grid grid-cols-2 gap-4">
							{/* Assigned To */}
							<div className="space-y-1.5">
								<label className="text-sm font-medium text-gray-700">Assigned To</label>
								<div className="relative">
									<button
										type="button"
										onClick={() => setAssignedOpen(o => !o)}
										className="w-full flex items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-[38px]"
									>
										<div className="flex flex-wrap gap-1 flex-1">
											{assignedIds.length === 0 ? (
												<span className="text-gray-400">Assign to...</span>
											) : (
												assignedIds.map(userId => {
													const user = users.find(u => u.user_id === userId);
													return (
														<span
															key={userId}
															className="inline-flex items-center gap-1 rounded bg-indigo-50 text-indigo-700 px-1.5 py-0.5 text-xs font-medium"
														>
															{user?.name}
															<span
																className="cursor-pointer opacity-60 hover:opacity-100 text-sm leading-none"
																onClick={e => { e.stopPropagation(); toggleAssigned(userId); }}
															>
																×
															</span>
														</span>
													);
												})
											)}
										</div>
										<ChevronDownIcon />
									</button>

									{assignedOpen && (
										<div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
											{users.map(user => (
												<div
													key={user.user_id}
													onClick={() => toggleAssigned(user.user_id)}
													className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm cursor-pointer hover:bg-gray-50 text-gray-700"
												>
													<div className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
														assignedIds.includes(user.user_id)
															? 'bg-indigo-600 border-indigo-600'
															: 'border-gray-300'
													}`}>
														{assignedIds.includes(user.user_id) && (
															<svg width="10" height="10" viewBox="0 0 12 12" fill="none">
																<polyline points="2 6 5 9 10 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
															</svg>
														)}
													</div>
													{user.name}
												</div>
											))}
										</div>
									)}
								</div>
							</div>

							{/* Watcher */}
							<div className="space-y-1.5">
								<label className="text-sm font-medium text-gray-700">Watcher</label>
								<div className="relative">
									<div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
										<EyeIcon />
									</div>
									<select
										value={watcherId}
										onChange={(e) => setWatcherId(e.target.value)}
										className="w-full appearance-none rounded-lg border border-gray-200 bg-white pl-9 pr-9 py-2.5 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
									>
										<option value="">Add watchers...</option>
										{users.map((u) => (
											<option key={u.user_id} value={u.user_id}>{u.name}</option>
										))}
									</select>
									<div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
										<ChevronDownIcon />
									</div>
								</div>
							</div>
					</div>

          {/* Type + Tags row */}
          <div className="grid grid-cols-2 gap-4">

            {/* Tags */}
						<div className="space-y-1.5" ref={tagsRef}>
							<label className="text-sm font-medium text-gray-700">Tags</label>
							<div className="relative">
								<button
									type="button"
									onClick={() => setTagsOpen(o => !o)}
									className="w-full flex items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-[38px]"
								>
									<div className="flex flex-wrap gap-1 flex-1">
										{tags.length === 0 ? (
											<span className="text-gray-400">Select tags...</span>
										) : (
											tags.map(tag_id => {
												const tag = availableTags.find(t => t.tag_id === tag_id);
												return (
													<span
														key={tag_id}
														className={
															(colorClasses[tag?.color as keyof typeof colorClasses] ?? colorClasses.indigo) +
															" inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-medium"
														}
													>
														{tag?.name}
														<span
															className="cursor-pointer opacity-60 hover:opacity-100 text-sm leading-none"
															onClick={e => { e.stopPropagation(); toggleTag(tag_id); }}
														>
															×
														</span>
													</span>
												);
											})
										)}
									</div>
									<ChevronDownIcon />
								</button>

								{tagsOpen && (
									<div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
										{availableTags.map(tag => (
											<div
												key={tag.tag_id}
												onClick={() => toggleTag(tag.tag_id)}
												className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm cursor-pointer hover:bg-gray-50 text-gray-700"
											>
												<div className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
													tags.includes(tag.tag_id)
														? 'bg-indigo-600 border-indigo-600'
														: 'border-gray-300'
												}`}>
													{tags.includes(tag.tag_id) && (
														<svg width="10" height="10" viewBox="0 0 12 12" fill="none">
															<polyline points="2 6 5 9 10 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
														</svg>
													)}
												</div>
												{tag.name}
											</div>
										))}
									</div>
								)}
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

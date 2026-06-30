"use client";

import { useState, useEffect } from "react";
import SidebarLayout from "@/components/layout/sidebar";
import TopNav from "@/components/layout/TopNav";

// ============================================================
// TYPES
// ============================================================

type CredentialType =
  | "PostgreSQL URL"
  | "Secret Key"
  | "IAM Access Key"
  | "Bearer Token"
  | "Other";

/**
 * Represents a stored credential entry.
 * Maps 1-to-1 with the `credentials` table on the backend.
 */
interface Credential {
  /** UUID primary key */
  id: string;
  /** Display name shown in the Name column (e.g. "Production Database") */
  name: string;
  /** Secondary label shown under the name (e.g. "user: admin_prod") */
  subtitle: string;
  /** Classification badge in the Type column */
  type: CredentialType;
  /** The raw secret value — TODO: backend must decrypt before returning */
  value: string;
  /** Whether this row's value is currently revealed in the UI (session-only, not persisted) */
  isVisible: boolean;
  /** Whether this credential is shared/visible to the client portal */
  isShared: boolean;
  /** Whether client access is restricted to view-only (cannot copy value) */
  isViewOnly: boolean;
}

const CREDENTIAL_TYPES: CredentialType[] = [
  "PostgreSQL URL",
  "Secret Key",
  "IAM Access Key",
  "Bearer Token",
  "Other",
];

/** Visible prefix displayed when a value is masked */
const TYPE_MASKED_PREFIX: Record<CredentialType, string> = {
  "PostgreSQL URL": "postgres://",
  "Secret Key": "sk_test_",
  "IAM Access Key": "AKIA",
  "Bearer Token": "SG.",
  "Other": "",
};

// ============================================================
// DATA LAYER (replace with API calls)
// ============================================================

const MOCK_CREDENTIALS: Credential[] = [
  {
    id: "1",
    name: "Production Database",
    subtitle: "user: admin_prod",
    type: "PostgreSQL URL",
    value: "postgres://user:password@host/database",
    isVisible: false,
    isShared: false,
    isViewOnly: false,
  },
  {
    id: "2",
    name: "Stripe API Key",
    subtitle: "env: staging",
    type: "Secret Key",
    value: "stripe-test-key-placeholder",
    isVisible: false,
    isShared: true,
    isViewOnly: false,
  },
  {
    id: "3",
    name: "AWS S3 Bucket",
    subtitle: "region: us-east-1",
    type: "IAM Access Key",
    value: "aws-iam-key-placeholder",
    isVisible: false,
    isShared: false,
    isViewOnly: false,
  },
  {
    id: "4",
    name: "SendGrid Mailer",
    subtitle: "user: apikey",
    type: "Bearer Token",
    value: "sendgrid-api-key-placeholder",
    isVisible: false,
    isShared: true,
    isViewOnly: false,
  },
];

// TODO: replace with API call — PATCH /api/credentials/:id/shared
function onToggleShared(id: string, current: Credential[]): Credential[] {
  return current.map((c) => (c.id === id ? { ...c, isShared: !c.isShared } : c));
}

// TODO: replace with API call — PATCH /api/credentials/:id/view-only
function onToggleViewOnly(id: string, current: Credential[]): Credential[] {
  return current.map((c) => (c.id === id ? { ...c, isViewOnly: !c.isViewOnly } : c));
}

// TODO: replace with API call — DELETE /api/credentials/:id
function onDelete(id: string, current: Credential[]): Credential[] {
  return current.filter((c) => c.id !== id);
}

// TODO: replace with API call — PATCH /api/credentials/:id
function onEdit(updated: Credential, current: Credential[]): Credential[] {
  return current.map((c) => (c.id === updated.id ? updated : c));
}

// TODO: replace with API call — POST /api/credentials
function onSave(
  form: Omit<Credential, "id" | "isVisible">,
  current: Credential[]
): Credential[] {
  const newCred: Credential = { ...form, id: Date.now().toString(), isVisible: false };
  return [...current, newCred];
}

// ============================================================
// HELPERS
// ============================================================

function getMaskedDisplay(cred: Credential): string {
  const prefix = TYPE_MASKED_PREFIX[cred.type] ?? "";
  return `${prefix}${"•".repeat(10)}`;
}

// ============================================================
// ICONS
// ============================================================

const GlobeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const KeySvgIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
);

const CloudIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>
);

const GridSvgIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
);

const SearchSvgIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const FilterSvgIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const PlusSvgIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const EyeSvgIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffSvgIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const CopySvgIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckSvgIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const EditSvgIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TrashSvgIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const XSvgIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronLeftSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

function getCredentialIcon(type: CredentialType) {
  if (type === "PostgreSQL URL") return <GlobeIcon />;
  if (type === "IAM Access Key") return <CloudIcon />;
  if (type === "Bearer Token") return <GridSvgIcon />;
  return <KeySvgIcon />;
}

// ============================================================
// TOGGLE
// ============================================================

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
}

function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
        checked ? "bg-indigo-600" : "bg-gray-200"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition-transform duration-200 ease-in-out ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}

// ============================================================
// CREDENTIAL ROW
// ============================================================

interface CredentialRowProps {
  credential: Credential;
  onToggleShared: () => void;
  onToggleViewOnly: () => void;
  onToggleVisibility: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function CredentialRow({
  credential,
  onToggleShared,
  onToggleViewOnly,
  onToggleVisibility,
  onEdit,
  onDelete,
}: CredentialRowProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    // TODO: decrypt value from backend before displaying
    navigator.clipboard.writeText(credential.value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const displayValue = credential.isVisible
    ? credential.value
    : getMaskedDisplay(credential);

  return (
    <tr className="hover:bg-gray-50/60 transition-colors group">
      {/* App icon */}
      <td className="px-4 py-3.5 w-14">
        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0">
          {getCredentialIcon(credential.type)}
        </div>
      </td>

      {/* Name */}
      <td className="px-4 py-3.5 min-w-[160px]">
        <p className="text-sm font-semibold text-gray-900 leading-tight">{credential.name}</p>
        <p className="text-xs text-gray-400 mt-0.5">{credential.subtitle}</p>
      </td>

      {/* Type */}
      <td className="px-4 py-3.5">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100 whitespace-nowrap">
          {credential.type}
        </span>
      </td>

      {/* Value */}
      <td className="px-4 py-3.5 min-w-[240px]">
        <div className="flex items-center gap-1.5">
          {/* TODO: decrypt value from backend before displaying */}
          <span className="text-sm font-mono text-gray-700 select-none tracking-wide">
            {displayValue}
          </span>
          <button
            onClick={onToggleVisibility}
            className="p-1 text-gray-300 hover:text-gray-500 transition-colors rounded"
            title={credential.isVisible ? "Hide value" : "Show value"}
          >
            {credential.isVisible ? <EyeOffSvgIcon /> : <EyeSvgIcon />}
          </button>
          <button
            onClick={handleCopy}
            className={`p-1 transition-colors rounded ${
              copied ? "text-green-500" : "text-gray-300 hover:text-gray-500"
            }`}
            title={copied ? "Copied!" : "Copy to clipboard"}
          >
            {copied ? <CheckSvgIcon /> : <CopySvgIcon />}
          </button>
        </div>
      </td>

      {/* Visible to Client */}
      <td className="px-4 py-3.5">
        {/* TODO: PATCH visibility flag to backend on toggle */}
        <Toggle checked={credential.isShared} onChange={onToggleShared} />
      </td>

      {/* Status */}
      <td className="px-4 py-3.5 min-w-[90px]">
        {credential.isShared && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
            Shared
          </span>
        )}
      </td>

      {/* Action */}
      <td className="px-4 py-3.5 w-24">
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* TODO: wire edit to PATCH endpoint */}
          <button
            onClick={onEdit}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            title="Edit"
          >
            <EditSvgIcon />
          </button>
          {/* TODO: wire delete to DELETE endpoint */}
          <button
            onClick={onDelete}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
            title="Delete"
          >
            <TrashSvgIcon />
          </button>
        </div>
      </td>
    </tr>
  );
}

// ============================================================
// CREDENTIAL MODAL (new / edit slide-over)
// ============================================================

interface CredentialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (form: Omit<Credential, "id" | "isVisible">) => void;
  editCredential?: Credential;
}

function CredentialModal({ isOpen, onClose, onSave, editCredential }: CredentialModalProps) {
  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState<CredentialType>("PostgreSQL URL");
  const [isShared, setIsShared] = useState(false);
  const [isViewOnly, setIsViewOnly] = useState(false);
  const [showValue, setShowValue] = useState(false);

  useEffect(() => {
    if (editCredential) {
      setName(editCredential.name);
      setSubtitle(editCredential.subtitle);
      setValue(editCredential.value);
      setType(editCredential.type);
      setIsShared(editCredential.isShared);
      setIsViewOnly(editCredential.isViewOnly);
    } else {
      setName("");
      setSubtitle("");
      setValue("");
      setType("PostgreSQL URL");
      setIsShared(false);
      setIsViewOnly(false);
    }
    setShowValue(false);
  }, [editCredential, isOpen]);

  if (!isOpen) return null;

  function handleSubmit() {
    if (!name.trim() || !value.trim()) return;
    // TODO: POST to credentials endpoint on save (PATCH if editCredential is set)
    onSave({ name, subtitle, value, type, isShared, isViewOnly });
    onClose();
  }

  const isValid = name.trim().length > 0 && value.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
        onClick={onClose}
      />
      {/* Slide-over panel */}
      <div className="relative ml-auto h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">
              {editCredential ? "Edit Credential" : "New Credential"}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {editCredential
                ? "Update the details below."
                : "Add a new secret to the repository."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XSvgIcon />
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Production Database"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-gray-300"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Subtitle</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. user: admin_prod"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-gray-300"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as CredentialType)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-700"
            >
              {CREDENTIAL_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Value <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type={showValue ? "text" : "password"}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter secret value..."
                className="w-full px-3 py-2 pr-10 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono placeholder:font-sans placeholder:text-gray-300"
              />
              <button
                type="button"
                onClick={() => setShowValue((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showValue ? <EyeOffSvgIcon /> : <EyeSvgIcon />}
              </button>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4 space-y-4">
            {/* Visible to Client */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Visible to Client</p>
                <p className="text-xs text-gray-400 mt-0.5">Share this credential in the client portal</p>
              </div>
              <Toggle checked={isShared} onChange={() => setIsShared((v) => !v)} />
            </div>

            {/* View Only — disabled placeholder */}
            <div className="flex items-center justify-between opacity-60">
              <div>
                <p className="text-sm font-medium text-gray-700">View Only</p>
                <p className="text-xs text-gray-400 mt-0.5">Client can view but not copy the value</p>
                {/* TODO: PATCH view-only flag to backend */}
              </div>
              <Toggle checked={isViewOnly} onChange={() => setIsViewOnly((v) => !v)} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {editCredential ? "Save Changes" : "Add Credential"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PAGE
// ============================================================

export default function CredentialsPage() {
  const [credentials, setCredentials] = useState<Credential[]>(MOCK_CREDENTIALS);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCredential, setEditingCredential] = useState<Credential | undefined>();

  function handleToggleSharedRow(id: string) {
    setCredentials((prev) => onToggleShared(id, prev));
  }

  function handleToggleViewOnlyRow(id: string) {
    setCredentials((prev) => onToggleViewOnly(id, prev));
  }

  function handleDeleteRow(id: string) {
    setCredentials((prev) => onDelete(id, prev));
  }

  function handleEditRow(credential: Credential) {
    setEditingCredential(credential);
    setModalOpen(true);
  }

  function handleSaveModal(form: Omit<Credential, "id" | "isVisible">) {
    if (editingCredential) {
      setCredentials((prev) => onEdit({ ...editingCredential, ...form }, prev));
    } else {
      setCredentials((prev) => onSave(form, prev));
    }
  }

  function handleToggleValueVisibility(id: string) {
    setCredentials((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isVisible: !c.isVisible } : c))
    );
  }

  function handleOpenNew() {
    setEditingCredential(undefined);
    setModalOpen(true);
  }

  function handleCloseModal() {
    setModalOpen(false);
    setEditingCredential(undefined);
  }

  // TODO: wire search and filter to backend query params
  const filteredCredentials = credentials.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      c.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SidebarLayout>
      <div className="flex flex-col h-full">
        <TopNav breadcrumbs={["Acesoft", "Credentials"]} />

        <div className="flex-1 overflow-y-auto p-6">
          {/* Page header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Credentials Repository</h1>
              <p className="text-sm text-gray-400 mt-0.5">
                Manage and share project passwords and API keys.
              </p>
            </div>
            <button
              onClick={handleOpenNew}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shrink-0"
            >
              <PlusSvgIcon />
              New Credential
            </button>
          </div>

          {/* Table card */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Search + Filter bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 gap-3">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <SearchSvgIcon />
                </span>
                {/* TODO: wire search and filter to backend query params */}
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search credentials..."
                  className="pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-72 placeholder:text-gray-300"
                />
              </div>
              <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shrink-0">
                <FilterSvgIcon />
                Filter
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/40">
                    <th className="text-left text-[11px] font-medium text-gray-400 uppercase tracking-wider px-4 py-3 w-14">
                      App
                    </th>
                    <th className="text-left text-[11px] font-medium text-gray-400 uppercase tracking-wider px-4 py-3 min-w-[160px]">
                      Name
                    </th>
                    <th className="text-left text-[11px] font-medium text-gray-400 uppercase tracking-wider px-4 py-3 min-w-[160px]">
                      Type
                    </th>
                    <th className="text-left text-[11px] font-medium text-gray-400 uppercase tracking-wider px-4 py-3 min-w-[240px]">
                      Value
                    </th>
                    <th className="text-left text-[11px] font-medium text-gray-400 uppercase tracking-wider px-4 py-3 min-w-[130px]">
                      Visible to Client
                    </th>
                    <th className="text-left text-[11px] font-medium text-gray-400 uppercase tracking-wider px-4 py-3 min-w-[90px]">
                      Status
                    </th>
                    <th className="text-right text-[11px] font-medium text-gray-400 uppercase tracking-wider px-4 py-3 w-24">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredCredentials.map((cred) => (
                    <CredentialRow
                      key={cred.id}
                      credential={cred}
                      onToggleShared={() => handleToggleSharedRow(cred.id)}
                      onToggleViewOnly={() => handleToggleViewOnlyRow(cred.id)}
                      onToggleVisibility={() => handleToggleValueVisibility(cred.id)}
                      onEdit={() => handleEditRow(cred)}
                      onDelete={() => handleDeleteRow(cred.id)}
                    />
                  ))}
                  {filteredCredentials.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-10 text-center text-sm text-gray-400">
                        No credentials match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
              {/* TODO: wire pagination to backend */}
              <span className="text-sm text-gray-400">
                Showing {credentials.length} of 24 credentials
              </span>
              <div className="flex items-center gap-1">
                <button
                  className="p-1.5 text-gray-300 rounded-md transition-colors cursor-not-allowed"
                  disabled
                  title="Previous page"
                >
                  <ChevronLeftSvg />
                </button>
                <button
                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                  title="Next page"
                >
                  <ChevronRightSvg />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CredentialModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveModal}
        editCredential={editingCredential}
      />
    </SidebarLayout>
  );
}

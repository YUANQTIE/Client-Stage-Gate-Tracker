export type Role = "PRODUCT_OWNER" | "PRODUCT_TEAM" | "FINANCE" | "CLIENT";

export type TicketStatus =
  | "TODO"
  | "IN_PROGRESS"
  | "IN_REVIEW"
  | "DONE"
  | "BLOCKED"
  | "FLAGGED";

export type TicketType = "FRONTEND" | "BACKEND" | "INTEGRATION";

export type PhaseStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "GATE_REVIEW"
  | "COMPLETED"
  | "REJECTED";

export type GateStatus = "PENDING" | "APPROVED" | "REJECTED";

export type ContractStatus =
  | "DRAFT"
  | "PENDING_SIGNATURE"
  | "SIGNED"
  | "REJECTED";

export interface UserType {
  user_id: string,
  first_name: string,
  last_name: string,
  phone: string,
  image_id: string,
  client_id: string, 
  department_id: string,
  email: string
}

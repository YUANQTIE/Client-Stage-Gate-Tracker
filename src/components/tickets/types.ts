export interface Assignee {
  name: string;
  initials: string;
  bgColor: string;
}

export interface Tag {
  label: string;
  color: string;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  assignee?: Assignee;
}

export interface Attachment {
  id: string;
  name: string;
  type: 'file' | 'image';
}

export interface ActivityItem {
  id: string;
  user: Assignee;
  action: string;
  time: string;
  highlight?: string;
  highlightColor?: string;
  dotColor?: string;
}

export interface Column {
  id: 'PENDING' | 'IN_PROGRESS' | 'FINISHED';
  title: string;
  dotColor: string;
}

export const COLUMNS: Column[] = [
  { id: 'PENDING', title: 'Pending', dotColor: 'bg-gray-400' },
  { id: 'IN_PROGRESS', title: 'In Progress', dotColor: 'bg-blue-500' },
  { id: 'FINISHED', title: 'Finished', dotColor: 'bg-green-500' },
];

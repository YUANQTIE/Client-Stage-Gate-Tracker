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

export type ColumnId = 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';

export interface Ticket {
  id: string;
  column: ColumnId;
  title: string;
  assignee?: Assignee;
  watcher?: Assignee;
  deadline?: string;
  isOverdue?: boolean;
  isActive?: boolean;
  isFlagged?: boolean;
  type?: string;
  typeColor?: string;
  tags?: Tag[];
  description?: string;
  subtasks?: Subtask[];
  attachments?: Attachment[];
  activity?: ActivityItem[];
}

export interface Column {
  id: ColumnId;
  title: string;
  dotColor: string;
}

export const COLUMNS: Column[] = [
  { id: 'TODO', title: 'To Do', dotColor: 'bg-gray-400' },
  { id: 'IN_PROGRESS', title: 'In Progress', dotColor: 'bg-blue-500' },
  { id: 'IN_REVIEW', title: 'In Review', dotColor: 'bg-amber-500' },
  { id: 'DONE', title: 'Done', dotColor: 'bg-green-500' },
];

export const MOCK_TICKETS: Ticket[] = [
  {
    id: 'ASC-1029',
    column: 'TODO',
    title: 'Setup CI/CD deployment pipeline for staging environment',
    assignee: { name: 'David M.', initials: 'DM', bgColor: 'bg-gray-800' },
    deadline: 'Oct 24',
    isOverdue: true,
    type: 'Backend',
    typeColor: 'bg-green-500',
    tags: [{ label: 'DevOps', color: 'bg-blue-100 text-blue-700' }],
    description:
      'Set up the complete CI/CD pipeline for the staging environment including automated testing and deployment workflows.',
    subtasks: [
      { id: 's1', title: 'Configure GitHub Actions workflow', completed: true },
      { id: 's2', title: 'Set up staging server configuration', completed: false },
      { id: 's3', title: 'Test deployment pipeline end-to-end', completed: false },
    ],
    attachments: [],
    activity: [
      {
        id: 'a1',
        user: { name: 'David M.', initials: 'DM', bgColor: 'bg-gray-800' },
        action: 'created this ticket',
        time: '3 days ago',
        dotColor: 'bg-gray-400',
      },
    ],
  },
  {
    id: 'ASC-1030',
    column: 'TODO',
    title: 'Draft initial technical specification for Module B',
    deadline: 'Oct 26',
    type: 'Frontend',
    typeColor: 'bg-blue-500',
    tags: [{ label: 'Docs', color: 'bg-gray-100 text-gray-600' }],
    description:
      'Create a comprehensive technical specification document for Module B, including architecture diagrams and API contracts.',
    subtasks: [],
    attachments: [],
    activity: [],
  },
  {
    id: 'ASC-1031',
    column: 'TODO',
    title: 'Update accessibility labels for dashboard components',
    assignee: { name: 'Jane K.', initials: 'JK', bgColor: 'bg-purple-600' },
    deadline: 'Oct 28',
    type: 'Frontend',
    typeColor: 'bg-blue-500',
    tags: [{ label: 'A11y', color: 'bg-teal-100 text-teal-700' }],
    description:
      'Audit and update all accessibility attributes across dashboard components to meet WCAG 2.1 AA standards.',
    subtasks: [
      { id: 's1', title: 'Audit current component labels', completed: false },
      { id: 's2', title: 'Update aria-labels and roles', completed: false },
    ],
    attachments: [],
    activity: [],
  },
  {
    id: 'ASC-1018',
    column: 'IN_PROGRESS',
    title: 'Implement optimized Kanban drag-and-drop interactions',
    assignee: { name: 'Alex M.', initials: 'AM', bgColor: 'bg-indigo-600' },
    deadline: 'Today',
    isActive: true,
    type: 'Frontend',
    typeColor: 'bg-blue-500',
    tags: [{ label: 'UX', color: 'bg-purple-100 text-purple-700' }],
    description:
      'Implement smooth drag-and-drop interactions for the Kanban board using @dnd-kit library with proper animations and visual feedback.',
    subtasks: [
      { id: 's1', title: 'Set up DnD context and sensors', completed: true, assignee: { name: 'Alex M.', initials: 'AM', bgColor: 'bg-indigo-600' } },
      { id: 's2', title: 'Implement drag overlay component', completed: true, assignee: { name: 'Alex M.', initials: 'AM', bgColor: 'bg-indigo-600' } },
      { id: 's3', title: 'Add column drop zones', completed: false },
      { id: 's4', title: 'Polish animations and transitions', completed: false },
    ],
    attachments: [{ id: 'a1', name: 'wireframe.png', type: 'image' }],
    activity: [
      {
        id: 'a1',
        user: { name: 'Alex M.', initials: 'AM', bgColor: 'bg-indigo-600' },
        action: 'moved to',
        highlight: 'In Progress',
        highlightColor: 'bg-blue-100 text-blue-700',
        time: '5 hours ago',
        dotColor: 'bg-blue-500',
      },
    ],
  },
  {
    id: 'ASC-1027',
    column: 'IN_PROGRESS',
    title: 'Refactor legacy authentication module to support OAuth 2.0',
    assignee: { name: 'Sarah J.', initials: 'SJ', bgColor: 'bg-amber-600' },
    deadline: 'Oct 25',
    isFlagged: true,
    type: 'Backend',
    typeColor: 'bg-green-500',
    tags: [
      { label: 'Auth', color: 'bg-orange-100 text-orange-700' },
      { label: 'Security', color: 'bg-red-100 text-red-700' },
    ],
    description:
      'Refactor the existing authentication module to support OAuth 2.0, including token refresh mechanisms and proper error handling.',
    subtasks: [
      { id: 's1', title: 'Audit current auth implementation', completed: true },
      { id: 's2', title: 'Implement OAuth 2.0 flow', completed: false },
      { id: 's3', title: 'Update session management', completed: false },
    ],
    attachments: [],
    activity: [
      {
        id: 'a1',
        user: { name: 'Sarah J.', initials: 'SJ', bgColor: 'bg-amber-600' },
        action: 'flagged as priority',
        time: 'Yesterday',
        dotColor: 'bg-amber-500',
      },
    ],
  },
  {
    id: 'ASC-1024',
    column: 'IN_REVIEW',
    title: 'Implement robust retry logic for payment gateway webhook',
    assignee: { name: 'Michael Chen', initials: 'MC', bgColor: 'bg-slate-700' },
    watcher: { name: 'Sarah Jenkins', initials: 'SJ', bgColor: 'bg-pink-500' },
    deadline: 'Oct 24',
    isOverdue: true,
    type: 'Backend',
    typeColor: 'bg-green-500',
    tags: [
      { label: 'Urgent', color: 'bg-red-100 text-red-600' },
      { label: 'API', color: 'bg-slate-100 text-slate-600' },
    ],
    description:
      'The current payment webhook listener is failing silently when the upstream provider experiences transient timeouts. We need to implement an exponential backoff retry mechanism to ensure no payment status updates are lost.',
    subtasks: [
      {
        id: 's1',
        title: 'Update DB schema for retry count',
        completed: true,
        assignee: { name: 'Michael Chen', initials: 'MC', bgColor: 'bg-slate-700' },
      },
      {
        id: 's2',
        title: 'Write backoff logic utility',
        completed: false,
        assignee: { name: 'Michael Chen', initials: 'MC', bgColor: 'bg-slate-700' },
      },
      { id: 's3', title: 'Add unit tests for failure scenarios', completed: false },
    ],
    attachments: [
      { id: 'a1', name: 'error_log.txt', type: 'file' },
      { id: 'a2', name: 'current_impl.png', type: 'image' },
    ],
    activity: [
      {
        id: 'a1',
        user: { name: 'Michael Chen', initials: 'MC', bgColor: 'bg-slate-700' },
        action: 'moved to',
        highlight: 'In Progress',
        highlightColor: 'bg-blue-100 text-blue-700',
        time: '2 hours ago',
        dotColor: 'bg-blue-500',
      },
      {
        id: 'a2',
        user: { name: 'Sarah Jenkins', initials: 'SJ', bgColor: 'bg-pink-500' },
        action: 'changed priority to',
        highlight: 'Urgent',
        highlightColor: 'text-red-600 font-medium',
        time: 'Yesterday, 4:30 PM',
        dotColor: 'bg-gray-300',
      },
    ],
  },
  {
    id: 'ASC-1015',
    column: 'DONE',
    title: 'Migrate user preferences to new database schema',
    assignee: { name: 'Jane K.', initials: 'JK', bgColor: 'bg-purple-600' },
    deadline: 'Oct 18',
    type: 'Backend',
    typeColor: 'bg-green-500',
    tags: [{ label: 'Migration', color: 'bg-indigo-100 text-indigo-700' }],
    description: 'Successfully migrated all user preference data to the updated schema structure.',
    subtasks: [
      { id: 's1', title: 'Write migration script', completed: true },
      { id: 's2', title: 'Test on staging data', completed: true },
      { id: 's3', title: 'Run on production', completed: true },
    ],
    attachments: [],
    activity: [
      {
        id: 'a1',
        user: { name: 'Jane K.', initials: 'JK', bgColor: 'bg-purple-600' },
        action: 'marked as',
        highlight: 'Done',
        highlightColor: 'bg-green-100 text-green-700',
        time: '2 days ago',
        dotColor: 'bg-green-500',
      },
    ],
  },
];

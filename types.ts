
export interface TeamMember {
  id: string;
  name: string;
  avatar: string;
}

export enum JobStatus {
  Scheduled = 'Scheduled',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
  Pending = 'Pending',
}

export interface Job {
  id: string;
  clientName: string;
  address: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  team: TeamMember[];
  status: JobStatus;
  notes?: string;
}

export interface Feedback {
  id: string;
  clientName: string;
  comment: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
}

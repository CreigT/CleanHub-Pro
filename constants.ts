
import { TeamMember, Job, JobStatus, Feedback } from './types';

export const TEAM_MEMBERS: TeamMember[] = [
  { id: 'tm1', name: 'Alex Green', avatar: 'https://i.pravatar.cc/150?u=tm1' },
  { id: 'tm2', name: 'Maria Garcia', avatar: 'https://i.pravatar.cc/150?u=tm2' },
  { id: 'tm3', name: 'Sam Taylor', avatar: 'https://i.pravatar.cc/150?u=tm3' },
  { id: 'tm4', name: 'Chen Wei', avatar: 'https://i.pravatar.cc/150?u=tm4' },
];

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const dayAfter = new Date(today);
dayAfter.setDate(today.getDate() + 2);

const formatDate = (date: Date) => date.toISOString().split('T')[0];

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job1',
    clientName: 'Innovate Inc.',
    address: '123 Tech Park, Silicon Valley',
    date: formatDate(today),
    time: '09:00',
    team: [TEAM_MEMBERS[0], TEAM_MEMBERS[1]],
    status: JobStatus.Scheduled,
    notes: 'Focus on conference rooms A and B.'
  },
  {
    id: 'job2',
    clientName: 'Sunrise Cafe',
    address: '456 Main St, Downtown',
    date: formatDate(today),
    time: '14:00',
    team: [TEAM_MEMBERS[2]],
    status: JobStatus.Scheduled,
    notes: 'Deep clean the kitchen area.'
  },
  {
    id: 'job3',
    clientName: 'Dr. Smith\'s Office',
    address: '789 Health Ave, Medical Center',
    date: formatDate(tomorrow),
    time: '10:30',
    team: [TEAM_MEMBERS[0], TEAM_MEMBERS[3]],
    status: JobStatus.Scheduled,
  },
  {
    id: 'job4',
    clientName: 'The Grand Library',
    address: '101 Knowledge Blvd, City Center',
    date: formatDate(tomorrow),
    time: '18:00',
    team: [TEAM_MEMBERS[1], TEAM_MEMBERS[2], TEAM_MEMBERS[3]],
    status: JobStatus.Scheduled,
    notes: 'Quiet cleaning required. Use low-noise equipment.'
  },
  {
    id: 'job5',
    clientName: 'Quantum Solutions',
    address: '221 Future Way, Tech Hub',
    date: formatDate(dayAfter),
    time: '11:00',
    team: [TEAM_MEMBERS[0], TEAM_MEMBERS[2]],
    status: JobStatus.Scheduled,
  },
];

export const CUSTOMER_FEEDBACK: Feedback[] = [
    {
        id: 'fb1',
        clientName: 'Innovate Inc.',
        comment: 'The team was incredibly professional and thorough. Our office has never looked better!',
        sentiment: 'Positive',
    },
    {
        id: 'fb2',
        clientName: 'Sunrise Cafe',
        comment: 'Good job on the kitchen, but the front windows were missed.',
        sentiment: 'Neutral',
    },
    {
        id: 'fb3',
        clientName: 'Old Town Apartments',
        comment: 'Absolutely fantastic service! The attention to detail was impeccable. Highly recommended.',
        sentiment: 'Positive',
    },
];


import React, { useState, useEffect, useCallback } from 'react';
import { Job, Feedback } from './types';
import { INITIAL_JOBS, CUSTOMER_FEEDBACK } from './constants';
import { generateWeeklySummary, optimizeSchedule, generateClientReminder } from './services/geminiService';
import Header from './components/Header';
import StatCard from './components/StatCard';
import ScheduleView from './components/ScheduleView';
import AISummary from './components/AISummary';
import CustomerFeedback from './components/CustomerFeedback';
import JobDetailsModal from './components/JobDetailsModal';
import { UserGroupIcon, CalendarIcon, ClockIcon } from './components/icons/Icons';

export default function App() {
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [feedback] = useState<Feedback[]>(CUSTOMER_FEEDBACK);
  const [aiSummary, setAiSummary] = useState<string>('');
  const [isSummaryLoading, setIsSummaryLoading] = useState<boolean>(true);
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const fetchSummary = useCallback(async () => {
    setIsSummaryLoading(true);
    const summary = await generateWeeklySummary(jobs);
    setAiSummary(summary);
    setIsSummaryLoading(false);
  }, [jobs]);

  useEffect(() => {
    fetchSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOptimizeSchedule = async () => {
    setIsOptimizing(true);
    const optimized = await optimizeSchedule(jobs);
    setJobs(optimized);
    setIsOptimizing(false);
  };

  const handleSelectJob = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const upcomingJobs = jobs.filter(j => new Date(j.date) >= new Date()).length;
  const pendingJobs = jobs.filter(j => new Date(j.date) < new Date()).length;
  const teamMembersCount = new Set(jobs.flatMap(j => j.team.map(t => t.id))).size;

  return (
    <div className="min-h-screen bg-gray-100/50 text-gray-800">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard title="Upcoming Jobs" value={upcomingJobs.toString()} icon={<CalendarIcon />} />
          <StatCard title="Jobs This Week" value={pendingJobs.toString()} icon={<ClockIcon />} />
          <StatCard title="Active Team Members" value={teamMembersCount.toString()} icon={<UserGroupIcon />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ScheduleView 
              jobs={jobs} 
              onOptimize={handleOptimizeSchedule} 
              isOptimizing={isOptimizing}
              onSelectJob={handleSelectJob}
            />
          </div>
          <div className="space-y-8">
            <AISummary summary={aiSummary} isLoading={isSummaryLoading} onRefresh={fetchSummary} />
            <CustomerFeedback feedbackItems={feedback} />
          </div>
        </div>
      </main>
      
      {selectedJob && (
        <JobDetailsModal 
          job={selectedJob} 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          onGenerateReminder={generateClientReminder}
        />
      )}
    </div>
  );
}

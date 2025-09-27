
import React from 'react';
import { Job } from '../types';
import JobCard from './JobCard';
import { SparklesIcon } from './icons/Icons';

interface ScheduleViewProps {
  jobs: Job[];
  onOptimize: () => void;
  isOptimizing: boolean;
  onSelectJob: (job: Job) => void;
}

const ScheduleView: React.FC<ScheduleViewProps> = ({ jobs, onOptimize, isOptimizing, onSelectJob }) => {
  const jobsByDate = jobs.reduce((acc, job) => {
    (acc[job.date] = acc[job.date] || []).push(job);
    return acc;
  }, {} as Record<string, Job[]>);

  const sortedDates = Object.keys(jobsByDate).sort();

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Weekly Schedule</h2>
        <button
          onClick={onOptimize}
          disabled={isOptimizing}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
        >
          <SparklesIcon className="h-5 w-5 mr-2" />
          {isOptimizing ? 'Optimizing...' : 'AI Optimize'}
        </button>
      </div>
      <div className="space-y-6">
        {sortedDates.length > 0 ? sortedDates.map(date => (
          <div key={date}>
            <h3 className="font-semibold text-gray-700 mb-2 border-b pb-1">
              {new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobsByDate[date].sort((a,b) => a.time.localeCompare(b.time)).map(job => (
                <JobCard key={job.id} job={job} onSelectJob={onSelectJob} />
              ))}
            </div>
          </div>
        )) : <p className="text-center text-gray-500 py-4">No jobs scheduled.</p>}
      </div>
    </div>
  );
};

export default ScheduleView;

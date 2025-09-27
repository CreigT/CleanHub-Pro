
import React, { useState } from 'react';
import { Job, JobStatus } from '../types';
import { SparklesIcon, XIcon, ClockIcon, LocationMarkerIcon, ClipboardListIcon, UserGroupIcon } from './icons/Icons';

interface JobDetailsModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  onGenerateReminder: (job: Job) => Promise<string>;
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ job, isOpen, onClose, onGenerateReminder }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reminder, setReminder] = useState('');

  const handleGenerateClick = async () => {
    setIsGenerating(true);
    setReminder('');
    const generatedReminder = await onGenerateReminder(job);
    setReminder(generatedReminder);
    setIsGenerating(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all">
        <div className="p-6 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <XIcon />
          </button>
          <h2 className="text-2xl font-bold text-gray-900">{job.clientName}</h2>
          <p className="text-sm text-gray-500 mt-1">{job.status}</p>
        </div>
        
        <div className="border-t border-gray-200 px-6 py-5 space-y-4">
          <div className="flex items-start">
            <LocationMarkerIcon className="h-5 w-5 text-gray-400 mt-0.5" />
            <span className="ml-3 text-gray-700">{job.address}</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="h-5 w-5 text-gray-400" />
            <span className="ml-3 text-gray-700">{new Date(job.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {job.time}</span>
          </div>
          <div className="flex items-start">
            <UserGroupIcon className="h-5 w-5 text-gray-400 mt-0.5" />
            <div className="ml-3">
              <p className="text-gray-700 font-medium">Assigned Team</p>
              <div className="flex items-center space-x-2 mt-1">
                {job.team.map(member => (
                    <div key={member.id} className="flex items-center">
                      <img src={member.avatar} alt={member.name} className="h-6 w-6 rounded-full" />
                      <span className="text-sm text-gray-600 ml-1.5">{member.name}</span>
                    </div>
                ))}
              </div>
            </div>
          </div>
          {job.notes && (
            <div className="flex items-start">
              <ClipboardListIcon className="h-5 w-5 text-gray-400 mt-0.5" />
              <div className="ml-3">
                <p className="text-gray-700 font-medium">Notes</p>
                <p className="text-gray-600 text-sm">{job.notes}</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-50 px-6 py-5 rounded-b-xl">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <SparklesIcon className="h-5 w-5 mr-2 text-blue-500" />
              AI Assistant
            </h3>
            <p className="text-sm text-gray-600 mt-1 mb-4">Generate a friendly reminder for the client.</p>
            <button
                onClick={handleGenerateClick}
                disabled={isGenerating}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
            >
                {isGenerating ? 'Generating...' : 'Generate Client Reminder'}
            </button>
            {reminder && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm text-blue-800">{reminder}</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;

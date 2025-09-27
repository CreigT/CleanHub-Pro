
import React from 'react';
import { Job } from '../types';
import { ClockIcon, LocationMarkerIcon } from './icons/Icons';

interface JobCardProps {
  job: Job;
  onSelectJob: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onSelectJob }) => {
  return (
    <div 
      onClick={() => onSelectJob(job)}
      className="bg-gray-50 border border-gray-200 p-4 rounded-lg cursor-pointer hover:bg-gray-100 hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-gray-800">{job.clientName}</h4>
          <p className="text-sm text-gray-600 flex items-center mt-1">
            <LocationMarkerIcon className="h-4 w-4 mr-1.5 text-gray-400" />
            {job.address}
          </p>
        </div>
        <div className="flex items-center text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
          <ClockIcon className="h-4 w-4 mr-1.5" />
          {job.time}
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex -space-x-2">
          {job.team.map(member => (
            <img 
              key={member.id} 
              className="h-8 w-8 rounded-full border-2 border-white" 
              src={member.avatar} 
              alt={member.name}
              title={member.name}
            />
          ))}
        </div>
        <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-md">{job.status}</span>
      </div>
    </div>
  );
};

export default JobCard;

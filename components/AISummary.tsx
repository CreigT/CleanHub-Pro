
import React from 'react';
import { SparklesIcon } from './icons/Icons';

interface AISummaryProps {
  summary: string;
  isLoading: boolean;
  onRefresh: () => void;
}

const AISummary: React.FC<AISummaryProps> = ({ summary, isLoading, onRefresh }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <SparklesIcon className="h-6 w-6 mr-2 text-blue-500"/>
          AI Weekly Summary
        </h2>
        <button onClick={onRefresh} disabled={isLoading} className="text-sm font-medium text-blue-600 hover:text-blue-800 disabled:opacity-50">
          Refresh
        </button>
      </div>
      {isLoading ? (
        <div className="space-y-2 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      ) : (
        <p className="text-gray-600 text-sm leading-relaxed">
          {summary}
        </p>
      )}
    </div>
  );
};

export default AISummary;

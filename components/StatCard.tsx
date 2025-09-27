
import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between transition-transform hover:scale-105">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
      <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
        {icon}
      </div>
    </div>
  );
};

export default StatCard;

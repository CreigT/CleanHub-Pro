
import React from 'react';
import { Feedback } from '../types';
import { ThumbUpIcon, ThumbDownIcon, MinusCircleIcon, ChatAlt2Icon } from './icons/Icons';

interface CustomerFeedbackProps {
  feedbackItems: Feedback[];
}

const SentimentIcon: React.FC<{ sentiment: Feedback['sentiment'] }> = ({ sentiment }) => {
    switch (sentiment) {
        case 'Positive':
            return <ThumbUpIcon className="h-5 w-5 text-green-500" />;
        case 'Negative':
            return <ThumbDownIcon className="h-5 w-5 text-red-500" />;
        case 'Neutral':
            return <MinusCircleIcon className="h-5 w-5 text-yellow-500" />;
        default:
            return null;
    }
};


const CustomerFeedback: React.FC<CustomerFeedbackProps> = ({ feedbackItems }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
       <h2 className="text-xl font-bold text-gray-900 flex items-center mb-4">
        <ChatAlt2Icon className="h-6 w-6 mr-2 text-gray-500" />
        Customer Feedback
       </h2>
       <ul className="space-y-4">
        {feedbackItems.map(item => (
            <li key={item.id} className="flex items-start">
                <div className="flex-shrink-0 pt-1">
                    <SentimentIcon sentiment={item.sentiment} />
                </div>
                <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{item.clientName}</p>
                    <p className="text-sm text-gray-600">{item.comment}</p>
                </div>
            </li>
        ))}
       </ul>
    </div>
  );
};

export default CustomerFeedback;

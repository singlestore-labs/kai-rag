import React from 'react';

const InsightCard: React.FC = () => (
  <div className="bg-purple-600 p-4 rounded-lg mt-2 text-sm max-w-[500px]">
    <h3 className="font-bold mb-2 text-left">Insight Summary</h3>
    <p>Number of tickets opened for the issue: 12</p>
    <p>Average time to respond to the tickets: 4 min</p>
    <div className="flex items-center">
      <p className="mr-2">Total number of customers affected:</p>
      <svg width="50" height="50" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="25" fill="#3B82F6" /> {/* Blue background */}
        <path
          d="M25 25 L25 0 A25 25 0 0 1 48.3 32.7 Z"
          fill="#10B981" // Green slice
        />
        <text x="25" y="28" textAnchor="middle" fill="white" fontSize="10">
          12/521
        </text>
      </svg>
    </div>
    <p>Rev across affected customers 📊: $3.2 Million</p>
    <div className="flex items-center">
      <p className="mr-2">Sentiment of affected customers:</p>
      <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
    </div>
  </div>
);

export default InsightCard;
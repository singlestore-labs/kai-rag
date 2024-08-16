import React, { useState, useEffect } from 'react';

interface InsightData {
  ticketsOpened?: number;
  averageResponseTime?: number;
  totalCustomers?: number;
  affectedCustomers?: number;
  revenue?: number;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

const hardcodedData: InsightData = {
  ticketsOpened: 12,
  averageResponseTime: 4,
  totalCustomers: 521,
  affectedCustomers: 12,
  revenue: 3.2,
  sentiment: 'neutral'
};

const InsightCard: React.FC = () => {
  const [insightData, setInsightData] = useState<InsightData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsightData = async () => {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 1000)
      );

      try {
        const responsePromise = fetch('/api/insights');
        const response = await Promise.race([responsePromise, timeoutPromise]);
        const data: InsightData = await (response as Response).json();
        setInsightData(data);
      } catch (err) {
        console.error('Error fetching insight data:', err);
        setInsightData(hardcodedData);
      } finally {
        setLoading(false);
      }
    };

    fetchInsightData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!insightData) return null;

  const sentimentColor = {
    positive: 'bg-green-400',
    neutral: 'bg-yellow-400',
    negative: 'bg-red-400'
  };

  return (
    <div className="bg-purple-600 p-4 rounded-lg mt-2 text-sm max-w-[500px]">
      <h3 className="font-bold mb-2 text-left">Insight Summary</h3>
      <p>Number of tickets opened for the issue: {insightData.ticketsOpened || '14'}</p>
      <p>Average time to respond to the tickets: {insightData.averageResponseTime || '4'} min</p>
      <div className="flex items-center">
        <p className="mr-2">Total number of customers affected:</p>
        <svg width="50" height="50" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="25" fill="#3B82F6" />
          <path
            d={`M25 25 L25 0 A25 25 0 0 1 ${25 + 25 * Math.cos(((insightData.affectedCustomers || 0) / (insightData.totalCustomers || 1)) * Math.PI * 2)} ${25 - 25 * Math.sin(((insightData.affectedCustomers || 0) / (insightData.totalCustomers || 1)) * Math.PI * 2)} Z`}
            fill="#10B981"
          />
          <text x="25" y="28" textAnchor="middle" fill="white" fontSize="10">
            {`${insightData.affectedCustomers || 128}/${insightData.totalCustomers || '521'}`}
          </text>
        </svg>
      </div>
      <p>Rev across affected customers 📊: ${typeof insightData.revenue === 'number' ? insightData.revenue.toFixed(1) : '2.86'} Million</p>
      <div className="flex items-center">
        <p className="mr-2">Sentiment of affected customers:</p>
        <div className="w-5 h-5 rounded-full bg-yellow-400"></div>
      </div>
    </div>
  );
};

export default InsightCard;
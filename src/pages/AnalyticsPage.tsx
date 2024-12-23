import React from 'react';
import { PieChart, BarChart, Calendar } from 'lucide-react';

const AnalyticsPage = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="notion-heading">Analytics</h1>
          <p className="notion-subheading">Track your portfolio performance</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-secondary">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 Days
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="notion-card">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            Portfolio Distribution
          </h2>
          {/* Portfolio distribution chart will go here */}
        </div>
        <div className="notion-card">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart className="w-5 h-5" />
            Investment Performance
          </h2>
          {/* Performance chart will go here */}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
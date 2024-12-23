import React from 'react';
import { TrendingUp, BarChart2 } from 'lucide-react';

const PortfolioPage = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="notion-heading">Portfolio Companies</h1>
          <p className="notion-subheading">Track and manage your investments</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary">
            <BarChart2 className="w-4 h-4 mr-2" />
            Analytics
          </button>
          <button className="btn btn-primary">
            <TrendingUp className="w-4 h-4 mr-2" />
            Add Investment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio company cards will go here */}
      </div>
    </div>
  );
};

export default PortfolioPage;
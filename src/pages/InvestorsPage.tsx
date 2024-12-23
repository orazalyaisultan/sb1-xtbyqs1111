import React from 'react';
import { UserPlus, Filter } from 'lucide-react';

const InvestorsPage = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="notion-heading">Investors</h1>
          <p className="notion-subheading">Manage your investor relationships</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="btn btn-primary">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Investor
          </button>
        </div>
      </div>

      <div className="notion-card">
        {/* Investor list will go here */}
      </div>
    </div>
  );
};

export default InvestorsPage;
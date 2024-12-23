import React from 'react';
import { Deal } from '../types/deal';
import { TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { dealsApi } from '../services/api';

interface DealCardProps {
  deal: Deal;
}

const DealCard: React.FC<DealCardProps> = ({ deal }) => {
  const getStageColor = (stage: Deal['stage']) => {
    const colors = {
      sourcing: 'bg-purple-50 text-purple-700',
      diligence: 'bg-blue-50 text-blue-700',
      closing: 'bg-orange-50 text-orange-700',
      'post-investment': 'bg-green-50 text-green-700',
    };
    return colors[stage];
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatValuation = (val: number) => {
    if (val >= 1000000000) {
      return `$${(val / 1000000000).toFixed(1)}B`;
    }
    if (val >= 1000000) {
      return `$${(val / 1000000).toFixed(1)}M`;
    }
    return `$${(val / 1000).toFixed(0)}K`;
  };

  const handleViewDetails = async () => {
    try {
      const dealDetails = await dealsApi.getDeal(deal.id);
      console.log('Deal details:', dealDetails);
    } catch (error) {
      console.error('Failed to fetch deal details:', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  return (
    <div className="notion-card group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
            {deal.companyName}
          </h3>
          <p className="text-sm text-gray-500">{deal.industry}</p>
        </div>
        <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStageColor(deal.stage)}`}>
          {deal.stage.replace('-', ' ')}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Valuation</p>
          <p className="text-sm font-medium flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-gray-400" />
            {formatValuation(deal.valuation)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">AI Score</p>
          <p className={`text-sm font-medium flex items-center gap-1 ${getScoreColor(deal.score)}`}>
            {deal.score >= 70 ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            {deal.score}%
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-500">
          Updated {new Date(deal.lastUpdated).toLocaleDateString()}
        </span>
        <button 
          onClick={handleViewDetails}
          className="text-blue-600 hover:text-blue-800 font-medium opacity-0 group-hover:opacity-100 transition-opacity"
        >
          View Details →
        </button>
      </div>
    </div>
  );
};

export default DealCard;
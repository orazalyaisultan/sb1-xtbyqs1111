import React, { useState } from 'react';
import DealCard from './DealCard';
import { useDeals } from '../hooks/useDeals';
import { Loader2, Plus, ServerCrash } from 'lucide-react';
import { dealsApi } from '../services/api';
import { Deal } from '../types/deal';

const DealList: React.FC = () => {
  const { deals, loading, error, refreshDeals } = useDeals();
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const handleCreateDeal = async () => {
    setIsCreating(true);
    setCreateError(null);

    try {
      const newDeal: Omit<Deal, 'id' | 'lastUpdated'> = {
        companyName: 'New Company',
        stage: 'sourcing',
        valuation: 1000000,
        industry: 'Technology',
        status: 'active',
        score: 50,
      };

      console.log('Creating deal with:', newDeal);

      await dealsApi.createDeal(newDeal);
      refreshDeals(); // Refresh the list of deals after successful creation.
    } catch (err) {
      // Improved error handling
      const errorMessage = (err as any)?.response?.data?.message || 
                           (err as Error)?.message || 
                           'Failed to create deal';

      setCreateError(errorMessage);
      console.error('Error creating deal:', errorMessage);
    } finally {
      setIsCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    );
  }

  const isNetworkError = error?.message?.toLowerCase().includes('network error');

  if (isNetworkError) {
    return (
      <div className="p-8 flex flex-col items-center justify-center text-center">
        <ServerCrash className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Cannot Connect to Server</h2>
        <p className="text-gray-600 mb-4">The backend server appears to be offline. Please ensure it's running.</p>
        <button 
          onClick={refreshDeals} 
          className="btn btn-primary flex items-center gap-2"
        >
          <Loader2 className="w-4 h-4" />
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="notion-heading">Deal Flow</h1>
          <p className="notion-subheading mt-2">Track and manage your investment opportunities</p>
        </div>
        <button 
          onClick={handleCreateDeal}
          disabled={isCreating}
          className="btn btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCreating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          New Deal
        </button>
      </div>

      {/* Error Messages */}
      {(error?.message || createError) && (
        <div className="mb-4">
          <div className="bg-red-50 text-red-800 p-4 rounded-lg">
            {error?.message || createError}
          </div>
        </div>
      )}
      
      {/* Deal Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </div>
  );
};

export default DealList;

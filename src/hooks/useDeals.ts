import { useState, useEffect, useCallback } from 'react';
import { Deal } from '../types/deal';
import { dealsApi } from '../services/api';
import { useErrorHandler } from './useErrorHandler';

export function useDeals() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const { error, setError, clearError } = useErrorHandler();

  const fetchDeals = useCallback(async () => {
    try {
      setLoading(true);
      clearError();
      const data = await dealsApi.getDeals();
      setDeals(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [clearError, setError]);

  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  const createDeal = useCallback(async (dealData: Omit<Deal, 'id' | 'lastUpdated'>) => {
    try {
      clearError();
      const newDeal = await dealsApi.createDeal(dealData);
      setDeals(prevDeals => [...prevDeals, newDeal]);
      return newDeal;
    } catch (err) {
      setError(err);
      throw err;
    }
  }, [clearError, setError]);

  const updateDeal = useCallback(async (id: number, dealData: Partial<Deal>) => {
    try {
      clearError();
      const updatedDeal = await dealsApi.updateDeal(id, dealData);
      setDeals(prevDeals => 
        prevDeals.map(deal => deal.id === id ? updatedDeal : deal)
      );
      return updatedDeal;
    } catch (err) {
      setError(err);
      throw err;
    }
  }, [clearError, setError]);

  return {
    deals,
    loading,
    error,
    refreshDeals: fetchDeals,
    createDeal,
    updateDeal
  };
}
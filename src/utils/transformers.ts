import { Deal } from '../types/deal';

// Transform frontend data to backend format
export const transformDealToApi = (deal: Omit<Deal, 'id' | 'lastUpdated'>) => ({
  company_name: deal.companyName,
  stage: deal.stage,
  valuation: deal.valuation,
  industry: deal.industry,
  status: deal.status,
  score: deal.score
});

// Transform backend data to frontend format
export const transformDealFromApi = (data: any): Deal => ({
  id: data.id,
  companyName: data.company_name,
  stage: data.stage,
  valuation: data.valuation,
  industry: data.industry,
  status: data.status,
  score: data.score,
  lastUpdated: data.updated_at || new Date().toISOString()
});
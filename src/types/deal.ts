export interface Deal {
  id: number;  // Changed from string to number to match backend
  companyName: string;
  stage: 'sourcing' | 'diligence' | 'closing' | 'post-investment';
  valuation: number;
  industry: string;
  lastUpdated: string;
  status: 'active' | 'closed' | 'rejected';
  score: number;
}
import axios, { AxiosError } from 'axios';
import { Deal } from '../types/deal';
import { auth } from './auth';
import { transformDealToApi, transformDealFromApi } from '../utils/transformers';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = auth.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      auth.logout();
      window.location.href = '/login';
    }
    return Promise.reject(handleApiError(error));
  }
);

function handleApiError(error: AxiosError): Error {
  if (error.response) {
    console.error('API Error Response:', error.response.data);
    const message = error.response.data?.detail || error.response.data?.message || error.message;
    return new Error(message);
  }
  if (error.request) {
    return new Error('Network error. Please check your connection and try again.');
  }
  return new Error('An unexpected error occurred');
}

export const dealsApi = {
  async getDeals(): Promise<Deal[]> {
    const response = await api.get('/deals');
    return response.data.map(transformDealFromApi);
  },

  async getDeal(id: number): Promise<Deal> {
    const response = await api.get(`/deals/${id}`);
    return transformDealFromApi(response.data);
  },

  async createDeal(dealData: Omit<Deal, 'id' | 'lastUpdated'>): Promise<Deal> {
    const payload = transformDealToApi(dealData);
    const response = await api.post('/deals', payload);
    return transformDealFromApi(response.data);
  },

  async updateDeal(id: number, dealData: Partial<Deal>): Promise<Deal> {
    const payload = transformDealToApi(dealData as Omit<Deal, 'id' | 'lastUpdated'>);
    const response = await api.put(`/deals/${id}`, payload);
    return transformDealFromApi(response.data);
  },

  async deleteDeal(id: number): Promise<void> {
    await api.delete(`/deals/${id}`);
  },
};
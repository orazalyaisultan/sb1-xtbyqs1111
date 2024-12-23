import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, ArrowLeft } from 'lucide-react';
import InputField from '../components/forms/InputField';
import SelectField from '../components/forms/SelectField';
import { dealsApi } from '../services/api';
import { Deal } from '../types/deal';

const NewDealPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    valuation: '',
    stage: '',
    status: 'active',
    score: '50'
  });

  const industries = [
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance' },
    { value: 'consumer', label: 'Consumer' },
    { value: 'enterprise', label: 'Enterprise' },
  ];

  const stages = [
    { value: 'sourcing', label: 'Sourcing' },
    { value: 'diligence', label: 'Diligence' },
    { value: 'closing', label: 'Closing' },
    { value: 'post-investment', label: 'Post Investment' },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const dealData: Omit<Deal, 'id' | 'lastUpdated'> = {
        companyName: formData.companyName,
        industry: formData.industry,
        valuation: parseFloat(formData.valuation),
        stage: formData.stage as Deal['stage'],
        status: 'active',
        score: parseInt(formData.score)
      };

      await dealsApi.createDeal(dealData);
      navigate('/deals');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create deal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <button
        onClick={() => navigate('/deals')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Deals
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gray-100 p-2 rounded-lg">
          <Building2 className="w-6 h-6 text-gray-700" />
        </div>
        <div>
          <h1 className="notion-heading">New Deal</h1>
          <p className="notion-subheading">Add a new investment opportunity</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="notion-card">
        <InputField
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
        />

        <SelectField
          label="Industry"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          options={industries}
          required
        />

        <InputField
          label="Valuation"
          name="valuation"
          type="number"
          value={formData.valuation}
          onChange={handleChange}
          required
        />

        <SelectField
          label="Stage"
          name="stage"
          value={formData.stage}
          onChange={handleChange}
          options={stages}
          required
        />

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/deals')}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Creating...' : 'Create Deal'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewDealPage;
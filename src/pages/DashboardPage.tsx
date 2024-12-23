import React from 'react';
import { TrendingUp, Users, FileText, DollarSign } from 'lucide-react';

const DashboardPage = () => {
  const stats = [
    { title: 'Active Deals', value: '24', change: '+12%', icon: TrendingUp },
    { title: 'Total Investors', value: '156', change: '+5%', icon: Users },
    { title: 'Documents', value: '438', change: '+22%', icon: FileText },
    { title: 'Portfolio Value', value: '$142M', change: '+18%', icon: DollarSign },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="notion-heading mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.title} className="notion-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <div className="bg-gray-50 p-2 rounded-lg">
                <stat.icon className="w-5 h-5 text-gray-700" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-600">{stat.change}</span>
              <span className="text-sm text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="notion-card">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          {/* Activity content */}
        </div>
        <div className="notion-card">
          <h2 className="text-lg font-semibold mb-4">Pipeline Overview</h2>
          {/* Pipeline content */}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
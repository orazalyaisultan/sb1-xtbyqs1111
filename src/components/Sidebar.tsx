import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PieChart, 
  Briefcase, 
  Users, 
  FileText, 
  Settings,
  Box
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Box, label: 'Deal Flow', path: '/deals' },
    { icon: PieChart, label: 'Portfolio', path: '/portfolio' },
    { icon: Users, label: 'Investors', path: '/investors' },
    { icon: FileText, label: 'Documents', path: '/documents' },
    { icon: Briefcase, label: 'Analytics', path: '/analytics' },
  ];

  return (
    <div className="h-screen w-64 bg-gray-50 border-r border-gray-200 fixed left-0 top-0 flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
          <Box className="w-6 h-6" />
          <span>VCRM</span>
        </h1>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-0.5 px-3">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-sm ${
                    isActive
                      ? 'bg-gray-200/70 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4">
        <NavLink
          to="/settings"
          className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <Settings className="w-4 h-4" />
          Settings
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
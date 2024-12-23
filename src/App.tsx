import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import DealList from './components/DealList';
import NewDealPage from './pages/NewDealPage';
import PortfolioPage from './pages/PortfolioPage';
import InvestorsPage from './pages/InvestorsPage';
import DocumentsPage from './pages/DocumentsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import PrivateRoute from './components/PrivateRoute';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <div className="min-h-screen bg-white">
                <Sidebar />
                <main className="ml-64 min-h-screen">
                  <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/deals" element={<DealList />} />
                    <Route path="/deals/new" element={<NewDealPage />} />
                    <Route path="/portfolio" element={<PortfolioPage />} />
                    <Route path="/investors" element={<InvestorsPage />} />
                    <Route path="/documents" element={<DocumentsPage />} />
                    <Route path="/analytics" element={<AnalyticsPage />} />
                  </Routes>
                </main>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
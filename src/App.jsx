import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastNotification from './components/ToastNotification';

// Application Pages
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import LostItemsPage from './pages/LostItemsPage';
import FoundItemsPage from './pages/FoundItemsPage';
import ReportItemPage from './pages/ReportItemPage';
import SmartMatchesPage from './pages/SmartMatchesPage';
import MyReportsPage from './pages/MyReportsPage';
import ItemDetailsPage from './pages/ItemDetailsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
          <Navbar />
          
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/lost-items" element={<LostItemsPage />} />
              <Route path="/found-items" element={<FoundItemsPage />} />
              <Route path="/report" element={<ReportItemPage />} />
              <Route path="/smart-matches" element={<SmartMatchesPage />} />
              <Route path="/my-reports" element={<MyReportsPage />} />
              <Route path="/item/:type/:id" element={<ItemDetailsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
          <ToastNotification />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;


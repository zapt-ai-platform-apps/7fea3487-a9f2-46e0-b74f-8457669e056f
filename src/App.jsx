import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './app/pages/Dashboard';
import MapView from './app/pages/MapView';
import ThreatAnalysis from './app/pages/ThreatAnalysis';
import Settings from './app/pages/Settings';
import Header from './shared/components/Header';
import Sidebar from './shared/components/Sidebar';
import { ZaptBadge } from './shared/components/ZaptBadge';
import { initializeModules } from './modules';
import * as Sentry from '@sentry/browser';

export default function App() {
  useEffect(() => {
    // Initialize modules when app loads
    initializeModules().catch(error => {
      console.error('Failed to initialize modules:', error);
      Sentry.captureException(error);
    });
  }, []);

  return (
    <Router>
      <div className="flex h-screen bg-gray-100 text-gray-800">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/map" element={<MapView />} />
              <Route path="/threats" element={<ThreatAnalysis />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
          <ZaptBadge />
        </div>
      </div>
    </Router>
  );
}
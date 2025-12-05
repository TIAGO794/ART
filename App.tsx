
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { ARTEmergencial } from './pages/ARTEmergencial';
import { ARTAtividade } from './pages/ARTAtividade';
import { Checklist } from './pages/Checklist';
import { Schedule } from './pages/Schedule';
import { Archive } from './pages/Archive';
import { Trash } from './pages/Trash';
import { Report } from './pages/Report';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { SplashScreen } from './components/SplashScreen';
import { CloudSync } from './components/CloudSync';
import { User } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showSplash, setShowSplash] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = (user: User) => {
      setCurrentUser(user);
      setIsAuthenticated(true);
      setShowSplash(true);
  };

  const handleSplashFinish = () => {
      setShowSplash(false);
  };

  if (!isAuthenticated) {
      return <Login onLogin={handleLogin} />;
  }

  if (showSplash) {
      return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <HashRouter>
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        <Sidebar 
          isOpen={sidebarOpen} 
          toggle={() => setSidebarOpen(!sidebarOpen)} 
          currentUser={currentUser}
        />
        
        <main className="flex-1 overflow-auto p-4 md:p-8 pt-16 md:pt-8 w-full relative">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/art-emergencial" element={<ARTEmergencial />} />
            <Route path="/art-atividade" element={<ARTAtividade />} />
            <Route path="/checklist" element={<Checklist />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/trash" element={<Trash />} />
            <Route path="/report" element={<Report />} />
            
            {/* Protect Settings Route - Only Admin Access */}
            <Route 
              path="/settings" 
              element={currentUser?.login === 'admin' ? <Settings /> : <Navigate to="/dashboard" replace />} 
            />
          </Routes>
          
          <CloudSync />
        </main>
      </div>
    </HashRouter>
  );
};

export default App;

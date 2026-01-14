
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { FindJobs } from './pages/FindJobs';
import { JobDetail } from './pages/JobDetail';
import { Admin } from './pages/Admin';
import { Auth } from './pages/Auth';
import { CandidateProfile } from './pages/CandidateProfile';
import { CVBuilder } from './pages/CVBuilder';
import { AIChatWidget } from './components/AIChatWidget';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen font-sans text-gray-900">
        <Header />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/jobs" element={<FindJobs />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/profile" element={<CandidateProfile />} />
            <Route path="/cv-builder" element={<CVBuilder />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
        
        {/* Floating AI Widget available on all pages */}
        <AIChatWidget />
      </div>
    </HashRouter>
  );
};

export default App;

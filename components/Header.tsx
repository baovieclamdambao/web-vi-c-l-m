
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Settings, LogOut, User as UserIcon, Briefcase, ShieldCheck } from 'lucide-react';
import { Button } from './Button';
import { DataService } from '../services/dataService';
import { HeaderConfig, User } from '../types';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [config, setConfig] = useState<HeaderConfig | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
     setConfig(DataService.getHeaderConfig());
     setCurrentUser(DataService.getCurrentUser());

     const handleStorageChange = () => {
         setCurrentUser(DataService.getCurrentUser());
     };
     window.addEventListener('storage', handleStorageChange);
     return () => window.removeEventListener('storage', handleStorageChange);
  }, [location]);

  if (!config) return null;

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
      DataService.logout();
      navigate('/auth');
      setIsUserMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/30">
                <Briefcase className="text-white" size={24} />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter">
                  Vuavieclam<span className="text-brand-600">.com</span>
                </span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link to="/jobs" className={`text-sm font-bold hover:text-brand-600 ${isActive('/jobs') ? 'text-brand-600' : 'text-slate-600'}`}>Việc làm</Link>
            <Link to="/cv-builder" className={`text-sm font-bold hover:text-brand-600 ${isActive('/cv-builder') ? 'text-brand-600' : 'text-slate-600'}`}>Hồ sơ & CV</Link>
            {/* Nút Admin luôn hiện để truy cập nhanh */}
            <Link to="/admin" className="flex items-center gap-2 text-brand-600 hover:text-brand-700 transition-all text-sm font-black border-2 border-brand-100 px-3 py-1 rounded-full bg-brand-50/50">
                <ShieldCheck size={18} /> ADMIN
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
             {currentUser ? (
                 <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center gap-2">
                    <span className="text-sm font-bold">{currentUser.fullName}</span>
                    <img src={currentUser.avatar} className="w-8 h-8 rounded-full border" />
                 </button>
             ) : (
                 <Link to="/auth"><Button variant="primary">Đăng nhập</Button></Link>
             )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

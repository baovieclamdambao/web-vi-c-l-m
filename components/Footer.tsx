
import React, { useEffect, useState } from 'react';
import { Facebook, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { DataService } from '../services/dataService';
import { FooterConfig } from '../types';
import { Link, useLocation } from 'react-router-dom';

export const Footer: React.FC = () => {
  const [config, setConfig] = useState<FooterConfig | null>(null);
  const location = useLocation();

  useEffect(() => {
     // Fetch config on mount and whenever location changes (to simulate refresh after admin save)
     setConfig(DataService.getFooterConfig());
     const handleStorageChange = () => {
         setConfig(DataService.getFooterConfig());
     };
     window.addEventListener('storage', handleStorageChange);
     return () => window.removeEventListener('storage', handleStorageChange);
  }, [location]);

  if (!config) return null;

  const bgStyle = { backgroundColor: config.backgroundColor || '#111827' };
  const textStyle = { color: config.textColor || '#d1d5db' };
  const titleStyle = { color: config.textColor ? '#ffffff' : '#ffffff' }; // Always white for titles for now, or could make dynamic

  return (
    <footer style={bgStyle} className="transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand & Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold" style={titleStyle}>{config.companyName}</h3>
            <p className="text-sm leading-relaxed" style={textStyle}>
              {config.description}
            </p>
            <div className="flex space-x-4">
              {config.socialLinks.facebook && <a href={config.socialLinks.facebook} className="hover:text-brand-500 transition-colors" style={textStyle}><Facebook size={20} /></a>}
              {config.socialLinks.linkedin && <a href={config.socialLinks.linkedin} className="hover:text-brand-500 transition-colors" style={textStyle}><Linkedin size={20} /></a>}
              {config.socialLinks.youtube && <a href={config.socialLinks.youtube} className="hover:text-brand-500 transition-colors" style={textStyle}><Youtube size={20} /></a>}
            </div>
          </div>

          {/* Dynamic Columns */}
          {config.columns.map((col) => (
             <div key={col.id}>
                <h4 className="font-semibold mb-4" style={titleStyle}>{col.title}</h4>
                <ul className="space-y-2 text-sm">
                   {col.links.map((link, lIdx) => (
                       <li key={lIdx}>
                           <Link to={link.url} className="hover:text-white transition-colors" style={textStyle}>
                               {link.label}
                           </Link>
                       </li>
                   ))}
                </ul>
             </div>
          ))}

          {/* Contact Column (Fixed Layout but dynamic content) */}
          <div>
            <h4 className="font-semibold mb-4" style={titleStyle}>Liên hệ</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2" style={textStyle}>
                <MapPin size={18} className="text-brand-500 mt-0.5 flex-shrink-0" />
                <span>{config.address}</span>
              </li>
              <li className="flex items-center gap-2" style={textStyle}>
                <Phone size={18} className="text-brand-500 flex-shrink-0" />
                <span>{config.phone}</span>
              </li>
              <li className="flex items-center gap-2" style={textStyle}>
                <Mail size={18} className="text-brand-500 flex-shrink-0" />
                <span>{config.email}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm" style={{ ...textStyle, opacity: 0.7 }}>
          <p>{config.copyrightText || `&copy; ${new Date().getFullYear()} ${config.companyName}. All rights reserved.`}</p>
        </div>
      </div>
    </footer>
  );
};

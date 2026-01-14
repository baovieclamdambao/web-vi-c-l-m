
import React, { useState, useEffect } from 'react';
import { Job, JobBadge } from '../types';
import { MapPin, DollarSign, Clock, Heart } from 'lucide-react';
import { DataService } from '../services/dataService';

interface JobCardProps {
  job: Job;
  onClick?: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  const [badges, setBadges] = useState<JobBadge[]>([]);

  useEffect(() => {
      setBadges(DataService.getBadges());
  }, []);

  const badge = badges.find(b => b.id === job.badgeId);
  // Calculate max priority to determine if this card should be highlighted
  const maxPriority = badges.length > 0 ? Math.max(...badges.map(b => b.priority)) : 0;
  const isTopTier = badge && badge.priority === maxPriority;

  // Dynamic Style Logic
  const getCardStyles = () => {
      if (!isTopTier || !badge) {
          return 'border border-slate-100 bg-white hover:border-brand-200 hover:shadow-lg';
      }

      // "VIP-like" styles map
      const styles: Record<string, string> = {
          yellow: 'border-2 border-yellow-300 bg-gradient-to-b from-yellow-50/50 to-white hover:shadow-yellow-500/20 shadow-yellow-500/5 ring-1 ring-yellow-200',
          red:    'border-2 border-red-300 bg-gradient-to-b from-red-50/50 to-white hover:shadow-red-500/20 shadow-red-500/5 ring-1 ring-red-200',
          blue:   'border-2 border-blue-300 bg-gradient-to-b from-blue-50/50 to-white hover:shadow-blue-500/20 shadow-blue-500/5 ring-1 ring-blue-200',
          green:  'border-2 border-green-300 bg-gradient-to-b from-green-50/50 to-white hover:shadow-green-500/20 shadow-green-500/5 ring-1 ring-green-200',
          purple: 'border-2 border-purple-300 bg-gradient-to-b from-purple-50/50 to-white hover:shadow-purple-500/20 shadow-purple-500/5 ring-1 ring-purple-200',
          gray:   'border-2 border-gray-300 bg-gradient-to-b from-gray-50/50 to-white hover:shadow-gray-500/20 shadow-gray-500/5 ring-1 ring-gray-200',
      };

      return `${styles[badge.color] || styles.blue} hover:-translate-y-1`;
  };

  const getButtonStyles = () => {
      if (!isTopTier || !badge) {
          return 'bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/20';
      }

      const styles: Record<string, string> = {
          yellow: 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white hover:shadow-yellow-500/30 border-none',
          red:    'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:shadow-red-500/30 border-none',
          blue:   'bg-gradient-to-r from-blue-500 to-cyan-600 text-white hover:shadow-blue-500/30 border-none',
          green:  'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-green-500/30 border-none',
          purple: 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-purple-500/30 border-none',
          gray:   'bg-gradient-to-r from-gray-600 to-slate-700 text-white hover:shadow-gray-500/30 border-none',
      };

      return styles[badge.color] || styles.blue;
  };

  return (
    <div 
      onClick={onClick}
      className={`
        rounded-2xl p-5 cursor-pointer group relative overflow-hidden transition-all duration-300
        ${getCardStyles()}
      `}
    >
      <div className="absolute top-4 right-4 z-10">
         <button className="text-gray-300 hover:text-brand-500 transition-colors">
            <Heart size={20} />
         </button>
      </div>

      {badge && (
        <div className="absolute top-0 left-0">
             <div className={`bg-${badge.color === 'yellow' ? 'yellow-500' : (badge.color === 'gray' ? 'slate-500' : badge.color + '-600')} text-white text-[10px] font-bold px-3 py-1 rounded-br-lg shadow-sm uppercase`}>
                {badge.label}
             </div>
        </div>
      )}

      <div className="flex gap-4 mt-2">
        <div className="flex-shrink-0">
          <div className="p-1 bg-white rounded-xl border border-gray-100 shadow-sm">
            <img 
                src={job.logo} 
                alt={`${job.company} logo`} 
                className="w-14 h-14 rounded-lg object-cover"
            />
          </div>
        </div>
        <div className="flex-1 min-w-0 pt-1">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-600 truncate mb-1 transition-colors">
            {job.title}
          </h3>
          <p className="text-sm text-gray-500 mb-3 truncate font-medium">{job.company}</p>
          
          <div className="flex flex-col gap-2 mb-3">
             <span className={`flex items-center text-sm font-semibold ${isTopTier && badge ? `text-${badge.color === 'yellow' ? 'yellow-700' : (badge.color === 'gray' ? 'slate-600' : badge.color + '-600')}` : 'text-brand-600'}`}>
              <DollarSign size={16} className="mr-1" />
              {job.salary}
            </span>
             <span className="flex items-center text-xs text-gray-500">
              <MapPin size={14} className="mr-1" />
              {job.location}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-2">
            {job.tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="text-[10px] px-2 py-1 bg-gray-50 text-gray-600 rounded-md font-medium border border-gray-100">
                {tag}
              </span>
            ))}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-200/50 flex justify-between items-center">
        <span className="text-xs text-gray-400 flex items-center">
            <Clock size={12} className="mr-1" /> {job.postedAt}
        </span>
        <button className={`text-xs font-bold px-4 py-1.5 rounded-full transition-all ${getButtonStyles()}`}>
            Ứng tuyển
        </button>
      </div>
    </div>
  );
};

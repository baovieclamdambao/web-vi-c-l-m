
import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, TrendingUp, Briefcase, Zap, Star, Crown, Building2, Edit, Flame, Clock, CheckCircle, Rocket, Target, Gift, Award, Globe, Shield, Sparkles, Users, ChevronLeft, ChevronRight, DollarSign, Award as Trophy } from 'lucide-react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Button } from '../components/Button';
import { LOCATIONS } from '../constants';
import { DataService } from '../services/dataService';
import { HomeSectionConfig, Job, Category, JobBadge } from '../types';

// Helper to safely render HTML content
const SafeHTML = ({ html, className, style }: { html?: string, className?: string, style?: React.CSSProperties }) => {
    if(!html) return null;
    return <span className={className} style={style} dangerouslySetInnerHTML={{ __html: html }} />;
};

// --- ICON MAP FOR DYNAMIC RENDERING ---
const ICON_MAP: Record<string, React.ElementType> = {
    fire: Flame,
    star: Star,
    zap: Zap,
    crown: Crown,
    briefcase: Briefcase,
    trending: TrendingUp,
    building: Building2,
    users: Users,
    rocket: Rocket,
    target: Target,
    gift: Gift,
    award: Award,
    globe: Globe,
    shield: Shield,
    sparkles: Sparkles,
};

const renderSectionIcon = (iconKey?: string) => {
    if (!iconKey) {
        return (
            <div className="p-2 bg-brand-500 rounded-lg shadow-lg shadow-brand-500/30">
               <Star className="text-white fill-white" size={24} />
            </div>
        );
    }

    const IconComponent = ICON_MAP[iconKey];

    if (IconComponent) {
        return (
            <div className="p-2.5 bg-gradient-to-br from-brand-500 to-red-600 rounded-xl shadow-lg shadow-brand-500/30 text-white transform hover:scale-110 transition-transform">
                <IconComponent size={28} strokeWidth={2.5} />
            </div>
        );
    }

    return <div className="text-4xl filter drop-shadow-sm">{iconKey}</div>;
};

const HeroSection: React.FC<{ config: HomeSectionConfig }> = ({ config }) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  
  const { 
      heroTitle, heroSubtitle, 
      heroBackgroundType, heroBackgroundValue,
      heroTitleColor, heroSubtitleColor, heroTextEffect,
      heroBrandBoxEnabled, heroBrandBoxTitle, heroBrandBoxLimit
  } = config.content || {};

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/jobs?keyword=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}`);
  };

  let sectionStyle: React.CSSProperties = {};
  let overlayClass = "bg-white"; 

  if (heroBackgroundType === 'image' && heroBackgroundValue) {
      sectionStyle = { 
          backgroundImage: `url(${heroBackgroundValue})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
      };
      overlayClass = "bg-black/40"; 
  } else if (heroBackgroundType === 'color' && heroBackgroundValue) {
      sectionStyle = { backgroundColor: heroBackgroundValue };
      overlayClass = "";
  } else if (heroBackgroundType === 'gradient' && heroBackgroundValue) {
      sectionStyle = { background: heroBackgroundValue };
      overlayClass = "";
  } else {
      overlayClass = "bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-red-50 via-white to-white";
  }

  const isDarkBg = heroBackgroundType === 'image' || (heroBackgroundType === 'color' && heroBackgroundValue !== '#ffffff');
  const defaultTitleClass = isDarkBg ? 'text-white' : 'text-slate-900';
  const defaultSubTitleClass = isDarkBg ? 'text-gray-200' : 'text-slate-500';

  const titleStyle: React.CSSProperties = heroTitleColor ? { color: heroTitleColor } : {};
  const subTitleStyle: React.CSSProperties = heroSubtitleColor ? { color: heroSubtitleColor } : {};

  let effectClass = "";
  if (heroTextEffect === 'shadow') effectClass = "drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]";
  if (heroTextEffect === 'neon') effectClass = "drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]";
  if (heroTextEffect === 'outline') {
      (titleStyle as any).WebkitTextStroke = '1px white';
      if(!heroTitleColor) (titleStyle as any).color = 'transparent';
  }

  // Lấy danh sách công ty cho Brand Box
  const companies = heroBrandBoxEnabled 
    ? DataService.getCompanies().slice(0, heroBrandBoxLimit || 6) 
    : [];

  return (
    <section className="relative overflow-hidden pb-16 pt-20" style={sectionStyle}>
        <div className={`absolute inset-0 z-0 ${overlayClass}`}></div>
        
        {heroBackgroundType === 'default' && (
            <>
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-red-50 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-amber-50 via-transparent to-transparent"></div>
                <div className="absolute top-10 right-10 w-96 h-96 border border-red-100 rounded-full animate-float opacity-60"></div>
            </>
        )}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            
            <h1 
                className={`text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-sm ${!heroTitleColor ? defaultTitleClass : ''} ${effectClass}`}
                style={titleStyle}
            >
              <SafeHTML html={heroTitle || "Tìm kiếm công việc"} />
            </h1>
            <p 
                className={`text-lg max-w-2xl mx-auto mb-12 font-medium ${!heroSubtitleColor ? defaultSubTitleClass : ''} ${effectClass}`}
                style={subTitleStyle}
            >
              {heroSubtitle || "Kết nối với nhà tuyển dụng hàng đầu."}
            </p>

            <div className="max-w-4xl mx-auto mb-10">
               <div className="bg-white rounded-3xl p-3 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] relative border border-white/50 ring-4 ring-white/30 backdrop-blur-md">
                  <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
                    <div className="flex-1 relative group">
                      <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                        <Search className="h-6 w-6 text-brand-400 group-focus-within:text-brand-600 transition-colors" />
                      </div>
                      <input
                        type="text"
                        className="block w-full pl-14 pr-4 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:bg-white transition-all font-medium shadow-inner"
                        placeholder="Vị trí, công ty, kỹ năng..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                      />
                    </div>
                    
                    <div className="md:w-1/3 relative group">
                       <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                        <MapPin className="h-6 w-6 text-brand-400 group-focus-within:text-brand-600 transition-colors" />
                      </div>
                      <select 
                        className="block w-full pl-14 pr-10 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:bg-white transition-all appearance-none cursor-pointer font-medium shadow-inner"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      >
                         <option value="" className="text-gray-500">Tất cả địa điểm</option>
                         {LOCATIONS.map(loc => (
                           <option key={loc} value={loc} className="text-slate-800">{loc}</option>
                         ))}
                      </select>
                      <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-slate-300">
                         <Briefcase size={16} />
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="rounded-2xl px-10 shadow-xl shadow-brand-500/40 text-lg uppercase tracking-wide">
                      Tìm việc
                    </Button>
                  </form>
               </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 mb-20">
               <span className={`${defaultSubTitleClass} text-sm py-1 font-bold`}>Từ khóa hot:</span>
               {['Kế toán', 'Sale Admin', 'Marketing', 'IT Phần mềm', 'Giám đốc'].map((tag, idx) => (
                 <span key={idx} className={`px-4 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all border bg-white/90 border-white/50 hover:bg-white text-slate-600 hover:text-brand-600`}>
                   {tag}
                 </span>
               ))}
            </div>

            {/* BOX HIỂN THỊ LOGO THƯƠNG HIỆU NỔI BẬT (UPGRADED VERSION) */}
            {heroBrandBoxEnabled && (
                <div className="animate-fade-in-up relative">
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent to-slate-300"></div>
                        <p className={`text-[11px] md:text-xs font-black uppercase tracking-[0.2em] opacity-90 flex items-center gap-2 ${defaultSubTitleClass}`}>
                           <Trophy size={14} className="text-amber-500" />
                           {heroBrandBoxTitle || 'Các nhà tuyển dụng chiến lược'}
                        </p>
                        <div className="h-px w-8 md:w-16 bg-gradient-to-l from-transparent to-slate-300"></div>
                    </div>
                    
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 max-w-5xl mx-auto">
                        {companies.map((comp) => (
                            <div 
                                key={comp.id} 
                                onClick={() => navigate(`/companies`)}
                                className="group relative bg-white/60 hover:bg-white rounded-[2rem] p-4 flex items-center justify-center transition-all duration-500 cursor-pointer border border-white/40 shadow-[0_4px_20px_-1px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] hover:-translate-y-2 backdrop-blur-sm overflow-hidden" 
                                title={comp.name}
                            >
                                {/* Subtle Hover Background Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                
                                <div className="w-12 h-12 md:w-16 md:h-16 relative z-10">
                                    <img 
                                        src={comp.logo} 
                                        alt={comp.name} 
                                        className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110" 
                                    />
                                </div>
                                
                                {/* Hover Name Label */}
                                <div className="absolute bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-md py-1 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <span className="text-[9px] font-bold text-white uppercase tracking-tighter truncate px-2 block">
                                        {comp.name}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Decorative bottom line */}
                    <div className="mt-12 flex justify-center opacity-30">
                        <div className="h-1 w-20 rounded-full bg-slate-200"></div>
                    </div>
                </div>
            )}
          </div>
        </div>
    </section>
  );
};

const JobListSection: React.FC<{ config: HomeSectionConfig }> = ({ config }) => {
  const navigate = useNavigate();
  const allJobs = DataService.getJobs();
  const badges = DataService.getBadges();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  
  const maxPriority = badges.length > 0 ? Math.max(...badges.map(b => b.priority)) : 0;

  let displayJobs = allJobs.filter(j => j.status === 'active');
  displayJobs = displayJobs.filter(j => {
      if (j.targetSectionId) return j.targetSectionId === config.id;
      if (config.content?.filter === 'hot') return j.hot || !!j.badgeId;
      if (config.content?.filter === 'new') return true; 
      return true;
  });

  if (config.content?.filter === 'new') {
    displayJobs.sort((a, b) => (new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()));
  } else {
      displayJobs.sort((a, b) => {
          const badgeA = badges.find(bg => bg.id === a.badgeId);
          const badgeB = badges.find(bg => bg.id === b.badgeId);
          const prioA = badgeA ? badgeA.priority : 0;
          const prioB = badgeB ? badgeB.priority : 0;
          return prioB - prioA;
      });
  }

  const sliderLimit = config.content?.limit ? Math.max(config.content.limit, 12) : 12;
  displayJobs = displayJobs.slice(0, sliderLimit);
  const rows = config.content?.rows || 1;
  const visibleItems = config.content?.visibleItems || 3;
  const bgColor = config.content?.background === 'gray' ? 'bg-slate-50' : 'bg-white';

  const isHighDensity = visibleItems >= 4;

  useEffect(() => {
      const interval = setInterval(() => {
          if (!isPaused && scrollContainerRef.current) {
              const container = scrollContainerRef.current;
              const gap = 24; 
              const cardWidth = (container.clientWidth - ((visibleItems - 1) * gap)) / visibleItems;
              const scrollStep = cardWidth + gap;
              const maxScrollLeft = container.scrollWidth - container.clientWidth;

              if (container.scrollLeft >= maxScrollLeft - 10) {
                  container.scrollTo({ left: 0, behavior: 'smooth' });
              } else {
                  container.scrollBy({ left: scrollStep, behavior: 'smooth' });
              }
          }
      }, 3000);
      return () => clearInterval(interval);
  }, [isPaused, displayJobs.length, visibleItems]);

  const scroll = (direction: 'left' | 'right') => {
      if (scrollContainerRef.current) {
          const { current } = scrollContainerRef;
          const scrollAmount = direction === 'left' ? -current.offsetWidth : current.offsetWidth;
          current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
  };

  const renderBadge = (badgeId?: string) => {
      if (!badgeId) return null;
      const badge = badges.find(b => b.id === badgeId);
      if (!badge) return null;

      const colors = {
          yellow: 'from-yellow-400 to-amber-600',
          red: 'from-red-500 to-pink-600',
          blue: 'from-blue-500 to-cyan-600',
          green: 'from-green-500 to-emerald-600',
          purple: 'from-purple-500 to-indigo-600',
          gray: 'from-gray-500 to-slate-600'
      };
      const colorClass = colors[badge.color] || colors.blue;

      const badgeClass = isHighDensity 
        ? "px-3 py-1 lg:px-2 lg:py-0.5 text-[10px] lg:text-[9px]" 
        : "px-3 py-1 text-[10px]";

      return (
          <span className={`absolute top-0 right-0 bg-gradient-to-r ${colorClass} text-white font-black ${badgeClass} rounded-bl-lg shadow-md z-10 flex items-center gap-1`}>
              {badge.icon === 'crown' && <Crown size={isHighDensity ? 10 : 12} fill="white" />}
              {badge.icon === 'fire' && <Flame size={isHighDensity ? 10 : 12} fill="white" />}
              {badge.icon === 'star' && <Star size={isHighDensity ? 10 : 12} fill="white" />}
              {badge.icon === 'zap' && <Zap size={isHighDensity ? 10 : 12} fill="white" />}
              {badge.label}
          </span>
      );
  };

  const getCardStyles = (badgeId?: string) => {
      const badge = badges.find(b => b.id === badgeId);
      const isTopTier = badge && badge.priority === maxPriority;
      const base = 'bg-white hover:shadow-lg transition-all duration-300';
      
      const padding = isHighDensity ? 'p-5 lg:p-3' : 'p-5';

      if (!isTopTier || !badge) {
          return `border border-slate-100 hover:border-brand-200 ${padding} ${base}`;
      }

      const colors: Record<string, string> = {
          yellow: 'border-yellow-300 ring-yellow-200',
          red:    'border-red-300 ring-red-200',
          blue:   'border-blue-300 ring-blue-200',
          green:  'border-green-300 ring-green-200',
          purple: 'border-purple-300 ring-purple-200',
          gray:   'border-gray-300 ring-gray-200',
      };
      
      const theme = colors[badge.color] || colors.blue;
      return `border-2 ${theme} ring-1 bg-gradient-to-b from-white to-slate-50 ${padding} hover:-translate-y-1 ${base}`;
  };

  return (
    <section 
        className={`${bgColor} py-16 relative group/section`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
    >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                 {renderSectionIcon(config.icon)}
                 <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                     <SafeHTML html={config.title || config.content?.sectionTitle || "Danh sách việc làm"} />
                 </h2>
              </div>
              <div className="flex gap-4 items-center">
                  <Link to="/jobs" className="text-brand-700 font-bold hover:text-brand-600 flex items-center gap-1 transition-colors text-sm md:text-base">
                     Xem tất cả <TrendingUp size={16} />
                  </Link>
              </div>
           </div>
           
           <div className="relative group/slider">
               <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg border border-gray-100 text-gray-700 p-2 md:p-3 rounded-full opacity-0 group-hover/slider:opacity-100 transition-all duration-300 hover:scale-110 hover:text-brand-600 -ml-4 md:-ml-6">
                   <ChevronLeft size={20}/>
               </button>

               <div 
                    ref={scrollContainerRef}
                    className="grid gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide py-4 px-1 -mx-1 auto-cols-[85%] md:auto-cols-[calc(50%-12px)] lg:auto-cols-[var(--desktop-width)]"
                    style={{
                        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
                        gridAutoFlow: 'column',
                        '--desktop-width': `calc((100% - ${(visibleItems - 1) * 24}px) / ${visibleItems})`
                    } as React.CSSProperties}
                >
                 {displayJobs.map(job => {
                    const badge = badges.find(b => b.id === job.badgeId);
                    const isTopTier = badge && badge.priority === maxPriority;
                    
                    return (
                    <div 
                      key={job.id} 
                      onClick={() => navigate(`/jobs/${job.id}`)}
                      className={`
                        snap-center h-full flex flex-col
                        relative rounded-xl md:rounded-2xl cursor-pointer group overflow-hidden
                        ${getCardStyles(job.badgeId)}
                      `}
                    >
                       {isTopTier && !isHighDensity && (
                           <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 -mr-10 -mt-10 bg-${badge?.color || 'blue'}-400 hidden lg:block`}></div>
                       )}
                       
                       {renderBadge(job.badgeId)}

                       <div className={`flex justify-between items-start ${isHighDensity ? 'mb-4 lg:mb-2' : 'mb-4'} relative z-10`}>
                          <div className={`rounded-xl bg-white shadow-sm transition-colors border border-slate-100 overflow-hidden flex-shrink-0 ${isHighDensity ? 'p-1.5 w-14 h-14 lg:p-1 lg:w-10 lg:h-10' : 'p-1.5 w-14 h-14'}`}>
                            <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
                          </div>
                       </div>
                       
                       <div className="relative z-10 flex-1 flex flex-col">
                           <h3 
                                className={`font-bold transition-colors text-slate-900 group-hover:text-brand-600 
                                ${isHighDensity 
                                    ? 'text-lg mb-1 leading-snug line-clamp-2 min-h-[3.5rem] lg:text-sm lg:min-h-[2.5rem]' 
                                    : 'text-lg mb-1 leading-snug line-clamp-2 min-h-[3.5rem]'}`
                                }
                                title={job.title}
                           >
                               {job.title}
                           </h3>
                           
                           <div className={`${isHighDensity ? 'mb-6 lg:mb-2' : 'mb-6'} flex items-center gap-1 text-slate-500`}>
                               <Building2 size={14} className={`flex-shrink-0 ${isHighDensity ? 'lg:w-3 lg:h-3' : ''}`}/> 
                               <span className={`truncate font-medium ${isHighDensity ? 'text-sm lg:text-xs' : 'text-sm'}`}>{job.company}</span>
                           </div>
                           
                           <div className={`pt-3 border-t border-slate-100 mt-auto ${isHighDensity ? 'space-y-3 lg:space-y-1' : 'space-y-3'}`}>
                              <div className="flex justify-between items-center">
                                <div className={`flex items-center gap-1 w-full ${isHighDensity ? 'lg:hidden' : ''}`}>
                                    <span className="text-sm text-slate-500">Lương</span>
                                    <span className={`font-bold text-sm ml-auto ${isTopTier ? `text-${badge?.color || 'brand'}-600` : 'text-brand-600'}`}>{job.salary}</span>
                                </div>
                                
                                {isHighDensity && (
                                    <div className="hidden lg:flex items-center gap-1 w-full">
                                        <DollarSign size={12} className="text-slate-400"/>
                                        <span className={`font-bold text-xs truncate ${isTopTier ? `text-${badge?.color || 'brand'}-600` : 'text-brand-600'}`}>
                                            {job.salary}
                                        </span>
                                    </div>
                                )}
                              </div>

                              <div className="flex justify-between items-center">
                                 <div className={`flex items-center gap-1 w-full ${isHighDensity ? 'lg:hidden' : ''}`}>
                                    <span className="text-sm text-slate-500">Khu vực</span>
                                    <span className="font-medium text-sm text-slate-700 ml-auto">{job.location}</span>
                                 </div>

                                 {isHighDensity && (
                                     <div className="hidden lg:flex items-center gap-1 w-full">
                                         <MapPin size={12} className="text-slate-400"/>
                                         <span className="text-xs text-slate-600 truncate">{job.location}</span>
                                     </div>
                                 )}
                              </div>
                           </div>
                           
                           <Button 
                                className={`w-full font-bold shadow-none hover:shadow-lg transition-all
                                ${isHighDensity ? 'mt-6 rounded-xl lg:mt-3 lg:text-xs lg:py-1.5 lg:h-8 lg:rounded-lg' : 'mt-6 rounded-xl'}
                                ${(!isTopTier) ? 'bg-slate-900 hover:bg-brand-600 text-white' : ''}
                                `}
                                style={isTopTier ? {
                                    background: badge?.color === 'yellow' ? 'linear-gradient(to right, #eab308, #d97706)' : 
                                                badge?.color === 'red' ? 'linear-gradient(to right, #ef4444, #db2777)' :
                                                'linear-gradient(to right, #2563eb, #0891b2)',
                                    color: 'white',
                                    border: 'none'
                                } : {}}
                            >
                                {isHighDensity 
                                    ? <span className="block lg:hidden">{isTopTier ? 'Ứng tuyển Ngay' : 'Ứng tuyển Ngay'}</span> 
                                    : (isTopTier ? 'Ứng tuyển Ngay' : 'Ứng tuyển Ngay')
                                }
                                {isHighDensity && <span className="hidden lg:block">Ứng tuyển</span>}
                            </Button>
                       </div>
                    </div>
                 )})}
               </div>

               <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg border border-gray-100 text-gray-700 p-2 md:p-3 rounded-full opacity-0 group-hover/slider:opacity-100 transition-all duration-300 hover:scale-110 hover:text-brand-600 -mr-4 md:-mr-6">
                   <ChevronRight size={20}/>
               </button>
           </div>
        </div>
    </section>
  );
};

const CompaniesSection: React.FC<{ config: HomeSectionConfig }> = ({ config }) => {
    const limit = config.content?.limit || 12;
    const companies = DataService.getCompanies().slice(0, limit); 
    const bgColor = config.content?.background === 'gray' ? 'bg-slate-50' : 'bg-white';
    
    return (
        <section className={`py-20 ${bgColor} text-slate-800 overflow-hidden relative`}>
            <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(#dc2626 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <div className="mb-12">
                   <div className="flex justify-center mb-6">
                      <div className="w-16 h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent"></div>
                   </div>
                   <div className="flex justify-center items-center gap-3 mb-4">
                       {renderSectionIcon(config.icon)}
                       
                       <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                          <SafeHTML html={config.title || config.content?.sectionTitle || "Đối tác chiến lược"} />
                       </h2>
                   </div>
                   
                   <p className="text-slate-500 mt-4 text-lg max-w-2xl mx-auto">
                      Hợp tác với các tập đoàn hàng đầu, mang đến cơ hội nghề nghiệp đẳng cấp
                   </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                   {companies.map((company, idx) => (
                      <div 
                        key={idx} 
                        className="bg-white border border-gray-100 p-4 rounded-2xl flex flex-col items-center justify-center aspect-[1/1] hover:shadow-xl hover:border-brand-200 transition-all duration-300 group cursor-pointer relative overflow-hidden"
                      >
                         <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                         {/* HIỂN THỊ MÀU GỐC VÀ CĂN CHỈNH TO HƠN */}
                         <img 
                            src={company.logo} 
                            alt={company.name} 
                            className="w-[85%] h-[85%] object-contain transition-all duration-500 transform group-hover:scale-110 relative z-10" 
                         />
                         <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-3 text-xs font-bold text-brand-600 truncate w-full px-2 relative z-10">
                             {company.name}
                         </div>
                      </div>
                   ))}
                </div>
            </div>
        </section>
    );
}

const CategoriesSection: React.FC<{ config: HomeSectionConfig }> = ({ config }) => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        setCategories(DataService.getCategories());
    }, []);

    return (
        <section className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                   <div className="flex items-center gap-4">
                      {renderSectionIcon(config.icon)}
                      
                      <div>
                          <h2 className="text-3xl font-bold text-slate-900">
                              <SafeHTML html={config.title || config.content?.sectionTitle || "Ngành nghề nổi bật"} />
                          </h2>
                          <p className="text-slate-500 mt-2">Xu hướng nghề nghiệp được tìm kiếm nhiều nhất</p>
                      </div>
                   </div>
                   <Button variant="outline" className="rounded-full">Xem tất cả ngành nghề</Button>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {categories.map(cat => (
                    <div 
                       key={cat.id} 
                       className="group bg-white rounded-2xl p-6 text-center hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1 transition-all cursor-pointer border border-slate-200 hover:border-brand-300 relative overflow-hidden"
                       onClick={() => navigate(`/jobs?category=${encodeURIComponent(cat.name)}`)}
                    >
                       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                       <div className="w-16 h-16 mx-auto bg-red-50 rounded-2xl flex items-center justify-center text-3xl shadow-sm mb-4 group-hover:scale-110 transition-transform text-brand-600 group-hover:bg-brand-500 group-hover:text-white duration-300">
                          {cat.icon}
                       </div>
                       <h3 className="font-bold text-slate-800 group-hover:text-brand-700 transition-colors">{cat.name}</h3>
                       <p className="text-sm text-slate-400 mt-1 font-medium group-hover:text-brand-600/70">{cat.count.toLocaleString()} việc làm</p>
                    </div>
                  ))}
               </div>
            </div>
        </section>
    );
}

const BannerSection: React.FC<{ config: HomeSectionConfig }> = ({ config }) => {
    if (!config.content?.bannerUrl) return null;
    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <a href={config.content.bannerLink || '#'} className="block rounded-2xl overflow-hidden shadow-lg group">
                    <img 
                        src={config.content.bannerUrl} 
                        alt="Banner" 
                        className="w-full h-64 md:h-80 object-cover transform group-hover:scale-105 transition-transform duration-700" 
                    />
                </a>
            </div>
        </section>
    );
}

export const Home: React.FC = () => {
  const [layout, setLayout] = useState<HomeSectionConfig[]>([]);
  const location = useLocation();

  useEffect(() => {
    setLayout(DataService.getLayout());
  }, [location]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      {layout.map(section => {
          if (!section.isVisible) return null;
          
          switch (section.type) {
              case 'hero':
                  return <HeroSection key={section.id} config={section} />;
              case 'job-list':
                  return <JobListSection key={section.id} config={section} />;
              case 'companies':
                  return <CompaniesSection key={section.id} config={section} />;
              case 'categories':
                  return <CategoriesSection key={section.id} config={section} />;
              case 'banner':
                  return <BannerSection key={section.id} config={section} />;
              default:
                  return null;
          }
      })}

      <Link to="/admin" className="fixed bottom-24 right-6 z-40 bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-black transition-all group">
         <Edit size={20} />
         <span className="absolute right-full mr-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">
            Quản trị trang chủ
         </span>
      </Link>
    </div>
  );
};

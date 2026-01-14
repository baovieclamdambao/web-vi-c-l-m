
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Filter, Search, MapPin } from 'lucide-react';
import { JobCard } from '../components/JobCard';
import { Button } from '../components/Button';
import { MOCK_JOBS, LOCATIONS, SALARY_RANGES } from '../constants';
import { DataService } from '../services/dataService';
import { Job, Category } from '../types';

export const FindJobs: React.FC = () => {
  const locationHook = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(locationHook.search);
  
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || '');
  const [selectedSalary, setSelectedSalary] = useState('');
  
  // URL Param 'category' comes as a Name from Home page.
  const categoryParam = searchParams.get('category') || '';
  const [selectedCategoryName, setSelectedCategoryName] = useState(categoryParam);
  
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(MOCK_JOBS);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Mobile filter toggle
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
     setCategories(DataService.getCategories());
  }, []);

  // Sync state if URL changes
  useEffect(() => {
      setSelectedCategoryName(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    let results = DataService.getJobs();

    // 1. Keyword Filter
    if (keyword) {
      const lower = keyword.toLowerCase();
      results = results.filter(j => 
        j.title.toLowerCase().includes(lower) || 
        j.company.toLowerCase().includes(lower) || 
        j.tags.some(t => t.toLowerCase().includes(lower))
      );
    }

    // 2. Location Filter
    if (selectedLocation) {
      results = results.filter(j => j.location === selectedLocation);
    }

    // 3. Category Filter (Strict ID Matching)
    if (selectedCategoryName) {
       // Find the ID corresponding to the name
       const targetCat = categories.find(c => c.name === selectedCategoryName);
       if (targetCat) {
           results = results.filter(j => j.categoryId === targetCat.id);
       } else {
           // Fallback: If category name changed or deleted, maybe look in tags (Legacy support)
           results = results.filter(j => 
               j.tags.some(t => t.includes(selectedCategoryName)) || 
               j.title.includes(selectedCategoryName)
           );
       }
    }

    // 4. Salary Filter
    if (selectedSalary && selectedSalary !== "Tất cả mức lương" && selectedSalary !== "Thỏa thuận") {
        const rangeStart = selectedSalary.split(' ')[0];
        results = results.filter(j => j.salary.includes(rangeStart) || j.salary === 'Thỏa thuận');
    }

    setFilteredJobs(results);
  }, [keyword, selectedLocation, selectedSalary, selectedCategoryName, categories]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Search Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
           <div className="flex gap-2">
             <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  placeholder="Tìm kiếm việc làm..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
             </div>
             <div className="hidden md:block relative w-1/4">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <select 
                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none appearance-none bg-white"
                   value={selectedLocation}
                   onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">Tất cả địa điểm</option>
                   {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
             </div>
             <Button className="md:w-32" onClick={() => {}}>Tìm</Button>
             <button 
               className="md:hidden p-2 border border-gray-300 rounded-lg bg-white"
               onClick={() => setIsFilterOpen(!isFilterOpen)}
             >
                <Filter size={20} />
             </button>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8 items-start">
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden md:block w-64 flex-shrink-0 space-y-8">
           <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
             <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
               <Filter size={18} /> Bộ lọc nâng cao
             </h3>
             
             {/* Category Filter */}
             <div className="mb-6">
               <h4 className="text-sm font-semibold text-gray-700 mb-2">Ngành nghề</h4>
               <select 
                 className="w-full p-2 text-sm border border-gray-200 rounded-md focus:ring-brand-500 focus:border-brand-500"
                 value={selectedCategoryName}
                 onChange={(e) => setSelectedCategoryName(e.target.value)}
               >
                 <option value="">Tất cả ngành nghề</option>
                 {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
               </select>
             </div>

             {/* Salary Filter */}
             <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Mức lương</h4>
                <div className="space-y-2">
                   {SALARY_RANGES.map((range, idx) => (
                     <label key={idx} className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="salary" 
                          className="text-brand-600 focus:ring-brand-500"
                          checked={selectedSalary === range}
                          onChange={() => setSelectedSalary(range)}
                        />
                        <span className="text-sm text-gray-600">{range}</span>
                     </label>
                   ))}
                </div>
             </div>
             
             <Button variant="outline" size="sm" className="w-full" onClick={() => {
                setSelectedLocation('');
                setSelectedSalary('');
                setKeyword('');
                setSelectedCategoryName('');
             }}>
               Xóa bộ lọc
             </Button>
           </div>
           
           <div className="bg-brand-50 p-5 rounded-xl border border-brand-100 text-center">
              <h4 className="font-bold text-brand-800 mb-2">Cần tư vấn CV?</h4>
              <p className="text-sm text-brand-600 mb-4">Sử dụng Chatbot AI để tối ưu hóa hồ sơ của bạn ngay.</p>
           </div>
        </aside>

        {/* Job List */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-4">
             <h1 className="text-xl font-bold text-gray-800">
               Tìm thấy <span className="text-brand-600">{filteredJobs.length}</span> việc làm phù hợp
             </h1>
             <select className="text-sm border-gray-200 border rounded-md p-1">
               <option>Mới nhất</option>
               <option>Lương cao nhất</option>
             </select>
          </div>

          <div className="space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <JobCard key={job.id} job={job} onClick={() => navigate(`/jobs/${job.id}`)} />
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                 <Search size={48} className="mx-auto text-gray-300 mb-4" />
                 <h3 className="text-lg font-medium text-gray-900">Không tìm thấy việc làm nào</h3>
                 <p className="text-gray-500">Hãy thử thay đổi từ khóa hoặc bộ lọc của bạn</p>
              </div>
            )}
          </div>
        </main>
      </div>
      
      {/* Mobile Filter Modal (Simplified) */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end md:hidden">
           <div className="bg-white w-4/5 h-full p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Bộ lọc</h3>
                <button onClick={() => setIsFilterOpen(false)}><span className="text-2xl">&times;</span></button>
              </div>
              
              <div className="space-y-6">
                 <div>
                   <label className="block text-sm font-medium mb-1">Địa điểm</label>
                   <select 
                     className="w-full p-2 border rounded"
                     value={selectedLocation}
                     onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                      <option value="">Tất cả</option>
                      {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                   </select>
                 </div>
                 
                 <div>
                   <label className="block text-sm font-medium mb-1">Mức lương</label>
                   <select 
                     className="w-full p-2 border rounded"
                     value={selectedSalary}
                     onChange={(e) => setSelectedSalary(e.target.value)}
                    >
                      {SALARY_RANGES.map(l => <option key={l} value={l}>{l}</option>)}
                   </select>
                 </div>
                 
                 <Button className="w-full" onClick={() => setIsFilterOpen(false)}>Áp dụng</Button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

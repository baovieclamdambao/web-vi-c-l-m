import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_JOBS } from '../constants';
import { Button } from '../components/Button';
import { MapPin, DollarSign, Clock, Building2, CheckCircle2, ChevronLeft } from 'lucide-react';

export const JobDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = MOCK_JOBS.find(j => j.id === id);

  if (!job) {
    return (
        <div className="min-h-screen flex items-center justify-center flex-col">
            <h2 className="text-2xl font-bold mb-4">Công việc không tồn tại</h2>
            <Button onClick={() => navigate('/jobs')}>Quay lại danh sách</Button>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-brand-600 mb-6 transition-colors">
            <ChevronLeft size={20} /> Quay lại
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Header Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
               <div className="flex flex-col md:flex-row gap-6">
                   <img src={job.logo} alt={job.company} className="w-24 h-24 rounded-lg object-cover border border-gray-200" />
                   <div className="flex-1">
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                      <div className="flex items-center text-gray-600 font-medium text-lg mb-4">
                        <Building2 size={20} className="mr-2 text-gray-400" /> {job.company}
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="flex items-center text-brand-600 font-bold bg-brand-50 px-3 py-1.5 rounded-lg">
                           <DollarSign size={16} className="mr-1" /> {job.salary}
                        </span>
                        <span className="flex items-center text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg">
                           <MapPin size={16} className="mr-1" /> {job.location}
                        </span>
                         <span className="flex items-center text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg">
                           <Clock size={16} className="mr-1" /> {job.postedAt}
                        </span>
                      </div>
                   </div>
               </div>
               
               <div className="mt-8 flex flex-col sm:flex-row gap-3">
                 <Button size="lg" className="flex-1">Ứng tuyển ngay</Button>
                 <Button variant="outline" size="lg" className="flex-1">Lưu tin</Button>
               </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
               <h3 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-brand-500 pl-3">Mô tả công việc</h3>
               <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-6">
                 {job.description}
               </p>

               <h3 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-brand-500 pl-3">Yêu cầu ứng viên</h3>
               <ul className="space-y-3 mb-6">
                 {job.requirements.map((req, i) => (
                   <li key={i} className="flex items-start text-gray-700">
                     <CheckCircle2 size={18} className="mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                     {req}
                   </li>
                 ))}
               </ul>

               <h3 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-brand-500 pl-3">Quyền lợi</h3>
               <ul className="space-y-3">
                 {job.benefits.map((ben, i) => (
                   <li key={i} className="flex items-start text-gray-700">
                     <CheckCircle2 size={18} className="mr-2 text-brand-500 mt-0.5 flex-shrink-0" />
                     {ben}
                   </li>
                 ))}
               </ul>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h3 className="font-bold text-gray-900 mb-4">Thông tin công ty</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                     <Building2 size={24} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{job.company}</div>
                    <div className="text-xs text-gray-500">Quy mô: 100-200 nhân viên</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-2 mb-4">
                   <p className="flex items-center"><MapPin size={14} className="mr-2"/> {job.location}</p>
                   <p className="flex items-center"><Clock size={14} className="mr-2"/> Thứ 2 - Thứ 6</p>
                </div>
                <Button variant="outline" className="w-full text-sm">Xem trang công ty</Button>
             </div>
             
             <div className="bg-brand-50 rounded-xl p-6 border border-brand-100">
               <h4 className="font-bold text-brand-800 mb-2">Gợi ý từ AI</h4>
               <p className="text-sm text-brand-700 mb-3">
                 Kỹ năng quan trọng nhất cho vị trí này là <strong>{job.tags[0]}</strong>. Hãy chắc chắn CV của bạn làm nổi bật kỹ năng này.
               </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

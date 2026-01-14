
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataService } from '../services/dataService';
import { User, Job, SavedCV } from '../types';
import { Button } from '../components/Button';
import { JobCard } from '../components/JobCard';
import { MOCK_JOBS } from '../constants';
import { 
    User as UserIcon, Mail, Phone, Upload, FileText, 
    Briefcase, Clock, Save, Camera, Shield, Award, Search,
    Settings, Zap, Bell, Lock, Eye, EyeOff, CheckCircle,
    LayoutDashboard, Calendar, Video, MapPin, TrendingUp, 
    FolderGit2, ExternalLink, Plus, Globe, Edit3, Share2, Sparkles, Printer, Trash2, Image as ImageIcon
} from 'lucide-react';

// ... (Keep DashboardTab, ProjectsTab, GeneralInfoTab, AppliedJobsTab, MatchedJobsTab, SettingsTab as is) ...
// Since I have to output the FULL file content or replacement content, I will replicate the key parts and inject the toggle.

const DashboardTab = ({ user }: { user: User }) => {
    // Mock Statistics
    const stats = [
        { label: 'Lượt xem hồ sơ', value: 128, change: '+12%', icon: Eye, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Xuất hiện tìm kiếm', value: 45, change: '+5%', icon: Search, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'CV được tải', value: 12, change: '+2', icon: FileText, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Việc đã nộp', value: 8, change: '0', icon: Briefcase, color: 'text-orange-600', bg: 'bg-orange-50' },
    ];
    const interviews = [
        { id: 1, company: 'Tech Solutions Vietnam', position: 'Senior Frontend Dev', time: '09:30 - 10:30', date: 'Ngày mai, 24/05', type: 'online', link: 'https://meet.google.com/abc-xyz', status: 'confirmed' },
        { id: 2, company: 'FPT Software', position: 'React Native Lead', time: '14:00 - 15:00', date: 'Thứ 6, 26/05', type: 'offline', address: 'Tòa nhà F-Town 3', status: 'pending' }
    ];
    return (
        <div className="animate-fade-in space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2"><div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}><stat.icon size={20} /></div><span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{stat.change}</span></div>
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div><div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                ))}
            </div>
            <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><Calendar size={20} className="text-brand-600"/> Lịch phỏng vấn sắp tới</h3>
                <div className="space-y-4">
                    {interviews.map(interview => (
                        <div key={interview.id} className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col md:flex-row gap-6 relative overflow-hidden group">
                            <div className={`absolute left-0 top-0 bottom-0 w-1 ${interview.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                            <div className="flex-shrink-0 w-full md:w-32 bg-gray-50 rounded-lg p-3 text-center flex flex-col justify-center border border-gray-100">
                                <span className="text-xs text-gray-500 font-bold uppercase mb-1">{interview.time}</span><span className="text-sm font-bold text-brand-700">{interview.date}</span>
                            </div>
                            <div className="flex-1"><h4 className="font-bold text-gray-900 text-lg">{interview.position}</h4><div className="text-gray-600 font-medium mb-2">{interview.company}</div><div className="flex items-center gap-4 text-sm mt-3">{interview.type === 'online' ? (<a href={interview.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-blue-600 font-bold hover:underline bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100"><Video size={16}/> Vào phòng họp Online</a>) : (<div className="flex items-center gap-2 text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg"><MapPin size={16}/> {interview.address}</div>)}</div></div>
                            <div className="absolute top-4 right-4">{interview.status === 'confirmed' ? (<span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">Đã xác nhận</span>) : (<span className="text-xs font-bold bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Chờ xác nhận</span>)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ProjectsTab = () => {
    const projects = [
        { id: 1, title: "E-commerce Mobile App", role: "Mobile Developer", description: "Ứng dụng mua sắm trực tuyến...", tech: ["Flutter", "Firebase"], image: "https://picsum.photos/id/1/400/250", link: "#" },
        { id: 2, title: "Hệ thống quản lý Nhân sự", role: "Frontend Lead", description: "Xây dựng dashboard quản lý...", tech: ["ReactJS", "Redux"], image: "https://picsum.photos/id/119/400/250", link: "#" }
    ];
    return (
        <div className="animate-fade-in space-y-6">
            <div className="flex justify-between items-center"><div className="bg-blue-50 text-blue-800 px-4 py-2 rounded-lg text-sm border border-blue-100">💡 <strong>Mẹo:</strong> Thêm dự án thực tế để tăng độ tin cậy.</div><Button size="sm"><Plus size={16} className="mr-1"/> Thêm dự án</Button></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map(project => (
                    <div key={project.id} className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-brand-200 transition-all flex flex-col">
                        <div className="h-40 overflow-hidden relative"><img src={project.image} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" /></div>
                        <div className="p-5 flex-1 flex flex-col"><h4 className="font-bold text-gray-900 text-lg mb-1">{project.title}</h4><p className="text-sm text-brand-600 font-semibold mb-3">{project.role}</p><p className="text-sm text-gray-500 mb-4 line-clamp-2">{project.description}</p><div className="mt-auto"><div className="flex flex-wrap gap-2 mb-4">{project.tech.map((t, i) => (<span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200">{t}</span>))}</div><a href={project.link} className="flex items-center text-sm font-bold text-blue-600 hover:underline"><ExternalLink size={14} className="mr-1"/> Xem chi tiết</a></div></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const GeneralInfoTab = ({ user, onSave }: { user: User, onSave: (u: User) => void }) => {
    const [formData, setFormData] = useState(user);
    const [isSaving, setIsSaving] = useState(false);
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setIsSaving(true); setTimeout(() => { onSave(formData); setIsSaving(false); alert("Đã cập nhật!"); }, 800); };
    return (
        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Họ và tên</label><input className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-brand-500 outline-none" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})}/></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Chức danh</label><input className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-brand-500 outline-none" defaultValue="Senior Frontend Developer" /></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Email</label><input className="w-full border border-gray-300 rounded-xl p-3 bg-gray-100 text-gray-500" value={formData.email} disabled/></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Điện thoại</label><input className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-brand-500 outline-none" value={formData.phone || ''} onChange={e => setFormData({...formData, phone: e.target.value})}/></div>
            </div>
            <div><label className="block text-sm font-semibold text-gray-700 mb-2">Giới thiệu</label><textarea className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-brand-500 outline-none h-32" placeholder="Mô tả ngắn gọn..."></textarea></div>
            <div className="flex justify-end pt-4 border-t border-gray-100"><Button type="submit" disabled={isSaving}>{isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}</Button></div>
        </form>
    );
};

const AppliedJobsTab = () => {
    const applications = [{ id: 1, jobTitle: 'Senior React Developer', company: 'Tech Solutions', status: 'viewed', date: '2 giờ trước', salary: '25 - 35 triệu' }];
    return (
        <div className="space-y-4 animate-fade-in">
            {applications.map(app => (
                <div key={app.id} className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition-all flex justify-between items-center">
                    <div className="flex items-center gap-4"><div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200"><Briefcase size={20} className="text-gray-400"/></div><div><h4 className="font-bold text-gray-800">{app.jobTitle}</h4><p className="text-sm text-gray-500">{app.company}</p></div></div>
                    <div className="text-sm font-bold text-brand-600">{app.status}</div>
                </div>
            ))}
        </div>
    );
};

const MatchedJobsTab = () => {
    const navigate = useNavigate();
    const matchedJobs = MOCK_JOBS.slice(0, 3); 
    return (
        <div className="animate-fade-in space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border border-blue-100 flex items-start gap-4"><div className="bg-white p-3 rounded-full shadow-sm text-brand-600"><Zap size={24} className="fill-current" /></div><div><h3 className="text-lg font-bold text-gray-800">Gợi ý từ AI</h3><p className="text-sm text-gray-600 mt-1">Hệ thống đánh giá bạn phù hợp 90% với các vị trí này.</p></div></div>
            <div className="space-y-4">{matchedJobs.map(job => (<JobCard key={job.id} job={job} onClick={() => navigate(`/jobs/${job.id}`)} />))}</div>
        </div>
    );
};

const SettingsTab = () => (
    <div className="animate-fade-in space-y-8">
        <div><h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2"><Bell size={20} className="text-brand-600"/> Thông báo</h3><div className="bg-white border border-gray-200 rounded-xl p-4">Email thông báo việc làm mới</div></div>
        <div><h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2"><Lock size={20} className="text-brand-600"/> Bảo mật</h3><div className="bg-white border border-gray-200 rounded-xl p-6">Đổi mật khẩu</div></div>
    </div>
);

// --- CV MANAGER TAB ---
const CVManagerTab = ({ userId }: { userId: string }) => {
    const navigate = useNavigate();
    const [savedCVs, setSavedCVs] = useState<SavedCV[]>([]);

    useEffect(() => {
        setSavedCVs(DataService.getSavedCVs(userId));
    }, [userId]);

    const handleDelete = (id: string) => {
        if(confirm("Bạn có chắc chắn muốn xóa CV này?")) {
            DataService.deleteCV(id);
            setSavedCVs(DataService.getSavedCVs(userId));
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
             {/* New Feature Highlight: CV Builder */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/20 transition-all"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                             <Sparkles className="text-yellow-300 animate-pulse" size={24}/>
                             <span className="font-bold text-yellow-300 uppercase tracking-wide text-sm">Tính năng mới</span>
                        </div>
                        <h3 className="text-2xl font-extrabold mb-2">Tạo CV Online Chuyên Nghiệp</h3>
                        <p className="text-indigo-100 max-w-lg">
                            Khám phá kho mẫu CV hiện đại, chuẩn GenZ và ATS. Tạo hồ sơ ấn tượng chỉ trong 5 phút.
                        </p>
                    </div>
                    <Button 
                        onClick={() => navigate('/cv-builder')}
                        className="bg-white text-indigo-600 hover:bg-indigo-50 border-none shadow-lg px-8 py-4 text-base font-bold"
                    >
                        + Tạo CV Mới
                    </Button>
                </div>
            </div>

            <h3 className="font-bold text-gray-800 text-lg mt-8 mb-4">CV Đã lưu ({savedCVs.length})</h3>
            
            {savedCVs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedCVs.map(cv => (
                        <div key={cv.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-brand-200 hover:shadow-md transition-all group">
                             <div className="flex justify-between items-start mb-4">
                                 <div className="flex items-center gap-3">
                                     <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold ${cv.config.accentColor}`}>CV</div>
                                     <div>
                                         <h4 className="font-bold text-gray-800">{cv.name}</h4>
                                         <p className="text-xs text-gray-500">Cập nhật: {cv.updatedAt}</p>
                                     </div>
                                 </div>
                                 <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                     <button onClick={() => navigate(`/cv-builder?id=${cv.id}`)} className="p-2 text-blue-600 hover:bg-blue-50 rounded" title="Chỉnh sửa"><Edit3 size={16}/></button>
                                     <button onClick={() => handleDelete(cv.id)} className="p-2 text-red-600 hover:bg-red-50 rounded" title="Xóa"><Trash2 size={16}/></button>
                                 </div>
                             </div>
                             <div className="flex gap-2 mt-4">
                                 <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="flex-1"
                                    onClick={() => navigate(`/cv-builder?id=${cv.id}`)}
                                 >
                                    <Printer size={14} className="mr-1"/> Tải xuống / In
                                 </Button>
                             </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                    <FileText className="mx-auto text-gray-300 mb-2" size={32}/>
                    <p className="text-gray-500">Bạn chưa lưu CV nào.</p>
                </div>
            )}
        </div>
    );
};

export const CandidateProfile: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [activeTab, setActiveTab] = useState<'dashboard' | 'general' | 'cv' | 'projects' | 'jobs' | 'saved' | 'match' | 'settings'>('dashboard');

    useEffect(() => {
        const currentUser = DataService.getCurrentUser();
        if (!currentUser) { navigate('/auth'); return; }
        setUser(currentUser);
    }, [navigate]);

    if (!user) return null;

    const handleUpdateUser = (updatedData: User) => {
        DataService.setCurrentUser(updatedData);
        setUser(updatedData);
        const allUsers = DataService.getUsers();
        const index = allUsers.findIndex(u => u.id === updatedData.id);
        if(index >= 0) { allUsers[index] = updatedData; localStorage.setItem('vv_users', JSON.stringify(allUsers)); }
    };

    const toggleJobSearch = () => {
        const updatedUser = { ...user, isLookingForJob: !user.isLookingForJob };
        handleUpdateUser(updatedUser);
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-8 pb-20 font-sans">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* REDESIGNED HEADER PROFILE CARD */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6 group relative">
                    {/* Cover Image Area */}
                    <div className="h-48 bg-gradient-to-r from-gray-900 to-slate-800 relative overflow-hidden group/cover">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
                        <button className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white px-3 py-1.5 rounded-lg backdrop-blur-sm transition-all opacity-0 group-hover/cover:opacity-100 border border-white/20 flex items-center gap-2 text-xs font-bold">
                            <ImageIcon size={14} /> Thay ảnh bìa
                        </button>
                    </div>
                    
                    <div className="px-8 pb-6">
                        <div className="flex flex-col md:flex-row gap-6 items-end -mt-16 relative">
                            {/* Avatar */}
                            <div className="flex-shrink-0 relative group/avatar">
                                <div className="w-36 h-36 rounded-full border-[4px] border-white shadow-lg bg-white overflow-hidden relative">
                                    <img src={user.avatar} alt={user.fullName} className="w-full h-full object-cover"/>
                                    {/* Avatar Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity cursor-pointer backdrop-blur-[1px]">
                                        <Camera size={24} className="text-white drop-shadow-md"/>
                                    </div>
                                </div>
                                <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full" title="Online"></div>
                            </div>

                            {/* User Info */}
                            <div className="flex-1 pb-2 w-full">
                                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4">
                                    <div>
                                        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
                                            {user.fullName}
                                            <span className="text-blue-500" title="Đã xác thực"><CheckCircle size={20} fill="currentColor" className="text-white" /></span>
                                        </h1>
                                        <p className="text-gray-500 font-medium text-lg mt-1">Senior Frontend Developer</p>
                                        
                                        <div className="flex flex-wrap items-center gap-3 mt-4 text-sm text-gray-600">
                                            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200"><Mail size={14}/> {user.email}</span>
                                            {user.phone && (<span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200"><Phone size={14}/> {user.phone}</span>)}
                                            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200"><MapPin size={14}/> Hồ Chí Minh</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons Group */}
                                    <div className="flex flex-col items-end gap-3 w-full lg:w-auto">
                                        <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                                            <div className="flex items-center gap-2 px-2">
                                                <span className={`text-xs font-bold uppercase tracking-wide ${user.isLookingForJob ? 'text-green-600' : 'text-gray-400'}`}>
                                                    {user.isLookingForJob ? 'Đang tìm việc' : 'Tắt tìm việc'}
                                                </span>
                                                <button 
                                                    onClick={toggleJobSearch}
                                                    className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-300 focus:outline-none ${user.isLookingForJob ? 'bg-green-500' : 'bg-gray-300'}`}
                                                >
                                                    <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${user.isLookingForJob ? 'translate-x-5' : 'translate-x-0'}`}></div>
                                                </button>
                                            </div>
                                            <div className="w-px h-6 bg-gray-200"></div>
                                            <button className="flex items-center justify-center p-2 text-gray-600 hover:text-brand-600 hover:bg-white rounded-lg transition-all shadow-sm border border-transparent hover:border-gray-200" title="Chỉnh sửa thông tin cá nhân">
                                                <Edit3 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 sticky top-24">
                            <nav className="flex flex-col gap-1">
                                <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'dashboard' ? 'bg-brand-50 text-brand-600' : 'text-gray-600 hover:bg-gray-50'}`}><LayoutDashboard size={18}/> Tổng quan</button>
                                <button onClick={() => setActiveTab('general')} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'general' ? 'bg-brand-50 text-brand-600' : 'text-gray-600 hover:bg-gray-50'}`}><UserIcon size={18}/> Hồ sơ chung</button>
                                <button onClick={() => setActiveTab('match')} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'match' ? 'bg-brand-50 text-brand-600' : 'text-gray-600 hover:bg-gray-50'}`}><Zap size={18} className={activeTab === 'match' ? 'fill-brand-600' : 'fill-none'}/> Việc phù hợp<span className="ml-auto bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full font-extrabold animate-pulse">HOT</span></button>
                                <button onClick={() => setActiveTab('cv')} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'cv' ? 'bg-brand-50 text-brand-600' : 'text-gray-600 hover:bg-gray-50'}`}><FileText size={18}/> Quản lý CV</button>
                                <button onClick={() => setActiveTab('projects')} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'projects' ? 'bg-brand-50 text-brand-600' : 'text-gray-600 hover:bg-gray-50'}`}><FolderGit2 size={18}/> Dự án cá nhân</button>
                                <button onClick={() => setActiveTab('jobs')} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'jobs' ? 'bg-brand-50 text-brand-600' : 'text-gray-600 hover:bg-gray-50'}`}><Briefcase size={18}/> Việc đã nộp</button>
                                <button onClick={() => setActiveTab('settings')} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'settings' ? 'bg-brand-50 text-brand-600' : 'text-gray-600 hover:bg-gray-50'}`}><Settings size={18}/> Cài đặt</button>
                            </nav>
                        </div>
                    </div>

                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[500px]">
                            {/* Content */}
                            {activeTab === 'dashboard' && <DashboardTab user={user} />}
                            {activeTab === 'general' && <GeneralInfoTab user={user} onSave={handleUpdateUser} />}
                            {activeTab === 'match' && <MatchedJobsTab />}
                            {activeTab === 'cv' && <CVManagerTab userId={user.id} />}
                            {activeTab === 'projects' && <ProjectsTab />}
                            {activeTab === 'jobs' && <AppliedJobsTab />}
                            {activeTab === 'settings' && <SettingsTab />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

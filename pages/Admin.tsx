
import React, { useState, useEffect } from 'react';
import { DataService } from '../services/dataService';
import { Job, HomeSectionConfig, Company, Category, JobBadge, HeaderConfig, FooterConfig } from '../types';
import { Button } from '../components/Button';
import { 
    Trash2, Edit2, Plus, Briefcase, Users, FileText, 
    BarChart3, Building, X, Monitor, Type, Palette, 
    ChevronLeft, Menu, ChevronUp, ChevronDown, Check, Star, 
    Flame, Zap, Crown, TrendingUp, Trophy, Building2, Save, Undo2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomeBuilder = () => {
    const [layout, setLayout] = useState<HomeSectionConfig[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editData, setEditData] = useState<any>({});

    useEffect(() => { setLayout(DataService.getLayout()); }, []);

    const saveEditing = (index: number) => {
        const newLayout = [...layout];
        newLayout[index] = { ...newLayout[index], ...editData };
        setLayout(newLayout);
        DataService.saveLayout(newLayout);
        setEditingId(null);
        alert("Đã lưu cấu hình trang chủ thành công!");
    };

    const updateContent = (field: string, value: any) => {
        setEditData({ ...editData, content: { ...editData.content, [field]: value } });
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-800">Quản trị Giao diện Trang chủ</h2>
            </div>
            <div className="space-y-4">
                {layout.map((section, index) => (
                    <div key={section.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <span className="bg-slate-100 text-slate-500 text-xs font-bold px-2 py-1 rounded">MỤC {index + 1}</span>
                                <h3 className="font-bold text-lg">{section.title}</h3>
                            </div>
                            <button onClick={() => { setEditingId(section.id); setEditData(section); }} className="text-brand-600 font-bold text-sm hover:underline flex items-center gap-1">
                                <Edit2 size={14}/> Tùy chỉnh
                            </button>
                        </div>

                        {editingId === section.id && (
                            <div className="mt-6 p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-6">
                                {section.type === 'hero' && (
                                    <div className="space-y-6">
                                        <div className="bg-white p-6 rounded-xl border border-brand-100 shadow-sm">
                                            <h4 className="font-bold text-brand-600 mb-4 flex items-center gap-2"><Trophy size={18}/> Cấu hình Box Thương hiệu hàng đầu</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="flex items-center gap-2 mb-2 col-span-2">
                                                    <input type="checkbox" id="showBrand" checked={editData.content?.heroBrandBoxEnabled} onChange={e => updateContent('heroBrandBoxEnabled', e.target.checked)} className="w-5 h-5 accent-brand-600" />
                                                    <label htmlFor="showBrand" className="text-sm font-bold">Hiển thị Box Logo các tập đoàn</label>
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-slate-500 uppercase">Tiêu đề hiển thị</label>
                                                    <input className="w-full border p-2 rounded-lg mt-1" value={editData.content?.heroBrandBoxTitle} onChange={e => updateContent('heroBrandBoxTitle', e.target.value)} />
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-slate-500 uppercase">Số lượng tối đa</label>
                                                    <input type="number" className="w-full border p-2 rounded-lg mt-1" value={editData.content?.heroBrandBoxLimit} onChange={e => updateContent('heroBrandBoxLimit', parseInt(e.target.value))} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="flex justify-end gap-3">
                                    <Button variant="ghost" onClick={() => setEditingId(null)}>Hủy</Button>
                                    <Button onClick={() => saveEditing(index)}>Lưu thay đổi</Button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const CompanyManager = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [current, setCurrent] = useState<any>({});

    useEffect(() => { setCompanies(DataService.getCompanies()); }, []);

    const handleSave = () => {
        DataService.saveCompany({ ...current, id: current.id || Date.now().toString() });
        setCompanies(DataService.getCompanies());
        setIsEditing(false);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-100">
                <h2 className="text-2xl font-bold">Danh sách Công ty & Đối tác</h2>
                <Button onClick={() => { setCurrent({}); setIsEditing(true); }}><Plus size={18} className="mr-2"/> Thêm mới</Button>
            </div>
            {isEditing && (
                <div className="bg-white p-6 rounded-2xl border-2 border-brand-200 shadow-xl space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input className="border p-3 rounded-xl" placeholder="Tên công ty" value={current.name || ''} onChange={e => setCurrent({...current, name: e.target.value})} />
                        <input className="border p-3 rounded-xl" placeholder="Link Logo URL (Hình ảnh màu)" value={current.logo || ''} onChange={e => setCurrent({...current, logo: e.target.value})} />
                    </div>
                    <div className="flex justify-end gap-2"><Button variant="ghost" onClick={() => setIsEditing(false)}>Hủy</Button><Button onClick={handleSave}>Lưu đối tác</Button></div>
                </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
                {companies.map(c => (
                    <div key={c.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative flex flex-col items-center justify-center aspect-square">
                        <img src={c.logo} className="w-20 h-20 object-contain group-hover:scale-110 transition-transform" />
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => { setCurrent(c); setIsEditing(true); }} className="p-1 bg-blue-50 text-blue-600 rounded"><Edit2 size={14}/></button>
                            <button onClick={() => { DataService.deleteCompany(c.id); setCompanies(DataService.getCompanies()); }} className="p-1 bg-red-50 text-red-600 rounded"><Trash2 size={14}/></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const Admin: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'home' | 'companies'>('dashboard');
    const [stats, setStats] = useState<any>({});

    useEffect(() => { setStats(DataService.getStats()); }, []);

    return (
        <div className="flex min-h-screen bg-slate-50">
            <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen sticky top-0">
                <div className="p-6 font-black text-2xl border-b border-slate-800">VUAVIECLAM <span className="text-brand-500">ADMIN</span></div>
                <div className="p-4 flex flex-col gap-2 flex-1">
                    <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold ${activeTab === 'dashboard' ? 'bg-brand-600' : 'hover:bg-slate-800'}`}><BarChart3 size={20}/> Tổng quan</button>
                    <button onClick={() => setActiveTab('home')} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold ${activeTab === 'home' ? 'bg-brand-600' : 'hover:bg-slate-800'}`}><Monitor size={20}/> Trang chủ</button>
                    <button onClick={() => setActiveTab('companies')} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold ${activeTab === 'companies' ? 'bg-brand-600' : 'hover:bg-slate-800'}`}><Building size={20}/> Đối tác / Công ty</button>
                </div>
            </aside>
            <main className="flex-1 p-8">
                {activeTab === 'dashboard' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="text-slate-500 text-sm font-bold uppercase">Tổng việc làm</h3>
                            <p className="text-4xl font-black mt-2">{stats.totalJobs}</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="text-slate-500 text-sm font-bold uppercase">Tổng đối tác</h3>
                            <p className="text-4xl font-black mt-2">{stats.totalCompanies}</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="text-slate-500 text-sm font-bold uppercase">Hồ sơ ứng tuyển</h3>
                            <p className="text-4xl font-black mt-2">{stats.totalApplications}</p>
                        </div>
                    </div>
                )}
                {activeTab === 'home' && <HomeBuilder />}
                {activeTab === 'companies' && <CompanyManager />}
            </main>
        </div>
    );
};

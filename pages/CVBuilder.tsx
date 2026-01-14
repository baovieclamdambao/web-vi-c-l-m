
import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { DataService } from '../services/dataService';
import { CVData, TemplateConfig, SavedCV, Template } from '../types';
import { 
    LayoutTemplate, Check, Download, ChevronLeft, 
    Palette, Type, User, Briefcase, GraduationCap, 
    Mail, Phone, MapPin, Globe, Sparkles, Printer, Share2,
    Star, Zap, Award, Upload, Camera, Image as ImageIcon,
    Layout, MousePointerClick, FileText, Plus, Trash2, Save, Heart, Users, CheckCircle, Eye, Edit3, Calendar, Filter, Coffee, Crown, Linkedin, X, FileEdit
} from 'lucide-react';

// --- HELPER COMPONENT: RESUME THUMBNAIL (AUTO SCALE) ---
const ResumeThumbnail = ({ Template, data, config }: { Template: React.FC<any>, data: CVData, config: TemplateConfig }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.3);

    useEffect(() => {
        const updateScale = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const a4Width = 794; 
                const newScale = containerWidth / a4Width;
                setScale(newScale);
            }
        };
        updateScale();
        const resizeObserver = new ResizeObserver(() => updateScale());
        if (containerRef.current) resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full relative bg-white overflow-hidden select-none pointer-events-none">
            <div 
                style={{ 
                    transform: `scale(${scale})`, 
                    transformOrigin: 'top left',
                    width: '794px', 
                    height: '1123px' 
                }}
                className="shadow-sm origin-top-left"
            >
                <Template data={data} config={config} />
            </div>
        </div>
    );
};

// ==========================================
// 1. MASTER MINIMAL
// ==========================================
const MasterMinimal: React.FC<{ data: CVData, config: TemplateConfig }> = ({ data, config }) => {
    const align = config.headerStyle === 'center' ? 'text-center' : 'text-left';
    const itemsAlign = config.headerStyle === 'center' ? 'justify-center' : 'justify-start';
    return (
        <div className="bg-white min-h-full p-12 text-gray-800 font-sans">
            <div className={`mb-10 ${align} border-b-2 border-gray-900 pb-6`}>
                <h1 className="text-4xl font-bold uppercase tracking-wider text-gray-900 mb-2">{data.fullName}</h1>
                <p className="text-xl text-gray-600 font-medium tracking-widest uppercase mb-4">{data.role}</p>
                <div className={`flex flex-wrap gap-4 text-sm text-gray-600 ${itemsAlign}`}>
                    {data.dob && <span>{data.dob}</span>}<span>|</span><span>{data.phone}</span><span>|</span><span>{data.email}</span><span>|</span><span>{data.address}</span>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-8">
                <section><h3 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 mb-3 pb-1 text-gray-900">Mục tiêu nghề nghiệp</h3><p className="text-sm leading-relaxed text-gray-700 text-justify">{data.summary}</p></section>
                <section><h3 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 mb-4 pb-1 text-gray-900">Kinh nghiệm làm việc</h3><div className="space-y-6">{data.experience.map(exp => (<div key={exp.id} className="grid grid-cols-12 gap-4"><div className="col-span-3 text-sm font-bold text-gray-500 pt-1">{exp.date}</div><div className="col-span-9"><h4 className="font-bold text-lg text-gray-800">{exp.role}</h4><div className="text-sm font-semibold text-gray-600 mb-2 uppercase">{exp.company}</div><p className="text-sm text-gray-700 whitespace-pre-line">{exp.description}</p></div></div>))}</div></section>
                <div className="grid grid-cols-2 gap-8"><section><h3 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 mb-4 pb-1 text-gray-900">Học vấn</h3><div className="space-y-4">{data.education.map(edu => (<div key={edu.id}><h4 className="font-bold text-gray-800">{edu.school}</h4><div className="text-sm text-gray-600">{edu.degree}</div><div className="text-xs text-gray-500 italic mt-1">{edu.date}</div></div>))}</div></section><section><h3 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 mb-4 pb-1 text-gray-900">Kỹ năng</h3><div className="flex flex-wrap gap-2">{data.skills.map((s, i) => (<span key={i} className="bg-gray-100 px-3 py-1 text-sm text-gray-700 rounded-md font-medium">{s}</span>))}</div></section></div>
            </div>
        </div>
    );
};

// ==========================================
// 2. LAYOUT SIDEBAR (MODERN)
// ==========================================
const MasterModern: React.FC<{ data: CVData, config: TemplateConfig }> = ({ data, config }) => {
    const isRight = config.layout === 'right-sidebar';
    const bgColor = config.accentColor;
    const fontClass = config.font === 'serif' ? 'font-serif' : 'font-sans';
    const isDarkSidebar = bgColor.includes('slate-900') || bgColor.includes('gray-900') || bgColor.includes('blue-900');
    const textColor = isDarkSidebar ? 'text-white' : 'text-gray-800';
    const subTextColor = isDarkSidebar ? 'text-gray-300' : 'text-gray-600';

    return (
        <div className={`bg-white min-h-full flex ${fontClass} ${isRight ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-[35%] ${bgColor} p-8 flex flex-col ${textColor}`}>
                <div className="flex flex-col items-center mb-8"><img src={data.avatar} className={`w-36 h-36 object-cover mb-4 border-4 border-white/20 shadow-lg ${config.imageShape === 'circle' ? 'rounded-full' : 'rounded-xl'}`}/>{config.layout === 'left-sidebar' && (<><h2 className="text-xl font-bold uppercase text-center leading-tight">{data.fullName}</h2><p className={`text-sm text-center uppercase tracking-wide mt-2 font-medium ${subTextColor}`}>{data.role}</p></>)}</div>
                <div className="space-y-8 text-sm"><div><h3 className={`font-bold uppercase tracking-wider mb-4 border-b ${isDarkSidebar ? 'border-white/20' : 'border-gray-300'} pb-1`}>Thông tin</h3><div className={`space-y-3 ${subTextColor}`}>{data.dob && <div className="flex gap-3 items-center"><Calendar size={14}/> <span>{data.dob}</span></div>}<div className="flex gap-3 items-center"><Phone size={14}/> <span>{data.phone}</span></div><div className="flex gap-3 items-center"><Mail size={14}/> <span className="break-all">{data.email}</span></div><div className="flex gap-3 items-center"><MapPin size={14}/> <span>{data.address}</span></div></div></div><div><h3 className={`font-bold uppercase tracking-wider mb-4 border-b ${isDarkSidebar ? 'border-white/20' : 'border-gray-300'} pb-1`}>Kỹ năng</h3><div className="flex flex-wrap gap-2">{data.skills.map((skill, i) => (<span key={i} className={`${isDarkSidebar ? 'bg-white/10' : 'bg-black/5'} px-3 py-1.5 rounded text-xs font-medium`}>{skill}</span>))}</div></div></div>
            </div>
            <div className="flex-1 p-10 text-gray-800">
                {config.layout === 'right-sidebar' && (<div className="mb-10 border-b-2 border-gray-100 pb-6"><h1 className="text-4xl font-extrabold uppercase text-gray-900 mb-2">{data.fullName}</h1><p className="text-lg text-brand-600 font-bold uppercase tracking-widest">{data.role}</p></div>)}
                <section className="mb-8"><h3 className="text-xl font-bold uppercase mb-4 flex items-center gap-2 text-gray-900 border-b-2 border-gray-100 pb-2"><span className={`p-1.5 rounded text-white ${bgColor.replace('bg-', 'bg-').split(' ')[0]}`}><User size={16}/></span> Giới thiệu</h3><p className="text-sm leading-relaxed text-gray-600 text-justify">{data.summary}</p></section>
                <section className="mb-8"><h3 className="text-xl font-bold uppercase mb-6 flex items-center gap-2 text-gray-900 border-b-2 border-gray-100 pb-2"><span className={`p-1.5 rounded text-white ${bgColor.replace('bg-', 'bg-').split(' ')[0]}`}><Briefcase size={16}/></span> Kinh nghiệm làm việc</h3><div className="space-y-6">{data.experience.map(exp => (<div key={exp.id} className="relative pl-6 border-l-2 border-gray-200 hover:border-gray-400 transition-colors"><div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${bgColor.replace('bg-', 'bg-').split(' ')[0]}`}></div><div className="flex justify-between items-baseline mb-1"><h4 className="font-bold text-lg text-gray-800">{exp.role}</h4><span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{exp.date}</span></div><div className="text-sm font-bold text-gray-500 mb-2 uppercase">{exp.company}</div><p className="text-sm text-gray-600 whitespace-pre-line">{exp.description}</p></div>))}</div></section>
            </div>
        </div>
    );
};

// ==========================================
// 3. MASTER PROFESSIONAL (CHUYÊN NGHIỆP)
// ==========================================
const MasterProfessional: React.FC<{ data: CVData, config: TemplateConfig }> = ({ data, config }) => {
    const textColor = config.accentColor.replace('bg-', 'text-');
    const borderColor = config.accentColor.replace('bg-', 'border-');
    return (
        <div className="bg-white min-h-full p-10 font-serif text-gray-800 relative">
            <div className={`absolute top-0 left-0 w-full h-2 ${config.accentColor}`}></div>
            <div className="flex gap-6 items-start mb-8 mt-4"><div className="flex-1"><h1 className={`text-4xl font-extrabold uppercase mb-1 ${textColor}`}>{data.fullName}</h1><p className="text-lg font-bold text-gray-600 uppercase tracking-widest mb-4">{data.role}</p><div className="grid grid-cols-2 gap-y-1 gap-x-4 text-sm text-gray-600 border-t border-b border-gray-200 py-3"><div className="flex items-center gap-2"><Phone size={14}/> {data.phone}</div><div className="flex items-center gap-2"><Mail size={14}/> {data.email}</div><div className="flex items-center gap-2"><MapPin size={14}/> {data.address}</div>{data.website && <div className="flex items-center gap-2"><Globe size={14}/> {data.website}</div>}</div></div>{config.imageShape !== 'blob' && (<img src={data.avatar} className="w-32 h-32 object-cover border border-gray-200 shadow-sm p-1 bg-white flex-shrink-0"/>)}</div>
            <div className="grid grid-cols-12 gap-8"><div className="col-span-8 space-y-6"><section><h3 className={`text-lg font-bold uppercase border-b-2 ${borderColor} mb-3 pb-1 flex items-center gap-2`}><span className={`${config.accentColor} text-white p-1 rounded-sm`}><User size={14}/></span> Hồ sơ chuyên môn</h3><p className="text-sm leading-relaxed text-justify text-gray-700">{data.summary}</p></section><section><h3 className={`text-lg font-bold uppercase border-b-2 ${borderColor} mb-4 pb-1 flex items-center gap-2`}><span className={`${config.accentColor} text-white p-1 rounded-sm`}><Briefcase size={14}/></span> Kinh nghiệm làm việc</h3><div className="space-y-6">{data.experience.map(exp => (<div key={exp.id}><div className="flex justify-between items-end mb-1"><h4 className="font-bold text-base text-gray-900 uppercase">{exp.company}</h4><span className="text-sm font-semibold text-gray-500">{exp.date}</span></div><div className={`text-sm font-bold italic mb-2 ${textColor}`}>{exp.role}</div><ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1">{exp.description.split('\n').map((line, i) => (line.trim() && <li key={i}>{line}</li>))}</ul></div>))}</div></section></div><div className="col-span-4 space-y-6"><section className="bg-gray-50 p-4 rounded-sm border-t-4 border-gray-300"><h3 className="font-bold uppercase text-gray-900 mb-3 border-b border-gray-300 pb-1">Học vấn</h3>{data.education.map(edu => (<div key={edu.id} className="mb-3 last:mb-0"><div className="font-bold text-sm text-gray-800">{edu.school}</div><div className="text-xs text-gray-500 mb-1">{edu.date}</div><div className="text-sm text-gray-700">{edu.degree}</div></div>))}</section><section><h3 className="font-bold uppercase text-gray-900 mb-3 border-b border-gray-300 pb-1">Kỹ năng</h3><div className="space-y-2">{data.skills.map((s, i) => (<div key={i} className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${config.accentColor}`}></div><span className="text-sm text-gray-700">{s}</span></div>))}</div></section></div></div>
        </div>
    );
};

// ==========================================
// 4. MASTER CREATIVE (GEN Z)
// ==========================================
const MasterCreative: React.FC<{ data: CVData, config: TemplateConfig }> = ({ data, config }) => {
    const gradient = config.accentColor.includes('gradient') ? config.accentColor : `bg-gradient-to-br from-gray-900 to-black`;
    return (
        <div className="bg-white min-h-full font-sans relative flex flex-col h-full">
            <div className={`${gradient} text-white p-10 pb-20 relative`} style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}><div className="flex items-center gap-8"><div className="relative group"><div className="absolute -inset-1 bg-white rounded-full opacity-30 blur group-hover:opacity-50 transition duration-200"></div><img src={data.avatar} className="w-32 h-32 object-cover rounded-full border-4 border-white/50 relative shadow-2xl" /></div><div><h1 className="text-5xl font-black tracking-tighter mb-2 shadow-black drop-shadow-lg">{data.fullName}</h1><span className="inline-block bg-white text-black px-4 py-1 font-bold uppercase tracking-widest text-sm transform -rotate-2 shadow-lg">{data.role}</span></div></div></div>
            <div className="flex-1 px-8 grid grid-cols-12 gap-8 -mt-8 relative z-10"><div className="col-span-4 space-y-6"><div className="bg-white p-5 rounded-2xl shadow-xl border border-gray-100"><h3 className="font-black text-lg uppercase mb-4 flex items-center gap-2 text-gray-800"><span className="w-2 h-6 bg-black rounded-full"></span> Liên hệ</h3><div className="space-y-3 text-sm font-medium text-gray-600"><div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg"><Mail size={16}/> <span className="truncate">{data.email}</span></div><div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg"><Phone size={16}/> <span>{data.phone}</span></div><div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg"><MapPin size={16}/> <span>{data.address}</span></div>{data.dob && <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg"><Calendar size={16}/> <span>{data.dob}</span></div>}</div></div><div className="bg-black text-white p-5 rounded-2xl shadow-xl"><h3 className="font-black text-lg uppercase mb-4 text-white border-b border-gray-700 pb-2">Vũ khí (Skills)</h3><div className="flex flex-wrap gap-2">{data.skills.map((s, i) => (<span key={i} className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-xs font-bold hover:bg-white hover:text-black transition-colors cursor-default">#{s}</span>))}</div></div></div><div className="col-span-8 space-y-8 pt-6"><div><h3 className="font-black text-2xl uppercase mb-4 italic text-gray-900 flex items-end gap-2">About Me <div className="h-2 w-12 bg-black mb-1"></div></h3><p className="text-gray-600 font-medium leading-relaxed bg-white p-4 rounded-xl border-l-4 border-black shadow-sm">{data.summary}</p></div><div><h3 className="font-black text-2xl uppercase mb-6 italic text-gray-900 flex items-end gap-2">Experience <div className="h-2 w-12 bg-black mb-1"></div></h3><div className="space-y-6">{data.experience.map((exp, idx) => (<div key={exp.id} className="relative pl-8 group"><div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200 group-hover:bg-black transition-colors"></div><div className="absolute left-[-5px] top-2 w-3 h-3 rounded-full bg-black border-2 border-white shadow-sm group-hover:scale-125 transition-transform"></div><div className="flex justify-between items-start"><h4 className="font-black text-xl text-gray-800 group-hover:text-black transition-colors">{exp.role}</h4><span className="text-xs font-black bg-black text-white px-3 py-1 rounded-full">{exp.date}</span></div><div className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">{exp.company}</div><p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{exp.description}</p></div>))}</div></div></div></div>
        </div>
    );
};

// --- INITIAL DATA ---
const INITIAL_DATA: CVData = {
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    fullName: "Nguyễn Trúc Quỳnh My",
    role: "Senior Marketing Executive",
    dob: "15/05/1997",
    email: "quynhmy.nguyen@email.com",
    phone: "0909 123 456",
    address: "Quận 1, TP. Hồ Chí Minh",
    website: "linkedin.com/in/quynhmy",
    summary: "Chuyên viên Marketing với 4 năm kinh nghiệm trong lĩnh vực Digital Marketing và quản lý thương hiệu. Có tư duy chiến lược, khả năng sáng tạo nội dung và phân tích dữ liệu tốt.",
    skills: ["Digital Marketing", "Content Strategy", "Google Analytics", "SEO/SEM", "Team Leadership"],
    experience: [
        {
            id: 1,
            company: "Global Tech Solutions",
            role: "Marketing Team Leader",
            date: "2021 - Hiện tại",
            description: "Chịu trách nhiệm lập kế hoạch và triển khai các chiến dịch quảng cáo đa kênh.\nQuản lý ngân sách marketing 500 triệu/tháng."
        },
        {
            id: 2,
            company: "Creative Agency XYZ",
            role: "Content Creator",
            date: "2019 - 2021",
            description: "Sáng tạo nội dung cho các kênh Social Media của khách hàng.\nTăng lượng tương tác organic lên 150%."
        }
    ],
    education: [
        {
            id: 1,
            school: "Đại học Kinh Tế TP.HCM",
            degree: "Cử nhân Quản trị Kinh doanh",
            date: "2015 - 2019"
        }
    ],
    hobbies: "Đọc sách, Du lịch, Yoga.",
    activities: [
        {
            id: 1,
            organization: "CLB Marketing Trẻ",
            role: "Phó chủ nhiệm",
            date: "2017 - 2018",
            description: "Tổ chức cuộc thi Marketing Arena."
        }
    ]
};

// --- GENERATE TEMPLATES ---
const generateTemplates = (): (Template & { badge?: string })[] => {
    const list: (Template & { badge?: string })[] = [];

    // 1. SIMPLE (MasterMinimal)
    list.push({ id: 'sim_1', name: 'Đơn giản 1', description: 'Cổ điển', type: 'simple', tags: ['Classic'], badge: 'HOT', config: { layout: 'minimal', headerStyle: 'center', imageShape: 'circle', accentColor: 'bg-gray-800', font: 'sans' }, component: MasterMinimal });
    list.push({ id: 'sim_2', name: 'Đơn giản 2', description: 'Thanh lịch', type: 'simple', tags: ['Elegant'], config: { layout: 'minimal', headerStyle: 'center', imageShape: 'rounded', accentColor: 'bg-white', font: 'serif' }, component: MasterMinimal }); // Reusing minimal
    
    // 2. MODERN (MasterModern)
    list.push({ id: 'mod_1', name: 'Hiện đại 1', description: 'Xanh Navy', type: 'modern', tags: ['Navy'], badge: 'NEW', config: { layout: 'left-sidebar', headerStyle: 'left', imageShape: 'circle', accentColor: 'bg-blue-900', font: 'sans' }, component: MasterModern });
    list.push({ id: 'mod_2', name: 'Hiện đại 2', description: 'Teal Side', type: 'modern', tags: ['Teal'], config: { layout: 'right-sidebar', headerStyle: 'left', imageShape: 'rounded', accentColor: 'bg-teal-700', font: 'sans' }, component: MasterModern });

    // 3. PROFESSIONAL (MasterProfessional)
    list.push({ id: 'pro_1', name: 'Chuyên nghiệp 1', description: 'Executive', type: 'professional', tags: ['Executive'], badge: 'PRO', config: { layout: 'minimal', headerStyle: 'center', imageShape: 'square', accentColor: 'bg-slate-800', font: 'serif' }, component: MasterProfessional });
    list.push({ id: 'pro_2', name: 'Chuyên nghiệp 2', description: 'Beige Paper', type: 'professional', tags: ['Paper'], config: { layout: 'minimal', headerStyle: 'center', imageShape: 'circle', accentColor: 'bg-white', font: 'serif' }, component: MasterProfessional });

    // 4. CREATIVE (MasterCreative)
    list.push({ id: 'genz_1', name: 'Sáng tạo 1', description: 'Dark Mode', type: 'genz', tags: ['Dark', 'Gold'], badge: 'HOT', config: { layout: 'full-width', headerStyle: 'creative', imageShape: 'rounded', accentColor: 'bg-black text-yellow-400', font: 'sans' }, component: MasterCreative });
    list.push({ id: 'genz_2', name: 'Sáng tạo 2', description: 'Neon Pink', type: 'genz', tags: ['Neon'], config: { layout: 'full-width', headerStyle: 'creative', imageShape: 'blob', accentColor: 'bg-pink-600', font: 'sans' }, component: MasterCreative });

    return list;
};

const TEMPLATES_LIST = generateTemplates();

export const CVBuilder: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const cvIdParam = searchParams.get('id');

    const [step, setStep] = useState<'selection' | 'editor'>('selection');
    const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'professional' | 'modern' | 'genz' | 'simple'>('all');
    
    // Data State
    const [cvData, setCvData] = useState<CVData>(INITIAL_DATA);
    const [currentConfig, setCurrentConfig] = useState<TemplateConfig | null>(null);
    const [cvName, setCvName] = useState('CV của tôi');
    const [isSaving, setIsSaving] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [cvOwnerId, setCvOwnerId] = useState<string | null>(null);
    
    // Mobile Tab State
    const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit');
    // Preview Scaling State
    const [previewScale, setPreviewScale] = useState(1);

    // Auto Scale Logic for Preview
    useEffect(() => {
        const calculateScale = () => {
            if (window.innerWidth < 1024) { // Mobile & Tablet
                // A4 width in px is approx 794px. Subtract padding (32px)
                const availableWidth = window.innerWidth - 32;
                const scale = availableWidth / 794;
                setPreviewScale(scale > 1 ? 1 : scale);
            } else {
                setPreviewScale(0.65); // Desktop default scale
            }
        };
        calculateScale();
        window.addEventListener('resize', calculateScale);
        return () => window.removeEventListener('resize', calculateScale);
    }, []);

    // Load existing CV if ID is present
    useEffect(() => {
        if (cvIdParam) {
            const savedCV = DataService.getCVById(cvIdParam);
            if (savedCV) {
                setCvData(savedCV.data);
                setCurrentConfig(savedCV.config);
                setSelectedTemplateId(savedCV.templateId);
                setCvName(savedCV.name);
                setCvOwnerId(savedCV.userId); 
                setStep('editor');
            }
        }
    }, [cvIdParam]);
    
    const handlePrint = () => {
        const originalTitle = document.title;
        document.title = `CV_${cvData.fullName.replace(/\s+/g, '_')}_${new Date().getFullYear()}`;
        window.print();
        document.title = originalTitle;
    };

    const updateData = (field: keyof CVData, value: any) => {
        setCvData(prev => ({ ...prev, [field]: value }));
    };

    const addExperience = () => {
        const newExp = { id: Date.now(), company: 'Tên công ty', role: 'Chức danh', date: '2023 - Hiện tại', description: 'Mô tả công việc...' };
        updateData('experience', [newExp, ...cvData.experience]);
    };
    const removeExperience = (id: number) => {
        updateData('experience', cvData.experience.filter(e => e.id !== id));
    };
    const handleExperienceChange = (id: number, field: string, value: string) => {
        const newExp = cvData.experience.map(e => e.id === id ? { ...e, [field]: value } : e);
        updateData('experience', newExp);
    };

    const addEducation = () => {
        const newEdu = { id: Date.now(), school: 'Tên trường / Trung tâm', degree: 'Bằng cấp / Chứng chỉ', date: '2019 - 2023' };
        updateData('education', [newEdu, ...cvData.education]);
    };
    const removeEducation = (id: number) => {
        updateData('education', cvData.education.filter(e => e.id !== id));
    };
    const handleEducationChange = (id: number, field: string, value: string) => {
        const newEdu = cvData.education.map(e => e.id === id ? { ...e, [field]: value } : e);
        updateData('education', newEdu);
    };

    const addActivity = () => {
        const newAct = { id: Date.now(), organization: 'Tên tổ chức / CLB', role: 'Vị trí', date: '2020 - 2021', description: 'Mô tả hoạt động...' };
        updateData('activities', [newAct, ...(cvData.activities || [])]);
    };
    const removeActivity = (id: number) => {
        updateData('activities', (cvData.activities || []).filter(a => a.id !== id));
    };
    const handleActivityChange = (id: number, field: string, value: string) => {
        const newAct = (cvData.activities || []).map(a => a.id === id ? { ...a, [field]: value } : a);
        updateData('activities', newAct);
    };

    const handleSaveCV = () => {
        const user = DataService.getCurrentUser();
        if (!user) {
            alert("Vui lòng đăng nhập để lưu CV!");
            navigate('/auth');
            return;
        }
        setIsSaving(true);
        const template = TEMPLATES_LIST.find(t => t.id === selectedTemplateId);
        
        const cvId = cvIdParam || Date.now().toString();
        const ownerId = cvOwnerId || user.id;

        const newCV: SavedCV = {
            id: cvId,
            userId: ownerId,
            name: cvName,
            templateId: selectedTemplateId,
            data: cvData,
            config: currentConfig || template?.config!,
            updatedAt: new Date().toLocaleString('vi-VN')
        };
        
        DataService.saveCV(newCV);
        
        if (!cvIdParam) {
            setSearchParams({ id: cvId });
            setCvOwnerId(user.id);
        }

        setTimeout(() => {
            setIsSaving(false);
            setShowToast(true);
            setMobileTab('preview'); // <--- Auto switch to preview mode on mobile after save
            setTimeout(() => setShowToast(false), 3000);
        }, 500);
    };

    const filteredTemplates = selectedCategory === 'all' ? TEMPLATES_LIST : TEMPLATES_LIST.filter(t => t.type === selectedCategory);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => updateData('avatar', reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    // --- SELECTION SCREEN ---
    if (step === 'selection') {
        const categories = [
            { id: 'all', label: 'Tất cả', icon: Layout },
            { id: 'simple', label: 'Đơn giản', icon: FileText },
            { id: 'modern', label: 'Hiện đại', icon: Zap },
            { id: 'professional', label: 'Chuyên nghiệp', icon: Briefcase },
            { id: 'genz', label: 'Sáng tạo', icon: Sparkles },
        ];

        return (
            <div className="min-h-screen bg-slate-50 pt-8 pb-20 font-sans">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 md:mb-10">
                        <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-gray-200 shadow-sm mb-4">
                            <Star size={16} className="text-yellow-500 fill-yellow-500"/>
                            <span className="text-sm font-bold text-gray-700">Kho mẫu CV chuẩn ATS & GenZ</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Chọn mẫu CV ưng ý nhất</h1>
                        <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
                            Hơn 20+ mẫu CV được thiết kế chuyên nghiệp giúp bạn nổi bật trước nhà tuyển dụng.
                        </p>
                    </div>

                    <div className="flex justify-start md:justify-center mb-8 md:mb-12 sticky top-20 z-30 overflow-x-auto pb-4 md:pb-0 px-2">
                        <div className="bg-white p-1.5 rounded-full shadow-lg border border-gray-100 flex justify-start md:justify-center gap-1 min-w-max">
                            {categories.map((cat) => {
                                const Icon = cat.icon;
                                const isActive = selectedCategory === cat.id;
                                return (
                                    <button 
                                        key={cat.id} 
                                        onClick={() => setSelectedCategory(cat.id as any)} 
                                        className={`flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                                            isActive 
                                            ? 'bg-slate-900 text-white shadow-md transform scale-105' 
                                            : 'bg-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                    >
                                        <Icon size={16} className={isActive ? 'text-white' : 'text-slate-400'} />
                                        {cat.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 pb-20">
                        {filteredTemplates.map(template => (
                            <div key={template.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col h-full relative ring-1 ring-slate-100 hover:ring-brand-500/30 overflow-hidden transform hover:-translate-y-1">
                                {template.badge && (
                                    <div className={`absolute top-0 right-0 z-20 px-3 py-1 rounded-bl-xl text-xs font-black text-white shadow-md ${
                                        template.badge === 'NEW' ? 'bg-blue-500' : 
                                        template.badge === 'HOT' ? 'bg-red-500' : 'bg-purple-600'
                                    }`}>
                                        {template.badge}
                                    </div>
                                )}
                                <div className="aspect-[210/297] w-full relative overflow-hidden bg-slate-100 cursor-pointer" onClick={() => { setSelectedTemplateId(template.id); setCurrentConfig(template.config); setStep('editor'); }}>
                                     <div className="w-full h-full transform transition-transform duration-500 group-hover:scale-105">
                                        <ResumeThumbnail Template={template.component} data={INITIAL_DATA} config={template.config} />
                                     </div>
                                     <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                         <Button className="rounded-full px-8 py-3 shadow-2xl bg-white text-slate-900 hover:bg-brand-50 border-none font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                             Dùng mẫu này
                                         </Button>
                                     </div>
                                </div>
                                <div className="p-4 bg-white border-t border-slate-50">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-slate-800 text-base truncate pr-2">{template.name}</h3>
                                        <div className={`w-4 h-4 rounded-full ${template.config.accentColor.includes('gradient') ? 'bg-gradient-to-r from-pink-500 to-purple-500' : template.config.accentColor.split(' ')[0]}`}></div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {template.tags.slice(0, 2).map((tag, i) => (
                                            <span key={i} className="text-[10px] font-semibold bg-slate-100 text-slate-500 px-2 py-1 rounded-md border border-slate-200">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // --- EDITOR SCREEN ---
    const selectedTemplate = TEMPLATES_LIST.find(t => t.id === selectedTemplateId);
    const ActiveComponent = selectedTemplate?.component || MasterMinimal;
    const activeConfig = currentConfig || selectedTemplate?.config || { layout: 'minimal', headerStyle: 'left', imageShape: 'square', accentColor: 'bg-gray-800', font: 'sans' };

    return (
        <div className="h-screen bg-gray-100 flex flex-col overflow-hidden font-sans relative">
            
            {/* TOAST NOTIFICATION */}
            <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out toast-notification ${showToast ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
                <div className="bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-white/20 backdrop-blur-md">
                    <CheckCircle className="text-green-400" size={20} />
                    <span className="font-bold text-sm">Đã lưu CV vào Quản lý hồ sơ</span>
                </div>
            </div>

            {/* TOP TOOLBAR */}
            <div className="toolbar bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center shrink-0 z-20 shadow-sm print:hidden">
                <div className="flex items-center gap-3">
                    <button onClick={() => setStep('selection')} className="flex items-center text-gray-500 hover:text-brand-600 transition-colors">
                        <ChevronLeft size={20}/> <span className="text-sm font-bold ml-1 hidden md:inline">Đổi mẫu</span>
                    </button>
                    <div className="h-6 w-px bg-gray-200"></div>
                    <input 
                        className="border-b border-transparent focus:border-brand-500 focus:outline-none font-bold text-gray-700 w-24 md:w-48 bg-transparent text-sm md:text-base truncate"
                        value={cvName}
                        onChange={(e) => setCvName(e.target.value)}
                        placeholder="Tên hồ sơ..."
                    />
                </div>
                
                <div className="flex gap-2">
                    {/* Save Button - Visible on Mobile too */}
                    <Button variant="outline" size="sm" onClick={handleSaveCV} disabled={isSaving} className="flex items-center">
                        <Save size={16} className="md:mr-1"/> <span className="hidden md:inline">{isSaving ? 'Đang lưu...' : 'Lưu'}</span>
                    </Button>

                    {/* Desktop Download */}
                    <Button onClick={handlePrint} size="sm" className="hidden md:flex">
                        <Download size={16} className="mr-1"/> Tải CV (PDF)
                    </Button>
                    
                    {/* Mobile Download */}
                    <Button onClick={handlePrint} size="sm" className="md:hidden bg-brand-600 text-white">
                        <Download size={16}/>
                    </Button>
                </div>
            </div>

            {/* MOBILE BOTTOM NAVIGATION */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 flex print:hidden">
                <button 
                    onClick={() => setMobileTab('edit')} 
                    className={`flex-1 py-3 flex flex-col items-center gap-1 ${mobileTab === 'edit' ? 'text-brand-600 bg-brand-50' : 'text-gray-500'}`}
                >
                    <FileEdit size={20} />
                    <span className="text-xs font-bold">Sửa CV</span>
                </button>
                <button 
                    onClick={() => setMobileTab('preview')} 
                    className={`flex-1 py-3 flex flex-col items-center gap-1 ${mobileTab === 'preview' ? 'text-brand-600 bg-brand-50' : 'text-gray-500'}`}
                >
                    <Eye size={20} />
                    <span className="text-xs font-bold">Xem trước</span>
                </button>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="flex flex-1 overflow-hidden relative">
                
                {/* 1. EDITOR PANEL (SIDEBAR) */}
                {/* On Mobile: Visible only if tab is 'edit' */}
                <div className={`
                    sidebar-input 
                    w-full md:w-[450px] 
                    bg-white border-r border-gray-200 
                    overflow-y-auto 
                    p-4 md:p-6 
                    shadow-[4px_0_24px_rgba(0,0,0,0.02)] 
                    z-10 custom-scrollbar 
                    print:hidden
                    pb-20 md:pb-6
                    ${mobileTab === 'edit' ? 'block' : 'hidden md:block'}
                `}>
                    <div className="mb-8 flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="relative group cursor-pointer">
                            <img src={cvData.avatar} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md" />
                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Camera size={16} className="text-white"/></div>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleImageUpload} />
                        </div>
                        <div><h3 className="text-sm font-bold text-gray-800">Ảnh hồ sơ</h3></div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold uppercase text-gray-500 flex items-center gap-2 border-b pb-2"><User size={14}/> Thông tin cá nhân</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <input className="col-span-2 w-full border p-2 rounded text-sm outline-none focus:border-brand-500 bg-white text-gray-900" placeholder="Họ tên" value={cvData.fullName} onChange={e => updateData('fullName', e.target.value)} />
                                <input className="col-span-2 w-full border p-2 rounded text-sm outline-none focus:border-brand-500 bg-white text-gray-900" placeholder="Vị trí ứng tuyển" value={cvData.role} onChange={e => updateData('role', e.target.value)} />
                                <input className="w-full border p-2 rounded text-sm outline-none focus:border-brand-500 bg-white text-gray-900" placeholder="Ngày sinh" value={cvData.dob || ''} onChange={e => updateData('dob', e.target.value)} />
                                <input className="w-full border p-2 rounded text-sm outline-none focus:border-brand-500 bg-white text-gray-900" placeholder="Số điện thoại" value={cvData.phone} onChange={e => updateData('phone', e.target.value)} />
                                <input className="col-span-2 w-full border p-2 rounded text-sm outline-none focus:border-brand-500 bg-white text-gray-900" placeholder="Email" value={cvData.email} onChange={e => updateData('email', e.target.value)} />
                                <input className="col-span-2 w-full border p-2 rounded text-sm outline-none focus:border-brand-500 bg-white text-gray-900" placeholder="Địa chỉ" value={cvData.address} onChange={e => updateData('address', e.target.value)} />
                                <textarea className="col-span-2 w-full border p-2 rounded text-sm h-24 outline-none focus:border-brand-500 bg-white text-gray-900" placeholder="Giới thiệu bản thân" value={cvData.summary} onChange={e => updateData('summary', e.target.value)} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b pb-2">
                                <h3 className="text-sm font-bold uppercase text-gray-500 flex items-center gap-2"><Briefcase size={14}/> Kinh nghiệm</h3>
                                <button onClick={addExperience} className="text-xs text-brand-600 font-bold hover:bg-brand-50 px-2 py-1 rounded transition-colors flex items-center gap-1"><Plus size={12}/> Thêm</button>
                            </div>
                            {cvData.experience.map(exp => (
                                <div key={exp.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-2 relative group">
                                    <button onClick={() => removeExperience(exp.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500"><Trash2 size={14}/></button>
                                    <input className="w-full border p-1.5 rounded text-sm font-bold bg-white" value={exp.role} onChange={e => handleExperienceChange(exp.id, 'role', e.target.value)} placeholder="Chức danh" />
                                    <div className="flex gap-2">
                                        <input className="w-full border p-1.5 rounded text-xs bg-white" value={exp.company} onChange={e => handleExperienceChange(exp.id, 'company', e.target.value)} placeholder="Công ty" />
                                        <input className="w-full border p-1.5 rounded text-xs bg-white" value={exp.date} onChange={e => handleExperienceChange(exp.id, 'date', e.target.value)} placeholder="Thời gian" />
                                    </div>
                                    <textarea className="w-full border p-1.5 rounded text-xs h-20 bg-white" value={exp.description} onChange={e => handleExperienceChange(exp.id, 'description', e.target.value)} placeholder="Mô tả công việc" />
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b pb-2">
                                <h3 className="text-sm font-bold uppercase text-gray-500 flex items-center gap-2"><GraduationCap size={14}/> Học vấn</h3>
                                <button onClick={addEducation} className="text-xs text-brand-600 font-bold hover:bg-brand-50 px-2 py-1 rounded transition-colors flex items-center gap-1"><Plus size={12}/> Thêm</button>
                            </div>
                            {cvData.education.map(edu => (
                                <div key={edu.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-2 relative group">
                                    <button onClick={() => removeEducation(edu.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500"><Trash2 size={14}/></button>
                                    <input className="w-full border p-1.5 rounded text-sm font-bold bg-white" value={edu.school} onChange={e => handleEducationChange(edu.id, 'school', e.target.value)} placeholder="Trường học" />
                                    <input className="w-full border p-1.5 rounded text-xs bg-white" value={edu.degree} onChange={e => handleEducationChange(edu.id, 'degree', e.target.value)} placeholder="Bằng cấp" />
                                    <input className="w-full border p-1.5 rounded text-xs bg-white" value={edu.date} onChange={e => handleEducationChange(edu.id, 'date', e.target.value)} placeholder="Niên khóa" />
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b pb-2">
                                <h3 className="text-sm font-bold uppercase text-gray-500 flex items-center gap-2"><Users size={14}/> Hoạt động xã hội</h3>
                                <button onClick={addActivity} className="text-xs text-brand-600 font-bold hover:bg-brand-50 px-2 py-1 rounded transition-colors flex items-center gap-1"><Plus size={12}/> Thêm</button>
                            </div>
                            {(cvData.activities || []).map(act => (
                                <div key={act.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-2 relative group">
                                    <button onClick={() => removeActivity(act.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500"><Trash2 size={14}/></button>
                                    <input className="w-full border p-1.5 rounded text-sm font-bold bg-white" value={act.organization} onChange={e => handleActivityChange(act.id, 'organization', e.target.value)} placeholder="Tổ chức / Câu lạc bộ" />
                                    <div className="flex gap-2">
                                        <input className="w-full border p-1.5 rounded text-xs bg-white" value={act.role} onChange={e => handleActivityChange(act.id, 'role', e.target.value)} placeholder="Vị trí / Vai trò" />
                                        <input className="w-full border p-1.5 rounded text-xs bg-white" value={act.date} onChange={e => handleActivityChange(act.id, 'date', e.target.value)} placeholder="Thời gian" />
                                    </div>
                                    <textarea className="w-full border p-1.5 rounded text-xs h-20 bg-white" value={act.description} onChange={e => handleActivityChange(act.id, 'description', e.target.value)} placeholder="Mô tả hoạt động" />
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-bold uppercase text-gray-500 flex items-center gap-2 border-b pb-2"><Sparkles size={14}/> Kỹ năng</h3>
                            <textarea 
                                className="w-full border p-2 rounded text-sm h-20 outline-none focus:border-brand-500 bg-white text-gray-900" 
                                value={cvData.skills.join(', ')} 
                                onChange={e => updateData('skills', e.target.value.split(',').map(s => s.trim()))} 
                                placeholder="Nhập kỹ năng, phân cách bằng dấu phẩy..."
                            />
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-bold uppercase text-gray-500 flex items-center gap-2 border-b pb-2"><Heart size={14}/> Sở thích</h3>
                            <textarea 
                                className="w-full border p-2 rounded text-sm h-20 outline-none focus:border-brand-500 bg-white text-gray-900" 
                                value={cvData.hobbies || ''} 
                                onChange={e => updateData('hobbies', e.target.value)} 
                                placeholder="Viết về sở thích của bạn..."
                            />
                        </div>
                    </div>
                </div>

                {/* 2. PREVIEW PANEL */}
                {/* On Mobile: Visible only if tab is 'preview'. Always visible when printing. */}
                <div className={`
                    flex-1 bg-gray-200 
                    p-4 md:p-8 
                    overflow-y-auto 
                    justify-center items-start 
                    transition-all duration-300 
                    ${mobileTab === 'preview' ? 'flex' : 'hidden md:flex'}
                    print:bg-white print:p-0 print:overflow-visible print:!flex print:!visible print:!w-full print:!h-full print:!fixed print:!inset-0 print:!z-[9999]
                `}>
                    <div 
                        id="resume-preview" 
                        className={`
                            bg-white shadow-2xl origin-top transition-transform duration-300 
                            w-[794px] min-h-[1123px]
                            print:shadow-none print:transform-none print:w-[210mm] print:min-h-[297mm] print:m-0
                        `}
                        style={{ 
                            // Auto-scale for mobile/tablet based on state
                            transform: `scale(${previewScale})`,
                            marginTop: 0,
                            marginBottom: '6rem' // Space for bottom nav on mobile
                        }}
                    >
                        <ActiveComponent data={cvData} config={activeConfig} />
                    </div>
                </div>
            </div>
        </div>
    );
};

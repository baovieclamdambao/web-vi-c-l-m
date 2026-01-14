
import { Job, HomeSectionConfig, Application, Company, Category, FooterConfig, HeaderConfig, User, SavedCV, JobBadge } from '../types';
import { MOCK_JOBS, MOCK_COMPANIES, CATEGORIES as DEFAULT_CATEGORIES, DEFAULT_BADGES } from '../constants';

const JOBS_KEY = 'vv_jobs';
const COMPANIES_KEY = 'vv_companies';
const LAYOUT_KEY = 'vv_home_layout';
const APPLICATIONS_KEY = 'vv_applications';
const CATEGORIES_KEY = 'vv_categories';
const FOOTER_KEY = 'vv_footer';
const HEADER_KEY = 'vv_header';
const USERS_KEY = 'vv_users';
const CURRENT_USER_KEY = 'vv_current_user';
const CVS_KEY = 'vv_cvs';
const BADGES_KEY = 'vv_badges';

// Default Layout
const DEFAULT_LAYOUT: HomeSectionConfig[] = [
  { 
    id: 'sec_hero', 
    type: 'hero', 
    title: 'Hero Banner (Đầu trang)',
    isVisible: true, 
    order: 0,
    content: {
        heroTitle: "Tìm kiếm công việc <br/> <span class='text-brand-600'>Xứng tầm đẳng cấp</span>",
        heroSubtitle: "Kết nối trực tiếp với 500+ tập đoàn hàng đầu. Mở ra cánh cửa sự nghiệp thịnh vượng của bạn ngay hôm nay.",
        heroBackgroundType: 'default',
        heroBackgroundValue: '',
        heroBrandBoxEnabled: true,
        heroBrandBoxTitle: 'Nhà tuyển dụng hàng đầu',
        heroBrandBoxLimit: 6
    }
  },
  { 
    id: 'sec_featured', 
    type: 'job-list', 
    title: 'Box: Việc làm Hot', 
    icon: '🔥',
    isVisible: true, 
    order: 1, 
    content: { 
        sectionTitle: 'Việc làm Hấp Dẫn',
        limit: 12, 
        rows: 1,
        visibleItems: 4, // Default 4 items
        filter: 'hot', 
        background: 'gray' 
    } 
  },
  { 
    id: 'sec_companies', 
    type: 'companies', 
    title: 'Box: Đối tác', 
    icon: '🤝',
    isVisible: true, 
    order: 2,
    content: {
        sectionTitle: 'Đối tác <span class="text-gold-gradient">Chiến lược</span>',
        limit: 12,
        background: 'white'
    }
  },
  { 
    id: 'sec_banner_mid', 
    type: 'banner', 
    title: 'Banner Quảng cáo Giữa trang', 
    isVisible: true, 
    order: 3, 
    content: { 
        bannerUrl: 'https://cdn.dribbble.com/users/1000837/screenshots/15450849/media/f5756c9a9d701a541604a8b792e42d76.jpg?resize=1600x600&vertical=center',
        bannerLink: '/jobs'
    } 
  },
  { 
    id: 'sec_new', 
    type: 'job-list', 
    title: 'Box: Việc làm Mới', 
    icon: '⚡',
    isVisible: true, 
    order: 4, 
    content: { 
        sectionTitle: 'Việc làm Mới nhất',
        limit: 12, 
        rows: 2,
        visibleItems: 3, // Default 3 items for multi-row
        filter: 'new', 
        background: 'white' 
    } 
  },
  { 
    id: 'sec_categories', 
    type: 'categories', 
    title: 'Box: Ngành nghề', 
    icon: '💎',
    isVisible: true, 
    order: 5,
    content: {
        sectionTitle: 'Ngành nghề <span class="text-brand-600">Nổi bật</span>'
    }
  },
];

// Default Footer
const DEFAULT_FOOTER: FooterConfig = {
    companyName: 'ViecLamAI',
    description: 'Nền tảng tuyển dụng thông minh hàng đầu Việt Nam. Kết nối ứng viên và nhà tuyển dụng nhanh chóng, hiệu quả nhờ công nghệ AI.',
    address: 'Tầng 12, Tòa nhà Innovation, Quận 1, TP. Hồ Chí Minh',
    phone: '(028) 3333 8888',
    email: 'hotro@vieclamai.vn',
    backgroundColor: '#111827', // Gray 900
    textColor: '#d1d5db', // Gray 300
    copyrightText: '© 2024 ViecLamAI. All rights reserved.',
    socialLinks: {
        facebook: '#',
        linkedin: '#',
        youtube: '#'
    },
    columns: [
        {
            id: 'col_1',
            title: 'Dành cho ứng viên',
            links: [
                { label: 'Việc làm mới nhất', url: '/jobs' },
                { label: 'Việc làm IT', url: '/jobs?keyword=IT' },
                { label: 'Cẩm nang nghề nghiệp', url: '#' },
                { label: 'Tạo CV online', url: '/cv-builder' }
            ]
        },
        {
            id: 'col_2',
            title: 'Nhà tuyển dụng',
            links: [
                { label: 'Đăng tin tuyển dụng', url: '#' },
                { label: 'Tìm hồ sơ', url: '#' },
                { label: 'Giải pháp nhân sự', url: '#' },
                { label: 'Báo giá dịch vụ', url: '#' }
            ]
        }
    ]
};

// Default Header
const DEFAULT_HEADER: HeaderConfig = {
    logoType: 'text',
    logoText: 'Vuavieclam',
    tagline: 'Tuyển dụng nhanh, tìm việc miễn phí',
    textColor: '#dc2626', // Logo Brand Color
    menuTextColor: '#1f2937', // Menu Default Color (Slate 900)
    backgroundColor: '#ffffff',
    backgroundImage: '',
    navLinks: [
        { label: 'Việc làm', path: '/jobs' },
        { label: 'Hồ sơ & CV', path: '/cv-builder' },
        { label: 'Công ty', path: '/companies' },
        { label: 'Cẩm nang', path: '/blog' },
    ]
};

// Seed Admin User
const SEED_USERS: User[] = [
    {
        id: 'admin_01',
        email: 'admin@vuavieclam.com',
        password: 'admin',
        fullName: 'Administrator',
        role: 'admin',
        createdAt: new Date().toLocaleString('vi-VN'),
        status: 'active',
        avatar: 'https://ui-avatars.com/api/?name=Admin&background=ef4444&color=fff'
    }
];

export const DataService = {
  // --- AUTH & USERS ---
  getUsers: (): User[] => {
      const stored = localStorage.getItem(USERS_KEY);
      if (!stored) {
          localStorage.setItem(USERS_KEY, JSON.stringify(SEED_USERS));
          return SEED_USERS;
      }
      return JSON.parse(stored);
  },

  registerUser: (userData: Omit<User, 'id' | 'createdAt' | 'status'>): { success: boolean, message: string } => {
      const users = DataService.getUsers();
      if (users.some(u => u.email === userData.email)) {
          return { success: false, message: 'Email này đã được sử dụng!' };
      }

      const newUser: User = {
          ...userData,
          id: `u_${Date.now()}`,
          createdAt: new Date().toLocaleString('vi-VN'),
          status: 'active',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.fullName)}&background=random`
      };

      users.push(newUser);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      
      // Auto login after register
      DataService.setCurrentUser(newUser);
      return { success: true, message: 'Đăng ký thành công!' };
  },

  loginUser: (email: string, password: string): { success: boolean, message: string, user?: User } => {
      const users = DataService.getUsers();
      const user = users.find(u => u.email === email && u.password === password);

      if (!user) {
          return { success: false, message: 'Email hoặc mật khẩu không đúng!' };
      }
      if (user.status === 'banned') {
          return { success: false, message: 'Tài khoản của bạn đã bị khóa!' };
      }

      DataService.setCurrentUser(user);
      return { success: true, message: 'Đăng nhập thành công!', user };
  },

  getCurrentUser: (): User | null => {
      const stored = localStorage.getItem(CURRENT_USER_KEY);
      return stored ? JSON.parse(stored) : null;
  },

  setCurrentUser: (user: User) => {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      // Dispatch event to notify components
      window.dispatchEvent(new Event('storage'));
  },

  logout: () => {
      localStorage.removeItem(CURRENT_USER_KEY);
      window.dispatchEvent(new Event('storage'));
  },

  updateUserStatus: (id: string, status: 'active' | 'banned') => {
      const users = DataService.getUsers();
      const index = users.findIndex(u => u.id === id);
      if (index >= 0) {
          users[index].status = status;
          localStorage.setItem(USERS_KEY, JSON.stringify(users));
      }
  },

  // NEW: Update full user info (Admin edit)
  updateUser: (user: User) => {
      const users = DataService.getUsers();
      const index = users.findIndex(u => u.id === user.id);
      if (index >= 0) {
          users[index] = user;
          localStorage.setItem(USERS_KEY, JSON.stringify(users));
          
          // Also update current user session if it's the same user
          const currentUser = DataService.getCurrentUser();
          if (currentUser && currentUser.id === user.id) {
              DataService.setCurrentUser(user);
          }
      } else {
          // If user doesn't exist (newly created by Admin), push it
          users.push(user);
          localStorage.setItem(USERS_KEY, JSON.stringify(users));
      }
  },

  deleteUser: (id: string) => {
      const users = DataService.getUsers().filter(u => u.id !== id);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  // --- STATS ---
  getStats: () => {
      const jobs = DataService.getJobs();
      const apps = DataService.getApplications();
      const companies = DataService.getCompanies();
      const users = DataService.getUsers();
      const cvs = DataService.getAllCVs();
      
      const activeJobs = jobs.filter(j => j.status !== 'closed').length;
      const newApps = apps.filter(a => a.status === 'new').length;
      const candidates = users.filter(u => u.role === 'candidate').length;
      
      return {
          totalJobs: jobs.length,
          activeJobs,
          totalApplications: apps.length,
          newApplications: newApps,
          totalCompanies: companies.length,
          totalCandidates: candidates,
          totalCVs: cvs.length
      };
  },

  // --- JOB MANAGEMENT ---
  getJobs: (): Job[] => {
    const stored = localStorage.getItem(JOBS_KEY);
    if (!stored) {
      const initialJobs = MOCK_JOBS.map(j => ({...j, status: 'active', applicationCount: 0} as Job));
      localStorage.setItem(JOBS_KEY, JSON.stringify(initialJobs));
      return initialJobs;
    }
    return JSON.parse(stored);
  },

  saveJob: (job: Job) => {
    const jobs = DataService.getJobs();
    const index = jobs.findIndex(j => j.id === job.id);
    if (index >= 0) {
      jobs[index] = { ...jobs[index], ...job };
    } else {
      jobs.unshift({ ...job, status: 'active', applicationCount: 0 });
    }
    localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
  },

  deleteJob: (id: string) => {
    const jobs = DataService.getJobs().filter(j => j.id !== id);
    localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
  },

  getJobById: (id: string): Job | undefined => {
    return DataService.getJobs().find(j => j.id === id);
  },

  // --- COMPANY MANAGEMENT ---
  getCompanies: (): Company[] => {
      const stored = localStorage.getItem(COMPANIES_KEY);
      if(!stored) {
          localStorage.setItem(COMPANIES_KEY, JSON.stringify(MOCK_COMPANIES));
          return MOCK_COMPANIES;
      }
      return JSON.parse(stored);
  },
  
  saveCompany: (company: Company) => {
      const list = DataService.getCompanies();
      const index = list.findIndex(c => c.id === company.id);
      if(index >= 0) {
          list[index] = company;
      } else {
          list.unshift(company);
      }
      localStorage.setItem(COMPANIES_KEY, JSON.stringify(list));
  },

  deleteCompany: (id: string) => {
      const list = DataService.getCompanies().filter(c => c.id !== id);
      localStorage.setItem(COMPANIES_KEY, JSON.stringify(list));
  },

  // --- APPLICATION MANAGEMENT ---
  getApplications: (): Application[] => {
    const stored = localStorage.getItem(APPLICATIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  submitApplication: (app: Omit<Application, 'id' | 'appliedAt' | 'status'>) => {
    const applications = DataService.getApplications();
    const newApp: Application = {
      ...app,
      id: Date.now().toString(),
      appliedAt: new Date().toLocaleString('vi-VN'),
      status: 'new'
    };
    applications.unshift(newApp);
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));

    const jobs = DataService.getJobs();
    const jobIndex = jobs.findIndex(j => j.id === app.jobId);
    if (jobIndex >= 0) {
       jobs[jobIndex].applicationCount = (jobs[jobIndex].applicationCount || 0) + 1;
       localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
    }
  },

  updateApplicationStatus: (id: string, status: Application['status']) => {
      const applications = DataService.getApplications();
      const index = applications.findIndex(a => a.id === id);
      if (index >= 0) {
          applications[index].status = status;
          localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
      }
  },

  // --- HOME PAGE LAYOUT ---
  getLayout: (): HomeSectionConfig[] => {
    const stored = localStorage.getItem(LAYOUT_KEY);
    if (!stored) {
      localStorage.setItem(LAYOUT_KEY, JSON.stringify(DEFAULT_LAYOUT));
      return DEFAULT_LAYOUT;
    }
    return JSON.parse(stored).sort((a: HomeSectionConfig, b: HomeSectionConfig) => a.order - b.order);
  },

  saveLayout: (layout: HomeSectionConfig[]) => {
    localStorage.setItem(LAYOUT_KEY, JSON.stringify(layout));
  },

  addSection: (type: 'job-list' | 'banner') => {
    const layout = DataService.getLayout();
    const newSection: HomeSectionConfig = {
      id: `sec_${Date.now()}`,
      type: type,
      title: type === 'job-list' ? 'Box Việc làm Mới' : 'Banner Mới',
      icon: type === 'job-list' ? '⭐' : undefined,
      isVisible: true,
      order: layout.length,
      content: type === 'job-list' ? {
          sectionTitle: 'Danh sách việc làm',
          limit: 12,
          rows: 1, // Default 1 row
          visibleItems: 4,
          filter: 'all', 
          background: 'white'
      } : {
          bannerUrl: 'https://via.placeholder.com/1200x300',
          bannerLink: '#'
      }
    };
    layout.push(newSection);
    DataService.saveLayout(layout);
    return newSection;
  },
  
  removeSection: (id: string) => {
      let layout = DataService.getLayout();
      layout = layout.filter(s => s.id !== id);
      DataService.saveLayout(layout);
  },

  // --- CATEGORIES MANAGEMENT ---
  getCategories: (): Category[] => {
      const stored = localStorage.getItem(CATEGORIES_KEY);
      if(!stored) {
          localStorage.setItem(CATEGORIES_KEY, JSON.stringify(DEFAULT_CATEGORIES));
          return DEFAULT_CATEGORIES;
      }
      return JSON.parse(stored);
  },

  saveCategory: (category: Category) => {
      const list = DataService.getCategories();
      const index = list.findIndex(c => c.id === category.id);
      if (index >= 0) {
          list[index] = category;
      } else {
          list.push(category);
      }
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(list));
  },

  deleteCategory: (id: string) => {
      const list = DataService.getCategories().filter(c => c.id !== id);
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(list));
  },

  // --- BADGE MANAGEMENT (NEW) ---
  getBadges: (): JobBadge[] => {
      const stored = localStorage.getItem(BADGES_KEY);
      if (!stored) {
          localStorage.setItem(BADGES_KEY, JSON.stringify(DEFAULT_BADGES));
          return DEFAULT_BADGES;
      }
      return JSON.parse(stored).sort((a: JobBadge, b: JobBadge) => b.priority - a.priority);
  },

  saveBadge: (badge: JobBadge) => {
      const list = DataService.getBadges();
      const index = list.findIndex(b => b.id === badge.id);
      if (index >= 0) {
          list[index] = badge;
      } else {
          list.push(badge);
      }
      localStorage.setItem(BADGES_KEY, JSON.stringify(list));
  },

  deleteBadge: (id: string) => {
      const list = DataService.getBadges().filter(b => b.id !== id);
      localStorage.setItem(BADGES_KEY, JSON.stringify(list));
  },

  // --- FOOTER MANAGEMENT ---
  getFooterConfig: (): FooterConfig => {
      const stored = localStorage.getItem(FOOTER_KEY);
      if (!stored) {
          localStorage.setItem(FOOTER_KEY, JSON.stringify(DEFAULT_FOOTER));
          return DEFAULT_FOOTER;
      }
      return JSON.parse(stored);
  },

  saveFooterConfig: (config: FooterConfig) => {
      localStorage.setItem(FOOTER_KEY, JSON.stringify(config));
  },

  // --- HEADER MANAGEMENT (NEW) ---
  getHeaderConfig: (): HeaderConfig => {
      const stored = localStorage.getItem(HEADER_KEY);
      if (!stored) {
          localStorage.setItem(HEADER_KEY, JSON.stringify(DEFAULT_HEADER));
          return DEFAULT_HEADER;
      }
      return JSON.parse(stored);
  },

  saveHeaderConfig: (config: HeaderConfig) => {
      localStorage.setItem(HEADER_KEY, JSON.stringify(config));
  },

  // --- SAVED CVs MANAGEMENT ---
  getSavedCVs: (userId: string): SavedCV[] => {
    const stored = localStorage.getItem(CVS_KEY);
    if (!stored) return [];
    const allCVs: SavedCV[] = JSON.parse(stored);
    return allCVs.filter(cv => cv.userId === userId).sort((a, b) => 
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  },

  // NEW: Get ALL CVs for Admin
  getAllCVs: (): SavedCV[] => {
    const stored = localStorage.getItem(CVS_KEY);
    if (!stored) return [];
    return JSON.parse(stored).sort((a: SavedCV, b: SavedCV) => 
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  },

  getCVById: (id: string): SavedCV | undefined => {
    const stored = localStorage.getItem(CVS_KEY);
    if (!stored) return undefined;
    const allCVs: SavedCV[] = JSON.parse(stored);
    return allCVs.find(cv => cv.id === id);
  },

  saveCV: (cv: SavedCV) => {
      const stored = localStorage.getItem(CVS_KEY);
      const allCVs: SavedCV[] = stored ? JSON.parse(stored) : [];
      
      const index = allCVs.findIndex(item => item.id === cv.id);
      if (index >= 0) {
          // Keep existing status if updating, or default to pending
          const existingStatus = allCVs[index].status;
          allCVs[index] = { ...cv, status: existingStatus || 'pending' };
      } else {
          // New CV defaults to pending
          allCVs.unshift({ ...cv, status: 'pending' }); 
      }
      localStorage.setItem(CVS_KEY, JSON.stringify(allCVs));
  },

  // Update Status logic
  updateCVStatus: (id: string, status: 'approved' | 'rejected') => {
      const stored = localStorage.getItem(CVS_KEY);
      if (!stored) return;
      const allCVs: SavedCV[] = JSON.parse(stored);
      const index = allCVs.findIndex(c => c.id === id);
      if (index >= 0) {
          allCVs[index].status = status;
          localStorage.setItem(CVS_KEY, JSON.stringify(allCVs));
      }
  },

  deleteCV: (id: string) => {
      const stored = localStorage.getItem(CVS_KEY);
      if (!stored) return;
      const allCVs: SavedCV[] = JSON.parse(stored);
      const newCVs = allCVs.filter(cv => cv.id !== id);
      localStorage.setItem(CVS_KEY, JSON.stringify(newCVs));
  }
};

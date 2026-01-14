
import { Job, Category, Company, JobBadge } from './types';

export const LOCATIONS = ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Bình Dương", "Cần Thơ", "Hải Phòng"];

export const SALARY_RANGES = [
  "Tất cả mức lương",
  "Dưới 10 triệu",
  "10 - 15 triệu",
  "15 - 20 triệu",
  "20 - 30 triệu",
  "Trên 30 triệu",
  "Thỏa thuận"
];

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Kinh doanh / Bán hàng', count: 12450, icon: '💼' },
  { id: '2', name: 'IT - Phần mềm', count: 5320, icon: '💻' },
  { id: '3', name: 'Marketing / PR', count: 3200, icon: '📢' },
  { id: '4', name: 'Kế toán / Kiểm toán', count: 4100, icon: '📊' },
  { id: '5', name: 'Hành chính / Nhân sự', count: 2800, icon: '📋' },
  { id: '6', name: 'Cơ khí / Chế tạo', count: 1500, icon: '⚙️' },
  { id: '7', name: 'Ngân hàng', count: 980, icon: '🏦' },
  { id: '8', name: 'Giáo dục / Đào tạo', count: 1100, icon: '🎓' },
];

export const DEFAULT_BADGES: JobBadge[] = [
    { id: 'b_vip', label: 'VIP', color: 'yellow', icon: 'crown', priority: 10 },
    { id: 'b_hot', label: 'HOT', color: 'red', icon: 'fire', priority: 8 },
    { id: 'b_new', label: 'MỚI', color: 'blue', icon: 'zap', priority: 5 },
    { id: 'b_urgent', label: 'GẤP', color: 'purple', icon: 'clock', priority: 7 },
];

export const MOCK_COMPANIES: Company[] = [
  { id: '1', name: 'Tech Solutions Vietnam', logo: 'https://picsum.photos/id/1/64/64' },
  { id: '2', name: 'Bất Động Sản Hưng Thịnh', logo: 'https://picsum.photos/id/2/64/64' },
  { id: '3', name: 'Global Media Agency', logo: 'https://picsum.photos/id/3/64/64' },
  { id: '4', name: 'Công ty TNHH ABC', logo: 'https://picsum.photos/id/4/64/64' },
  { id: '5', name: 'HR Group', logo: 'https://picsum.photos/id/5/64/64' },
  { id: '6', name: 'Fintech Asia', logo: 'https://picsum.photos/id/6/64/64' },
];

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    categoryId: '2', // IT - Phần mềm
    title: 'Senior Frontend Developer (ReactJS)',
    company: 'Tech Solutions Vietnam',
    logo: 'https://picsum.photos/id/1/64/64',
    salary: '25 - 45 triệu',
    location: 'Hồ Chí Minh',
    tags: ['ReactJS', 'TypeScript', 'Tailwind'],
    postedAt: '2 giờ trước',
    hot: true,
    badgeId: 'b_vip',
    description: 'Chúng tôi đang tìm kiếm Senior Frontend Developer.',
    requirements: ['Ít nhất 3 năm kinh nghiệm ReactJS', 'Thành thạo TypeScript'],
    benefits: ['Lương tháng 13', 'Bảo hiểm Premium'],
    status: 'active'
  },
  {
    id: '2',
    categoryId: '1', // Kinh doanh
    title: 'Nhân viên Kinh Doanh BĐS',
    company: 'Bất Động Sản Hưng Thịnh',
    logo: 'https://picsum.photos/id/2/64/64',
    salary: '10 - 50 triệu',
    location: 'Hà Nội',
    tags: ['Bán hàng', 'Kinh doanh', 'BĐS'],
    postedAt: '5 giờ trước',
    hot: false,
    badgeId: 'b_new',
    description: 'Tuyển dụng nhân viên kinh doanh đam mê kiếm tiền.',
    requirements: ['Giao tiếp tốt', 'Chăm chỉ'],
    benefits: ['Hoa hồng cao', 'Du lịch hàng năm'],
    status: 'active'
  },
  {
    id: '3',
    categoryId: '3', // Marketing
    title: 'Digital Marketing Manager',
    company: 'Global Media Agency',
    logo: 'https://picsum.photos/id/3/64/64',
    salary: '30 - 40 triệu',
    location: 'Đà Nẵng',
    tags: ['Marketing', 'SEO', 'Facebook Ads'],
    postedAt: '1 ngày trước',
    hot: true,
    badgeId: 'b_hot',
    description: 'Quản lý team marketing, lên kế hoạch chiến lược.',
    requirements: ['5 năm kinh nghiệm Marketing', 'Tiếng Anh tốt'],
    benefits: ['Lương thưởng hấp dẫn', 'Môi trường quốc tế'],
    status: 'active'
  },
  {
    id: '4',
    categoryId: '4', // Kế toán
    title: 'Kế toán tổng hợp',
    company: 'Công ty TNHH ABC',
    logo: 'https://picsum.photos/id/4/64/64',
    salary: '12 - 15 triệu',
    location: 'Bình Dương',
    tags: ['Kế toán', 'Excel', 'Misa'],
    postedAt: '2 ngày trước',
    hot: false,
    description: 'Thực hiện các nghiệp vụ kế toán tổng hợp.',
    requirements: ['Tốt nghiệp Đại học', 'Cẩn thận'],
    benefits: ['BHXH đầy đủ', 'Nghỉ thứ 7, CN'],
    status: 'active'
  },
  {
    id: '5',
    categoryId: '5', // Nhân sự
    title: 'Chuyên viên Tuyển dụng',
    company: 'HR Group',
    logo: 'https://picsum.photos/id/5/64/64',
    salary: '10 - 18 triệu',
    location: 'Hồ Chí Minh',
    tags: ['HR', 'Tuyển dụng', 'Headhunt'],
    postedAt: '3 giờ trước',
    hot: true,
    badgeId: 'b_hot',
    description: 'Tìm kiếm ứng viên tiềm năng.',
    requirements: ['Kinh nghiệm 1 năm', 'Năng động'],
    benefits: ['Thưởng KPI', 'Teambuilding'],
    status: 'active'
  },
  {
    id: '6',
    categoryId: '2', // IT
    title: 'Java Backend Developer',
    company: 'Fintech Asia',
    logo: 'https://picsum.photos/id/6/64/64',
    salary: '2000 - 3000 USD',
    location: 'Hà Nội',
    tags: ['Java', 'Spring Boot', 'Microservices'],
    postedAt: '1 ngày trước',
    hot: true,
    badgeId: 'b_vip',
    description: 'Phát triển hệ thống lõi ngân hàng số.',
    requirements: ['Thành thạo Java Core', 'Microservices'],
    benefits: ['Thưởng dự án', 'Bảo hiểm sức khỏe'],
    status: 'active'
  },
  {
    id: '7',
    categoryId: '1', // Kinh doanh
    title: 'Trưởng phòng Kinh doanh',
    company: 'Tech Solutions Vietnam',
    logo: 'https://picsum.photos/id/1/64/64',
    salary: '30 - 50 triệu',
    location: 'Hồ Chí Minh',
    tags: ['Sales', 'Management', 'B2B'],
    postedAt: '4 giờ trước',
    hot: true,
    badgeId: 'b_vip',
    description: 'Quản lý đội ngũ kinh doanh phần mềm.',
    requirements: ['3 năm kinh nghiệm quản lý', 'Tiếng Anh giao tiếp'],
    benefits: ['Cổ phần thưởng', 'Xe đưa đón'],
    status: 'active'
  },
  {
    id: '8',
    categoryId: '3', // Marketing
    title: 'Content Creator (TikTok)',
    company: 'Global Media Agency',
    logo: 'https://picsum.photos/id/3/64/64',
    salary: '10 - 15 triệu',
    location: 'Hà Nội',
    tags: ['Content', 'TikTok', 'Creative'],
    postedAt: '6 giờ trước',
    hot: false,
    badgeId: 'b_new',
    description: 'Sáng tạo nội dung video ngắn.',
    requirements: ['Có kênh TikTok >10k follow là lợi thế', 'Sáng tạo'],
    benefits: ['Môi trường GenZ', 'Ăn trưa miễn phí'],
    status: 'active'
  },
  {
    id: '9',
    categoryId: '2', // IT
    title: 'Lập trình viên Mobile (Flutter)',
    company: 'Fintech Asia',
    logo: 'https://picsum.photos/id/6/64/64',
    salary: '1500 - 2500 USD',
    location: 'Đà Nẵng',
    tags: ['Flutter', 'Mobile', 'Dart'],
    postedAt: '1 ngày trước',
    hot: true,
    badgeId: 'b_vip',
    description: 'Phát triển Super App tài chính.',
    requirements: ['2 năm kinh nghiệm Flutter', 'Tư duy sản phẩm'],
    benefits: ['Macbook Pro', 'Du lịch nước ngoài'],
    status: 'active'
  },
  {
    id: '10',
    categoryId: '5', // HR
    title: 'Thực tập sinh HR',
    company: 'HR Group',
    logo: 'https://picsum.photos/id/5/64/64',
    salary: '3 - 5 triệu',
    location: 'Hồ Chí Minh',
    tags: ['Intern', 'HR', 'Admin'],
    postedAt: '2 ngày trước',
    hot: false,
    description: 'Hỗ trợ công tác tuyển dụng và hành chính.',
    requirements: ['Sinh viên năm cuối', 'Chăm chỉ'],
    benefits: ['Dấu mộc thực tập', 'Cơ hội lên chính thức'],
    status: 'active'
  },
  {
    id: '11',
    categoryId: '2', // IT
    title: 'AI Engineer',
    company: 'Tech Solutions Vietnam',
    logo: 'https://picsum.photos/id/1/64/64',
    salary: 'Thỏa thuận',
    location: 'Hà Nội',
    tags: ['AI', 'Python', 'Machine Learning'],
    postedAt: 'Vừa xong',
    hot: true,
    badgeId: 'b_vip',
    description: 'Nghiên cứu và ứng dụng AI vào sản phẩm.',
    requirements: ['Thành thạo Python', 'Kiến thức về ML/DL'],
    benefits: ['Lương cạnh tranh', 'Làm việc remote'],
    status: 'active'
  },
  {
    id: '12',
    categoryId: '1', // Kinh doanh
    title: 'Nhân viên Telesale',
    company: 'Bất Động Sản Hưng Thịnh',
    logo: 'https://picsum.photos/id/2/64/64',
    salary: '7 - 10 triệu',
    location: 'Hồ Chí Minh',
    tags: ['Telesale', 'CSKH'],
    postedAt: '1 tuần trước',
    hot: false,
    description: 'Gọi điện tư vấn khách hàng theo data có sẵn.',
    requirements: ['Giọng nói dễ nghe', 'Kiên trì'],
    benefits: ['Thưởng nóng', 'Đào tạo kỹ năng'],
    status: 'active'
  }
];

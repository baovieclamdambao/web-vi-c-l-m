
import React from 'react';

export interface Company {
  id: string;
  name: string;
  logo: string;
  description?: string;
  address?: string;
  website?: string;
}

export interface JobBadge {
  id: string;
  label: string; // VD: VIP, HOT, TUYỂN GẤP
  color: 'red' | 'yellow' | 'blue' | 'green' | 'purple' | 'gray'; // Theme màu
  icon: 'crown' | 'fire' | 'star' | 'zap' | 'check' | 'clock'; // Icon
  priority: number; // Độ ưu tiên sắp xếp (số càng lớn càng lên đầu)
}

export interface Job {
  id: string;
  categoryId?: string; 
  title: string;
  company: string; 
  companyId?: string;
  logo: string;
  salary: string;
  location: string;
  tags: string[];
  postedAt: string;
  description: string;
  requirements: string[];
  benefits: string[];
  hot?: boolean; // Legacy support
  badgeId?: string; // CHANGED: Link to dynamic Badge ID
  targetSectionId?: string; // Specific Home Section ID assignment
  viewCount?: number;
  applicationCount?: number;
  status: 'active' | 'closed' | 'pending';
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  candidateName: string;
  email: string;
  phone: string;
  cvUrl?: string; 
  appliedAt: string;
  status: 'new' | 'reviewed' | 'interview' | 'rejected' | 'hired';
  note?: string;
}

export interface Category {
  id: string;
  name: string;
  count: number;
  icon: string;
}

export interface FilterState {
  keyword: string;
  location: string;
  salaryRange: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

// --- Authentication Types ---
export type UserRole = 'candidate' | 'employer' | 'admin';

export interface User {
  id: string;
  email: string;
  password?: string; // In real app, this should be hashed. Here just for mock.
  fullName: string;
  role: UserRole;
  phone?: string;
  companyName?: string; // Only for employer
  avatar?: string;
  createdAt: string;
  status: 'active' | 'banned';
  isLookingForJob?: boolean; // New field for toggle
}

// --- Dynamic Home Page Config ---

export type SectionType = 'hero' | 'job-list' | 'companies' | 'categories' | 'banner';

export interface HomeSectionConfig {
  id: string;
  type: SectionType;
  title?: string; // Admin internal title or default display
  icon?: string; // NEW: Custom Icon (Emoji or text char)
  isVisible: boolean;
  order: number;
  content?: {
    // Cho Hero Section
    heroTitle?: string;
    heroSubtitle?: string;
    heroBackgroundType?: 'default' | 'image' | 'color' | 'gradient'; 
    heroBackgroundValue?: string;
    
    // New: Custom Text Styling
    heroTitleColor?: string; // Hex color for Title
    heroSubtitleColor?: string; // Hex color for Subtitle
    heroTextEffect?: 'none' | 'shadow' | 'neon' | 'outline'; // Visual effects

    // New: Hero Brand Box
    heroBrandBoxEnabled?: boolean;
    heroBrandBoxTitle?: string;
    heroBrandBoxLimit?: number;

    // Cho Banner
    bannerUrl?: string;
    bannerLink?: string;

    // Cho Job List / General
    sectionTitle?: string; // Public display title
    limit?: number;
    rows?: number; // NEW: Number of rows in slider
    visibleItems?: number; // NEW: Number of items visible per row (Desktop)
    filter?: 'hot' | 'new' | 'all';
    background?: 'white' | 'gray' | 'brand';
  };
}

// --- Dynamic Footer Config ---
export interface FooterLink {
    label: string;
    url: string;
}

export interface FooterColumn {
    id: string; // Add ID for easier management
    title: string;
    links: FooterLink[];
}

export interface FooterConfig {
    companyName: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    copyrightText?: string;
    // Styling
    backgroundColor?: string;
    textColor?: string;
    columns: FooterColumn[];
    socialLinks: {
        facebook: string;
        linkedin: string;
        youtube: string;
    };
}

// --- Dynamic Header Config (New) ---
export interface HeaderConfig {
    logoType: 'text' | 'image';
    logoText: string;
    logoUrl?: string;
    tagline: string;
    navLinks: { label: string; path: string }[];
    // Styling properties
    textColor?: string; // Logo Color
    menuTextColor?: string; // NEW: Menu specific color
    backgroundColor?: string;
    backgroundImage?: string;
}

// --- CV Builder Types ---
export interface CVData {
    avatar: string;
    fullName: string;
    role: string;
    dob?: string; // Added Date of Birth
    email: string;
    phone: string;
    address: string;
    website: string;
    summary: string;
    skills: string[];
    experience: {
        id: number;
        company: string;
        role: string;
        date: string;
        description: string;
    }[];
    education: {
        id: number;
        school: string;
        degree: string;
        date: string;
    }[];
    // New Fields
    hobbies: string;
    activities: {
        id: number;
        organization: string;
        role: string;
        date: string;
        description: string;
    }[];
}

export interface TemplateConfig {
    layout: 'left-sidebar' | 'right-sidebar' | 'full-width' | 'split' | 'minimal';
    headerStyle: 'center' | 'left' | 'creative' | 'boxed';
    imageShape: 'circle' | 'square' | 'rounded' | 'blob';
    accentColor: string; 
    font: 'serif' | 'sans' | 'mono';
    pattern?: 'none' | 'dots' | 'lines';
}

export interface SavedCV {
    id: string;
    userId: string;
    name: string; // User defined name e.g. "CV Marketing 2024"
    templateId: string;
    data: CVData;
    config: TemplateConfig;
    updatedAt: string;
    status?: 'pending' | 'approved' | 'rejected'; // Added Approval Status
}

export interface Template {
    id: string;
    name: string;
    description: string;
    type: string;
    tags: string[];
    config: TemplateConfig;
    component: React.FC<{ data: CVData; config: TemplateConfig }>;
}

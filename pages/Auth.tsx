
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { DataService } from '../services/dataService';
import { UserRole } from '../types';
import { Briefcase, User, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<UserRole>('candidate');
  
  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isLogin) {
        // LOGIN LOGIC
        const result = DataService.loginUser(email, password);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
    } else {
        // REGISTER LOGIC
        if (!fullName || !email || !password) {
            setError('Vui lòng điền đầy đủ thông tin.');
            return;
        }
        if (role === 'employer' && !companyName) {
            setError('Vui lòng nhập tên công ty.');
            return;
        }

        const result = DataService.registerUser({
            fullName,
            email,
            password,
            role,
            companyName: role === 'employer' ? companyName : undefined,
            avatar: ''
        });

        if (result.success) {
            setSuccess('Đăng ký thành công! Đang chuyển hướng...');
            setTimeout(() => navigate('/'), 1500);
        } else {
            setError(result.message);
        }
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 flex flex-col items-center justify-center bg-gray-50 px-4">
       {/* Background Decoration */}
       <div className="absolute top-0 left-0 w-full h-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-50 via-gray-50 to-gray-50 -z-10"></div>
       
       <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Side: Illustration / Info */}
            <div className="hidden md:block space-y-6">
                <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
                    {isLogin ? 'Chào mừng trở lại!' : 'Tham gia cùng Vuavieclam'}
                </h1>
                <p className="text-lg text-gray-600">
                    Kết nối với hàng ngàn cơ hội việc làm và ứng viên tài năng trên nền tảng tuyển dụng hàng đầu.
                </p>
                <div className="space-y-4 pt-4">
                    <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                            <Briefcase size={24} />
                        </div>
                        <div>
                            <div className="font-bold text-gray-800">500+ Công ty</div>
                            <div className="text-sm text-gray-500">Đối tác hàng đầu</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                            <User size={24} />
                        </div>
                        <div>
                            <div className="font-bold text-gray-800">10,000+ Ứng viên</div>
                            <div className="text-sm text-gray-500">Tài năng sẵn sàng</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Auth Form */}
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100">
                {/* Role Tabs (Only for Register) */}
                {!isLogin && (
                    <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                        <button 
                            type="button"
                            onClick={() => setRole('candidate')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all ${
                                role === 'candidate' 
                                ? 'bg-white text-brand-600 shadow-sm' 
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <User size={16} /> Ứng viên
                        </button>
                        <button 
                             type="button"
                             onClick={() => setRole('employer')}
                             className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all ${
                                role === 'employer' 
                                ? 'bg-white text-brand-600 shadow-sm' 
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <Briefcase size={16} /> Nhà tuyển dụng
                        </button>
                    </div>
                )}

                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    {isLogin ? 'Đăng nhập tài khoản' : (role === 'candidate' ? 'Đăng ký Ứng viên' : 'Đăng ký Nhà tuyển dụng')}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Họ và tên</label>
                            <input 
                                className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-all" 
                                placeholder="Nguyễn Văn A" 
                                value={fullName}
                                onChange={e => setFullName(e.target.value)}
                            />
                        </div>
                    )}
                    
                    {!isLogin && role === 'employer' && (
                        <div>
                             <label className="block text-sm font-semibold text-gray-700 mb-1">Tên Công ty</label>
                             <input 
                                 className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-all" 
                                 placeholder="Công ty Cổ phần..." 
                                 value={companyName}
                                 onChange={e => setCompanyName(e.target.value)}
                             />
                         </div>
                    )}

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                        <input 
                            type="email"
                            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-all" 
                            placeholder="email@example.com" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Mật khẩu</label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"}
                                className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-all" 
                                placeholder="••••••••" 
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                            </button>
                        </div>
                    </div>
                    
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
                            <AlertCircle size={16}/> {error}
                        </div>
                    )}
                    
                    {success && (
                        <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm flex items-center gap-2">
                            <CheckCircle size={16}/> {success}
                        </div>
                    )}

                    <Button type="submit" size="lg" className="w-full text-base py-3 mt-2">
                        {isLogin ? 'Đăng nhập' : 'Tạo tài khoản'}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <span className="text-gray-500">
                        {isLogin ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
                    </span>
                    <button 
                        onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }}
                        className="font-bold text-brand-600 hover:text-brand-700 hover:underline"
                    >
                        {isLogin ? 'Đăng ký ngay' : 'Đăng nhập ngay'}
                    </button>
                </div>
            </div>
       </div>
    </div>
  );
};

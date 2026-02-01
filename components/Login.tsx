
import React, { useState } from 'react';
import { UserSession } from '../types';
import { validateLogin } from '../services/authService';
import { User, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: (session: UserSession) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [uid, setUid] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await validateLogin(uid, pass);
    setLoading(false);
    if (res.success) {
      onLoginSuccess(res);
    } else {
      setError(res.error || 'Login failed');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side: Branding */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-blue-900 p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="relative z-10 text-center">
          <ShieldCheck size={80} className="mb-6 mx-auto text-blue-400" />
          <h1 className="text-4xl font-extrabold mb-4 tracking-tighter">KUDDUS ALI CONSTRUCTION</h1>
          <p className="text-blue-200 text-lg max-w-md mx-auto leading-relaxed">
            Infrastructure development & workforce management solutions with precision and integrity.
          </p>
        </div>
        <div className="absolute bottom-8 text-blue-300 text-sm">
          © {new Date().getFullYear()} All Rights Reserved.
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8 md:hidden text-center">
             <h2 className="text-2xl font-black text-blue-900">KAC SYSTEM</h2>
          </div>
          
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h2>
          <p className="text-slate-500 mb-8">Please enter your credentials to access the system</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">User / Coord ID</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <User size={18} />
                </span>
                <input 
                  type="text" 
                  value={uid}
                  onChange={(e) => setUid(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all outline-none bg-slate-50 font-medium"
                  placeholder="Enter ID"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <Lock size={18} />
                </span>
                <input 
                  type="password" 
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all outline-none bg-slate-50 font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-semibold border border-red-100 animate-pulse">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 bg-blue-900 text-white rounded-lg font-bold hover:bg-blue-800 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-900/20"
            >
              {loading ? 'LOGGING IN...' : 'ACCESS SYSTEM'}
              {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-12 text-center text-slate-400 text-sm font-medium">
            Managed by <span className="text-blue-900 font-bold">Internal Operations</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

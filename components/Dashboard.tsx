
import React from 'react';
import { UserSession } from '../types';
import { LogOut, UserPlus, Calendar, Activity, Building2 } from 'lucide-react';

interface DashboardProps {
  session: UserSession;
  onLogout: () => void;
  onNavigate: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ session, onLogout, onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-800">DASHBOARD</h1>
          <p className="text-slate-500 font-medium">Logged in as: {session.name}</p>
        </div>
        <button 
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 text-red-600 font-bold border-2 border-red-100 rounded-full hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">LOGOUT</span>
        </button>
      </div>

      {/* Current Project Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-blue-900"></div>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 rounded-xl text-blue-900">
            <Building2 size={24} />
          </div>
          <div>
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Active Site</span>
            <h2 className="text-3xl font-black text-blue-900 mt-1">{session.project || 'NO ACTIVE PROJECT'}</h2>
          </div>
        </div>
      </div>

      {/* Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NavCard 
          icon={<UserPlus size={28} />}
          title="WORKER REGISTRATION"
          desc="Manage workforce profiles"
          onClick={() => onNavigate('WORKERS')}
        />
        <NavCard 
          icon={<Calendar size={28} />}
          title="ATTENDANCE SYSTEM"
          desc="Track daily work presence"
          onClick={() => onNavigate('ATTENDANCE')}
        />
        <NavCard 
          icon={<Activity size={28} />}
          title="ACTIVITY & PROGRESS"
          desc="Submit site progress reports"
          onClick={() => onNavigate('ACTIVITY')}
        />
      </div>

      <footer className="mt-12 text-center text-slate-400 text-xs font-semibold">
        DEVELOPED BY JAMIR HOSSAIN • ALL RIGHTS RESERVED
      </footer>
    </div>
  );
};

interface NavCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick: () => void;
}

const NavCard: React.FC<NavCardProps> = ({ icon, title, desc, onClick }) => (
  <button 
    onClick={onClick}
    className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/5 transition-all flex items-center gap-6 group text-left"
  >
    <div className="p-4 bg-slate-50 text-blue-900 rounded-2xl group-hover:bg-blue-900 group-hover:text-white transition-colors">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-black text-slate-800">{title}</h3>
      <p className="text-sm text-slate-400 font-medium">{desc}</p>
    </div>
  </button>
);

export default Dashboard;

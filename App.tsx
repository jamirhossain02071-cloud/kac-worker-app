
import React, { useState, useEffect } from 'react';
import { UserSession, Role } from './types';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import WorkerManagement from './components/WorkerManagement';
import AttendanceSystem from './components/AttendanceSystem';
import ActivityModule from './components/ActivityModule';
import CoordinatorDashboard from './components/CoordinatorDashboard';
import { motion, AnimatePresence } from 'framer-motion';

type View = 'LOGIN' | 'DASHBOARD' | 'WORKERS' | 'ATTENDANCE' | 'ACTIVITY' | 'COORD_DASH';

const App: React.FC = () => {
  const [session, setSession] = useState<UserSession | null>(null);
  const [currentView, setCurrentView] = useState<View>('LOGIN');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedSession = sessionStorage.getItem('kac_session');
    if (savedSession) {
      const parsed = JSON.parse(savedSession);
      setSession(parsed);
      setCurrentView(parsed.role === 'COORDINATOR' ? 'COORD_DASH' : 'DASHBOARD');
    }
  }, []);

  const handleLoginSuccess = (s: UserSession) => {
    setSession(s);
    sessionStorage.setItem('kac_session', JSON.stringify(s));
    setCurrentView(s.role === 'COORDINATOR' ? 'COORD_DASH' : 'DASHBOARD');
  };

  const logout = () => {
    setLoading(true);
    setTimeout(() => {
      setSession(null);
      setCurrentView('LOGIN');
      sessionStorage.clear();
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      {loading && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/90">
          <div className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 font-bold text-blue-900 tracking-widest animate-pulse">PROCESSING...</p>
        </div>
      )}

      <AnimatePresence mode="wait">
        {currentView === 'LOGIN' && (
          <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Login onLoginSuccess={handleLoginSuccess} />
          </motion.div>
        )}

        {currentView === 'COORD_DASH' && session?.role === 'COORDINATOR' && (
          <motion.div key="coord" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
            <CoordinatorDashboard session={session} onLogout={logout} />
          </motion.div>
        )}

        {currentView === 'DASHBOARD' && session?.role === 'USER' && (
          <motion.div key="dash" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
            <Dashboard 
              session={session} 
              onLogout={logout} 
              onNavigate={(v) => setCurrentView(v as View)} 
            />
          </motion.div>
        )}

        {currentView === 'WORKERS' && (
          <motion.div key="workers" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
            <WorkerManagement session={session!} onBack={() => setCurrentView('DASHBOARD')} />
          </motion.div>
        )}

        {currentView === 'ATTENDANCE' && (
          <motion.div key="att" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
            <AttendanceSystem session={session!} onBack={() => setCurrentView('DASHBOARD')} />
          </motion.div>
        )}

        {currentView === 'ACTIVITY' && (
          <motion.div key="activity" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
            <ActivityModule session={session!} onBack={() => setCurrentView('DASHBOARD')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;

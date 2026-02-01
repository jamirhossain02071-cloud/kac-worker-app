
import React from 'react';
import { UserSession } from '../types';
import { mockProjectSummary } from '../mockData';
import { LogOut, ChevronDown } from 'lucide-react';

interface Props {
  session: UserSession;
  onLogout: () => void;
}

const CoordinatorDashboard: React.FC<Props> = ({ session, onLogout }) => {
  return (
    <div className="bg-slate-900 min-h-screen text-white">
      {/* Header */}
      <div className="bg-blue-900 p-6 flex items-center justify-between sticky top-0 z-[100] border-b border-blue-800 shadow-2xl">
        <div>
          <h1 className="text-xl font-black tracking-tight">{session.name || 'COORDINATOR'}</h1>
          <p className="text-xs font-black text-blue-300 uppercase tracking-widest mt-1">
            SITE OPERATIONS SUMMARY • {new Date().toLocaleDateString('en-GB')}
          </p>
        </div>
        <button 
          onClick={onLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
        >
          LOGOUT
        </button>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl overflow-x-auto">
          <table className="w-full text-left text-sm font-semibold border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-blue-50 text-blue-900">
                <th className="p-4 border border-blue-100 text-center w-12">SL</th>
                <th className="p-4 border border-blue-100 min-w-[200px]">PROJECT NAME</th>
                <th className="p-4 border border-blue-100 text-center">ACCOUNTANT</th>
                <th className="p-4 border border-blue-100 text-center">PGCIL</th>
                <th className="p-4 border border-blue-100 text-center">KAC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-900">
              {mockProjectSummary.map((row, idx) => (
                <React.Fragment key={idx}>
                  <tr className="hover:bg-slate-50 transition-colors cursor-pointer group">
                    <td className="p-4 border border-slate-100 text-center text-slate-400 font-black">{idx + 1}</td>
                    <td className="p-4 border border-slate-100 text-blue-900 font-black flex items-center justify-between">
                      {row[2]}
                      <ChevronDown size={14} className="text-slate-300 group-hover:text-blue-900 transition-all" />
                    </td>
                    <td className="p-4 border border-slate-100 text-center text-slate-600 uppercase">{row[5]}</td>
                    <td className="p-4 border border-slate-100 text-center">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-black">{row[10]}</span>
                    </td>
                    <td className="p-4 border border-slate-100 text-center">
                      <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-black">{row[13]}</span>
                    </td>
                  </tr>
                  <tr className="bg-amber-50">
                    <td colSpan={5} className="p-4 border-b border-amber-100">
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Mistri Assigned:</span>
                        <span className="text-sm font-black text-red-600 uppercase">{row[4]}</span>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <footer className="p-8 text-center text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">
        Enterprise Real-time Reporting Engine v2.0
      </footer>
    </div>
  );
};

export default CoordinatorDashboard;

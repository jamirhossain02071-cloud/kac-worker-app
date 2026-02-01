
import React, { useState } from 'react';
import { UserSession, ProjectMapping } from '../types';
import { mockProjectMapping } from '../mockData';
import { ChevronLeft, ClipboardList, TrendingUp, Info, Send } from 'lucide-react';

interface Props {
  session: UserSession;
  onBack: () => void;
}

const ActivityModule: React.FC<Props> = ({ session, onBack }) => {
  const [view, setView] = useState<'MENU' | 'FORM'>('MENU');
  const [workType, setWorkType] = useState<'ERECTION' | 'FOUNDATION' | 'STRINGING' | null>(null);
  const [lines, setLines] = useState<string[]>([]);

  const openForm = () => {
    const target = session.project?.toUpperCase().trim();
    let foundType: any = null;
    let foundLines: string[] = [];

    mockProjectMapping.forEach(m => {
      if (m.erectionProj.toUpperCase().trim() === target) {
        foundType = 'ERECTION';
        foundLines.push(m.erectionLine);
      } else if (m.foundationProj.toUpperCase().trim() === target) {
        foundType = 'FOUNDATION';
        foundLines.push(m.foundationLine);
      } else if (m.stringingProj.toUpperCase().trim() === target) {
        foundType = 'STRINGING';
        foundLines.push(m.stringingLine);
      }
    });

    if (foundType) {
      setWorkType(foundType);
      setLines([...new Set(foundLines)]);
      setView('FORM');
    } else {
      alert("MATCHING FAILED! System Project not found in Activity Mapping Database.");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button onClick={view === 'FORM' ? () => setView('MENU') : onBack} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-xl font-black text-slate-800 uppercase tracking-tight">Activity & Progress</h1>
        <div className="w-10"></div>
      </div>

      {view === 'MENU' ? (
        <div className="space-y-4">
          <div className="text-center mb-8">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">Authenticated Site</span>
             <h2 className="text-2xl font-black text-blue-900 border-b-2 border-blue-900 inline-block px-4 pb-1">{session.project}</h2>
          </div>

          <button 
            onClick={openForm}
            className="w-full p-8 bg-white rounded-2xl border-l-[6px] border-l-red-600 border border-slate-200 shadow-sm hover:shadow-xl transition-all group flex items-center justify-between"
          >
            <div className="text-left flex items-center gap-6">
              <div className="p-4 bg-red-50 text-red-600 rounded-2xl group-hover:bg-red-600 group-hover:text-white transition-colors">
                <ClipboardList size={32} />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-800">SEND DAILY REPORT</h3>
                <p className="text-sm text-slate-400 font-medium">Daily site updates & manpower</p>
              </div>
            </div>
          </button>

          <button className="w-full p-8 bg-white rounded-2xl border-l-[6px] border-l-blue-900 border border-slate-200 shadow-sm hover:shadow-xl transition-all group flex items-center justify-between opacity-60">
            <div className="text-left flex items-center gap-6">
              <div className="p-4 bg-blue-50 text-blue-900 rounded-2xl">
                <TrendingUp size={32} />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-800">VIEW PROGRESS</h3>
                <p className="text-sm text-slate-400 font-medium">Analytics & charts (Coming Soon)</p>
              </div>
            </div>
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4">
          <div className="bg-red-600 p-4 text-white font-black text-center uppercase tracking-widest flex items-center justify-center gap-2">
            <Send size={18} /> DAILY WORK REPORT
          </div>
          <div className="p-2 bg-blue-50 text-blue-900 text-[10px] font-black uppercase text-center border-b border-blue-100 flex items-center justify-center gap-2">
            <Info size={12} /> Work Type: {workType} | Auto-Matched Line Names
          </div>
          
          <form className="p-6 space-y-4">
             <div className="grid grid-cols-2 gap-4">
                <InputGroup label="Supervisor / GL *" />
                <InputGroup label="Accountant *" />
             </div>
             <div className="grid grid-cols-2 gap-4">
                <InputGroup label="Working Date *" type="date" />
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Category *</label>
                  <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none font-bold">
                    <option>WORK</option>
                    <option>NO WORK</option>
                    <option>HALF DAY WORK</option>
                  </select>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <InputGroup label="Loc No *" />
                <InputGroup label="Loc Type *" />
             </div>
             <div className="grid grid-cols-2 gap-4">
                <InputGroup label="Manpower *" type="number" />
                <InputGroup label="District *" />
             </div>

             <div className="space-y-1">
                <label className="text-[10px] font-black text-blue-900 uppercase">Line Name (Database Matched) *</label>
                <select className="w-full p-3 bg-blue-50 border-2 border-blue-200 rounded-lg outline-none font-black text-blue-900">
                  {lines.map((l, i) => <option key={i} value={l}>{l}</option>)}
                </select>
             </div>

             <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase">Work Details *</label>
                <textarea className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none font-bold h-20" placeholder="Enter site activity..."></textarea>
             </div>

             <button type="submit" className="w-full py-4 bg-red-600 text-white font-black rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 uppercase tracking-widest mt-4">
               Submit Final Report
             </button>
          </form>
        </div>
      )}
    </div>
  );
};

const InputGroup = ({ label, type = "text" }: any) => (
  <div className="space-y-1">
    <label className="text-[10px] font-black text-slate-400 uppercase">{label}</label>
    <input type={type} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none font-bold" />
  </div>
);

export default ActivityModule;

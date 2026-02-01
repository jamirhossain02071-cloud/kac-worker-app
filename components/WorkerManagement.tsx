
import React, { useState } from 'react';
import { UserSession, Worker } from '../types';
import { mockWorkers } from '../mockData';
import { ChevronLeft, Plus, Search, Camera, Save } from 'lucide-react';

interface Props {
  session: UserSession;
  onBack: () => void;
}

const WorkerManagement: React.FC<Props> = ({ session, onBack }) => {
  const [view, setView] = useState<'LIST' | 'FORM'>('LIST');
  const [searchTerm, setSearchTerm] = useState('');
  const [aadhar, setAadhar] = useState('');

  const filteredWorkers = mockWorkers.filter(w => 
    w.name.toUpperCase().includes(searchTerm.toUpperCase()) && 
    w.project === session.project
  );

  const formatAadhar = (val: string) => {
    const cleaned = val.replace(/\D/g, '').substring(0, 12);
    let formatted = '';
    for (let i = 0; i < cleaned.length; i++) {
      if (i > 0 && i % 4 === 0) formatted += '-';
      formatted += cleaned[i];
    }
    setAadhar(formatted);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-xl font-black text-slate-800 uppercase tracking-tight">Worker Management</h1>
        <div className="w-10"></div>
      </div>

      {view === 'LIST' ? (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <Search size={18} />
              </span>
              <input 
                type="text" 
                placeholder="Search Worker Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none font-bold"
              />
            </div>
            <button 
              onClick={() => setView('FORM')}
              className="w-full sm:w-auto px-6 py-2.5 bg-blue-900 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
            >
              <Plus size={20} />
              ADD WORKER
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden overflow-x-auto shadow-sm">
            <table className="w-full text-left text-sm font-semibold border-collapse">
              <thead>
                <tr className="bg-slate-50 text-blue-900 border-b border-slate-200">
                  <th className="p-4 border-r border-slate-200">SL</th>
                  <th className="p-4 border-r border-slate-200 min-w-[200px]">NAME</th>
                  <th className="p-4 border-r border-slate-200 min-w-[150px]">FATHER</th>
                  <th className="p-4 border-r border-slate-200">PGCIL JOIN</th>
                  <th className="p-4">KAC JOIN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredWorkers.map((w, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 border-r border-slate-100">{idx + 1}</td>
                    <td className="p-4 border-r border-slate-100 font-bold text-slate-900">{w.name}</td>
                    <td className="p-4 border-r border-slate-100">{w.father}</td>
                    <td className="p-4 border-r border-slate-100">{w.pjoin || '-'}</td>
                    <td className="p-4">{w.kjoin || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-blue-900 p-4 text-white font-bold text-center">ADD NEW WORKER</div>
          <form className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="space-y-4">
                <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest border-b pb-1">Personal Details</h3>
                <InputGroup label="Aadhar Number *" placeholder="XXXX-XXXX-XXXX" value={aadhar} onChange={(e) => formatAadhar(e.target.value)} />
                <InputGroup label="Mistri Name *" />
                <InputGroup label="Worker Name *" />
                <InputGroup label="Father Name *" />
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Designation *</label>
                  <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 font-bold">
                    <option>SKILLED</option>
                    <option>UN-SKILLED</option>
                    <option>SEMI-SKILLED</option>
                  </select>
                </div>
                <InputGroup label="Address *" />
                <InputGroup label="Date of Birth *" type="date" />
                <InputGroup label="Phone Number *" type="tel" />
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest border-b pb-1">Documents & Bank</h3>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1">
                     <label className="text-[10px] font-black text-slate-400 uppercase">Worker Photo</label>
                     <div className="border-2 border-dashed border-slate-200 rounded-lg h-24 flex items-center justify-center text-slate-400 hover:text-blue-900 hover:border-blue-900 cursor-pointer transition-all">
                       <Camera size={24} />
                     </div>
                   </div>
                   <div className="space-y-1">
                     <label className="text-[10px] font-black text-slate-400 uppercase">Aadhar Front</label>
                     <div className="border-2 border-dashed border-slate-200 rounded-lg h-24 flex items-center justify-center text-slate-400 hover:text-blue-900 hover:border-blue-900 cursor-pointer transition-all">
                       <Camera size={24} />
                     </div>
                   </div>
                </div>
                <InputGroup label="Bank Name" />
                <InputGroup label="A/C Number" />
                <InputGroup label="IFSC Code" />
                <div className="grid grid-cols-2 gap-4 mt-4">
                   <InputGroup label="PGCIL Join Date" type="date" />
                   <InputGroup label="KAC Join Date" type="date" />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6 border-t">
              <button type="button" onClick={() => setView('LIST')} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors">BACK</button>
              <button type="submit" className="flex-1 py-3 bg-blue-900 text-white font-bold rounded-xl hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2">
                <Save size={20} /> SAVE WORKER
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const InputGroup = ({ label, placeholder, type = "text", value, onChange }: any) => (
  <div className="space-y-1">
    <label className="text-xs font-bold text-slate-500 uppercase">{label}</label>
    <input 
      type={type} 
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 font-bold" 
    />
  </div>
);

export default WorkerManagement;

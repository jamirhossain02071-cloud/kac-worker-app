
import React, { useState } from 'react';
import { UserSession } from '../types';
import { ChevronLeft, FileDown, Eye, EyeOff, LayoutGrid, ChevronRight, ChevronDown } from 'lucide-react';

interface Props {
  session: UserSession;
  onBack: () => void;
}

const AttendanceSystem: React.FC<Props> = ({ session, onBack }) => {
  const [view, setView] = useState<'TYPE_SELECT' | 'TABLE'>('TYPE_SELECT');
  const [attType, setAttType] = useState<'PGCIL' | 'KAC'>('PGCIL');
  const [isDesigExpanded, setIsDesigExpanded] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  // Mock Attendance Header/Body exactly as requested
  const headers = ["SL", "WORKER NAME", "EMP ID", "1", "2", "3", "4", "5", "6", "TOTAL"];
  const rows = [
    ["1", "RAMESH KUMAR", "E001", "P", "P", "A", "P", "P", "P", "5"],
    ["2", "SURESH PRASAD", "E002", "P", "A", "A", "A", "P", "P", "3"],
    ["3", "ALOK SINGH", "E003", "P", "P", "P", "P", "P", "P", "6"],
  ];

  const summary = {
    "HIGH SKILLED": [0, 1, 0, 1, 1, 1, 4],
    "SKILLED": [1, 0, 1, 1, 1, 1, 5],
    "UNSKILLED": [1, 1, 1, 1, 0, 0, 4]
  };

  const totals = [2, 2, 2, 3, 2, 2, 13];

  return (
    <div className="p-4 max-w-[100vw]">
      <div className="flex items-center justify-between mb-6 max-w-6xl mx-auto">
        <button onClick={view === 'TABLE' ? () => setView('TYPE_SELECT') : onBack} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-xl font-black text-slate-800 uppercase tracking-tight">Attendance System</h1>
        <div className="w-10"></div>
      </div>

      {view === 'TYPE_SELECT' ? (
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center mb-6">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Select Month</span>
            <select className="mt-2 block w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-blue-900 outline-none">
              <option>Current Month</option>
              <option>Previous Month</option>
            </select>
          </div>
          
          <button 
            onClick={() => { setAttType('PGCIL'); setView('TABLE'); }}
            className="w-full p-6 bg-white border border-slate-200 rounded-2xl flex items-center justify-between group hover:border-blue-300 transition-all shadow-sm"
          >
            <div className="text-left">
              <h4 className="text-lg font-black text-slate-800">PGCIL ATTENDANCE</h4>
              <p className="text-sm text-slate-400 font-medium">Standard PGCIL Format</p>
            </div>
            <ChevronRight className="text-slate-300 group-hover:text-blue-900 group-hover:translate-x-1 transition-all" />
          </button>

          <button 
            onClick={() => { setAttType('KAC'); setView('TABLE'); }}
            className="w-full p-6 bg-white border border-slate-200 rounded-2xl flex items-center justify-between group hover:border-blue-300 transition-all shadow-sm"
          >
            <div className="text-left">
              <h4 className="text-lg font-black text-slate-800">KAC ATTENDANCE</h4>
              <p className="text-sm text-slate-400 font-medium">Internal KAC Site Format</p>
            </div>
            <ChevronRight className="text-slate-300 group-hover:text-blue-900 group-hover:translate-x-1 transition-all" />
          </button>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-right-4">
          <div className="bg-blue-900 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <h2 className="font-bold">{attType} - {session.project}</h2>
            <button className="flex items-center gap-1 text-xs bg-white/20 px-3 py-1.5 rounded-full hover:bg-white/30">
              <FileDown size={14} /> PDF
            </button>
          </div>

          <div className={`overflow-auto bg-white border border-slate-200 shadow-xl max-h-[70vh] relative ${isMobileExpanded ? 'w-max' : 'w-full'}`}>
            <table className="w-full border-collapse text-xs font-bold min-w-max">
              <thead className="sticky top-0 z-50">
                {/* Designation Summary Toggle */}
                <tr 
                  className="bg-blue-50 text-blue-900 cursor-pointer hover:bg-blue-100 transition-colors"
                  onClick={() => setIsDesigExpanded(!isDesigExpanded)}
                >
                  <th className="p-3 border sticky left-0 bg-blue-50 z-[60] w-10 sticky-shadow"></th>
                  <th className="p-3 border text-left sticky left-10 bg-blue-50 z-[60] w-48 sticky-shadow">
                    DESIGNATION SUMMARY 
                    {isDesigExpanded ? <ChevronDown size={14} className="inline ml-2" /> : <ChevronRight size={14} className="inline ml-2" />}
                  </th>
                  <th className="p-3 border m-hide lg:table-cell"></th>
                  {totals.map((_, i) => (
                    <th key={i} className={`p-3 border text-center ${i < totals.length - 1 ? 'm-hide lg:table-cell' : ''}`}></th>
                  ))}
                </tr>

                {/* Summary Rows (Conditional) */}
                {isDesigExpanded && Object.entries(summary).map(([type, vals], sIdx) => (
                  <tr key={sIdx} className="bg-white text-slate-600">
                    <td className="p-2 border sticky left-0 bg-white z-[55] sticky-shadow"></td>
                    <td className="p-2 border text-left sticky left-10 bg-white z-[55] sticky-shadow text-blue-900">{type}</td>
                    <td className="p-2 border m-hide lg:table-cell"></td>
                    {vals.map((v, i) => (
                      <td key={i} className={`p-2 border text-center ${i < vals.length - 1 ? 'm-hide lg:table-cell' : ''}`}>{v}</td>
                    ))}
                  </tr>
                ))}

                {/* Total Manpower Row */}
                <tr className="bg-orange-50 text-orange-700">
                  <th className="p-3 border sticky left-0 bg-orange-50 z-[55] sticky-shadow"></th>
                  <th className="p-3 border text-left sticky left-10 bg-orange-50 z-[55] sticky-shadow">TOTAL MANPOWER</th>
                  <th className="p-3 border m-hide lg:table-cell"></th>
                  {totals.map((t, i) => (
                    <th key={i} className={`p-3 border text-center ${i < totals.length - 1 ? 'm-hide lg:table-cell' : ''}`}>{t}</th>
                  ))}
                </tr>

                {/* Main Header Row */}
                <tr className="bg-slate-100 text-blue-900">
                  <th className="p-3 border border-slate-300 sticky left-0 bg-slate-100 z-[60] sticky-shadow">SL</th>
                  <th className="p-3 border border-slate-300 text-left sticky left-10 bg-slate-100 z-[60] sticky-shadow min-w-[200px]">
                    WORKER NAME
                    <button onClick={(e) => { e.stopPropagation(); setIsMobileExpanded(!isMobileExpanded); }} className="ml-2 lg:hidden">
                      <LayoutGrid size={14} />
                    </button>
                  </th>
                  <th className="p-3 border border-slate-300 m-hide lg:table-cell">EMP ID</th>
                  {headers.slice(3).map((h, i) => (
                    <th key={i} className={`p-3 border border-slate-300 text-center ${i < headers.length - 4 ? 'm-hide lg:table-cell' : ''}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              
              <tbody className="divide-y divide-slate-200">
                {rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50">
                    <td className="p-3 border sticky left-0 bg-white z-20 sticky-shadow">{row[0]}</td>
                    <td className="p-3 border sticky left-10 bg-white z-20 text-blue-900 sticky-shadow font-black uppercase">{row[1]}</td>
                    <td className="p-3 border m-hide lg:table-cell text-slate-500">{row[2]}</td>
                    {row.slice(3).map((cell, cIdx) => {
                      let color = "text-slate-400";
                      let bg = "";
                      if (cell === 'P') { color = "text-green-700"; bg = "bg-green-50"; }
                      if (cell === 'A') { color = "text-red-700"; bg = "bg-red-50"; }
                      return (
                        <td key={cIdx} className={`p-3 border text-center font-black ${bg} ${color} ${cIdx < row.length - 4 ? 'm-hide lg:table-cell' : ''}`}>
                          {cell}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
            Sticky Logic: SL and Worker Name are fixed to left for accessibility.
          </p>
        </div>
      )}

      <style>{`
        @media (max-width: 1023px) {
          .m-hide { display: none; }
        }
      `}</style>
    </div>
  );
};

export default AttendanceSystem;

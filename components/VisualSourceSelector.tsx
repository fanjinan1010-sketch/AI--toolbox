
import React from 'react';
import { VisualMode } from '../types';

interface Props {
  onSelect: (mode: VisualMode) => void;
}

export const VisualSourceSelector: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="w-full">
      <div 
        onClick={() => onSelect(VisualMode.UPLOAD_MONTAGE)}
        className="group relative flex flex-col items-center text-center p-12 bg-white border border-slate-200 rounded-xl hover:border-[#3B5BFF] hover:shadow-xl hover:shadow-[#3B5BFF]/10 transition-all duration-300 overflow-hidden cursor-pointer"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-slate-200 group-hover:bg-[#3B5BFF] transition-colors" />
        
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#3B5BFF] transition-all duration-300">
          <svg className="w-8 h-8 text-[#3B5BFF] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
        </div>
        
        <div className="relative">
          <h3 className="text-xl font-bold text-slate-800 mb-2">上传本地素材</h3>
          <p className="text-base text-slate-500 mb-8">AI智能成片：自动将你的素材与文案音频进行匹配和剪辑</p>
        </div>
        
        <div className="w-full max-w-xl p-10 border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/50 group-hover:border-[#3B5BFF]/30 group-hover:bg-[#3B5BFF]/5 transition-all mb-4 flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 bg-[#3B5BFF] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#3B5BFF]/20">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-base font-bold text-[#3B5BFF]">导入</span>
          </div>

          <div className="space-y-1 text-center">
            <p className="text-[13px] text-slate-400 font-normal">建议上传 ≥10 个素材，总时长 10 秒–10 分钟</p>
            <p className="text-[13px] text-slate-400 font-normal">单个素材 ≤10 秒，≤50MB</p>
            <div className="pt-2">
              <button 
                className="text-[13px] text-[#3B5BFF] font-medium hover:underline" 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  window.open('https://iqiel8z1bh.feishu.cn/wiki/Qsncw3GEniIXxsktdr0cF4HSnEc', '_blank');
                }}
              >
                查看拍摄指导
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

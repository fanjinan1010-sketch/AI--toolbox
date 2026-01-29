
import React from 'react';
import { VisualMode } from '../types';

interface Props {
  onSelect: (mode: VisualMode) => void;
}

export const VisualSourceSelector: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="flex justify-center">
      <button 
        onClick={() => onSelect(VisualMode.UPLOAD_MONTAGE)}
        className="group relative flex flex-col items-center text-center p-8 bg-white border border-slate-200 rounded-xl hover:border-[#3B5BFF] hover:shadow-xl hover:shadow-[#3B5BFF]/10 transition-all duration-300 overflow-hidden w-full max-w-md"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-slate-200 group-hover:bg-[#3B5BFF] transition-colors" />
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <svg className="w-8 h-8 text-slate-400 group-hover:text-[#3B5BFF] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">上传本地素材</h3>
        <p className="text-sm text-slate-500 mb-6 px-4">AI 智能蒙太奇：自动将您现有的品牌资产与脚本对齐。</p>
        <div className="w-full p-4 border-2 border-dashed border-slate-100 rounded-lg bg-slate-50/50 group-hover:border-[#3B5BFF]/30 group-hover:bg-[#3B5BFF]/5 transition-all">
          <span className="text-xs font-medium text-slate-400 group-hover:text-[#3B5BFF]">拖拽文件或点击浏览</span>
        </div>
      </button>
    </div>
  );
};

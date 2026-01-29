
import React from 'react';

export const ActionBar: React.FC = () => {
  return (
    <div className="h-20 bg-white border-t border-slate-200 fixed bottom-0 left-0 right-0 flex items-center px-8 z-30 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
      <div className="flex items-center gap-6">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">预计总时长</span>
          <span className="text-sm font-bold text-slate-700">00:42</span>
        </div>
        <div className="w-px h-8 bg-slate-200" />
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">输出质量</span>
          <span className="text-sm font-bold text-slate-700">1080p (高清)</span>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <button className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
          保存草稿
        </button>
        <button className="flex items-center gap-3 px-8 py-3 bg-[#3B5BFF] text-white rounded-lg font-bold hover:bg-[#3B5BFF]/90 shadow-lg shadow-[#3B5BFF]/20 active:scale-95 transition-all">
          <span>生成视频</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

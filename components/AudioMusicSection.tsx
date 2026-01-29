
import React from 'react';

export const AudioMusicSection: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
      <div className="grid grid-cols-2 gap-10">
        <div className="space-y-6">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-4 block">配音音色选择</label>
            <div className="flex items-center gap-3">
              <select className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#3B5BFF]/20">
                <option>Nova (感性且温暖)</option>
                <option>Atlas (深沉且权威)</option>
                <option>Echo (冷静且专业)</option>
              </select>
              <button className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">配音音量</span>
              <span className="text-xs font-bold text-[#3B5BFF]">85%</span>
            </div>
            <input type="range" className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#3B5BFF]" />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-4 block">背景音乐</label>
            <div className="flex items-center gap-3">
              <select className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#3B5BFF]/20">
                <option>电影级管弦乐 (张力)</option>
                <option>现代 Lo-Fi (宁静)</option>
                <option>电子/脉冲 (现代)</option>
              </select>
              <button className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors">
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">音乐音量</span>
              <span className="text-xs font-bold text-[#3B5BFF]">30%</span>
            </div>
            <input type="range" className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#3B5BFF]" />
          </div>
        </div>
      </div>
    </div>
  );
};


import React from 'react';
import { AppView } from '../types';

interface LandingPageProps {
  onSelect: (view: AppView) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSelect }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#F5F7F9]">
      <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">欢迎使用 AI 视频创作中心</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          AI智能成片帮助你快速制作图书营销视频，无论是自备素材还是 AI 生成，都能在这里轻松实现。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* 卡片 1: AI 智能成片 */}
        <button 
          onClick={() => onSelect(AppView.SMART_VIDEO)}
          className="group relative bg-white border border-slate-200 rounded-2xl p-8 text-left shadow-sm hover:shadow-2xl hover:border-[#3B5BFF] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
             <svg className="w-32 h-32 text-[#3B5BFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
             </svg>
          </div>
          
          <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#3B5BFF] transition-colors duration-300">
            <svg className="w-8 h-8 text-[#3B5BFF] group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h3 className="text-2xl font-bold text-slate-800 mb-3">已有视频素材</h3>
          <p className="text-slate-500 leading-relaxed mb-8">
            AI 智能成片：上传您的现有品牌资产或样书视频，由 AI 自动完成文案对齐、配音与混剪。
          </p>
          
          <div className="inline-flex items-center gap-2 text-[#3B5BFF] font-bold group-hover:gap-4 transition-all">
            立即开始 
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </button>

        {/* 卡片 2: AI 智能编导 */}
        <button 
          onClick={() => onSelect(AppView.AI_DIRECTOR)}
          className="group relative bg-white border border-slate-200 rounded-2xl p-8 text-left shadow-sm hover:shadow-2xl hover:border-[#3B5BFF] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
             <svg className="w-32 h-32 text-[#3B5BFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
             </svg>
          </div>

          <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#3B5BFF] transition-colors duration-300">
            <svg className="w-8 h-8 text-[#3B5BFF] group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.989-2.386l-.548-.547z" />
            </svg>
          </div>

          <h3 className="text-2xl font-bold text-slate-800 mb-3">没有视频素材，需要用AI生成</h3>
          <p className="text-slate-500 leading-relaxed mb-8">
            AI 智能编导：只需输入图书创意，由 AI 从零开始构思分镜、生成电影级视觉画面与音效。
          </p>

          <div className="inline-flex items-center gap-2 text-[#3B5BFF] font-bold group-hover:gap-4 transition-all">
            开始创作
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

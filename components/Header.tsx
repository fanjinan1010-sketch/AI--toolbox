
import React from 'react';
import { AppView } from '../types';

interface HeaderProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  return (
    <header className="h-[56px] bg-white border-b border-slate-200 flex items-center px-6 shrink-0 z-20">
      {/* 左侧：系统图标/Logo */}
      <div className="flex items-center shrink-0 cursor-pointer" onClick={() => onNavigate(AppView.LANDING)}>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#3B5BFF] to-[#60A5FA] bg-clip-text text-transparent">书脉</span>
          <div className="w-[1px] h-4 bg-slate-300 mx-1"></div>
          <div className="flex items-center gap-1.5">
            <div className="relative w-5 h-5 flex items-center justify-center">
              <div className="absolute top-0 w-3 h-1 bg-[#3B5BFF]/30 rounded-t-sm"></div>
              <div className="w-5 h-4 bg-[#3B5BFF] rounded-sm mt-1"></div>
              <div className="absolute top-[5px] w-5 h-0.5 bg-white/20"></div>
            </div>
            <span className="text-base font-semibold text-slate-700">AI工具箱</span>
          </div>
        </div>
      </div>

      {/* 动态面包屑 */}
      <div className="ml-[30px] flex items-center">
        <nav className="flex items-center text-sm gap-2">
          {/* Removed the initial arrow icon from here */}
          <button 
            onClick={() => onNavigate(AppView.LANDING)}
            className={`transition-colors hover:text-[#3B5BFF] ${currentView === AppView.LANDING ? 'text-slate-900 font-bold' : 'text-slate-400 font-medium'}`}
          >
            AI制作图书营销视频
          </button>

          {currentView !== AppView.LANDING && (
            <div className="flex items-center gap-2">
              <span className="text-slate-300">/</span>
              <span className="text-slate-900 font-bold">
                {currentView === AppView.SMART_VIDEO ? 'AI智能成片' : 'AI视频编导'}
              </span>
            </div>
          )}
        </nav>
      </div>
      
      {/* 右侧：消息、头像、用户名 */}
      <div className="ml-auto flex items-center gap-6">
        <button className="relative p-1.5 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 cursor-pointer group">
          <span className="text-sm font-medium text-slate-700 group-hover:text-[#3B5BFF] transition-colors">王大锤</span>
          <div className="h-8 w-8 rounded-full bg-[#3B5BFF]/10 border border-[#3B5BFF]/20 flex items-center justify-center overflow-hidden">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

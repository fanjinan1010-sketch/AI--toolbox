
import React, { useState } from 'react';
import { AppView } from '../types';

interface HeaderProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

type CategoryType = 'TOPIC' | 'PRODUCTION' | 'MARKETING' | 'OFFICE';

interface ToolItem {
  name: string;
  view?: AppView;
}

const MENU_DATA: Record<CategoryType, { title: string, sub: string, tools: ToolItem[], illustration: React.ReactNode }> = {
  TOPIC: {
    title: '选题工具',
    sub: '智能洞察选题方向',
    tools: [
      { name: '情报中心' }, { name: '图书查询' },
      { name: '作者遴选' }, { name: 'AI写选题报告' }
    ],
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-blue-400/10 blur-2xl rounded-full"></div>
        <div className="relative flex flex-col items-center">
          <div className="w-24 h-32 bg-white rounded-lg shadow-xl border border-slate-100 p-3 transform -rotate-6">
            <div className="w-full h-2 bg-green-400 rounded-full mb-2"></div>
            <div className="w-2/3 h-2 bg-slate-100 rounded-full mb-2"></div>
            <div className="w-full h-2 bg-slate-100 rounded-full mb-4"></div>
            <div className="flex gap-1">
              <div className="w-4 h-4 bg-yellow-300 rounded-full"></div>
              <div className="flex-1 h-4 bg-slate-50 rounded"></div>
            </div>
          </div>
          <div className="absolute -right-4 top-10 w-16 h-16 bg-blue-500 rounded-2xl shadow-lg flex items-center justify-center transform rotate-12">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>
    )
  },
  PRODUCTION: {
    title: '图书生产工具',
    sub: '高效协同图书生产',
    tools: [
      { name: 'AI预审' }, { name: 'AI审校' },
      { name: 'AI改格式' }, { name: 'AI封面/插图' }
    ],
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-indigo-400/10 blur-2xl rounded-full"></div>
        <div className="relative w-32 h-24 bg-white rounded-xl shadow-xl border border-slate-100 p-4 flex items-center gap-2">
          <div className="w-8 h-12 bg-orange-400 rounded flex flex-col p-1 gap-1">
             <div className="w-full h-1 bg-white/40 rounded-full"></div>
             <div className="w-full h-1 bg-white/40 rounded-full"></div>
          </div>
          <div className="flex-1 space-y-2">
            <div className="w-full h-2 bg-slate-100 rounded-full"></div>
            <div className="w-2/3 h-2 bg-blue-500 rounded-full"></div>
          </div>
          <div className="absolute -top-4 -right-2 w-10 h-10 bg-white rounded-full shadow-lg border border-slate-50 flex items-center justify-center">
            <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
          </div>
        </div>
      </div>
    )
  },
  MARKETING: {
    title: '营销工具',
    sub: '精准传播图书价值',
    tools: [
      { name: 'AI立体封' }, { name: 'AI图书摄影图' },
      { name: 'AI电商详情图' }, { name: 'AI小红书图文' },
      { name: 'AI智能成片', view: AppView.SMART_VIDEO }, { name: 'AI视频编导', view: AppView.AI_DIRECTOR },
      { name: 'AI找达人' }, { name: 'AI写营销文案' },
      { name: 'AI招投标监控' }, { name: 'AI营销PPT' },
      { name: 'AI荐书' }
    ],
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-blue-400/10 blur-2xl rounded-full"></div>
        <div className="relative flex">
          <div className="w-20 h-28 bg-white rounded-lg shadow-lg border border-slate-100 z-10 p-2">
            <div className="w-full aspect-video bg-blue-50 rounded mb-2"></div>
            <div className="space-y-1">
              <div className="w-full h-1 bg-slate-100 rounded-full"></div>
              <div className="w-full h-1 bg-slate-100 rounded-full"></div>
              <div className="w-2/3 h-1 bg-slate-100 rounded-full"></div>
            </div>
          </div>
          <div className="w-20 h-28 bg-white/80 rounded-lg shadow border border-slate-100 -ml-12 mt-4 p-2 scale-95 opacity-80"></div>
          <div className="absolute -right-6 top-12 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center z-20 border border-slate-50">
             <div className="w-8 h-8 bg-[#3B5BFF] rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>
             </div>
          </div>
        </div>
      </div>
    )
  },
  OFFICE: {
    title: '通用办公工具',
    sub: '智能提升办公效率',
    tools: [
      { name: 'AI会议纪要' }, { name: 'AI周报生成' },
      { name: 'AI文档翻译' }, { name: '智能搜索' }
    ],
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-yellow-400/5 blur-2xl rounded-full"></div>
        <div className="relative w-36 h-28 bg-white rounded-2xl shadow-xl border border-slate-100 p-4">
           <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-50 rounded-lg"></div>
              <div className="flex-1 h-3 bg-slate-100 rounded-full"></div>
           </div>
           <div className="grid grid-cols-3 gap-2">
              <div className="h-2 bg-slate-50 rounded-full"></div>
              <div className="h-2 bg-slate-50 rounded-full"></div>
              <div className="h-2 bg-[#3B5BFF]/20 rounded-full"></div>
           </div>
           <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-xl shadow-lg border border-slate-50 flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 018 8v1a3 3 0 01-3 3H5a3 3 0 01-3-3v-1a8 8 0 018-8z" /></svg>
           </div>
        </div>
      </div>
    )
  }
};

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryType>('MARKETING');

  const handleToolClick = (tool: ToolItem) => {
    if (tool.view) {
      onNavigate(tool.view);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="h-[56px] bg-[#F8FAFC] flex items-center px-6 shrink-0 z-50 border-b border-slate-200">
      {/* 左侧：Logo & AI工具箱触发器 */}
      <div className="flex items-center shrink-0 relative h-full">
        <div className="flex items-center cursor-pointer" onClick={() => onNavigate(AppView.LANDING)}>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#3B5BFF] to-[#60A5FA] bg-clip-text text-transparent">书脉</span>
            <div className="w-[1px] h-4 bg-slate-300 mx-1"></div>
          </div>
        </div>

        {/* AI工具箱触发区 */}
        <div 
          className="h-full flex items-center gap-1.5 px-3 cursor-pointer group"
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={() => setIsMenuOpen(false)}
        >
          <div className="relative w-5 h-5 flex items-center justify-center">
            <div className="absolute top-0 w-3 h-1 bg-[#3B5BFF]/30 rounded-t-sm"></div>
            <div className="w-5 h-4 bg-[#3B5BFF] rounded-sm mt-1"></div>
            <div className="absolute top-[5px] w-5 h-0.5 bg-white/20"></div>
          </div>
          <span className="text-base font-semibold text-slate-700 group-hover:text-[#3B5BFF] transition-colors">AI工具箱</span>
          <svg className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>

          {/* Mega Menu 下拉面板 */}
          {isMenuOpen && (
            <div className="absolute top-[55px] left-0 w-[800px] bg-white rounded-b-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-x border-b border-slate-100 flex overflow-hidden animate-in slide-in-from-top-2 duration-300 z-[100]">
              {/* 左侧导航栏 */}
              <div className="w-[280px] bg-[#F8FAFF] flex flex-col pt-4 pb-8 border-r border-slate-100">
                {(Object.keys(MENU_DATA) as CategoryType[]).map((key) => (
                  <div
                    key={key}
                    onMouseEnter={() => setActiveCategory(key)}
                    className={`relative px-8 py-4 cursor-pointer transition-all duration-200 flex flex-col gap-0.5 ${activeCategory === key ? 'bg-white shadow-sm' : 'hover:bg-slate-50'}`}
                  >
                    {activeCategory === key && <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#3B5BFF]"></div>}
                    <span className={`text-base ${activeCategory === key ? 'text-[#3B5BFF] font-medium' : 'text-slate-700 font-normal'}`}>
                      {MENU_DATA[key].title}
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal">{MENU_DATA[key].sub}</span>
                  </div>
                ))}

                {/* 动态插画区域 */}
                <div className="mt-auto px-6 pb-4">
                  <div className="w-full aspect-square bg-[#3B5BFF]/5 rounded-3xl overflow-hidden border border-[#3B5BFF]/10 relative">
                    {MENU_DATA[activeCategory].illustration}
                  </div>
                </div>
              </div>

              {/* 右侧工具矩阵 */}
              <div className="flex-1 bg-white p-10">
                <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                  {MENU_DATA[activeCategory].tools.map((tool, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleToolClick(tool)}
                      className="group flex items-center justify-between text-left transition-all"
                    >
                      <span className="text-sm font-normal text-[#3D3D3D] group-hover:text-[#3B5BFF] group-hover:translate-x-1 transition-all">
                        {tool.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 动态面包屑 */}
      <div className="ml-[10px] flex items-center">
        <nav className="flex items-center text-sm gap-2">
          <button 
            onClick={() => onNavigate(AppView.LANDING)}
            className={`transition-colors hover:text-[#3B5BFF] ${currentView === AppView.LANDING ? 'text-slate-900 font-normal' : 'text-slate-400 font-normal'}`}
          >
            AI制作图书营销视频
          </button>

          {currentView !== AppView.LANDING && (
            <div className="flex items-center gap-2">
              <span className="text-slate-300">/</span>
              <span className="text-slate-900 font-normal">
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

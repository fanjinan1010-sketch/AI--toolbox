
import React from 'react';
import { AppView } from '../types';

interface AiToolboxProps {
  onNavigate: (view: AppView) => void;
}

const SIDEBAR_STRUCTURE = [
  { id: 'home', name: '首页', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { 
    name: '工作台', 
    items: [
      { id: 'todo', name: '待办/已办', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
      { id: 'warning', name: '数据预警/AI建议', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
      { id: 'msg', name: '消息通知', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
    ] 
  },
  {
    name: '智能选题',
    items: [
      { id: 'topic-find', name: '选题发现', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
      { id: 'topic-manage', name: '选题管理', icon: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2' },
      { id: 'topic-verify', name: '选题论证', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
      { id: 'topic-report', name: '上报和批复', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
      { id: 'topic-review', name: '选题送审', icon: 'M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4' },
      { id: 'cip', name: '书号/CIP发放', icon: 'M7 7h.01M7 11h.01M7 15h.01M10 7h10M10 11h10M10 15h10' },
    ]
  },
  {
    name: '智能生产',
    items: [
      { id: 'review-3', name: '三审', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
      { id: 'qa', name: '校对质检', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
      { id: 'publish', name: '发印', icon: 'M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z' },
    ]
  },
  {
    name: 'AI工具箱',
    items: [
      { id: 'ai-toolbox', name: 'AI工具箱', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z', active: true },
    ]
  }
];

const CATEGORIES = [
  {
    title: '选题工具',
    tools: ['情报中心', '图书查询', '作者遴选', 'AI写选题报告']
  },
  {
    title: '图书生产工具',
    tools: ['AI预审', 'AI审校', 'AI改格式', 'AI封面/插图']
  },
  {
    title: '营销工具',
    tools: ['AI立体封', 'AI图书摄影图', 'AI电商详情图', 'AI小红书图文', 'AI智能成片', 'AI视频编导', 'AI找达人', 'AI写营销文案', 'AI招投标监控', 'AI营销PPT', 'AI荐书']
  },
  {
    title: '通用办公工具',
    tools: ['AI热点话题', 'AI写文案', 'AI写公文公函', 'AI写公文邮件', 'AI写宣传文案', 'AI写申报材料', 'AI写外文书讯', 'AI翻译', 'AI文生图', 'AI图片工具', '通用AI生视频', 'AI生成政策解读', 'AI盗版书识别']
  }
];

export const AiToolbox: React.FC<AiToolboxProps> = ({ onNavigate }) => {
  const handleToolClick = (name: string) => {
    if (name === 'AI智能成片' || name === 'AI视频编导') {
      onNavigate(AppView.LANDING);
    }
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-white">
      {/* Sidebar - Fixed Width 200px, Background #F6F8FA */}
      <aside className="w-[200px] border-r border-slate-100 flex flex-col shrink-0 bg-[#F6F8FA] overflow-y-auto pb-8 z-20">
        {/* Logo Section - Side by Side, Text #181E29 Regular */}
        <div className="p-6 pb-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#3B5BFF] to-[#60A5FA] bg-clip-text text-transparent">书脉</span>
            <span className="text-[14px] font-normal text-[#181E29] whitespace-nowrap opacity-80">AI智慧出版平台</span>
          </div>
        </div>

        <div className="px-3 flex flex-col gap-6">
          {SIDEBAR_STRUCTURE.map((section, idx) => (
            <div key={idx} className="space-y-1">
              {section.items ? (
                <>
                  <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between group cursor-default">
                    {section.name}
                    <svg className="w-3 h-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {section.items.map(item => (
                    <div 
                      key={item.id}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] transition-all cursor-pointer ${item.active ? 'bg-[#3B5BFF]/10 text-[#3B5BFF] font-bold' : 'text-slate-600 hover:bg-white/60'}`}
                    >
                      {item.icon && (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                        </svg>
                      )}
                      {item.name}
                    </div>
                  ))}
                </>
              ) : (
                <div 
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] text-slate-600 hover:bg-white/60 transition-all cursor-pointer"
                >
                  {section.icon && (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={section.icon} />
                    </svg>
                  )}
                  {section.name}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative bg-white">
        {/* Sticky Header Section - Contains Title, Desc, and User Actions */}
        <div className="sticky top-0 bg-white z-30 px-12 pt-8 pb-6 border-b border-slate-50 flex items-start justify-between shadow-sm shadow-slate-50">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">AI工具箱</h1>
            <p className="text-sm text-slate-500 leading-relaxed max-w-3xl font-normal">
              这里汇集了为出版工作场景定制的智能工具，帮助你更高效地完成写作、翻译、图片与视频相关工作。你可以在下方快速选择工具及场景，或直接开始创作。
            </p>
          </div>
          
          <div className="flex items-center gap-6 pt-1">
            <button className="relative p-1.5 text-slate-400 hover:text-[#3B5BFF] transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
            </button>

            <div className="flex items-center gap-3 cursor-pointer group">
              <span className="text-sm font-medium text-slate-700 group-hover:text-[#3B5BFF] transition-colors">王大锤</span>
              <div className="h-8 w-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Body - Only tool cards scroll */}
        <main className="flex-1 overflow-y-auto px-12 py-8 scroll-smooth">
          <div className="max-w-7xl w-full mx-auto space-y-12 pb-20">
            
            {/* History Row - Placed right above the first category */}
            <div className="flex items-center justify-end mb-4">
              <button className="flex items-center gap-2 text-slate-400 hover:text-[#3B5BFF] transition-colors text-[13px] font-medium">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                历史记录
              </button>
            </div>

            {/* Grid Categories */}
            <div className="space-y-14">
              {CATEGORIES.map((cat, idx) => (
                <div key={idx} className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
                  <h2 className="text-[15px] font-bold text-slate-800 border-l-4 border-[#3B5BFF] pl-3 leading-none">{cat.title}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {cat.tools.map((tool, tIdx) => (
                      <div 
                        key={tIdx} 
                        onClick={() => handleToolClick(tool)}
                        className="group bg-white border border-slate-100 rounded-xl p-4 flex items-center justify-between hover:border-[#3B5BFF] hover:shadow-xl hover:shadow-[#3B5BFF]/5 transition-all cursor-pointer"
                      >
                        <div className="flex flex-col gap-0.5 overflow-hidden">
                          <span className="text-[14px] font-bold text-slate-800 truncate group-hover:text-[#3B5BFF] transition-colors">{tool}</span>
                          <span className="text-[11px] text-slate-300 font-normal">功能描述占位</span>
                        </div>
                        <div className="w-10 h-10 bg-[#F9FBFC] rounded-lg flex items-center justify-center shrink-0 transition-colors group-hover:bg-[#3B5BFF]/5">
                          <svg className="w-5 h-5 text-slate-200 group-hover:text-[#3B5BFF]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

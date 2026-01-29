
import React, { useState } from 'react';
import { Header } from './components/Header';
import { ScriptEngine } from './components/ScriptEngine';
import { VisualSourceSelector } from './components/VisualSourceSelector';
import { AudioMusicSection } from './components/AudioMusicSection';
import { ActionBar } from './components/ActionBar';
import { MediaAlignmentList } from './components/MediaAlignmentList';
import { BookInfoModal } from './components/BookInfoModal';
import { LandingPage } from './components/LandingPage';
import { StickerLibraryModal } from './components/StickerLibraryModal';
import { VisualMode, ScriptSentence, BookData, AppView } from './types';

const DEMO_BOOK_DATA: BookData = {
  title: '量子地平线：跨越维度的旅程',
  author: '埃琳娜·万斯 博士',
  summary: '通过一位叛逆物理学家的视角，对多重宇宙理论进行引人入胜的探索。本书揭示了现实世界背后的隐藏结构，挑战读者对时间与空间的认知。',
  sellingPoints: '1. 硬核科幻与前沿物理的完美结合；2. 2024年度科学幻想奖入围作品；3. 深度解读量子纠缠与多重宇宙。',
  targetAudience: '科幻小说爱好者，物理学专业学生，对平行 universe 感兴趣的读者。',
  files: [
    { name: '量子地平线_精彩样张.pdf', type: 'pdf' },
    { name: '宣发素材图.jpg', type: 'jpg' }
  ]
};

const EMPTY_BOOK_DATA: BookData = {
  title: '',
  author: '',
  summary: '',
  sellingPoints: '',
  targetAudience: '',
  files: []
};

const INITIAL_SCRIPT: ScriptSentence[] = [
  { id: '1', text: "在浩瀚的宇宙中，每一个选择都在创造一个新的世界。" },
  { id: '2', text: "埃琳娜博士发现了跨越维度的秘密，但代价超乎想象。" }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [bookData, setBookData] = useState<BookData>(EMPTY_BOOK_DATA);
  const [script, setScript] = useState<ScriptSentence[]>(INITIAL_SCRIPT);
  const [visualMode, setVisualMode] = useState<VisualMode>(VisualMode.SELECTION);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isStickerModalOpen, setIsStickerModalOpen] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState<{id: string, name: string, url: string} | null>(null);

  const hasBookInfo = bookData.title.trim() !== '';

  const handleQuickFill = () => {
    setBookData(DEMO_BOOK_DATA);
  };

  const handleClearData = () => {
    setBookData(EMPTY_BOOK_DATA);
  };

  const handleAiSmartSelect = () => {
    const aiSticker = { 
      id: 'AI-1', 
      name: 'AI 智能推荐贴片', 
      url: 'https://api.dicebear.com/7.x/shapes/svg?seed=ai-smart' 
    };
    setSelectedSticker(aiSticker);
  };

  const renderSmartVideoTool = () => (
    <div className="flex-1 flex overflow-hidden animate-in fade-in duration-500">
      {/* 左侧区域 (30%): 全白底色 */}
      <aside className="w-[30%] min-w-[360px] bg-white border-r border-slate-200 overflow-y-auto flex flex-col p-8 space-y-12 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
        
        {/* 图书信息部分 */}
        <section>
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">图书信息</h2>
              <p className="text-sm text-slate-400 mt-1 leading-tight">完善书籍背景，帮助 AI 理解您的书籍内容。</p>
            </div>
            
            <div className="flex gap-3 pt-1">
              {!hasBookInfo ? (
                <button 
                  onClick={handleQuickFill}
                  className="text-slate-400 hover:text-[#3B5BFF] text-[11px] font-medium transition-colors hover:underline"
                >
                  演示填入
                </button>
              ) : (
                <button 
                  onClick={handleClearData}
                  className="text-slate-400 hover:text-red-500 text-[11px] font-medium transition-colors hover:underline"
                >
                  清除
                </button>
              )}
            </div>
          </div>
          
          <div className={`bg-slate-50 border border-slate-100 rounded-2xl p-5 flex flex-col gap-5 transition-all duration-300 ${hasBookInfo ? 'opacity-100 shadow-sm' : 'opacity-80'}`}>
            {hasBookInfo ? (
              <div className="flex items-center gap-4 animate-in slide-in-from-left-2">
                <div className="w-12 h-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-[#3B5BFF] shrink-0 shadow-sm">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-bold text-slate-800 truncate text-base">{bookData.title}</h4>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{bookData.author || '未知作者'}</p>
                </div>
              </div>
            ) : (
              <div className="py-2 flex flex-col items-center justify-center text-slate-300 gap-2 border-2 border-dashed border-slate-200 rounded-xl bg-white/50">
                <svg className="w-8 h-8 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-medium text-slate-400">尚未配置图书数据</span>
              </div>
            )}
            
            <button 
              onClick={() => setIsBookModalOpen(true)}
              className="w-full py-2.5 rounded-xl text-sm font-bold transition-all active:scale-[0.98] border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300"
            >
              {hasBookInfo ? '修改图书信息' : '填写图书信息'}
            </button>
          </div>
        </section>

        {/* 视频文案部分 */}
        <section className="flex-1 flex flex-col min-h-0">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">视频文案</h2>
            <p className="text-sm text-slate-400 mt-1">输入或由 AI 生成您的视频旁白文案。</p>
          </div>
          <div className="flex-1 min-h-[300px]">
            <ScriptEngine sentences={script} onUpdate={setScript} />
          </div>
        </section>
      </aside>

      {/* 右侧区域 (70%): 浅灰底色 */}
      <main className="w-[70%] bg-[#F5F7F9] overflow-y-auto pb-32 pt-10 px-12 space-y-16">
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">视觉素材选择</h2>
            <p className="text-base text-slate-500 mt-1.5">为您的视频文案匹配高质量视觉画面。</p>
          </div>
          <div className="w-full">
            {visualMode === VisualMode.SELECTION ? (
              <VisualSourceSelector onSelect={setVisualMode} />
            ) : visualMode === VisualMode.UPLOAD_MONTAGE ? (
              <MediaAlignmentList 
                sentences={script} 
                onBack={() => setVisualMode(VisualMode.SELECTION)}
              />
            ) : (
              <div className="p-16 bg-white border border-slate-200 rounded-3xl text-center shadow-sm">
                <p className="text-slate-500">AI 导演视图即将上线...</p>
                <button 
                  onClick={() => setVisualMode(VisualMode.SELECTION)}
                  className="mt-4 text-[#3B5BFF] font-medium hover:underline"
                >
                  返回选择
                </button>
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">画面贴片</h2>
            <div className="flex items-center gap-2 pb-0.5">
              <button 
                onClick={handleAiSmartSelect}
                className="flex items-center gap-2 px-4 py-2 bg-[#3B5BFF]/5 text-[#3B5BFF] border border-[#3B5BFF]/20 rounded-xl text-sm font-bold hover:bg-[#3B5BFF]/10 transition-all active:scale-95"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.047a1 1 0 00-1.6 0l-8.6 10.1A1 1 0 001.9 12.8h6.2L6.8 18.9a1 1 0 001.6 0l8.6-10.1a1 1 0 00-1.3-1.65l-6.2 1.3L11.3 1.047z" clipRule="evenodd" />
                </svg>
                AI 智选贴片
              </button>
              
              <div className="relative group">
                <div className="p-1 cursor-help text-slate-400 hover:text-slate-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full right-0 mb-3 w-48 p-3 bg-slate-800 text-white text-xs leading-relaxed rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all transform translate-y-2 group-hover:translate-y-0 z-50">
                  点击AI智选，可一键智能选择贴片
                  <div className="absolute top-full right-2.5 -mt-1 w-2 h-2 bg-slate-800 rotate-45"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-white border border-slate-200 rounded-xl shadow-sm p-8 flex flex-col items-center justify-center gap-6">
            {selectedSticker ? (
              <div className="flex flex-col items-center gap-4 w-full">
                <div className="relative group w-48 aspect-square rounded-2xl overflow-hidden border border-slate-100 bg-slate-50">
                  <img src={selectedSticker.url} alt={selectedSticker.name} className="w-full h-full object-contain p-4" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <button 
                      onClick={() => setSelectedSticker(null)}
                      className="p-2 bg-white text-red-500 rounded-full hover:scale-110 transition-transform"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-slate-800">{selectedSticker.name}</p>
                  <button 
                    onClick={() => setIsStickerModalOpen(true)}
                    className="mt-2 text-[#3B5BFF] text-xs font-bold hover:underline"
                  >
                    更换贴片
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#3B5BFF]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                  </svg>
                </div>
                <button 
                  onClick={() => setIsStickerModalOpen(true)}
                  className="px-8 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:border-[#3B5BFF] hover:text-[#3B5BFF] hover:bg-blue-50 transition-all active:scale-95"
                >
                  选择贴片素材
                </button>
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">音频与音乐</h2>
            <p className="text-base text-slate-500 mt-1.5">配置视频背景音乐和 AI 配音音色。</p>
          </div>
          <div className="w-full">
            <AudioMusicSection />
          </div>
        </section>
      </main>
      
      <ActionBar />

      <BookInfoModal 
        isOpen={isBookModalOpen} 
        onClose={() => setIsBookModalOpen(false)} 
        data={bookData} 
        onUpdate={setBookData} 
      />

      <StickerLibraryModal 
        isOpen={isStickerModalOpen}
        onClose={() => setIsStickerModalOpen(false)}
        onSelect={(sticker) => {
          setSelectedSticker(sticker);
          setIsStickerModalOpen(false);
        }}
      />
    </div>
  );

  const renderAiDirectorTool = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-8 animate-in fade-in duration-500 bg-[#F5F7F9]">
      <div className="bg-white border border-slate-200 p-16 rounded-3xl shadow-2xl text-center max-w-xl">
        <div className="w-24 h-24 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-8 transform rotate-3">
          <svg className="w-12 h-12 text-[#3B5BFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">AI 视频编导模式</h2>
        <p className="text-lg text-slate-500 mb-10 leading-relaxed">
          此模式正在深度研发中，将为您带来全自动、电影级的生成式视频创作体验。
        </p>
        <button 
          onClick={() => setCurrentView(AppView.LANDING)}
          className="px-10 py-4 bg-[#3B5BFF] text-white rounded-xl font-bold shadow-xl shadow-[#3B5BFF]/20 active:scale-95 transition-all"
        >
          返回创作中心
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#F5F7F9]">
      <Header currentView={currentView} onNavigate={setCurrentView} />
      
      {currentView === AppView.LANDING ? (
        <LandingPage onSelect={setCurrentView} />
      ) : currentView === AppView.SMART_VIDEO ? (
        renderSmartVideoTool()
      ) : (
        renderAiDirectorTool()
      )}
    </div>
  );
};

export default App;

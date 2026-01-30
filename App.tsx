
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
import { VisualMode, ScriptSentence, BookData, AppView, FileInfo } from './types';

const DEMO_BOOK_DATA: BookData = {
  title: '量子地平线：跨越维度的旅程',
  author: '埃琳娜·万斯 博士',
  summary: '通过一位叛逆物理学家的视角，对多重宇宙理论进行引人入胜的探索。本书揭示了现实世界背后的隐藏结构，挑战读者对时间与空间的认知。在多重宇宙的边缘，科学与人性交织在一起。',
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
  { id: 'initial-1', text: '' }
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

  const renderGuide = () => (
    <main className="w-[75%] bg-[#F5F7F9] flex items-center justify-center p-12 overflow-hidden">
      <div className="max-w-3xl w-full space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">开启图书营销视频创作之旅</h2>
          <p className="text-slate-500 text-lg">仅需简单三步，即可生成具有吸引力的营销视频。</p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center space-y-4 group">
            <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 font-bold group-hover:border-[#3B5BFF] group-hover:text-[#3B5BFF] transition-all">1</div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 text-lg">配置图书信息</h4>
              <p className="text-base text-slate-500 leading-relaxed">让 AI 深度理解您的书籍内容，作为视频生成的根基。</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center space-y-4 group">
            <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 font-bold group-hover:border-[#3B5BFF] group-hover:text-[#3B5BFF] transition-all">2</div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 text-lg">编写视频文案</h4>
              <p className="text-base text-slate-500 leading-relaxed">基于图书智能生成视频文案，快速实现脚本自由。</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center space-y-4 group">
            <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 font-bold group-hover:border-[#3B5BFF] group-hover:text-[#3B5BFF] transition-all">3</div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 text-lg">匹配视觉音频</h4>
              <p className="text-base text-slate-500 leading-relaxed">智能处理视频素材，添加精美贴片，一键合成高清大片。</p>
            </div>
          </div>
        </div>

        <div className="pt-6 flex justify-center">
          <button 
            onClick={() => setIsBookModalOpen(true)}
            className="px-10 py-4 bg-[#3B5BFF] text-white rounded-xl font-bold text-lg hover:bg-[#3B5BFF]/90 shadow-xl shadow-[#3B5BFF]/20 active:scale-95 transition-all flex items-center gap-3"
          >
            开始第一步：配置图书
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );

  const renderConfiguration = () => (
    <main className="w-[75%] bg-[#F5F7F9] overflow-y-auto pb-32 pt-10 px-12 space-y-16 animate-in fade-in duration-500">
      <section>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">视觉素材选择</h2>
          <p className="text-base text-slate-500 mt-1.5">为您的视频文案匹配高质量视觉画面。</p>
        </div>
        <div className="w-full">
          {visualMode === VisualMode.SELECTION ? (
            <VisualSourceSelector onSelect={setVisualMode} />
          ) : visualMode === VisualMode.UPLOAD_MONTAGE ? (
            <MediaAlignmentList sentences={script} onBack={() => setVisualMode(VisualMode.SELECTION)} />
          ) : (
            <div className="p-16 bg-white border border-slate-200 rounded-lg text-center shadow-sm">
              <p className="text-slate-500">AI 导演视图即将上线...</p>
              <button onClick={() => setVisualMode(VisualMode.SELECTION)} className="mt-4 text-[#3B5BFF] font-medium hover:underline">返回选择</button>
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
              className="flex items-center gap-2 px-4 py-2 bg-[#3B5BFF]/5 text-[#3B5BFF] border border-[#3B5BFF]/20 rounded-lg text-sm font-bold hover:bg-[#3B5BFF]/10 transition-all active:scale-95"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.047a1 1 0 00-1.6 0l-8.6 10.1A1 1 0 001.9 12.8h6.2L6.8 18.9a1 1 0 00-1.6 0l8.6-10.1a1 1 0 00-1.3-1.65l-6.2 1.3L11.3 1.047z" clipRule="evenodd" />
              </svg>
              AI 智选贴片
            </button>
          </div>
        </div>

        <div className="w-full bg-white border border-slate-200 rounded-xl shadow-sm p-12 flex flex-col items-center justify-center gap-6">
          {selectedSticker ? (
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="relative group w-48 aspect-square rounded-lg overflow-hidden border border-slate-100 bg-slate-50">
                <img src={selectedSticker.url} alt={selectedSticker.name} className="w-full h-full object-contain p-4" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <button onClick={() => setSelectedSticker(null)} className="p-2 bg-white text-red-500 rounded-lg hover:scale-110 transition-transform">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-slate-800">{selectedSticker.name}</p>
                <button onClick={() => setIsStickerModalOpen(true)} className="mt-2 text-[#3B5BFF] text-xs font-bold hover:underline">更换贴片</button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-[#3B5BFF]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                </svg>
              </div>
              <button onClick={() => setIsStickerModalOpen(true)} className="px-8 py-2.5 border border-slate-200 text-slate-600 rounded-lg font-bold text-sm hover:border-[#3B5BFF] hover:text-[#3B5BFF] hover:bg-blue-50 transition-all active:scale-95">选择贴片素材</button>
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">音频与音乐</h2>
        </div>
        <div className="w-full">
          <AudioMusicSection />
        </div>
      </section>
    </main>
  );

  const renderSmartVideoTool = () => (
    <div className="flex-1 flex overflow-hidden">
      <aside className="w-[25%] min-w-[360px] bg-white border-r border-slate-200 overflow-y-auto flex flex-col p-8 pb-24 space-y-12 z-10 animate-in fade-in duration-500">
        <section>
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">图书信息</h2>
              <p className="text-sm text-slate-400 mt-1 leading-tight">完善书籍背景，帮助 AI 理解您的书籍内容。</p>
            </div>
            
            <div className="flex gap-3 pt-1">
              {!hasBookInfo ? (
                <button onClick={handleQuickFill} className="text-slate-400 hover:text-[#3B5BFF] text-[11px] font-medium transition-colors hover:underline">演示填入</button>
              ) : (
                <button onClick={handleClearData} className="text-slate-400 hover:text-red-500 text-[11px] font-medium transition-colors hover:underline">清除</button>
              )}
            </div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-4">
            {hasBookInfo ? (
              <div className="space-y-4 animate-in slide-in-from-left-2">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex flex-col items-center justify-center text-[#3B5BFF] shrink-0 shadow-sm relative overflow-hidden group">
                    <svg className="w-5 h-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h4 className="font-bold text-slate-800 truncate text-base leading-tight mb-0.5">{bookData.title}</h4>
                    <p className="text-xs text-slate-400 truncate">{bookData.author || '未知作者'}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/60">
                  <p className="text-[13px] text-slate-600 leading-relaxed overflow-hidden text-ellipsis line-clamp-2">{bookData.summary}</p>
                </div>
              </div>
            ) : (
              <div className="py-3 flex flex-col items-center justify-center gap-2">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <div className="absolute inset-0 bg-blue-100/50 rounded-xl rotate-6"></div>
                  <div className="absolute inset-0 bg-white border border-slate-100 rounded-xl shadow-sm flex items-center justify-center">
                    <svg className="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
                <span className="text-[13px] font-normal text-slate-400 tracking-tight">尚未配置图书数据</span>
              </div>
            )}
            
            <button 
              onClick={() => setIsBookModalOpen(true)}
              className="w-full py-2.5 rounded-lg text-sm font-medium transition-all active:scale-[0.98] border border-[#3B5BFF]/10 bg-blue-50 text-[#3B5BFF] hover:bg-blue-100 hover:border-[#3B5BFF]/20"
            >
              {hasBookInfo ? '修改图书信息' : '立即配置图书信息'}
            </button>
          </div>
        </section>

        <section className="flex flex-col min-h-0">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">视频文案</h2>
            <p className="text-sm text-slate-400 mt-1">输入或由 AI 生成您的视频旁白文案。</p>
          </div>
          <div className="flex-1">
            <ScriptEngine sentences={script} onUpdate={setScript} hasBookInfo={hasBookInfo} onOpenBookModal={() => setIsBookModalOpen(true)} />
          </div>
        </section>
      </aside>

      {/* 条件渲染：配置好图书信息后显示功能面板，否则显示引导页 */}
      {hasBookInfo ? renderConfiguration() : renderGuide()}
      
      {/* 条件渲染：配置好图书信息后显示操作栏 */}
      {hasBookInfo && <ActionBar />}

      <BookInfoModal isOpen={isBookModalOpen} onClose={() => setIsBookModalOpen(false)} data={bookData} onUpdate={setBookData} onDemoFill={handleQuickFill} />
      <StickerLibraryModal isOpen={isStickerModalOpen} onClose={() => setIsStickerModalOpen(false)} onSelect={(sticker) => { setSelectedSticker(sticker); setIsStickerModalOpen(false); }} />
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      <Header currentView={currentView} onNavigate={setCurrentView} />
      {currentView === AppView.LANDING ? (
        <LandingPage onSelect={setCurrentView} />
      ) : (
        renderSmartVideoTool()
      )}
    </div>
  );
};

export default App;

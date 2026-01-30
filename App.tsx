
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
import { AiToolbox } from './components/AiToolbox';
import { CreationHistoryDrawer } from './components/CreationHistoryDrawer';
import { VisualMode, ScriptSentence, BookData, AppView, MediaAsset } from './types';

const DEMO_BOOK_DATA: BookData = {
  title: '上下五千年',
  author: '林汉达 等',
  summary: '《上下五千年》是一部流传极广、影响深远的中国历史启蒙读物。全书用生动的语言、鲜活的人物、跌宕的情节，系统地介绍了从三皇五帝到近代中国这五千年间的重大历史事件 and 风云人物，全方位展示了中华民族灿烂的文明史与奋斗史。',
  sellingPoints: '1. 畅销半个世纪的历史启蒙经典；2. 语言通俗晓畅，像讲故事一样读懂大历史；3. 系统梳理中华文明脉络，增强文化底蕴。',
  targetAudience: '青少年读者，历史初学者，希望系统了解中华文明历史脉络的普通读者。',
  files: [
    { name: '上下五千年_全集目录.pdf', type: 'pdf' },
    { name: '经典插画原图.jpg', type: 'jpg' }
  ]
};

const QUICK_STICKERS = [
  { id: '1', name: '历史风云', url: 'https://api.dicebear.com/7.x/shapes/svg?seed=1', color: 'bg-blue-100' },
  { id: '2', name: '经典典藏', url: 'https://api.dicebear.com/7.x/shapes/svg?seed=2', color: 'bg-indigo-100' },
  { id: '3', name: '国风韵味', url: 'https://api.dicebear.com/7.x/shapes/svg?seed=3', color: 'bg-purple-100' },
  { id: '4', name: '深度解读', url: 'https://api.dicebear.com/7.x/shapes/svg?seed=4', color: 'bg-pink-100' },
  { id: '5', name: '推荐必读', url: 'https://api.dicebear.com/7.x/shapes/svg?seed=5', color: 'bg-orange-100' },
  { id: '6', name: '文化传承', url: 'https://api.dicebear.com/7.x/shapes/svg?seed=6', color: 'bg-emerald-100' },
  { id: '7', name: '知识宝库', url: 'https://api.dicebear.com/7.x/shapes/svg?seed=7', color: 'bg-rose-100' },
  { id: '8', name: '时光穿梭', url: 'https://api.dicebear.com/7.x/shapes/svg?seed=8', color: 'bg-amber-100' },
];

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
  const [currentView, setCurrentView] = useState<AppView>(AppView.AI_TOOLBOX);
  const [bookData, setBookData] = useState<BookData>(EMPTY_BOOK_DATA);
  const [script, setScript] = useState<ScriptSentence[]>(INITIAL_SCRIPT);
  const [visualMode, setVisualMode] = useState<VisualMode>(VisualMode.SELECTION);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isStickerModalOpen, setIsStickerModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState<{id: string, name: string, url: string} | null>(null);
  
  const [uploadedAssets, setUploadedAssets] = useState<MediaAsset[]>([]);
  const [isMatched, setIsMatched] = useState(false);

  const hasBookInfo = bookData.title.trim() !== '';

  const handleQuickFill = () => {
    setBookData(DEMO_BOOK_DATA);
  };

  const handleClearData = () => {
    setBookData(EMPTY_BOOK_DATA);
    setUploadedAssets([]);
    setIsMatched(false);
    setVisualMode(VisualMode.SELECTION);
    setScript(INITIAL_SCRIPT);
  };

  const handleAiSmartSelect = () => {
    const randomIndex = Math.floor(Math.random() * QUICK_STICKERS.length);
    const recommended = QUICK_STICKERS[randomIndex];
    setSelectedSticker(recommended);
  };

  const handleDemoImport = () => {
    const demoAssets: MediaAsset[] = Array.from({ length: 10 }).map((_, i) => ({
      id: `demo-${i}`,
      thumbnail: `https://picsum.photos/seed/history-${i}/300/400`,
      timestamp: `00:0${Math.floor(Math.random() * 9)}`
    }));
    setUploadedAssets(demoAssets);
    setVisualMode(VisualMode.UPLOAD_MONTAGE);
    setIsMatched(false);
  };

  const handleAutoMatch = () => {
    setIsMatched(true);
    const demoScript: ScriptSentence[] = [
      { 
        id: 's1', 
        text: '想了解咱们国家悠久的历史吗', 
        duration: '00:04',
        media: [uploadedAssets[0]]
      },
      { 
        id: 's2', 
        text: '《上下五千年》就是一本带你穿梭时空的好书', 
        duration: '00:05',
        media: [uploadedAssets[1]]
      },
      { 
        id: 's3', 
        text: '它涵盖了从远古传说到近代的众多历史事件，书中有很多经典语句，比如“历史是一面镜子，它照亮现实，也照亮未来”', 
        duration: '00:14',
        media: [uploadedAssets[2], uploadedAssets[3]]
      },
      { 
        id: 's4', 
        text: '这本书用生动的语言讲述了五千年的兴衰更替，让你能清晰地看到我们民族发展的脉络', 
        duration: '00:10',
        media: [uploadedAssets[4], uploadedAssets[5]]
      },
      { 
        id: 's5', 
        text: '它就像一个丰富的历史宝库，能让你在阅读中感受历史的厚重与精彩，无论是了解历史知识还是增长文化素养，它都能帮上大忙', 
        duration: '00:15',
        media: [uploadedAssets[6], uploadedAssets[7]]
      }
    ];
    setScript(demoScript);
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
    <main className="w-[75%] bg-[#F5F7F9] overflow-y-auto pb-32 pt-10 px-12 space-y-16 animate-in fade-in duration-500 relative">
      <section>
        <div className="mb-8 flex items-start justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">视觉素材选择</h2>
              <button 
                onClick={handleDemoImport}
                className="text-slate-400 hover:text-[#3B5BFF] text-[11px] font-medium transition-colors hover:underline mt-1"
              >
                演示导入
              </button>
            </div>
            <p className="text-base text-slate-500">为您的视频文案匹配高质量视觉画面。</p>
          </div>
          
          <button 
            onClick={() => setIsHistoryOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[13px] font-bold text-slate-600 hover:text-[#3B5BFF] hover:border-[#3B5BFF] transition-all active:scale-95 shadow-sm mt-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            创作记录
          </button>
        </div>
        <div className="w-full">
          {visualMode === VisualMode.SELECTION ? (
            <VisualSourceSelector onSelect={setVisualMode} />
          ) : visualMode === VisualMode.UPLOAD_MONTAGE ? (
            <MediaAlignmentList 
              sentences={script} 
              uploadedAssets={uploadedAssets}
              isMatched={isMatched}
              onBack={() => { setVisualMode(VisualMode.SELECTION); setIsMatched(false); }} 
              onMatch={handleAutoMatch}
            />
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
          <div className="flex items-center gap-3 pb-0.5">
            <button 
              onClick={() => setIsStickerModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:border-[#3B5BFF] hover:text-[#3B5BFF] hover:bg-blue-50 transition-all active:scale-95 shadow-sm"
            >
              贴片素材库
            </button>
            <button 
              onClick={handleAiSmartSelect}
              className="flex items-center gap-2 px-4 py-2 bg-[#3B5BFF]/5 text-[#3B5BFF] border border-[#3B5BFF]/20 rounded-lg text-sm font-bold hover:bg-[#3B5BFF]/10 transition-all active:scale-95 shadow-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.047a1 1 0 00-1.6 0l-8.6 10.1A1 1 0 001.9 12.8h6.2L6.8 18.9a1 1 0 00-1.6 0l8.6-10.1a1 1 0 00-1.3-1.65l-6.2 1.3L11.3 1.047z" clipRule="evenodd" />
              </svg>
              AI 智选贴片
            </button>
          </div>
        </div>

        <div className="w-full bg-white border border-slate-200 rounded-xl shadow-sm p-8">
           <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
             {QUICK_STICKERS.map(sticker => (
               <div 
                 key={sticker.id}
                 onClick={() => setSelectedSticker(sticker)}
                 className={`relative shrink-0 w-28 flex flex-col gap-2 group cursor-pointer animate-in fade-in duration-300`}
               >
                 <div className={`relative aspect-[3/4] rounded-lg border-2 overflow-hidden transition-all duration-300 flex items-center justify-center ${selectedSticker?.id === sticker.id ? 'border-[#3B5BFF] bg-blue-50 shadow-md' : 'border-slate-100 bg-slate-50 group-hover:border-slate-200 group-hover:bg-slate-100'}`}>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${selectedSticker?.id === sticker.id ? 'bg-[#3B5BFF]/10 text-[#3B5BFF]' : sticker.color + ' text-slate-400 opacity-60'}`}>
                       <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                       </svg>
                    </div>
                    {selectedSticker?.id === sticker.id && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-[#3B5BFF] rounded-full flex items-center justify-center text-white shadow-sm scale-90 animate-in zoom-in-50">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                    )}
                 </div>
                 <span className={`text-[11px] font-bold text-center truncate px-1 transition-colors ${selectedSticker?.id === sticker.id ? 'text-[#3B5BFF]' : 'text-slate-500 group-hover:text-slate-800'}`}>
                   {sticker.name}
                 </span>
               </div>
             ))}
             <button 
               onClick={() => setIsStickerModalOpen(true)}
               className="shrink-0 w-28 aspect-[3/4] border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-[#3B5BFF] hover:text-[#3B5BFF] hover:bg-blue-50 transition-all group"
             >
                <div className="p-2 bg-slate-50 rounded-full group-hover:bg-[#3B5BFF]/10 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                </div>
                <span className="text-[10px] font-bold">更多贴片</span>
             </button>
           </div>
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

      <section className="pt-8">
        <ActionBar />
      </section>
    </main>
  );

  const renderEditorLayout = () => (
    <div className="flex-1 flex overflow-hidden relative">
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
          <div className="mb-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">视频文案</h2>
            <p className="text-sm text-slate-400 mt-1">输入或由 AI 生成您的视频旁白文案。</p>
          </div>
          <div className="flex-1">
            <ScriptEngine sentences={script} onUpdate={setScript} hasBookInfo={hasBookInfo} onOpenBookModal={() => setIsBookModalOpen(true)} />
          </div>
        </section>
      </aside>

      {hasBookInfo ? renderConfiguration() : renderGuide()}
      
      <BookInfoModal isOpen={isBookModalOpen} onClose={() => setIsBookModalOpen(false)} data={bookData} onUpdate={setBookData} onDemoFill={handleQuickFill} />
      <StickerLibraryModal isOpen={isStickerModalOpen} onClose={() => setIsStickerModalOpen(false)} onSelect={(sticker) => { setSelectedSticker(sticker); setIsStickerModalOpen(false); }} />
      <CreationHistoryDrawer isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {currentView === AppView.AI_TOOLBOX ? (
        <AiToolbox onNavigate={setCurrentView} />
      ) : (
        <div className="h-screen flex flex-col overflow-hidden">
          <Header currentView={currentView} onNavigate={setCurrentView} />
          {currentView === AppView.LANDING ? (
            <LandingPage onSelect={setCurrentView} />
          ) : (
            renderEditorLayout()
          )}
        </div>
      )}
    </div>
  );
};

export default App;

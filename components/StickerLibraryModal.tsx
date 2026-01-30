
import React, { useState, useMemo } from 'react';

interface Sticker {
  id: string;
  name: string;
  ratio: '3:4' | '9:16';
  color: string;
}

const STICKERS: Sticker[] = [
  { id: '1', name: '示例贴片名', ratio: '3:4', color: 'bg-blue-100' },
  { id: '2', name: '示例贴片名', ratio: '9:16', color: 'bg-indigo-100' },
  { id: '3', name: '示例贴片名', ratio: '3:4', color: 'bg-purple-100' },
  { id: '4', name: '示例贴片名', ratio: '9:16', color: 'bg-pink-100' },
  { id: '5', name: '示例贴片名', ratio: '3:4', color: 'bg-orange-100' },
  { id: '6', name: '示例贴片名', ratio: '9:16', color: 'bg-emerald-100' },
  { id: '7', name: '示例贴片名', ratio: '3:4', color: 'bg-rose-100' },
  { id: '8', name: '示例贴片名', ratio: '9:16', color: 'bg-amber-100' },
];

interface StickerLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (sticker: any) => void;
}

export const StickerLibraryModal: React.FC<StickerLibraryModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [search, setSearch] = useState('');
  const [filterRatio, setFilterRatio] = useState<'All' | '3:4' | '9:16'>('All');
  const [tempSelection, setTempSelection] = useState<Sticker | null>(null);

  const filteredStickers = useMemo(() => {
    return STICKERS.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
      const matchesRatio = filterRatio === 'All' || s.ratio === filterRatio;
      return matchesSearch && matchesRatio;
    });
  }, [search, filterRatio]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900">贴片素材库</h3>
            <p className="text-xs text-slate-400 mt-1">选择合适的贴片素材提升视频营销效果。</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Toolbar */}
        <div className="px-6 py-4 flex items-center gap-6 border-b border-slate-50">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text"
              placeholder="搜索贴片素材..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B5BFF]/20 focus:bg-white transition-all"
            />
          </div>
          
          <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-200">
            {(['All', '3:4', '9:16'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setFilterRatio(r)}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${filterRatio === r ? 'bg-[#3B5BFF] text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {r === 'All' ? '全部比例' : r}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area - Waterfall Layout */}
        <div className="flex-1 overflow-y-auto p-8 bg-white">
          {filteredStickers.length > 0 ? (
            <div className="columns-2 sm:columns-3 gap-6 space-y-6">
              {filteredStickers.map((sticker) => (
                <div 
                  key={sticker.id}
                  onClick={() => setTempSelection(sticker)}
                  className="break-inside-avoid mb-6 group relative flex flex-col cursor-pointer transition-all duration-300"
                >
                  <div 
                    className={`relative rounded-lg border-2 overflow-hidden transition-all duration-200 
                      ${sticker.ratio === '3:4' ? 'aspect-[3/4]' : 'aspect-[9/16]'} 
                      ${tempSelection?.id === sticker.id ? 'border-[#3B5BFF] bg-blue-50/20 shadow-lg' : 'border-slate-100 bg-slate-50 group-hover:border-slate-200 group-hover:bg-slate-100/50'}`}
                  >
                    {/* Content Container */}
                    <div className="absolute inset-0 flex flex-col">
                      {/* Stylized Pattern Area - Matches outer frame ratio */}
                      <div className="flex-1 p-3 pb-0">
                        <div className={`w-full h-full rounded-lg flex items-center justify-center transition-all duration-300 ${tempSelection?.id === sticker.id ? 'bg-[#3B5BFF]/10' : sticker.color}`}>
                           <svg className={`w-1/3 h-1/3 transition-colors ${tempSelection?.id === sticker.id ? 'text-[#3B5BFF]' : 'text-slate-400 opacity-60'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                           </svg>
                        </div>
                      </div>
                      
                      {/* Text Bar inside the frame */}
                      <div className={`px-3 py-3 transition-colors ${tempSelection?.id === sticker.id ? 'bg-[#3B5BFF]/10' : 'bg-transparent group-hover:bg-white/40'}`}>
                        <p className={`text-xs font-bold text-center truncate ${tempSelection?.id === sticker.id ? 'text-[#3B5BFF]' : 'text-slate-600 group-hover:text-slate-900'}`}>
                          {sticker.name}
                        </p>
                      </div>
                    </div>
                    
                    {/* Ratio Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm border transition-colors ${tempSelection?.id === sticker.id ? 'bg-[#3B5BFF] text-white border-[#3B5BFF]' : 'bg-white/90 backdrop-blur text-slate-500 border-slate-100'}`}>
                        {sticker.ratio}
                      </span>
                    </div>

                    {/* Checkmark Icon */}
                    {tempSelection?.id === sticker.id && (
                      <div className="absolute top-3 left-3 z-10">
                        <div className="w-5 h-5 bg-[#3B5BFF] rounded-lg flex items-center justify-center text-white shadow-md animate-in zoom-in-50 duration-200">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-20 text-slate-400">
              <svg className="w-16 h-16 opacity-20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p>没有找到相关贴片素材</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/30">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
          >
            取消
          </button>
          <button 
            disabled={!tempSelection}
            onClick={() => tempSelection && onSelect({
              id: tempSelection.id,
              name: tempSelection.name,
              url: 'https://api.dicebear.com/7.x/shapes/svg?seed=' + tempSelection.id // Keep a dummy URL for the external app logic
            })}
            className={`px-10 py-2.5 rounded-lg font-bold transition-all shadow-lg active:scale-95 ${tempSelection ? 'bg-[#3B5BFF] text-white shadow-[#3B5BFF]/20 hover:bg-[#3B5BFF]/90' : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'}`}
          >
            确认
          </button>
        </div>
      </div>
    </div>
  );
};

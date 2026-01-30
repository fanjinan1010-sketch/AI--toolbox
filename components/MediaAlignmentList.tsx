
import React, { useState } from 'react';
import { ScriptSentence, MediaAsset } from '../types';

interface Props {
  sentences: ScriptSentence[];
  uploadedAssets: MediaAsset[];
  isMatched: boolean;
  onBack: () => void;
  onMatch: () => void;
}

export const MediaAlignmentList: React.FC<Props> = ({ sentences, uploadedAssets, isMatched, onBack, onMatch }) => {
  if (!isMatched) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col animate-in fade-in duration-300">
        <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500"
            >
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
               </svg>
            </button>
            <h3 className="text-base font-bold text-slate-800">已导入素材 ({uploadedAssets.length})</h3>
          </div>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-5 gap-4 mb-10">
            {uploadedAssets.map((asset) => (
              <div key={asset.id} className="relative aspect-video rounded-lg overflow-hidden border border-slate-100 group shadow-sm">
                <img src={asset.thumbnail} className="w-full h-full object-cover" alt="Asset" />
                <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-black/60 text-white text-[10px] rounded font-medium backdrop-blur-sm">
                  {asset.timestamp}
                </div>
              </div>
            ))}
            <button className="aspect-video border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-400 hover:border-[#3B5BFF] hover:text-[#3B5BFF] transition-all bg-slate-50">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            </button>
          </div>

          <div className="flex justify-center">
            <button 
              onClick={onMatch}
              className="px-12 py-4 bg-[#3B5BFF] text-white rounded-xl font-bold text-lg hover:bg-[#3B5BFF]/90 shadow-xl shadow-[#3B5BFF]/20 active:scale-95 transition-all flex items-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI智能匹配图片和素材
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden animate-in fade-in duration-500">
      <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500"
          >
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
             </svg>
          </button>
          <h3 className="text-base font-bold text-slate-800">素材编排与对齐</h3>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-xs text-slate-500 font-bold bg-slate-200/50 px-2 py-1 rounded-lg">
            已匹配分镜 {sentences.length} / {sentences.length}
          </span>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {sentences.map((sentence, idx) => (
          <div key={sentence.id} className="flex p-6 group hover:bg-slate-50/50 transition-colors items-start gap-8">
            {/* Left: Script Content & Duration */}
            <div className="flex-1 min-w-0 py-1 flex flex-col h-full justify-between">
              <p className="text-[14px] text-slate-800 leading-relaxed font-normal">
                {sentence.text || "（未输入文案）"}
              </p>
              <div className="flex items-center justify-between mt-8">
                 <button className="text-slate-300 hover:text-slate-600">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                 </button>
                 <span className="text-[11px] font-medium text-slate-400 font-mono tracking-tight">{sentence.duration || '00:00'}</span>
              </div>
            </div>

            {/* Right: Asset List */}
            <div className="flex items-center gap-3 shrink-0">
              {sentence.media?.map((asset, aIdx) => (
                <div key={asset.id} className="relative w-28 aspect-[3/4] bg-slate-100 rounded-md overflow-hidden shadow-sm group/item">
                  <img src={asset.thumbnail} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="p-1.5 bg-white/90 rounded text-slate-700 shadow-lg scale-90 hover:scale-100 transition-transform">
                       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Add Material Button */}
              <div className="flex items-center gap-3">
                <button className="w-16 h-28 border border-slate-200 border-dashed rounded-md flex flex-col items-center justify-center gap-1.5 text-slate-400 hover:border-[#3B5BFF] hover:text-[#3B5BFF] hover:bg-blue-50/30 transition-all bg-white">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-[10px] font-bold text-center leading-tight">添加素材</span>
                </button>
                <button className="text-slate-300 hover:text-slate-600">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

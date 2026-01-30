
import React from 'react';
import { ScriptSentence } from '../types';

interface Props {
  sentences: ScriptSentence[];
  onBack: () => void;
}

export const MediaAlignmentList: React.FC<Props> = ({ sentences, onBack }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
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
            进度 {sentences.filter(s => s.media).length} / {sentences.length}
          </span>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {sentences.map((sentence, idx) => (
          <div key={sentence.id} className="flex p-8 group hover:bg-[#3B5BFF]/5 transition-colors items-start">
            {/* 左侧: 脚本内容 */}
            <div className="flex-1 pr-12">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-bold text-[#3B5BFF] bg-blue-50 px-2 py-0.5 rounded-lg uppercase tracking-wider">分镜</span>
                <span className="text-[10px] text-slate-400 font-bold">建议 4.0s</span>
              </div>
              <p className="text-base text-slate-700 leading-relaxed font-medium">
                {sentence.text}
              </p>
            </div>

            {/* 右侧: 素材上传区 */}
            <div className="w-56 shrink-0">
              {sentence.media ? (
                <div className="relative aspect-video rounded-lg overflow-hidden border border-slate-200 group-hover:shadow-2xl group-hover:border-[#3B5BFF]/20 transition-all">
                  <img 
                    src={sentence.media.thumbnail} 
                    alt="预览" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-lg font-bold backdrop-blur-md">
                    {sentence.media.timestamp}
                  </div>
                  
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                      <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button className="w-full aspect-video border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-[#3B5BFF] hover:text-[#3B5BFF] hover:bg-blue-50/50 transition-all bg-slate-50/50 group-hover:border-[#3B5BFF]/40">
                  <svg className="w-8 h-8 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-[10px] font-bold uppercase tracking-widest">添加素材</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

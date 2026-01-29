
import React, { useState } from 'react';
import { ScriptSentence } from '../types';

interface ScriptEngineProps {
  sentences: ScriptSentence[];
  onUpdate: (sentences: ScriptSentence[]) => void;
}

export const ScriptEngine: React.FC<ScriptEngineProps> = ({ sentences, onUpdate }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const updated = lines.map((line, idx) => ({
      id: idx.toString(),
      text: line,
      media: sentences[idx]?.media
    }));
    onUpdate(updated);
  };

  const handleAiGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generated = [
        { id: '1', text: "在浩瀚的宇宙中，每一个选择都在创造一个新的世界。" },
        { id: '2', text: "埃琳娜博士发现了跨越维度的秘密，但代价超乎想象。" },
        { id: '3', text: "《量子地平线》—— 2024年度最震撼的硬核科幻力作。" },
        { id: '4', text: "点击下方链接，即刻开启多重宇宙之旅。" }
      ];
      onUpdate(generated);
      setIsGenerating(false);
    }, 1200);
  };

  const fullText = sentences.map(s => s.text).join('\n');

  return (
    <div className="h-full bg-slate-50 border border-slate-100 rounded-2xl flex flex-col overflow-hidden transition-all focus-within:border-[#3B5BFF]/30 focus-within:shadow-sm">
      <div className="p-4 flex flex-col h-full">
        <div className="flex justify-end mb-4">
          <button 
            onClick={handleAiGenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-[#3B5BFF] hover:border-[#3B5BFF] hover:bg-blue-50 transition-all shadow-sm active:scale-95 disabled:opacity-50"
          >
            {isGenerating ? (
              <svg className="animate-spin h-3.5 w-3.5 text-[#3B5BFF]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z" fill="#3B5BFF" fillOpacity="0.1" stroke="#3B5BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
            {isGenerating ? '正在构思文案...' : 'AI 智能生成文案'}
          </button>
        </div>

        <textarea 
          placeholder="在此输入您的视频脚本，每一行将作为一个独立的视频镜头..."
          value={fullText}
          onChange={handleTextChange}
          className="flex-1 w-full bg-transparent text-slate-700 text-sm leading-relaxed focus:outline-none resize-none px-2"
        />
        
        <div className="mt-4 pt-4 border-t border-slate-200/50 flex items-center justify-between text-[10px] text-slate-400 font-medium">
          <span>共 {sentences.length} 个镜头</span>
          <span>建议时长：{sentences.length * 4}s</span>
        </div>
      </div>
    </div>
  );
};

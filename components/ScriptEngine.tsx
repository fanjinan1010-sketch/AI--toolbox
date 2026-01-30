
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { ScriptSentence } from '../types';

interface ScriptEngineProps {
  sentences: ScriptSentence[];
  onUpdate: (sentences: ScriptSentence[]) => void;
  hasBookInfo: boolean;
  onOpenBookModal: () => void;
}

export const ScriptEngine: React.FC<ScriptEngineProps> = ({ 
  sentences, 
  onUpdate, 
  hasBookInfo,
  onOpenBookModal 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [tempVersions, setTempVersions] = useState<ScriptSentence[][]>([]);
  const [isFocused, setIsFocused] = useState(false);
  
  const [lastAiVersions, setLastAiVersions] = useState<ScriptSentence[][]>([]);
  const [hasAppliedLastAi, setHasAppliedLastAi] = useState<boolean>(true);

  const [previewSelectedIndex, setPreviewSelectedIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showRequirementHint, setShowRequirementHint] = useState(false);
  const dropdownTimer = useRef<number | null>(null);
  const hintTimer = useRef<number | null>(null);
  
  const focusRef = useRef<{ sIdx: number } | null>(null);
  const previewFocusRef = useRef<{ vIdx: number; sIdx: number } | null>(null);

  // Auto-resize utility for textareas
  const adjustTextareaHeight = (el: HTMLTextAreaElement | null) => {
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  // Adjust height for all main textareas whenever sentences change
  useLayoutEffect(() => {
    sentences.forEach((_, idx) => {
      const el = document.getElementById(`main-input-${idx}`) as HTMLTextAreaElement;
      adjustTextareaHeight(el);
    });
  }, [sentences]);

  // Adjust height for preview textareas
  useLayoutEffect(() => {
    if (isPreviewOpen && tempVersions[previewSelectedIndex]) {
      tempVersions[previewSelectedIndex].forEach((_, sIdx) => {
        const el = document.getElementById(`preview-input-${previewSelectedIndex}-${sIdx}`) as HTMLTextAreaElement;
        adjustTextareaHeight(el);
      });
    }
  }, [isPreviewOpen, tempVersions, previewSelectedIndex]);

  // Handle main interface focus
  useEffect(() => {
    if (focusRef.current) {
      const { sIdx } = focusRef.current;
      const el = document.getElementById(`main-input-${sIdx}`) as HTMLTextAreaElement;
      if (el) {
        el.focus();
        el.setSelectionRange(0, 0);
      }
      focusRef.current = null;
    }
  }, [sentences]);

  // Handle preview interface focus
  useEffect(() => {
    if (previewFocusRef.current) {
      const { vIdx, sIdx } = previewFocusRef.current;
      const el = document.getElementById(`preview-input-${vIdx}-${sIdx}`) as HTMLTextAreaElement;
      if (el) {
        el.focus();
        el.setSelectionRange(0, 0);
      }
      previewFocusRef.current = null;
    }
  }, [tempVersions]);

  const shouldShowHistoryMode = !hasAppliedLastAi && lastAiVersions.length > 0;

  const handleAiTriggerClick = () => {
    if (!hasBookInfo) {
      setShowRequirementHint(true);
      if (hintTimer.current) window.clearTimeout(hintTimer.current);
      hintTimer.current = window.setTimeout(() => setShowRequirementHint(false), 5000);
      return;
    }

    if (shouldShowHistoryMode) {
      setTempVersions(lastAiVersions);
      setIsPreviewOpen(true);
    } else {
      setShowDropdown(!showDropdown);
    }
  };

  const handleAiGenerate = (count: number) => {
    setIsGenerating(true);
    setShowDropdown(false);
    setIsPreviewOpen(true);
    setTempVersions([]);
    
    setTimeout(() => {
      const mockPool = [
        [
          { id: `v1-1-${Date.now()}`, text: "中华文明渊远流长，每一个名字背后都是一段波澜壮阔的历史。" },
          { id: `v1-2-${Date.now()}`, text: "从三皇五帝到近代风云，《上下五千年》带你重回历史现场，感受华夏文明的脉动。" },
          { id: `v1-3-${Date.now()}`, text: "这不仅是一本记录历史的书，更是一面照亮未来的历史之镜，让智慧在文字间传承。" }
        ],
        [
          { id: `v2-1-${Date.now()}`, text: "想知道我们从哪里来吗？答案就藏在这五千年的时光长河里，等待你去发掘。" },
          { id: `v2-2-${Date.now()}`, text: "林汉达先生主编经典，用最通俗易懂且生动的语言，系统讲述中华民族兴衰交替的宏大脉络。" },
          { id: `v2-3-${Date.now()}`, text: "历史启蒙必读经典，让孩子在故事中爱上中国史，建立文化自信。" }
        ],
        [
          { id: `v3-1-${Date.now()}`, text: "纵览兴衰交替，感悟华夏风骨，品味跨越千年的英雄传奇与平民生活。" },
          { id: `v3-2-${Date.now()}`, text: "这是一次跨越时空的文明对话，全方位梳理中华历史精髓，重塑你的历史观。" },
          { id: `v3-3-${Date.now()}`, text: "开启这段壮丽旅程，传承千年智慧，让历史在你的阅读中重新焕发生机。" }
        ]
      ];

      const generated = mockPool.slice(0, count);
      setTempVersions(generated);
      setLastAiVersions(generated);
      setHasAppliedLastAi(false);
      setPreviewSelectedIndex(0);
      setIsGenerating(false);
      setShowConfirm(false);
    }, 1500);
  };

  const handleMainTextChange = (idx: number, newText: string) => {
    const updated = [...sentences];
    updated[idx] = { ...updated[idx], text: newText };
    onUpdate(updated);
  };

  const handleMainKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, idx: number) => {
    const textarea = e.currentTarget;
    const selectionStart = textarea.selectionStart;

    if (e.key === 'Enter') {
      e.preventDefault();
      const textBefore = textarea.value.substring(0, selectionStart);
      const textAfter = textarea.value.substring(selectionStart);
      const updated = [...sentences];
      updated[idx] = { ...updated[idx], text: textBefore };
      updated.splice(idx + 1, 0, { id: `main-split-${Date.now()}`, text: textAfter });
      onUpdate(updated);
      focusRef.current = { sIdx: idx + 1 };
    } else if (e.key === 'Backspace' && selectionStart === 0 && idx > 0) {
      e.preventDefault();
      const updated = [...sentences];
      const prevSentence = updated[idx - 1];
      const prevTextLen = prevSentence.text.length;
      updated[idx - 1] = { ...prevSentence, text: prevSentence.text + updated[idx].text };
      updated.splice(idx, 1);
      onUpdate(updated);
      setTimeout(() => {
        const prevEl = document.getElementById(`main-input-${idx - 1}`) as HTMLTextAreaElement;
        if (prevEl) {
          prevEl.focus();
          prevEl.setSelectionRange(prevTextLen, prevTextLen);
        }
      }, 0);
    }
  };

  const handleTempTextChange = (vIdx: number, sIdx: number, newText: string) => {
    const updatedVersions = [...tempVersions];
    updatedVersions[vIdx] = [...updatedVersions[vIdx]];
    updatedVersions[vIdx][sIdx] = { ...updatedVersions[vIdx][sIdx], text: newText };
    setTempVersions(updatedVersions);
    setLastAiVersions(updatedVersions);
  };

  const handlePreviewKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, vIdx: number, sIdx: number) => {
    if (vIdx !== previewSelectedIndex) return;
    const textarea = e.currentTarget;
    const selectionStart = textarea.selectionStart;

    if (e.key === 'Enter') {
      e.preventDefault();
      const textBefore = textarea.value.substring(0, selectionStart);
      const textAfter = textarea.value.substring(selectionStart);
      const updatedVersions = [...tempVersions];
      const version = [...updatedVersions[vIdx]];
      version[sIdx] = { ...version[sIdx], text: textBefore };
      version.splice(sIdx + 1, 0, { id: `preview-split-${Date.now()}`, text: textAfter });
      updatedVersions[vIdx] = version;
      setTempVersions(updatedVersions);
      setLastAiVersions(updatedVersions);
      previewFocusRef.current = { vIdx, sIdx: sIdx + 1 };
    } else if (e.key === 'Backspace' && selectionStart === 0 && sIdx > 0) {
      e.preventDefault();
      const updatedVersions = [...tempVersions];
      const version = [...updatedVersions[vIdx]];
      const prevSentence = version[sIdx - 1];
      const prevTextLen = prevSentence.text.length;
      version[sIdx - 1] = { ...prevSentence, text: prevSentence.text + version[sIdx].text };
      version.splice(sIdx, 1);
      updatedVersions[vIdx] = version;
      setTempVersions(updatedVersions);
      setLastAiVersions(updatedVersions);
      setTimeout(() => {
        const prevEl = document.getElementById(`preview-input-${vIdx}-${sIdx - 1}`) as HTMLTextAreaElement;
        if (prevEl) {
          prevEl.focus();
          prevEl.setSelectionRange(prevTextLen, prevTextLen);
        }
      }, 0);
    }
  };

  const handleConfirmFill = () => {
    onUpdate(tempVersions[previewSelectedIndex]);
    setHasAppliedLastAi(true);
    setIsPreviewOpen(false);
    setShowConfirm(false);
  };

  return (
    <div className={`relative bg-white border border-slate-200 rounded-lg flex flex-col transition-all duration-300 ${isFocused ? 'min-h-[360px] border-[#3B5BFF]/50 shadow-sm' : 'min-h-[160px]'}`}>
      <div className="p-4 flex flex-col h-full">
        {/* Header Toolbar */}
        <div className="flex items-center justify-end mb-4 relative">
          {showRequirementHint && (
            <div className="absolute top-full right-0 mt-3 w-64 bg-amber-50 rounded-xl p-4 z-[110] animate-in slide-in-from-top-2 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M12 8v4m0 4h.01" /></svg>
                </div>
                <div>
                  <p className="text-[12px] font-bold text-amber-900 leading-tight">需要图书背景信息</p>
                  <p className="text-[11px] text-amber-700/80 mt-1 leading-normal">请先完成“图书信息”的填写，以便 AI 理解内容并为您生成文案。</p>
                  <button onClick={() => { setShowRequirementHint(false); onOpenBookModal(); }} className="mt-2 text-[11px] font-normal text-[#3B5BFF] hover:underline flex items-center gap-1">去配置信息<svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
                </div>
              </div>
              <div className="absolute top-0 right-12 -mt-1 w-3 h-3 bg-amber-50 rotate-45"></div>
            </div>
          )}

          <div className="relative" onMouseEnter={() => { if (hasBookInfo && !shouldShowHistoryMode) { if (dropdownTimer.current) window.clearTimeout(dropdownTimer.current); setShowDropdown(true); } }} onMouseLeave={() => { dropdownTimer.current = window.setTimeout(() => setShowDropdown(false), 200); }}>
            <button onClick={handleAiTriggerClick} className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-xs font-bold transition-all active:scale-95 ${shouldShowHistoryMode ? 'bg-[#3B5BFF]/10 text-[#3B5BFF] border-[#3B5BFF]/30 shadow-sm shadow-blue-500/10' : 'bg-white border-slate-200 text-slate-600 hover:border-[#3B5BFF] hover:text-[#3B5BFF]'}`}>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              {shouldShowHistoryMode ? "查看上次生成" : "AI 智能生成"}
              {hasBookInfo && !shouldShowHistoryMode && (
                <svg className={`w-3 h-3 ml-0.5 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              )}
            </button>
            {showDropdown && hasBookInfo && !shouldShowHistoryMode && (
              <div className="absolute top-full right-0 mt-2 w-32 bg-white border border-slate-100 rounded-lg shadow-xl p-1 z-[100] animate-in fade-in slide-in-from-top-1 duration-200">
                {[1, 2, 3].map(count => (
                  <button key={count} onClick={() => handleAiGenerate(count)} className="w-full text-left px-3 py-2.5 text-[11px] font-bold text-slate-600 hover:bg-[#3B5BFF]/5 hover:text-[#3B5BFF] rounded-lg transition-colors">{count} 个方案</button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Script Input Area */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 scroll-smooth">
          {sentences.map((sentence, idx) => (
            <textarea
              key={sentence.id}
              id={`main-input-${idx}`}
              rows={1}
              placeholder={idx === 0 ? "请输入你的视频文案脚本。" : ""}
              value={sentence.text}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => handleMainTextChange(idx, e.target.value)}
              onKeyDown={(e) => handleMainKeyDown(e, idx)}
              onInput={(e) => adjustTextareaHeight(e.target as HTMLTextAreaElement)}
              className="w-full text-[13px] leading-relaxed py-0.5 px-3 border-l-2 bg-white resize-none transition-all focus:outline-none overflow-hidden border-blue-300 focus:border-[#3B5BFF] text-slate-700 cursor-text"
              style={{ borderTop: 'none', borderRight: 'none', borderBottom: 'none' }}
            />
          ))}
          {sentences.length === 0 && (
            <button 
              onClick={() => onUpdate([{ id: 'init-1', text: '' }])}
              className="w-full text-left text-slate-400 text-sm italic px-2 py-2"
            >
              点击此处开始编写脚本...
            </button>
          )}
        </div>
      </div>

      {isPreviewOpen && (
        <div className="fixed top-[56px] bottom-[80px] z-[150] flex pointer-events-none" style={{ left: 'max(25%, 360px)' }}>
          <div className="relative w-[440px] h-full bg-[#ECF6FF] shadow-[20px_0_60px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden animate-in slide-in-from-left duration-200 ease-out pointer-events-auto border-r border-slate-100">
            <div className="p-6 border-b border-blue-200/30 flex items-start justify-between shrink-0">
              <div className="max-w-[70%]">
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">AI 文案预览</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-normal">为您智能生成了脚本文案，请择优选择</p>
              </div>
              <div className="flex flex-col items-end gap-3">
                <button onClick={() => { setIsPreviewOpen(false); setShowConfirm(false); }} className="p-1.5 text-slate-400 hover:text-[#3B5BFF] hover:bg-white/50 rounded-lg transition-all">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <button 
                  onClick={() => { handleAiGenerate(tempVersions.length || 1); setShowConfirm(false); }}
                  disabled={isGenerating}
                  className={`text-[11px] font-bold text-[#3B5BFF] hover:text-[#3B5BFF]/80 flex items-center gap-1.5 transition-all shrink-0 px-2 py-1 bg-transparent border-none ${isGenerating ? 'opacity-50' : 'cursor-pointer'}`}
                >
                  <svg className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  重新生成
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 relative">
              {isGenerating ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#ECF6FF]/80 backdrop-blur-[2px] z-10 animate-in fade-in duration-300">
                  <div className="relative w-12 h-12"><div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div><div className="absolute inset-0 border-4 border-[#3B5BFF] border-t-transparent rounded-full animate-spin"></div></div>
                  <p className="text-xs font-bold text-[#3B5BFF] tracking-widest uppercase">AI 正在思考中...</p>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in duration-500">
                  {tempVersions.map((version, vIdx) => (
                    <div key={vIdx} onClick={() => { setPreviewSelectedIndex(vIdx); setShowConfirm(false); }} className={`group relative p-5 rounded-lg border-2 transition-all cursor-pointer ${previewSelectedIndex === vIdx ? 'border-[#3B5BFF] bg-white shadow-xl shadow-blue-500/10' : 'border-blue-200/30 bg-white/60 hover:border-blue-300 hover:bg-white'}`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2"><span className={`text-[10px] font-bold px-3 py-0.5 rounded-lg ${previewSelectedIndex === vIdx ? 'bg-[#3B5BFF] text-white shadow-md' : 'bg-blue-100 text-blue-400'}`}>方案 {vIdx + 1}</span></div>
                        {previewSelectedIndex === vIdx && (
                          <div className="w-5 h-5 bg-[#3B5BFF] rounded-lg flex items-center justify-center text-white animate-in zoom-in-50">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                          </div>
                        )}
                      </div>
                      <div className="space-y-3">
                        {version.map((sentence, sIdx) => (
                          <textarea
                            key={sentence.id}
                            id={`preview-input-${vIdx}-${sIdx}`}
                            rows={1}
                            value={sentence.text}
                            onChange={(e) => handleTempTextChange(vIdx, sIdx, e.target.value)}
                            onKeyDown={(e) => handlePreviewKeyDown(e, vIdx, sIdx)}
                            onInput={(e) => adjustTextareaHeight(e.target as HTMLTextAreaElement)}
                            className={`w-full text-[13px] leading-relaxed py-0.5 px-3 border-l-2 bg-transparent resize-none transition-all focus:outline-none overflow-hidden ${previewSelectedIndex === vIdx ? 'border-blue-300 focus:border-[#3B5BFF] focus:bg-slate-50 text-slate-700 cursor-text' : 'border-slate-200 text-slate-400 pointer-events-none'}`}
                            style={{ borderTop: 'none', borderRight: 'none', borderBottom: 'none' }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-blue-200/30 flex items-center justify-end gap-3 shrink-0 bg-[#ECF6FF]/95 backdrop-blur-md relative">
              {showConfirm && (
                <div className="absolute bottom-[calc(100%+12px)] right-6 w-56 bg-white rounded-lg p-4 animate-in slide-in-from-bottom-2 fade-in duration-200 z-[160] shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                  <div className="flex items-start gap-2.5 mb-3">
                    <div className="w-5 h-5 bg-[#F59E0B] rounded-full flex items-center justify-center shrink-0 mt-0.5"><svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M12 8v4m0 4h.01" /></svg></div>
                    <p className="text-[12px] font-medium text-slate-600 leading-normal">点击后将覆盖左侧视频文案，是否继续？</p>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => setShowConfirm(false)} className="px-3 py-1.5 text-[11px] font-bold text-slate-400 hover:text-slate-600 transition-colors">取消</button>
                    <button onClick={handleConfirmFill} className="px-4 py-1.5 bg-[#3B5BFF] text-white rounded-lg text-[11px] font-bold hover:bg-[#3B5BFF]/90 transition-all shadow-md shadow-[#3B5BFF]/10 active:scale-95">确定</button>
                  </div>
                  <div className="absolute top-full right-10 -mt-1 w-3 h-3 bg-white rotate-45"></div>
                </div>
              )}
              <button onClick={() => { setIsPreviewOpen(false); setShowConfirm(false); }} className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">取消</button>
              <button onClick={() => setShowConfirm(true)} disabled={isGenerating || tempVersions.length === 0} className={`px-10 py-2.5 bg-[#3B5BFF] text-white rounded-lg text-sm font-bold transition-all shadow-lg active:scale-95 ${isGenerating || tempVersions.length === 0 ? 'opacity-50 cursor-not-allowed' : 'shadow-[#3B5BFF]/20 hover:bg-[#3B5BFF]/90'}`}>一键填充</button>
            </div>
          </div>
          <div className="flex-1 pointer-events-auto" onClick={() => { setIsPreviewOpen(false); setShowConfirm(false); }} />
        </div>
      )}
    </div>
  );
};

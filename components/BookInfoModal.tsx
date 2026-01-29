
import React, { useRef, useState, useEffect } from 'react';
import { BookData, FileInfo } from '../types';

interface BookInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: BookData;
  onUpdate: (data: BookData) => void;
}

export const BookInfoModal: React.FC<BookInfoModalProps> = ({ isOpen, onClose, data, onUpdate }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // 阻止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (field: keyof BookData, value: any) => {
    onUpdate({ ...data, [field]: value });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles: FileInfo[] = Array.from(e.target.files).map(file => {
        const ext = file.name.split('.').pop()?.toLowerCase() as FileInfo['type'];
        return { name: file.name, type: ext };
      });
      handleChange('files', [...data.files, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = data.files.filter((_, i) => i !== index);
    handleChange('files', updatedFiles);
  };

  const isInvalid = (field: keyof BookData) => {
    if (field === 'title' || field === 'summary') {
      const val = data[field];
      return typeof val === 'string' && !val.trim();
    }
    return false;
  };

  const getFileIcon = (type: FileInfo['type']) => {
    switch (type) {
      case 'pdf': return (
        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 2a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V8l-6-6H7zm6 7V4l5 5h-5z" />
        </svg>
      );
      default: return (
        <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 2a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V8l-6-6H7z" />
        </svg>
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* 遮罩层 */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in" 
        onClick={onClose}
      />
      
      {/* 弹窗主体 */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        {/* 头部 */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-xl font-bold text-[#181E29]">填写图书信息</h3>
            <p className="text-xs text-slate-500 mt-1">完善书籍背景，帮助 AI 为您打造更具吸引力的视频内容。</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 表单内容 */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">书名 <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                placeholder="请输入完整书名"
                value={data.title}
                onFocus={() => setFocusedField('title')}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => handleChange('title', e.target.value)}
                className={`w-full px-4 py-2 bg-slate-50 border ${isInvalid('title') ? 'border-red-200' : 'border-slate-200'} rounded-lg text-[14px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#3B5BFF]/20 focus:border-[#3B5BFF] transition-all duration-300 ${focusedField === 'title' ? 'h-14 shadow-sm' : 'h-10'}`}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">作者</label>
              <input 
                type="text" 
                placeholder="请输入作者姓名"
                value={data.author}
                onFocus={() => setFocusedField('author')}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => handleChange('author', e.target.value)}
                className={`w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[14px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#3B5BFF]/20 focus:border-[#3B5BFF] transition-all duration-300 ${focusedField === 'author' ? 'h-14 shadow-sm' : 'h-10'}`}
              />
            </div>
          </div>

          {/* 内容简介 */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-700">内容简介 <span className="text-red-500">*</span></label>
              <span className="text-[10px] text-slate-400 font-normal">支持上传图书样张或证订单附件（最多10个文件）</span>
            </div>
            <div className={`relative bg-slate-50 border ${isInvalid('summary') ? 'border-red-200' : 'border-slate-200'} rounded-xl overflow-hidden flex flex-col transition-all duration-300 focus-within:ring-2 focus-within:ring-[#3B5BFF]/20 focus-within:border-[#3B5BFF] ${focusedField === 'summary' ? 'shadow-md' : ''}`}>
              <textarea 
                placeholder="手动输入描述或上传图书文件..."
                value={data.summary}
                maxLength={2000}
                onFocus={() => setFocusedField('summary')}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => handleChange('summary', e.target.value)}
                className={`w-full px-4 pt-4 pb-2 bg-transparent text-[14px] text-slate-700 leading-relaxed focus:outline-none resize-none transition-all duration-300 ${focusedField === 'summary' ? 'h-64' : 'h-32'}`}
              />
              
              {data.files && data.files.length > 0 && (
                <div className="px-4 pb-4 flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                  {data.files.map((file, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-white border border-slate-100 px-3 py-1.5 rounded-lg shadow-sm">
                      {getFileIcon(file.type)}
                      <span className="text-[11px] text-slate-600 font-medium max-w-[150px] truncate">{file.name}</span>
                      <button onClick={() => removeFile(idx)} className="text-slate-300 hover:text-red-500"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-slate-100 px-4 py-2 flex items-center justify-between bg-white/50">
                <span className="text-[11px] text-slate-400">{data.summary.length}/2000</span>
                <div className="flex items-center gap-2">
                  <input type="file" ref={fileInputRef} className="hidden" multiple onChange={handleFileChange} />
                  <button onClick={handleUploadClick} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 hover:text-[#3B5BFF] hover:border-[#3B5BFF] transition-all">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    上传附件
                  </button>
                  <div className="relative">
                    <button onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)} className="p-1 text-slate-300 hover:text-slate-500 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                    </button>
                    {showTooltip && (
                      <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-slate-800 text-white text-[11px] leading-relaxed rounded-xl shadow-xl z-50">
                        支持 pdf, doc, xlsx, jpg 等格式，总大小不超过 50MB。
                        <div className="absolute top-full right-2 w-2 h-2 bg-slate-800 rotate-45 -mt-1"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 核心卖点 */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-700">核心卖点</label>
              <span className="text-[10px] text-slate-400">{data.sellingPoints.length}/3000</span>
            </div>
            <textarea 
              placeholder="请输入图书的核心价值和卖点..."
              value={data.sellingPoints}
              maxLength={3000}
              onFocus={() => setFocusedField('sellingPoints')}
              onBlur={() => setFocusedField(null)}
              onChange={(e) => handleChange('sellingPoints', e.target.value)}
              className={`w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#3B5BFF]/20 focus:border-[#3B5BFF] transition-all duration-300 resize-none ${focusedField === 'sellingPoints' ? 'h-48 shadow-sm' : 'h-24'}`}
            />
          </div>

          {/* 目标受众 */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-700">目标受众</label>
              <span className="text-[10px] text-slate-400">{data.targetAudience.length}/500</span>
            </div>
            <textarea 
              placeholder="例如：科幻读者、职场新人..."
              value={data.targetAudience}
              maxLength={500}
              onFocus={() => setFocusedField('targetAudience')}
              onBlur={() => setFocusedField(null)}
              onChange={(e) => handleChange('targetAudience', e.target.value)}
              className={`w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#3B5BFF]/20 focus:border-[#3B5BFF] transition-all duration-300 resize-none ${focusedField === 'targetAudience' ? 'h-48 shadow-sm' : 'h-24'}`}
            />
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="p-6 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
          >
            取消
          </button>
          <button 
            onClick={onClose}
            className="px-8 py-2.5 bg-[#3B5BFF] text-white rounded-xl font-bold hover:bg-[#3B5BFF]/90 transition-all shadow-lg shadow-[#3B5BFF]/20 active:scale-95"
          >
            保存并返回
          </button>
        </div>
      </div>
    </div>
  );
};

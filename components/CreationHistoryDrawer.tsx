
import React from 'react';

interface HistoryItem {
  id: string;
  title: string;
  type: string;
  time: string;
  status: 'completed' | 'processing' | 'draft';
  thumbnail?: string;
}

const HISTORY_DATA: HistoryItem[] = [
  { id: '1', title: '上下五千年 - 官方宣传片', type: '智能成片', time: '2023-11-20 14:30', status: 'completed', thumbnail: 'https://picsum.photos/seed/hist1/120/80' },
  { id: '2', title: '孩子的第一本历史书', type: '智能成片', time: '2023-11-19 10:15', status: 'completed', thumbnail: 'https://picsum.photos/seed/hist2/120/80' },
  { id: '3', title: '中华文明五千年 - 深度解读', type: '视频编导', time: '2023-11-18 16:45', status: 'processing' },
  { id: '4', title: '未命名视频 A', type: '智能成片', time: '2023-11-17 09:20', status: 'draft' },
  { id: '5', title: '林汉达讲历史 - 样书演示', type: '智能成片', time: '2023-11-15 11:05', status: 'completed', thumbnail: 'https://picsum.photos/seed/hist3/120/80' },
];

interface CreationHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreationHistoryDrawer: React.FC<CreationHistoryDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const getStatusBadge = (status: HistoryItem['status']) => {
    switch (status) {
      case 'completed':
        return <span className="text-[10px] px-1.5 py-0.5 bg-emerald-50 text-emerald-600 font-bold rounded">已完成</span>;
      case 'processing':
        return (
          <span className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-600 font-bold rounded flex items-center gap-1">
            <svg className="w-2.5 h-2.5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            生成中
          </span>
        );
      case 'draft':
        return <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 font-bold rounded">草稿</span>;
    }
  };

  return (
    <div className="absolute top-0 right-0 w-[380px] h-full bg-white shadow-[-10px_0_40px_rgba(0,0,0,0.08)] z-[200] flex flex-col animate-in slide-in-from-right duration-300 border-l border-slate-100">
      <div className="p-6 border-b border-slate-50 flex items-center justify-between shrink-0">
        <div>
          <h3 className="text-lg font-bold text-slate-900">创作记录</h3>
          <p className="text-xs text-slate-400 mt-0.5">查看最近生成的视频和草稿</p>
        </div>
        <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="relative space-y-8">
          {/* Timeline Line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-100" />

          {HISTORY_DATA.map((item, idx) => (
            <div key={item.id} className="relative pl-8 animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${idx * 50}ms` }}>
              {/* Timeline Dot */}
              <div className="absolute left-0 top-[6px] w-4 h-4 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center z-10">
                <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'processing' ? 'bg-blue-500 animate-pulse' : 'bg-slate-300'}`} />
              </div>

              <div className="group bg-white border border-slate-100 rounded-xl p-4 hover:border-[#3B5BFF]/30 hover:shadow-md hover:shadow-slate-100 transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-[11px] font-medium text-slate-400 font-mono tracking-tight">{item.time}</span>
                  {getStatusBadge(item.status)}
                </div>
                
                <h4 className="text-[13px] font-bold text-slate-800 leading-tight mb-2 group-hover:text-[#3B5BFF] transition-colors">{item.title}</h4>
                
                <div className="flex items-center gap-3">
                  {item.thumbnail ? (
                    <div className="w-20 aspect-video bg-slate-100 rounded overflow-hidden border border-slate-50 shrink-0">
                      <img src={item.thumbnail} className="w-full h-full object-cover" alt="Thumbnail" />
                    </div>
                  ) : (
                    <div className="w-20 aspect-video bg-slate-50 rounded flex items-center justify-center border border-slate-100 shrink-0">
                      <svg className="w-4 h-4 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] text-slate-500 font-medium">类型：{item.type}</span>
                    <div className="flex gap-2">
                      {item.status === 'completed' && (
                        <button className="text-[11px] font-bold text-[#3B5BFF] hover:underline">下载</button>
                      )}
                      <button className="text-[11px] font-bold text-slate-400 hover:text-slate-600">编辑</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

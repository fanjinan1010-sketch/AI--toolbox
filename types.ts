
export interface FileInfo {
  name: string;
  type: 'pdf' | 'doc' | 'docx' | 'xls' | 'xlsx' | 'jpg' | 'png';
  size?: string;
}

export interface BookData {
  title: string;
  author: string;
  summary: string;
  sellingPoints: string;
  targetAudience: string;
  files: FileInfo[];
}

export interface MediaAsset {
  id: string;
  thumbnail: string;
  timestamp: string;
}

export interface ScriptSentence {
  id: string;
  text: string;
  duration?: string;
  media?: MediaAsset[]; // Support multiple assets per sentence as per the new requirement
}

export enum VisualMode {
  SELECTION = 'SELECTION',
  UPLOAD_MONTAGE = 'UPLOAD_MONTAGE',
  AI_DIRECTOR = 'AI_DIRECTOR'
}

export enum AppView {
  LANDING = 'LANDING',
  SMART_VIDEO = 'SMART_VIDEO',
  AI_DIRECTOR = 'AI_DIRECTOR',
  AI_TOOLBOX = 'AI_TOOLBOX'
}

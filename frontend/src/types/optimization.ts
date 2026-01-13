/**
 * Types for content optimization and structure analysis
 */

export interface ContentSection {
  mainQuestion: string;
  directAnswer: string;
  tldrSummary: string;
  mainContent: string;
  visuals: VisualItem[];
  callToAction: CTAItem;
  authorCredibility: AuthorInfo;
}

export interface AuthorInfo {
  name: string;
  publishedDate: string;
  lastUpdated: string;
  credentials?: string;
}

export interface VisualItem {
  type: 'image' | 'diagram' | 'chart';
  url: string;
  altText: string;
  caption?: string;
}

export interface CTAItem {
  text: string;
  buttonText: string;
  link: string;
}

export interface StructureAnalysis {
  score: number; // 0-100
  hasMainQuestion: boolean;
  hasDirectAnswer: boolean;
  hasTldr: boolean;
  hasVisuals: boolean;
  hasCTA: boolean;
  hasProperFormatting: boolean;
  hasAuthorInfo: boolean;
  hasCitableContent: boolean;
  recommendations: string[];
}

export interface OptimizationChecklist {
  mainQuestion: ChecklistItem;
  directAnswer: ChecklistItem;
  tldrSummary: ChecklistItem;
  visuals: ChecklistItem;
  formatting: ChecklistItem;
  authorCredibility: ChecklistItem;
  citableContent: ChecklistItem;
  callToAction: ChecklistItem;
}

export interface ChecklistItem {
  status: 'complete' | 'incomplete' | 'needs-improvement';
  score: number;
  message: string;
  aiSuggestion?: string;
}

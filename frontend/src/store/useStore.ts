/**
 * Global state management using Zustand
 */

import { create } from 'zustand';
import type { BlogContent } from '@/types/blog';
import type { SEOSuggestions, MetaTags } from '@/types/seo';
import type { SchemaMarkup } from '@/types/schema';
import type { ContentSection, StructureAnalysis, OptimizationChecklist } from '@/types/optimization';
import type { AIContentAnalysis } from '@/types/ai-analysis';

interface AppState {
  // Blog data
  originalBlog: BlogContent | null;
  blogUrl: string;

  // Editor content
  editorContent: string;
  editorHTML: string;

  // Optimized content sections
  contentSections: ContentSection;

  // Structure analysis
  structureAnalysis: StructureAnalysis | null;
  optimizationChecklist: OptimizationChecklist | null;

  // AI-powered deep analysis
  aiAnalysis: AIContentAnalysis | null;
  isAnalyzingWithAI: boolean;

  // SEO data
  seoSuggestions: SEOSuggestions | null;
  appliedOptimizations: string[];

  // Schema markup
  schemas: SchemaMarkup[];

  // Meta tags
  metaTags: MetaTags | null;

  // UI state
  isLoading: boolean;
  isFetchingBlog: boolean;
  isOptimizingSEO: boolean;
  isExporting: boolean;
  error: string | null;

  // Actions
  setBlogUrl: (url: string) => void;
  setOriginalBlog: (blog: BlogContent | null) => void;
  setEditorContent: (content: string) => void;
  setEditorHTML: (html: string) => void;
  setSeoSuggestions: (suggestions: SEOSuggestions | null) => void;
  addAppliedOptimization: (id: string) => void;
  addSchema: (schema: SchemaMarkup) => void;
  removeSchema: (index: number) => void;
  updateSchema: (index: number, schema: SchemaMarkup) => void;
  setMetaTags: (tags: MetaTags | null) => void;
  updateMetaTags: (tags: Partial<MetaTags>) => void;
  setIsLoading: (loading: boolean) => void;
  setIsFetchingBlog: (fetching: boolean) => void;
  setIsOptimizingSEO: (optimizing: boolean) => void;
  setIsExporting: (exporting: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;

  // Content section actions
  updateContentSection: (section: Partial<ContentSection>) => void;
  setStructureAnalysis: (analysis: StructureAnalysis | null) => void;
  setOptimizationChecklist: (checklist: OptimizationChecklist | null) => void;

  // AI analysis actions
  setAIAnalysis: (analysis: AIContentAnalysis | null) => void;
  setIsAnalyzingWithAI: (isAnalyzing: boolean) => void;
}

const initialState = {
  originalBlog: null,
  blogUrl: '',
  editorContent: '',
  editorHTML: '',
  seoSuggestions: null,
  appliedOptimizations: [],
  schemas: [],
  metaTags: null,
  isLoading: false,
  isFetchingBlog: false,
  isOptimizingSEO: false,
  isExporting: false,
  error: null,
  contentSections: {
    mainQuestion: '',
    directAnswer: '',
    tldrSummary: '',
    mainContent: '',
    visuals: [],
    callToAction: {
      text: '',
      buttonText: '',
      link: '',
    },
    authorCredibility: {
      name: '',
      publishedDate: '',
      lastUpdated: '',
      credentials: '',
    },
  },
  structureAnalysis: null,
  optimizationChecklist: null,
  aiAnalysis: null,
  isAnalyzingWithAI: false,
};

export const useStore = create<AppState>((set) => ({
  ...initialState,

  setBlogUrl: (url) => set({ blogUrl: url }),

  setOriginalBlog: (blog) =>
    set({
      originalBlog: blog,
      editorContent: blog?.plainText || '',
      editorHTML: blog?.html || '',
      metaTags: blog
        ? {
            title: blog.metadata.title,
            description: blog.metadata.description || '',
            author: blog.metadata.author,
          }
        : null,
    }),

  setEditorContent: (content) => set({ editorContent: content }),

  setEditorHTML: (html) => set({ editorHTML: html }),

  setSeoSuggestions: (suggestions) => set({ seoSuggestions: suggestions }),

  addAppliedOptimization: (id) =>
    set((state) => ({
      appliedOptimizations: [...state.appliedOptimizations, id],
    })),

  addSchema: (schema) =>
    set((state) => ({
      schemas: [...state.schemas, schema],
    })),

  removeSchema: (index) =>
    set((state) => ({
      schemas: state.schemas.filter((_, i) => i !== index),
    })),

  updateSchema: (index, schema) =>
    set((state) => ({
      schemas: state.schemas.map((s, i) => (i === index ? schema : s)),
    })),

  setMetaTags: (tags) => set({ metaTags: tags }),

  updateMetaTags: (tags) =>
    set((state) => ({
      metaTags: state.metaTags ? { ...state.metaTags, ...tags } : null,
    })),

  setIsLoading: (loading) => set({ isLoading: loading }),

  setIsFetchingBlog: (fetching) => set({ isFetchingBlog: fetching }),

  setIsOptimizingSEO: (optimizing) => set({ isOptimizingSEO: optimizing }),

  setIsExporting: (exporting) => set({ isExporting: exporting }),

  setError: (error) => set({ error }),

  reset: () => set(initialState),

  updateContentSection: (section) =>
    set((state) => ({
      contentSections: { ...state.contentSections, ...section },
    })),

  setStructureAnalysis: (analysis) => set({ structureAnalysis: analysis }),

  setOptimizationChecklist: (checklist) => set({ optimizationChecklist: checklist }),

  setAIAnalysis: (analysis) => set({ aiAnalysis: analysis }),

  setIsAnalyzingWithAI: (isAnalyzing) => set({ isAnalyzingWithAI: isAnalyzing }),
}));

/**
 * SEO optimization types
 */

export interface MetaTags {
  title: string;
  description: string;
  keywords?: string[];

  // Open Graph
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  ogSiteName?: string;

  // Twitter Card
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterSite?: string;
  twitterCreator?: string;

  // Additional
  robots?: string;
  canonical?: string;
  author?: string;
}

export interface SEOSuggestions {
  meta: MetaTags;
  contentImprovements: ContentImprovement[];
  headingOptimizations: HeadingOptimization[];
  qaSection?: QASection;
  keyTakeaways?: string[];
  recommendedSchemas: SchemaType[];
  seoScore: number;
  suggestions: string[];
}

export interface ContentImprovement {
  type: 'readability' | 'keywords' | 'structure' | 'links' | 'images';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  suggestion?: string;
}

export interface HeadingOptimization {
  level: number;
  currentText: string;
  suggestedText?: string;
  issue?: string;
}

export interface QASection {
  title: string;
  questions: QuestionAnswer[];
}

export interface QuestionAnswer {
  question: string;
  answer: string;
}

export type SchemaType =
  | 'Article'
  | 'BlogPosting'
  | 'NewsArticle'
  | 'FAQPage'
  | 'HowTo'
  | 'Organization'
  | 'Person'
  | 'Breadcrumb';

export interface OptimizeSEORequest {
  content: string;
  metadata: {
    title: string;
    description?: string;
    author?: string;
    url?: string;
  };
  targetKeywords?: string[];
}

export interface OptimizeSEOResponse {
  success: boolean;
  data?: SEOSuggestions;
  error?: string;
}

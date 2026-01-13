/**
 * Types for AI-powered deep content analysis
 */

export interface AIQualityScore {
  score: number; // 0-100
  status: 'excellent' | 'good' | 'needs-work' | 'poor';
  recommendation: string;
  example?: string;
}

export interface AIContentAnalysis {
  overallScore: number; // 0-100
  mainQuestionQuality: AIQualityScore;
  directAnswerQuality: AIQualityScore;
  tldrQuality: AIQualityScore;
  visualRelevance: AIQualityScore;
  ctaEffectiveness: AIQualityScore;
  formattingQuality: AIQualityScore;
  citationQuality: AIQualityScore;
  aiFriendliness: AIQualityScore;
  strengths: string[];
  improvements: string[];
  analyzedAt: string;
}

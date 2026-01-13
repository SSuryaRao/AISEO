/**
 * Analyzes blog content structure for AI optimization
 */

import type { BlogContent } from '@/types/blog';
import type { StructureAnalysis, OptimizationChecklist } from '@/types/optimization';

export class ContentAnalyzer {
  /**
   * Analyzes the structure of blog content
   */
  static analyzeStructure(blog: BlogContent): StructureAnalysis {
    const html = blog.html;
    const plainText = blog.plainText;

    // Check for main question (H1)
    const hasMainQuestion = /<h1[^>]*>.*?<\/h1>/i.test(html);

    // Check for direct answer (first 1-2 sentences after H1)
    const firstParagraph = this.getFirstParagraph(html);
    const hasDirectAnswer = firstParagraph.length > 0 && firstParagraph.length <= 300;

    // Check for TL;DR or summary
    const hasTldr = /tl;?dr|summary|key (?:points|takeaways)/i.test(plainText);

    // Check for visuals
    const hasVisuals = /<img[^>]+>/i.test(html);

    // Check for CTA
    const hasCTA = this.hasCTA(html, plainText);

    // Check for proper formatting (H2, H3, lists)
    const hasProperFormatting = this.checkFormatting(html);

    // Check for author info
    const hasAuthorInfo = !!(blog.metadata.author || blog.metadata.publishDate);

    // Check for citable content (links, sources, statistics)
    const hasCitableContent = this.hasCitations(html);

    // Calculate score
    const score = this.calculateScore({
      hasMainQuestion,
      hasDirectAnswer,
      hasTldr,
      hasVisuals,
      hasCTA,
      hasProperFormatting,
      hasAuthorInfo,
      hasCitableContent,
    });

    // Generate recommendations
    const recommendations = this.generateRecommendations({
      hasMainQuestion,
      hasDirectAnswer,
      hasTldr,
      hasVisuals,
      hasCTA,
      hasProperFormatting,
      hasAuthorInfo,
      hasCitableContent,
    });

    return {
      score,
      hasMainQuestion,
      hasDirectAnswer,
      hasTldr,
      hasVisuals,
      hasCTA,
      hasProperFormatting,
      hasAuthorInfo,
      hasCitableContent,
      recommendations,
    };
  }

  /**
   * Generates detailed optimization checklist
   */
  static generateChecklist(blog: BlogContent, analysis: StructureAnalysis): OptimizationChecklist {
    return {
      mainQuestion: {
        status: analysis.hasMainQuestion ? 'complete' : 'incomplete',
        score: analysis.hasMainQuestion ? 100 : 0,
        message: analysis.hasMainQuestion
          ? 'Main question found as H1'
          : 'No clear main question (H1) found',
        aiSuggestion: !analysis.hasMainQuestion
          ? 'Create a question-focused H1 that targets user search intent'
          : undefined,
      },
      directAnswer: {
        status: analysis.hasDirectAnswer ? 'complete' : 'incomplete',
        score: analysis.hasDirectAnswer ? 100 : 0,
        message: analysis.hasDirectAnswer
          ? 'Direct answer present in opening'
          : 'Missing quick 1-2 sentence answer',
        aiSuggestion: !analysis.hasDirectAnswer
          ? 'Add a concise answer at the beginning (1-2 sentences max)'
          : undefined,
      },
      tldrSummary: {
        status: analysis.hasTldr ? 'complete' : 'incomplete',
        score: analysis.hasTldr ? 100 : 0,
        message: analysis.hasTldr
          ? 'TL;DR summary found'
          : 'No TL;DR or summary section',
        aiSuggestion: !analysis.hasTldr
          ? 'Add a TL;DR section with 3-5 key bullet points'
          : undefined,
      },
      visuals: {
        status: analysis.hasVisuals ? 'complete' : 'incomplete',
        score: analysis.hasVisuals ? 100 : 0,
        message: analysis.hasVisuals
          ? 'Visuals present in content'
          : 'No images, diagrams, or charts found',
        aiSuggestion: !analysis.hasVisuals
          ? 'Add relevant images, diagrams, or screenshots to support content'
          : undefined,
      },
      formatting: {
        status: analysis.hasProperFormatting ? 'complete' : 'needs-improvement',
        score: analysis.hasProperFormatting ? 100 : 50,
        message: analysis.hasProperFormatting
          ? 'Good heading hierarchy and structure'
          : 'Formatting could be improved',
        aiSuggestion: !analysis.hasProperFormatting
          ? 'Use H2/H3 headings, bullet points, and one idea per section'
          : undefined,
      },
      authorCredibility: {
        status: analysis.hasAuthorInfo ? 'complete' : 'incomplete',
        score: analysis.hasAuthorInfo ? 100 : 0,
        message: analysis.hasAuthorInfo
          ? 'Author information present'
          : 'Missing author name or publish date',
        aiSuggestion: !analysis.hasAuthorInfo
          ? 'Add author name, credentials, and publish/update dates'
          : undefined,
      },
      citableContent: {
        status: analysis.hasCitableContent ? 'complete' : 'incomplete',
        score: analysis.hasCitableContent ? 100 : 0,
        message: analysis.hasCitableContent
          ? 'Contains sources and citations'
          : 'No sources or citations found',
        aiSuggestion: !analysis.hasCitableContent
          ? 'Add statistics, case studies, and link to authoritative sources'
          : undefined,
      },
      callToAction: {
        status: analysis.hasCTA ? 'complete' : 'incomplete',
        score: analysis.hasCTA ? 100 : 0,
        message: analysis.hasCTA
          ? 'Call to action present'
          : 'No clear call to action',
        aiSuggestion: !analysis.hasCTA
          ? 'Add a CTA to encourage user interaction or next steps'
          : undefined,
      },
    };
  }

  private static getFirstParagraph(html: string): string {
    const match = html.match(/<p[^>]*>(.*?)<\/p>/i);
    return match ? match[1].replace(/<[^>]+>/g, '') : '';
  }

  private static hasCTA(html: string, plainText: string): boolean {
    // Check for common CTA patterns
    const ctaPatterns = [
      /<button/i,
      /class=".*?(?:cta|call-to-action|btn-primary).*?"/i,
      /get started|sign up|learn more|try (?:it|now)|contact us|subscribe/i,
    ];

    return ctaPatterns.some(pattern =>
      pattern.test(html) || pattern.test(plainText)
    );
  }

  private static checkFormatting(html: string): boolean {
    const hasH2 = /<h2[^>]*>/i.test(html);
    const hasLists = /<(?:ul|ol)[^>]*>/i.test(html);
    return hasH2 && hasLists;
  }

  private static hasCitations(html: string): boolean {
    // Check for links, references, or citation markers
    const hasExternalLinks = /<a[^>]+href="http/i.test(html);
    const hasNumbers = /\d+%|\$\d+|according to|research shows|study found/i.test(html);
    return hasExternalLinks || hasNumbers;
  }

  private static calculateScore(checks: Record<string, boolean>): number {
    const weights = {
      hasMainQuestion: 15,
      hasDirectAnswer: 15,
      hasTldr: 12,
      hasVisuals: 10,
      hasCTA: 10,
      hasProperFormatting: 13,
      hasAuthorInfo: 12,
      hasCitableContent: 13,
    };

    let totalScore = 0;
    Object.entries(checks).forEach(([key, value]) => {
      if (value) {
        totalScore += weights[key as keyof typeof weights] || 0;
      }
    });

    return totalScore;
  }

  private static generateRecommendations(checks: Record<string, boolean>): string[] {
    const recommendations: string[] = [];

    if (!checks.hasMainQuestion) {
      recommendations.push('Add a clear, question-focused H1 title');
    }
    if (!checks.hasDirectAnswer) {
      recommendations.push('Start with a concise 1-2 sentence answer');
    }
    if (!checks.hasTldr) {
      recommendations.push('Include a TL;DR summary section');
    }
    if (!checks.hasVisuals) {
      recommendations.push('Add relevant images or diagrams');
    }
    if (!checks.hasCTA) {
      recommendations.push('Add a clear call-to-action');
    }
    if (!checks.hasProperFormatting) {
      recommendations.push('Improve structure with H2/H3 headings and lists');
    }
    if (!checks.hasAuthorInfo) {
      recommendations.push('Add author credentials and dates');
    }
    if (!checks.hasCitableContent) {
      recommendations.push('Include statistics and cite sources');
    }

    return recommendations;
  }
}

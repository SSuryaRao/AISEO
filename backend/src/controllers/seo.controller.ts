import { Request, Response } from 'express';
import geminiService from '../services/gemini.service';

/**
 * Optimize meta tags using Google Gemini AI
 */
export const optimizeMetaTags = async (req: Request, res: Response) => {
  try {
    const { content, metadata } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        error: 'Content is required',
      });
    }

    console.log('🤖 Optimizing meta tags with Gemini AI...');

    const optimizedTags = await geminiService.optimizeMetaTags(
      content,
      metadata?.title,
      metadata?.description
    );

    console.log('✅ Meta tags optimized:', optimizedTags);

    return res.json({
      success: true,
      data: optimizedTags,
    });
  } catch (error) {
    console.error('❌ Error in optimizeMetaTags:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred during meta tag optimization',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * Generate schema markup using Google Gemini AI
 */
export const generateSchemas = async (req: Request, res: Response) => {
  try {
    const { content, metadata } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        error: 'Content is required',
      });
    }

    console.log('🤖 Generating schema markup with Gemini AI...');

    const schemas = await geminiService.generateSchemaMarkup(content, metadata || {});

    console.log('✅ Schemas generated:', schemas.length);

    return res.json({
      success: true,
      data: schemas,
    });
  } catch (error) {
    console.error('❌ Error in generateSchemas:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred during schema generation',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * Generate content section using Google Gemini AI
 */
export const generateSection = async (req: Request, res: Response) => {
  try {
    const { section, content, metadata } = req.body;

    if (!section || !content) {
      return res.status(400).json({
        success: false,
        error: 'Section name and content are required',
      });
    }

    console.log(`🤖 Generating ${section} with Gemini AI...`);

    let generatedContent = '';

    switch (section) {
      case 'mainQuestion':
        generatedContent = await geminiService.generateMainQuestion(
          content,
          metadata?.title
        );
        break;

      case 'directAnswer':
        const mainQuestion = metadata?.mainQuestion || metadata?.title || '';
        generatedContent = await geminiService.generateDirectAnswer(content, mainQuestion);
        break;

      case 'tldrSummary':
        generatedContent = await geminiService.generateTldrSummary(content);
        break;

      case 'authorName':
        generatedContent = await geminiService.generateAuthorCredibility(
          content,
          metadata?.author
        );
        break;

      case 'ctaText':
        generatedContent = await geminiService.generateCTAText(content);
        break;

      case 'ctaButton':
        const ctaText = metadata?.ctaText || 'Learn more about our solution';
        generatedContent = await geminiService.generateCTAButton(ctaText);
        break;

      case 'improveFormatting':
        generatedContent = await geminiService.improveFormatting(content);
        break;

      default:
        return res.status(400).json({
          success: false,
          error: `Unknown section: ${section}`,
        });
    }

    console.log(`✅ ${section} generated successfully`);

    return res.json({
      success: true,
      data: {
        section,
        content: generatedContent,
      },
    });
  } catch (error) {
    console.error('❌ Error in generateSection:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred during content generation',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * Deep AI-powered content analysis
 */
export const analyzeContentAI = async (req: Request, res: Response) => {
  try {
    const { content, metadata } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        error: 'Content is required',
      });
    }

    console.log('🧠 Running deep AI content analysis with Gemini...');

    const analysis = await geminiService.analyzeContentDeep(content, metadata || {});

    console.log(`✅ AI analysis complete - Overall score: ${analysis.overallScore}/100`);

    return res.json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    console.error('❌ Error in analyzeContentAI:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred during AI content analysis',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * Legacy endpoint - kept for backwards compatibility
 */
export const optimizeSEO = async (req: Request, res: Response) => {
  try {
    const { content, metadata } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        error: 'Content is required',
      });
    }

    console.log('🤖 Running full SEO optimization with Gemini AI...');

    // Run multiple optimizations in parallel
    const [optimizedTags, schemas] = await Promise.all([
      geminiService.optimizeMetaTags(content, metadata?.title, metadata?.description),
      geminiService.generateSchemaMarkup(content, metadata || {}),
    ]);

    const response = {
      success: true,
      data: {
        meta: optimizedTags,
        schemas: schemas.map((s) => s.data),
        recommendedSchemas: schemas.map((s) => s.type),
        suggestions: [
          'Consider adding a TL;DR summary',
          'Include a direct answer at the beginning',
          'Add a clear call-to-action',
        ],
      },
    };

    console.log('✅ SEO optimization complete');

    return res.json(response);
  } catch (error) {
    console.error('❌ Error in optimizeSEO:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred during SEO optimization',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

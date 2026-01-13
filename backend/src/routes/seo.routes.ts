import { Router } from 'express';
import {
  optimizeSEO,
  optimizeMetaTags,
  generateSchemas,
  generateSection,
  analyzeContentAI,
} from '../controllers/seo.controller';

const router = Router();

// POST /api/seo/optimize - Full SEO optimization with Gemini AI
router.post('/optimize', optimizeSEO);

// POST /api/seo/meta-tags - Optimize meta tags with Gemini AI
router.post('/meta-tags', optimizeMetaTags);

// POST /api/seo/schemas - Generate schema markup with Gemini AI
router.post('/schemas', generateSchemas);

// POST /api/seo/generate - Generate content section with Gemini AI
router.post('/generate', generateSection);

// POST /api/seo/analyze-ai - Deep AI-powered content analysis
router.post('/analyze-ai', analyzeContentAI);

export default router;

import { Request, Response } from 'express';
import urlFetcherService from '../services/url-fetcher.service';
import metadataExtractorService from '../services/metadata-extractor.service';
import blogParserService from '../services/blog-parser.service';
import platformDetectorService from '../services/platform-detector.service';

/**
 * Fetch and parse blog content from URL
 */
export const fetchBlog = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        error: 'URL is required',
      });
    }

    // Validate URL
    if (!urlFetcherService.validateURL(url)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid URL format. Please provide a valid HTTP or HTTPS URL.',
      });
    }

    console.log(`📥 Fetching blog from: ${url}`);

    // Fetch HTML content
    const fetchResult = await urlFetcherService.fetch(url);
    console.log(`✅ Fetched ${fetchResult.html.length} characters from ${fetchResult.url}`);

    // Detect platform
    const platform = platformDetectorService.detect(fetchResult.html, fetchResult.url);
    console.log(`🔍 Detected platform: ${platform}`);

    // Extract metadata
    const metadata = metadataExtractorService.extract(fetchResult.html, fetchResult.url);
    console.log(`📋 Extracted metadata: ${metadata.title}`);

    // Parse content
    const content = blogParserService.parse(fetchResult.html, fetchResult.url);
    console.log(
      `📄 Parsed content: ${content.wordCount} words, ${content.headings.length} headings`
    );

    // Build response
    const response = {
      success: true,
      data: {
        url: fetchResult.url,
        html: content.html,
        plainText: content.plainText,
        metadata: {
          ...metadata,
          url: fetchResult.url,
        },
        structure: {
          headings: content.headings,
          images: content.images,
          links: content.links,
          wordCount: content.wordCount,
          readingTime: content.readingTime,
        },
        platform,
      },
    };

    return res.json(response);
  } catch (error) {
    console.error('❌ Error in fetchBlog:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred while fetching the blog',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

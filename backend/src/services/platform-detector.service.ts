import * as cheerio from 'cheerio';

/**
 * Service to detect blog platform
 */

export type BlogPlatform =
  | 'wordpress'
  | 'medium'
  | 'ghost'
  | 'substack'
  | 'blogger'
  | 'wix'
  | 'squarespace'
  | 'custom';

export class PlatformDetectorService {
  /**
   * Detect blog platform from HTML and URL
   */
  detect(html: string, url: string): BlogPlatform {
    const $ = cheerio.load(html);
    const urlLower = url.toLowerCase();

    // Check URL patterns first
    if (urlLower.includes('medium.com')) return 'medium';
    if (urlLower.includes('substack.com')) return 'substack';
    if (urlLower.includes('blogspot.com') || urlLower.includes('blogger.com')) return 'blogger';

    // Check meta tags and generators
    const generator = $('meta[name="generator"]').attr('content')?.toLowerCase() || '';

    if (generator.includes('wordpress')) return 'wordpress';
    if (generator.includes('ghost')) return 'ghost';
    if (generator.includes('wix')) return 'wix';
    if (generator.includes('squarespace')) return 'squarespace';

    // Check for WordPress specific elements
    if (
      $('link[href*="wp-content"]').length > 0 ||
      $('script[src*="wp-includes"]').length > 0 ||
      $('body').hasClass('wp-site') ||
      $('body').hasClass('wordpress')
    ) {
      return 'wordpress';
    }

    // Check for Ghost specific elements
    if ($('meta[name="generator"][content*="Ghost"]').length > 0) {
      return 'ghost';
    }

    // Check for Medium specific elements
    if (
      $('meta[property="al:ios:app_name"][content="Medium"]').length > 0 ||
      $('body').attr('class')?.includes('medium')
    ) {
      return 'medium';
    }

    return 'custom';
  }

  /**
   * Get platform-specific selectors for content extraction
   */
  getPlatformSelectors(platform: BlogPlatform): string[] {
    const selectors: Record<BlogPlatform, string[]> = {
      wordpress: ['.entry-content', '.post-content', 'article .content'],
      medium: ['article', '.postArticle-content'],
      ghost: ['.post-content', '.gh-content', 'article'],
      substack: ['.post-content', '.body'],
      blogger: ['.post-body', '.entry-content'],
      wix: ['.post-content'],
      squarespace: ['.entry-content', '.sqs-block-content'],
      custom: ['article', 'main', '.content'],
    };

    return selectors[platform] || selectors.custom;
  }
}

export default new PlatformDetectorService();

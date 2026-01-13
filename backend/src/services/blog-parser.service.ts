import * as cheerio from 'cheerio';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';

/**
 * Service to parse blog content from HTML
 */

export interface ParsedContent {
  html: string;
  plainText: string;
  headings: Array<{ level: number; text: string }>;
  images: Array<{ src: string; alt?: string }>;
  links: Array<{ href: string; text: string; isExternal: boolean }>;
  wordCount: number;
  readingTime: number;
}

export class BlogParserService {
  /**
   * Parse blog content from HTML
   */
  parse(html: string, url: string): ParsedContent {
    const $ = cheerio.load(html);

    // Try to find the main content area
    const content = this.extractMainContent($, html, url);

    return {
      html: content.html,
      plainText: content.text,
      headings: this.extractHeadings(content.html),
      images: this.extractImages(content.html, url),
      links: this.extractLinks(content.html, url),
      wordCount: this.countWords(content.text),
      readingTime: this.calculateReadingTime(content.text),
    };
  }

  /**
   * Extract main content from HTML
   */
  private extractMainContent(
    $: cheerio.CheerioAPI,
    html: string,
    url: string
  ): { html: string; text: string } {
    // Try common content selectors first
    const contentSelectors = [
      'article',
      '[role="main"]',
      'main',
      '.post-content',
      '.entry-content',
      '.article-content',
      '.post-body',
      '.content',
      '#content',
      '.blog-post',
    ];

    for (const selector of contentSelectors) {
      const element = $(selector).first();
      if (element.length && element.text().trim().length > 100) {
        const html = element.html() || '';
        const text = element.text().trim();
        return { html, text };
      }
    }

    // Fallback to Mozilla Readability
    try {
      const dom = new JSDOM(html, { url });
      const reader = new Readability(dom.window.document);
      const article = reader.parse();

      if (article) {
        return {
          html: article.content,
          text: article.textContent,
        };
      }
    } catch (error) {
      console.error('Readability failed:', error);
    }

    // Last resort: use body content
    const bodyHtml = $('body').html() || html;
    const bodyText = $('body').text().trim();
    return { html: bodyHtml, text: bodyText };
  }

  /**
   * Extract headings from content
   */
  private extractHeadings(html: string): Array<{ level: number; text: string }> {
    const $ = cheerio.load(html);
    const headings: Array<{ level: number; text: string }> = [];

    $('h1, h2, h3, h4, h5, h6').each((_, element) => {
      const tagName = $(element).prop('tagName')?.toLowerCase();
      const level = parseInt(tagName?.replace('h', '') || '1');
      const text = $(element).text().trim();

      if (text) {
        headings.push({ level, text });
      }
    });

    return headings;
  }

  /**
   * Extract images from content
   */
  private extractImages(
    html: string,
    baseUrl: string
  ): Array<{ src: string; alt?: string }> {
    const $ = cheerio.load(html);
    const images: Array<{ src: string; alt?: string }> = [];

    $('img').each((_, element) => {
      let src = $(element).attr('src');
      const alt = $(element).attr('alt');

      if (src) {
        // Convert relative URLs to absolute
        try {
          src = new URL(src, baseUrl).href;
        } catch {
          // Keep original if URL parsing fails
        }

        images.push({ src, alt });
      }
    });

    return images;
  }

  /**
   * Extract links from content
   */
  private extractLinks(
    html: string,
    baseUrl: string
  ): Array<{ href: string; text: string; isExternal: boolean }> {
    const $ = cheerio.load(html);
    const links: Array<{ href: string; text: string; isExternal: boolean }> = [];

    $('a[href]').each((_, element) => {
      let href = $(element).attr('href') || '';
      const text = $(element).text().trim();

      if (href && text) {
        // Convert relative URLs to absolute
        try {
          href = new URL(href, baseUrl).href;
        } catch {
          // Keep original if URL parsing fails
        }

        // Check if external
        const isExternal = !href.includes(new URL(baseUrl).hostname);

        links.push({ href, text, isExternal });
      }
    });

    return links;
  }

  /**
   * Count words in text
   */
  private countWords(text: string): number {
    return text.split(/\s+/).filter((word) => word.length > 0).length;
  }

  /**
   * Calculate reading time (assuming 200 words per minute)
   */
  private calculateReadingTime(text: string): number {
    const wordCount = this.countWords(text);
    return Math.ceil(wordCount / 200);
  }
}

export default new BlogParserService();

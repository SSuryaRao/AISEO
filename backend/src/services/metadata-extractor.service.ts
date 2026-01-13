import * as cheerio from 'cheerio';

/**
 * Service to extract metadata from HTML
 */

export interface ExtractedMetadata {
  title: string;
  description?: string;
  author?: string;
  publishDate?: string;
  modifiedDate?: string;
  featuredImage?: string;
  siteName?: string;
  lang?: string;
}

export class MetadataExtractorService {
  /**
   * Extract metadata from HTML
   */
  extract(html: string, url: string): ExtractedMetadata {
    const $ = cheerio.load(html);

    const metadata: ExtractedMetadata = {
      title: this.extractTitle($),
      description: this.extractDescription($),
      author: this.extractAuthor($),
      publishDate: this.extractPublishDate($),
      modifiedDate: this.extractModifiedDate($),
      featuredImage: this.extractFeaturedImage($, url),
      siteName: this.extractSiteName($),
      lang: this.extractLanguage($),
    };

    return metadata;
  }

  private extractTitle($: cheerio.CheerioAPI): string {
    // Try various meta tags and fallbacks
    return (
      $('meta[property="og:title"]').attr('content') ||
      $('meta[name="twitter:title"]').attr('content') ||
      $('title').text() ||
      $('h1').first().text() ||
      'Untitled'
    ).trim();
  }

  private extractDescription($: cheerio.CheerioAPI): string | undefined {
    const description =
      $('meta[property="og:description"]').attr('content') ||
      $('meta[name="twitter:description"]').attr('content') ||
      $('meta[name="description"]').attr('content') ||
      $('p').first().text().substring(0, 160);

    return description ? description.trim() : undefined;
  }

  private extractAuthor($: cheerio.CheerioAPI): string | undefined {
    const author =
      $('meta[name="author"]').attr('content') ||
      $('meta[property="article:author"]').attr('content') ||
      $('meta[name="twitter:creator"]').attr('content') ||
      $('.author').first().text() ||
      $('[rel="author"]').first().text();

    return author ? author.trim() : undefined;
  }

  private extractPublishDate($: cheerio.CheerioAPI): string | undefined {
    const date =
      $('meta[property="article:published_time"]').attr('content') ||
      $('meta[name="publish_date"]').attr('content') ||
      $('time[datetime]').first().attr('datetime') ||
      $('time').first().text();

    return date ? date.trim() : undefined;
  }

  private extractModifiedDate($: cheerio.CheerioAPI): string | undefined {
    const date =
      $('meta[property="article:modified_time"]').attr('content') ||
      $('meta[name="last-modified"]').attr('content');

    return date ? date.trim() : undefined;
  }

  private extractFeaturedImage($: cheerio.CheerioAPI, baseUrl: string): string | undefined {
    const image =
      $('meta[property="og:image"]').attr('content') ||
      $('meta[name="twitter:image"]').attr('content') ||
      $('article img').first().attr('src') ||
      $('img').first().attr('src');

    if (!image) return undefined;

    // Convert relative URLs to absolute
    try {
      return new URL(image, baseUrl).href;
    } catch {
      return image;
    }
  }

  private extractSiteName($: cheerio.CheerioAPI): string | undefined {
    const siteName =
      $('meta[property="og:site_name"]').attr('content') ||
      $('meta[name="application-name"]').attr('content');

    return siteName ? siteName.trim() : undefined;
  }

  private extractLanguage($: cheerio.CheerioAPI): string | undefined {
    return $('html').attr('lang') || $('meta[http-equiv="content-language"]').attr('content');
  }
}

export default new MetadataExtractorService();

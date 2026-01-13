import axios from 'axios';

/**
 * Service to fetch HTML content from URLs
 */

export interface FetchResult {
  html: string;
  url: string;
  statusCode: number;
  headers: Record<string, string>;
}

export class URLFetcherService {
  /**
   * Fetch HTML content from a URL
   */
  async fetch(url: string): Promise<FetchResult> {
    try {
      const response = await axios.get(url, {
        timeout: 15000, // 15 seconds timeout
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Accept-Encoding': 'gzip, deflate, br',
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          'Sec-Fetch-Dest': 'document',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-Site': 'none',
          'Upgrade-Insecure-Requests': '1',
        },
        maxRedirects: 5,
        validateStatus: (status) => status < 500, // Accept any status < 500
      });

      // If we got a 403, 401, or other client error, provide helpful message
      if (response.status === 403) {
        throw new Error(
          'This website is blocking automated access. Try a different blog URL or check if the site requires authentication.'
        );
      }

      if (response.status === 401) {
        throw new Error('This blog requires authentication to access.');
      }

      if (response.status === 404) {
        throw new Error('Blog post not found (404). Please check the URL and try again.');
      }

      if (response.status >= 400) {
        throw new Error(`Unable to fetch blog (HTTP ${response.status}). Please try a different URL.`);
      }

      return {
        html: response.data,
        url: response.request.res?.responseUrl || url,
        statusCode: response.status,
        headers: response.headers as Record<string, string>,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Network errors
        if (error.code === 'ECONNABORTED') {
          throw new Error('Request timeout. The website took too long to respond.');
        }
        if (error.code === 'ENOTFOUND') {
          throw new Error('Website not found. Please check the URL.');
        }
        if (error.code === 'ECONNREFUSED') {
          throw new Error('Connection refused. The website may be down.');
        }

        // If we already threw a custom error, re-throw it
        if (error.message.includes('blocking automated access') ||
            error.message.includes('requires authentication') ||
            error.message.includes('not found')) {
          throw error;
        }

        // Generic error with status code
        const status = error.response?.status;
        throw new Error(
          status
            ? `Unable to fetch blog (HTTP ${status}). Please try a different URL.`
            : `Network error: ${error.message}. Please check your internet connection.`
        );
      }

      // Unknown error
      throw new Error(`Unexpected error while fetching blog: ${error}`);
    }
  }

  /**
   * Validate URL format
   */
  validateURL(url: string): boolean {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  }
}

export default new URLFetcherService();

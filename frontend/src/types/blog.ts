/**
 * Blog content and metadata types
 */

export interface BlogMetadata {
  title: string;
  description?: string;
  author?: string;
  publishDate?: string;
  modifiedDate?: string;
  featuredImage?: string;
  siteName?: string;
  url?: string;
  lang?: string;
}

export interface ContentStructure {
  headings: Heading[];
  images: ImageInfo[];
  links: LinkInfo[];
  wordCount: number;
  readingTime: number;
}

export interface Heading {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
  id?: string;
}

export interface ImageInfo {
  src: string;
  alt?: string;
  title?: string;
  width?: number;
  height?: number;
}

export interface LinkInfo {
  href: string;
  text: string;
  isExternal: boolean;
}

export interface BlogContent {
  url: string;
  html: string;
  plainText: string;
  metadata: BlogMetadata;
  structure: ContentStructure;
  platform?: BlogPlatform;
}

export type BlogPlatform =
  | 'wordpress'
  | 'medium'
  | 'ghost'
  | 'substack'
  | 'blogger'
  | 'custom';

export interface FetchBlogResponse {
  success: boolean;
  data?: BlogContent;
  error?: string;
}

/**
 * Schema.org markup types (JSON-LD)
 */

export interface BaseSchema {
  '@context': string;
  '@type': string;
}

export interface ArticleSchema extends BaseSchema {
  '@type': 'Article' | 'BlogPosting' | 'NewsArticle';
  headline: string;
  image?: string | string[];
  datePublished?: string;
  dateModified?: string;
  author?: PersonSchema | OrganizationSchema;
  publisher?: OrganizationSchema;
  description?: string;
  mainEntityOfPage?: {
    '@type': 'WebPage';
    '@id': string;
  };
  wordCount?: number;
  articleBody?: string;
  keywords?: string | string[];
}

export interface PersonSchema extends BaseSchema {
  '@type': 'Person';
  name: string;
  url?: string;
  image?: string;
  jobTitle?: string;
  sameAs?: string[];
}

export interface OrganizationSchema extends BaseSchema {
  '@type': 'Organization';
  name: string;
  url?: string;
  logo?: ImageObjectSchema;
  sameAs?: string[];
}

export interface ImageObjectSchema extends BaseSchema {
  '@type': 'ImageObject';
  url: string;
  width?: number;
  height?: number;
}

export interface FAQSchema extends BaseSchema {
  '@type': 'FAQPage';
  mainEntity: FAQItem[];
}

export interface FAQItem {
  '@type': 'Question';
  name: string;
  acceptedAnswer: {
    '@type': 'Answer';
    text: string;
  };
}

export interface HowToSchema extends BaseSchema {
  '@type': 'HowTo';
  name: string;
  description?: string;
  image?: string | string[];
  totalTime?: string;
  estimatedCost?: {
    '@type': 'MonetaryAmount';
    currency: string;
    value: string;
  };
  supply?: HowToSupply[];
  tool?: HowToTool[];
  step: HowToStep[];
}

export interface HowToSupply extends BaseSchema {
  '@type': 'HowToSupply';
  name: string;
}

export interface HowToTool extends BaseSchema {
  '@type': 'HowToTool';
  name: string;
}

export interface HowToStep extends BaseSchema {
  '@type': 'HowToStep';
  name: string;
  text: string;
  url?: string;
  image?: string;
}

export interface BreadcrumbSchema extends BaseSchema {
  '@type': 'BreadcrumbList';
  itemListElement: BreadcrumbItem[];
}

export interface BreadcrumbItem {
  '@type': 'ListItem';
  position: number;
  name: string;
  item?: string;
}

export type SchemaMarkup =
  | ArticleSchema
  | FAQSchema
  | HowToSchema
  | BreadcrumbSchema
  | PersonSchema
  | OrganizationSchema;

export interface SchemaGeneratorOptions {
  type: 'Article' | 'FAQ' | 'HowTo' | 'Breadcrumb';
  data: Record<string, any>;
}

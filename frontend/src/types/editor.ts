/**
 * Editor state and configuration types
 */

import { Editor } from '@tiptap/react';
import type { SchemaMarkup } from './schema';
import type { MetaTags } from './seo';

export interface EditorState {
  content: string;
  html: string;
  wordCount: number;
  characterCount: number;
}

export interface EditorToolbarButton {
  name: string;
  icon: string;
  command: (editor: Editor) => void;
  isActive?: (editor: Editor) => boolean;
  isDisabled?: (editor: Editor) => boolean;
}

export interface EditorMenuGroup {
  title: string;
  buttons: EditorToolbarButton[];
}

export interface PreviewState {
  html: string;
  metaTags: MetaTags;
  schemas: SchemaMarkup[];
  isLoading: boolean;
}

export type PanelType = 'original' | 'editor' | 'preview';

export interface PanelVisibility {
  original: boolean;
  editor: boolean;
  preview: boolean;
}

export interface ExportOptions {
  format: 'full-html' | 'fragment' | 'wordpress' | 'markdown';
  includeMetaTags: boolean;
  includeSchemas: boolean;
  minify: boolean;
}

export interface ExportResult {
  success: boolean;
  html?: string;
  filename?: string;
  error?: string;
}

'use client';

import { useStore } from '@/store/useStore';

export default function LeftPanel() {
  const { originalBlog } = useStore();

  if (!originalBlog) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-500 p-8">
        <div className="text-6xl mb-4">📄</div>
        <p className="text-lg font-medium text-gray-700 mb-2">No Blog Loaded</p>
        <p className="text-sm text-gray-500 text-center max-w-xs">
          Enter a blog URL above to start analyzing and optimizing your content
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📄</span>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Original Blog</h2>
            <p className="text-xs text-gray-600 mt-0.5">Source content • Read-only</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-white to-gray-50">
        {/* Metadata */}
        <div className="mb-6 pb-6 border-b-2 border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
            {originalBlog.metadata.title}
          </h1>
          {originalBlog.metadata.description && (
            <p className="text-gray-600 mb-4 leading-relaxed">
              {originalBlog.metadata.description}
            </p>
          )}
          <div className="flex flex-wrap gap-3 text-sm">
            {originalBlog.metadata.author && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                <span>👤</span>
                {originalBlog.metadata.author}
              </span>
            )}
            {originalBlog.metadata.publishDate && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full">
                <span>📅</span>
                {originalBlog.metadata.publishDate}
              </span>
            )}
            {originalBlog.structure.wordCount && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-700 rounded-full">
                <span>📝</span>
                {originalBlog.structure.wordCount} words
              </span>
            )}
            {originalBlog.structure.readingTime && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-700 rounded-full">
                <span>⏱️</span>
                {originalBlog.structure.readingTime} min read
              </span>
            )}
          </div>
        </div>

        {/* Blog Content */}
        <div
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-900 prose-strong:text-gray-900 prose-li:text-gray-900 prose-a:text-blue-600 prose-ul:text-gray-900 prose-ol:text-gray-900 [&>*]:text-gray-900"
          style={{ color: '#111827' }}
          dangerouslySetInnerHTML={{ __html: originalBlog.html }}
        />
      </div>
    </div>
  );
}

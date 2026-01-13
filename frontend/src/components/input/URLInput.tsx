'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import LoadingState from './LoadingState';

interface URLInputProps {
  onBlogFetched?: () => void;
}

export default function URLInput({ onBlogFetched }: URLInputProps) {
  const [url, setUrl] = useState('');
  const {
    setBlogUrl,
    setOriginalBlog,
    setIsFetchingBlog,
    setError,
    isFetchingBlog,
    error,
  } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      setError('Please enter a valid URL');
      return;
    }

    setIsFetchingBlog(true);
    setError(null);
    setBlogUrl(url);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/blog/fetch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch blog');
      }

      if (data.success && data.data) {
        setOriginalBlog(data.data);
        onBlogFetched?.();
      } else {
        throw new Error('Failed to parse blog content');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch blog');
    } finally {
      setIsFetchingBlog(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="blog-url"
            className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2"
          >
            <span className="text-xl">🔗</span>
            <span>Enter Blog URL to Analyze</span>
          </label>
          <div className="relative">
            <input
              id="blog-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/your-amazing-blog-post"
              className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder:text-gray-400 text-base shadow-sm hover:border-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
              disabled={isFetchingBlog}
            />
            {url && (
              <button
                type="button"
                onClick={() => setUrl('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Clear URL"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
          <p className="mt-2 text-xs text-gray-500 flex items-center gap-1.5">
            <span>💡</span>
            <span>Paste any blog URL to get instant SEO insights and AI-powered optimization</span>
          </p>
        </div>

        <button
          type="submit"
          disabled={isFetchingBlog || !url.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
        >
          {isFetchingBlog ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Analyzing Blog...</span>
            </>
          ) : (
            <>
              <span className="text-2xl">🚀</span>
              <span>Analyze & Optimize Blog</span>
            </>
          )}
        </button>
      </form>

      {isFetchingBlog && <LoadingState message="Fetching and analyzing blog content..." />}

      {error && (
        <div className="p-5 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl shadow-md animate-shake">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="text-sm font-bold text-red-900 mb-1">Error</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

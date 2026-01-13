'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import URLInput from '@/components/input/URLInput';
import ThreePanelLayout from '@/components/layout/ThreePanelLayout';

export default function Home() {
  const { originalBlog, isLoading } = useStore();
  const [showPanels, setShowPanels] = useState(false);

  const handleBlogFetched = () => {
    setShowPanels(true);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 border-b-4 border-indigo-700 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-white flex items-center gap-3 mb-2">
                <span className="text-5xl">✨</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                  AI SEO Optimizer
                </span>
              </h1>
              <p className="text-base text-blue-100 font-medium flex items-center gap-2">
                <span>🚀</span>
                <span>Optimize your blog for AI chatbots like ChatGPT & Perplexity</span>
              </p>
            </div>
            {showPanels && (
              <button
                onClick={() => setShowPanels(false)}
                className="px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span>←</span>
                <span>New Analysis</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showPanels ? (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl p-10 border-2 border-blue-100">
              <div className="text-center mb-8">
                <div className="inline-block mb-4">
                  <span className="text-6xl">🎯</span>
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-3">
                  Get Started with AI-Powered SEO
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                  Enter your blog URL below to analyze and optimize its SEO for better
                  visibility in AI chatbots and search engines.
                </p>
              </div>
              <URLInput onBlogFetched={handleBlogFetched} />
            </div>

            {/* Features */}
            <div className="mt-12">
              <div className="text-center mb-10">
                <h3 className="text-2xl font-black text-gray-900 mb-3 flex items-center justify-center gap-3">
                  <span className="text-3xl">⚡</span>
                  <span>Powerful Features</span>
                </h3>
                <p className="text-gray-600">Everything you need for perfect SEO optimization</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-8 border-2 border-blue-200 hover:shadow-2xl transition-all hover:scale-105 transform">
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">🤖</div>
                    <div>
                      <div className="text-blue-700 font-black text-xl mb-3">
                        AI-Powered Optimization
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Leverages Google Gemini AI to analyze and suggest intelligent improvements for
                        your content with real-time optimization.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-8 border-2 border-green-200 hover:shadow-2xl transition-all hover:scale-105 transform">
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">📋</div>
                    <div>
                      <div className="text-green-700 font-black text-xl mb-3">
                        Schema Markup Generation
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Automatically generates Article, FAQ, and HowTo structured data
                        for enhanced search visibility and rich results.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-8 border-2 border-purple-200 hover:shadow-2xl transition-all hover:scale-105 transform">
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">🏷️</div>
                    <div>
                      <div className="text-purple-700 font-black text-xl mb-3">
                        Meta Tags Optimization
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Optimizes title, description, OpenGraph, and Twitter Card
                        tags for maximum social media impact.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl shadow-lg p-8 border-2 border-orange-200 hover:shadow-2xl transition-all hover:scale-105 transform">
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">🚀</div>
                    <div>
                      <div className="text-orange-700 font-black text-xl mb-3">
                        Live Preview & Export
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        See all changes in real-time and export optimized, production-ready HTML
                        with one click.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ThreePanelLayout />
        )}
      </div>
    </main>
  );
}

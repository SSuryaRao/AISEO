'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { ContentAnalyzer } from '@/lib/contentAnalyzer';
import StructureScore from '@/components/optimization/StructureScore';
import OptimizationChecklist from '@/components/optimization/OptimizationChecklist';
import AIInsights from '@/components/optimization/AIInsights';

export default function RightPanel() {
  const {
    originalBlog,
    metaTags,
    schemas,
    aiAnalysis,
    isAnalyzingWithAI,
    updateMetaTags,
    addSchema,
    setStructureAnalysis,
    setOptimizationChecklist,
    setAIAnalysis,
    setIsAnalyzingWithAI,
  } = useStore();
  const [improvingSection, setImprovingSection] = useState<string | null>(null);

  // Analyze content structure when blog is loaded
  useEffect(() => {
    if (originalBlog) {
      const analysis = ContentAnalyzer.analyzeStructure(originalBlog);
      const checklist = ContentAnalyzer.generateChecklist(originalBlog, analysis);
      setStructureAnalysis(analysis);
      setOptimizationChecklist(checklist);
    }
  }, [originalBlog, setStructureAnalysis, setOptimizationChecklist]);

  const handleImproveWithAI = async (section: 'metaTags' | 'schema' | 'preview') => {
    setImprovingSection(section);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

      switch (section) {
        case 'metaTags': {
          console.log('🤖 Optimizing meta tags with Gemini AI...');

          const response = await fetch(`${apiUrl}/api/seo/meta-tags`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              content: originalBlog?.plainText || '',
              metadata: {
                title: metaTags?.title,
                description: metaTags?.description,
              },
            }),
          });

          const data = await response.json();

          if (!data.success) {
            throw new Error(data.error || 'Failed to optimize meta tags');
          }

          updateMetaTags({
            title: data.data.title,
            description: data.data.description,
          });

          console.log('✅ Meta tags optimized with AI');
          break;
        }

        case 'schema': {
          console.log('🤖 Generating schema markup with Gemini AI...');

          const response = await fetch(`${apiUrl}/api/seo/schemas`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              content: originalBlog?.plainText || '',
              metadata: originalBlog?.metadata || {},
            }),
          });

          const data = await response.json();

          if (!data.success) {
            throw new Error(data.error || 'Failed to generate schemas');
          }

          // Add each generated schema
          data.data.forEach((schemaItem: any) => {
            addSchema(schemaItem.data);
          });

          console.log('✅ Schema markup generated with AI');
          break;
        }

        case 'preview':
          console.log('⚠️ Content preview improvement coming soon...');
          alert('Content preview improvement is coming in a future update!');
          break;
      }
    } catch (error) {
      console.error(`❌ Error improving ${section} with AI:`, error);
      alert(`Failed to improve ${section}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setImprovingSection(null);
    }
  };

  const handleGetAIInsights = async () => {
    if (!originalBlog) return;

    setIsAnalyzingWithAI(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

      console.log('🧠 Running deep AI content analysis...');

      const response = await fetch(`${apiUrl}/api/seo/analyze-ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: originalBlog.plainText || '',
          metadata: {
            title: originalBlog.metadata.title,
            author: originalBlog.metadata.author,
          },
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to analyze content with AI');
      }

      setAIAnalysis(data.data);
      console.log(`✅ AI analysis complete - Overall score: ${data.data.overallScore}/100`);
    } catch (error) {
      console.error('❌ Error running AI analysis:', error);
      alert(`Failed to run AI analysis: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsAnalyzingWithAI(false);
    }
  };

  if (!originalBlog) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-500 p-8">
        <div className="text-6xl mb-4">👁️</div>
        <p className="text-lg font-medium text-gray-700 mb-2">Preview Awaiting</p>
        <p className="text-sm text-gray-500 text-center max-w-xs">
          Live SEO preview and meta data will appear here once you load a blog
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="flex items-center gap-2">
          <span className="text-2xl">👁️</span>
          <div>
            <h2 className="text-lg font-bold text-gray-900">SEO Preview</h2>
            <p className="text-xs text-gray-600 mt-0.5">Live preview • Meta data • Analytics</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-purple-50/30 to-white space-y-6">
        {/* Structure Score Widget */}
        <StructureScore />

        {/* Optimization Checklist */}
        <OptimizationChecklist />

        {/* AI Deep Analysis Section */}
        <div className="mb-6">
          {!aiAnalysis ? (
            <div className="bg-white rounded-xl shadow-lg border-2 border-purple-200 overflow-hidden">
              <div className="px-6 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🧠</span>
                    <div>
                      <h3 className="text-xl font-black">AI Deep Analysis</h3>
                      <p className="text-sm opacity-90">Get comprehensive quality insights</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="text-center py-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-dashed border-purple-300">
                  <div className="text-6xl mb-4">🚀</div>
                  <p className="text-base font-bold text-purple-900 mb-3">Ready for Deep Insights?</p>
                  <p className="text-sm text-purple-700 max-w-md mx-auto mb-6">
                    Get AI-powered analysis of your content across 8 quality criteria with specific recommendations and examples
                  </p>
                  <button
                    onClick={handleGetAIInsights}
                    disabled={isAnalyzingWithAI}
                    className="px-6 py-3 text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 inline-flex items-center gap-2"
                  >
                    {isAnalyzingWithAI ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Analyzing with AI...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-xl">✨</span>
                        <span>Get AI Insights</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <AIInsights />
          )}
        </div>

        {/* Meta Tags Section */}
        <div className="mb-6 group">
          <div className="bg-white rounded-xl shadow-md border-2 border-purple-100 overflow-hidden hover:border-purple-200 transition-all hover:shadow-lg">
            <div className="px-5 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🏷️</span>
                <h3 className="text-base font-bold text-gray-900">Meta Tags</h3>
              </div>
              <button
                onClick={() => handleImproveWithAI('metaTags')}
                disabled={improvingSection === 'metaTags'}
                className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                title="Use AI to optimize meta tags for better SEO"
              >
                {improvingSection === 'metaTags' ? (
                  <span className="flex items-center gap-1">
                    <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Improving...
                  </span>
                ) : (
                  '✨ Improve'
                )}
              </button>
            </div>
            <div className="p-5">
              {metaTags ? (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">Title Tag</span>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        metaTags.title.length >= 50 && metaTags.title.length <= 60
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {metaTags.title.length} chars
                      </span>
                    </div>
                    <p className="text-sm text-gray-900 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-200">
                      {metaTags.title}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">Meta Description</span>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        metaTags.description.length >= 120 && metaTags.description.length <= 160
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {metaTags.description.length} chars
                      </span>
                    </div>
                    <p className="text-sm text-gray-900 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-200">
                      {metaTags.description}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="text-4xl mb-3">🎯</div>
                  <p className="text-sm text-gray-600 font-medium mb-1">No meta tags yet</p>
                  <p className="text-xs text-gray-500">
                    Use AI optimization to generate SEO-friendly tags
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Schema Markup Section */}
        <div className="mb-6 group">
          <div className="bg-white rounded-xl shadow-md border-2 border-green-100 overflow-hidden hover:border-green-200 transition-all hover:shadow-lg">
            <div className="px-5 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">📋</span>
                <h3 className="text-base font-bold text-gray-900">Schema Markup</h3>
              </div>
              <button
                onClick={() => handleImproveWithAI('schema')}
                disabled={improvingSection === 'schema'}
                className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                title="Generate structured data for better search visibility"
              >
                {improvingSection === 'schema' ? (
                  <span className="flex items-center gap-1">
                    <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Improving...
                  </span>
                ) : (
                  '✨ Improve'
                )}
              </button>
            </div>
            <div className="p-5">
              {schemas.length > 0 ? (
                <div className="space-y-3">
                  {schemas.map((schema, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200 hover:border-green-300 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">✓</span>
                        <span className="text-sm font-bold text-green-800">
                          {schema['@type']} Schema
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="text-4xl mb-3">📊</div>
                  <p className="text-sm text-gray-600 font-medium mb-1">No schemas yet</p>
                  <p className="text-xs text-gray-500">
                    Generate structured data to enhance search results
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="mb-6 group">
          <div className="bg-white rounded-xl shadow-md border-2 border-blue-100 overflow-hidden hover:border-blue-200 transition-all hover:shadow-lg">
            <div className="px-5 py-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌐</span>
                <h3 className="text-base font-bold text-gray-900">Content Preview</h3>
              </div>
              <button
                onClick={() => handleImproveWithAI('preview')}
                disabled={improvingSection === 'preview'}
                className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                title="Enhance content preview"
              >
                {improvingSection === 'preview' ? (
                  <span className="flex items-center gap-1">
                    <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Improving...
                  </span>
                ) : (
                  '✨ Improve'
                )}
              </button>
            </div>
            <div className="p-5">
              <div className="text-center py-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border-2 border-dashed border-blue-200">
                <div className="text-5xl mb-4">🚀</div>
                <p className="text-sm font-bold text-blue-900 mb-2">Coming in Phase 3</p>
                <p className="text-xs text-blue-700 max-w-xs mx-auto">
                  Live HTML preview with real-time rendering will be available soon
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <div className="sticky bottom-0 pt-4">
          <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 transform hover:scale-[1.02] active:scale-[0.98] border-2 border-green-500">
            <span className="text-2xl">📥</span>
            <span>Export Optimized HTML</span>
          </button>
        </div>
      </div>
    </div>
  );
}

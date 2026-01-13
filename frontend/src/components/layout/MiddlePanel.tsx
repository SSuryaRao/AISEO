'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import SectionEditor from '@/components/optimization/SectionEditor';

export default function MiddlePanel() {
  const { originalBlog, contentSections, updateContentSection } = useStore();
  const [generatingSections, setGeneratingSections] = useState<Record<string, boolean>>({});

  const handleGenerateSection = async (sectionName: string) => {
    setGeneratingSections({ ...generatingSections, [sectionName]: true });

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

      // Prepare metadata for context
      const metadata = {
        title: originalBlog?.metadata.title,
        author: originalBlog?.metadata.author,
        mainQuestion: contentSections.mainQuestion,
        ctaText: contentSections.callToAction.text,
      };

      // Call real Gemini API
      const response = await fetch(`${apiUrl}/api/seo/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          section: sectionName,
          content: originalBlog?.plainText || '',
          metadata,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to generate content');
      }

      const generatedContent = data.data.content;

      // Update the specific section
      if (sectionName === 'authorName') {
        updateContentSection({
          authorCredibility: {
            ...contentSections.authorCredibility,
            name: generatedContent,
          },
        });
      } else if (sectionName === 'ctaText') {
        updateContentSection({
          callToAction: {
            ...contentSections.callToAction,
            text: generatedContent,
          },
        });
      } else if (sectionName === 'ctaButton') {
        updateContentSection({
          callToAction: {
            ...contentSections.callToAction,
            buttonText: generatedContent,
          },
        });
      } else {
        updateContentSection({
          [sectionName]: generatedContent,
        });
      }

      console.log(`✅ Generated ${sectionName} with AI`);
    } catch (error) {
      console.error('❌ Error generating content:', error);
      alert(`Failed to generate content: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setGeneratingSections({ ...generatingSections, [sectionName]: false });
    }
  };

  if (!originalBlog) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-500 p-8">
        <div className="text-6xl mb-4">✏️</div>
        <p className="text-lg font-medium text-gray-700 mb-2">Editor Ready</p>
        <p className="text-sm text-gray-500 text-center max-w-xs">
          Load a blog to start editing and optimizing your content with AI
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center gap-2">
          <span className="text-2xl">✏️</span>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Structured Content Editor</h2>
            <p className="text-xs text-gray-600 mt-0.5">AI-optimized sections • One-click generation</p>
          </div>
        </div>
      </div>

      {/* Sectioned Editor Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-blue-50/30 to-white space-y-4">
        {/* Info Box */}
        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 border-2 border-blue-300 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <span className="text-3xl">💡</span>
            <div>
              <h3 className="font-black text-blue-900 mb-2">AI-Optimized Structure</h3>
              <p className="text-sm text-blue-800 leading-relaxed">
                Fill in each section below to create perfectly structured, AI-friendly content.
                Use the <strong>Generate</strong> button for instant AI suggestions!
              </p>
            </div>
          </div>
        </div>

        {/* Main Question Section */}
        <SectionEditor
          icon="❓"
          title="Main Question / Title"
          description="Question-focused H1 that targets user search intent"
          value={contentSections.mainQuestion}
          placeholder="e.g., What's the best AI Visibility Platform?"
          maxLength={100}
          onGenerate={() => handleGenerateSection('mainQuestion')}
          onChange={(value) => updateContentSection({ mainQuestion: value })}
          isGenerating={generatingSections['mainQuestion']}
        />

        {/* Direct Answer Section */}
        <SectionEditor
          icon="💡"
          title="Direct Answer"
          description="Concise 1-2 sentence answer (max 300 chars)"
          value={contentSections.directAnswer}
          placeholder="Start with a brief, direct answer to the main question..."
          maxLength={300}
          multiline
          rows={3}
          onGenerate={() => handleGenerateSection('directAnswer')}
          onChange={(value) => updateContentSection({ directAnswer: value })}
          isGenerating={generatingSections['directAnswer']}
        />

        {/* TL;DR Summary Section */}
        <SectionEditor
          icon="📋"
          title="TL;DR Summary"
          description="Key points in bullet format (3-5 bullets)"
          value={contentSections.tldrSummary}
          placeholder="• Key point 1&#10;• Key point 2&#10;• Key point 3"
          multiline
          rows={5}
          onGenerate={() => handleGenerateSection('tldrSummary')}
          onChange={(value) => updateContentSection({ tldrSummary: value })}
          isGenerating={generatingSections['tldrSummary']}
        />

        {/* Author Info Section */}
        <SectionEditor
          icon="👤"
          title="Author & Credibility"
          description="Author name and credentials for credibility"
          value={contentSections.authorCredibility.name}
          placeholder="e.g., John Doe, AI Expert & Founder of AIOps"
          onGenerate={() => handleGenerateSection('authorName')}
          onChange={(value) =>
            updateContentSection({
              authorCredibility: { ...contentSections.authorCredibility, name: value },
            })
          }
          isGenerating={generatingSections['authorName']}
        />

        {/* Main Content Section */}
        <SectionEditor
          icon="📝"
          title="Main Content"
          description="Full article content with proper formatting (H2/H3, lists)"
          value={contentSections.mainContent || originalBlog.plainText}
          placeholder="Write your detailed content here..."
          multiline
          rows={15}
          onChange={(value) => updateContentSection({ mainContent: value })}
        />

        {/* Call to Action Section */}
        <div className="space-y-3">
          <SectionEditor
            icon="🎯"
            title="Call to Action - Text"
            description="Engaging CTA message to encourage interaction"
            value={contentSections.callToAction.text}
            placeholder="Ready to get started? Learn more about our solution!"
            multiline
            rows={2}
            onGenerate={() => handleGenerateSection('ctaText')}
            onChange={(value) =>
              updateContentSection({
                callToAction: { ...contentSections.callToAction, text: value },
              })
            }
            isGenerating={generatingSections['ctaText']}
          />

          <SectionEditor
            icon="🔘"
            title="Call to Action - Button"
            description="Button text for the CTA"
            value={contentSections.callToAction.buttonText}
            placeholder="Get Started Now"
            maxLength={50}
            onGenerate={() => handleGenerateSection('ctaButton')}
            onChange={(value) =>
              updateContentSection({
                callToAction: { ...contentSections.callToAction, buttonText: value },
              })
            }
            isGenerating={generatingSections['ctaButton']}
          />
        </div>
      </div>
    </div>
  );
}

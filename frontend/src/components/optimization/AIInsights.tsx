'use client';

import { useStore } from '@/store/useStore';
import type { AIQualityScore } from '@/types/ai-analysis';

export default function AIInsights() {
  const { aiAnalysis } = useStore();

  if (!aiAnalysis) {
    return null;
  }

  const getStatusColor = (status: AIQualityScore['status']) => {
    switch (status) {
      case 'excellent':
        return 'border-green-300 bg-gradient-to-r from-green-50 to-emerald-50';
      case 'good':
        return 'border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50';
      case 'needs-work':
        return 'border-orange-300 bg-gradient-to-r from-orange-50 to-yellow-50';
      case 'poor':
        return 'border-red-300 bg-gradient-to-r from-red-50 to-pink-50';
    }
  };

  const getStatusIcon = (status: AIQualityScore['status']) => {
    switch (status) {
      case 'excellent':
        return '🌟';
      case 'good':
        return '✅';
      case 'needs-work':
        return '⚠️';
      case 'poor':
        return '❌';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-700';
    if (score >= 60) return 'text-blue-700';
    if (score >= 40) return 'text-orange-700';
    return 'text-red-700';
  };

  const criteria = [
    { key: 'mainQuestionQuality', label: 'Main Question', icon: '❓', data: aiAnalysis.mainQuestionQuality },
    { key: 'directAnswerQuality', label: 'Direct Answer', icon: '💡', data: aiAnalysis.directAnswerQuality },
    { key: 'tldrQuality', label: 'TL;DR Summary', icon: '📋', data: aiAnalysis.tldrQuality },
    { key: 'visualRelevance', label: 'Visual Content', icon: '🖼️', data: aiAnalysis.visualRelevance },
    { key: 'ctaEffectiveness', label: 'Call to Action', icon: '🎯', data: aiAnalysis.ctaEffectiveness },
    { key: 'formattingQuality', label: 'Formatting', icon: '📝', data: aiAnalysis.formattingQuality },
    { key: 'citationQuality', label: 'Citations', icon: '📚', data: aiAnalysis.citationQuality },
    { key: 'aiFriendliness', label: 'AI Optimization', icon: '🤖', data: aiAnalysis.aiFriendliness },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-purple-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🧠</span>
            <div>
              <h3 className="text-xl font-black">AI Deep Analysis</h3>
              <p className="text-sm opacity-90">Powered by Google Gemini</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-black">{aiAnalysis.overallScore}</div>
            <div className="text-sm font-semibold opacity-90">Overall Score</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Quality Scores */}
        <div className="space-y-3">
          {criteria.map(({ key, label, icon, data }) => (
            <div
              key={key}
              className={`rounded-xl border-2 overflow-hidden transition-all hover:shadow-lg ${getStatusColor(data.status)}`}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <span className="text-3xl flex-shrink-0">{icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">{label}</span>
                        <span className="text-xl">{getStatusIcon(data.status)}</span>
                      </div>
                      <div className={`text-2xl font-black ${getScoreColor(data.score)}`}>
                        {data.score}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{data.recommendation}</p>
                    {data.example && (
                      <div className="mt-3 p-3 bg-white/70 rounded-lg border border-current/20">
                        <div className="text-xs font-bold text-gray-600 mb-1">💡 Example:</div>
                        <div className="text-sm text-gray-800 italic">&quot;{data.example}&quot;</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Strengths */}
        <div className="mt-6 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">💪</span>
            <h4 className="font-black text-green-900">Strengths</h4>
          </div>
          <ul className="space-y-2">
            {aiAnalysis.strengths.map((strength, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-green-800">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Improvements */}
        <div className="p-5 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border-2 border-orange-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🎯</span>
            <h4 className="font-black text-orange-900">Improvements Needed</h4>
          </div>
          <ul className="space-y-2">
            {aiAnalysis.improvements.map((improvement, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-orange-800">
                <span className="text-orange-600 mt-0.5">→</span>
                <span>{improvement}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Timestamp */}
        <div className="text-center text-xs text-gray-500 pt-3 border-t border-gray-200">
          Analysis completed: {new Date(aiAnalysis.analyzedAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
}

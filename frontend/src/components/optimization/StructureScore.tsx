'use client';

import { useStore } from '@/store/useStore';

export default function StructureScore() {
  const { structureAnalysis } = useStore();

  if (!structureAnalysis) {
    return null;
  }

  const { score } = structureAnalysis;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-700 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200';
    if (score >= 60) return 'text-orange-700 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200';
    return 'text-red-700 bg-gradient-to-r from-red-50 to-pink-50 border-red-200';
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 90) return '🌟';
    if (score >= 80) return '🎯';
    if (score >= 60) return '📊';
    if (score >= 40) return '⚠️';
    return '🔴';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Great';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Needs Work';
    return 'Poor';
  };

  return (
    <div className={`rounded-xl shadow-lg border-2 overflow-hidden ${getScoreColor(score)}`}>
      <div className="px-6 py-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{getScoreEmoji(score)}</span>
            <div>
              <h3 className="text-lg font-black">AI Optimization Score</h3>
              <p className="text-xs opacity-75">Content structure analysis</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-black">{score}</div>
            <div className="text-sm font-bold">{getScoreLabel(score)}</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-3 bg-white/50 rounded-full overflow-hidden shadow-inner">
          <div
            className={`h-full transition-all duration-1000 ease-out ${
              score >= 80
                ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                : score >= 60
                ? 'bg-gradient-to-r from-orange-500 to-yellow-600'
                : 'bg-gradient-to-r from-red-500 to-pink-600'
            }`}
            style={{ width: `${score}%` }}
          />
        </div>

        {/* Quick Stats */}
        <div className="mt-4 grid grid-cols-4 gap-2 text-center">
          {[
            { label: 'Structure', value: structureAnalysis.hasProperFormatting },
            { label: 'Answer', value: structureAnalysis.hasDirectAnswer },
            { label: 'Visual', value: structureAnalysis.hasVisuals },
            { label: 'CTA', value: structureAnalysis.hasCTA },
          ].map((item, idx) => (
            <div key={idx} className="bg-white/60 rounded-lg px-2 py-2">
              <div className="text-lg">{item.value ? '✅' : '❌'}</div>
              <div className="text-xs font-bold opacity-75">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

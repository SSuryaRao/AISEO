'use client';

import { useStore } from '@/store/useStore';
import type { ChecklistItem } from '@/types/optimization';

export default function OptimizationChecklist() {
  const { optimizationChecklist } = useStore();

  if (!optimizationChecklist) {
    return null;
  }

  const getStatusIcon = (status: ChecklistItem['status']) => {
    switch (status) {
      case 'complete':
        return '✅';
      case 'needs-improvement':
        return '⚠️';
      case 'incomplete':
        return '❌';
    }
  };

  const getStatusColor = (status: ChecklistItem['status']) => {
    switch (status) {
      case 'complete':
        return 'border-green-200 bg-green-50';
      case 'needs-improvement':
        return 'border-orange-200 bg-orange-50';
      case 'incomplete':
        return 'border-red-200 bg-red-50';
    }
  };

  const items = [
    { key: 'mainQuestion', label: 'Main Question (H1)', item: optimizationChecklist.mainQuestion },
    { key: 'directAnswer', label: 'Direct Answer', item: optimizationChecklist.directAnswer },
    { key: 'tldrSummary', label: 'TL;DR Summary', item: optimizationChecklist.tldrSummary },
    { key: 'authorCredibility', label: 'Author Info', item: optimizationChecklist.authorCredibility },
    { key: 'visuals', label: 'Visuals', item: optimizationChecklist.visuals },
    { key: 'citableContent', label: 'Citations', item: optimizationChecklist.citableContent },
    { key: 'formatting', label: 'Formatting', item: optimizationChecklist.formatting },
    { key: 'callToAction', label: 'Call to Action', item: optimizationChecklist.callToAction },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-blue-100 overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
        <div className="flex items-center gap-2">
          <span className="text-2xl">✅</span>
          <h3 className="text-lg font-black text-gray-900">Optimization Checklist</h3>
        </div>
      </div>

      <div className="p-5 space-y-3">
        {items.map(({ key, label, item }) => (
          <div
            key={key}
            className={`rounded-lg border-2 p-4 transition-all hover:shadow-md ${getStatusColor(item.status)}`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{getStatusIcon(item.status)}</span>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-900 mb-1">{label}</div>
                <div className="text-sm text-gray-700 mb-2">{item.message}</div>
                {item.aiSuggestion && (
                  <div className="text-xs bg-white/70 border border-current/20 rounded-lg px-3 py-2 mt-2">
                    <div className="flex items-start gap-2">
                      <span className="text-base">💡</span>
                      <div>
                        <div className="font-bold mb-1">AI Suggestion:</div>
                        <div className="opacity-90">{item.aiSuggestion}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-xs font-bold opacity-60">Score</div>
                <div className="text-lg font-black">{item.score}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

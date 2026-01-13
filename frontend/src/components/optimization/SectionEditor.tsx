'use client';

import { useState } from 'react';

interface SectionEditorProps {
  icon: string;
  title: string;
  description: string;
  value: string;
  placeholder: string;
  maxLength?: number;
  multiline?: boolean;
  rows?: number;
  onGenerate?: () => Promise<void>;
  onChange: (value: string) => void;
  isGenerating?: boolean;
}

export default function SectionEditor({
  icon,
  title,
  description,
  value,
  placeholder,
  maxLength,
  multiline = false,
  rows = 3,
  onGenerate,
  onChange,
  isGenerating = false,
}: SectionEditorProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const hasContent = value && value.trim().length > 0;
  const isOverLimit = maxLength && value.length > maxLength;

  return (
    <div className="bg-white rounded-xl shadow-md border-2 border-blue-100 overflow-hidden hover:border-blue-200 transition-all">
      {/* Header */}
      <div
        className="px-5 py-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <span className="text-2xl">{icon}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-gray-900">{title}</h4>
                {hasContent && <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">✓</span>}
              </div>
              <p className="text-xs text-gray-600 mt-0.5">{description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onGenerate && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onGenerate();
                }}
                disabled={isGenerating}
                className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                title="Generate with AI"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-1">
                    <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </span>
                ) : (
                  '✨ Generate'
                )}
              </button>
            )}
            <button className="text-gray-500 hover:text-gray-700 transition-colors">
              {isExpanded ? '▼' : '▶'}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-5">
          {multiline ? (
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              rows={rows}
              maxLength={maxLength}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder:text-gray-400 resize-none"
            />
          ) : (
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              maxLength={maxLength}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
            />
          )}

          {maxLength && (
            <div className="flex items-center justify-between mt-2 text-xs">
              <span className={`font-semibold ${isOverLimit ? 'text-red-600' : 'text-gray-500'}`}>
                {value.length} / {maxLength} characters
                {isOverLimit && ' (over limit!)'}
              </span>
              {value.length > 0 && (
                <button
                  onClick={() => onChange('')}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  Clear
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

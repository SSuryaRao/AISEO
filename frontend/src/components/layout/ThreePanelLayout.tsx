'use client';

import LeftPanel from './LeftPanel';
import MiddlePanel from './MiddlePanel';
import RightPanel from './RightPanel';

export default function ThreePanelLayout() {
  return (
    <div className="h-[calc(100vh-140px)] flex gap-4">
      {/* Left Panel - Original Blog */}
      <div className="flex-1 bg-white rounded-lg shadow-md overflow-hidden">
        <LeftPanel />
      </div>

      {/* Middle Panel - Preview */}
      <div className="flex-1 bg-white rounded-lg shadow-md overflow-hidden">
        <RightPanel />
      </div>

      {/* Right Panel - Editor */}
      <div className="flex-1 bg-white rounded-lg shadow-md overflow-hidden">
        <MiddlePanel />
      </div>
    </div>
  );
}

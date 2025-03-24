import React from 'react';

export function ZaptBadge() {
  return (
    <div className="fixed bottom-4 right-4 z-10">
      <a
        href="https://www.zapt.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1 text-xs bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
      >
        Made on ZAPT
      </a>
    </div>
  );
}
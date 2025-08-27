'use client';

import React from 'react';

interface ToolbarProps {
  onAction: (action: string, value?: string) => void;
  onImport: () => void;
  onExport: () => void;
}

export default function Toolbar({ onAction, onImport, onExport }: ToolbarProps) {
  const buttons = [
    { action: 'undo', label: 'Undo', icon: '↶' },
    { action: 'redo', label: 'Redo', icon: '↷' },
    { action: 'bold', label: 'Bold', icon: 'B', style: 'font-bold' },
    { action: 'italic', label: 'Italic', icon: 'I', style: 'italic' },
    { action: 'h1', label: 'H1', icon: 'H1' },
    { action: 'h2', label: 'H2', icon: 'H2' },
    { action: 'h3', label: 'H3', icon: 'H3' },
    { action: 'ul', label: 'Bullet List', icon: '•' },
    { action: 'ol', label: 'Numbered List', icon: '1.' },
    { action: 'quote', label: 'Quote', icon: '"' },
    { action: 'code', label: 'Code Block', icon: '</>' },
    { action: 'table', label: 'Table', icon: '⊞' },
    { action: 'link', label: 'Link', icon: '🔗' },
  ];

  return (
    <div className="border-b border-gray-300 dark:border-gray-600 p-3 bg-gray-50 dark:bg-gray-800">
      <div className="flex flex-wrap gap-2">
        {/* Formatting buttons */}
        {buttons.map((button) => (
          <button
            key={button.action}
            onClick={() => onAction(button.action)}
            className={`px-3 py-1.5 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors ${button.style || ''}`}
            title={button.label}
          >
            {button.icon}
          </button>
        ))}
        
        {/* Separator */}
        <div className="w-px bg-gray-300 dark:bg-gray-600 mx-2"></div>
        
        {/* File operations */}
        <button
          onClick={onImport}
          className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          title="Import Markdown File"
        >
          📁 Import
        </button>
        <button
          onClick={onExport}
          className="px-3 py-1.5 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          title="Export as Markdown"
        >
          💾 Export
        </button>
      </div>
    </div>
  );
}
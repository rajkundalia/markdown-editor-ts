'use client';

import React, { useRef } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { downloadFile, readFileAsText } from '@/utils/fileUtils';
import Editor, { EditorRef } from './Editor';
import Preview from './Preview';
import Toolbar from './Toolbar';
import ThemeToggle from './ThemeToggle';

const DEFAULT_CONTENT = `# Welcome to Markdown Editor

This is a **powerful** markdown editor with live preview!

## Features

- ✅ Live preview
- ✅ Syntax highlighting
- ✅ File import/export
- ✅ Dark/Light theme
- ✅ Full TypeScript support

### Try it out:

1. Write some markdown
2. See the live preview
3. Use the toolbar buttons
4. Export your work!

\`\`\`typescript
// Code blocks with syntax highlighting
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

> Blockquotes look great too!

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
`;

export default function MarkdownEditor() {
  const [content, setContent] = useLocalStorage<string>('markdown-content', DEFAULT_CONTENT);
  const editorRef = useRef<EditorRef>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Handle toolbar actions
   */
  const handleToolbarAction = (action: string) => {
    const editor = editorRef.current;
    if (!editor) return;

    const selection = editor.getSelection();
    const { selectedText } = selection;

    let textToInsert = '';

    switch (action) {
      case 'undo':
        document.execCommand('undo');
        return;
      case 'redo':
        document.execCommand('redo');
        return;
      case 'bold':
        textToInsert = selectedText ? `**${selectedText}**` : '**bold text**';
        break;
      case 'italic':
        textToInsert = selectedText ? `*${selectedText}*` : '*italic text*';
        break;
      case 'h1':
        textToInsert = selectedText ? `# ${selectedText}` : '# Heading 1';
        break;
      case 'h2':
        textToInsert = selectedText ? `## ${selectedText}` : '## Heading 2';
        break;
      case 'h3':
        textToInsert = selectedText ? `### ${selectedText}` : '### Heading 3';
        break;
      case 'ul':
        textToInsert = selectedText ? `- ${selectedText}` : '- List item';
        break;
      case 'ol':
        textToInsert = selectedText ? `1. ${selectedText}` : '1. List item';
        break;
      case 'quote':
        textToInsert = selectedText ? `> ${selectedText}` : '> Quote text';
        break;
      case 'code':
        textToInsert = '```\n' + (selectedText || 'code here') + '\n```';
        break;
      case 'table':
        textToInsert = `| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |`;
        break;
      case 'link':
        textToInsert = selectedText ? `[${selectedText}](url)` : '[link text](url)';
        break;
    }

    if (textToInsert) {
      editor.insertText(textToInsert);
    }
  };

  /**
   * Handle file import
   */
  const handleImport = () => {
    fileInputRef.current?.click();
  };

  /**
   * Handle file selection
   */
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.md')) {
      alert('Please select a markdown (.md) file');
      return;
    }

    try {
      const content = await readFileAsText(file);
      setContent(content);
    } catch (error) {
      alert('Error reading file: ' + (error as Error).message);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  /**
   * Handle file export
   */
  const handleExport = () => {
    const filename = `markdown-${new Date().getTime()}.md`;
    downloadFile(content, filename);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Markdown Editor
          </h1>
          <ThemeToggle />
        </div>
      </header>

      {/* Toolbar */}
      <Toolbar 
        onAction={handleToolbarAction}
        onImport={handleImport}
        onExport={handleExport}
      />

      {/* Main editor area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor pane */}
        <div className="flex-1 border-r border-gray-300 dark:border-gray-600">
          <Editor
            ref={editorRef}
            value={content}
            onChange={setContent}
          />
        </div>

        {/* Preview pane */}
        <div className="flex-1">
          <Preview content={content} />
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".md"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface PreviewProps {
  content: string;
}

export default function Preview({ content }: PreviewProps) {
  const [theme] = useLocalStorage<'light' | 'dark'>('theme', 'light');

  return (
    <div className="h-full overflow-auto p-4 bg-white dark:bg-gray-900">
    <div className="prose max-w-none dark:prose-invert">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || '');
              if (!inline && match) {
                // Exclude 'ref' and 'style' from props to avoid type errors
                const { ref, style, ...rest } = props;
                return (
                  <SyntaxHighlighter
                    style={theme === 'dark' ? oneDark : tomorrow}
                    language={match[1]}
                    PreTag="div"
                    {...rest}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                );
              }
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            table: ({ children }) => (
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
                  {children}
                </table>
              </div>
            ),
            th: ({ children }) => (
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-100 dark:bg-gray-800">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                {children}
              </td>
            ),
          }}
        >
          {content || '*Preview will appear here...*'}
        </ReactMarkdown>
      </div>
    </div>
  );
}
# Next.js TypeScript Markdown Editor

A feature-rich markdown editor built with Next.js, TypeScript, and TailwindCSS featuring live preview, toolbar formatting, file import/export, and theme switching.

## Features

✅ **Two-pane layout** with markdown input and live preview  
✅ **Comprehensive toolbar** with formatting buttons  
✅ **Syntax highlighting** in code blocks  
✅ **File import/export** (.md files)  
✅ **Local storage persistence**  
✅ **Light/Dark theme toggle**  
✅ **Full TypeScript support**  

## Prerequisites

- Node.js 18.17.0 or higher
- npm 9.0.0 or higher

## Installation & Setup

1. **Create a new Next.js project:** [If you are learning and not cloning directly]
```bash
npx create-next-app@14.0.0 markdown-editor --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd markdown-editor
```

2. **Install required dependencies:** [If you are learning and not cloning directly]
```bash
npm install react-markdown@9.0.1 remark-gfm@4.0.0 react-syntax-highlighter@15.5.0
npm install --save-dev @types/react-syntax-highlighter@15.5.11
```

3. **Replace the default files with the provided components** [If you are learning and not cloning directly]

4. **Perform an npm install and run the development server:**
```bash
npm install
npm run dev
```

5. **Open your browser and navigate to:**
```
http://localhost:3000
```

## Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Editor.tsx
│   ├── Preview.tsx
│   ├── Toolbar.tsx
│   ├── ThemeToggle.tsx
│   └── MarkdownEditor.tsx
├── hooks/
│   └── useLocalStorage.ts
└── utils/
    └── fileUtils.ts
```

## Usage

### Toolbar Features

- **Bold/Italic**: Select text and click buttons or use with empty selection
- **Headings**: H1-H3 formatting
- **Lists**: Ordered and unordered lists
- **Blockquotes**: Quote formatting
- **Code blocks**: Fenced code blocks with syntax highlighting
- **Tables**: Markdown table skeleton
- **Links**: URL link formatting
- **Undo/Redo**: Browser native undo/redo support

### File Operations

- **Export**: Download current content as `.md` file
- **Import**: Load `.md` files from your computer
- **Auto-save**: Content automatically saved to localStorage

### Theme Toggle

- Switch between light and dark themes
- Theme preference saved to localStorage

## Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

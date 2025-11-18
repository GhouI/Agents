import React from 'react';
import {
  Globe,
  Code,
  FileText,
  Image as ImageIcon,
  Terminal,
  Loader2,
  Check,
} from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

export interface Tool {
  type: 'search' | 'code_interpreter' | 'file_search' | 'image_generation' | string;
  query?: string;
  code?: string;
  prompt?: string;
  status?: 'running' | 'complete';
  name?: string;
}

export interface ToolIndicatorProps {
  tool: Tool;
}

/**
 * Visual indicator for tool execution (search, code, file operations, image generation)
 */
export function ToolIndicator({ tool }: ToolIndicatorProps) {
  switch (tool.type) {
    case 'search':
      return (
        <div className="inline-flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-50/50 border border-blue-100 text-blue-700 text-xs font-medium font-mono hover:bg-blue-50 transition-colors cursor-default">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-full w-full bg-blue-400/30 rounded-full animate-ping opacity-20"></div>
            <Globe className="h-3.5 w-3.5 relative z-10" />
          </div>
          <span className="truncate max-w-[240px]">Searching: &quot;{tool.query}&quot;</span>
        </div>
      );

    case 'code_interpreter':
      return (
        <div className="inline-flex items-center gap-3 px-3 py-2 rounded-lg bg-amber-50/50 border border-amber-100 text-amber-700 text-xs font-medium font-mono hover:bg-amber-50 transition-colors cursor-default">
          <div className="flex items-center justify-center">
            <Code className="h-3.5 w-3.5" />
          </div>
          <div className="flex items-center gap-2">
            <span className="truncate max-w-[240px]">Code: {tool.code}</span>
            {tool.status === 'running' && (
              <Loader2 className="h-3 w-3 animate-spin opacity-70" />
            )}
            {tool.status === 'complete' && <Check className="h-3 w-3" />}
          </div>
        </div>
      );

    case 'file_search':
      return (
        <div className="inline-flex items-center gap-3 px-3 py-2 rounded-lg bg-indigo-50/50 border border-indigo-100 text-indigo-700 text-xs font-medium font-mono hover:bg-indigo-50 transition-colors cursor-default">
          <div className="flex items-center justify-center">
            <FileText className="h-3.5 w-3.5" />
          </div>
          <span className="truncate max-w-[240px]">Reading: {tool.query}</span>
        </div>
      );

    case 'image_generation':
      return (
        <div className="inline-flex items-center gap-3 px-3 py-2 rounded-lg bg-pink-50/50 border border-pink-100 text-pink-700 text-xs font-medium font-mono hover:bg-pink-50 transition-colors cursor-default">
          <div className="flex items-center justify-center">
            <ImageIcon className="h-3.5 w-3.5" />
          </div>
          <span className="truncate max-w-[240px]">Generating: &quot;{tool.prompt}&quot;</span>
          <Check className="h-3 w-3" />
        </div>
      );

    default:
      // Generic tool
      return (
        <div className="inline-flex items-center gap-3 px-3 py-2 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-600 text-xs font-medium font-mono hover:bg-zinc-100/80 transition-colors cursor-default">
          <div className="flex items-center justify-center">
            <Terminal className="h-3.5 w-3.5" />
          </div>
          <div className="flex items-center gap-2">
            <span>Running {tool.name || 'Tool'}...</span>
            {tool.status === 'complete' && (
              <span className="text-emerald-600 flex items-center gap-1">
                <Check className="h-3 w-3" />
                Done
              </span>
            )}
          </div>
        </div>
      );
  }
}

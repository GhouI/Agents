'use client';

import React, { useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';
import { ModelSelector, Provider } from './model-selector';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

export interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  providers: Provider[];
  selectedModelId: string;
  onModelSelect: (modelId: string) => void;
  placeholder?: string;
}

/**
 * Chat input area with model selector and send button
 * Handles auto-resizing textarea and keyboard shortcuts
 */
export function ChatInput({
  value,
  onChange,
  onSend,
  providers,
  selectedModelId,
  onModelSelect,
  placeholder = 'Message AgentsX...',
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="sticky bottom-0 w-full bg-gradient-to-t from-white via-white to-transparent pt-10 pb-6 px-4">
      <div className="max-w-3xl mx-auto relative z-20">
        <div className="relative flex flex-col rounded-2xl border border-zinc-200 bg-white shadow-xl shadow-zinc-200/50 ring-1 ring-black/5 transition-all focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500/50">
          <Textarea
            ref={textareaRef}
            placeholder={placeholder}
            className="min-h-[56px] max-h-[200px] w-full border-0 focus-visible:ring-0 px-4 pt-4 pb-10 text-[15px] text-zinc-800 placeholder:text-zinc-400"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {/* Input Toolbar */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
            {/* Model Selector */}
            <ModelSelector
              providers={providers}
              selectedModelId={selectedModelId}
              onModelSelect={onModelSelect}
            />

            <div className="flex items-center gap-2">
              <Button
                size="icon"
                className={cn(
                  'h-8 w-8 rounded-lg transition-all duration-200 shadow-none',
                  value.trim()
                    ? 'bg-zinc-900 text-white hover:bg-zinc-800'
                    : 'bg-zinc-100 text-zinc-300 hover:bg-zinc-100'
                )}
                onClick={onSend}
                disabled={!value.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center mt-3">
          <p className="text-[11px] text-zinc-400 font-medium">
            AgentsX can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  );
}

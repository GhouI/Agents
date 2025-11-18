import React from 'react';
import { Check } from 'lucide-react';
import { ToolIndicator, Tool } from './tool-indicator';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

export interface Message {
  id: number;
  role: 'user' | 'ai';
  content: string;
  tools?: Tool[];
}

export interface ChatMessageProps {
  message: Message;
}

/**
 * Individual chat message bubble for user and AI messages
 * Supports tool execution visualizations
 */
export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={cn(
        'flex w-full gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300',
        message.role === 'user' ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'max-w-[80%] text-[15px] leading-relaxed',
          message.role === 'user' ? '' : 'pt-1'
        )}
      >
        {message.role === 'user' ? (
          <div className="bg-zinc-100 text-zinc-900 px-5 py-3 rounded-2xl rounded-tr-sm font-medium">
            {message.content}
          </div>
        ) : (
          <div className="text-zinc-800 space-y-3 w-full">
            {/* Tool Execution Visualizations */}
            {message.tools && message.tools.length > 0 && (
              <div className="flex flex-col gap-2 mb-4">
                {message.tools.map((tool, idx) => (
                  <div
                    key={idx}
                    className="animate-in fade-in slide-in-from-left-4 duration-500"
                  >
                    <ToolIndicator tool={tool} />
                  </div>
                ))}
              </div>
            )}

            <p>{message.content}</p>

            {/* Legacy Tool Indicator (for backward compatibility) */}
            {message.content.includes('integration') && !message.tools && (
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-medium mt-2">
                <Check className="h-3 w-3" />
                <span>Verified with Integration DB</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

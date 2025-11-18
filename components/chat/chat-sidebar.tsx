import React from 'react';
import { Plus, Settings, MoreHorizontal } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface HistoryItem {
  id: number;
  title: string;
}

export interface HistoryGroup {
  label: string;
  items: HistoryItem[];
}

export interface ChatSidebarProps {
  historyGroups: HistoryGroup[];
  onNewChat?: () => void;
  onSettingsClick?: () => void;
  onHistoryItemClick?: (id: number) => void;
}

/**
 * Sidebar with chat history grouped by time periods
 * Includes new chat action and settings button
 */
export function ChatSidebar({
  historyGroups,
  onNewChat,
  onSettingsClick,
  onHistoryItemClick,
}: ChatSidebarProps) {
  return (
    <aside className="w-[280px] hidden md:flex flex-col bg-zinc-50/50 border-r border-zinc-200/60">
      {/* New Chat Action */}
      <div className="p-4 pb-2">
        <button
          onClick={onNewChat}
          className="flex w-full items-center gap-3 rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm font-medium text-zinc-700 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md active:scale-[0.98]"
        >
          <Plus className="h-4 w-4 text-zinc-500" />
          <span>New Chat</span>
          <div className="ml-auto flex items-center gap-1 text-[10px] text-zinc-400 font-mono">
            <span className="border border-zinc-200 rounded px-1">⌘</span>
            <span className="border border-zinc-200 rounded px-1">N</span>
          </div>
        </button>
      </div>

      {/* Chat History */}
      <ScrollArea className="flex-1">
        <div className="px-3 py-1 pb-8">
          {historyGroups.map((group, i) => (
            <div key={i} className="mb-6 last:mb-0">
              <div className="flex items-center px-2 mb-2">
                <h3 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                  {group.label}
                </h3>
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onHistoryItemClick?.(item.id)}
                    className="group relative flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-zinc-600 hover:bg-zinc-200/50 hover:text-zinc-900 transition-colors text-left"
                  >
                    <span className="truncate flex-1">{item.title}</span>
                    <MoreHorizontal className="h-4 w-4 opacity-0 group-hover:opacity-50 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Bottom User Menu */}
      <div className="p-3 border-t border-zinc-200 bg-white/50 backdrop-blur-sm">
        <button
          onClick={onSettingsClick}
          className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition-colors"
        >
          <Settings className="h-4 w-4 text-zinc-500" />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}

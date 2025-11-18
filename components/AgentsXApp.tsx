'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Zap, Command, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatSidebar, HistoryGroup } from './chat/chat-sidebar';
import { ChatMessage, Message } from './chat/chat-message';
import { ChatInput } from './chat/chat-input';
import { Provider } from './chat/model-selector';
import { config } from '@/lib/ai/config';

/**
 * Main AgentsX Chat Application Component
 *
 * Features:
 * - Multi-provider AI chat interface
 * - Dynamic model selection
 * - Tool execution visualization
 * - Chat history management
 * - Responsive design with sidebar
 */
export default function AgentsXApp() {
  const [messages, setMessages] = useState<Message[]>([]);

  const [inputValue, setInputValue] = useState('');
  const [selectedModelId, setSelectedModelId] = useState('claude-sonnet-4-5');

  const scrollRef = useRef<HTMLDivElement>(null);

  // Transform config data into Provider format
  const providers: Provider[] = Object.entries(config.providers).map(([key, provider]) => ({
    id: key.toLowerCase(),
    name: key,
    models: provider.models,
    icon: provider.icon,
    bg: key === 'OpenAI' ? 'bg-emerald-50' : key === 'Anthropic' ? 'bg-orange-50' : 'bg-blue-50',
    color:
      key === 'OpenAI' ? 'text-emerald-600' : key === 'Anthropic' ? 'text-orange-600' : 'text-blue-600',
  }));

  // History data
  const historyGroups: HistoryGroup[] = [];

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newMsg: Message = { id: Date.now(), role: 'user', content: inputValue };
    setMessages((prev) => [...prev, newMsg]);
    setInputValue('');
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'ai',
          content:
            "I've processed that request. The integration parameters have been updated across the active agent cluster.",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-white font-sans text-zinc-950">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-100 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
        <div className="flex h-14 items-center px-4 pl-6">
          <div className="mr-8 flex items-center space-x-2.5">
            <div className="h-7 w-7 bg-zinc-900 rounded-lg flex items-center justify-center shadow-sm">
              <Zap className="h-4 w-4 text-white fill-current" />
            </div>
            <span className="font-bold text-lg tracking-tight text-zinc-900">AgentsX</span>
          </div>
          <nav className="flex items-center space-x-1 text-sm font-medium">
            <Button variant="ghost" className="text-zinc-900 bg-zinc-100/50 h-8 px-3">
              Agents
            </Button>
            <Button variant="ghost" className="text-zinc-500 hover:text-zinc-900 h-8 px-3">
              Integrations
            </Button>
            <Button variant="ghost" className="text-zinc-500 hover:text-zinc-900 h-8 px-3">
              Documentation
            </Button>
          </nav>
          <div className="ml-auto flex items-center space-x-3">
            <div className="hidden md:flex items-center px-3 py-1.5 bg-zinc-100/50 rounded-md border border-zinc-200/50 text-xs text-zinc-500">
              <Command className="h-3 w-3 mr-2 opacity-50" />
              <span>Search...</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-medium shadow-inner ring-2 ring-white">
              JD
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <ChatSidebar historyGroups={historyGroups} />

        {/* Chat Canvas */}
        <main className="flex-1 flex flex-col min-w-0 bg-white relative z-0">
          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth" ref={scrollRef}>
            <div className="max-w-3xl mx-auto space-y-10 pb-4">
              {/* Welcome State */}
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center space-y-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500 blur-[40px] opacity-20 rounded-full" />
                    <div className="h-16 w-16 bg-white border border-zinc-100 rounded-2xl flex items-center justify-center shadow-xl relative z-10">
                      <Sparkles className="h-8 w-8 text-zinc-900" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold tracking-tight text-zinc-900">
                      How can I help you today?
                    </h3>
                    <p className="text-zinc-500 max-w-md mx-auto">
                      Access real-time data, generate content, and automate workflows with AgentsX.
                    </p>
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              <div className="h-24" /> {/* Visual Spacer */}
            </div>
          </div>

          {/* Input Area */}
          <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSend}
            providers={providers}
            selectedModelId={selectedModelId}
            onModelSelect={setSelectedModelId}
          />
        </main>
      </div>
    </div>
  );
}

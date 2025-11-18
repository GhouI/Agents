'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProviderIcon } from './provider-icon';
import { ModelButton } from './model-button';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

export interface Model {
  name: string;
  label: string;
}

export interface Provider {
  id: string;
  name: string;
  models: Model[];
  icon: string;
  color?: string;
  bg?: string;
}

export interface ModelSelectorProps {
  providers: Provider[];
  selectedModelId: string;
  onModelSelect: (modelId: string) => void;
}

/**
 * Model selector dropdown with provider navigation
 * Shows active model and allows switching between providers and models
 */
export function ModelSelector({ providers, selectedModelId, onModelSelect }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredProviderId, setHoveredProviderId] = useState<string | null>(null);

  // Find active provider and model
  const activeProvider = providers.find((p) =>
    p.models.some((m) => m.name === selectedModelId)
  );
  const activeModel = activeProvider?.models.find((m) => m.name === selectedModelId);

  const handleModelSelect = (modelId: string) => {
    onModelSelect(modelId);
    setIsOpen(false);
    setHoveredProviderId(null);
  };

  const displayedProviderId = hoveredProviderId || activeProvider?.id;
  const displayedProvider = providers.find((p) => p.id === displayedProviderId);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="h-8 gap-2 px-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {activeProvider && <ProviderIcon provider={activeProvider.name} className="h-4 w-4" />}
        <span className="text-xs font-medium">{activeModel?.label || 'Select Model'}</span>
        <ChevronDown className="h-3 w-3 opacity-50" />
      </Button>

      {/* Dropdown Implementation */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => {
              setIsOpen(false);
              setHoveredProviderId(null);
            }}
          />
          <div className="absolute bottom-full left-0 mb-2 z-40 flex animate-in fade-in zoom-in-95 duration-150 origin-bottom-left">
            {/* Left Column: Providers */}
            <div className="w-48 bg-white rounded-lg border border-zinc-200 shadow-lg py-1.5 flex flex-col z-50">
              <div className="px-3 py-1.5 mb-1 border-b border-zinc-100">
                <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                  Provider
                </span>
              </div>
              {providers.map((provider) => (
                <div
                  key={provider.id}
                  className={cn(
                    'px-2 py-1 mx-1 rounded-md flex items-center justify-between cursor-pointer transition-colors',
                    hoveredProviderId === provider.id || activeProvider?.id === provider.id
                      ? 'bg-zinc-100'
                      : 'hover:bg-zinc-50'
                  )}
                  onMouseEnter={() => setHoveredProviderId(provider.id)}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={cn('p-1 rounded border', provider.bg, 'border-transparent')}>
                      <ProviderIcon provider={provider.name} className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm text-zinc-700">{provider.name}</span>
                  </div>
                  <ChevronRight className="h-3 w-3 text-zinc-400" />
                </div>
              ))}
            </div>

            {/* Right Column: Models (Slides out) */}
            {displayedProvider && (
              <div className="w-64 bg-white rounded-lg border border-zinc-200 shadow-lg py-1.5 flex flex-col ml-2 animate-in slide-in-from-left-2 duration-200">
                <div className="px-3 py-1.5 mb-1 border-b border-zinc-100">
                  <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                    {displayedProvider.name} Models
                  </span>
                </div>
                {displayedProvider.models.map((model) => (
                  <ModelButton
                    key={model.name}
                    modelId={model.name}
                    modelName={model.label}
                    description={`${displayedProvider.name} model`}
                    isSelected={selectedModelId === model.name}
                    onClick={() => handleModelSelect(model.name)}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

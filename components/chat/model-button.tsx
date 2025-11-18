import React from 'react';
import { Check } from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

export interface ModelButtonProps {
  modelId: string;
  modelName: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

/**
 * Individual model selection button for the model selector dropdown
 */
export function ModelButton({
  modelId,
  modelName,
  description,
  isSelected,
  onClick,
}: ModelButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-3 py-2 mx-1.5 rounded-md flex flex-col items-start text-left hover:bg-zinc-50 transition-colors group',
        isSelected ? 'bg-zinc-50' : ''
      )}
    >
      <div className="flex items-center w-full justify-between">
        <span
          className={cn(
            'text-sm font-medium',
            isSelected ? 'text-zinc-900' : 'text-zinc-700'
          )}
        >
          {modelName}
        </span>
        {isSelected && <Check className="h-3 w-3 text-zinc-900" />}
      </div>
      <span className="text-[11px] text-zinc-400 group-hover:text-zinc-500">
        {description}
      </span>
    </button>
  );
}

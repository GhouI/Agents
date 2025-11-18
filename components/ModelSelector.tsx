import React from 'react';

// Helper function to create SVG icon component from URL
function svgIcon(url: string) {
  return <img className="size-4" height="16" width="16" src={url} alt="" />;
}

// Icon mapping for different AI providers
const providerToIcon: Record<string, React.ReactNode> = {
  auto: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
    </svg>
  ),
  openai: svgIcon('/icons/openai.svg'),
  anthropic: svgIcon('/icons/claude.svg'),
  google: svgIcon('/icons/gemini.svg'),
  xai: (
    <svg width="16" height="16" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M571.41 512l222.72-386.09h-102.04L512 408.49 331.91 125.91H229.87L452.59 512 229.87 898.09h102.04L512 615.51l180.09 282.58h102.04L571.41 512z" fill="currentColor"/>
    </svg>
  ),
};

interface ModelSelectorProps {
  provider?: string;
  onChange?: (provider: string) => void;
}

export function ModelSelector({ provider = 'auto', onChange }: ModelSelectorProps) {
  const handleProviderChange = (newProvider: string) => {
    if (onChange) {
      onChange(newProvider);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="model-selector" className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Model:
      </label>
      <div className="flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 p-2">
        {Object.entries(providerToIcon).map(([key, icon]) => (
          <button
            key={key}
            onClick={() => handleProviderChange(key)}
            className={`flex items-center justify-center p-2 rounded transition-colors ${
              provider === key
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            title={key}
          >
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
}

// Export the helper function and icon mapping for reuse
export { svgIcon, providerToIcon };

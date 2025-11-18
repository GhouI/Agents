import React from 'react';
import Image from 'next/image';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

export interface ProviderIconProps {
  provider: string;
  className?: string;
  size?: number;
}

/**
 * Dynamically loads provider icons from public/icons/
 * Maps provider names to their icon files
 */
export function ProviderIcon({ provider, className, size = 16 }: ProviderIconProps) {
  // Map provider names to icon filenames
  const iconMap: Record<string, string> = {
    OpenAI: 'openai.svg',
    Anthropic: 'claude.svg',
    Google: 'gemini.svg',
    // Add more providers as needed
  };

  const iconFile = iconMap[provider];

  if (!iconFile) {
    // Fallback for unknown providers
    return (
      <div className={cn('rounded bg-zinc-200', className)} style={{ width: size, height: size }} />
    );
  }

  return (
    <Image
      src={`/icons/${iconFile}`}
      alt={`${provider} icon`}
      width={size}
      height={size}
      className={className}
    />
  );
}

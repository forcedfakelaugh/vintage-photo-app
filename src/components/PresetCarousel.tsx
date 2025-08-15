'use client';

import { Preset } from '@/types';

interface PresetCarouselProps {
  presets: Preset[];
  selectedPreset: Preset | null;
  onPresetSelect: (preset: Preset) => void;
}

export function PresetCarousel({ presets, selectedPreset, onPresetSelect }: PresetCarouselProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
        Choose a Filter
      </h3>
      
      <div className="flex gap-3 overflow-x-auto pb-4 px-2">
        {presets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onPresetSelect(preset)}
            className={`
              flex-shrink-0 bg-white dark:bg-gray-800 rounded-xl p-3 border-2 transition-all min-h-[44px]
              ${selectedPreset?.id === preset.id 
                ? 'border-amber-500 shadow-lg' 
                : 'border-gray-200 dark:border-gray-600 hover:border-amber-300'
              }
            `}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-lg mb-2 flex items-center justify-center">
              <span className="text-xs text-gray-600 dark:text-gray-300">
                {preset.name.split(' ').map(word => word[0]).join('')}
              </span>
            </div>
            
            <p className="text-xs font-medium text-gray-800 dark:text-white text-center leading-tight">
              {preset.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
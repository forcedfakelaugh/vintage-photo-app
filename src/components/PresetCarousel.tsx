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
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 px-2">
        {presets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onPresetSelect(preset)}
            className={`
              px-2 py-1 rounded-full text-xs font-medium transition-all text-center
              ${selectedPreset?.id === preset.id 
                ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-300' 
                : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200'
              }
            `}
          >
            {preset.name}
          </button>
        ))}
      </div>
    </div>
  );
}
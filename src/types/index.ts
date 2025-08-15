export interface FilterSettings {
  brightness: number;
  contrast: number;
  saturation: number;
  sepia: number;
  vignette: number;
  grain: number;
  temperature: number;
  tint: number;
  // Advanced film emulation
  curves?: {
    rgb: number[]; // RGB master curve points
    red: number[]; // Red channel curve  
    green: number[]; // Green channel curve
    blue: number[]; // Blue channel curve
  };
  colorGrading?: {
    shadows: { r: number; g: number; b: number };
    midtones: { r: number; g: number; b: number };
    highlights: { r: number; g: number; b: number };
  };
  channelMixer?: {
    red: { r: number; g: number; b: number };
    green: { r: number; g: number; b: number };
    blue: { r: number; g: number; b: number };
  };
}

export interface Preset {
  id: string;
  name: string;
  thumbnail: string;
  filters: FilterSettings;
}

export interface ProcessedImage {
  original: string;
  processed: string;
  canvas?: HTMLCanvasElement;
}
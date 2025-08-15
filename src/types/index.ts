export interface FilterSettings {
  brightness: number;
  contrast: number;
  saturation: number;
  sepia: number;
  vignette: number;
  grain: number;
  temperature: number;
  tint: number;
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
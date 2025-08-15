import { FilterSettings } from '@/types';

// Apply curve transformation using interpolation
function applyCurve(value: number, curve: number[]): number {
  if (!curve || curve.length === 0) return value;
  
  const normalizedValue = Math.max(0, Math.min(1, value / 255));
  const index = normalizedValue * (curve.length - 1);
  const lowerIndex = Math.floor(index);
  const upperIndex = Math.min(lowerIndex + 1, curve.length - 1);
  const factor = index - lowerIndex;
  
  const lowerValue = curve[lowerIndex];
  const upperValue = curve[upperIndex];
  
  return Math.max(0, Math.min(255, (lowerValue + (upperValue - lowerValue) * factor) * 255));
}

// Apply color grading to shadows, midtones, highlights
function applyColorGrading(r: number, g: number, b: number, colorGrading: any): [number, number, number] {
  if (!colorGrading) return [r, g, b];
  
  // Calculate luminance to determine shadow/midtone/highlight regions
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  const normalizedLum = luminance / 255;
  
  // Weight functions for shadows, midtones, highlights
  const shadowWeight = Math.max(0, Math.min(1, (1 - normalizedLum) * 2));
  const highlightWeight = Math.max(0, Math.min(1, (normalizedLum - 0.5) * 2));
  const midtoneWeight = 1 - shadowWeight - highlightWeight;
  
  // Apply color grading
  const shadowR = r * (1 + colorGrading.shadows.r * shadowWeight);
  const shadowG = g * (1 + colorGrading.shadows.g * shadowWeight);
  const shadowB = b * (1 + colorGrading.shadows.b * shadowWeight);
  
  const midtoneR = shadowR * (1 + colorGrading.midtones.r * midtoneWeight);
  const midtoneG = shadowG * (1 + colorGrading.midtones.g * midtoneWeight);
  const midtoneB = shadowB * (1 + colorGrading.midtones.b * midtoneWeight);
  
  const finalR = midtoneR * (1 + colorGrading.highlights.r * highlightWeight);
  const finalG = midtoneG * (1 + colorGrading.highlights.g * highlightWeight);
  const finalB = midtoneB * (1 + colorGrading.highlights.b * highlightWeight);
  
  return [finalR, finalG, finalB];
}

// Apply channel mixer
function applyChannelMixer(r: number, g: number, b: number, channelMixer: any): [number, number, number] {
  if (!channelMixer) return [r, g, b];
  
  const newR = r * channelMixer.red.r + g * channelMixer.red.g + b * channelMixer.red.b;
  const newG = r * channelMixer.green.r + g * channelMixer.green.g + b * channelMixer.green.b;
  const newB = r * channelMixer.blue.r + g * channelMixer.blue.g + b * channelMixer.blue.b;
  
  return [newR, newG, newB];
}

export function processPixelAdvanced(
  r: number, 
  g: number, 
  b: number, 
  filters: FilterSettings
): [number, number, number] {
  // Apply basic brightness first
  r *= filters.brightness;
  g *= filters.brightness;
  b *= filters.brightness;
  
  // Apply RGB curves
  if (filters.curves?.rgb) {
    r = applyCurve(r, filters.curves.rgb);
    g = applyCurve(g, filters.curves.rgb);
    b = applyCurve(b, filters.curves.rgb);
  }
  
  // Apply individual channel curves
  if (filters.curves?.red) r = applyCurve(r, filters.curves.red);
  if (filters.curves?.green) g = applyCurve(g, filters.curves.green);
  if (filters.curves?.blue) b = applyCurve(b, filters.curves.blue);
  
  // Apply color grading
  if (filters.colorGrading) {
    [r, g, b] = applyColorGrading(r, g, b, filters.colorGrading);
  }
  
  // Apply channel mixer
  if (filters.channelMixer) {
    [r, g, b] = applyChannelMixer(r, g, b, filters.channelMixer);
  }
  
  // Apply saturation
  if (filters.saturation !== 1) {
    const gray = 0.299 * r + 0.587 * g + 0.114 * b;
    r = r * filters.saturation + gray * (1 - filters.saturation);
    g = g * filters.saturation + gray * (1 - filters.saturation);
    b = b * filters.saturation + gray * (1 - filters.saturation);
  }
  
  // Apply sepia
  if (filters.sepia > 0) {
    const sepiaR = (r * 0.393) + (g * 0.769) + (b * 0.189);
    const sepiaG = (r * 0.349) + (g * 0.686) + (b * 0.168);
    const sepiaB = (r * 0.272) + (g * 0.534) + (b * 0.131);
    
    r = r * (1 - filters.sepia) + sepiaR * filters.sepia;
    g = g * (1 - filters.sepia) + sepiaG * filters.sepia;
    b = b * (1 - filters.sepia) + sepiaB * filters.sepia;
  }
  
  return [
    Math.min(255, Math.max(0, r)),
    Math.min(255, Math.max(0, g)),
    Math.min(255, Math.max(0, b))
  ];
}
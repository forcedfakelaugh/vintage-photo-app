'use client';

import { useState, useRef, useEffect } from 'react';
import { ImageUpload } from '@/components/ImageUpload';
import { PresetCarousel } from '@/components/PresetCarousel';
import { ImagePreview } from '@/components/ImagePreview';
import { ProcessedImage, Preset } from '@/types';
import { processPixelAdvanced } from '@/lib/filmEmulation';
import presets from '@/data/presets.json';

export default function Home() {
  const [image, setImage] = useState<ProcessedImage | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<Preset | null>(null);
  const [showBefore, setShowBefore] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load sample image on mount
  useEffect(() => {
    const loadSampleImage = async () => {
      try {
        const response = await fetch('/sample.jpg');
        const blob = await response.blob();
        const reader = new FileReader();
        
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setImage({
            original: result,
            processed: result
          });
        };
        
        reader.readAsDataURL(blob);
      } catch (error) {
        console.log('Sample image not loaded:', error);
      }
    };

    loadSampleImage();
  }, []);

  const handleImageUpload = (imageData: string) => {
    setImage({
      original: imageData,
      processed: imageData
    });
    setSelectedPreset(null);
  };

  const handlePresetSelect = (preset: Preset) => {
    if (selectedPreset?.id === preset.id) {
      // Deselect and reset to original
      setSelectedPreset(null);
      if (image) {
        resetToOriginal();
      }
    } else {
      // Select new preset
      setSelectedPreset(preset);
      if (image) {
        applyPreset(preset);
      }
    }
  };

  const resetToOriginal = () => {
    if (!image) return;
    setImage(prev => prev ? {
      ...prev,
      processed: prev.original,
      canvas: undefined
    } : null);
  };

  const applyPreset = async (preset: Preset) => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // Only resize canvas if dimensions changed
      if (canvas.width !== img.width || canvas.height !== img.height) {
        canvas.width = img.width;
        canvas.height = img.height;
      }
      
      // Clear and draw with smooth rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Process pixels with advanced film emulation
      const length = data.length;
      for (let i = 0; i < length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Apply advanced film processing
        const [newR, newG, newB] = processPixelAdvanced(r, g, b, preset.filters);
        
        // Apply grain
        let finalR = newR;
        let finalG = newG;
        let finalB = newB;
        
        if (preset.filters.grain > 0) {
          const grainAmount = preset.filters.grain * 80;
          const grain = (Math.random() - 0.5) * grainAmount;
          finalR += grain;
          finalG += grain;
          finalB += grain;
        }
        
        // Clamp values efficiently
        data[i] = Math.min(255, Math.max(0, finalR));
        data[i + 1] = Math.min(255, Math.max(0, finalG));
        data[i + 2] = Math.min(255, Math.max(0, finalB));
      }
      
      ctx.putImageData(imageData, 0, 0);
      
      // Generate output with requestAnimationFrame for smooth UI
      requestAnimationFrame(() => {
        const processedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
        setImage(prev => prev ? {
          ...prev,
          processed: processedDataUrl,
          canvas
        } : null);
      });
    };
    
    img.src = image.original;
  };

  const handleDownload = () => {
    if (!image?.canvas) return;
    
    const link = document.createElement('a');
    link.download = 'vintage-photo.jpg';
    link.href = image.canvas.toDataURL('image/jpeg', 0.9);
    link.click();
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Vintage Photo
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Transform your photos with vintage filters
          </p>
        </header>

        <div className="max-w-2xl mx-auto">
          {!image ? (
            <div className="text-center mb-8">
              <div className="animate-pulse text-gray-500 dark:text-gray-400 mb-4">
                Loading sample image...
              </div>
            </div>
          ) : (
            <>
              <ImagePreview 
                image={image}
                showBefore={false}
                onDownload={handleDownload}
                hasProcessedImage={!!selectedPreset}
              />
              
              <PresetCarousel 
                presets={presets as Preset[]}
                selectedPreset={selectedPreset}
                onPresetSelect={handlePresetSelect}
              />
              
              <div className="mt-6 text-center">
                <ImageUpload onImageUpload={handleImageUpload} compact={true} />
              </div>
            </>
          )}
        </div>
        
        <canvas 
          ref={canvasRef} 
          className="hidden" 
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
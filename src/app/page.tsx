'use client';

import { useState, useRef } from 'react';
import { ImageUpload } from '@/components/ImageUpload';
import { PresetCarousel } from '@/components/PresetCarousel';
import { ImagePreview } from '@/components/ImagePreview';
import { ActionButtons } from '@/components/ActionButtons';
import { ProcessedImage, Preset } from '@/types';
import presets from '@/data/presets.json';

export default function Home() {
  const [image, setImage] = useState<ProcessedImage | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<Preset | null>(null);
  const [showBefore, setShowBefore] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (imageData: string) => {
    setImage({
      original: imageData,
      processed: imageData
    });
    setSelectedPreset(null);
  };

  const handlePresetSelect = (preset: Preset) => {
    setSelectedPreset(preset);
    if (image) {
      applyPreset(preset);
    }
  };

  const applyPreset = async (preset: Preset) => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];
        
        r *= preset.filters.brightness;
        g *= preset.filters.brightness;
        b *= preset.filters.brightness;
        
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        r = r * preset.filters.saturation + gray * (1 - preset.filters.saturation);
        g = g * preset.filters.saturation + gray * (1 - preset.filters.saturation);
        b = b * preset.filters.saturation + gray * (1 - preset.filters.saturation);
        
        const sepiaR = (r * 0.393) + (g * 0.769) + (b * 0.189);
        const sepiaG = (r * 0.349) + (g * 0.686) + (b * 0.168);
        const sepiaB = (r * 0.272) + (g * 0.534) + (b * 0.131);
        
        r = r * (1 - preset.filters.sepia) + sepiaR * preset.filters.sepia;
        g = g * (1 - preset.filters.sepia) + sepiaG * preset.filters.sepia;
        b = b * (1 - preset.filters.sepia) + sepiaB * preset.filters.sepia;
        
        data[i] = Math.min(255, Math.max(0, r));
        data[i + 1] = Math.min(255, Math.max(0, g));
        data[i + 2] = Math.min(255, Math.max(0, b));
      }
      
      ctx.putImageData(imageData, 0, 0);
      
      const processedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setImage(prev => prev ? {
        ...prev,
        processed: processedDataUrl,
        canvas
      } : null);
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

  const handleShare = async () => {
    if (!image?.canvas) return;
    
    if (navigator.share) {
      try {
        image.canvas.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], 'vintage-photo.jpg', { type: 'image/jpeg' });
            await navigator.share({
              files: [file],
              title: 'Vintage Photo',
              text: 'Check out this vintage photo!'
            });
          }
        }, 'image/jpeg', 0.9);
      } catch (error) {
        console.log('Share failed:', error);
        handleDownload();
      }
    } else {
      handleDownload();
    }
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
            <ImageUpload onImageUpload={handleImageUpload} />
          ) : (
            <>
              <ImagePreview 
                image={image}
                showBefore={showBefore}
              />
              
              <PresetCarousel 
                presets={presets as Preset[]}
                selectedPreset={selectedPreset}
                onPresetSelect={handlePresetSelect}
              />
              
              <ActionButtons 
                onToggleBeforeAfter={() => setShowBefore(!showBefore)}
                onDownload={handleDownload}
                onShare={handleShare}
                showBefore={showBefore}
                hasProcessedImage={!!image.canvas}
              />
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
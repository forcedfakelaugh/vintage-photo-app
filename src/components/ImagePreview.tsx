'use client';

import { ProcessedImage } from '@/types';
import Image from 'next/image';

interface ImagePreviewProps {
  image: ProcessedImage;
  showBefore?: boolean;
}

export function ImagePreview({ image, showBefore = false }: ImagePreviewProps) {
  const displayImage = showBefore ? image.original : image.processed;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 mb-6">
      <div className="relative aspect-square max-h-[60vh] mx-auto overflow-hidden rounded-lg">
        <Image
          src={displayImage}
          alt="Photo preview"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 512px"
        />
      </div>
      
      {showBefore && (
        <div className="text-center mt-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Original
          </span>
        </div>
      )}
    </div>
  );
}
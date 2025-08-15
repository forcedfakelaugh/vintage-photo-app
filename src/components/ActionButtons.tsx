'use client';

import { Download } from 'lucide-react';

interface ActionButtonsProps {
  onDownload: () => void;
  hasProcessedImage: boolean;
}

export function ActionButtons({ 
  onDownload, 
  hasProcessedImage 
}: ActionButtonsProps) {
  return (
    <button
      onClick={onDownload}
      disabled={!hasProcessedImage}
      className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 disabled:bg-gray-300/60 disabled:cursor-not-allowed text-white p-2 rounded-full transition-colors z-10"
      title="Download image"
    >
      <Download size={18} />
    </button>
  );
}
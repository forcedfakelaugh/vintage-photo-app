'use client';

import { Download, Share } from 'lucide-react';

interface ActionButtonsProps {
  onDownload: () => void;
  onShare: () => void;
  hasProcessedImage: boolean;
}

export function ActionButtons({ 
  onDownload, 
  onShare, 
  hasProcessedImage 
}: ActionButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <button
        onClick={onDownload}
        disabled={!hasProcessedImage}
        className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-full font-medium transition-colors flex items-center justify-center gap-2 min-h-[44px] w-full sm:w-auto"
      >
        <Download size={20} />
        Download
      </button>
      
      <button
        onClick={onShare}
        disabled={!hasProcessedImage}
        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-full font-medium transition-colors flex items-center justify-center gap-2 min-h-[44px] w-full sm:w-auto"
      >
        <Share size={20} />
        Share
      </button>
    </div>
  );
}
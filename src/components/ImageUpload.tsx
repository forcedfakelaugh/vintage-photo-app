'use client';

import { useRef, useState } from 'react';
import { Camera, Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (imageData: string) => void;
  compact?: boolean;
}

export function ImageUpload({ onImageUpload, compact = false }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageUpload(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      setStream(mediaStream);
      setIsCapturing(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please try uploading a file instead.');
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !stream) return;

    const canvas = document.createElement('canvas');
    const video = videoRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg', 0.9);
      onImageUpload(imageData);
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCapturing(false);
  };

  if (isCapturing) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full rounded-lg"
          />
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={capturePhoto}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-colors"
              title="Capture photo"
            >
              <Camera size={20} />
            </button>
            <button
              onClick={stopCamera}
              className="bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-full transition-colors"
              title="Cancel"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 p-2 rounded-lg transition-colors"
          title="Upload photo"
        >
          <Upload size={18} />
        </button>
        
        <button
          onClick={startCamera}
          className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 p-2 rounded-lg transition-colors"
          title="Take photo"
        >
          <Camera size={18} />
        </button>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
          <ImageIcon size={40} className="text-white" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Upload Your Photo
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Choose a photo to apply vintage filters
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-3 rounded-full font-medium transition-all flex items-center justify-center gap-2 min-h-[44px] w-full sm:w-auto"
          >
            <Upload size={20} />
            Upload File
          </button>
          
          <button
            onClick={startCamera}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium transition-colors flex items-center justify-center gap-2 min-h-[44px] w-full sm:w-auto"
          >
            <Camera size={20} />
            Take Photo
          </button>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        
        <p className="text-sm text-gray-500 mt-4">
          Supports JPG, PNG, and other image formats
        </p>
      </div>
    </div>
  );
}
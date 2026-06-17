'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [crossfade, setCrossfade] = useState(false);

  const handleThumbnailClick = (index: number) => {
    setCrossfade(true);
    setTimeout(() => {
      setSelectedIndex(index);
      setCrossfade(false);
    }, 150);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    const newIndex =
      direction === 'prev'
        ? selectedIndex === 0
          ? images.length - 1
          : selectedIndex - 1
        : selectedIndex === images.length - 1
          ? 0
          : selectedIndex + 1;
    setSelectedIndex(newIndex);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      switch (e.key) {
        case 'ArrowLeft':
          navigateLightbox('prev');
          break;
        case 'ArrowRight':
          navigateLightbox('next');
          break;
        case 'Escape':
          setLightboxOpen(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, selectedIndex, images.length]);

  if (images.length === 0) {
    return (
      <div className="aspect-video bg-brand-surface rounded-lg flex items-center justify-center">
        <p className="text-brand-mid-grey">No images available</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div className="relative aspect-video rounded-lg overflow-hidden bg-brand-surface cursor-pointer group shadow-md">
          <Image
            src={images[selectedIndex]}
            alt={`${alt} - Image ${selectedIndex + 1}`}
            fill
            className={cn(
              'object-cover transition-opacity duration-300',
              crossfade ? 'opacity-50' : 'opacity-100'
            )}
            sizes="(max-width: 640px) 100vw, 60vw"
            priority
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          <button
            onClick={() => setLightboxOpen(true)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-brand-dark opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-gold hover:text-white shadow-md"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
        </div>

        {images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={cn(
                  'relative flex-shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded overflow-hidden border-2 transition-all',
                  selectedIndex === index
                    ? 'border-brand-gold opacity-100'
                    : 'border-brand-border opacity-60 hover:opacity-100'
                )}
              >
                <Image
                  src={image}
                  alt={`${alt} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-screen w-screen h-screen bg-brand-dark border-none flex items-center justify-center p-0">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white z-50 hover:bg-brand-gold transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={() => navigateLightbox('prev')}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-gold transition-colors z-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => navigateLightbox('next')}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-gold transition-colors z-50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="relative w-full h-full max-w-[90vw] max-h-[90vh] overflow-hidden">
            <Image
              src={images[selectedIndex]}
              alt={`${alt} - Full screen`}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/20 text-sm text-white backdrop-blur-sm">
            {selectedIndex + 1} / {images.length}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

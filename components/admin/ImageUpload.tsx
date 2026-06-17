'use client';

import { useRef, useState } from 'react';
import { Plus, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export default function ImageUpload({ images, onChange, maxImages = 5 }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const { url } = await response.json();
    return url;
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const remainingSlots = maxImages - images.length;
    const filesToProcess = files.slice(0, remainingSlots);

    setUploading(true);
    const newImages: string[] = [];

    try {
      for (const file of filesToProcess) {
        // Revalidate file type
        if (!file.type.startsWith('image/')) continue;

        // Revalidate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
          alert(`${file.name} is too large. Max size is 5MB.`);
          continue;
        }

        try {
          const url = await uploadImage(file);
          newImages.push(url);
        } catch (err) {
          console.error('Failed to upload:', file.name, err);
          // Fallback to data URL for demo
          const reader = new FileReader();
          await new Promise<void>((resolve) => {
            reader.onload = (event) => {
              const dataUrl = event.target?.result as string;
              if (dataUrl) {
                newImages.push(dataUrl);
              }
              resolve();
            };
            reader.readAsDataURL(file);
          });
        }
      }

      onChange([...images, ...newImages]);
    } finally {
      setUploading(false);
    }

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleRemove = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newImages = [...images];
    const draggedImage = newImages[draggedIndex];
    newImages.splice(draggedIndex, 1);
    newImages.splice(index, 0, draggedImage);
    onChange(newImages);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        {/* Existing images */}
        {images.map((image, index) => (
          <div
            key={index}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={cn(
              'relative w-24 h-24 rounded-lg overflow-hidden border-2 transition-all cursor-move group',
              index === 0
                ? 'border-brand-gold shadow-sm'
                : 'border-brand-border hover:border-brand-gold/50',
              draggedIndex === index && 'opacity-50 scale-95'
            )}
          >
            <img
              src={image}
              alt={`Upload ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {index === 0 && (
              <div className="absolute bottom-0 left-0 right-0 bg-brand-gold/90 text-white text-[10px] py-0.5 text-center font-medium">
                Cover
              </div>
            )}
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        {/* Add image boxes */}
        {images.length < maxImages && (
          <label
            className={cn(
              'w-24 h-24 rounded-lg border-2 border-dashed transition-colors flex flex-col items-center justify-center cursor-pointer',
              uploading
                ? 'border-brand-gold bg-brand-gold/5'
                : 'border-brand-border hover:border-brand-gold/50 bg-brand-surface hover:bg-brand-surface/80'
            )}
          >
            {uploading ? (
              <Loader2 className="w-6 h-6 text-brand-gold animate-spin" />
            ) : (
              <>
                <Plus className="w-6 h-6 text-brand-mid-grey" />
                <span className="text-[10px] text-brand-mid-grey mt-1">Add Photo</span>
              </>
            )}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              disabled={uploading}
            />
          </label>
        )}
      </div>

      <p className="text-xs text-brand-mid-grey">
        Click or drag to upload. First image is the cover photo. Max {maxImages} images, 5MB each.
        {images.length === 0 && <span className="text-red-500 block mt-1">At least 1 image required.</span>}
      </p>
    </div>
  );
}

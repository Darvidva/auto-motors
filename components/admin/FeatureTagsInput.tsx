'use client';

import { useState, useRef } from 'react';
import { X, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface FeatureTagsInputProps {
  features: string[];
  onChange: (features: string[]) => void;
  placeholder?: string;
}

export default function FeatureTagsInput({
  features,
  onChange,
  placeholder = 'Type a feature and press Enter',
}: FeatureTagsInputProps) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addFeature();
    }
  };

  const addFeature = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !features.includes(trimmed)) {
      onChange([...features, trimmed]);
      setInputValue('');
    }
  };

  const removeFeature = (featureToRemove: string) => {
    onChange(features.filter((f) => f !== featureToRemove));
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 mb-2">
        {features.map((feature, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="bg-brand-gold/10 text-brand-gold border border-brand-gold/20 px-3 py-1.5 text-sm font-normal hover:bg-brand-gold/20 transition-colors"
          >
            {feature}
            <button
              type="button"
              onClick={() => removeFeature(feature)}
              className="ml-2 hover:text-red-500 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addFeature}
          placeholder={placeholder}
          className="bg-white border-brand-border text-brand-dark placeholder:text-brand-mid-grey"
        />
        <button
          type="button"
          onClick={addFeature}
          className="px-3 py-2 bg-brand-surface border border-brand-border rounded-md hover:border-brand-gold hover:text-brand-gold transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-brand-mid-grey">
        Type a feature and press Enter or click + to add.
      </p>
    </div>
  );
}

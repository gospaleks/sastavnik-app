import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { XIcon } from 'lucide-react';

type TagInputProps = {
  value: string[];
  onChange: (newTags: string[]) => void;
};

export default function TagInput({ value, onChange }: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  // Dodavanje tagova
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (inputValue.trim()) {
        const newTags = [...value, inputValue.trim()];
        onChange(newTags);
        setInputValue('');
      }
    }
  };

  // Uklanjanje tagova
  const handleDeleteTag = (tagToDelete: string) => {
    const newTags = value.filter((tag) => tag !== tagToDelete);
    onChange(newTags);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Input za dodavanje tagova */}
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Dodajte tagove (Enter za dodavanje)"
      />

      {/* Prikaz tagova */}
      <div className="flex flex-wrap items-center gap-2">
        {value.map((tag, index) => (
          <Badge
            key={index}
            className="cursor-pointer"
            onClick={() => handleDeleteTag(tag)}
          >
            <span>{tag}</span>
            <XIcon />
          </Badge>
        ))}
      </div>
    </div>
  );
}

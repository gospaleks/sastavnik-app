'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useQueryState } from 'nuqs';

const Filters = () => {
  const [search, setSearch] = useQueryState('search', {
    defaultValue: '',
  });
  const [schoolType, setSchoolType] = useQueryState('schoolType', {
    defaultValue: '',
  });

  return (
    <div className="flex gap-2">
      <div>
        <Input
          placeholder="Pretraži..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Select value={schoolType} onValueChange={(e) => setSchoolType(e)}>
        <SelectTrigger>
          <SelectValue placeholder="Osnovna/Srednja" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="OSNOVNA">Osnovna</SelectItem>
          <SelectItem value="SREDNJA">Srednja</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filters;

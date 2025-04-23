'use client';

import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type DataObj = {
  id: string;
  description: string;
};

type Props<S> = {
  label: string;
  placeholder: string;
  nameInSchema: keyof S & string;
  data: DataObj[];
  showMessage?: boolean;
  disabled?: boolean;
  className?: string;
};

export function SelectWithLabel<S>({
  label,
  placeholder,
  nameInSchema,
  data,
  showMessage = false,
  disabled = false,
  className,
}: Props<S>) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={nameInSchema}>{label}</FormLabel>

          <Select
            {...field}
            onValueChange={field.onChange}
            defaultValue={field.value?.toString()}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger
                id={nameInSchema}
                className={`w-full ${className}`}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {data.map((item) => (
                <SelectItem key={`${nameInSchema}_${item.id}`} value={item.id}>
                  {item.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {showMessage && <FormMessage />}
        </FormItem>
      )}
    />
  );
}

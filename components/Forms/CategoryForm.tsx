'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categoryFormSchema, CategoryFormSchemaType } from '@/lib/schemas';

import { createCategory } from '@/actions/category/createCategory';
import { updateCategory } from '@/actions/category/updateCategory';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { EditIcon, LoaderCircleIcon, PlusIcon } from 'lucide-react';
import { Category } from '@prisma/client';

type Props = {
  category?: Category;
  setIsOpen?: (open: boolean) => void;
};

export function CategoryForm({ category, setIsOpen }: Props) {
  const form = useForm<CategoryFormSchemaType>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: category?.name || '',
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: CategoryFormSchemaType) {
    const response = category
      ? await updateCategory(category.id, values)
      : await createCategory(values);

    if (!response.success) {
      toast.error(response.message, {
        description: 'Pokušajte ponovo kasnije',
      });
    } else {
      toast.success(response.message);

      if (setIsOpen) {
        setIsOpen(false);
      }

      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Naziv kategorije</FormLabel>
              <FormControl>
                <Input placeholder="Unesi naziv..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <LoaderCircleIcon className="animate-spin" />
          ) : (
            <>
              {category ? (
                <>
                  <EditIcon /> Izmeni
                </>
              ) : (
                <>
                  <PlusIcon />
                  Dodaj
                </>
              )}
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}

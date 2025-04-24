'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categoryFormSchema, CategoryFormSchemaType } from '@/lib/schemas';

import createCategory from '@/actions/createCategory';

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
import { LoaderCircleIcon, PlusIcon } from 'lucide-react';

export function CategoryForm() {
  const form = useForm<CategoryFormSchemaType>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: '',
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: CategoryFormSchemaType) {
    const response = await createCategory(values);

    if (!response.success) {
      toast.error(response.message, {
        description: 'Pokušajte ponovo kasnije',
      });
    } else {
      toast.success(response.message);
      form.reset();
    }
  }

  return (
    <div className="w-full rounded-lg border p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Dodaj novu kategoriju</h2>

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
                <PlusIcon />
                Dodaj
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

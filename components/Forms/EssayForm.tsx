'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { essayFormSchema, EssayFormSchemaType } from '@/lib/schemas';
import { Category } from '@prisma/client';
import { useForm } from 'react-hook-form';

import AlertCard from '@/components/AlertCard';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  GraduationCap,
  LoaderCircleIcon,
  PlusIcon,
  School,
} from 'lucide-react';
import TagInput from '../TagInput';
import createEssay from '@/actions/createEssay';
import { toast } from 'sonner';

type Props = {
  categories: Category[];
};

export function EssayForm({ categories }: Props) {
  const router = useRouter();

  const form = useForm<EssayFormSchemaType>({
    resolver: zodResolver(essayFormSchema),
    defaultValues: {
      title: '',
      content: '',
      tags: [],
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: EssayFormSchemaType) {
    const response = await createEssay(values);

    if (!response.success) {
      toast.error(response.message, {
        description: 'Pokušajte ponovo kasnije',
      });
    } else {
      toast.success(response.message);
      form.reset();
      router.push(`/sastavi/${response.essayId}`); // Presumeri ga na stranicu sastava
      router;
    }
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col space-y-4 rounded-lg border p-2 sm:p-8">
      <h1 className="text-2xl font-bold">Dodaj novi sastav</h1>

      <AlertCard
        title="NAPOMENA:"
        description="Sastavi nisu namenjeni prepisivanju. Ovi tekstovi su primeri i služe
        učenju i shvatanju kako sastav ili pismeni rad treba biti napisan."
        variant="destructive"
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Tema */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tema *</FormLabel>
                <FormControl>
                  <Input placeholder="Unesite temu sastava" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Kategorija */}
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategorija *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Izaberite kategoriju" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* Osnovna/srednja skola */}
          <FormField
            control={form.control}
            name="schoolType"
            render={({ field }) => {
              const selected = field.value;
              return (
                <FormItem>
                  <FormLabel>Tip škole *</FormLabel>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => field.onChange('OSNOVNA')}
                      className={cn(
                        'flex flex-1 items-center justify-center space-x-4 rounded-xl border p-4 transition hover:border-gray-400',
                        selected === 'OSNOVNA'
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700',
                      )}
                    >
                      <School className="h-6 w-6" />
                      <span>Osnovna škola</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => field.onChange('SREDNJA')}
                      className={cn(
                        'flex flex-1 items-center justify-center space-x-4 rounded-xl border p-4 transition hover:border-gray-400',
                        selected === 'SREDNJA'
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700',
                      )}
                    >
                      <GraduationCap className="h-6 w-6" />
                      <span>Srednja škola</span>
                    </button>
                  </div>
                </FormItem>
              );
            }}
          />

          {/* Razred */}
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => {
              const schoolType = form.watch('schoolType');
              const gradeOptions =
                schoolType === 'SREDNJA'
                  ? [1, 2, 3, 4]
                  : schoolType === 'OSNOVNA'
                    ? [1, 2, 3, 4, 5, 6, 7, 8]
                    : [];

              return (
                <FormItem>
                  <FormLabel>Razred *</FormLabel>
                  <Select
                    onValueChange={(val) => field.onChange(Number(val))}
                    defaultValue={field.value?.toString()}
                    disabled={!schoolType}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Izaberite razred" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {gradeOptions.map((grade) => (
                        <SelectItem key={grade} value={grade.toString()}>
                          {grade}. razred
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              );
            }}
          />

          {/* Tagovi */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tagovi</FormLabel>
                <FormControl>
                  <TagInput value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Content sastava */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sastav *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Unesite sadržaj sastava"
                    {...field}
                    rows={10}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <LoaderCircleIcon className="animate-spin" />
                Dodavanje...
              </>
            ) : (
              <>
                <PlusIcon />
                Dodaj sastav
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

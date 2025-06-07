'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Category, Essay } from '@prisma/client';
import { essayFormSchema, EssayFormSchemaType } from '@/lib/schemas';
import { cn } from '@/lib/utils';

import updateEssay from '@/actions/updateEssay';
import createEssay from '@/actions/createEssay';

import { MinimalTiptapEditor } from '@/components/minimal-tiptap';
import { Editor } from '@tiptap/react';

import TagInput from './TagInput';
import { SelectWithLabel } from '@/components/SelectWithLabel';
import AlertCard from '@/components/AlertCard';

import { Button, buttonVariants } from '@/components/ui/button';
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  ArrowLeftIcon,
  EditIcon,
  LoaderCircleIcon,
  PlusIcon,
} from 'lucide-react';

type Props = {
  categories: Category[];
  essay?: Essay;
  isLoggedIn?: boolean;
};

export function EssayForm({ categories, essay, isLoggedIn }: Props) {
  const router = useRouter();

  const editorRef = useRef<Editor | null>(null);

  const form = useForm<EssayFormSchemaType>({
    resolver: zodResolver(essayFormSchema),
    defaultValues: essay
      ? {
          title: essay.title,
          content: essay.content,
          tags: essay.tags,
          level: essay.level,
          schoolType: essay.schoolType,
          categoryId: essay.categoryId,
        }
      : {
          title: '',
          content: '',
          tags: [],
        },
  });

  const isSubmitting = form.formState.isSubmitting;

  // TODO: PROMENA RUTE NE HVATA OVO (DAKLE NADJI NACIN DA SE OVO RESI) (+ NAPRAVI CUSTOM HOOK)
  // Kada se refresh-uje, ugasi tab ili gasi browser prikazi alert neki
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Proveri da li je forma izmenjena
      if (form.formState.isDirty) {
        e.preventDefault();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [form.formState.isDirty]);

  const handleCreate = useCallback(
    ({ editor }: { editor: Editor }) => {
      if (form.getValues('content') && editor.isEmpty) {
        editor.commands.setContent(form.getValues('content'));
      }
      editorRef.current = editor;
    },
    [form],
  );

  async function onSubmit(values: EssayFormSchemaType) {
    // Proveri da li je korisnik uopste nesto promenio
    const isSame = Object.entries(values).every(([key, value]) => {
      if (key === 'tags') {
        return JSON.stringify(value) === JSON.stringify(essay?.tags);
      }
      return value === essay?.[key as keyof Essay];
    });

    if (isSame) {
      toast.error('Nema promena', {
        description: 'Niste napravili nikakve izmene',
      });
      return;
    }

    const response = essay
      ? await updateEssay(essay.id, values)
      : await createEssay(values);

    if (!response.success) {
      toast.error(response.message, {
        description: 'Pokušajte ponovo kasnije',
      });
      router.replace('/');
    } else {
      toast.success(response.message);
      form.reset();

      if (isLoggedIn) {
        router.push(`/sastavi/${response.essayId}`); // Presumeri ga na stranicu sastava
      } else {
        router.push('/'); // Presumeri ga na stranicu sa svim sastavima
      }

      router;
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg p-0 sm:border sm:p-8 sm:shadow-sm">
      {essay && (
        <div>
          <Link
            href={`/sastavi/${essay.id}`}
            className={buttonVariants({ variant: 'link', size: 'sm' })}
          >
            <ArrowLeftIcon size={17} />
            Vrati se na stranicu sastava
          </Link>
        </div>
      )}

      <h1 className="text-2xl font-bold">
        {essay ? (
          <div className="flex items-center gap-2">
            <EditIcon className="inline-block" /> Izmena sastava
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <PlusIcon className="inline-block" /> Dodavanje sastava
            </div>
            {!isLoggedIn && (
              <p className="text-destructive text-sm font-normal">
                Sastav će biti objavljen nakon odobrenja administratora.
              </p>
            )}
          </>
        )}
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col items-start gap-4 md:flex-row md:gap-8">
            <div className="w-full flex-1/3 space-y-4">
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
              <SelectWithLabel<EssayFormSchemaType>
                label="Kategorija *"
                placeholder="Izaberite kategoriju"
                nameInSchema="categoryId"
                data={categories.map((category) => ({
                  id: category.id,
                  description: category.name,
                }))}
              />

              {/* Tip škole */}
              <SelectWithLabel<EssayFormSchemaType>
                label="Tip škole *"
                placeholder="Izaberite tip škole"
                nameInSchema="schoolType"
                data={[
                  { id: 'OSNOVNA', description: 'Osnovna škola' },
                  { id: 'SREDNJA', description: 'Srednja škola' },
                ]}
              />

              {/* Razred (TODO: treba da se proba i ovo da se zameni sa SelectWithLabel reusable komponentom) */}
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
                    <FormItem className="w-full">
                      <FormLabel>Razred *</FormLabel>
                      <Select
                        onValueChange={(val) => field.onChange(Number(val))}
                        defaultValue={field.value?.toString()}
                        disabled={!schoolType}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
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
                    <FormDescription>
                      Na primer: 'prijatelj', 'škola', 'porodica', 'priroda',
                      'putovanje'...
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex-2/3 space-y-4">
              {/* Sadrzaj sastava (Rich Text Editor - TipTap and shadcnui od https://github.com/Aslam97/shadcn-minimal-tiptap/tree/tailwind-v4) */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sastav *</FormLabel>
                    <FormControl className="w-full overflow-auto">
                      <MinimalTiptapEditor
                        {...field}
                        throttleDelay={0}
                        className={cn('w-full', {
                          'border-destructive focus-within:border-destructive':
                            form.formState.errors.content,
                        })}
                        output="html"
                        placeholder="Započnite pisanje..."
                        onCreate={handleCreate}
                        editable={true}
                        editorClassName="focus:outline-hidden p-5 min-h-[200px]"
                        immediatelyRender={false}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size={'lg'}
                className="w-full text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircleIcon className="animate-spin" />
                    {essay ? 'Čuvanje izmena...' : 'Dodavanje...'}
                  </>
                ) : (
                  <>
                    {essay ? (
                      <>
                        <EditIcon className="h-4 w-4" />
                        Izmeni sastav
                      </>
                    ) : (
                      <>
                        <PlusIcon className="h-4 w-4" />
                        Dodaj sastav
                      </>
                    )}
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>

        <AlertCard
          title="NAPOMENA:"
          description="Sastavi nisu namenjeni prepisivanju. Ovi tekstovi su primeri i služe
        učenju i shvatanju kako sastav ili pismeni rad treba biti napisan."
          variant="destructive"
          className="mt-4"
        />
      </Form>
    </div>
  );
}

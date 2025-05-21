'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { CommentWithAuthor } from '@/lib/types';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';

type Props = {
  essayId: string;
  parentId?: string;
  comment?: CommentWithAuthor;
  onSubmitHandle?: () => void;
};

const formSchema = z.object({
  content: z.string().min(3, 'Komentar mora imati makar 3 karaktera'),
});

type FormSchemaType = z.infer<typeof formSchema>;

const CommentForm = ({ essayId, parentId, comment, onSubmitHandle }: Props) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: comment?.content || '',
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: FormSchemaType) {
    console.log(values);
    toast.loading('Slanje komentara...');

    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.dismiss();
    toast.success('Uspešno ste poslali komentar!');
  }

  const charCount = form.watch('content')?.length || 0;

  return (
    <Card className="shadow-none">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <CardContent>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormMessage />
                  <FormControl>
                    <div className="relative">
                      <Textarea
                        placeholder="Napiši komentar..."
                        {...field}
                        disabled={isSubmitting}
                        maxLength={100}
                        onChange={(e) => {
                          if (e.target.value.length <= 100) {
                            field.onChange(e);
                          }
                        }}
                        className="bg-background resize-none"
                      />
                      <div className="text-muted-foreground absolute right-3 bottom-2 text-xs">
                        {charCount}/100
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isSubmitting} size={'sm'}>
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Slanje...
                </>
              ) : (
                <>
                  <Send />
                  Pošalji
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default CommentForm;

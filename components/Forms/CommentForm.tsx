'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { CommentWithAuthor } from '@/lib/types';
import { commentFormSchema, CommentFormSchemaType } from '@/lib/schemas';

import { editComment } from '@/actions/comment/editComment';
import { createComment } from '@/actions/comment/createComment';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2, Send } from 'lucide-react';

type Props = {
  essayId: string;
  parentId?: string;
  comment?: CommentWithAuthor;
  onSubmitHandle?: () => void;
  onCancelHandle?: () => void;
  autoFocus?: boolean;
};

const CommentForm = ({
  essayId,
  parentId,
  comment,
  onSubmitHandle,
  onCancelHandle,
  autoFocus = false,
}: Props) => {
  const form = useForm<CommentFormSchemaType>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      content: comment?.content || '',
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: CommentFormSchemaType) {
    const response = comment
      ? await editComment(comment.id, values.content)
      : await createComment(essayId, values.content, parentId);

    if (response.success) {
      toast.success(response.message);
      onSubmitHandle?.();
      form.reset();
    } else {
      toast.error(response.message);
    }
  }

  const maxCharacters = 300;
  const charCount = form.watch('content')?.length || 0;

  return (
    <div className="shadow-none">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <div>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormMessage />
                  <FormControl>
                    <div className="relative">
                      <Textarea
                        placeholder={
                          parentId
                            ? 'Napiši odgovor na komentar...'
                            : 'Napiši komentar...'
                        }
                        {...field}
                        autoFocus={autoFocus}
                        disabled={isSubmitting}
                        maxLength={maxCharacters}
                        onChange={(e) => {
                          if (e.target.value.length <= maxCharacters) {
                            field.onChange(e);
                          }
                        }}
                        className="bg-background"
                      />
                      <div className="text-muted-foreground absolute right-3 bottom-2 text-xs">
                        {charCount}/{maxCharacters}
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end gap-2">
            {/* Otkazi dugme ako je forma otvorena za odgovaranje na komentar */}
            {parentId && (
              <Button
                disabled={isSubmitting}
                variant="outline"
                size={'sm'}
                className="w-1/4 md:w-fit"
                tabIndex={-1}
                onClick={onCancelHandle}
              >
                Otkaži
              </Button>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              size={'sm'}
              className={`${comment ? 'w-full md:w-fit' : 'w-1/2 md:w-fit'}`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Slanje...
                </>
              ) : (
                <>
                  <Send />
                  {parentId ? 'Odgovori' : comment ? 'Izmeni' : 'Pošalji'}
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CommentForm;

'use client';

import Link from 'next/link';
import { useState } from 'react';

import deleteEssay from '@/actions/deleteEssay';
import tooglePublishEssay from '@/actions/publishEssay';
import { CommentWithAuthor, EssayWithCategory } from '@/lib/types';

import YesNoAlert from '@/components/YesNoAlert';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  EditIcon,
  EllipsisVerticalIcon,
  EyeOffIcon,
  Trash2Icon,
  UploadIcon,
} from 'lucide-react';
import { deleteComment } from '@/actions/comments';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import CommentForm from '@/components/Forms/CommentForm';

type Props = {
  essayId: string;
  comment: CommentWithAuthor;
};

const CommentDropdown = ({ essayId, comment }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger className="hover:bg-muted cursor-pointer rounded-md p-1 transition-colors">
          <EllipsisVerticalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              setIsDropdownOpen(false);
              setIsEditOpen(true);
            }}
          >
            <EditIcon />
            Izmeni
          </DropdownMenuItem>

          <DropdownMenuItem
            variant="destructive"
            onClick={() => {
              setIsDropdownOpen(false);
              setIsDeleteOpen(true);
            }}
          >
            <Trash2Icon />
            Obriši
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/** Delete Alert Dialog */}
      <YesNoAlert
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        variant="destructive"
        title="Brisanje komentara"
        description="Da li ste sigurni da želite da obrišete komentar? Ova akcija se ne može poništiti."
        action={() => deleteComment(comment.id)}
      />

      {/** Edit Alert Dialog */}
      <ResponsiveDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        title="Izmena komentara"
        children={
          <CommentForm
            essayId={essayId}
            comment={comment}
            onSubmitHandle={() => {
              setIsEditOpen(false);
            }}
          />
        }
      />
    </>
  );
};

export default CommentDropdown;

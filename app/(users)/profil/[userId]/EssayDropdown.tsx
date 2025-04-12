'use client';

import { useState } from 'react';

import YesNoAlert from '@/components/YesNoAlert';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EditIcon, EllipsisVerticalIcon, Trash2Icon } from 'lucide-react';
import deleteEssay from '@/actions/deleteEssay';
import { ResponsiveDialog } from '@/components/responsive-dialog';

type Props = {
  essayId: string;
};

const EssayDropdown = ({ essayId }: Props) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="hover:bg-accent cursor-pointer rounded-full p-2 transition-colors">
          <EllipsisVerticalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <EditIcon />
            Izmeni
          </DropdownMenuItem>

          <DropdownMenuItem
            variant="destructive"
            onClick={() => setIsDeleteOpen(true)}
          >
            <Trash2Icon />
            Obriši
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* <ResponsiveDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title="Obriši sastav"
        description="Da li ste sigurni da želite da obrišete ovaj sastav? Ova akcija se ne može poništiti."
        children={<h1>proba...</h1>}
      /> */}

      {/** Ovo kad se zatvori jebe nesto ostane kao overlay neki i nista se ne moz klikne nzm sta da mu radim! */}
      <YesNoAlert
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title="Obriši sastav"
        description="Da li ste sigurni da želite da obrišete ovaj sastav? Ova akcija se ne može poništiti."
        action={() => deleteEssay(essayId)}
      />
    </>
  );
};

export default EssayDropdown;

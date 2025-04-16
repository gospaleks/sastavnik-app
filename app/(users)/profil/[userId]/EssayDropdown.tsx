'use client';

import Link from 'next/link';
import { useState } from 'react';

import deleteEssay from '@/actions/deleteEssay';

import YesNoAlert from '@/components/YesNoAlert';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EditIcon, EllipsisVerticalIcon, Trash2Icon } from 'lucide-react';

type Props = {
  essayId: string;
  essayTitle: string;
};

const EssayDropdown = ({ essayId, essayTitle }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger className="hover:bg-accent cursor-pointer rounded-full p-2 transition-colors">
          <EllipsisVerticalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link
              href={`/sastavi/${essayId}/izmena`}
              className="cursor-pointer"
            >
              <EditIcon />
              Izmeni
            </Link>
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

      <YesNoAlert
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title="⚠️Brisanje sastava"
        description={`
          Da li ste sigurni da želite da obrišete sastav "${essayTitle}"? Ova akcija je nepovratna.
          `}
        action={() => deleteEssay(essayId)}
      />
    </>
  );
};

export default EssayDropdown;

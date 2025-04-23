'use client';

import { useState } from 'react';

import deleteEssay from '@/actions/deleteEssay';

import YesNoAlert from '@/components/YesNoAlert';
import { Button, buttonVariants } from '@/components/ui/button';
import { EditIcon, Trash2Icon } from 'lucide-react';
import Link from 'next/link';

type Props = {
  essayId: string;
};

const EssayActionButtons = ({ essayId }: Props) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={'destructive'}
        className="hover:bg-red-700"
        onClick={() => setIsDeleteOpen(true)}
      >
        <Trash2Icon />
        Obriši
      </Button>
      <Link
        href={`/sastavi/${essayId}/izmena`}
        className={buttonVariants({
          variant: 'outline',
        })}
      >
        <EditIcon />
        Izmeni
      </Link>

      <YesNoAlert
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title="Brisanje sastava"
        description="Da li ste sigurni da želite da obrišete ovaj sastav? Ova akcija se ne može poništiti."
        action={() => deleteEssay(essayId)}
        redirectUrl="/sastavi"
        variant="destructive"
      />
    </div>
  );
};

export default EssayActionButtons;

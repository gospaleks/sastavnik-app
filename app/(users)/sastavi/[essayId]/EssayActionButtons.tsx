'use client';

import { useState } from 'react';

import deleteEssay from '@/actions/deleteEssay';

import YesNoAlert from '@/components/YesNoAlert';
import { Button, buttonVariants } from '@/components/ui/button';
import { EditIcon, Trash2Icon, UploadIcon } from 'lucide-react';
import Link from 'next/link';
import publishEssay from '@/actions/publishEssay';
import { EssayWithAuthorCategory } from '@/lib/types';

type Props = {
  essay: EssayWithAuthorCategory;
  isAdmin?: boolean;
};

const EssayActionButtons = ({ essay, isAdmin }: Props) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPublishAlertOpen, setIsPublishAlertOpen] = useState(false);

  console.log('isAdmin', isAdmin);

  return (
    <div className="flex flex-wrap gap-2 rounded-md border p-2">
      <Button
        variant={'destructive'}
        className="hover:bg-red-700"
        onClick={() => setIsDeleteOpen(true)}
      >
        <Trash2Icon />
        Obriši
      </Button>

      <Link
        href={`/sastavi/${essay.id}/izmena`}
        className={buttonVariants({
          variant: 'outline',
        })}
      >
        <EditIcon />
        Izmeni
      </Link>

      {isAdmin && !essay.published && (
        <Button variant={'outline'} onClick={() => setIsPublishAlertOpen(true)}>
          <UploadIcon />
          Objavi
        </Button>
      )}

      <YesNoAlert
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title="Brisanje sastava"
        description="Da li ste sigurni da želite da obrišete ovaj sastav? Ova akcija se ne može poništiti."
        action={() => deleteEssay(essay.id)}
        redirectUrl="/sastavi"
        variant="destructive"
      />

      <YesNoAlert
        isOpen={isPublishAlertOpen}
        setIsOpen={setIsPublishAlertOpen}
        title="NAPOMENA:"
        description="Da li ste sigurni da želite da objavite ovaj sastav? Sastav će biti vidljiv svim korisnicima."
        action={() => publishEssay(essay.id)}
      />
    </div>
  );
};

export default EssayActionButtons;

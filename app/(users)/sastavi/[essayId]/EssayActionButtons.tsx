'use client';

import Link from 'next/link';
import { useState } from 'react';

import { EssayWithAuthorCategory } from '@/lib/types';

import deleteEssay from '@/actions/deleteEssay';
import tooglePublishEssay from '@/actions/publishEssay';

import YesNoAlert from '@/components/YesNoAlert';
import { Button, buttonVariants } from '@/components/ui/button';
import { EditIcon, EyeOffIcon, Trash2Icon, UploadIcon } from 'lucide-react';

type Props = {
  essay: EssayWithAuthorCategory;
  isAdmin?: boolean;
};

const EssayActionButtons = ({ essay, isAdmin }: Props) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPublishAlertOpen, setIsPublishAlertOpen] = useState(false);
  const [isHideOpen, setIsHideOpen] = useState(false);

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

      {isAdmin && essay.published && (
        <Button variant={'outline'} onClick={() => setIsHideOpen(true)}>
          <EyeOffIcon />
          Sakrij
        </Button>
      )}

      {/** Delete Alert Dialog */}
      <YesNoAlert
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title="Brisanje sastava"
        description="Da li ste sigurni da želite da obrišete ovaj sastav? Ova akcija se ne može poništiti."
        action={() => deleteEssay(essay.id)}
        redirectUrl="/sastavi"
        variant="destructive"
      />

      {/** Publish Alert Dialog */}
      <YesNoAlert
        isOpen={isPublishAlertOpen}
        setIsOpen={setIsPublishAlertOpen}
        title="NAPOMENA:"
        description="Da li ste sigurni da želite da objavite ovaj sastav? Sastav će biti vidljiv svim korisnicima."
        action={() => tooglePublishEssay(essay.id)}
      />

      {/** Hide Alert Dialog */}

      <YesNoAlert
        isOpen={isHideOpen}
        setIsOpen={setIsHideOpen}
        title="NAPOMENA:"
        description="Da li ste sigurni da želite da sakrijete ovaj sastav? Sastav više neće biti vidljiv svim korisnicima."
        action={() => tooglePublishEssay(essay.id, false)}
      />
    </div>
  );
};

export default EssayActionButtons;

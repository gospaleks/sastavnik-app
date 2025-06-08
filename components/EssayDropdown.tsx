'use client';

import Link from 'next/link';
import { useState } from 'react';

import deleteEssay from '@/actions/essay/deleteEssay';
import tooglePublishEssay from '@/actions/essay/publishEssay';
import { EssayWithCategory } from '@/lib/types';

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

type Props = {
  essay: EssayWithCategory;
  isAdmin?: boolean;
};

const EssayDropdown = ({ essay, isAdmin }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPublishAlertOpen, setIsPublishAlertOpen] = useState(false);
  const [isHideOpen, setIsHideOpen] = useState(false);

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger className="hover:bg-muted cursor-pointer rounded-md p-1 transition-colors">
          <EllipsisVerticalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link
              href={`/sastavi/${essay.id}/izmena`}
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

          {isAdmin && !essay.published && (
            <DropdownMenuItem
              onClick={() => {
                setIsDropdownOpen(false);
                setIsPublishAlertOpen(true);
              }}
            >
              <UploadIcon />
              Objavi
            </DropdownMenuItem>
          )}

          {isAdmin && essay.published && (
            <DropdownMenuItem
              onClick={() => {
                setIsDropdownOpen(false);
                setIsHideOpen(true);
              }}
            >
              <EyeOffIcon />
              Sakrij
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/** Delete Alert Dialog */}
      <YesNoAlert
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title="Brisanje sastava"
        description={`Da li ste sigurni da želite da obrišete sastav "${essay.title}"? Ova akcija je nepovratna.`}
        action={() => deleteEssay(essay.id)}
        variant="destructive"
      />

      {/** Publish Alert Dialog */}
      <YesNoAlert
        isOpen={isPublishAlertOpen}
        setIsOpen={setIsPublishAlertOpen}
        title="NAPOMENA:"
        description={`Da li ste sigurni da želite da objavite sastav "${essay.title}"? Sastav će biti vidljiv svim korisnicima.`}
        action={() => tooglePublishEssay(essay.id)}
      />

      {/** Hide Alert Dialog */}
      <YesNoAlert
        isOpen={isHideOpen}
        setIsOpen={setIsHideOpen}
        title="NAPOMENA:"
        description={`Da li ste sigurni da želite da sakrijete sastav "${essay.title}"? Sastav više neće biti vidljiv svim korisnicima.`}
        action={() => tooglePublishEssay(essay.id, false)}
      />
    </>
  );
};

export default EssayDropdown;

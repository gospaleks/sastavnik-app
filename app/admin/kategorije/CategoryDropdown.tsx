'use client';

import { useState } from 'react';

import { Category } from '@prisma/client';

import YesNoAlert from '@/components/YesNoAlert';
import { ResponsiveDialog } from '@/components/responsive-dialog';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EditIcon, EllipsisVerticalIcon, Trash2Icon } from 'lucide-react';
import deleteCategory from '@/actions/deleteCategory';
import { CategoryForm } from '@/components/Forms/CategoryForm';

type Props = {
  category: Category;
};

const CategoryDropdown = ({ category }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger className="hover:bg-accent cursor-pointer rounded-full p-2 transition-colors">
          <EllipsisVerticalIcon size={17} />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              setIsDropdownOpen(false);
              setIsEditOpen(true);
            }}
          >
            <EditIcon /> Izmeni
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

      {/** Delete dialog */}
      <YesNoAlert
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title={`Brisanje kategorije: ${category.name}`}
        description={`
          Da li ste sigurni da želite da obrišete kategoriju "${category.name}"? Ova akcija se ne može poništiti. Svi sastavi u ovoj kategoriji će biti obrisani.`}
        action={() => deleteCategory(category.id)}
        variant="destructive"
      />

      {/** Edit dialog */}
      <ResponsiveDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        title={`Izmena kategorije: ${category.name}`}
        children={
          <div className="mx-4 md:mx-0">
            <CategoryForm category={category} setIsOpen={setIsEditOpen} />
          </div>
        }
      />
    </>
  );
};

export default CategoryDropdown;

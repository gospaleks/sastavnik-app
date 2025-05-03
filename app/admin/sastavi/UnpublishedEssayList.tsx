'use client';

import { useRouter } from 'next/navigation';
import { EssayWithAuthorCategory } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FolderOpenIcon, StarIcon, UserIcon, UploadIcon } from 'lucide-react';
import YesNoAlert from '@/components/YesNoAlert';
import { useState } from 'react';
import publishEssay from '@/actions/publishEssay';

type Props = {
  essays: EssayWithAuthorCategory[];
};

const columns: {
  key: keyof EssayWithAuthorCategory;
  label: string;
  icon?: React.ReactNode;
  className?: string;
  render?: (essay: EssayWithAuthorCategory) => React.ReactNode;
}[] = [
  {
    key: 'title',
    label: 'Naslov',
    className: 'w-[200px] font-medium',
  },
  {
    key: 'author',
    label: 'Autor',
    icon: <UserIcon className="mr-2 inline-block h-4 w-4" />,
    render: (essay) => essay.author.firstName + ' ' + essay.author.lastName,
  },
  {
    key: 'category',
    label: 'Kategorija',
    icon: <FolderOpenIcon className="mr-2 inline-block h-4 w-4" />,
    render: (essay) => essay.category.name,
  },
  {
    key: 'averageRating',
    label: 'Prosečna ocena',
    icon: <StarIcon className="mr-2 inline-block h-4 w-4" />,
  },
];

const UnpublishedEssayList = ({ essays }: Props) => {
  const router = useRouter();
  const [isPublishAlertOpen, setIsPublishAlertOpen] = useState(false);
  const [selectedEssay, setSelectedEssay] =
    useState<EssayWithAuthorCategory | null>(null);

  return (
    <>
      <Table className="border">
        <TableCaption>
          {essays.length === 0 ? (
            <p className="text-muted-foreground text-center text-sm">
              Nema neobjavljenih sastava
            </p>
          ) : (
            <p className="text-muted-foreground text-center text-sm">
              Lista neobjavljenih sastava
            </p>
          )}
        </TableCaption>
        <TableHeader className="bg-accent text-gray-500">
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key} className={column.className}>
                {column.icon}
                {column.label}
              </TableHead>
            ))}
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {essays.map((essay) => (
            <TableRow
              key={essay.id}
              onClick={() => router.push(`/sastavi/${essay.id}`)}
              className="hover:bg-muted cursor-pointer transition-colors"
            >
              {columns.map((column) => (
                <TableCell key={column.key} className={column.className}>
                  {column.render
                    ? column.render(essay)
                    : (essay as any)[column.key]}
                </TableCell>
              ))}
              <TableCell
                className="text-right"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPublishAlertOpen(true);
                  setSelectedEssay(essay);
                }}
              >
                <Button size="sm" variant="outline">
                  <UploadIcon className="mr-1 h-4 w-4" />
                  Objavi
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <YesNoAlert
        isOpen={isPublishAlertOpen}
        setIsOpen={setIsPublishAlertOpen}
        title="NAPOMENA:"
        description={`Da li ste sigurni da želite da objavite sastav "${selectedEssay?.title}"? Sastav će biti vidljiv svim korisnicima.`}
        action={() => publishEssay(selectedEssay?.id as string)}
      />
    </>
  );
};

export default UnpublishedEssayList;

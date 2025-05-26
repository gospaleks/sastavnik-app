'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { UserWithNumberOfEssays } from '@/lib/types';
import { deleteUser } from '@/actions/users';

import YesNoAlert from '@/components/YesNoAlert';
import MyAvatar from '@/components/MyAvatar';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
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
import { MailIcon, InfoIcon, FileTextIcon, TrashIcon } from 'lucide-react';

type Props = {
  users: UserWithNumberOfEssays[];
};

const columns: {
  key: keyof UserWithNumberOfEssays;
  label: string;
  icon?: React.ReactNode;
  className?: string;
  render?: (user: UserWithNumberOfEssays) => React.ReactNode;
}[] = [
  {
    key: 'image',
    label: 'Profilna',
    className: 'w-[120px]',
    render: (user) => (
      <MyAvatar
        imageUrl={user.image}
        fallbackText={
          (user.firstName ? user.firstName[0] : '') +
          (user.lastName ? user.lastName[0] : '')
        }
        className="ml-2 h-8 w-8 rounded-full"
      />
    ),
  },
  {
    key: 'firstName',
    label: 'Ime',
  },
  {
    key: 'lastName',
    label: 'Prezime',
  },
  {
    key: 'email',
    label: 'Email',
    icon: <MailIcon className="mr-2 inline-block h-4 w-4" />,
  },
  {
    key: '_count',
    label: 'Broj sastava',
    icon: <FileTextIcon className="mr-2 inline-block h-4 w-4" />,
    render: (user) => user._count.essays,
  },
];

const UnpublishedEssayList = ({ users }: Props) => {
  const router = useRouter();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] =
    useState<UserWithNumberOfEssays | null>(null);

  return (
    <>
      <Table className="border">
        <TableCaption>
          {users.length === 0 ? (
            <p className="text-muted-foreground text-center text-sm">
              Nema korisnika
            </p>
          ) : (
            <p className="text-muted-foreground text-center text-sm">
              Lista korisnika
            </p>
          )}
        </TableCaption>
        <TableHeader className="bg-muted">
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
          {users.map((user) => (
            <TableRow
              key={user.id}
              onClick={() => router.push(`/profil/${user.id}`)}
              className="hover:bg-muted cursor-pointer transition-colors"
            >
              {columns.map((column) => (
                <TableCell key={column.key} className={column.className}>
                  {column.render
                    ? column.render(user)
                    : (user as any)[column.key]}
                </TableCell>
              ))}
              <TableCell className="flex items-center justify-end gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <InfoIcon className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="text-sm">
                    {user.bio ? user.bio : 'Korisnik trenutno nema biografiju'}
                  </PopoverContent>
                </Popover>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setUserToDelete(user);
                    setIsDeleteOpen(true);
                  }}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/** Delete alert dialog */}
      <YesNoAlert
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title={`Brisanje korisnika: ${userToDelete?.email}`}
        description="Da li ste sigurni da želite da obrišete ovog korisnika? Svi njegovi sastavi, komentari i ocene će biti obrisani."
        variant="destructive"
        action={() => deleteUser(userToDelete!.id)}
      />
    </>
  );
};

export default UnpublishedEssayList;

'use client';

import { useRouter } from 'next/navigation';

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
import { MailIcon, InfoIcon, FileTextIcon, UserIcon } from 'lucide-react';
import { UserWithNumberOfEssays } from '@/lib/types';

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
      <img
        src={user.image || '/default_avatar.png'}
        alt="Profilna slika"
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
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <InfoIcon className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end">
                    {user.bio ? user.bio : 'Korisnik trenutno nema biografiju'}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default UnpublishedEssayList;

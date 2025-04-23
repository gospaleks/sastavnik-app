'use client';

import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AlertOctagonIcon, TriangleAlert } from 'lucide-react';
import { toast } from 'sonner';

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
  action: () => Promise<{
    message: string;
  }>;
  variant?: 'default' | 'destructive' | 'warning';
  redirectUrl?: string;
};

const YesNoAlert = ({
  isOpen,
  setIsOpen,
  title,
  description,
  action,
  variant = 'default',
  redirectUrl,
}: Props) => {
  const router = useRouter();

  const handleAction = async () => {
    toast.promise(
      action().then((res) => {
        setIsOpen(false);
        if (redirectUrl) {
          // Transakcija da bi se izbego error da se revalidira stranica kad se obrise iz server-akcije a jos replace nije pozvan
          startTransition(() => {
            router.replace(redirectUrl);
          });
        }
        return res;
      }),
      {
        loading: 'Obrada...',
        success: (message) => message.message,
        error: (error) => {
          return error.message || 'Došlo je do greške. Pokušajte ponovo.';
        },
      },
    );
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-2 flex items-center justify-center gap-2 sm:justify-start">
            {variant === 'destructive' ? (
              <AlertOctagonIcon className="text-red-600" />
            ) : variant === 'warning' ? (
              <TriangleAlert className="text-yellow-500" />
            ) : null}

            {title}
          </AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            Otkaži
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleAction}
            className={
              variant === 'destructive'
                ? 'bg-red-600 hover:bg-red-700'
                : variant === 'warning'
                  ? 'bg-yellow-500 hover:bg-yellow-600'
                  : ''
            }
          >
            Potvrdi
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default YesNoAlert;

'use client';

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
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
  action: () => Promise<{
    message: string;
  }>;
  redirectUrl?: string;
};

const YesNoAlert = ({
  isOpen,
  setIsOpen,
  title,
  description,
  action,
  redirectUrl = '/',
}: Props) => {
  const router = useRouter();

  const handleAction = async () => {
    toast.promise(
      action().then((res) => {
        setIsOpen(false); // <- zatvaranje dijaloga nakon uspeha
        router.replace(redirectUrl);
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
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            Otkaži
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleAction}>Potvrdi</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default YesNoAlert;

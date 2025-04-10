'use client';

import Image from 'next/image';

import AlertCard from '@/components/AlertCard';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error('[APP ERROR]', error); // Detalji samo u konzoli

  return (
    <div className="flex h-screen flex-col items-center justify-center px-4 text-center">
      <Image
        src="/logo_navbar.png" // zameniti ako koristiš neki drugi logo path
        alt="Logo"
        width={150}
        height={80}
        className="mb-6"
      />

      <AlertCard
        variant="destructive"
        className="max-w-md text-left"
        title="Greška"
        description="Nažalost, došlo je do greške prilikom učitavanja stranice. Pokušajte ponovo kasnije."
      />

      <Button onClick={reset} className="mt-6">
        Pokušaj ponovo
      </Button>
    </div>
  );
}

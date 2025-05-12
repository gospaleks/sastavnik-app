'use client';

import Image from 'next/image';

import AlertCard from '@/components/AlertCard';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import Link from 'next/link';
import { HomeIcon } from 'lucide-react';

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
      <Logo width={180} height={50} className="mb-4" />

      <AlertCard
        variant="destructive"
        className="max-w-md text-left"
        title="Greška"
        description="Nažalost, došlo je do greške prilikom učitavanja stranice. Pokušajte ponovo kasnije."
      />

      <div className="mt-6 flex items-center gap-2">
        <Button onClick={reset}>Pokušaj ponovo</Button>

        <Button asChild variant="outline">
          <Link href="/">
            <HomeIcon /> Početna
          </Link>
        </Button>
      </div>
    </div>
  );
}

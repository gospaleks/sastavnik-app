'use client';

import { buttonVariants } from '@/components/ui/button';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { ArrowRight, PenLine, PlusCircleIcon } from 'lucide-react';
import Link from 'next/link';

const SubmitYourEssayCTA = () => {
  const { isAuthenticated: isLoggedIn } = useKindeBrowserClient();

  return (
    <section className="mx-auto my-8 flex max-w-xl flex-col items-center justify-center gap-8 px-4 py-12 text-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-full">
          <PenLine className="h-10 w-10" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Imaš svoj sastav?
        </h2>
      </div>

      <p className="text-md text-muted-foreground md:text-lg">
        Podeli svoj sastav sa drugima i inspiriši ih!
        <br /> Prijavi se i dodaj svoj sastav u našu bazu ili ga podeli
        anonimno.
      </p>

      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        {!isLoggedIn && (
          <Link
            className={buttonVariants({
              variant: 'outline',
              size: 'lg',
            })}
            href="/api/auth/register"
          >
            Registruj se besplatno
            <ArrowRight className="h-5 w-5" />
          </Link>
        )}

        <Link
          className={buttonVariants({
            variant: 'default',
            size: 'lg',
          })}
          href="/dodaj-sastav"
        >
          <PlusCircleIcon className="h-5 w-5" />
          Dodaj sastav
        </Link>
      </div>
    </section>
  );
};

export default SubmitYourEssayCTA;

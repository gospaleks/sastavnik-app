import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PenLine, PlusCircleIcon } from 'lucide-react';
import Link from 'next/link';

const SubmitYourEssayCTA = () => {
  return (
    <section className="mx-auto my-8 flex max-w-xl flex-col items-center justify-center gap-8 px-4 py-12 text-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <PenLine className="h-10 w-10" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">
          Imaš svoj sastav?
        </h2>
      </div>

      <p className="text-md text-gray-600 md:text-lg">
        Podeli svoj sastav sa drugima i inspiriši ih!
        <br /> Prijavi se i dodaj svoj sastav u našu bazu ili ga podeli
        anonimno.
      </p>

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
    </section>
  );
};

export default SubmitYourEssayCTA;

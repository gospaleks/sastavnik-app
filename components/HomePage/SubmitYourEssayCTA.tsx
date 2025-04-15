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
        <h2 className="text-4xl font-bold text-gray-800">Imaš svoj sastav?</h2>
      </div>

      <p className="text-lg text-gray-600">
        Podeli svoj sastav sa drugima i inspiriši ih! Prijavi se i dodaj svoj
        sastav u našu bazu.
      </p>

      <Link
        className={buttonVariants({
          variant: 'default',
          size: 'lg',
          className:
            'flex items-center gap-2 rounded-full px-8 py-4 text-lg font-semibold',
        })}
        href="/dodaj-sastav"
      >
        <PlusCircleIcon className="h-5 w-5" />
        Dodaj svoj sastav
      </Link>
    </section>
  );
};

export default SubmitYourEssayCTA;

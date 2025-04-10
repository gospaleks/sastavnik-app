import Image from 'next/image';
import Link from 'next/link';

import { getLatestEssays } from '@/lib/services/essayService';
import { getAllCategories } from '@/lib/services/categoryService';

import { buttonVariants } from '@/components/ui/button';
import ContentWrapper from '@/components/ContentWrapper';
import { ArrowRight, FileTextIcon, FolderOpenIcon } from 'lucide-react';
import AlertCard from './AlertCard';

export default async function Footer() {
  const [categories, latestEssays] = await Promise.all([
    getAllCategories(),
    getLatestEssays(5),
  ]);

  return (
    <footer className="bg-muted text-muted-foreground border-border border-t">
      <ContentWrapper>
        <div className="grid gap-10 px-4 py-8 md:grid-cols-3">
          {/* Leva kolona: Logo i opis */}
          <div className="flex flex-col items-center gap-4 text-center">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo_navbar.png"
                alt="Sastavnik logo"
                width={200}
                height={50}
              />
            </Link>
            <p className="text-sm leading-relaxed">
              Sastavi za osnovnu i srednju školu. Inspiriši se, nauči i napiši
              svoj najbolji sastav do sada!
            </p>
            <AlertCard
              title="NAPOMENA:"
              description="Sastavi nisu namenjeni prepisivanju. Ovi tekstovi su primeri i služe
                    učenju i shvatanju kako sastav ili pismeni rad treba biti napisan."
              variant="destructive"
              className="text-left text-xs"
            />
          </div>

          {/* Srednja kolona: Kategorije */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-primary mb-4 text-lg font-semibold">
              Kategorije
            </h4>
            <ul className="space-y-2 text-sm">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/kategorije/${category.name}`}
                    className="hover:text-foreground flex items-center gap-2 transition-colors"
                  >
                    <FolderOpenIcon size={15} />
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Desna kolona: TODO */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-primary mb-4 text-lg font-semibold">
              Najnoviji sastavi
            </h4>
            <ul className="space-y-2 text-sm">
              {latestEssays.map((essay) => (
                <li key={essay.id}>
                  <Link
                    href={`/sastavi/${essay.id}`}
                    className="hover:text-foreground flex items-center gap-2 transition-colors"
                  >
                    <FileTextIcon size={15} />
                    {essay.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={'/sastavi'}
              className={buttonVariants({
                variant: 'link',
                size: 'sm',
                className: 'mt-4',
              })}
            >
              Prikaži sve sastave
              <ArrowRight />
            </Link>
          </div>
        </div>
      </ContentWrapper>

      <div className="border-border text-muted-foreground border-t py-4 text-center text-xs">
        &copy; {new Date().getFullYear()} Sastavnik. Sva prava zadržana.
        <br />
        Developed by{' '}
        <Link
          href="https://github.com/gospaleks"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          gospaleks
        </Link>
        .
      </div>
    </footer>
  );
}

import Image from 'next/image';
import Link from 'next/link';

import { getLatestEssays } from '@/lib/services/essayService';
import { getAllCategories } from '@/lib/services/categoryService';

import ContentWrapper from '@/components/ContentWrapper';
import AlertCard from '@/components/AlertCard';
import Logo from '@/components/Logo';

import { Separator } from '@/components/ui/separator';
import { buttonVariants } from '@/components/ui/button';
import {
  ArrowRight,
  ArrowRightIcon,
  FileTextIcon,
  FolderOpenIcon,
  PlusCircleIcon,
} from 'lucide-react';

export default async function Footer() {
  const [categories, latestEssays] = await Promise.all([
    getAllCategories(),
    getLatestEssays(8),
  ]);

  return (
    <footer className="bg-muted border-border border-t">
      <ContentWrapper>
        <div className="grid gap-6 px-4 py-8 md:grid-cols-3">
          {/* Prva kolona: Logo i opis */}
          <div className="flex flex-col items-center gap-4 text-center md:items-start">
            <Logo width={130} height={50} />

            <p className="text-muted-foreground text-center text-sm leading-relaxed md:text-left">
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

            <Link
              className={buttonVariants({
                variant: 'outline',
                size: 'sm',
              })}
              href="/dodaj-sastav"
            >
              <PlusCircleIcon />
              Dodaj sastav
            </Link>

            <Separator className="dark:bg-accent mt-2 md:hidden" />
          </div>

          {/* Druga kolona: Najnoviji sastavi */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="mb-4 text-lg font-semibold">Najnoviji sastavi</h4>
            <ul className="space-y-2 text-sm">
              {latestEssays.map((essay) => (
                <li key={essay.id}>
                  <Link
                    href={`/sastavi/${essay.id}`}
                    className="hover:text-foreground text-muted-foreground flex items-center gap-2 transition-colors"
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

            <Separator className="dark:bg-accent mt-2 md:hidden" />
          </div>

          {/* Treca kolona: Kategorije i ostali linkovi */}
          <div className="flex flex-col items-center md:items-start">
            <div>
              <h4 className="mb-4 text-lg font-semibold">Kategorije</h4>
              <ul className="space-y-2 text-sm">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/kategorije/${category.name}`}
                      className="hover:text-foreground text-muted-foreground flex items-center gap-2 transition-colors"
                    >
                      <FolderOpenIcon size={15} />
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Separator className="dark:bg-accent my-4" />

            <div className="flex flex-col items-center md:items-start">
              <h4 className="mb-4 text-lg font-semibold">Ostali linkovi</h4>

              <Link
                href="/privatnost"
                className={buttonVariants({
                  variant: 'link',
                  size: 'sm',
                })}
              >
                Pravila privatnosti <ArrowRightIcon />
              </Link>
              <Link
                href="/o-nama"
                className={buttonVariants({
                  variant: 'link',
                  size: 'sm',
                })}
              >
                O platformi Sastavnik <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </ContentWrapper>

      <div className="bg-background border border-t text-center text-xs opacity-50">
        <ContentWrapper className="flex flex-col items-center justify-between gap-2 md:flex-row">
          <span> Copyright &copy; {new Date().getFullYear()} Sastavnik</span>

          <div>
            <span>Developed by </span>

            <Link
              href="https://github.com/gospaleks"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary underline transition-colors"
            >
              gospaleks
            </Link>
          </div>
        </ContentWrapper>
      </div>
    </footer>
  );
}

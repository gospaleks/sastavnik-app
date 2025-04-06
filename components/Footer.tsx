import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import ContentWrapper from '@/components/ContentWrapper';

export default async function Footer() {
  const categories = await prisma.category.findMany();

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
          </div>

          {/* Srednja kolona: Kategorije */}
          <div>
            <h4 className="text-primary mb-4 text-lg font-semibold">
              Kategorije
            </h4>
            <ul className="space-y-2 text-sm">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/kategorije/${category.name}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Desna kolona: TODO */}
          <div></div>
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

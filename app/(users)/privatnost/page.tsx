export const dynamic = 'force-static';

import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const PrivacyPage = () => {
  return (
    <div className="mx-auto max-w-3xl p-4">
      <Card>
        <CardContent className="px-4 py-6 sm:px-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Pravila Privatnosti
            </h1>
            <p className="text-muted-foreground mx-auto max-w-md text-sm">
              Ova pravila privatnosti objašnjavaju kako prikupljamo, koristimo i
              štitimo vaše lične podatke kada koristite našu web stranicu.
            </p>
          </div>

          <Separator className="my-6" />

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Prikupljanje podataka</h2>
            <p className="text-muted-foreground text-sm">
              Prikupljamo informacije koje nam dobrovoljno pružate prilikom
              registracije, slanja sastava i komentarisanja. Ove informacije
              mogu uključivati vaše ime, e-mail adresu... <br /> <br />
              Za autentifikaciju i pristup našoj web stranici koristimo{' '}
              <a
                href="https://kinde.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4"
              >
                Kinde Auth
              </a>
              . Kinde prikuplja vašu e-mail adresu i ime i prezime koje unesete.
            </p>
          </section>

          <Separator className="my-6" />

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Korišćenje podataka</h2>
            <p className="text-muted-foreground text-sm">
              Vaše informacije koristimo za pružanje usluga, poboljšanje našeg
              sadržaja i komunikaciju s vama.
            </p>
          </section>

          <Separator className="my-6" />

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Prava korisnika</h2>
            <p className="text-muted-foreground text-sm">
              Imate pravo da pristupite, ispravite ili obrišete svoje lične
              podatke koje smo prikupili. Za sve zahteve možete nas kontaktirati
              putem e-maila:{' '}
              <a
                href="mailto:office@gospaleks.rs"
                className="text-primary underline underline-offset-4"
              >
                office@gospaleks.rs
              </a>
            </p>
          </section>

          <Separator className="my-6" />

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Napomena</h2>
            <p className="text-muted-foreground text-sm">
              Ova pravila privatnosti mogu se povremeno ažurirati. Preporučujemo
              da ih redovno pregledate kako biste bili u toku s našim praksama.
              Korišćenjem naše web stranice, slažete se s ovim pravilima
              privatnosti. Ako se ne slažete s ovim pravilima, molimo vas da ne
              koristite našu web stranicu.
            </p>
          </section>

          <div className="mt-6 text-right">
            <Badge variant="outline" className="text-xs">
              Poslednje ažuriranje: maj 2025.
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPage;

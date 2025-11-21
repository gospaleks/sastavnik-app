import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const AboutPage = () => {
  return (
    <div className="mx-auto max-w-3xl p-4">
      <Card>
        <CardContent className="px-4 py-6 sm:px-6">
          <h1 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            O platformi Sastavnik
          </h1>

          <Separator className="my-6" />

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Naša Misija</h2>
            <p className="text-muted-foreground text-sm">
              Naša misija je da pružimo pouzdanu i jednostavnu platformu za
              deljenje znanja, gde korisnici mogu izražavati svoje ideje kroz
              sastave, priče, analize, razmenjivati mišljenja i unapređivati
              svoje pisane veštine.
            </p>
          </section>

          <Separator className="my-6" />

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Naša Vizija</h2>
            <p className="text-muted-foreground text-sm">
              Verujemo u moć reči i slobodu izražavanja. Naš cilj je da
              izgradimo zajednicu koja inspiriše i podstiče korisnike da
              razvijaju svoje kritičko mišljenje i kreativnost.
            </p>
          </section>

          <Separator className="my-6" />

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">
              Tehnologije koje koristimo
            </h2>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Next.js</Badge>
              <Badge variant="outline">React</Badge>
              <Badge variant="outline">TypeScript</Badge>
              <Badge variant="outline">shadcn/ui</Badge>
              <Badge variant="outline">Tailwind CSS</Badge>
              <Badge variant="outline">Kinde</Badge>
              <Badge variant="outline">PostgreSQL</Badge>
            </div>
          </section>

          <Separator className="my-6" />

          <div className="mt-6 text-right">
            <Badge variant="outline" className="text-xs">
              Verzija sajta: 1.1.0
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;

import ContentWrapper from '@/components/ContentWrapper';

import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

const Benefits = () => {
  return (
    <section
      style={{
        backgroundImage: "url('/hero_light.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="dark:bg-background py-12">
        <ContentWrapper>
          <div className="grid items-center gap-12 pl-2 lg:pl-0">
            {/* Left side */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge
                  variant="secondary"
                  className="bg-secondary text-secondary-foreground"
                >
                  Zašto Sastavnik?
                </Badge>
                <h2 className="text-foreground text-3xl font-bold md:text-4xl">
                  Pouzdana platforma za tvoj uspeh!
                </h2>
                <p className="text-muted-foreground text-xl">
                  Naša misija je da pružimo jednostavnu i sigurnu platformu gde
                  možeš slobodno izražavati svoje ideje i učiti od drugih.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-primary mt-0.5 h-6 w-6 flex-shrink-0" />
                  <div>
                    <h3 className="text-foreground font-semibold">
                      Sigurno okruženje
                    </h3>
                    <p className="text-muted-foreground">
                      Moderirani sadržaj i poštovanje svih učesnika
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-primary mt-0.5 h-6 w-6 flex-shrink-0" />
                  <div>
                    <h3 className="text-foreground font-semibold">
                      Konstruktivne povratne informacije
                    </h3>
                    <p className="text-muted-foreground">
                      Kvalitetni komentari koji pomažu u napretku
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-primary mt-0.5 h-6 w-6 flex-shrink-0" />
                  <div>
                    <h3 className="text-foreground font-semibold">
                      Jednostavno korišćenje
                    </h3>
                    <p className="text-muted-foreground">
                      Intuitivni interfejs prilagođen učenicima
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-primary mt-0.5 h-6 w-6 flex-shrink-0" />
                  <div>
                    <h3 className="text-foreground font-semibold">
                      Besplatno korišćenje
                    </h3>
                    <p className="text-muted-foreground">
                      Sve funkcionalnosti dostupne bez naknade
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - TODO */}
          </div>
        </ContentWrapper>
      </div>
    </section>
  );
};

export default Benefits;

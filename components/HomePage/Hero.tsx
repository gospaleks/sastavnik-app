import Link from 'next/link';

import { getLatestEssays } from '@/data/essay/getLatestEssays';
import { getStats } from '@/data/essay/getStats';

import BasicEssayCard from '@/components/BasicEssayCard';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileTextIcon, PlusCircleIcon } from 'lucide-react';

const Hero = async () => {
  const [stats, latestEssays] = await Promise.all([
    getStats(),
    getLatestEssays(1),
  ]);
  const essay = latestEssays[0];

  const content = (
    <div className="relative mx-auto max-w-6xl px-4 md:px-6">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-8">
          {/* Leva strana */}
          <div className="space-y-4">
            <Badge
              variant="secondary"
              className="bg-muted text-muted-foreground hover:bg-accent"
            >
              🎓 Platforma za učenike
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="text-foreground">Kreiraj.</span>{' '}
              <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">
                Uči.
              </span>{' '}
              <span className="text-foreground">Inspiriši.</span>
            </h1>

            <p className="text-muted-foreground max-w-2xl text-xl leading-relaxed">
              Moderna platforma koja omogućava učenicima da dele svoje školske
              sastave, ocenjuju radove drugih i unapređuju svoje pisane veštine
              kroz zajedničko učenje.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 bg-gradient-to-r px-8 py-6 text-lg"
              asChild
            >
              <Link href="/dodaj-sastav">
                <PlusCircleIcon />
                Dodaj sastav
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-border border-2 px-8 py-6 text-lg"
              asChild
            >
              <Link href="/sastavi">
                <FileTextIcon /> Pregledaj sastave
              </Link>
            </Button>
          </div>

          <div className="flex items-center space-x-8 pt-2">
            <div className="text-center">
              <span className="text-foreground text-2xl font-bold">
                {stats.essays}+
              </span>
              <div className="text-muted-foreground text-sm">Sastava</div>
            </div>
            <div className="text-center">
              <span className="text-foreground text-2xl font-bold">
                {stats.comments}+
              </span>
              <div className="text-muted-foreground text-sm">Komentara</div>
            </div>
          </div>
        </div>

        <div className="relative">
          <BasicEssayCard essay={essay} />
          <div className="from-primary to-secondary absolute -top-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-br opacity-20 blur-xl" />
          <div className="from-secondary to-primary absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-gradient-to-br opacity-20 blur-xl" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section
        className="relative overflow-hidden py-12 dark:hidden"
        style={{
          backgroundImage: "url('/hero_light.jpg')",
          backgroundSize: 'cover',
        }}
      >
        {content}
      </section>

      <section
        className="relative hidden overflow-hidden py-12 dark:block"
        style={{
          backgroundImage: "url('/hero_dark.jpg')",
          backgroundSize: 'cover',
        }}
      >
        {content}
      </section>
    </>
  );
};

export default Hero;

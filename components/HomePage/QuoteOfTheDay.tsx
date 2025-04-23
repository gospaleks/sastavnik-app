import { Card, CardContent } from '@/components/ui/card';
import ContentWrapper from '@/components/ContentWrapper';
import { QuoteIcon } from 'lucide-react';

{
  /**
    TODO: Pribavi iz baze 2 random citata (nije hitno!)
  */
}

const QuoteOfTheDay = () => {
  return (
    <section
      style={{
        backgroundImage: "url('/quote_background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <ContentWrapper>
        <div className="my-16 flex flex-col items-center justify-center gap-8 md:flex-row">
          <QuoteCard
            text="Nema veće boli od one kada nosiš neispričanu priču u sebi."
            author="Maja Andželou"
          />
          <QuoteCard
            text="Obrazovanje je najmoćnije oružje koje možete upotrebiti da promenite svet."
            author="Nelson Mandela"
          />
        </div>
      </ContentWrapper>
    </section>
  );
};

const QuoteCard = ({ text, author }: { text: string; author: string }) => {
  return (
    <Card className="max-w-md border border-gray-200 bg-white shadow-lg">
      <CardContent className="space-y-4 p-8 text-center">
        <div className="flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <QuoteIcon className="h-8 w-8" />
          </div>
        </div>
        <p className="text-xl font-semibold text-gray-800 italic">{text}</p>
        <p className="text-lg font-medium text-gray-600">– {author}</p>
      </CardContent>
    </Card>
  );
};

export default QuoteOfTheDay;

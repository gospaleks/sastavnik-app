import Link from 'next/link';
import { ArrowRight, FileTextIcon } from 'lucide-react';
import { getTextPreviewFromHtml } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from './ui/button';

type Props = {
  essay: {
    id: string;
    title: string;
    content: string;
  };
};
const BasicEssayCard = ({ essay }: Props) => {
  return (
    <Link href={`/sastavi/${essay.id}`} className="block">
      <Card className="cursor-pointer gap-1 p-4">
        <CardHeader className="flex items-start gap-3 p-0">
          <FileTextIcon className="text-primary" />
          <h2 className="font-semibold tracking-tight hover:underline">
            {essay.title}
          </h2>
        </CardHeader>

        <CardContent className="text-muted-foreground p-0 text-sm">
          {getTextPreviewFromHtml(essay.content, 80)}
        </CardContent>

        <CardFooter className="flex w-full justify-end p-0">
          <Button variant={'secondary'} size={'sm'} className="cursor-pointer">
            Pročitaj više <ArrowRight />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BasicEssayCard;

import Link from 'next/link';

type Props = {
  essays: {
    id: string;
    title: string;
    content: string;
  }[];
};

const BasicEssayList = ({ essays }: Props) => {
  return (
    <div className="mt-2 flex flex-col gap-4">
      {essays.length > 0 ? (
        essays.map((essay) => (
          <div
            key={essay.id}
            className="cursor-pointer rounded-md p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <Link href={`/sastavi/${essay.id}`}>
              <h2 className="text-lg leading-tight font-semibold hover:underline">
                {essay.title}
              </h2>
              <p className="text-muted-foreground text-xs">
                {essay.content.slice(0, 70)}...
              </p>
              <p className="text-right text-sm text-blue-500 underline">
                Pročitaj više...
              </p>
            </Link>
          </div>
        ))
      ) : (
        <p className="text-muted-foreground text-sm">
          😔 Trenutno nema sastava za prikaz
        </p>
      )}
    </div>
  );
};

export default BasicEssayList;

import Link from 'next/link';
import { getAllCategories } from '@/data/category/getAllCategories';
import { ChevronRight, ChevronRightIcon, FolderOpenIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CategoriesCardList = async () => {
  const categories = await getAllCategories();

  return (
    <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/kategorije/${category.name}`}
          className="group h-full"
        >
          <Card className="border-muted relative flex h-full flex-col transition-shadow hover:shadow-xl">
            {/* Decorative background */}
            <div className="from-primary/10 to-accent/10 pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-tr opacity-0 transition group-hover:opacity-100" />

            <CardHeader className="flex flex-col items-start pb-2">
              <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-muted mb-4 flex h-14 w-14 items-center justify-center rounded-xl transition">
                <FolderOpenIcon className="h-6 w-6" />
              </div>
              <CardTitle className="text-foreground group-hover:text-primary mb-2 text-lg transition">
                {category.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="mt-auto flex items-center justify-between pt-0">
              <span className="text-muted-foreground text-sm">
                {category._count?.essays ?? 0}{' '}
                {category._count?.essays === 1 ? 'rad' : 'radova'}
              </span>
              <span className="group-hover:text-primary absolute top-6 right-6 text-gray-300 transition dark:text-gray-500">
                <ChevronRightIcon className="h-6 w-6" />
              </span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default CategoriesCardList;

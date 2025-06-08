import Link from 'next/link';
import { getAllCategories } from '@/data/category/getAllCategories';
import { FolderOpenIcon } from 'lucide-react';

const CategoriesCardList = async () => {
  const categories = await getAllCategories();

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/kategorije/${category.name}`}
          className="group bg-card flex flex-col items-center gap-3 rounded-xl border p-6 text-center shadow transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="bg-muted group-hover:bg-muted-foreground group-hover:text-muted flex h-14 w-14 items-center justify-center rounded-full transition">
            <FolderOpenIcon className="h-6 w-6" />
          </div>
          <h3 className="text-md font-semibold">{category.name}</h3>
        </Link>
      ))}
    </div>
  );
};

export default CategoriesCardList;

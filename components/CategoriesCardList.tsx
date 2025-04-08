import Link from 'next/link';
import { getAllCategories } from '@/lib/services/categoryService';
import { FolderOpenIcon } from 'lucide-react';

const CategoriesCardList = async () => {
  const categories = await getAllCategories();

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/kategorije/${category.name}`}
          className="group flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-6 text-center shadow transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
            <FolderOpenIcon className="h-6 w-6" />
          </div>
          <h3 className="text-md font-semibold text-gray-700 group-hover:text-blue-600">
            {category.name}
          </h3>
        </Link>
      ))}
    </div>
  );
};

export default CategoriesCardList;

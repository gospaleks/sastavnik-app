import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';

import { getAllCategories } from '@/data/category/getAllCategories';
import { isAdmin } from '../isAdmin';

import ContentWrapper from '@/components/ContentWrapper';
import { CategoryForm } from '@/components/Forms/CategoryForm';
import CategoryDropdown from './CategoryDropdown';
import { FolderOpenIcon } from 'lucide-react';
import { requireAdmin } from '@/data/user/requireAdmin';

export const metadata: Metadata = {
  title: 'Kategorije',
};

const KategorijePage = async () => {
  await requireAdmin('/');

  const categories = await getAllCategories();

  return (
    <ContentWrapper>
      <div className="grid grid-cols-1 gap-0 gap-y-4 md:grid-cols-4 md:gap-4">
        <div>
          <div className="w-full rounded-lg border p-4 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">
              Dodaj novu kategoriju
            </h2>
            <CategoryForm />
          </div>
        </div>

        <div className="col-span-3">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-card relative flex flex-col items-center justify-center gap-3 rounded-xl border p-6 text-center shadow transition"
              >
                <Link
                  href={`/kategorije/${category.name}`}
                  className="group flex w-3/4 flex-col items-center gap-2"
                >
                  <div className="bg-muted group-hover:bg-muted-foreground group-hover:text-muted flex h-14 w-14 items-center justify-center rounded-full transition">
                    <FolderOpenIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-md font-semibold">{category.name}</h3>
                </Link>

                <div className="absolute top-2 right-2">
                  <CategoryDropdown category={category} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default KategorijePage;

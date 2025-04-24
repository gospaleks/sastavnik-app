import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import { getAllCategories } from '@/lib/services/categoryService';

import ContentWrapper from '@/components/ContentWrapper';
import { CategoryForm } from '@/components/Forms/CategoryForm';
import CategoryDropdown from './CategoryDropdown';
import { FolderOpenIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kategorije',
};

const KategorijePage = async () => {
  const { getPermission } = getKindeServerSession();
  const isAdmin = (await getPermission('admin:access'))?.isGranted;
  if (!isAdmin) redirect('/');

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
                className="relative flex flex-col items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white p-6 text-center shadow transition"
              >
                <Link
                  href={`/kategorije/${category.name}`}
                  className="group flex w-3/4 flex-col items-center gap-2"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                    <FolderOpenIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-md font-semibold text-gray-700 group-hover:text-blue-600">
                    {category.name}
                  </h3>
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

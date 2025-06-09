import { getAllCategories } from '@/data/category/getAllCategories';

export async function GET() {
  const categories = await getAllCategories();

  return new Response(JSON.stringify(categories), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

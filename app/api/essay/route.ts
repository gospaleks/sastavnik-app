import { getLatestEssays } from '@/data/essay/getLatestEssays';

export async function GET() {
  const categories = await getLatestEssays(8);

  return new Response(JSON.stringify(categories), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

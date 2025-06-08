import { prisma } from '@/lib/prisma';
import { unstable_cacheTag as cacheTag } from 'next/cache';

// Najnoviji sastavi (za prikaz na naslovnoj strani i u footeru)
// Samo osnovni podaci (id, title, content) se vracaju
export async function getLatestEssays(limit = 5) {
  'use cache';
  cacheTag('essays'); // Univerzalni tag (invalidira se kad se doda novi sastav ili se desi neka promena)

  return await prisma.essay.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: limit,
    select: {
      id: true,
      title: true,
      content: true,
    },
  });
}

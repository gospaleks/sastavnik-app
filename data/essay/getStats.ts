import { prisma } from '@/lib/prisma';
import { unstable_cacheTag as cacheTag } from 'next/cache';

export async function getStats() {
  'use cache';
  cacheTag('essays'); // Univerzalni tag (invalidira se kad se doda novi sastav ili se desi neka promena)
  const [essaysCount, commentsCount] = await Promise.all([
    prisma.essay.count(),
    prisma.comment.count(),
  ]);
  const count = { essays: essaysCount, comments: commentsCount };

  return count;
}

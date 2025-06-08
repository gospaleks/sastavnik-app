import { prisma } from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { getUserSession } from '../user/getUser';

// Sastav moze biti izmenjen samo ako je korisnik autor sastava ili admin
export async function canUserEditEssay(essayId: string) {
  const { getPermission } = getKindeServerSession();

  // Ako je admin moze
  const isAdmin = (await getPermission('admin:access'))?.isGranted;
  if (isAdmin) return true;

  // Ako nije admin, proveri da li je logovan kao autor sastava
  const user = await getUserSession();
  if (!user) return false;

  const essay = await prisma.essay.findFirst({
    where: {
      id: essayId,
      authorId: user.id,
    },
  });

  if (!essay) return false;

  return true;
}

// script to add <p class="text-node"> tags to all essay content in the database for each new line in the content

import { prisma } from '@/lib/prisma';

export default async function addParagraphTags() {
  const essays = await prisma.essay.findMany({
    select: {
      id: true,
      content: true,
    },
  });

  for (const essay of essays) {
    const updatedContent = essay.content.replace(
      /(?:\r\n|\r|\n)/g,
      '</p><p class="text-node">',
    );
    await prisma.essay.update({
      where: { id: essay.id },
      data: { content: `<p class="text-node">${updatedContent}</p>` },
    });
  }

  console.log('Dodati <p> tagovi za integraciju sa rich text editorom.');
}

import { z } from 'zod';

enum SchoolType {
  OSNOVNA = 'Osnovna',
  SREDNJA = 'Srednja',
}

export const essayFormSchema = z.object({
  title: z
    .string()
    .min(1, 'Unesite temu sastava. Na primer: "Moj najbolji prijatelj"'),
  content: z.string().min(1, 'Sadržaj sastava je obavezan'), // promeni min na vise
  categoryId: z.string().nonempty('Kategorija je obavezna'),
  schoolType: z.enum(['OSNOVNA', 'SREDNJA']),
  level: z.number().int().min(1).max(8), // TODO: ako je schoolType SREDNJA, onda samo 1-4
  tags: z.array(z.string()),
});

export type EssayFormSchemaType = z.infer<typeof essayFormSchema>;

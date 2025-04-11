'use server';
import { revalidateTag } from 'next/cache';

export async function refetchEssays() {
  revalidateTag('e'); // hack to get data for new filters
}

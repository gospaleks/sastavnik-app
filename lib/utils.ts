import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 jer je 0-indexed
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}.${month}.${year}. ${hours}:${minutes}`;
}

export function getTextPreviewFromHtml(
  html: string,
  maxLength: number = 200,
  maxLines: number = 5,
): string {
  const text = html
    .replace(/<\/p>/gi, '\n') // svaki paragraf novi red
    .replace(/<p[^>]*>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n') // i <br> kao novi red
    .replace(/<[^>]+>/g, '') // sve ostalo izbacujemo
    .replace(/\n{2,}/g, '\n') // visestruki novi red -> jedan
    .replace(/[ \t]+\n/g, '\n') // whitespace pre \n
    .replace(/\n[ \t]+/g, '\n') // whitespace posle \n
    .trim();

  const lines = text.split('\n');
  let preview = '';

  if (lines.length > maxLines) {
    preview = lines.slice(0, maxLines).join('\n');
    // Ako je preview duži od maxLength, skrati ga
    if (preview.length > maxLength)
      preview = preview.slice(0, maxLength) + '...';
    else preview += '\n...';
  } else {
    preview = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }

  return preview;
}

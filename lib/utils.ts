import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  // Prikaz u srpskoj vremenskoj zoni (Europe/Belgrade)
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Europe/Belgrade',
  };

  const formatted = new Intl.DateTimeFormat('sr-Latn', options).format(date);

  return formatted.replace(',', '');
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return `pre ${seconds} sekundi`;
  if (minutes < 60)
    return `pre ${minutes} ${pluralize(minutes, 'minut', 'minuta', 'minuta')}`;
  if (hours < 24)
    return `pre ${hours} ${pluralize(hours, 'sat', 'sata', 'sati')}`;
  if (days < 7) return `pre ${days} ${pluralize(days, 'dan', 'dana', 'dana')}`;
  if (weeks < 5)
    return `pre ${weeks} ${pluralize(weeks, 'nedelju', 'nedelje', 'nedelja')}`;
  if (months < 12)
    return `pre ${months} ${pluralize(months, 'mesec', 'meseca', 'meseci')}`;
  return `pre ${years} ${pluralize(years, 'godinu', 'godine', 'godina')}`;
}

// Funkcija za ispravno srpsko množenje (singular, paušalno dual, plural)
function pluralize(n: number, one: string, few: string, many: string): string {
  if (n % 10 === 1 && n % 100 !== 11) return one;
  if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) return few;
  return many;
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

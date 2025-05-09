import { Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: {
    template: '%s | Sastavnik',
    default: 'Sastavnik - Kreiraj. Uči. Inspiriši.',
  },
  description:
    'Sastavnik je platforma koja omogućava učenicima da pogledaju radove svojih drugara i da postave svoje radove.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <NuqsAdapter>{children}</NuqsAdapter>
        <Toaster richColors closeButton />
      </body>
    </html>
  );
}

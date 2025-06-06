import { Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: {
    template: '%s | Sastavnik',
    default: 'Sastavnik - Kreiraj. Uči. Inspiriši.',
  },
  description:
    'Sastavnik je inovativna platforma za učenike i nastavnike, omogućava pregled, deljenje i inspiraciju kroz školske radove. Pridruži se zajednici, uči i inspiriši druge svojim radovima.',
  keywords: [
    'sastavi',
    'srpski jezik',
    'srednja škola',
    'osnovna škola',
    'Sastavnik',
    'školski radovi',
    'učenici',
    'nastavnici',
    'obrazovanje',
    'deljenje radova',
    'inspiracija',
    'učenje',
    'platforma za učenike',
    'kreativnost',
  ],
  openGraph: {
    title: 'Sastavnik - Kreiraj. Uči. Inspiriši.',
    description:
      'Pronađi i podeli školske radove, inspiriši se i inspiriši druge na Sastavniku. Zajednica za učenike i nastavnike.',
    url: 'https://sastavnik.gospaleks.rs',
    siteName: 'Sastavnik',
    locale: 'sr_RS',
    type: 'website',
  },
  verification: {
    google: 'jltSHzd0AUMk2SJ8smiOeXyKbSzKA7vd2V1HtZgWEOk',
  },

  metadataBase: new URL('https://sastavnik.gospaleks.rs'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NuqsAdapter>{children}</NuqsAdapter>
          <Toaster richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}

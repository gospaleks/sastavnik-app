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
    'Sastavnik je platforma koja omogućava učenicima da pogledaju radove svojih drugara i da postave svoje radove.',
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

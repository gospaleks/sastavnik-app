import { Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import localFont from 'next/font/local';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const neoGeo = localFont({
  src: [
    {
      path: '../assets/fonts/NeoGeoRNIDS-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../assets/fonts/NeoGeoRNIDS-ThinItalic.woff2',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../assets/fonts/NeoGeoRNIDS-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/NeoGeoRNIDS-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../assets/fonts/NeoGeoRNIDS-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/NeoGeoRNIDS-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../assets/fonts/NeoGeoRNIDS-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/NeoGeoRNIDS-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../assets/fonts/NeoGeoRNIDS-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/NeoGeoRNIDS-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../assets/fonts/NeoGeoRNIDS-Black.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../assets/fonts/NeoGeoRNIDS-BlackItalic.woff2',
      weight: '900',
      style: 'italic',
    },
    {
      path: '../assets/fonts/NeoGeoRNIDS-Heavy.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../assets/fonts/NeoGeoRNIDS-HeavyItalic.woff2',
      weight: '800',
      style: 'italic',
    },
  ],
  variable: '--font-neo-geo',
  display: 'swap',
});

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
      <body className={`${neoGeo.variable} antialiased`}>
        <NuqsAdapter>{children}</NuqsAdapter>
        <Toaster richColors closeButton />
      </body>
    </html>
  );
}

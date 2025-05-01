import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header/Header';

import AdminNavbar from '@/components/Layout/AdminNavbar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <AdminNavbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

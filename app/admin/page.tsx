import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Admin Panel',
};

const Admin = () => {
  return redirect('/admin/korisnici');
};

export default Admin;

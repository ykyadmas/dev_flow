// use client
import React from 'react';
import AdminSideBarLink from './_components/NavbarLink/NavbarLink';
import { getServerSession } from 'next-auth';
import { authOption } from '@/lib/Auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOption);
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  if (!session?.user?.email || session.user.email !== adminEmail) {
    return (
      <html lang="en">
        <body>
          <p>You are not authorized to view this page</p>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body>
        <AdminSideBarLink />
        {children}
      </body>
    </html>
  );
}

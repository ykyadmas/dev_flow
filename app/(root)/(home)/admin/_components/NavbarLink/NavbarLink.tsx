"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

const adminLink = [
  {
    label: 'Dashboard',
    route: '/admin',
  },
  {
    label: 'Messages',
    route: '/admin/messages',
  },
  {
    label: 'Post',
    route: '/admin/post',
  },
];

const AdminSideBarLink = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  if (!session?.user?.email || session.user.email !== adminEmail) {
    return <p>You are not an admin</p>;
  }

  return (
    <div className='flex h-20 flex-row gap-4 border-b bg-gray-400'>
      {adminLink.map((link) => (
        <div key={link.label} className="">
          <Link
            className={`${
              pathname === link.route
                ? 'mt-5 flex w-full flex-row rounded-full bg-white p-2'
                : 'mt-5 flex w-full  flex-row rounded-full bg-none p-2'
            }`}
            href={link.route}
          >
            <p className="mx-2">{link.label}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AdminSideBarLink;

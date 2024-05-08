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

  if (!session?.user?.email || session.user.email !== 'yekoyeadmas@gmail.com') {
    return <p>You are not an admin</p>;
  }

  return (
    <div>
      {adminLink.map((link) => (
        <div key={link.label} className="">
          <Link
            className={`${
              pathname === link.route
                ? 'flex w-full flex-row rounded-full bg-orange-500 p-2'
                : 'flex w-full flex-row rounded-full bg-none p-2'
            }`}
            href={link.route}
          >
            <p className="ml-10">{link.label}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AdminSideBarLink;

"use client"
import PostForm from '@/components/PostSchema/PostForm'
import { useSession } from 'next-auth/react';
import React from 'react'

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: session } = useSession();

  if (!session?.user?.email || session.user.email !=='yekoyeadmas@gmail.com' ) {
    return <p>You are not an admin</p>;
  }
  return (
    <div>
        <PostForm/>
    </div>
  )
}

export default page
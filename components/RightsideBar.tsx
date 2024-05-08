import Link from 'next/link'
import React from 'react'
import { PrismaClient } from '@prisma/client'

const prisma=new PrismaClient()

const RightsideBar = async() => {
const dispayPosts=await prisma.posts.findMany({
  orderBy:{
    'createdAt':'desc'
  },
  include:{
    author:true
  }
})

  return (
<section className='sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 max-sm:hidden lg:w-[266px] dark:shadow-none'>
<div>
<h3 className='text-2xl font-bold text-black'>Posts</h3>
<div className='mt-7 flex w-full flex-col gap-[30px]'>
{dispayPosts.map(posts=>(
  <Link href={`/post/${posts.id}`}
   key={posts.id}
   className='flex cursor-pointer items-center justify-between gap-7'
  >
    <p className='border-b border-gray-400 text-black'>{posts.id}.{posts.title}</p>
  </Link>
))}
</div>
</div>
</section>
  )
}

export default RightsideBar
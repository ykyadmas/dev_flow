import LocalPosteSearch from '@/components/search/LocalPostSearch'
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

const prisma=new PrismaClient()

// interface Props{
//     params:{id:string}
// } 

const page = async({searchParams}:{searchParams?:{
    query?:string;
    page?:number;
  }}) => {
    const query=searchParams?.query || ""
    const displayOne=await prisma.posts.findMany({
        where:{
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { detail: { contains: query, mode: 'insensitive' } },
            ],
          },
    })
  return (
    <div>
        <LocalPosteSearch/>
       {displayOne.map((post)=>(
        <div key={post.id}>

<div className="card mb-5 w-96 bg-base-300 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">{post.title}</h2>
    <p>{post.detail}</p>
    <div className="card-actions justify-end">
      <Link href={`/post/${post.id}`}  className="btn btn-primary">See More</Link>
    </div>
  </div>
</div>        </div>
       ))} 
</div>
  )
}

export default page
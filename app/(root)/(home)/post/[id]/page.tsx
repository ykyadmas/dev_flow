import { PrismaClient } from '@prisma/client'
import React from 'react'

const prisma=new PrismaClient()

interface Props{
    params:{id:string}
} 

const page = async({params}:Props) => {
    const displayOne=await prisma.posts.findFirst({
        where:{id:parseInt(params.id)}
    })
  return (
    <div>
        <p className='text-3xl font-bold'>{displayOne?.title}</p>
        <p className='mt-6 text-gray-500'>{displayOne?.detail}</p>
    </div>
  )
}

export default page
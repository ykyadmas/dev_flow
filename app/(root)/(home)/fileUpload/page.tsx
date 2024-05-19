import Cards from '@/components/fileDisplayCard/Cards'
import LocalFileSearch from '@/components/search/LocalFileSearch'
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

const prisma=new PrismaClient()

const file = async({searchParams}:{searchParams?:{
  query?:string;
  page?:number;
}}) => {
const query=searchParams?.query || ""
const display=await prisma.file.findMany({
  where:{
    OR: [
      { title: { contains: query, mode: 'insensitive' } },
      { content: { contains: query, mode: 'insensitive' } },
    ],
  },

  'orderBy':{
    'createdAt': 'desc'
  },
  'include':{
    'uploader':true
  }

})
  return (
    <div className=''>
       <LocalFileSearch />
       <Link className='btn btn-primary' href='/fileUpload/create'>
       Uploadfile
      </Link>
      {display.map((item)=>(
       <div className='mt-10' key={item.id}>
         <Cards
        title={item.title as string} 
        content={item.content as string} 
        imageUrl={item.imageUrl as string} 
        uploader={item.uploader?.name as string}/>
       </div>
      ))}
     
    </div>
  )
}

export default file

import Cards from '@/components/fileDisplayCard/Cards'
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

const prisma=new PrismaClient()

const file = async() => {
const display=await prisma.file.findMany({

  'orderBy':{
    'createdAt': 'desc'
  },
  'include':{
    'uploader':true
  }

})
  return (
    <div className=''>
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

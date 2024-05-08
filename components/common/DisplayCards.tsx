import Link from 'next/link'
import React from 'react'
import { getTimestamp } from '@/lib/utils'


interface Props{
    id:number,
    title:string,
    tags:{_id:string,name:string}[],
    author:{
        id:string,
        name:string,
        picture:string
    },
    upvote:number,
    views:number,
    query:string,
    currentPage:number,
    answers:Array<object>,
    createdAt:Date
}

const DisplayCards = async({id,title,author,query,currentPage,createdAt}:Props) => {

  
  return (
    <div className='rounded-[10px] bg-lime-100 p-9 sm:px-11'>
        <div className='flex flex-col-reverse items-start justify-between gap-5 sm:flex-row'>
       <div>
         <span 
        className='flex text-black'>
        {author.name}
        </span>
        <span 
        className='flex text-black sm:hidden'>{getTimestamp(createdAt)}</span>
        <Link href={`question/${id}`}>
        <h1 className='flex-1 text-2xl font-bold text-black'>{title}</h1>
        </Link>
       </div>
        </div>
        <div className='mt-3 flex flex-wrap gap-2'>
        </div>
        <div className='mt-6 flex w-full flex-wrap justify-between gap-3'>
         
       
        </div>
    </div>
  )
}

export default DisplayCards
import { getTimestamp } from '@/lib/utils'
import { PrismaClient } from '@prisma/client'
import React from 'react'

const prisma=new PrismaClient()

interface Props{
  questionId:number
}
const Answer = async({questionId}:Props) => {
  const displayAnswer=await prisma.answer.findMany({
    where:{questionId},
    include:{
      author:true
    }
  })
  return (
    <>
   { 
   displayAnswer.map((answer)=>(
    <div key={answer.id} className="space-y-4 pt-6 text-center md:p-8">
      <p className="text-lg font-medium">
       {answer.content}
      </p>
    <figcaption className="font-medium">
      <div className="text-sky-500 dark:text-sky-400">
        answered by <span>{answer.author?.name}</span>
      </div>
      <div className="text-slate-700 dark:text-slate-500">
        {getTimestamp(answer.createdAt)}
      </div>
    </figcaption>
  </div>
  ))}
    </>
  )
}

export default Answer
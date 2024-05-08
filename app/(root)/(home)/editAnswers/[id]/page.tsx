import AnswerUpdate from '@/components/forms/questionUpdateForm/AnswerUpdate';
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import React from 'react'


const prisma=new PrismaClient()

interface Props{
  params:{id: string}
}

const EditPage = async({params}:Props) => {
const answer=await prisma.answer.findUnique({
where:{id:parseInt(params.id)}
});
if(!answer) notFound();
  return (
    <div>
     <AnswerUpdate answer={answer}/>
    </div>
  )
}

export default EditPage
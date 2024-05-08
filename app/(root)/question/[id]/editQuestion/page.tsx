import QuestionUpdateForm from '@/components/forms/questionUpdateForm/QuestionUpdate';
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import React from 'react'

const prisma=new PrismaClient()

interface Props{
  params:{id: string}
}

const EditPage = async({params}:Props) => {
const question=await prisma.question.findUnique({
where:{id:parseInt(params.id)}
});
if(!question) notFound();
  return (
    <div>
     <QuestionUpdateForm question={question}/>
    </div>
  )
}

export default EditPage
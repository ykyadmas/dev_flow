import QuestionUpdateForm from '@/components/forms/questionUpdateForm/QuestionUpdate';
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import React, { cache } from 'react'

const prisma=new PrismaClient()

interface Props{
  params:{id: string}
}

const fetchQuestion=cache((questionId:number)=>prisma.question.findUnique({where:{id:questionId},
  include:{
    author:true
  }
}))

const EditPage = async({params}:Props) => {
const question=await fetchQuestion(parseInt(params.id));
if(!question) notFound();
  return (
    <div>
     <QuestionUpdateForm question={question}/>
    </div>
  )
}

export async function generateMetadata({params}:Props){
  const question=await fetchQuestion(parseInt(params.id));
  return {
    title:question?.title,
    description:"Question Detail"+question?.id
  }
  
}

export default EditPage


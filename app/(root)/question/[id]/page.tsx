import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { getTimestamp } from "@/lib/utils";
import AnswersForm from "@/components/AnswerForm/AnswerForm";
import EditButton from "@/components/forms/questionUpdateForm/EditButton";
import DeleteButton from "@/components/forms/Delete/DeleteButton";
import Answer from "@/components/Answer/Answer";


const prisma=new PrismaClient()

interface Props{
    params:{id:string},
}

const Page = async ({params}:Props) => {

    const displayPrisma=await prisma.question.findUnique({
        where:{id:parseInt(params.id)},
        include:{
            author:true
        }
    }) 

    if (!displayPrisma) return notFound()

  return (
    
   <> 
<div className="hero h-64 bg-slate-300">
  <div className="hero-content flex-col lg:flex-row">
    <div>
      <h1 className="text-3xl font-bold">{displayPrisma.title}</h1>
      <p className="py-6">{displayPrisma.content}</p>
      <p className="m-auto flex justify-end font-bold text-gray-800">asked by <span className=" ml-4 text-amber-950">{displayPrisma.author.name}</span></p>
      <p className="m-auto flex justify-end font-bold text-gray-800">{getTimestamp(displayPrisma.createdAt)}</p>
      <EditButton QuestionId={displayPrisma.id}/>
      <DeleteButton QuestionId={displayPrisma.id}/>
    </div>
    
  </div>
 
</div>
<Answer questionId={parseInt(params.id)}/>
<AnswersForm questionId={parseInt(params.id)}/>
</>
     
  );
};

export default Page;
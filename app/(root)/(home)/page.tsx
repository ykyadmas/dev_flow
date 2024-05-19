import DisplayCards from "@/components/common/DisplayCards";
import ResultNotFound from "@/components/common/ResultNotFound";
import LocalSearch from "@/components/search/LocalSearch";
import { PrismaClient } from "@prisma/client";
import { Metadata } from "next";
import Link from "next/link";

const prisma=new PrismaClient()

export default async function Home({searchParams}:{searchParams?:{
  query?:string;
  page?:number;
}}) {
  const query=searchParams?.query || ""
  // const currentPage=Number(searchParams?.page) || 1

  const displayQuestion=await prisma.question.findMany({
    where:{
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { content: { contains: query, mode: 'insensitive' } },
      ],
    },
    orderBy:{
     createdAt: "desc",
    },
    include:{
      author:true
    },
  })
 
  return (
    <>
     <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
     <h1 className="font-bold text-black">All Questions</h1>
     <Link href="/ask-question" className="flex">
     <button className="btn min-h-[46px] bg-amber-500 px-4 py-3 text-white">Ask Aquestion</button>
     </Link>
     </div>
   <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
    <LocalSearch
    route="/"
    iconPosition="left"
    imgSrc='/assets/images/search.svg'
    placeholder="Search form Questions"
    otherClasses="flex-1"
    />
   </div>
    <div>
      {displayQuestion.length > 0 ?
      displayQuestion.map((question)=>(
       <DisplayCards 
          id={question.id}
          key={question.id}
          title={question.title}
          content={question.content}
          author={question.author.name}
          createdAt={question.createdAt} 
          answers={[]}      
          query={query}
          />
     )):<ResultNotFound
        title="There is no question to Show"
        description="Be The First To break the silence! ask aquestion and kickstart the discussion.our query could be the next big thing others learn from. Get involved"
        link="/ask-question"
        linkTitle="Ask a question"
     />}
    </div>
     </>
  );
}

export const metadata:Metadata={
  title:"All Questions Page",
  description:"View All Questions And Click To Answer"
}


import { getCurrentUser } from "@/lib/session";
import QuestionSchema from "@/lib/Schema/Validation";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(request: NextRequest,{params}:{params:{id:string}}) {

    try {
        const user = await getCurrentUser();

        if (!user?.email) {
            return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
        }

        const { content,questionId } = await request.json();
        const validation = QuestionSchema.safeParse({ content,questionId });
        if (!validation.success) {
            return NextResponse.json({ errors: validation.error.errors }, { status: 400 });
        }

        const answer = await prisma.answer.findUnique({
            where:{id:parseInt(params.id)}
        });

        if(!answer){
            return NextResponse.json("Answer not found",{status:404})
        }

        const update=await prisma.answer.update({
            where:{id:answer.id},
            data:{
                content,
                questionId
            }
        })
        return NextResponse.json(update,{status:200})
           
    } catch (error) {
        console.error("Error occurred while processing request:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest,{params}:{params:{id:string}}) {
    const answer = await prisma.answer.findUnique({
        where:{id:parseInt(params.id)}
    });
    if(!answer){
        return NextResponse.json("Question not found",{status:404})
    }
    await prisma.question.delete({
        where:{id:answer.id},
       
    })
    return NextResponse.json({},{status:200})

}

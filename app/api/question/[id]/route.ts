


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

        const { title, content } = await request.json();
        const validation = QuestionSchema.safeParse({ title, content });
        if (!validation.success) {
            return NextResponse.json({ errors: validation.error.errors }, { status: 400 });
        }

        const question = await prisma.question.findUnique({
            where:{id:parseInt(params.id)}
        });

        if(!question){
            return NextResponse.json("Question not found",{status:404})
        }

        const update=await prisma.question.update({
            where:{id:question.id},
            data:{
                title,
                content
            }
        })
        return NextResponse.json(update,{status:200})
           
    } catch (error) {
        console.error("Error occurred while processing request:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest,{params}:{params:{id:string}}) {
    const question = await prisma.question.findUnique({
        where:{id:parseInt(params.id)}
    });
    if(!question){
        return NextResponse.json("Question not found",{status:404})
    }
    await prisma.question.delete({
        where:{id:question.id},
       
    })
    return NextResponse.json({},{status:200})

}

import AnswerSchema from "@/lib/Schema/AnswerSchema";
import { getCurrentUser } from "@/lib/session";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest,{params}:{params:{id:string}}) {
    try {
        const user = await getCurrentUser();

        if (!user?.email) {
            return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
        }
       
       

        const { content,questionId } = await request.json();
        const validation = AnswerSchema.safeParse({ content,questionId});
        if (!validation.success) {
            return NextResponse.json(validation.error.errors, { status: 400 });
        }

        const answer = await prisma.answer.create({
            data: {
                content,
                authorEmail: user.email,
                questionId
            }
        });

        return NextResponse.json(answer, { status: 200 });
    } catch (error) {
        console.error("Error occurred while processing request:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

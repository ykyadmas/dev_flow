import { getCurrentUser } from "@/lib/session";
import QuestionSchema from "@/lib/Schema/Validation";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
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

        const postQuestion = await prisma.question.create({
            data: {
                title,
                content,
                authorEmail: user.email,
            }
        });

        return NextResponse.json(postQuestion, { status: 200 });
    } catch (error) {
        console.error("Error occurred while processing request:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

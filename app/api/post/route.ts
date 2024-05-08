import { getCurrentUser } from "@/lib/session";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import PostSchema from "@/components/PostSchema/postSchema";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const user = await getCurrentUser();

        if (!user?.email) {
            return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
        }

        const { title,detail } = await request.json();
        const validation = PostSchema.safeParse({ title,detail });
        if (!validation.success) {
            return NextResponse.json({ errors: validation.error.errors }, { status: 400 });
        }

        const contactForm = await prisma.posts.create({
            data: {
                title,
                detail,
                authorEmail: user.email,
            }
        });

        return NextResponse.json(contactForm, { status: 200 });
    } catch (error) {
        console.error("Error occurred while processing request:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

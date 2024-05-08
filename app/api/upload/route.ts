
import { getCurrentUser } from "@/lib/session";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import uploadSchema from "@/lib/Schema/upload";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const user = await getCurrentUser();

        if (!user?.email) {
            return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
        }
        const { title, content,imageUrl } = await request.json();
        const validation = uploadSchema.safeParse({ title, content,imageUrl });
        if (!validation.success) {
            return NextResponse.json({ errors: validation.error.errors }, { status: 400 });
        }
        const file = await prisma.file.create({
            data: {
                title,
                content,
                imageUrl,
                uploaderEmail: user.email,
            }
        });

        return NextResponse.json(file, { status: 200 });
    } catch (error) {
        console.error("Error occurred while processing request:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

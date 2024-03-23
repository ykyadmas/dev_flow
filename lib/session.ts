import { getServerSession } from "next-auth";
import { authOption } from "./Auth";



export async function getCurrentUser(){
    const session=await getServerSession(authOption)
    return session?.user
}
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/authOptions";


export const getUserSession = async () => {
    const session = await getServerSession(authOptions)
    console.log("Full session:", session);
    return session?.user ?? null
}
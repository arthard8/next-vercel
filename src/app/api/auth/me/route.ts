
import {NextResponse} from "next/server";
import {prisma} from "../../../../../prisma/prisma-client";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/authOptions";




export const dynamic = 'force-dynamic'

export async function GET(req: any, res: any, ) {

    try {


        const user = await getServerSession(req, res, authOptions)

        if (!user) {
            return NextResponse.json({message: 'Unauthorized'}, {status: 401})
        }

        const data = await prisma.user.findUnique({
            where: {
                //@ts-ignore
                id: Number(user?.user?.id)
            },
            select: {
                email: true,
                fullName: true,
                password: false

            }
        })

        return NextResponse.json(data, {status: 200})

    } catch (error) {
        console.error(error)
    }
}
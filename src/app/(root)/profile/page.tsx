
import {redirect} from "next/navigation";
import {getUserSession} from "../../../../shared/lib/get-user-session";
import {prisma} from "../../../../prisma/prisma-client";
import {ProfileForm} from "@/app/shared/components/shared";

export default async function ProfilePage() {

    const session = await getUserSession()
    if (!session) {
        console.log(session, 'session')
        return redirect('/')
    }


    const user = await prisma.user.findFirst({
        where: {
            //@ts-ignore
            id: Number(session?.id)
        }
    })

    if (!user) {
        return redirect('/')
    }

    return (
        <ProfileForm data={user}/>
    )
}
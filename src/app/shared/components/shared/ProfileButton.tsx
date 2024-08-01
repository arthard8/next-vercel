'use client'
import {Button} from "@/app/shared/components/ui";
import { useSession} from "next-auth/react";
import {CircleUser, User} from "lucide-react";
import Link from "next/link";


interface ProfileButtonProps {
    onClickSignIn?: () => void
    className?: string;

}


export const ProfileButton = ({className, onClickSignIn}: ProfileButtonProps) => {

    const {data: session} = useSession()


    return (
        <div className={className}>


            {!session ? (
                <Button onClick={onClickSignIn} variant='outline' className='flex items-center gap-1'>
                    <User size={16}/>
                    Войти
                </Button>
            ) : (
                <Link href={'/profile'}>
                    <Button variant={'secondary'} className={'flex items-center gap-2'}>
                        <CircleUser size={18}/>
                        Профиль
                    </Button>
                </Link>
            )}
        </div>
    );
};
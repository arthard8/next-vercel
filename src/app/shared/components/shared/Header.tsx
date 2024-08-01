'use client'
import {Container} from "./Container";
import Image from "next/image";

import Link from "next/link";
import {CartButton} from "@/app/shared/components/shared/CartButton";
import {SearchInput} from "@/app/shared/components/shared/searchInput";
import React, {useEffect} from "react";
import {useSearchParams} from "next/navigation";
import toast from "react-hot-toast";
import {useSession} from "next-auth/react";
import {ProfileButton} from "@/app/shared/components/shared/ProfileButton";
import {AuthModal} from "@/app/shared/components/modals";
import {cn} from "../../../../../shared/lib/utils";

interface HeaderProps {
    hasSearch?: boolean
    hasCart?: boolean
    className?: string;

}


export const Header = ({className, hasSearch = true, hasCart = true}: HeaderProps) => {

const [open, setOpen] = React.useState(false)
    const {data: session} = useSession()
    const searchParams = useSearchParams()



    useEffect(() => {
        if (searchParams.has('paid')) {
            setTimeout(() => {
                toast.success('Заказ успешно оплачен')
            }, 500)
        }

        if (searchParams.has('verified')) {
            setTimeout(() => {
                toast.success('Почта успешно подтверждена!')
            }, 500)
        }


    }, [])


    return (
        <header className={cn(' border-b ', className)}>
            <Container className='flex items-center justify-between py-8'>


                {/* левая часть */}
                <Link href='/'>
                    <div className='flex items-center gap-4'>
                        <Image src='/logo.png' alt='logo' width={35} height={35}/>
                        <div>
                            <h1 className='text-2xl uppercase font-black'> next pizza </h1>
                            <p className='text-sm text-gray-400 leading-3'> вкусней уже некуда</p>
                        </div>
                    </div>
                </Link>


                {hasSearch && <div className={'mx-10 flex-1'}>
                    <SearchInput/>
                </div>}


                {/* правая часть */}
                <div className='flex items-center gap-3 '>

                    <AuthModal open={open} onClose={() => setOpen(false)}/>
                    <ProfileButton onClickSignIn={() => setOpen(true)}/>


                    {hasCart && (

                        <CartButton/>

                    )}


                </div>
            </Container>
        </header>
    );
};


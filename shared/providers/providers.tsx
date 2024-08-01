'use client';

import {Toaster} from "react-hot-toast";
import {SessionProvider} from "next-auth/react";
import React from "react";
import NextTopLoader from "nextjs-toploader";


export const Providers: React.FC<React.PropsWithChildren> = ({children}) => {

    return (
        <>

            <SessionProvider>{children}</SessionProvider>
            <Toaster/>
            <NextTopLoader/>

        </>
    );
};
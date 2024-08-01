import type {Metadata} from "next";
import "../globals.css";
import {Header} from "../shared/components/shared";
import {Suspense} from "react";


export const metadata: Metadata = {
    title: "Pizza",
};

export default function HomeLayout({
                                       children,
                                       modal
                                   }: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    return (
        <main className='min-h-screen '>
            <Suspense>
                <Header/>
            </Suspense>
            {children}
            {modal}
        </main>
    );
}

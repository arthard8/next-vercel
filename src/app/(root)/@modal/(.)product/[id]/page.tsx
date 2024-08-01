import {notFound} from "next/navigation";

import {prisma} from "../../../../../../prisma/prisma-client";
import {ChooseProductModal} from "@/app/shared/components/modals";

export default async function ProductModalPage({params: {id}}: any) {


    const product =
        await prisma.product.findFirst({
            where: {
                id: Number(id),

            },
            include: {
                ingredients: true,
                items: true
            }
        })


    if (!product) {
        return notFound()
    }

    return (
       <ChooseProductModal product={product}/>
    )
}
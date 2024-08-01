'use client'
import {Dialog} from "../ui";

import {cn} from "../../../../../shared/lib/utils";
import {DialogContent} from "@/app/shared/components/ui/dialog";
import {useRouter} from "next/navigation";
import {ProductWithRelations} from "../../../../../@types/product";

import {ProductForm} from "@/app/shared/components/shared/ProductForm";


interface chooseProductModalProps {
    product: ProductWithRelations
    className?: string;

}


export const ChooseProductModal = ({className, product}: chooseProductModalProps) => {

    const router = useRouter()




    return (

        <Dialog open={Boolean(product)} onOpenChange={router.back}>
            <DialogContent
                className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[600px]  bg-white overflow-hidden flex items-center ', className)}>

                <ProductForm product={product} onSubmit={() => router.back()}/>


            </DialogContent>
        </Dialog>


    );
};
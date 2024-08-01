

import * as CartItem from './cart-item-details'
import {CartItemProps} from "@/app/shared/components/shared/cart-item-details/cart-item-details.types";
import {CountButton} from "@/app/shared/components/shared/count-button";
import {Trash2Icon} from "lucide-react";
import {cn} from "../../../../../shared/lib/utils";


interface CartDrawerItemProps extends CartItemProps {
    className?: string;
    onClickCountButton?: (type: 'plus' | 'minus') => void,
    onClickRemoveButton?: () => void
}


export const CartDrawerItem = ({
                                   className,
                                   name,
                                   price,
                                   imageUrl,
                                   details,
                                   quantity,
                                   disabled,
                                   onClickCountButton,
                                   onClickRemoveButton
                               }: CartDrawerItemProps) => {



    return (
        <div className={cn('flex bg-white p-5 gap-6', {'opacity-50 pointer-events-none': disabled}, className)}>

            <CartItem.Image src={imageUrl}/>

            <div className={'flex-1'}>
                <CartItem.Info details={details} name={name}/>

                <hr className={'my-3'}/>
                <div className={'flex items-center justify-between'}>

                    <CountButton value={quantity} onClick={onClickCountButton}/>

                    <div className={'flex items-center gap-3'}>

                        <CartItem.Price value={price}/>
                        <Trash2Icon onClick={onClickRemoveButton} className={'text-gray-400 cursor-pointer hover:text-gray-600'} size={16}/>

                    </div>

                </div>


            </div>
        </div>
    );
};
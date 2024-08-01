'use client'

import {WhiteBlock} from "@/app/shared/components/shared/white-block";
import {CheckoutItemDetails} from "@/app/shared/components/shared/checkoutItemDetails";
import {ArrowRight, Box, Percent, Truck} from "lucide-react";
import {Button, Skeleton} from "@/app/shared/components/ui";
import React from "react";

const TAX = 15
const DELIVERY_PRICE = 250


interface checkoutSidebarProps {
    className?: string;
    totalAmount: number;
    loading?: boolean

}


export const CheckoutSidebar = ({className, totalAmount,loading}: checkoutSidebarProps) => {


    const taxPrice = Math.floor((totalAmount * TAX) / 100)
    const totalPrice = totalAmount + taxPrice + DELIVERY_PRICE


    return (
        <div className={className}>
            <WhiteBlock className={'p-6 sticky top-4'}>
                <div className={'flex flex-col gap-1'}>
                    <span className={'text-xl'}>Итого: </span>
                    {
                        loading
                            ? <Skeleton className={'w-48 h-11 rounded-[6px]'} ></Skeleton>
                            : <span className={'text-[34px] font-extrabold h-11'}>{totalPrice} ₽</span>

                    }                </div>


                <CheckoutItemDetails
                    title={
                        <div className={'flex items-center'}>
                            <Box size={18} className={'mr-2 text-gray-300'}/>
                            Стоимость товаров:
                        </div>
                    } value={
                    loading
                    ? <Skeleton className={'w-24 h-8 rounded-[6px]'}></Skeleton>
                    : <span>{totalAmount} ₽</span>

                }/>


                <CheckoutItemDetails title={
                    <div className={'flex items-center'}>
                        <Percent size={18} className={'mr-2 text-gray-300'}/>
                        Налоги
                    </div>
                } value={
                    loading
                        ? <Skeleton className={'w-24 h-8 rounded-[6px]'}></Skeleton>
                        : <span>{taxPrice} ₽</span>

                }/>


                <CheckoutItemDetails title={
                    <div className={'flex items-center'}>
                        <Truck size={18} className={'mr-2 text-gray-300'}/>
                        Доставка
                    </div>
                } value={
                    loading
                        ? <Skeleton className={'w-24 h-8 rounded-[6px]'}></Skeleton>
                        : <span>{DELIVERY_PRICE} ₽</span>

                }/>


                <Button loading={loading} type={'submit'} className={'w-full h-14 rounded-2xl mt-6 text-base font-bold'}>
                    Перейти к оплате
                    <ArrowRight className={'w-5 ml-2'}/>
                </Button>


            </WhiteBlock>
        </div>
    );
};
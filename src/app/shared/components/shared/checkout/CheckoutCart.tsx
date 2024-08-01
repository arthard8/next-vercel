import {CheckoutItem, CheckoutItemSkeleton, WhiteBlock} from "@/app/shared/components/shared";
import {getCartItemDetails} from "../../../../../../shared/lib/get-cart-item-details";
import {PizzaSize, PizzaType} from "../../../../../../shared/constants/pizza";
import React from "react";
import {CartStateItem} from "../../../../../../shared/lib/get-cart-details";


interface CheckoutCartProps {
    items: CartStateItem[]
    onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
    removeCartItem: (id: number) => void;
    className?: string;
    loading?: boolean;

}


export const CheckoutCart = ({className, items, onClickCountButton, removeCartItem, loading}: CheckoutCartProps) => {

    return (
        <div className={className}>
            <WhiteBlock title={'1. Корзина'}>
                <div className={'flex flex-col gap-5'}>

                    {
                        loading && [...Array(4)].map((skeleton, index) => (

                            <CheckoutItemSkeleton
                                key={index}
                                className={'h-20'}

                            />

                        ))
                    }

                    {!loading &&items.map((item) => (
                        <CheckoutItem
                            key={item.id}
                            id={item.id}
                            imageUrl={item.imageUrl}
                            details={getCartItemDetails(item.pizzaType as PizzaType, item.pizzaSize as PizzaSize, item.ingredients)}
                            name={item.name}
                            price={item.price}
                            quantity={item.quantity}
                            disabled={item.disabled}
                            onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                            onClickRemove={() => removeCartItem(item.id)}
                        />
                    ))}

                </div>
            </WhiteBlock>

        </div>
    );
};
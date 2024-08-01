
import {CartDTO} from "../dto/cart.dto";
import {calcCartItemTotalPrice} from "./calc-cart-item-total-price";




export type CartStateItem = {
    id: number
    quantity: number
    price: number
    name: string
    imageUrl: string
    disabled?: boolean
    pizzaSize?: number | null;
    pizzaType?: number | null;
    ingredients: Array<{name: string, price: number}>
}

interface ReturnProps {

    totalAmount: number
    items: CartStateItem[]
}



export const getCartDetails =  (data: CartDTO): ReturnProps => {

    const items = data.items.map((item) => {


        return {
            id: item.id,
            quantity: item.quantity,
            price: calcCartItemTotalPrice(item),
            name: item.productItem.product.name,
            imageUrl: item.productItem.product.imageUrl,
            pizzaSize: item.productItem.size,
            pizzaType: item.productItem.pizzaType,
            disabled: false,
            ingredients: item.ingredients.map((item) => ({
                name: item.name,
                price: item.price
            }))
        }
    }) as CartStateItem[]



return {

    items,
    totalAmount: data.totalAmount


}

}
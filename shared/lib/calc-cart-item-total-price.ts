import {CartItemDTO} from "../dto/cart.dto";

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {



    const ingredientPrice =  item.ingredients.reduce((acc, cur) =>  acc + cur.price,  0)

    return (ingredientPrice + item.productItem.price) * item.quantity

}
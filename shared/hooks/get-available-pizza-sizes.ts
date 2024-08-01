import {ProductItem} from "@prisma/client";
import {pizzaSizes, PizzaType} from "../constants/pizza";


export const getAvailablePizzaSizes = (items: ProductItem[], size: number, type: PizzaType ) => {








    const filteredPizzaByType = items.filter((item) => item.pizzaType === type)
    return pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzaByType.some((pizza) => Number(pizza.size) === Number(item.value))
}))



};
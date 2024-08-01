import {Ingredient, ProductItem} from "@prisma/client";
import {PizzaSize, PizzaType} from "../constants/pizza";



/**
 * Функция подсчета общей стоимости пиццы
 *
 *  @param  items - список пицц,
 *  @param  ingredients - список ингредиентов,
 *  @param  type - тип пиццы,
 *  @param  size - размер пиццы,
 *  @param  selectedIngredients - выбранные ингредиенты
 *
 *@returns Общая стоимость
 * */
export const calcTotalPizzaPrice = (items: ProductItem[],
                                    ingredients: Ingredient[],
                                    type: PizzaType,
                                    size: PizzaSize,
                                    selectedIngredients: Set<number>): number => {



    const pizzaPriceType = items.find((item) => item.pizzaType === type && item.size === size)?.price ?? 0
    const WithIngredients = ingredients.reduce((acc: any, cur: any): any => {

        if (selectedIngredients.has(cur.id)) {
            return acc + cur.price
        }
        return acc

    }, 0)


    return WithIngredients + pizzaPriceType



}
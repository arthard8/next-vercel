import { useSearchParams} from "next/navigation";
import {useSet} from "react-use";

import {useMemo, useState} from "react";


enum SEARCH_PARAMS {
    PRICE_FROM = 'priceFrom',
    PRICE_TO = 'priceTo',
    PIZZA_TYPES = 'pizzaTypes',
    SIZES = 'sizes',
    INGREDIENTS = 'ingredients'
}


interface PropsPrice {
    priceFrom?: number;
    priceTo?: number;
}

export interface QueryFilters extends PropsPrice {
    pizzaTypes: string
    sizes: string
    ingredients: string
}

export interface Filters {

    pizzaTypes: Set<string>
    sizes: Set<string>
    selectedIngredients: Set<string>
    prices: PropsPrice

}

interface ReturnProps extends Filters {
    setPrices: (name: keyof PropsPrice, value: number) => void,
    setPizzaTypes: (value: string) => void,
    setSizes: (value: string) => void,
    setSelectedIngredients: (value: string) => void,
}


export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams()


    const searchParamsGetPizza = useSet(new Set<string>(searchParams.get(SEARCH_PARAMS.PIZZA_TYPES)?.split(',') || []))
    const searchParamsGetSizes = useSet(new Set<string>(searchParams.get(SEARCH_PARAMS.SIZES)?.split(',') || []))
    const searchParamsGetIngredients = useSet(new Set<string>(searchParams.get(SEARCH_PARAMS.INGREDIENTS)?.split(',') || []))


    /* Фильтр ингредиентов */
    const [selectedIngredients, {toggle: toggleIngredients}] = searchParamsGetIngredients


    /* Фильтр размеров */
    const [sizes, {toggle: toggleSizes}] = searchParamsGetSizes


    /* Фильтр типа пиццы */
    const [pizzaTypes, {toggle: togglePizzaTypes}] = searchParamsGetPizza


    /* Фильтр цены */
    const [prices, setPrices] = useState<PropsPrice>({
        priceFrom: Number(searchParams.get(SEARCH_PARAMS.PRICE_FROM)) || undefined,
        priceTo: Number(searchParams.get(SEARCH_PARAMS.PRICE_TO)) || undefined
    })


    const updatePrice = (name: keyof PropsPrice, value: number) => {
        setPrices((prev) => ({
            ...prev,
            [name]: value,

        }))
    }



    return useMemo(() =>
        ({

            sizes,
            pizzaTypes,
            selectedIngredients,
            prices,
            setPrices: updatePrice,
            setPizzaTypes: togglePizzaTypes,
            setSizes: toggleSizes,
            setSelectedIngredients: toggleIngredients

        }), [sizes, pizzaTypes, selectedIngredients, prices])

}







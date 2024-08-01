import React, {useEffect} from "react";
import qs from "qs";
import {Filters} from "./use-filters";
import {useRouter} from "next/navigation";

export const useQueryFilters = (filters: Filters) => {

    const isMounted = React.useRef(false)
    const router = useRouter()


    useEffect(() => {

        if (isMounted.current) {
            const params = {
                ...filters.prices,
                pizzaTypes: Array.from(filters.pizzaTypes),
                sizes: Array.from(filters.sizes),
                ingredients: Array.from(filters.selectedIngredients),
            }

            const queryString = qs.stringify(params, {
                arrayFormat: 'comma'

            })


            router.push(`?${queryString}`, {scroll: false})
        }

        isMounted.current = true
    }, [filters])


}
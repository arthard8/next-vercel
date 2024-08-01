import {useEffect, useState} from "react";
import {Ingredient} from "@prisma/client";
import {Api} from "../services/api-client";

export const useIngredients = () => {






    const [loading, setLoading] = useState<boolean>(false)
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    useEffect(() => {


        const getIngredients = async () => {

            try {
                setLoading(true)
                const response = await Api.ingredients.getAll()
                setIngredients(response)

            } catch (error) {
                console.error(error)

            } finally {
                setLoading(false)
            }
        }
        getIngredients()
    }, [])


    return {ingredients, loading}

}
import {axiosInstance} from "./axios";
import {Ingredient} from "@prisma/client";
import {ApiRoutes} from "./constants";

export const getAll = async (): Promise<Ingredient[]>  => {
    const {data} = await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)

    return data


}
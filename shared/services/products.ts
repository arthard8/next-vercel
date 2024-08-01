import {axiosInstance} from "./axios";
import {Product} from "@prisma/client";
import {ApiRoutes} from "./constants";

export const search = async (query: string): Promise<Product[]>  => {
    const {data} = await axiosInstance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, {params: {query}})

    return data


}
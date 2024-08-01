'use client'
import {cn} from "../../../../../shared/lib/utils";
import { useState} from "react";
import {useCategoryStore} from "../../../../../shared/store/category";
import {Category} from "@prisma/client";


interface CategoriesProps {
    className?: string;
    items?: Category[]
}


export const Categories = ({className, items}: CategoriesProps) => {


    const randomInteger = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min) + min)
    }

    const randomNumber = () => {
        return Promise.resolve(randomInteger(9000, 11000))
    }


    const categoryActiveId = useCategoryStore((state) => state.activeId)

    const [activeIndex, setActiveIndex] = useState(0)


    const toggleCategories = (index: number) => {

        setActiveIndex(index)


    }


    return (
        <div className={cn('inline-flex  gap-1 bg-gray-50 p-1 rounded-2xl', className)}>

            {items?.map(({name, id}, index) => (
                <a
                    className={cn(
                        'flex items-center font-bold h-11 rounded-2xl px-5',
                        categoryActiveId === id && 'bg-white shadow-md shadow-gray-200 text-primary'
                    )} key={index}
                    href={`/#${name}`}>
                    <button>{name}</button>

                </a>
            ))}

        </div>
    );
};
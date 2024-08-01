'use client'
import {Title} from "./Title";
import {cn} from "../../../../../shared/lib/utils";
import {useIntersectionObserver} from "@reactuses/core";
import {ProductCard} from "./ProductCard";
import {useEffect, useRef, useState} from "react";
import {useCategoryStore} from "../../../../../shared/store/category";
import {ProductWithRelations} from "../../../../../@types/product";

interface ProductsGroupListProps {
    title: string;
    items: ProductWithRelations[];
    categoryId: number
    className?: string;
    listClassName?: string
}


export const ProductsGroupList = ({listClassName, className, categoryId, items, title}: ProductsGroupListProps) => {



    const seActiveCategoryId = useCategoryStore((state) => state.setActiveId)


    const intersectionRef = useRef(null)


    const [entry, setEntry] = useState<IntersectionObserverEntry[]>([]);



    const stop = useIntersectionObserver(
        intersectionRef,
        (entry) => {
            setEntry(entry);
        }, {threshold: 0.4}
    );



useEffect(() => {


    if(entry[0]?.isIntersecting){
        seActiveCategoryId(categoryId)
    }




}, [categoryId, entry[0]], )



    // useEffect(() => {
    //
    //     if (entry[0]) {
    //         console.log(entry)
    //     }
    //
    // }, [categoryId, intersectionRef.current])



    return (
        <div className={className} id={title} ref={intersectionRef}>
            <Title text={title} size={"lg"} className={'font-extrabold mb-5'}/>

            <div className={cn('grid grid-cols-3 gap-[50px]')}>
                {items.map((product, i) => (

                    <ProductCard

                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.items[0].price}
                        imageUrl={product.imageUrl}
                        ingredients={product.ingredients}
                    />
                ))}
            </div>
        </div>
    );
};
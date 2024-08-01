'use client'
import {Search} from "lucide-react";
import {cn,} from "../../../../../shared/lib/utils";
import {useEffect, useState} from "react";
import Link from "next/link";
import {Api} from "../../../../../shared/services/api-client";
import {Product} from "@prisma/client";


interface searchInputProps {
    className?: string;

}

const useDebounce = (callback: () => void, delay: number, dependencies: any[]) => {

    useEffect(() => {
        const handler = setTimeout(() => {
            callback();
        }, delay);

        return () => clearTimeout(handler);
    }, [...dependencies, delay]);
};


export const SearchInput = ({className}: searchInputProps) => {


    const [focused, setFocused] = useState(false)
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [products, setProducts] = useState<Product[]>([])


    useDebounce(async () => {

        try {
            const response = await Api.products.search(searchQuery)
            setProducts(response)
        } catch (error) {
            console.log(error)
        }


    }, 250, [searchQuery])

    const onClickItem = () => {
        setSearchQuery('')
    }


    return (
        <>
            {focused && <div className={'fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30'}></div>}
            <div className={cn('flex rounded-2xl flex-1 justify-between relative h-11 z-30', className)}>
                <Search className={'absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400'}/>
                <input type="text"
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                       className={'rounded-2xl outline-none w-full bg-gray-100 pl-11 '}
                       placeholder={'Найти пиццу'}
                       onFocus={() => setFocused(true)}
                       onBlur={() => setFocused(false)}
                />


                {searchQuery.length > 0 && products.length > 0 &&
                    <div
                        className={cn('absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
                            focused && 'visible opacity-100 top-12')}>
                        {products.map((product) => (
                            (
                                <Link
                                    onClick={onClickItem}

                                    key={product.id}
                                    href={`/product/${product.id}`}
                                    className={'flex items-center hover:bg-primary/10'}>
                                    <img src={product.imageUrl}
                                         alt={product.name} width={32} height={32} className={'rounded-lg ml-2'}/>
                                    <div className={'px-3 py-2'}>
                                        {product.name}
                                    </div>
                                </Link>
                            )
                        ))}
                    </div>}
            </div>
        </>

    );
};
'use client'
import {FilterCheckboxProps, FilterCheckbox} from "./FilterCheckbox";
import {Input, Skeleton} from "../ui";
import React, {ChangeEvent, useState} from "react";


type Item = FilterCheckboxProps

type DefaultValue = {
    text: string,
    value: string
}

interface CheckboxFiltersProps {
    title: string
    items: Item[];
    defaultItems?: Item[];
    limit?: number;
    searchInputPlaceholder?: string
    onClickCheckbox?: (id: string) => void
    defaultValue?: DefaultValue[]
    className?: string;
    loading?: boolean
    selected?: Set<string>;
    name?: string
}


export const CheckboxFiltersGroup = ({
                                         title,
                                         selected,
                                         className,
                                         defaultItems,
                                         items,
                                         defaultValue,
                                         searchInputPlaceholder = 'Поиск...',
                                         limit = 5,
                                         onClickCheckbox,
                                         loading,
                                         name
                                     }: CheckboxFiltersProps) => {

    const [showAll, setShowAll] = useState<boolean | null>(false)
    const [search, setSearch] = useState<string>('')


    const list = showAll ? items : (defaultItems || items).slice(0, limit)

    const changeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const toggleShowAll = () => {
        setShowAll(prev => !prev)
    }


    if (loading) {
        return (
            <div>


                <p className='font-bold mb-3'>{title}</p>


                {Array.from({length: limit}).map((_, index) => (

                    <Skeleton key={index} className={'h-6 mb-4 rounded-[8px]'}/>

                ))}
                <Skeleton className={' w-28 h-6 mb-4 rounded-[8px]'}/>

            </div>
        )
    }

    return (
        <div className={className}>
            <p className='font-bold mb-3'>{title}</p>


            {showAll && (
                <div className='mb-5'>
                    <Input value={search} onChange={changeSearchInput} placeholder={searchInputPlaceholder}
                           className='bg-gray-50 border-none'/>
                </div>
            )}


            <div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>

                {
                    list.flatMap((item) => (
                        item.text.toLowerCase().includes(search.toLowerCase()) ? (
                            <FilterCheckbox
                                name={name}
                                text={item.text}
                                value={item.value}
                                key={String(item.value)}
                                onCheckedChange={() => onClickCheckbox?.(item.value)}
                                checked={selected?.has(item.value)}
                                endAdornment={item.endAdornment}
                            />
                        ) : []
                    ))
                }


            </div>


            {items.length > limit && (
                <div className={showAll ? 'border-t border-t-neutral-200 mt-4  ' : ''}>

                    <button onClick={toggleShowAll} className={'text-primary mt-3'}>
                        {showAll ? 'Скрыть' : 'Показать всё'}
                    </button>

                </div>
            )}


        </div>
    );
};
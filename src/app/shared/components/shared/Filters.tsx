'use client'
import {CheckboxFiltersGroup, RangeSlider, Title} from "./index";
import {Input} from "../ui";


import {useQueryFilters, useFilters, useIngredients} from "../../../../../shared/hooks";


interface FiltersProps {
    className?: string;

}


export const Filters = ({className}: FiltersProps) => {

    const {ingredients, loading} = useIngredients()
    const filters = useFilters()

    const items = ingredients.map(item => ({value: String(item.id), text: item.name}))

    useQueryFilters(filters)


    const updatePrices = (prices: number[]) => {


        filters.setPrices('priceFrom', prices[0]),
        filters.setPrices('priceTo', prices[1])

    }


    return (
        <div className={className}>
            <Title text='Фильтрация' size={'sm'} className='mb-5 font-bold'/>


            <CheckboxFiltersGroup
                title={'Тип теста'}
                name='pizzaTypes'
                onClickCheckbox={filters.setPizzaTypes}
                items={[
                    {text: 'Тонкое', value: '1'},
                    {text: 'Толстое', value: '2'}

                ]}
                className='mb-5'
                selected={filters.pizzaTypes}
            />


            <CheckboxFiltersGroup
                title={'Размеры'}
                name='sizes'
                onClickCheckbox={filters.setSizes}
                items={[
                    {value: '20', text: '20 см'},
                    {value: '30', text: '30 см'},
                    {value: '40', text: '40 см'},
                ]}
                className='mb-5'
                selected={filters.sizes}
            />

            <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
                <p className='font-bold mb-3'> Цена от и до:</p>

                <div className='flex gap-3 mb-5'>
                    <Input step={100} type="number"
                           min={0} max={1000}
                           placeholder='0'
                           value={String(filters.prices.priceFrom)}
                           onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}/>
                    <Input
                        step={100}
                        type="number"
                        min={100} max={1000}
                        placeholder='1000'
                        value={String(filters.prices.priceTo)}
                        onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
                    />
                </div>


                <RangeSlider

                    min={0}
                    max={1000}
                    step={10}
                    value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000
                    ]}
                    onValueChange={(prices) => updatePrices(prices)}/>

            </div>

            <CheckboxFiltersGroup
                name='ingredients'
                onClickCheckbox={filters.setSelectedIngredients}
                items={items}
                title={'Ингредиенты'}
                className='mt-5'
                limit={6}
                defaultItems={items.slice(0, 6)}
                loading={loading}
                selected={filters.selectedIngredients}
            />

        </div>
    );
};
"use client"
import {cn} from "../../../../../shared/lib/utils";
import {PizzaImage} from "./PizzaImage";
import {Title} from "./index";
import {Button} from "../ui";
import {GroupVariants} from "./groupVariants";
import {mapPizzaType, PizzaSize, PizzaType, pizzaTypes} from "../../../../../shared/constants/pizza";
import {useEffect, useState} from "react";
import {Ingredient, ProductItem} from "@prisma/client";
import {IngredientItem} from "@/app/shared/components/shared/IngredientItem";
import {useSet} from "react-use";
import {calcTotalPizzaPrice} from "../../../../../shared/lib";
import {getAvailablePizzaSizes} from "../../../../../shared/hooks";


interface ChoosePizzaFormProps {

    imageUrl: string
    name: string;
    ingredients: Ingredient[];
    items: ProductItem[];
    onClickAddCart: (itemId: number, ingredients: number[]) => void
    className?: string;
    loading?: boolean

}


export const ChoosePizzaForm = ({
                                    className,
                                    name,
                                    imageUrl,
                                    ingredients,
                                    items,
                                    onClickAddCart,
                                    loading
                                }: ChoosePizzaFormProps) => {


    const [size, setSize] = useState<PizzaSize>(20)
    const [type, setType] = useState<PizzaType>(1)
    const [selectedIngredients, {toggle: addIngredient}] = useSet(new Set<number>([]))

    const textDetails = `${size} см, ${mapPizzaType[type]} тесто`


    const totalPizzaPrice = calcTotalPizzaPrice(items, ingredients, type, size, selectedIngredients)
    const availablePizzasSizes = getAvailablePizzaSizes(items, size, type)


    const currentItemId = items.find((item) => item.pizzaType === type && item.size === size)?.id


    useEffect(() => {
        const isAvailableSize = availablePizzasSizes?.find((item) => Number(item.value) === size && !item.disabled)
        const available = availablePizzasSizes?.find((item) => !item.disabled)

        if (!isAvailableSize && available) {
            setSize(Number(available.value) as PizzaSize)
        }


    }, [type])


    const handleClickAdd = () => {
        if (currentItemId) {

            onClickAddCart(currentItemId, Array.from(selectedIngredients))

        }

    }


    return (

        <div className={cn(className, 'flex flex-1 justify-between items-center h-auto ')}>


            <PizzaImage src={imageUrl} size={size} alt={name}></PizzaImage>


            <div className='w-[490px] bg-[#f7f6f5] p-7  flex flex-col justify-between h-[800px] '>

                <div className={''}>
                    <Title text={name} size='md' className='font-extrabold mb-1 mt-4'/>
                    <p className='text-gray-400 mb-4'>{textDetails}</p>

                    <GroupVariants
                        className={'mb-3'}
                        items={availablePizzasSizes} value={String(size)}
                        onClick={value => setSize(Number(value) as PizzaSize)}

                    />

                    <GroupVariants items={pizzaTypes} value={String(type)}
                                   onClick={value => setType(Number(value) as PizzaType)}

                    />


                </div>

                <div className={'bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar'}>
                    <div className={'grid grid-cols-3 gap-3 mt-2 mb-4'}>
                        {ingredients.map((ingredient) => (

                            <IngredientItem
                                key={ingredient.id}
                                name={ingredient.name}
                                imageUrl={ingredient.imageUrl}
                                price={ingredient.price}
                                onClick={() => addIngredient(ingredient.id)}
                                active={selectedIngredients.has(ingredient.id)}

                            />


                        ))}
                    </div>
                </div>

                <Button
                    loading={loading}
                    onClick={handleClickAdd}
                    className='  h-[55px] px-10 text-base rounded-[18px] w-full mb-4'>
                    Добавить в корзину за {totalPizzaPrice} р
                </Button>
            </div>
        </div>
    );
};
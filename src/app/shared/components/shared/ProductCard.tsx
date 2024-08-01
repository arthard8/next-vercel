'use client'
import Link from "next/link";
import {Title} from "./Title";
import {Button} from "../ui";
import {Plus} from "lucide-react";
import {Ingredient} from "@prisma/client";


interface ProductCardProps {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    ingredients: Ingredient[];
    className?: string;

}


export const ProductCard = ({className, name, price, imageUrl, ingredients, id}: ProductCardProps) => {
    return (
        <div className={className}>

            <Link href={`/product/${id}`}>

                <div className='flex justify-center p-6 bg-secondary rounded-lg h-[260px]'>

                    <img className='w-[215px] h-[215px]' src={imageUrl} alt={name}/>

                </div>

                <Title text={name} size={'sm'} className={'mb-1 mt-3 font-bold'}></Title>

                <p className={'text-sm text-gray-400'}>
                    {
                        ingredients.map((ingredient, i) => (

                            <span key={i}>{ingredient.name + ', '}</span>

                        ))
                    }
                </p>

                <div className={'flex justify-between items-center mt-4'}>

                    <span className={'text-[20px]'}>
                        от <b> {price} ₽</b>
                    </span>

                    <Button variant={"secondary"} className='text-base font-bold'>
                        <Plus size={20} className={'mr-1'}>
                            Добавить
                        </Plus>
                    </Button>

                </div>


            </Link>
        </div>
    );
};
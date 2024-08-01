import {cn} from "../../../../../shared/lib/utils";
import {CircleCheck} from "lucide-react";


interface IngredientProps {


    imageUrl: string;
    name: string;
    price: number;
    active?: boolean;
    onClick?: VoidFunction;
    className?: string;


}


export const IngredientItem = ({className, name, active, price, onClick, imageUrl}: IngredientProps) => {

    return (
        <div
            className={cn('flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white', {'border border-primary': active}, className)}
            onClick={onClick}>
            {active && <CircleCheck className='absolute top-2 right-2 text-primary'/>}
            <img alt={name} width={110} height={110} src={imageUrl}/>
            <span className={'text-xs mb-1'}>{name}</span>
            <span className={'font-bold'}>{price} ₽</span>

        </div>
    );
};
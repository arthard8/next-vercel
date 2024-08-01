'use client'
import {cn} from "../../../../../shared/lib/utils";
import {Title} from "./index";
import {Button} from "../ui";


interface ChoosePizzaFormProps {

    imageUrl: string
    name: string;
    onClickAdd?: VoidFunction
    price: number
    className?: string;
    loading?: boolean
}


export const ChooseProductForm = ({
                                      className,
                                      name,
                                      imageUrl,
                                      price,
                                      onClickAdd,

                                      loading
                                  }: ChoosePizzaFormProps) => {


    return (

        <div className={cn(className, 'flex flex-1 justify-between items-center h-[500px]')}>


            <div className='flex items-center justify-center flex-1 relative w-full '>
                <img src={imageUrl}
                     alt={name}
                     className={'relative left-2 top-2 transition-all z-10 duration-300 w-[300px] h-[300px]'}
                />
            </div>


            <div className='w-[490px] bg-[#f7f6f5] p-7 h-[500px] flex flex-col justify-between'>

                <div>
                    <Title text={name} size='md' className='font-extrabold mb-1'/>
                </div>

                <Button
                    loading={loading}
                    onClick={onClickAdd}
                    className='  h-[55px] px-10 text-base rounded-[18px] w-full mb-4'
                >
                    Добавить в корзину за {price} р
                </Button>
            </div>
        </div>
    );
};
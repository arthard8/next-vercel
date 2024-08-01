import {cn} from "../../../../../shared/lib/utils";

interface ProductImageProps {
    className?: string;
    src: string,
    alt: string,
    size: 20 | 30 | 40
}


export const PizzaImage = ({className, alt, src, size}: ProductImageProps) => {

    return (
        <div className={cn('relative items-center justify-center flex w-[500px] min-w-[490px] ml-8 ', className)}>

            <img src={src} alt={alt}
            className={cn('relative left-2 top-2 transition-all z-10 duration-300  ', {
                'w-[300px] h-[300px]': size === 20,
                'w-[400px] h-[400px]': size === 30,
                'w-[500px] h-[500px]': size === 40,

            })}

            />


            <div className={'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px] '}></div>
            <div className={'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-100 w-[370px] h-[370px] '}></div>


        </div>
    );
};
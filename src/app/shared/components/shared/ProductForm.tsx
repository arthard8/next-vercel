"use client"
import {useCartStore} from "../../../../../shared/store/cart";
import toast from "react-hot-toast";
import {ProductWithRelations} from "../../../../../@types/product";
import {ChoosePizzaForm} from "@/app/shared/components/shared/choose-pizza-form";
import {ChooseProductForm} from "@/app/shared/components/shared/ChooseProductForm";


interface ProductFormProps {
    product: ProductWithRelations;
    className?: string;
    onSubmit?: VoidFunction
}


export const ProductForm = ({className, product, onSubmit: _onSubmit}: ProductFormProps) => {

    const [addCartItem, loading] = useCartStore(state => [state.addCartItem, state.loading])
    const firstItem = product.items[0]
    const isPizzaForm = Boolean(firstItem.pizzaType)


    const onAddProduct = () => {

        addCartItem({
            productItemId: firstItem.id
        })
        toast.success('Товар добавлен в корзину')
        _onSubmit?.()
    }


    const onAddPizza = async (productItemId: number, ingredients: number[]) => {

        try {
            await addCartItem({
                productItemId,
                ingredients

            })
            toast.success('Товар добавлен в корзину')
            _onSubmit?.()

        } catch (e) {
            toast.error('Ошибка при добавлении в корзину')
            console.error(e)

        }


    }


    if (isPizzaForm) {
        return (
            <ChoosePizzaForm
                onClickAddCart={onAddPizza}
                imageUrl={product.imageUrl} name={product.name}
                ingredients={product.ingredients}
                items={product.items}
                loading={loading}
            />


        )
    }

    return (
        <ChooseProductForm
            price={firstItem.price}
            onClickAdd={onAddProduct}
            imageUrl={product.imageUrl}
            name={product.name}
            loading={loading}
        />
    )
};
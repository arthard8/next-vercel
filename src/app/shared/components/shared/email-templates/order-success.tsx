import {CartItemDTO} from "../../../../../../shared/dto/cart.dto";

interface OrderSuccess {
    className?: string;
    orderId: number;
    items: CartItemDTO[]
}


export const OrderSuccess = ({className, orderId, items}: OrderSuccess) => {

    return (
        <>
            <h1 className={className}>
                Спасибо за покупку!
            </h1>



            <p>Ваш заказ #{orderId} оплачен. Список товаров:</p>


            <hr/>


            <ul>

                {items.map((item) => (
                    <li key={item.id}>
                        {item.productItem.product.name}
                        | {item.productItem.price} ₽ x {item.quantity} шт. =
                        {item.productItem.price * item.quantity} ₽
                    </li>
                ))}

            </ul>


        </>

    );
};
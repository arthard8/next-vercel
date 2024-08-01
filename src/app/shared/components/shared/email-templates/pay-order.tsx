import * as React from 'react';

export interface PayOrderTemplateProps {
    orderId: number;
    totalAmount: number;
    paymentUrl: string;
}

export const PayOrderTemplate: React.FC<PayOrderTemplateProps> = ({orderId, totalAmount, paymentUrl}) => (
    <div>


        <h1>Заказ #{orderId}</h1>

        <p> Оплатите заказ на сумму <b>{totalAmount}</b> ₽. Перейдите по этой <a href={paymentUrl}> ссылке</a>  для оплаты
            заказа</p>


    </div>
);
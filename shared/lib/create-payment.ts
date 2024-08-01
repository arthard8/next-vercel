import axios from "axios";
import {PaymentData} from "../../@types/yookassa";



interface createPaymentProps {
    amount: number
    description: string
    orderId: number
}

export async function createPayment(details: createPaymentProps) {
    const {data} = await axios.post<PaymentData>(
        'https://api.yookassa.ru/v3/payments', {
            amount: {
                value: details.amount.toString(),
                currency: 'RUB'
            },
            capture: true,
            description: details.description,
            metadata: {
                orderId: details.orderId
            },
            confirmation: {
                type: 'redirect',
                return_url: process.env.YOOKASSA_CALLBACK_URL
            },


        },
        {
            auth: {
                username: process.env.YOOKASSA_STORE_ID as string,
                password: process.env.YOOKASSA_API_KEY as string
            },
            headers: {
                'Content-Type': 'application/json',
                'Idempotence-Key': Math.random().toString().substring(7)
            }
        }
    )

    return data
}
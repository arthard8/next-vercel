'use server'


import {CheckoutFormValues} from "@/app/shared/components/shared/checkout/schema/checkoutFormSchema";
import {prisma} from "../../prisma/prisma-client";
import {cookies} from "next/headers";
import {$Enums, Prisma} from ".prisma/client";
import OrderStatus = $Enums.OrderStatus;
import {createPayment, sendEmail} from "../../shared/lib";
import {PayOrderTemplate} from "@/app/shared/components/shared";
import {getUserSession} from "../../shared/lib/get-user-session";
import {hashSync} from "bcrypt";
import UserCreateInput = Prisma.UserCreateInput;
import {VerificationUser} from "@/app/shared/components/shared/email-templates/verification-user";

export async function createOrder(data: CheckoutFormValues) {

    try {

        const cookieStore = cookies()

        const cartToken = cookieStore.get('cartToken')?.value

        if (!cartToken) {
            throw new Error('Cart token not found')
        }
        /*
        * Находим корзину по токену
        * */
        const userCart = await prisma.cart.findFirst({
            include: {
                user: true,
                items: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            },
            where: {
                token: cartToken,
            }
        })

        /*
        * Если корзина пустая, то возвращаем ошибку
        * */

        if (!userCart) {

            throw new Error('Cart not found')

        }

        if (userCart?.totalAmount === 0) {

            throw new Error('Cart is empty')

        }

        /*
               * Создаём заказ
               * */

        const order = await prisma.order.create({
            data: {
                token: cartToken,
                fullName: data.firstName + ' ' + data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                comment: data.comment,
                totalAmount: userCart.totalAmount,
                status: OrderStatus.PENDING,
                items: JSON.stringify(userCart.items)
            }
        })

        /*
        * Очищаем totalAmount корзины
        *
        * */


        await prisma.cart.update({
            where: {
                id: userCart.id
            },
            data: {

                totalAmount: 0
            }
        })
        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id
            }
        })


        const paymentData = await createPayment({
            amount: order.totalAmount,
            description: `Next pizza / оплатите заказ # ${order.id}`,
            orderId: order.id
        })

        if (!paymentData) {
            throw new Error('Payment data not found')
        }


        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {

                paymentId: paymentData.id


            },
        })

        const paymentUrl = paymentData.confirmation.confirmation_url


        await sendEmail(data.email, `Next pizza / оплатите заказ # + ${order.id}`, PayOrderTemplate({
            orderId: order.id,
            totalAmount: order.totalAmount,
            paymentUrl
        }))


        return paymentUrl

    } catch (e) {

        console.error('[CreateOrder] Server error', e)

    }


}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
    try {
        const currentUser = await getUserSession();

        if (!currentUser) {
            throw new Error('Пользователь не найден');
        }

        const findUser = await prisma.user.findFirst({
            where: {
                //@ts-ignore
                id: Number(currentUser.id),
            },
        });

        await prisma.user.update({
            where: {
                //@ts-ignore
                id: Number(currentUser.id),
            },
            data: {
                fullName: body.fullName,
                email: body.email,
                password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
            },
        });
    } catch (err) {
        console.log('Error [UPDATE_USER]', err);
        throw err;
    }
}



export async function registerUser(body: UserCreateInput){

    try {

        const user = await prisma.user.findFirst({
            where: {
                email: body.email
            }
        })
        if(user){

            if(!user.verified){

                throw new Error('Почта не подтверждена')
            }
            console.log(user, 'user')

            throw new Error('Пользователь с таким email уже существует')
        }

const createdUser = await prisma.user.create({
    data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10)
    }
})

const code = Math.floor(100000 + Math.random() * 90000).toString()

        await prisma.verificationCode.create({
            data: {
                code,
                userId: createdUser.id
            }
        })


        await sendEmail(createdUser.email, `Next pizza / Подтверждение аккаунта`, VerificationUser({
            code
        }))



    } catch (err) {
        console.log('Error [REGISTER_USER]', err);
        throw err;
    }


}
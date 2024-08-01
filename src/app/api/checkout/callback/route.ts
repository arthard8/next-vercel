import {NextRequest, NextResponse} from "next/server";
import {PaymentCallbackData} from "../../../../../@types/yookassa";
import {prisma} from "../../../../../prisma/prisma-client";
import {$Enums} from ".prisma/client";
import OrderStatus = $Enums.OrderStatus;
import {CartItemDTO} from "../../../../../shared/dto/cart.dto";
import {sendEmail} from "../../../../../shared/lib";
import {OrderSuccess} from "@/app/shared/components/shared/email-templates/order-success";


export async function POST(req: NextRequest) {
    try {

        const body = (await req.json()) as PaymentCallbackData
        const order = await prisma.order.findFirst({
            where: {
                id: Number(body.object.metadata.order_id)
            },
        })


        if (!order) {

            return NextResponse.json({message: 'Order not found'}, {status: 404})
        }

        const isSucceeded = body.object.status === 'succeeded'

        await prisma.order.update({

            where: {
                id: order.id
            },

            data: {
                status: isSucceeded ? OrderStatus.SUCCEEDED :  OrderStatus.CANCELLED,
            }
        })

        const items = JSON.parse(order?.items  as string) as CartItemDTO[]

      if (isSucceeded) {
          await sendEmail(
              order.email,
              'Спасибо за покупку!',
              OrderSuccess({orderId: order.id, items})
          )
      } else  {

         // TODO: письмо о неуспешной оплате


      }

    } catch (e) {
        console.error('[Checkout Callback] Error:', e)


        return NextResponse.json({message: 'Error'}, {status: 500})
    }
}
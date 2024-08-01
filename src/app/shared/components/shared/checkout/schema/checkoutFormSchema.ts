import {z} from 'zod'


export const checkoutFormSchema = z.object({

    firstName: z.string().min(2, {message: 'Имя должно содержать не менее 2 символов'}),
    lastName: z.string().min(2, {message: 'Фамилия должна содержать не менее 2 символов'}),
    email: z.string().email( {message: 'Введите введите корректный адрес почты'}),
    phone: z.string().min(10, {message: 'Телефон должен содержать не менее 10 цифр'}),
    address: z.string().min(5, {message: 'Адрес должен содержать не менее 5 символов'}),
    comment: z.string().optional(),

})

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>
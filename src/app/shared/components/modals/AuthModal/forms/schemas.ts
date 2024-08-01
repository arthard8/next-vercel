
import {z} from 'zod'


export const passwordSchema =  z.string().min(4, {message: 'Минимальная длина пароля 6 символов'})

export const loginSchema = z.object({
    email: z.string().email({message: 'Введите корректную почту'}),
    password: passwordSchema,
})

export const registerSchema = loginSchema.merge(z.object({
    fullName: z.string().min(2, {message: 'Минимальная длина имени 3 символа'}),
    confirmPassword: passwordSchema,
})).refine(data => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
})


export type TFormLoginValues = z.infer<typeof loginSchema>
export type TFormRegisterValues = z.infer<typeof registerSchema>
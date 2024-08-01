'use client'
import {FormProvider, useForm} from "react-hook-form";
import {loginSchema, TFormLoginValues} from './schemas'
import {zodResolver} from "@hookform/resolvers/zod";
import {FormInput, Title} from "@/app/shared/components/shared";
import {Button} from "@/app/shared/components/ui";
import toast from "react-hot-toast";
import {signIn} from "next-auth/react";


interface LoginFormProps {
    onClose?: () => void;

    className?: string;

}


export const LoginForm = ({className, onClose}: LoginFormProps) => {


    const onSubmit = async (data: TFormLoginValues) => {
        try {

            const resp = await signIn('credentials', {
                ...data,
                redirect: false,
            })

            if (!resp?.ok) {

              throw Error()

            }


            toast.success('Вы вошли в аккаунт', {
                icon: '👏',
            })
            onClose?.()


        } catch (e) {

            console.error('Error [LOGIN]', e)
            toast.error('Произошла ошибка при входе', {
                icon: '🚫',
            })
        }
    }


    const form = useForm<TFormLoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })


    return (
        <FormProvider {...form}>

            <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(onSubmit)}>


                <div className={'flex justify-between items-center'}>
                    <div className={'mr-2'}>
                        <Title text={'Вход в аккаунт'} size={"md"} className={'font-bold'}/>
                        <p>Введите свою почту, чтобы войти в аккаунт</p>
                    </div>
                    <img src="/assets/images/phone-icon.png" alt="phone-icon" width={60} height={60}/>
                </div>

                <FormInput name={'email'} label='E-mail' required/>
                <FormInput type={'password'} name={'password'} label='Пароль' required/>


                <Button loading={form.formState.isLoading} className={'h-12 text-base'} type={'submit'}>
                    {form.formState.isSubmitting ? 'Вход...' : 'Войти'}
                </Button>

            </form>
        </FormProvider>
    );
};
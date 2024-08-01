'use client';
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {registerSchema} from "@/app/shared/components/modals/AuthModal/forms/schemas";
import {User} from "@prisma/client";
import toast from "react-hot-toast";
import {signOut} from "next-auth/react";
import {Container} from "@/app/shared/components/shared/Container";
import {Title} from "@/app/shared/components/shared/Title";
import {FormInput} from "@/app/shared/components/shared/form";
import {Button} from "@/app/shared/components/ui";
import {updateUserInfo} from "@/app/actions";


interface ProfileFormProps {
    className? : string;
    data: User

}


export const ProfileForm = ({className, data}: ProfileFormProps) => {

    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: data.fullName,
            email: data.email,
            password: '',
            confirmPassword: '',
        }
    })


    const onSubmit = async () => {

        try {
            await updateUserInfo({
                email: data.email,
                fullName: data.fullName,
                password: data.password,
            })

            toast.success('Данные обновлены', {
                icon: '👏',
            })

        } catch (e) {
         console.error(e)
            toast.error('Произошла ошибка', )
        }

    }

    const onClickSignOut = () => {
        signOut({
            callbackUrl: '/'
        })
    }


    return (
        <Container className="my-10">
            <Title text={`Личные данные` } size="md" className="font-bold" />

            <FormProvider {...form}>
                <form className="flex flex-col gap-5 w-96 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormInput name="email" label="E-Mail" required />
                    <FormInput name="fullName" label="Полное имя" required />

                    <FormInput type="password" name="password" label="Новый пароль" required />
                    <FormInput type="password" name="confirmPassword" label="Повторите пароль" required />

                    <Button disabled={form.formState.isSubmitting} className="text-base mt-10" type="submit">
                        Сохранить
                    </Button>

                    <Button
                        onClick={onClickSignOut}
                        variant="secondary"
                        disabled={form.formState.isSubmitting}
                        className="text-base"
                        type="button">
                        Выйти
                    </Button>
                </form>
            </FormProvider>
        </Container>

    );
};
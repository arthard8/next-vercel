import {FormInput, WhiteBlock} from "@/app/shared/components/shared";
import React from "react";


interface CheckoutPersonalInfoProps {
    className?: string;
}


export const CheckoutPersonalInfo = ({className, }: CheckoutPersonalInfoProps) => {

    return (

        <WhiteBlock title={'2. Персональные данные'} className={className}>

            <div className={'grid grid-cols-2 gap-5'}>
                <FormInput name={'firstName'} className={'text-base'} placeholder={'Имя'}/>
                <FormInput name={'lastName'} className={'text-base'} placeholder={'Фамилия'}/>
                <FormInput name={'email'} className={'text-base'} placeholder={'E-Mail'}/>
                <FormInput name={'phone'} className={'text-base'} placeholder={'Телефон'}/>
            </div>

        </WhiteBlock>

    );
};
'use client'
import {ErrorText, WhiteBlock} from "@/app/shared/components/shared";
import React from "react";
import {FormTextarea} from "@/app/shared/components/shared/form/form-textarea";
import {AddressInput} from "@/app/shared/components/shared/AddressInput";
import {Controller, useFormContext} from "react-hook-form";


interface CheckoutAdressFormProps {
    className?: string;
}


export const CheckoutAddressForm = ({className}: CheckoutAdressFormProps) => {
    const {control} = useFormContext()


    return (
        <WhiteBlock title={'3. Адрес доставки'} className={className}>

            <div className={'flex flex-col gap-5'}>


                <Controller
                    control={control}
                    name={'address'}
                    render={({field, fieldState}) =>
                        <>

                            <AddressInput  onChange={field.onChange}/>
                            {fieldState.error?.message && <ErrorText text={fieldState.error.message}/>}

                        </>}
                >

                </Controller>


                <FormTextarea
                    name={'comment'}
                    rows={5}
                    className={'text-base'}
                    placeholder={'Комментарий к заказу'}/>

            </div>

        </WhiteBlock>

    );
};
'use client'
import {ClearButton, ErrorText, RequiredSymbol} from "@/app/shared/components/shared";
import {Input} from "@/app/shared/components/ui";
import {useFormContext} from "react-hook-form";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    required?: boolean
    className?: string;

}


export const FormInput: React.FC<FormInputProps> = ({className, name, label, required, ...props}: FormInputProps) => {

    const {
        register,
        formState: {errors},
        setValue,
        watch
    }
        = useFormContext()


    const value = watch(name)
    const errorText = errors[name]?.message as string

    function onClickClear() {
        setValue(name, '')
    }

    return (
        <div className={className}>

            {label && (
                <p className={'font-medium mb-2'}>
                    {label} {required && <RequiredSymbol/>}
                </p>
            )}

            <div className={'relative'}>

                <Input className={'h=12 text-md'} {...register(name)}{...props}/>
                {value && <ClearButton onClick={onClickClear}/>}
            </div>

            { errorText  &&  <ErrorText text={errorText} className={'mt-2'}/>}
        </div>
    );
};
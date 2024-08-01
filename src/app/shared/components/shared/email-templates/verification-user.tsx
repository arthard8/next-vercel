interface verificationUserProps {
    className?: string;
    code: string;

}


export const VerificationUser = ({className, code}: verificationUserProps) => {

    return (
        <div className={className}>
            <p>Код подтверждения: <h2>{code}</h2></p>

            <p>
                <a href={`http://localhost:3000/api/auth/verify?code=${code}`}>Подтвердить регистрацию</a>
            </p>

        </div>
    )
};
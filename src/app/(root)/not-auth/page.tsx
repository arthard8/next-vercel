import {InfoBlock} from "@/app/shared/components/shared";

export default function UnauthorizedPage() {
    return (
        <div className={'flex flex-col items-center justify-center mt-40'}>
            <InfoBlock title={'Доступ запрещён'}
                       text={'Данную страницу могут просматривать только авторизованные пользователи'}
                       imageUrl={'/assets/images/lock.png'}/>
        </div>
    );
}
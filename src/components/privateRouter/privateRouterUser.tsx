import { message } from 'antd';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '~/app/hooks';
import { MESSAGES } from '~/constants/message.const';

type PrivateRouterUserProps = {
    children: JSX.Element;
};
const PrivateRouterUser = (props: PrivateRouterUserProps) => {
    // const {user} = JSON.parse(localStorage.getItem('user'));
    const user = useAppSelector((state: any) => {
        return state.user.user;
    });
    if (user.role === 1) {
        message.success(MESSAGES.CHECK_ROLE);
        return <Navigate to='/' />;
    }
    return props.children;
};

export default PrivateRouterUser;

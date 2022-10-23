import { message } from 'antd';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '~/app/hooks';
import { MESSAGES } from '~/constants/message.const';

type PrivateRouterProps = {
    children: JSX.Element;
};
const PrivateRouter = (props: PrivateRouterProps) => {
    const user = useAppSelector((state: any) => {
        return state.user.user;
    });
    // if (user) {
    if (user.role === 0) {
        message.success(MESSAGES.CHECK_ROLE);
        return <Navigate to='/user' />;
    }
    //     if (user.role === 1) {
    //         return <Navigate to='/' />;
    //     } else {
    //         <Navigate to='/login' />;
    //     }
    //     return props.children;
    // }
    // if (user) {
    //     if (user.role !== 1) {
    //         message.success(MESSAGES.CHECK_ROLE);
    //         return <Navigate to='/user' />;
    //     }
    // } else {
    //     message.success(MESSAGES.CHECK_ROLE);

    //     return <Navigate to='/login' />;
    // }
    return props.children;
};

export default PrivateRouter;

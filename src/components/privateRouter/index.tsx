import { message } from 'antd';
import { type } from 'os';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '~/app/hooks';
import { MESSAGES } from '~/constants/message.const';

type PrivateRouterProps = {
    children: JSX.Element
};
const PrivateRouter = (props: PrivateRouterProps) => {
    // const {user} = JSON.parse(localStorage.getItem('user'));
    const user = useAppSelector((state: any) => {
        return state.user.user;
    });
    // console.log(user);
    // console.log(user);

    if(user.role === 0) {
        message.success(MESSAGES.CHECK_ROLE);
        return <Navigate to="/user" />;
    }
    return props.children;
};

export default PrivateRouter;

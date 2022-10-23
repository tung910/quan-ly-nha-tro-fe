import { memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, MenuProps } from 'antd';
import {
    PieChartOutlined,
    CalculatorOutlined,
    HomeOutlined,
    SolutionOutlined,
    ThunderboltOutlined,
    SwapOutlined,
    AlertOutlined,
    ScheduleOutlined,
    UserOutlined,
    IdcardOutlined,
} from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import { useAppSelector } from '~/app/hooks';
import { Role } from '~/constants/const';

const cx = classNames.bind(styles);

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const itemsMenu: MenuItem[] = [
    getItem('Trang chủ', '/', <PieChartOutlined />),
    getItem('Nhà trọ', '/motel-room', <HomeOutlined />),
    getItem('Dịch vụ', '/service', <SolutionOutlined />),
    getItem('Chỉ số điện', '/data-power', <ThunderboltOutlined />),
    getItem('Chỉ số nước', '/data-water', <SwapOutlined />),
    getItem('Phát sinh', '/other-fee', <AlertOutlined />),
    getItem('Tính tiền', '/calculator-money', <CalculatorOutlined />),
    getItem('Cọc giữ phòng', '/booking', <ScheduleOutlined />),
    getItem('Tài khoản', '/tenant-account', <UserOutlined />),
];

const itemsMenuUser: MenuItem[] = [
    getItem('Thông tin khách thuê', '/user', <IdcardOutlined />),
    getItem('Nhà trọ đang ở', '/user/motel-room', <HomeOutlined />),
];

const itemsMenuUser: MenuItem[] = [
    getItem('Thông tin khách thuê', '/user', <IdcardOutlined />),
    getItem('Nhà trọ đang ở', '/user/motel-room', <HomeOutlined />),
];
const Navbar = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const handlerNavigate = ({ key }: { key: string }) => {
        navigate(key);
    };
    const user = useAppSelector((state: any) => {
        return state.user.user.role;
    });

    return (
        <nav>
            <div className={cx('logo')}></div>
            <Menu
                theme='light'
                onClick={handlerNavigate}
                selectedKeys={[pathname]}
                mode='inline'
                items={user === Role.ADMIN ? itemsMenu : itemsMenuUser}
            />
        </nav>
    );
};

export default memo(Navbar);

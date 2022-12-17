import {
    CalculatorOutlined,
    HomeOutlined,
    IdcardOutlined,
    PieChartOutlined,
    ScheduleOutlined,
    SolutionOutlined,
    SwapOutlined,
    ThunderboltOutlined,
    TransactionOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Image, Menu, MenuProps } from 'antd';
import classNames from 'classnames/bind';
import { memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '~/app/hooks';
import logo from '~/assets/logo.jpg';
import { Role } from '~/constants/const';

import styles from './Navbar.module.scss';

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
    // getItem('Phát sinh', '/other-fee', <AlertOutlined />),
    getItem('Tính tiền', '/calculator-money', <CalculatorOutlined />),
    getItem('Cọc giữ phòng', '/booking', <ScheduleOutlined />),
    getItem('Tài khoản', '/tenant-account', <UserOutlined />),
    getItem('Lịch sử thanh toán', '/payment-history', <TransactionOutlined />),
];

const itemsMenuUser: MenuItem[] = [
    getItem('Cài đặt tài khoản', '/user/profile', <IdcardOutlined />),
    getItem('Nhà trọ', '/user/motel', <HomeOutlined />),
    getItem('Nhà trọ đang ở', '/user/motel-room', <HomeOutlined />),
    getItem(
        'Lịch sử thanh toán',
        '/user/payment-history',
        <TransactionOutlined />
    ),
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
            <div className={cx('logo')}>
                <Image
                    src={logo}
                    className='img-cover'
                    preview={false}
                    loading='eager'
                    title='Nhà trọ Vương Anh'
                />
            </div>
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

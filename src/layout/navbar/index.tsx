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
} from '@ant-design/icons';
import classNames from 'classnames/bind';
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
    getItem('Phát sinh', '/other-fee', <AlertOutlined />),
    getItem('Tính tiền', '/calculator-money', <CalculatorOutlined />),
];
const Navbar = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const handlerNavigate = ({ key }: { key: string }) => {
        navigate(key);
    };
    return (
        <nav>
            <div className={cx('logo')}></div>
            <Menu
                theme='light'
                onClick={handlerNavigate}
                selectedKeys={[pathname]}
                mode='inline'
                items={itemsMenu}
            />
        </nav>
    );
};

export default memo(Navbar);

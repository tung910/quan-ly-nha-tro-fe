import { Menu, MenuProps } from 'antd';
import { PieChartOutlined, UserOutlined } from '@ant-design/icons';
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
    getItem('Trang chủ', '', <PieChartOutlined />),
    getItem('Nhà trọ', 'nha-tro', <UserOutlined />, [
        getItem('Phòng trọ', 'phong-tro'),
    ]),
];
const Navbar = () => {
    return (
        <nav>
            <div className={cx('logo')}></div>
            <Menu
                theme='light'
                defaultSelectedKeys={['1']}
                mode='inline'
                items={itemsMenu}
            />
        </nav>
    );
};

export default Navbar;

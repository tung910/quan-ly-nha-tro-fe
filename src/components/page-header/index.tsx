import { Button, PageHeader } from 'antd';
import classNames from 'classnames/bind';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import styles from './PageHeader.module.scss';

const cx = classNames.bind(styles);

export interface Props {
    title?: ReactNode | string;
    btn1?: string;
    btn2?: string;
    iconButton?: ReactNode;
    href?: string;
}
const HeaderPage = ({ title, btn1, btn2, iconButton, href }: Props) => {
    return (
        <PageHeader
            ghost={false}
            title={title}
            extra={[
                <Button
                    key={1}
                    icon={iconButton}
                    size={'large'}
                    className={cx('button')}
                >
                    <Link style={{ color: 'black' }} to={`${href}`}>
                        {btn1}
                    </Link>
                </Button>,
                <Button
                    type='primary'
                    key={2}
                    size={'large'}
                    htmlType='submit'
                    className={cx('button')}
                >
                    {btn2}
                </Button>,
            ]}
        ></PageHeader>
    );
};

export default HeaderPage;

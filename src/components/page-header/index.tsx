/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, PageHeader } from 'antd';
import classNames from 'classnames/bind';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './PageHeader.module.scss';
const cx = classNames.bind(styles);

export interface Props {
    title: ReactNode | string;
    btn?: string;
    iconButton?: any;
    href?: string;
}
const HeaderPage = ({ title, btn, iconButton, href }: Props) => {
    return (
        <PageHeader
            ghost={false}
            title={title}
            extra={[
                <Button
                    type='primary'
                    key={1}
                    icon={iconButton}
                    size={'large'}
                    className={cx('button')}
                >
                    <Link style={{ color: 'white' }} to={`${href}`}>
                        {btn}
                    </Link>
                </Button>,
            ]}
        ></PageHeader>
    );
};

export default HeaderPage;

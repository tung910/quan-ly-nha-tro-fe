import { Form, PageHeader } from 'antd';
import { useEffect, useState } from 'react';
import { useAppSelector } from '~/app/hooks';
import Tabs from '~/components/tabs';
import { TypeTabs } from '~/types/Setting.type';

import ChangeInformation from './ChangeInformation';
import ChangePassword from './ChangePassword';

const UserInformation = () => {
    const [tab, setTab] = useState('info');
    const user = useAppSelector((state: any) => state.user.user);
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            name: user.name,
            email: user.email,
            phone: user.phone,
            citizenIdentificationNumber: user.citizenIdentificationNumber,
            address: user.address,
        });
    }, [form]);

    const items: TypeTabs[] = [
        {
            label: 'Thay đổi thông tin cá nhân',
            key: 'info',
            children: <ChangeInformation user={user} form={form} />,
        },
        {
            label: 'Thay đổi mật khẩu ',
            key: 'password',
            children: <ChangePassword user={user} />,
        },
    ];

    return (
        <div>
            <div>
                <PageHeader ghost={true} title='Cài đặt tài khoản' />
            </div>

            <div style={{ marginLeft: 20 }}>
                <Tabs activeKey={tab} onChange={setTab} items={items}></Tabs>
            </div>
        </div>
    );
};

export default UserInformation;

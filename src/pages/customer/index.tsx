import { Button, Tabs, Form } from 'antd';
import ContractCustomer from '~/modules/contract-customer/ContractCustomer';
import MemberCustomer from '~/modules/member-customer/MemberCustomer';
import ServiceCustomer from '~/modules/service-customer/ServiceCustomer';
import FormCreate from '~/modules/tenant-infor/FormCreate';
import { useState } from 'react';
import styles from './Create.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
import { CheckOutlined, RollbackOutlined } from '@ant-design/icons';
import { addCustomer } from '~/api/customer.api';
import { TypeCustomer, TypeServiceCustomer } from '~/types/Customer';
const { TabPane } = Tabs;

const CustomerRedirect = () => {
    const [tenantInfor, setTenantInfor] = useState<TypeCustomer>({
        name: '',
        cmnd: '',
        dateRange: '',
        phoneNumber: '',
        issuedBy: '',
        address: '',
        gender: 1,
        email: '',
        dateOfBirth: '',
        birthPlace: '',
        carNumber: '',
        numberRoom: 1,
        priceRoom: 3000000,
        startDay: '2015-06-06',
        deposit: 0,
        paymentPeriod: 1,
        payment: 1,
    });
    const onSubmitForm = (values: string | number, name: string) => {
        setTenantInfor({ ...tenantInfor, [name]: values });
    };

    const [service, setService] = useState<TypeServiceCustomer[]>([]);
    const onGetService = (data: TypeServiceCustomer[]) => {
        setService(data);
    };

    const [member, setMember] = useState({});
    const [contract, setContract] = useState({
        coinNumber: '',
        dateStart: '',
        timeCoin: '',
        dateLate: '',
    });
    const [form]: any = Form.useForm();
    const onFinish = (values: any) => {
        const data = form.getFieldValue();
        setContract({ ...contract, ...data });
    };
    const onSave = async () => {
        const data = {
            CustomerInfo: tenantInfor,
            Service: service,
            Member: member,
            Contract: contract,
        };
        await addCustomer(data);
    };
    return (
        <div>
            <div style={{ padding: 20 }}>
                <p className={cx('title-create')}>Thêm khách thuê phòng</p>
                <Button icon={<RollbackOutlined />} className={cx('btn-back')}>
                    Quay lại
                </Button>
                <Button
                    onClick={onSave}
                    htmlType='submit'
                    type='primary'
                    className={cx('btn-submit')}
                    icon={<CheckOutlined />}
                >
                    Lưu Thông Tin
                </Button>

                <Tabs>
                    <TabPane tab='Thông tin khách thuê' key='tab-a'>
                        <FormCreate onSubmitForm={onSubmitForm} />
                    </TabPane>
                    <TabPane tab='Dịch vụ' key='tab-b'>
                        <ServiceCustomer onGetService={onGetService} />
                    </TabPane>
                    <TabPane tab='Thành viên' key='tab-c'>
                        <MemberCustomer />
                    </TabPane>
                    <TabPane tab='Hợp đồng' key='tab-d'>
                        <ContractCustomer
                            formItem={form}
                            onFinished={onFinish}
                        />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
};

export default CustomerRedirect;

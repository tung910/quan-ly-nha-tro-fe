import { Button, Tabs, Form, message, PageHeader } from 'antd';
import ContractCustomer from '~/modules/contract-customer/ContractCustomer';
import MemberCustomer from '~/modules/member-customer/MemberCustomer';
import ServiceCustomer from '~/modules/service-customer/ServiceCustomer';
import FormCreate from '~/modules/tenant-infor/FormCreate';
import { useState } from 'react';
import styles from './Create.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
import { CheckOutlined, RollbackOutlined } from '@ant-design/icons';
import { addCustomerToRoom } from '~/api/customer.api';
import { TypeCustomer } from '~/types/Customer';
import { useLocation, useNavigate } from 'react-router-dom';
import { MESSAGES } from '~/consts/message.const';
import { IService } from '~/types/Service.type';
const { TabPane } = Tabs;

const CustomerRedirect = () => {
    const { search } = useLocation();
    const roomId = new URLSearchParams(search).get('roomId') || '';
    const roomRentID = new URLSearchParams(search).get('roomRentID') || '';

    const [tenantInfor, setTenantInfor] = useState<TypeCustomer>({
        customerName: '',
        citizenIdentification: 0,
        dateRange: '',
        phone: '',
        issuedBy: '',
        address: '',
        gender: 1,
        email: '',
        dateOfBirth: '',
        birthPlace: '',
        licensePlates: '',
        motelRoomID: roomId,
        priceRoom: 3000000,
        startDate: new Date(),
        deposit: 0,
        payEachTime: 1,
        paymentPeriod: 1,
    });

    const onSubmitForm = (values: string | number, name: string) => {
        setTenantInfor({ ...tenantInfor, [name]: values });
    };

    const [service, setService] = useState<IService[]>([]);
    const onGetService = (data: IService[]) => {
        setService(data);
    };
    const navigate = useNavigate();

    const [member, setMember] = useState([]);
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
        console.log(form.getFieldValue());

        await addCustomerToRoom(data);
        await message.success(MESSAGES.ADD_SUCCESS);
        navigate('/motel-room');
    };

    return (
        <div>
            <div>
                <PageHeader
                    ghost={true}
                    title='Thêm khách thuê phòng'
                    extra={[
                        <Button
                            key={1}
                            icon={<RollbackOutlined />}
                            className={cx('btn-back')}
                        >
                            Quay lại
                        </Button>,
                        <Button
                            key={2}
                            onClick={onSave}
                            htmlType='submit'
                            type='primary'
                            className={cx('btn-submit')}
                            icon={<CheckOutlined />}
                        >
                            Lưu Thông Tin
                        </Button>,
                    ]}
                ></PageHeader>
            </div>
            <div>
                <Tabs>
                    <TabPane tab='Thông tin khách thuê' key='tab-a'>
                        <FormCreate
                            onSubmitForm={onSubmitForm}
                            roomId={roomId}
                            roomRentID={roomRentID}
                            form={form}
                        />
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

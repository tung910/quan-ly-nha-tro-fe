import { Button, Tabs, Form, message, PageHeader } from 'antd';
import ContractCustomer from '~/modules/contract-customer/ContractCustomer';
import MemberCustomer from '~/modules/member-customer/MemberCustomer';
import ServiceCustomer from '~/modules/service-customer/ServiceCustomer';
import { useEffect, useState } from 'react';
import styles from './Edit.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
import { CheckOutlined, RollbackOutlined } from '@ant-design/icons';
import { TypeCustomer } from '~/types/Customer';
import { useLocation, useNavigate } from 'react-router-dom';
import { IService } from '~/types/Service.type';
import FormEdit from '~/modules/tenant-infor/FormEdit';
import {
    editCustomerToRoom,
    getDetailCustomerToRoom,
} from '~/api/customer.api';
import { MESSAGES } from '~/consts/message.const';

const { TabPane } = Tabs;
const EditCustomerToRoom = () => {
    const { search } = useLocation();
    const [form]: any = Form.useForm();

    const roomId = new URLSearchParams(search).get('roomId') || '';
    const roomRentID = new URLSearchParams(search).get('roomRentID') || '';
    const [newdataService, setNewdataService] = useState([]);
    const [newdataMember, setNewdataMember] = useState([]);

    useEffect(() => {
        const dataRoom = async () => {
            const { data } = await getDetailCustomerToRoom(roomRentID);
            setNewdataService(data.service);
            setNewdataMember(data.member);
        };
        dataRoom();
    }, []);

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
        roomName: '',
    });
    const [contract, setContract] = useState({
        coinNumber: '',
        dateStart: '',
        timeCoin: '',
        dateLate: '',
    });
    const [member, setMember] = useState([]);

    const onGetMember = (dataSource: any) => {
        setMember(dataSource);
    };

    const [service, setService] = useState<IService[]>([]);
    const onGetService = (data: IService[]) => {
        setService(data);
    };
    const onFinish = (values: any) => {
        const data = form.getFieldValue();
        setContract({ ...contract, ...data });
    };
    const navigate = useNavigate();

    const onSave = async () => {
        const data = form.getFieldValue();
        await editCustomerToRoom(data);
        message.success(MESSAGES.EDIT_SUCCESS);
        navigate('/motel-room');
    };

    return (
        <div>
            <div>
                <PageHeader
                    ghost={true}
                    title='Cập nhật khách thuê phòng'
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
                        <FormEdit
                            onSave={onSave}
                            roomId={roomId}
                            roomRentID={roomRentID}
                            form={form}
                        />
                    </TabPane>
                    <TabPane tab='Dịch vụ' key='tab-b'>
                        <ServiceCustomer
                            roomRentID={roomRentID}
                            newdataService={newdataService}
                            onGetService={onGetService}
                        />
                    </TabPane>
                    <TabPane tab='Thành viên' key='tab-c'>
                        <MemberCustomer
                            roomRentID={roomRentID}
                            newdataMember={newdataMember}
                            onGetMember={onGetMember}
                        />
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

export default EditCustomerToRoom;

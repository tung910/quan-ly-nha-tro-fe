import { Button, Tabs, Form, message, PageHeader } from 'antd';
import moment from 'moment';
import ContractCustomer from '~/modules/contract-customer/ContractCustomer';
import MemberCustomer from '~/modules/member-customer/MemberCustomer';
import ServiceCustomer from '~/modules/service-customer/ServiceCustomer';
import FormCreate from '~/modules/tenant-infor/FormCreate';
import { useState, useEffect } from 'react';
import styles from './Create.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
import { CheckOutlined, RollbackOutlined } from '@ant-design/icons';
import { addCustomerToRoom, getDetailCustomerToRoom } from '~/api/customer.api';
import { TypeCustomer } from '~/types/Customer';
import { useLocation, useNavigate } from 'react-router-dom';
import { MESSAGES } from '~/consts/message.const';
import { IService } from '~/types/Service.type';
const { TabPane } = Tabs;

const dateFormat = 'DD-MM-YYYY';
const CustomerRedirect = () => {
    const { search } = useLocation();
    const roomId = new URLSearchParams(search).get('roomId') || '';
    const [form]: any = Form.useForm();
    const roomRentID = new URLSearchParams(search).get('roomRentID') || '';
    const [newdataService, setNewdataService] = useState([]);
    const [newdataMember, setNewdataMember] = useState([]);
    useEffect(() => {
        if (roomRentID) {
            const dataRoom = async () => {
                const { data } = await getDetailCustomerToRoom(roomRentID);
                setNewdataService(data.service);
                setNewdataMember(data.member);

                form.setFieldsValue({
                    ...data,
                    dateOfBirth: data.dateOfBirth
                        ? moment(data.dateOfBirth, dateFormat)
                        : '',
                    startDate: moment(data.startDate, dateFormat),
                });
            };
            dataRoom();
        }
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

    const onGetMember = (dataSource: any) => {
        setMember(dataSource);
    };
    const [contract, setContract] = useState({
        coinNumber: '',
        dateStart: '',
        timeCoin: '',
        dateLate: '',
    });
    const onFinish = (values: any) => {
        const data = form.getFieldValue();
        setContract({ ...contract, ...data });
    };
    const onSave = async () => {
        if (roomRentID) {
            const data = {
                CustomerInfo: tenantInfor,
                Service: service,
                Member: member,
                Contract: contract,
            };

            // await editCustomerToRoom(data);
            // navigate('/motel-room');
        } else {
            const data = {
                CustomerInfo: tenantInfor,
                Service: service,
                Member: member,
                Contract: contract,
            };

            await addCustomerToRoom(data);
            await message.success(MESSAGES.ADD_SUCCESS);
            navigate('/motel-room');
        }
    };

    return (
        <div>
            <div>
                <PageHeader
                    ghost={true}
                    title={
                        roomRentID
                            ? 'Xem thông tin khách thuê phòng'
                            : 'Thêm khách thuê phòng'
                    }
                    extra={[
                        <Button
                            key={1}
                            icon={<RollbackOutlined />}
                            className={cx('btn-back')}
                            onClick={() => window.history.back()}
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
                            disabled={roomRentID ? true : false}
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
                            formData={form}
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

export default CustomerRedirect;

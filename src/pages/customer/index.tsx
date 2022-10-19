/* eslint-disable indent */
import { Button, Tabs, Form, PageHeader, message } from 'antd';
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
import {
    addCustomerToRoom,
    editCustomerToRoom,
    getDetailCustomerToRoom,
} from '~/api/customer.api';
import { useLocation, useNavigate } from 'react-router-dom';
import { MESSAGES } from '~/constants/message.const';
import { IService } from '~/types/Service.type';
import { TypeCustomer } from '~/types/Customer';
import { getProvinces } from '~/api/addressCheckout';
import { DateFormat } from '~/constants/const';
import uploadImg from '~/api/upload-images.api';
import { useAppDispatch } from '~/app/hooks';
import { setIsLoading } from '~/feature/service/appSlice';
const { TabPane } = Tabs;

const CustomerRedirect = () => {
    const { search } = useLocation();
    const dispatch = useAppDispatch();
    const roomName = new URLSearchParams(search).get('roomName') || '';
    const roomId = new URLSearchParams(search).get('roomId') || '';
    const motelID = new URLSearchParams(search).get('motelId') || '';
    const [img, setImg] = useState<string | ArrayBuffer | any>('');
    const [form]: any = Form.useForm();
    const roomRentID = new URLSearchParams(search).get('roomRentID') || '';
    const [provinces, setProvinces] = useState([]);
    const [newdataService, setNewdataService] = useState([]);
    const [newdataMember, setNewdataMember] = useState([]);
    const [newMotelRoomID, setNewMotelRoomID] = useState([]);

    useEffect(() => {
        if (roomRentID) {
            const dataRoom = async () => {
                const { data } = await getDetailCustomerToRoom(roomRentID);
                setNewMotelRoomID(data.motelRoomID);
                setNewdataService(data.service);
                setNewdataMember(data.member);
            };
            dataRoom();
        }
        const getDataProvince = async () => {
            const { data } = await getProvinces();
            setProvinces(data);
        };
        getDataProvince();
    }, []);

    const [service, setService] = useState<IService[]>([]);
    const onGetService = (data: IService[]) => {
        setService(data);
    };

    const navigate = useNavigate();

    const [member, setMember] = useState([]);

    const onGetMember = (dataSource: any) => {
        setMember(dataSource);
    };
    const onSave = async (values: TypeCustomer) => {
        dispatch(setIsLoading(true));
        try {
            if (roomRentID) {
                const data = {
                    _id: roomRentID,
                    CustomerInfo: {
                        ...values,
                        dateOfBirth: values.dateOfBirth
                            ? moment(values.dateOfBirth).format(
                                  DateFormat.DATE_DEFAULT
                              )
                            : undefined,
                        startDate: moment(values.startDate).format(
                            DateFormat.DATE_DEFAULT
                        ),
                        roomName,
                        motelRoomID: newMotelRoomID,
                        motelID,
                    },
                    Service: service,
                    Member: member,
                };
                await editCustomerToRoom(data);
            } else {
                const { data: resImg } = await uploadImg(img);

                const data = {
                    CustomerInfo: {
                        ...values,
                        dateOfBirth: values.dateOfBirth
                            ? moment(values.dateOfBirth).format(
                                  DateFormat.DATE_DEFAULT
                              )
                            : undefined,
                        startDate: moment(values.startDate).format(
                            DateFormat.DATE_DEFAULT
                        ),
                        dateStart: moment(values.dateStart).format(
                            DateFormat.DATE_DEFAULT
                        ),
                        motelRoomID: roomId,
                        motelID,
                        roomName,
                        image: resImg.secure_url,
                    },
                    Service: service,
                    Member: member,
                };
                await addCustomerToRoom(data);
            }
            dispatch(setIsLoading(false));
            message.success(MESSAGES.ADD_SUCCESS);
            navigate('/motel-room');
        } catch (error) {
            //
        }
    };

    return (
        <div>
            <div>
                <PageHeader
                    ghost={true}
                    title={
                        window.location.pathname === '/customer/create'
                            ? 'Thêm thông tin khách thuê phòng'
                            : window.location.pathname === '/customer/view'
                            ? 'Xem thông tin khách thuê phòng'
                            : 'Sửa thông tin khách thuê phòng'
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
                            onClick={form.submit}
                            htmlType='submit'
                            type='primary'
                            className={cx('btn-submit')}
                            icon={<CheckOutlined />}
                            disabled={
                                window.location.pathname ===
                                    '/customer/create' ||
                                window.location.pathname === '/customer/edit'
                                    ? false
                                    : true
                            }
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
                            provinces={provinces}
                            onSave={onSave}
                            roomRentID={roomRentID}
                            form={form}
                            roomName={roomName}
                            roomId={roomId}
                            setImg={setImg}
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
                            roomRentID={roomRentID}
                            form={form}
                            onSave={onSave}
                        />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
};

export default CustomerRedirect;

import { RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import {
    Button,
    Col,
    Form,
    Input,
    InputNumber,
    PageHeader,
    Row,
    Select,
} from 'antd';
import { useEffect } from 'react';
import { getServiceAPI } from '~/api/service.api';
import { useAppDispatch } from '~/app/hooks';
import notification from '~/components/notification';
import { MESSAGES } from '~/constants/message.const';
import { serviceTypeOptions } from '~/constants/service.const';
import { createService, updateService } from '~/feature/service/serviceSlice';
import { IService } from '~/types/Service.type';
import { useGetParam } from '~/utils/helper';

const { Option } = Select;

const AddEditService = () => {
    const [param] = useGetParam('serviceId');
    const [form] = Form.useForm<IService>();
    const dispatch = useAppDispatch();

    const goBack = () => {
        window.history.back();
    };
    const onSubmit = async (value: IService) => {
        let service;
        service = serviceTypeOptions.find(
            (item) => item.serviceTypeId === +value.serviceTypeId
        );

        if (param) {
            service = serviceTypeOptions.find((item) => {
                if (Number(value.serviceTypeId)) {
                    return item.serviceTypeId === +value.serviceTypeId;
                }
                return item.serviceTypeName === String(value.serviceTypeId);
            });
            const payload = {
                ...value,
                ...service,
            };
            dispatch(updateService({ ...payload, _id: param }));
            notification({ message: MESSAGES.EDIT_SUCCESS });
            goBack();
            return;
        }
        const payload = {
            ...value,
            ...service,
        };
        await dispatch(createService(payload));
        notification({ message: MESSAGES.ADD_SUCCESS });
        goBack();
        return;
    };
    useEffect(() => {
        if (param) {
            const fetchData = async () => {
                const { data } = await getServiceAPI(param);
                form.setFieldsValue({
                    serviceName: data.serviceName,
                    serviceTypeId: data.serviceTypeName,
                    unitPrice: +data.unitPrice,
                    isActive: data.isActive,
                    note: data.note,
                });
            };
            fetchData();
        }
    }, [param]);

    return (
        <div>
            <Form
                labelCol={{ span: 9 }}
                wrapperCol={{ span: 16 }}
                size={'large'}
                onFinish={onSubmit}
                form={param ? form : undefined}
            >
                <div>
                    <PageHeader
                        ghost={true}
                        title={`${param ? 'Sửa' : 'Thêm'} dịch vụ`}
                        extra={[
                            <Button
                                type='ghost'
                                key={1}
                                icon={<RollbackOutlined />}
                                onClick={goBack}
                            >
                                Quay về
                            </Button>,
                            <Button
                                type='primary'
                                key={2}
                                icon={<SaveOutlined />}
                                htmlType='submit'
                            >
                                Lưu
                            </Button>,
                        ]}
                    ></PageHeader>
                </div>
                <Row gutter={20}>
                    <Col span={12}>
                        <Form.Item
                            label={<>Tên dịch vụ</>}
                            labelAlign='left'
                            name='serviceName'
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Vui lòng không bỏ trống trường này!',
                                },
                            ]}
                            validateTrigger={['onBlur', 'onChange']}
                        >
                            <Input autoFocus />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col span={12}>
                        <Form.Item
                            label={<>Loại dịch vụ</>}
                            labelAlign='left'
                            name='serviceTypeId'
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Vui lòng nhập tên người dùng của bạn!',
                                },
                            ]}
                            validateTrigger={['onBlur', 'onChange']}
                        >
                            <Select>
                                {serviceTypeOptions.map((serviceType) => (
                                    <Option key={serviceType.serviceTypeId}>
                                        {serviceType.serviceTypeName}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col span={12}>
                        <Form.Item
                            label={<>Đơn giá</>}
                            labelAlign='left'
                            name='unitPrice'
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Vui lòng không bỏ trống trường này!',
                                },
                            ]}
                            validateTrigger={['onBlur', 'onChange']}
                        >
                            <InputNumber
                                formatter={(value) =>
                                    ` ${value}`.replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ','
                                    )
                                }
                                parser={(value: any) =>
                                    value.replace(/\$\s?|(,*)/g, '')
                                }
                                addonAfter='VNĐ'
                                style={{ width: 380 }}
                                maxLength={8}
                                min={0}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        {/* <Form.Item name='isActive' valuePropName='checked'>
                            <Checkbox checked={true}>Sử dụng</Checkbox>
                        </Form.Item> */}
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            name='note'
                            label='Ghi chú'
                            labelAlign='left'
                        >
                            <Input.TextArea allowClear style={{ width: 960 }} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default AddEditService;

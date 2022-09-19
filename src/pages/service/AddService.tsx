import {
    Button,
    Col,
    PageHeader,
    Row,
    Form,
    Input,
    Select,
    Checkbox,
    InputNumber,
} from 'antd';
import { RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import { serviceTypeOptions } from '~/consts/service.const';
import { IService } from '~/types/Service.type';
import { createService } from '~/feature/service/serviceSlice';
import { useAppDispatch } from '~/app/hooks';
const { Option } = Select;

const AddService = () => {
    const dispatch = useAppDispatch();
    const goBack = () => {
        window.history.back();
    };
    const onSubmit = async (value: IService) => {
        const service = serviceTypeOptions.find(
            (item) => item.serviceTypeId === +value.serviceTypeId
        );
        const payload = {
            ...value,
            ...service,
        };

        await dispatch(createService(payload));
    };
    return (
        <div>
            <Form
                labelCol={{ span: 9 }}
                wrapperCol={{ span: 16 }}
                size={'large'}
                onFinish={onSubmit}
            >
                <div>
                    <PageHeader
                        ghost={true}
                        title='Danh sách dịch vụ'
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
                            <InputNumber addonAfter='VND' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name='isActive' valuePropName='checked'>
                            <Checkbox checked={true}>Sử dụng</Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            name='note'
                            label='Ghi chú'
                            labelAlign='left'
                        >
                            <Input.TextArea allowClear />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default AddService;

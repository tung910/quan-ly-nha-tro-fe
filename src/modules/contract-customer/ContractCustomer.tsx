import { Form, Button, Row, Col, Input, DatePicker } from 'antd';
import styles from './Contract.module.scss';
import { DownloadOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import moment from 'moment';
import { exportHtmlToWord } from '~/utils/helper';
import { exportWordContract } from '~/api/export.api';
import { DateFormat } from '~/constants/const';

const cx = classNames.bind(styles);
type Props = {
    onSave: (values: any) => void;
    form: any;
    roomRentID: string;
};

const ContractCustomer = ({ onSave, form, roomRentID }: Props) => {
    const handleDownloadContract = async () => {
        const { data } = await exportWordContract(roomRentID);
        await exportHtmlToWord(data);
    };
    return (
        <div>
            <Form
                autoComplete='off'
                className={cx('form-create')}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ marginTop: 20, padding: 20 }}
                // form={form}
                onFinish={onSave}
            >
                <p className={cx('title-contract')}>
                    Các thông tin nhập ở đây sẽ được sử dụng cho việc xuất/ in
                    hợp đồng thuê phòng.
                </p>
                {/* Row 1 */}
                <Row>
                    <Col span={8}>
                        <Form.Item
                            label={<>Số hợp đồng</>}
                            colon={false}
                            labelAlign='left'
                            name='coinNumber'
                        >
                            <Input style={{ width: 400 }} autoFocus />
                        </Form.Item>
                    </Col>
                    <Col span={8} offset={4}>
                        <Form.Item
                            label={<>Ngày bắt đầu</>}
                            colon={false}
                            labelAlign='left'
                            name='dateStart'
                            initialValue={moment(new Date())}
                        >
                            <DatePicker
                                format={DateFormat.DATE_DEFAULT}
                                style={{ width: 400 }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                {/* Row 2 */}
                <Row>
                    <Col span={8}>
                        <Form.Item
                            label={<>Thời gian hợp đồng</>}
                            colon={false}
                            labelAlign='left'
                            name='timeCoin'
                        >
                            <Input style={{ width: 400 }} suffix={'Tháng'} />
                        </Form.Item>
                    </Col>
                    <Col span={8} offset={4}>
                        <Form.Item
                            label={<>Ngày kết thúc</>}
                            colon={false}
                            labelAlign='left'
                            name='dateLate'
                        >
                            <DatePicker
                                format={DateFormat.DATE_DEFAULT}
                                style={{ width: 400 }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                {roomRentID ? (
                    <Button
                        onClick={handleDownloadContract}
                        type='primary'
                        icon={<DownloadOutlined />}
                    >
                        Tải hợp đồng
                    </Button>
                ) : (
                    ''
                )}
            </Form>
        </div>
    );
};

export default ContractCustomer;

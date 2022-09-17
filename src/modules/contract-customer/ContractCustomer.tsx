import { Form, Row, Col, Input, DatePicker } from 'antd';
import styles from './Contract.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
const ContractCustomer = () => {
    return (
        <div>
            <Form
                autoComplete='off'
                className={cx('form-create')}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ marginTop: 20, padding: 20 }}
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
                            name='coinNumber'
                            colon={false}
                            labelAlign='left'
                        >
                            <Input style={{ width: 400 }} autoFocus />
                        </Form.Item>
                    </Col>
                    <Col span={8} offset={4}>
                        <Form.Item
                            label={<>Ngày bắt đầu</>}
                            name='dateStart'
                            colon={false}
                            labelAlign='left'
                        >
                            <DatePicker style={{ width: 400 }} />
                        </Form.Item>
                    </Col>
                </Row>
                {/* Row 2 */}
                <Row>
                    <Col span={8}>
                        <Form.Item
                            label={<>Thời gian hợp đồng</>}
                            name='timeCoin'
                            colon={false}
                            labelAlign='left'
                        >
                            <Input style={{ width: 400 }} suffix={'Tháng'} />
                        </Form.Item>
                    </Col>
                    <Col span={8} offset={4}>
                        <Form.Item
                            label={<>Ngày kết thúc</>}
                            name='dateLate'
                            colon={false}
                            labelAlign='left'
                        >
                            <DatePicker style={{ width: 400 }} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default ContractCustomer;

import { Card, Button, Row, Col } from 'antd';
import {
    EditOutlined,
    PlusSquareOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
export interface Props {
    unitPrice?: string;
    totalCustomer?: string;
}
const CardItem = ({ unitPrice, totalCustomer }: Props) => {
    return (
        <Card
            title='Phòng 1'
            hoverable
            extra={<a href='#'>Xem chi tiết</a>}
            style={{ width: 300 }}
        >
            <Col span={8}>
                <Button type='primary' icon={<PlusSquareOutlined />}>
                    <Link to='/customer/create' style={{ color: 'white' }}>
                        Thêm khách
                    </Link>
                </Button>
            </Col>
            <p>Số lượng khách: {totalCustomer}</p>
            <p>Giá phòng: {unitPrice}</p>
            <Row>
                <Col span={8}>
                    <Button type='primary' icon={<EditOutlined />}>
                        Sửa
                    </Button>
                </Col>
                <Col span={8}>
                    <Button type='primary' icon={<DeleteOutlined />} danger>
                        Xóa
                    </Button>
                </Col>
            </Row>
        </Card>
    );
};

export default CardItem;

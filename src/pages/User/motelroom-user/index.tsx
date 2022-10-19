import { PageHeader } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import Table from '~/components/table';
const UserMotelRoom = () => {
    const columns: ColumnsType = [
        {
            title: 'Nhà',
            dataIndex: '',
            key: '',
        },
        {
            title: 'Phòng',
            dataIndex: 'roomName',
            key: 'roomName',
        },
        {
            title: 'Tiền phòng',
            dataIndex: '',
            key: '',
        },
        {
            title: 'Chỉ số điện',
            dataIndex: '',
            key: '',
        },
        {
            title: 'Chỉ số nước',
            dataIndex: '',
            key: '',
        },
    ];
    return (
        <div>
            <div>
                <PageHeader ghost={true} title='Thông tin nhà trọ đang ở' />
            </div>

            <div>
                <Table columns={columns as ColumnsType} dataSource={[]} />
            </div>
        </div>
    );
};

export default UserMotelRoom;

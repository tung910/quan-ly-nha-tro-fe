import { convertDate } from '~/utils/helper';

const columnsMember = [
    {
        title: 'Họ và tên',
        dataIndex: 'name',
        key: 'name',
        editable: true,
    },
    {
        title: 'Ngày sinh',
        dataIndex: 'date',
        key: 'date',
        editable: true,
        render: (date: any) => {
            return convertDate(date);
        },
    },
    {
        title: 'Giới tính',
        dataIndex: 'gender',
        key: 'gender',
        editable: true,
        render: (gender: string | number) => {
            return +gender === 1 ? 'Nam' : 'Nữ';
        },
    },
    {
        title: 'CMND/ CCCD',
        dataIndex: 'cmnd',
        key: 'cmnd',
        editable: true,
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
        key: 'address',
        editable: true,
    },
    {
        title: 'Điện thoại',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        editable: true,
    },
    {
        title: 'Số xe',
        dataIndex: 'carNumber',
        key: 'carNumber',
        editable: true,
    },
];
export { columnsMember };

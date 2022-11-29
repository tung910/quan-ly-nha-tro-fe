/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table as TableAntd } from 'antd';
import { TablePaginationConfig } from 'antd/es/table';
import { ColumnGroupType, ColumnsType } from 'antd/lib/table';
import { TableRowSelection } from 'antd/lib/table/interface';

interface Props {
    columns: (ColumnGroupType<object> | ColumnsType<object>)[] | any;
    rowKey?: string;
    dataSource: object[];
    rowSelection?: TableRowSelection<object> | any;
    bordered?: boolean;
    pagination?: TablePaginationConfig;
    components?: any;
    passProps?: any;
    style?: any;
}

const Table = (props: Props) => {
    const {
        columns,
        rowKey = '_id',
        dataSource,
        rowSelection,
        bordered = true,
        pagination,
        ...passProps
    } = props;
    return (
        <>
            <TableAntd
                columns={columns}
                rowKey={rowKey}
                dataSource={dataSource}
                rowSelection={rowSelection}
                bordered={bordered}
                pagination={pagination}
                {...passProps}
            />
        </>
    );
};

export default Table;

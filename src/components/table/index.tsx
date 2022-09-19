/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table as TableAntd } from 'antd';
import { ColumnGroupType, ColumnsType } from 'antd/lib/table';
import { TableRowSelection } from 'antd/lib/table/interface';

interface Props {
    columns: (ColumnGroupType<object> | ColumnsType<object>)[] | any;
    rowKey?: string;
    dataSource: object[];
    rowSelection?: TableRowSelection<object> | any;
    bordered?: boolean;
}

const Table = ({
    columns,
    rowKey = '_id',
    dataSource,
    rowSelection,
    bordered = true,
}: Props) => {
    return (
        <>
            <TableAntd
                columns={columns}
                rowKey={rowKey}
                dataSource={dataSource}
                rowSelection={rowSelection}
                bordered={bordered}
            />
        </>
    );
};

export default Table;

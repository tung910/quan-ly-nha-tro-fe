import { Tabs } from 'antd';
import styles from './Create.module.scss';
import classNames from 'classnames/bind';
import FormCreate from '~/modules/customer/CreateCustomer';

const CreateCustomer = () => {
    const cx = classNames.bind(styles);

    const { TabPane } = Tabs;
    return (
        <div style={{ padding: 20 }}>
            <p className={cx('title-create')}>Thêm khách thuê phòng</p>
            <Tabs>
                <TabPane tab='Thông tin khách thuê' key='tab-a'>
                    <FormCreate />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default CreateCustomer;

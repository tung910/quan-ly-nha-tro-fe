import styles from './Create.module.scss';
import classNames from 'classnames/bind';
import TabsCreate from '.';
const cx = classNames.bind(styles);

const CreateCustomer = () => {
    return (
        <div style={{ padding: 20 }}>
            <p className={cx('title-create')}>Thêm khách thuê phòng</p>
            <TabsCreate />
        </div>
    );
};

export default CreateCustomer;

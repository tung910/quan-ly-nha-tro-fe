import classNames from 'classnames/bind';
import styles from './Contract.module.scss';

const cx = classNames.bind(styles);
const PrintContract = () => {
    return <div className={cx('title-top')}>PrintContract</div>;
};

export default PrintContract;

import { notification as notificationAntd } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification';
import { NotificationType } from '~/constants/const';

interface Props {
    message: string;
    description?: string;
    type?: NotificationType;
    placement?: NotificationPlacement;
}

const notification = ({
    placement = 'topRight',
    type = NotificationType.SUCCESS,
    message,
    description,
}: Props) => {
    notificationAntd[type]({
        message,
        description,
        placement,
    });
};

export default notification;

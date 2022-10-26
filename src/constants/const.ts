enum DateFormat {
    DATE_DEFAULT = 'DD/MM/YYYY',
    TIME = 'HH:mm',
    TIME_FULL = 'HH:mm:ss',
    TIME_AM_PM = 'DD/MM/YYYY hh:mm A',
    DATE_M_D_Y = 'MM/DD/YYYY',
    DATE_M_Y = 'MM/YYYY',
    DATE_Y = 'YYYY',
    DATE_M = 'MM',
}

enum Role {
    ADMIN = 1,
    USER = 0,
}

enum NotificationType {
    OPEN = 'open',
    SUCCESS = 'success',
    INFO = 'info',
    WARNING = 'warning',
}

const BASE_IMG =
    'https://res.cloudinary.com/dhfndew6y/image/upload/v1666108397/upload-by-nodejs/kbd0oqh53vnet31epfdf.png';

export { DateFormat, Role, BASE_IMG, NotificationType };

enum STATUS_CODE {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZE = 401,
    FORBIDDEN = 403,
    VNPAY_RESPONSE = `00`,
    NOT_FOUND = 404,
}
enum STATUS_CODE_VNPAY {
    '0_0' = 'Giao dịch thành công',
    '0_7' = 'Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).',
    '0_9' = 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.',
    '1_0' = 'Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần',
    '1_1' = 'Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.',
    '1_2' = 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.',
    '1_3' = 'Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.',
    '2_4' = 'Giao dịch không thành công do: Khách hàng hủy giao dịch',
    '5_1' = 'Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.',
    '6_5' = 'Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.',
    '7_5' = 'Ngân hàng thanh toán đang bảo trì.',
    '7_9' = 'Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch',
    '9_9' = 'Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê)',
}

export { STATUS_CODE, STATUS_CODE_VNPAY };

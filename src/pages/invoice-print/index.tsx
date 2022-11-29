import { useEffect, useLayoutEffect, useState } from 'react';
import { getCalculator } from '~/api/calculator.api';
import { generatePriceToVND, useGetParam } from '~/utils/helper';

import './Invoice.scss';

const Invoice = () => {
    const [idCalculator] = useGetParam('idCalculator');
    const [dataInvoicePrint, setdataInvoicePrint] = useState<any>({});
    const dataInvoicePrintLength = Object.keys(dataInvoicePrint).length;
    useEffect(() => {
        const handleDownloadInvoice = async () => {
            const { data } = await getCalculator(idCalculator);
            setdataInvoicePrint(data);
        };
        handleDownloadInvoice();
    }, [idCalculator]);
    useLayoutEffect(() => {
        if (dataInvoicePrintLength > 0) {
            window.print();
            window.close();
        }
    }, [dataInvoicePrintLength]);

    return (
        <>
            {dataInvoicePrintLength > 0 && (
                <div className='container'>
                    <h1 className='title'>Hoá Đơn Tiền Nhà</h1>
                    <p>
                        Khách hàng:{' '}
                        {dataInvoicePrint[0].roomRentalDetailID.customerName}
                    </p>
                    <p>
                        Phòng: {dataInvoicePrint[0].roomRentalDetailID.roomName}
                    </p>
                    <table border={1} className='section1'>
                        <thead>
                            <tr>
                                <th className='col1'>Khoản thu</th>
                                <th className='col1'>Chỉ số điện (kWh/số)</th>
                                <th className='col1'>Chỉ số nước (Khối)</th>
                                <th className='col1'>Giá phòng</th>
                                <th className='col1'>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='col2'></td>
                                <td className='col2'>
                                    {dataInvoicePrint[0].dataPowerID.useValue}
                                </td>
                                <td className='col2'>
                                    {dataInvoicePrint[0].dataWaterID.useValue}
                                </td>
                                <td className='col2'>
                                    {generatePriceToVND(
                                        dataInvoicePrint[0].totalAmount
                                    )}{' '}
                                    VNĐ
                                </td>
                                <td className='col2'>
                                    {generatePriceToVND(
                                        dataInvoicePrint[0].totalAmount
                                    )}{' '}
                                    VNĐ
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={4} className='col2'>
                                    Đã trả
                                </td>
                                <td className='col2'>
                                    {generatePriceToVND(
                                        dataInvoicePrint[0].payAmount
                                    )}{' '}
                                    VNĐ
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={4} className='col2'>
                                    Còn lại
                                </td>
                                <td className='col2'>
                                    {generatePriceToVND(
                                        dataInvoicePrint[0].remainAmount
                                    )}{' '}
                                    VNĐ
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={4} className='col2'>
                                    Tổng tiền
                                </td>
                                <td className='col2'>
                                    <span className='total'>
                                        {generatePriceToVND(
                                            dataInvoicePrint[0].remainAmount
                                        )}{' '}
                                        VNĐ
                                    </span>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    <hr />
                    <p>
                        <b>Người thanh toán: {dataInvoicePrint[0].payer}</b>
                    </p>
                </div>
            )}
        </>
    );
};

export default Invoice;

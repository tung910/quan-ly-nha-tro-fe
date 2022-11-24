import { useEffect, useLayoutEffect, useState } from 'react'
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
        }
    }, [dataInvoicePrintLength]);

 console.log('123',dataInvoicePrint)

  return (
    <>
            {dataInvoicePrintLength > 0 && (
                <div className='container'>
                    <h1>Hoá Đơn</h1>
                                    <p>
                                        - Khách hàng:{' '}
                                        {dataInvoicePrint[0].roomRentalDetailID.customerName}
                                    </p>
                                    <p>
                                        - Phòng:{' '}
                                        {dataInvoicePrint[0].roomRentalDetailID.roomName}
                                    </p>
                                    <p>
                                        - Sử dụng điện:{' '}
                                        {dataInvoicePrint[0].dataPowerID.useValue} số
                                    </p>
                                    <p>
                                        - sử dụng nước:{' '}
                                        {dataInvoicePrint[0].dataWaterID.useValue} khối
                                    </p>
                                    <hr />
                                    <p>
                                        <b>
                                            Tổng tiền:{' '}
                                            {generatePriceToVND(
                                                dataInvoicePrint[0].totalAmount
                                            )}{' '}
                                            VND
                                        </b>
                                    </p>
                                    <hr />
                                    <p>
                                        <b>Người thanh toán: {dataInvoicePrint[0].payer}</b>
                                    </p>
                                </div>
            )}
        </>
  )
}

export default Invoice
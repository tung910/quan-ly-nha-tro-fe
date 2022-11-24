import { useEffect, useLayoutEffect, useState } from 'react'
import { getCalculator } from '~/api/calculator.api';
import { generatePriceToVND, useGetParam } from '~/utils/helper';

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
                <div>
                                    <p>
                                        1.Khách hàng:{' '}
                                        {dataInvoicePrint[0].roomRentalDetailID.customerName}
                                    </p>
                                    <p>
                                        2.Phòng:{' '}
                                        {dataInvoicePrint[0].roomRentalDetailID.roomName}
                                    </p>
                                    <p>
                                        3.Sử dụng điện:{' '}
                                        {dataInvoicePrint[0].dataPowerID.useValue} số
                                    </p>
                                    <p>
                                        4.sử dụng nước:{' '}
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
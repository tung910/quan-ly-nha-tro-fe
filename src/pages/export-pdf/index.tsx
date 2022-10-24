/* eslint-disable react/no-unknown-property */
import { useEffect, useLayoutEffect, useState } from 'react';
import { exportWordContract } from '~/api/export.api';
import { generatePriceToVND, useGetParam } from '~/utils/helper';
import './Export.scss';

const ExportPdf = () => {
    const [roomRentId] = useGetParam('roomRentId');
    const [dataExport, setDataExport] = useState<any>({});
    const dataExportLength = Object.keys(dataExport).length;
    useEffect(() => {
        const handleDownloadContract = async () => {
            const { data } = await exportWordContract(roomRentId);
            setDataExport(data);
        };
        handleDownloadContract();
    }, [roomRentId]);
    useLayoutEffect(() => {
        if (dataExportLength > 0) {
            window.print();
        }
    }, [dataExportLength]);

    return (
        <>
            {dataExportLength > 0 && (
                <div className='WordSection1'>
                    <p
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '0cm',
                            marginLeft: '0cm',
                            textAlign: 'center',
                            textIndent: '18pt',
                            lineHeight: '115%',
                        }}
                    >
                        <span>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</span>
                    </p>
                    <p
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '0cm',
                            marginLeft: '0cm',
                            textAlign: 'center',
                            textIndent: '18pt',
                            lineHeight: '115%',
                        }}
                    >
                        <span lang='EN-US'>Độc Lập - Tự Do - Hạnh Phúc</span>
                    </p>
                    <p
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '0cm',
                            marginLeft: '0cm',
                            textAlign: 'center',
                            textIndent: '18pt',
                            lineHeight: '115%',
                        }}
                    >
                        <span lang='EN-US'>
                            ---oOo---&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                    </p>
                    <p
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '6pt',
                            marginLeft: '0cm',
                            textAlign: 'center',
                            textIndent: '18pt',
                            lineHeight: '115%',
                        }}
                    >
                        <span lang='EN-US'>&nbsp;&nbsp; </span>
                        <strong>
                            <span
                                lang='EN-US'
                                style={{
                                    fontSize: '16pt',
                                    lineHeight: '115%',
                                }}
                            >
                                HỢP ĐỒNG CHO THUÊ PHÒNG TRỌ
                            </span>
                        </strong>
                        <span lang='EN-US'></span>
                    </p>
                    <p
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '6pt',
                            marginLeft: '0cm',
                            textAlign: 'center',
                            textIndent: '18pt',
                            lineHeight: '115%',
                        }}
                    >
                        <strong>
                            <span
                                lang='EN-US'
                                style={{
                                    fontSize: '14pt',
                                    lineHeight: '115%',
                                }}
                            >
                                Số: Ngày:
                            </span>
                        </strong>
                        <span lang='EN-US'></span>
                    </p>
                    <p style={{ marginLeft: '36pt' }}>
                        <span lang='EN-US'>
                            -&nbsp;&nbsp; Căn cứ Bộ luật dân sự của nước Cộng
                            hoà xã hội chủ nghĩa Việt nam có hiệu lực từ ngày
                            01/01/2006;
                        </span>
                    </p>
                    <p style={{ marginLeft: '36pt' }}>
                        <span lang='EN-US'>
                            -&nbsp;&nbsp; Căn cứ nhu cầu và khả năng của hai
                            bên,
                        </span>
                    </p>
                    <p>
                        <em>
                            <span lang='EN-US'>Hôm nay, ngày</span>
                        </em>
                        <span className='MsoCommentReference'>
                            <span lang='EN-US' style={{ fontSize: '8pt' }}>
                                &nbsp;
                            </span>
                        </span>
                        <em>
                            <span lang='EN-US'>tháng </span>
                        </em>
                        <span className='MsoCommentReference'>
                            <span lang='EN-US' style={{ fontSize: '8pt' }}>
                                &nbsp;
                            </span>
                        </span>
                        <em>
                            <span lang='EN-US'>
                                năm tại địa chỉ {dataExport.motel.name}{' '}
                                {dataExport.motel.address}{' '}
                                {dataExport.motel.district}{' '}
                                {dataExport.motel.province}, chúng tôi gồm có:
                            </span>
                        </em>
                        <span lang='EN-US'></span>
                    </p>
                    <p
                        style={{
                            marginTop: '1pt',
                            marginRight: '0cm',
                            marginBottom: '1pt',
                            marginLeft: '0cm',
                            lineHeight: '115%',
                        }}
                    >
                        <strong>
                            <u>
                                <span
                                    lang='EN-US'
                                    style={{
                                        fontSize: '13pt',
                                        lineHeight: '115%',
                                        color: '#333333',
                                        background: 'white',
                                    }}
                                >
                                    BÊN A : BÊN CHO THUÊ
                                </span>
                            </u>
                        </strong>
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '11pt',
                                lineHeight: '115%',
                                fontFamily: '"Arial", sans-serif',
                                color: 'black',
                            }}
                        ></span>
                    </p>
                    <p
                        style={{
                            marginTop: '1pt',
                            marginRight: '0cm',
                            marginBottom: '1pt',
                            marginLeft: '0cm',
                            lineHeight: '115%',
                        }}
                    >
                        <strong>
                            <span
                                lang='EN-US'
                                style={{
                                    fontSize: '13pt',
                                    lineHeight: '115%',
                                    color: 'black',
                                    background: 'white',
                                }}
                            >
                                Ông/bà
                            </span>
                        </strong>
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '13pt',
                                lineHeight: '115%',
                                color: 'black',
                                background: 'white',
                            }}
                        >
                            : {dataExport.lessor?.name}{' '}
                        </span>
                        <span className='MsoCommentReference'>
                            <span
                                lang='EN-US'
                                style={{
                                    fontSize: '8pt',
                                    lineHeight: '115%',
                                }}
                            >
                                &nbsp;
                            </span>
                        </span>
                        <strong>
                            <span
                                lang='EN-US'
                                style={{
                                    fontSize: '13pt',
                                    lineHeight: '115%',
                                    color: 'black',
                                    background: 'white',
                                }}
                            >
                                Năm sinh
                            </span>
                        </strong>
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '13pt',
                                lineHeight: '115%',
                                color: 'black',
                                background: 'white',
                            }}
                        >
                            : {dataExport.lessor?.dateOfBirth}{' '}
                        </span>
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '11pt',
                                lineHeight: '115%',
                                fontFamily: '"Arial", sans-serif',
                                color: 'black',
                            }}
                        ></span>
                    </p>
                    <p
                        style={{
                            marginTop: '1pt',
                            marginRight: '0cm',
                            marginBottom: '1pt',
                            marginLeft: '0cm',
                            lineHeight: '115%',
                        }}
                    >
                        <strong>
                            <span
                                lang='EN-US'
                                style={{
                                    fontSize: '13pt',
                                    lineHeight: '115%',
                                    color: 'black',
                                    background: 'white',
                                }}
                            >
                                CMND số
                            </span>
                        </strong>
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '13pt',
                                lineHeight: '115%',
                                color: 'black',
                                background: 'white',
                            }}
                        >
                            : {dataExport.lessor?.citizenIdentificationNumber}
                        </span>
                        <span className='MsoCommentReference'>
                            <span
                                lang='EN-US'
                                style={{
                                    fontSize: '8pt',
                                    lineHeight: '115%',
                                }}
                            >
                                &nbsp;
                            </span>
                        </span>
                        <strong>
                            <span
                                lang='EN-US'
                                style={{
                                    fontSize: '13pt',
                                    lineHeight: '115%',
                                    color: 'black',
                                    background: 'white',
                                }}
                            >
                                Ngày cấp:{' '}
                            </span>
                        </strong>
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '13pt',
                                lineHeight: '115%',
                                color: 'black',
                                background: 'white',
                            }}
                        >
                            {dataExport.lessor?.dateRange}{' '}
                        </span>
                        <span className='MsoCommentReference'>
                            <span
                                lang='EN-US'
                                style={{
                                    fontSize: '8pt',
                                    lineHeight: '115%',
                                }}
                            ></span>
                        </span>
                        <strong>
                            <span
                                lang='EN-US'
                                style={{
                                    fontSize: '13pt',
                                    lineHeight: '115%',
                                    color: 'black',
                                    background: 'white',
                                }}
                            >
                                Nơi cấp:
                            </span>
                        </strong>
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '13pt',
                                lineHeight: '115%',
                                color: 'black',
                                background: 'white',
                            }}
                        >
                            {' '}
                            {dataExport.lessor?.issuedBy}
                        </span>
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '11pt',
                                lineHeight: '115%',
                                fontFamily: '"Arial", sans-serif',
                                color: 'black',
                            }}
                        ></span>
                    </p>
                    <p
                        style={{
                            marginTop: '1pt',
                            marginRight: '0cm',
                            marginBottom: '1pt',
                            marginLeft: '0cm',
                            lineHeight: '115%',
                        }}
                    >
                        <strong>
                            <span
                                lang='EN-US'
                                style={{
                                    fontSize: '13pt',
                                    lineHeight: '115%',
                                    color: 'black',
                                    background: 'white',
                                }}
                            >
                                Địa chỉ thường trú:
                            </span>
                        </strong>
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '13pt',
                                lineHeight: '115%',
                                color: 'black',
                                background: 'white',
                            }}
                        >
                            {' '}
                            {dataExport.lessor?.address}
                        </span>

                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '11pt',
                                lineHeight: '115%',
                                fontFamily: '"Arial", sans-serif',
                                color: 'black',
                            }}
                        ></span>
                    </p>
                    <p
                        style={{
                            marginTop: '1pt',
                            marginRight: '0cm',
                            marginBottom: '1pt',
                            marginLeft: '0cm',
                            lineHeight: '115%',
                        }}
                    >
                        <strong>
                            <span
                                lang='EN-US'
                                style={{
                                    fontSize: '13pt',
                                    lineHeight: '115%',
                                    color: 'black',
                                    background: 'white',
                                }}
                            >
                                Điện thoại:
                            </span>
                        </strong>
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '13pt',
                                lineHeight: '115%',
                                color: 'black',
                                background: 'white',
                            }}
                        >
                            0353370505
                        </span>
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '11pt',
                                lineHeight: '115%',
                                fontFamily: '"Arial", sans-serif',
                                color: 'black',
                            }}
                        ></span>
                    </p>
                    <p
                        style={{
                            marginTop: '1pt',
                            marginRight: '0cm',
                            marginBottom: '1pt',
                            marginLeft: '0cm',
                            lineHeight: '115%',
                        }}
                    >
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '13pt',
                                lineHeight: '115%',
                                color: 'black',
                                background: 'white',
                            }}
                        >
                            &nbsp;
                        </span>
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '11pt',
                                lineHeight: '115%',
                                fontFamily: '"Arial", sans-serif',
                                color: 'black',
                            }}
                        ></span>
                    </p>
                    <p
                        style={{
                            marginTop: '1pt',
                            marginRight: '0cm',
                            marginBottom: '1pt',
                            marginLeft: '0cm',
                            lineHeight: '115%',
                        }}
                    >
                        <strong>
                            <u>
                                <span
                                    lang='EN-US'
                                    style={{
                                        fontSize: '13pt',
                                        lineHeight: '115%',
                                        color: '#333333',
                                        background: 'white',
                                    }}
                                >
                                    BÊN B : BÊN THUÊ
                                </span>
                            </u>
                        </strong>
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '11pt',
                                lineHeight: '115%',
                                fontFamily: '"Arial", sans-serif',
                                color: 'black',
                            }}
                        ></span>
                    </p>
                    <p
                        style={{
                            marginTop: '1pt',
                            marginRight: '0cm',
                            marginBottom: '1pt',
                            marginLeft: '0cm',
                            lineHeight: '115%',
                        }}
                    >
                        <strong>
                            <span
                                lang='EN-US'
                                style={{
                                    fontSize: '13pt',
                                    lineHeight: '115%',
                                    color: 'black',
                                    background: 'white',
                                }}
                            >
                                Ông/bà:
                            </span>
                        </strong>
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '13pt',
                                lineHeight: '115%',
                                color: 'black',
                                background: 'white',
                            }}
                        >
                            {dataExport.roomRentalDetail?.customerName}
                        </span>
                        <span className='MsoCommentReference'>
                            <span
                                lang='EN-US'
                                style={{
                                    fontSize: '8pt',
                                    lineHeight: '115%',
                                }}
                            >
                                &nbsp;
                            </span>
                        </span>
                        <strong>
                            <span
                                lang='EN-US'
                                style={{
                                    fontSize: '13pt',
                                    lineHeight: '115%',
                                    color: 'black',
                                    background: 'white',
                                }}
                            >
                                Năm sinh:
                            </span>
                        </strong>
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '13pt',
                                lineHeight: '115%',
                                color: 'black',
                                background: 'white',
                            }}
                        >
                            {dataExport.roomRentalDetail?.dateOfBirth}
                        </span>
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '11pt',
                                lineHeight: '115%',
                                fontFamily: '"Arial", sans-serif',
                                color: 'black',
                            }}
                        ></span>
                    </p>
                    <p
                        style={{
                            marginTop: '1pt',
                            marginRight: '0cm',
                            marginBottom: '1pt',
                            marginLeft: '0cm',
                            lineHeight: '115%',
                        }}
                    >
                        <strong>
                            <span
                                lang='EN-US'
                                style={{
                                    fontSize: '13pt',
                                    lineHeight: '115%',
                                    color: 'black',
                                    background: 'white',
                                }}
                            >
                                CMND số:
                            </span>
                        </strong>
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '13pt',
                                lineHeight: '115%',
                                color: 'black',
                                background: 'white',
                            }}
                        >
                            {dataExport.roomRentalDetail?.citizenIdentification}{' '}
                        </span>
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '11pt',
                                lineHeight: '115%',
                                fontFamily: '"Arial", sans-serif',
                                color: 'black',
                            }}
                        ></span>
                        <strong>
                            <span
                                lang='EN-US'
                                style={{
                                    fontSize: '13pt',
                                    lineHeight: '115%',
                                    color: 'black',
                                    background: 'white',
                                }}
                            >
                                Ngày cấp:
                            </span>
                        </strong>
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '13pt',
                                lineHeight: '115%',
                                color: 'black',
                                background: 'white',
                            }}
                        >
                            {dataExport.roomRentalDetail?.dateRange}{' '}
                            <strong>Nơi cấp:</strong>{' '}
                            {dataExport.roomRentalDetail?.issuedBy}{' '}
                        </span>
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '11pt',
                                lineHeight: '115%',
                                fontFamily: '"Arial", sans-serif',
                                color: 'black',
                            }}
                        ></span>
                    </p>
                    <p
                        style={{
                            marginTop: '1pt',
                            marginRight: '0cm',
                            marginBottom: '1pt',
                            marginLeft: '0cm',
                            lineHeight: '115%',
                        }}
                    >
                        <strong>
                            <span
                                lang='EN-US'
                                style={{
                                    fontSize: '13pt',
                                    lineHeight: '115%',
                                    color: 'black',
                                    background: 'white',
                                }}
                            >
                                Địa chỉ thường trú:{' '}
                            </span>
                        </strong>
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '13pt',
                                lineHeight: '115%',
                                color: 'black',
                                background: 'white',
                            }}
                        >
                            {dataExport.roomRentalDetail?.address}{' '}
                        </span>
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '11pt',
                                lineHeight: '115%',
                                fontFamily: '"Arial", sans-serif',
                                color: 'black',
                            }}
                        ></span>
                    </p>
                    <p
                        style={{
                            marginTop: '1pt',
                            marginRight: '0cm',
                            marginBottom: '1pt',
                            marginLeft: '0cm',
                            lineHeight: '115%',
                        }}
                    >
                        <strong>
                            <span
                                lang='EN-US'
                                style={{
                                    fontSize: '13pt',
                                    lineHeight: '115%',
                                    color: 'black',
                                }}
                            >
                                Điện thoại:
                            </span>
                        </strong>
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '13pt',
                                lineHeight: '115%',
                                color: 'black',
                            }}
                        >
                            {' '}
                            {dataExport.roomRentalDetail?.phone}{' '}
                        </span>
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '11pt',
                                lineHeight: '115%',
                                fontFamily: '"Arial", sans-serif',
                                color: 'black',
                            }}
                        ></span>
                    </p>
                    <p
                        style={{
                            marginTop: '1pt',
                            marginRight: '0cm',
                            marginBottom: '1pt',
                            marginLeft: '0cm',
                            lineHeight: '115%',
                        }}
                    >
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '13pt',
                                lineHeight: '115%',
                                color: 'black',
                            }}
                        >
                            Hai bên cùng thỏa thuận ký hợp đồng với những nội
                            dung sau:
                        </span>
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '11pt',
                                lineHeight: '115%',
                                fontFamily: '"Arial", sans-serif',
                                color: 'black',
                            }}
                        ></span>
                    </p>
                    <p
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '6pt',
                            marginLeft: '0cm',
                            textIndent: '18pt',
                            lineHeight: '115%',
                        }}
                    >
                        <strong>
                            <span lang='EN-US'>Điều 1:</span>
                        </strong>
                        <span lang='EN-US'></span>
                    </p>
                    <p
                        className='MsoNormal'
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '6pt',
                            marginLeft: '54pt',
                            textIndent: '-18pt',
                            lineHeight: '115%',
                        }}
                    >
                        {/* [if !supportLists]*/}
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '10pt',
                                lineHeight: '115%',
                                fontFamily: 'Symbol',
                            }}
                        >
                            <span>
                                ·
                                <span style={{ font: '7pt "Times New Roman"' }}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </span>
                            </span>
                        </span>
                        {/* [endif]*/}
                        <span lang='EN-US'>
                            Bên A đồng ý cho bên B thuê phòng trọ số{' '}
                            {dataExport.roomRentalDetail.roomName}
                        </span>
                        <span className='MsoCommentReference'>
                            <span
                                lang='EN-US'
                                style={{
                                    fontSize: '8pt',
                                    lineHeight: '115%',
                                }}
                            >
                                &nbsp;
                            </span>
                        </span>
                        <span lang='EN-US'>
                            thuộc địa chỉ: {dataExport.motel.name}
                            {dataExport.motel.address}{' '}
                            {dataExport.motel.district}{' '}
                            {dataExport.motel.province}{' '}
                        </span>
                    </p>
                    <p
                        className='MsoNormal'
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '6pt',
                            marginLeft: '54pt',
                            textIndent: '-18pt',
                            lineHeight: '115%',
                        }}
                    >
                        {/* [if !supportLists]*/}
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '10pt',
                                lineHeight: '115%',
                                fontFamily: 'Symbol',
                            }}
                        >
                            <span>
                                ·
                                <span style={{ font: '7pt "Times New Roman"' }}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </span>
                            </span>
                        </span>
                        {/* [endif]*/}
                        <span lang='EN-US'>
                            Thời hạn thuê phòng trọ là 12 tháng kể từ ngày{' '}
                            {dataExport.roomRentalDetail.startDate}
                        </span>
                    </p>
                    <p
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '6pt',
                            marginLeft: '18pt',
                            lineHeight: '115%',
                        }}
                    >
                        <strong>
                            <span lang='EN-US'>Điều 2 :</span>
                        </strong>
                        <span lang='EN-US'></span>
                    </p>
                    <p
                        className='MsoNormal'
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '6pt',
                            marginLeft: '54pt',
                            textIndent: '-18pt',
                            lineHeight: '115%',
                        }}
                    >
                        {/* [if !supportLists]*/}
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '10pt',
                                lineHeight: '115%',
                                fontFamily: 'Symbol',
                            }}
                        >
                            <span>
                                ·
                                <span style={{ font: '7pt "Times New Roman"' }}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </span>
                            </span>
                        </span>
                        {/* [endif]*/}
                        <span lang='EN-US'>
                            Giá tiền thuê phòng trọ là{' '}
                            {generatePriceToVND(
                                +dataExport.roomRentalDetail.priceRoom
                            )}
                        </span>
                        <span className='MsoCommentReference'>
                            <span
                                lang='EN-US'
                                style={{
                                    fontSize: '8pt',
                                    lineHeight: '115%',
                                }}
                            >
                                &nbsp;
                            </span>
                        </span>
                        <span lang='EN-US'>đồng/tháng</span>
                    </p>
                    <p
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '6pt',
                            marginLeft: '54pt',
                            lineHeight: '115%',
                        }}
                    >
                        <span lang='EN-US'>
                            {/* (<em>Bằng chữ: hai nghìn hai trăm hai mươi hai</em>) */}
                        </span>
                    </p>
                    <p
                        className='MsoNormal'
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '6pt',
                            marginLeft: '54pt',
                            textIndent: '-18pt',
                            lineHeight: '115%',
                        }}
                    >
                        {/* [if !supportLists]*/}
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '10pt',
                                lineHeight: '115%',
                                fontFamily: 'Symbol',
                            }}
                        >
                            <span>
                                ·
                                <span style={{ font: '7pt "Times New Roman"' }}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </span>
                            </span>
                        </span>
                        {/* [endif]*/}
                        <span lang='EN-US'>
                            Tiền thuê nhà bên B thanh toán cho bên A từ ngày 1-5
                            Tây hàng tháng.
                        </span>
                    </p>
                    <p
                        className='MsoNormal'
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '6pt',
                            marginLeft: '54pt',
                            textIndent: '-18pt',
                            lineHeight: '115%',
                        }}
                    >
                        {/* [if !supportLists]*/}
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '10pt',
                                lineHeight: '115%',
                                fontFamily: 'Symbol',
                            }}
                        >
                            <span>
                                ·
                                <span style={{ font: '7pt "Times New Roman"' }}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </span>
                            </span>
                        </span>
                        {/* [endif]*/}
                        <span lang='EN-US'>
                            Bên B đặt tiền thế chân trước{' '}
                            {generatePriceToVND(
                                +dataExport.roomRentalDetail.deposit
                            )}
                        </span>
                        <span className='MsoCommentReference'>
                            <span
                                lang='EN-US'
                                style={{
                                    fontSize: '8pt',
                                    lineHeight: '115%',
                                }}
                            >
                                &nbsp;
                            </span>
                        </span>
                        <span lang='EN-US'>đồng&nbsp;</span>
                    </p>
                    <p
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '6pt',
                            marginLeft: '54pt',
                            lineHeight: '115%',
                        }}
                    >
                        <span lang='EN-US'>
                            {/* (<em>Bằng chữ : không</em>) */}
                        </span>
                        <span className='MsoCommentReference'>
                            <span
                                lang='EN-US'
                                style={{
                                    fontSize: '8pt',
                                    lineHeight: '115%',
                                }}
                            >
                                &nbsp;
                            </span>
                        </span>
                        <span lang='EN-US'>cho bên A.</span>
                    </p>
                    <p
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '6pt',
                            marginLeft: '54pt',
                            lineHeight: '115%',
                        }}
                    >
                        <span lang='EN-US'>
                            Tiền thế chân sẽ được trả lại đầy đủ cho bên thuê
                            (Bên B) khi hết hợp đồng thuê phòng trọ nêu trên và
                            thanh toán đầy đủ tiền điện, nước, phí dịch vụ và
                            các khoản khác liên quan.
                        </span>
                    </p>
                    <p
                        className='MsoNormal'
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '6pt',
                            marginLeft: '54pt',
                            textIndent: '-18pt',
                            lineHeight: '115%',
                        }}
                    >
                        {/* [if !supportLists]*/}
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '10pt',
                                lineHeight: '115%',
                                fontFamily: 'Symbol',
                            }}
                        >
                            <span>
                                ·
                                <span style={{ font: '7pt "Times New Roman"' }}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </span>
                            </span>
                        </span>
                        {/* [endif]*/}
                        <span lang='EN-US'>
                            Bên B ngưng hợp đồng trước thời hạn thì phải chịu
                            mất tiền thế chân.
                        </span>
                    </p>
                    <p
                        className='MsoNormal'
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '6pt',
                            marginLeft: '54pt',
                            textIndent: '-18pt',
                            lineHeight: '115%',
                        }}
                    >
                        {/* [if !supportLists]*/}
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '10pt',
                                lineHeight: '115%',
                                fontFamily: 'Symbol',
                            }}
                        >
                            <span>
                                ·
                                <span style={{ font: '7pt "Times New Roman"' }}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </span>
                            </span>
                        </span>
                        {/* [endif]*/}
                        <span lang='EN-US'>
                            Bên A ngưng hợp đồng (lấy lại nhà) trước thời hạn
                            thì bồi thường gấp đôi số tiền bên B đã thế chân.
                        </span>
                    </p>
                    <p
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '6pt',
                            marginLeft: '18pt',
                            lineHeight: '115%',
                        }}
                    >
                        <strong>
                            <span lang='EN-US'>Điều 3 :</span>
                        </strong>
                        <span lang='EN-US'>Trách nhiệm bên A.</span>
                    </p>
                    <p
                        className='MsoNormal'
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '6pt',
                            marginLeft: '54pt',
                            textIndent: '-18pt',
                            lineHeight: '115%',
                        }}
                    >
                        {/* [if !supportLists]*/}
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '10pt',
                                lineHeight: '115%',
                                fontFamily: 'Symbol',
                            }}
                        >
                            <span>
                                ·
                                <span style={{ font: '7pt "Times New Roman"' }}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </span>
                            </span>
                        </span>
                        {/* [endif]*/}
                        <span lang='EN-US'>
                            Giao phòng trọ, trang thiết bị trong phòng trọ cho
                            bên B đúng ngày ký hợp đồng.
                        </span>
                    </p>
                    <p
                        className='MsoNormal'
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '6pt',
                            marginLeft: '54pt',
                            textIndent: '-18pt',
                            lineHeight: '115%',
                        }}
                    >
                        {/* [if !supportLists]*/}
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '10pt',
                                lineHeight: '115%',
                                fontFamily: 'Symbol',
                            }}
                        >
                            <span>
                                ·
                                <span style={{ font: '7pt "Times New Roman"' }}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </span>
                            </span>
                        </span>
                        {/* [endif]*/}
                        <span lang='EN-US'>
                            Hướng dẫn bên B chấp hành đúng các quy định của địa
                            phương, hoàn tất mọi thủ tục giấy tờ đăng ký tạm trú
                            cho bên B.
                        </span>
                    </p>
                    <p
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '6pt',
                            marginLeft: '18pt',
                            lineHeight: '115%',
                        }}
                    >
                        <span lang='EN-US'>&nbsp;</span>
                    </p>
                    <p
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '6pt',
                            marginLeft: '18pt',
                            lineHeight: '115%',
                        }}
                    >
                        <strong>
                            <span lang='EN-US'>Điều 4 :</span>
                        </strong>
                        <span lang='EN-US'>Trách nhiệm bên B.</span>
                    </p>
                    <p
                        className='MsoNormal'
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '6pt',
                            marginLeft: '54pt',
                            textIndent: '-18pt',
                            lineHeight: '115%',
                        }}
                    >
                        {/* [if !supportLists]*/}
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '10pt',
                                lineHeight: '115%',
                                fontFamily: 'Symbol',
                            }}
                        >
                            <span>
                                ·
                                <span style={{ font: '7pt "Times New Roman"' }}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </span>
                            </span>
                        </span>
                        {/* [endif]*/}
                        <span lang='EN-US'>
                            Trả tiền thuê phòng trọ hàng tháng theo hợp đồng.
                        </span>
                    </p>
                    <p
                        className='MsoNormal'
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '6pt',
                            marginLeft: '54pt',
                            textIndent: '-18pt',
                            lineHeight: '115%',
                        }}
                    >
                        {/* [if !supportLists]*/}
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '10pt',
                                lineHeight: '115%',
                                fontFamily: 'Symbol',
                            }}
                        >
                            <span>
                                ·
                                <span style={{ font: '7pt "Times New Roman"' }}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </span>
                            </span>
                        </span>
                        {/* [endif]*/}
                        <span lang='EN-US'>
                            Sử dụng đúng mục đích thuê phòng trọ, khi cần sữa
                            chữa, cải tạo theo yêu cầu sử dụng riêng phải được
                            sự đồng ý của bên A.
                        </span>
                    </p>
                    <p
                        className='MsoNormal'
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '6pt',
                            marginLeft: '54pt',
                            textIndent: '-18pt',
                            lineHeight: '115%',
                        }}
                    >
                        {/* [if !supportLists]*/}
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '10pt',
                                lineHeight: '115%',
                                fontFamily: 'Symbol',
                            }}
                        >
                            <span>
                                ·
                                <span style={{ font: '7pt "Times New Roman"' }}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </span>
                            </span>
                        </span>
                        {/* [endif]*/}
                        <span lang='EN-US'>
                            Đồ đạt trang thiết bị trong phòng trọ phải có trách
                            nhiệm bảo quản cẩn thận không làm hư hỏng mất mát.
                        </span>
                    </p>
                    <p
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '6pt',
                            marginLeft: '18pt',
                            lineHeight: '115%',
                        }}
                    >
                        <strong>
                            <span lang='EN-US'>Điều 5:</span>
                        </strong>
                        <span lang='EN-US'>Điều khoản chung.</span>
                    </p>
                    <p
                        className='MsoNormal'
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '6pt',
                            marginLeft: '54pt',
                            textIndent: '-18pt',
                            lineHeight: '115%',
                        }}
                    >
                        {/* [if !supportLists]*/}
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '10pt',
                                lineHeight: '115%',
                                fontFamily: 'Symbol',
                            }}
                        >
                            <span>
                                ·
                                <span style={{ font: '7pt "Times New Roman"' }}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </span>
                            </span>
                        </span>
                        {/* [endif]*/}
                        <span lang='EN-US'>
                            Bên A và bên B thực hiện đúng các điều khoản ghi
                            trong hợp đồng.
                        </span>
                    </p>
                    <p
                        className='MsoNormal'
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '6pt',
                            marginLeft: '54pt',
                            textIndent: '-18pt',
                            lineHeight: '115%',
                        }}
                    >
                        {/* [if !supportLists]*/}
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '10pt',
                                lineHeight: '115%',
                                fontFamily: 'Symbol',
                            }}
                        >
                            <span>
                                ·
                                <span style={{ font: '7pt "Times New Roman"' }}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </span>
                            </span>
                        </span>
                        {/* [endif]*/}
                        <span lang='EN-US'>
                            Trường hợp có tranh chấp hoặc một bên vi phạm hợp
                            đồng thì hai bên cùng nhau bàn bạc giải quyết, nếu
                            không giải quyết được thì yêu cầu cơ quan có thẩm
                            quyền giải quyết.
                        </span>
                    </p>
                    <p
                        className='MsoNormal'
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '6pt',
                            marginLeft: '54pt',
                            textIndent: '-18pt',
                            lineHeight: '115%',
                        }}
                    >
                        {/* [if !supportLists]*/}
                        <span
                            lang='EN-US'
                            style={{
                                fontSize: '10pt',
                                lineHeight: '115%',
                                fontFamily: 'Symbol',
                            }}
                        >
                            <span>
                                ·
                                <span style={{ font: '7pt "Times New Roman"' }}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </span>
                            </span>
                        </span>
                        {/* [endif]*/}
                        <span lang='EN-US'>
                            Hợp đồng được lập thành hai (02) bản có giá trị
                            ngang nhau, mỗi bên giữ một (01) bản
                        </span>
                    </p>
                    <p
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '6pt',
                            marginLeft: '18pt',
                            lineHeight: '115%',
                        }}
                    >
                        <span lang='EN-US'>&nbsp;</span>
                    </p>
                    <p
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '6pt',
                            marginLeft: '18pt',
                            textAlign: 'right',
                            lineHeight: '115%',
                        }}
                    >
                        <span lang='EN-US'>Hà Nội, ngày </span>
                        <span className='MsoCommentReference'>
                            <span
                                lang='EN-US'
                                style={{
                                    fontSize: '8pt',
                                    lineHeight: '115%',
                                }}
                            >
                                &nbsp;
                            </span>
                        </span>
                        <span lang='EN-US'>tháng </span>
                        <span className='MsoCommentReference'>
                            <span
                                lang='EN-US'
                                style={{
                                    fontSize: '8pt',
                                    lineHeight: '115%',
                                }}
                            >
                                &nbsp;
                            </span>
                        </span>
                        <span lang='EN-US'>năm</span>
                    </p>
                    <p
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '6pt',
                            marginLeft: '18pt',
                            lineHeight: '115%',
                        }}
                    >
                        <strong>
                            <span
                                lang='EN-US'
                                style={{
                                    fontSize: '14pt',
                                    lineHeight: '115%',
                                }}
                            >
                                &nbsp;
                            </span>
                        </strong>
                        <span lang='EN-US'></span>
                    </p>
                    <p
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '6pt',
                            marginLeft: '18pt',
                            textAlign: 'center',
                            lineHeight: '115%',
                        }}
                    >
                        <strong>
                            <span
                                lang='EN-US'
                                style={{
                                    fontSize: '14pt',
                                    lineHeight: '115%',
                                }}
                            >
                                BÊN A&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                BÊN B
                            </span>
                        </strong>
                        <span lang='EN-US'></span>
                    </p>
                    <p
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '6pt',
                            marginLeft: '18pt',
                            textAlign: 'center',
                            lineHeight: '115%',
                        }}
                    >
                        <span lang='EN-US'>&nbsp;</span>
                    </p>
                    <p
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '6pt',
                            marginLeft: '18pt',
                            textAlign: 'center',
                            lineHeight: '115%',
                        }}
                    >
                        <span lang='EN-US'>&nbsp;</span>
                    </p>
                    <p
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '6pt',
                            marginLeft: '18pt',
                            textAlign: 'center',
                            lineHeight: '115%',
                        }}
                    >
                        <span lang='EN-US'>&nbsp;</span>
                    </p>
                    <p
                        style={{
                            marginTop: '6pt',
                            marginRight: '0cm',
                            marginBottom: '6pt',
                            marginLeft: '18pt',
                            textAlign: 'center',
                            lineHeight: '115%',
                        }}
                    >
                        <span lang='EN-US'>
                            &nbsp;
                            <strong>
                                {dataExport.lessor?.name?.toLocaleUpperCase()}
                            </strong>
                            <span style={{ color: 'red' }}>
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                &nbsp; &nbsp; &nbsp; &nbsp;
                            </span>
                            <strong>
                                <span style={{ color: 'black' }}>
                                    {dataExport.roomRentalDetail?.customerName.toLocaleUpperCase()}{' '}
                                </span>
                            </strong>
                            <span style={{ color: 'red' }}>
                                &nbsp; &nbsp; &nbsp;&nbsp;
                            </span>
                        </span>
                    </p>
                </div>
            )}
        </>
    );
};

export default ExportPdf;

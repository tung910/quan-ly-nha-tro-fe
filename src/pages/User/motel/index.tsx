import { Button, Col, Image, PageHeader, Row } from 'antd';
import { useEffect, useState } from 'react';
import { addOrUpdateNotification } from '~/api/notification.api';
import { getListRooms } from '~/api/room.api';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import CardItem from '~/components/card';
import Modal from '~/components/modal';
import notification from '~/components/notification';
import { setIsLoading } from '~/feature/service/appSlice';
import { RoomType } from '~/types/RoomType';
import { generatePriceToVND } from '~/utils/helper';

const Motel = () => {
    const [rooms, setRooms] = useState<RoomType[]>([]);
    const [visible, setVisible] = useState(false);
    const dispatch = useAppDispatch();
    const [modal, setModal] = useState(false);
    const [dataModal, setDataModal] = useState<any>({});
    const user = useAppSelector((state: any) => state.user.user);

    useEffect(() => {
        const handleGetMotelRoom = async () => {
            dispatch(setIsLoading(true));
            const { data: rooms } = await getListRooms('false');
            setRooms(rooms);
            dispatch(setIsLoading(false));
        };
        handleGetMotelRoom();
    }, []);
    const toggleModal = (room: any) => {
        setDataModal(room);
        setModal(!modal);
    };
    const handleCancel = () => {
        setModal(false);
    };
    const handleChangeRoom = async (newRoom: string) => {
        const currentRoom = localStorage.getItem('currentRoom');
        if (!currentRoom) {
            return;
        }
        const data = {
            userId: user._id,
            detail: {
                currentRoom: JSON.parse(currentRoom),
                newRoom,
                dateChange: Date(),
                access: false,
            },
        };
        await addOrUpdateNotification(data);
        setVisible(false);
        setModal(false);
        notification({
            message: 'Chúng tôi sẽ liên hệ lại bạn sớm nhất',
        });
    };

    return (
        <div>
            <PageHeader ghost={true} title='Danh sách phòng trống' />
            <Row gutter={16}>
                {rooms.length > 0 &&
                    rooms.map((room, index) => (
                        <Col span={6} key={index}>
                            <CardItem room={room} onClick={toggleModal} />
                        </Col>
                    ))}
            </Row>
            <Modal
                visible={modal}
                open={modal}
                onCancel={handleCancel}
                title={dataModal.roomName}
                footer={[
                    <Button
                        key={1}
                        onClick={() => handleChangeRoom(dataModal._id)}
                    >
                        Đổi phòng
                    </Button>,
                ]}
            >
                {Object.keys(dataModal).length > 0 && (
                    <>
                        <Row>
                            <Image
                                preview={{ visible: false }}
                                width={200}
                                onClick={() => setVisible(true)}
                                src={dataModal?.images[0]?.thumbUrl}
                            />
                            <div>
                                <ul>
                                    <li style={{ margin: 20 }}>
                                        Tên phòng: {dataModal.roomName}
                                    </li>
                                    <li style={{ margin: 20 }}>
                                        Diện tích: {dataModal.area} m2
                                    </li>
                                    <li style={{ margin: 20 }}>
                                        Số lượng: {dataModal.maxPerson} người
                                    </li>
                                    <li style={{ margin: 20 }}>
                                        Giá phòng:{' '}
                                        {generatePriceToVND(
                                            dataModal.unitPrice
                                        )}{' '}
                                        đ/Tháng
                                    </li>
                                </ul>
                            </div>
                        </Row>
                        <div style={{ display: 'none' }}>
                            <Image.PreviewGroup
                                preview={{
                                    visible,
                                    onVisibleChange: (vis) => setVisible(vis),
                                }}
                            >
                                {dataModal?.images.map((img: any) => (
                                    <Image key={img.uid} src={img.thumbUrl} />
                                ))}
                            </Image.PreviewGroup>
                        </div>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default Motel;
